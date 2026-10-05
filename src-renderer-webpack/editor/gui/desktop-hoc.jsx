import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  openLoadingProject,
  closeLoadingProject,
  openInvalidProjectModal
} from 'scratch-gui/src/reducers/modals';
import {
  requestProjectUpload,
  setProjectId,
  defaultProjectId,
  getIsShowingProject,
  getIsError,
  onFetchedProjectData,
  onLoadedProject,
  requestNewProject,
  LoadingState
} from 'scratch-gui/src/reducers/project-state';
import {
  setFileHandle,
  setUsername,
  setProjectError,
  setUpdateAvailableVersion
} from 'scratch-gui/src/reducers/tw';
import {WrappedFileHandle} from './filesystem-api.js';
import {setStrings} from '../prompt/prompt.js';

let initialLoadStarted = false;
const LOAD_TIMEOUT_MS = 60000;

/**
 * @param {string} filename
 * @returns {string}
 */
const getDefaultProjectTitle = (filename) => {
  const match = filename.match(/([^/\\]+)\.sb[23]?$/i);
  if (!match) return filename;
  return match[1];
};

const dispatchLoadPhase = phase => {
  window.dispatchEvent(new CustomEvent('cyso:load-phase', {detail: phase}));
};

const handleClickAddonSettings = (search) => {
  EditorPreload.openAddonSettings(typeof search === 'string' ? search : null);
};

const handleClickNewWindow = () => {
  EditorPreload.openNewWindow();
};

const handleClickPackager = () => {
  EditorPreload.openPackager();
};

const handleClickDesktopSettings = () => {
  EditorPreload.openDesktopSettings();
};

const handleClickPrivacy = () => {
  EditorPreload.openPrivacy();
};

const handleClickAbout = () => {
  EditorPreload.openAbout();
};

const handleClickSourceCode = () => {
  window.open('https://github.com/cyso-editor');
};

const handleClickUpdateNotice = () => {
  EditorPreload.openUpdateWindow().catch(error => {
    console.error('Failed to open update window:', error);
  });
};

const securityManager = {
  canReadClipboard: () => true,
  canNotify: () => true,
  canGeolocate: () => false
};

const USERNAME_KEY = 'tw:username';
const DEFAULT_USERNAME = 'player';

const localeCache = new Map();
const FALLBACK_MESSAGES = {
  'prompt.ok': 'OK',
  'prompt.cancel': 'Cancel',
  'in-app-about.desktop-settings': 'Desktop settings',
  'in-app-about.privacy': 'Privacy policy',
  'in-app-about.about': 'About',
  'in-app-about.source-code': 'Source code',
  'update.menu-bar-available': 'New version ({version})'
};
const requestLocaleState = locale => {
  if (!localeCache.has(locale)) {
    localeCache.set(locale, EditorPreload.setLocale(locale)
      .then(state => {
        localeCache.set(locale, Promise.resolve(state));
        return state;
      })
      .catch(error => {
        console.error('Failed to load locale strings:', error);
        const fallback = {strings: FALLBACK_MESSAGES};
        localeCache.set(locale, Promise.resolve(fallback));
        return fallback;
      }));
  }
  return Promise.resolve(localeCache.get(locale));
};

const DesktopHOC = function (WrappedComponent) {
  class DesktopComponent extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        title: ''
      };
      this.handleUpdateProjectTitle = this.handleUpdateProjectTitle.bind(this);

      this.messages = FALLBACK_MESSAGES;
      requestLocaleState(this.props.locale).then(state => {
        this.messages = state.strings;
        setStrings({
          ok: this.messages['prompt.ok'],
          cancel: this.messages['prompt.cancel']
        });
        this.forceUpdate();
      });

      const storedUsername = localStorage.getItem(USERNAME_KEY);
      if (typeof storedUsername === 'string') {
        this.props.onSetReduxUsername(storedUsername);
      } else {
        this.props.onSetReduxUsername(DEFAULT_USERNAME);
      }
    }
    componentDidMount () {
      // 菜单栏的更新提示：主进程检查到新版本时会推过来，组件里显示
      // 「新的版本（vx.x.x）」。首屏渲染可能晚于检查完成，所以还要
      // 主动拉一次当前状态。
      this.unsubscribeUpdateNotice = EditorPreload.onUpdateAvailableChanged(version => {
        this.props.onSetUpdateAvailableVersion(version);
      });
      EditorPreload.getUpdateAvailableVersion()
        .then(version => {
          this.props.onSetUpdateAvailableVersion(typeof version === 'string' ? version : '');
        })
        .catch(error => {
          console.error('Failed to read update-available version:', error);
        });

      EditorPreload.setExportForPackager(() => this.props.vm.saveProjectSb3('arraybuffer')
        .then((buffer) => ({
          name: this.state.title,
          data: buffer
        })));

      // set-locale re-mounts this component, but the project must only be loaded once.
      if (initialLoadStarted) {
        return;
      }
      initialLoadStarted = true;

      this.loadInitialProject();
    }

    /**
     * Runs the one-time startup load. Errors are reported through the invalid-project modal rather
     * than thrown, and every exit path ends by signalling completion so the splash never hangs.
     *
     * The default-project path leaves both onLoadedProject and the completion signal to
     * ProjectFetcherHOC and VMManagerHOC: a second dispatch would pass a loadingState the reducer
     * rejects, and signalling early would let the splash leave before the project finished loading.
     * @returns {Promise<void>}
     */
    async loadInitialProject () {
      const {vm, onLoadingStarted, onLoadingCompleted, onLoadedProject} = this.props;

      this.loadFinished = false;
      this.loadSignaled = false;
      this.loadWatchdog = 0;
      onLoadingStarted();

      this.loadWatchdog = setTimeout(() => {
        this.completeLoading();
        this.signalLoaded();
      }, LOAD_TIMEOUT_MS);

      try {
        dispatchLoadPhase('parse');

        // 0 is a valid id, so only null/undefined mean "no file was opened".
        const id = await EditorPreload.getInitialFile();
        if (id === null || id === undefined) {
          // No file: hand off to ProjectFetcherHOC, which resolves the built-in default project.
          dispatchLoadPhase('default');
          this.props.onHasInitialProject(false);
          this.completeLoading();
          return;
        }

        // START_LOADING_VM_FILE_UPLOAD must precede the VM touching the data: that action
        // is what puts the state machine into a LOADING_VM_* state.
        dispatchLoadPhase('project');
        this.props.onHasInitialProject(true);
        const {name, type, data} = await EditorPreload.getFile(id);

        await vm.loadProject(data);
        this.completeLoading();
        this.signalLoaded();
        onLoadedProject(LoadingState.LOADING_VM_FILE_UPLOAD, true);

        const title = getDefaultProjectTitle(name);
        if (title) {
          this.setState({title});
        }
        if (type === 'file' && name.toLowerCase().endsWith('.sb3')) {
          this.props.onSetFileHandle(new WrappedFileHandle(id, name));
        }
      } catch (error) {
        console.error('Failed to load initial project:', error);
        this.completeLoading();
        this.signalLoaded();
        this.props.onShowErrorModal(error);
        this.props.onRequestNewProject();
      }
    }

    completeLoading () {
      if (this.loadFinished) return;
      this.loadFinished = true;
      if (this.loadWatchdog) {
        clearTimeout(this.loadWatchdog);
        this.loadWatchdog = 0;
      }
      this.props.onLoadingCompleted();
    }

    signalLoaded () {
      if (this.loadSignaled) return;
      this.loadSignaled = true;
      window.dispatchEvent(new CustomEvent('cyso:load-done'));
    }

    componentDidUpdate (prevProps, prevState) {
      if (this.props.projectChanged !== prevProps.projectChanged) {
        EditorPreload.setChanged(this.props.projectChanged);
      }

      if (this.props.isLoadSettled && !prevProps.isLoadSettled) {
        this.signalLoaded();
      }

      if (this.state.title !== prevState.title) {
        document.title = this.state.title;
      }

      if (this.props.fileHandle !== prevProps.fileHandle) {
        if (this.props.fileHandle) {
          EditorPreload.openedFile(this.props.fileHandle.id);
        } else {
          EditorPreload.closedFile();
        }
      }

      if (this.props.reduxUsername !== prevProps.reduxUsername) {
        localStorage.setItem(USERNAME_KEY, this.props.reduxUsername);
      }

      if (this.props.isFullScreen !== prevProps.isFullScreen) {
        EditorPreload.setIsFullScreen(this.props.isFullScreen);
      }
    }
    componentWillUnmount () {
      if (this.unsubscribeUpdateNotice) {
        this.unsubscribeUpdateNotice();
        this.unsubscribeUpdateNotice = null;
      }
    }
    handleUpdateProjectTitle (newTitle) {
      this.setState({
        title: newTitle
      });
    }
    render() {
      const {
        isLoadSettled,
        locale,
        loadingState,
        projectChanged,
        fileHandle,
        reduxUsername,
        updateAvailableVersion,
        onFetchedInitialProjectData,
        onHasInitialProject,
        onLoadedProject,
        onLoadingCompleted,
        onLoadingStarted,
        onRequestNewProject,
        onSetFileHandle,
        onSetReduxUsername,
        onShowErrorModal,
        vm,
        ...props
      } = this.props;
      return (
        <WrappedComponent
          projectTitle={this.state.title}
          onUpdateProjectTitle={this.handleUpdateProjectTitle}
          onClickAddonSettings={handleClickAddonSettings}
          onClickNewWindow={handleClickNewWindow}
          onClickPackager={handleClickPackager}
          onClickAbout={[
            {
              title: this.messages['in-app-about.desktop-settings'],
              onClick: handleClickDesktopSettings
            },
            {
              title: this.messages['in-app-about.privacy'],
              onClick: handleClickPrivacy
            },
            {
              title: this.messages['in-app-about.about'],
              onClick: handleClickAbout
            },
            {
              title: this.messages['in-app-about.source-code'],
              onClick: handleClickSourceCode
            },
          ]}
          onClickDesktopSettings={handleClickDesktopSettings}
          onClickUpdateNotice={handleClickUpdateNotice}
          updateAvailableMessage={updateAvailableVersion ?
            this.messages['update.menu-bar-available']
              .replace('{version}', updateAvailableVersion) : ''}
          securityManager={securityManager}
          {...props}
        />
      );
    }
  }

  DesktopComponent.propTypes = {
    locale: PropTypes.string.isRequired,
    isLoadSettled: PropTypes.bool,
    loadingState: PropTypes.string.isRequired,
    projectChanged: PropTypes.bool.isRequired,
    fileHandle: PropTypes.shape({
      id: PropTypes.string.isRequired
    }),
    isFullScreen: PropTypes.bool.isRequired,
    reduxUsername: PropTypes.string.isRequired,
    onFetchedInitialProjectData: PropTypes.func.isRequired,
    onHasInitialProject: PropTypes.func.isRequired,
    onLoadedProject: PropTypes.func.isRequired,
    onLoadingCompleted: PropTypes.func.isRequired,
    onLoadingStarted: PropTypes.func.isRequired,
    onRequestNewProject: PropTypes.func.isRequired,
    onSetFileHandle: PropTypes.func.isRequired,
    onSetReduxUsername: PropTypes.func.isRequired,
    onSetUpdateAvailableVersion: PropTypes.func.isRequired,
    onShowErrorModal: PropTypes.func.isRequired,
    vm: PropTypes.shape({
      loadProject: PropTypes.func.isRequired
    }).isRequired
  };

  const mapStateToProps = state => ({
    locale: state.locales.locale,
    isLoadSettled: getIsShowingProject(state.scratchGui.projectState.loadingState) ||
      getIsError(state.scratchGui.projectState.loadingState),
    loadingState: state.scratchGui.projectState.loadingState,
    isFullScreen: state.scratchGui.mode.isFullScreen,
    projectChanged: state.scratchGui.projectChanged,
    fileHandle: state.scratchGui.tw.fileHandle,
    reduxUsername: state.scratchGui.tw.username,
    updateAvailableVersion: state.scratchGui.tw.updateAvailableVersion,
    vm: state.scratchGui.vm
  });

  const mapDispatchToProps = dispatch => ({
    onLoadingStarted: () => dispatch(openLoadingProject()),
    onLoadingCompleted: () => dispatch(closeLoadingProject()),
    onHasInitialProject: hasInitialProject => {
      if (hasInitialProject) {
        // requestProjectUpload only accepts NOT_LOADED / SHOWING_WITH_ID / SHOWING_WITHOUT_ID,
        // and the machine is always at NOT_LOADED during startup.
        return dispatch(requestProjectUpload(LoadingState.NOT_LOADED));
      }
      return dispatch(setProjectId(defaultProjectId));
    },
    onFetchedInitialProjectData: (projectData, loadingState) => dispatch(onFetchedProjectData(projectData, loadingState)),
    onLoadedProject: (loadingState, loadSuccess) => {
      return dispatch(onLoadedProject(loadingState, /* canSave */ false, loadSuccess));
    },
    onRequestNewProject: () => dispatch(requestNewProject(false)),
    onSetFileHandle: fileHandle => dispatch(setFileHandle(fileHandle)),
    onSetReduxUsername: username => dispatch(setUsername(username)),
    onSetUpdateAvailableVersion: version => dispatch(setUpdateAvailableVersion(version)),
    onShowErrorModal: error => {
      dispatch(setProjectError(error));
      dispatch(openInvalidProjectModal());
    }
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(DesktopComponent);
};

export default DesktopHOC;
