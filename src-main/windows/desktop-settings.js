const {app, shell} = require('electron');
const AbstractWindow = require('./abstract');
const {translate, getStrings, getLocale} = require('../l10n');
const {APP_NAME} = require('../brand');
const settings = require('../settings');
const {isUpdateCheckerAllowed} = require('../update-checker');
const RichPresence = require('../rich-presence');

class DesktopSettingsWindow extends AbstractWindow {
  constructor () {
    super();

    this.window.setTitle(`${translate('desktop-settings.title')} - ${APP_NAME}`);
    this.window.setMinimizable(false);
    this.window.setMaximizable(false);

    this.ipc.on('init', (event) => {
      event.returnValue = {
        locale: getLocale(),
        strings: getStrings(),
        settings: {
          updateCheckerAllowed: isUpdateCheckerAllowed(),
          updateChecker: settings.updateChecker,
          microphone: settings.microphone,
          camera: settings.camera,
          hardwareAcceleration: settings.hardwareAcceleration,
          backgroundThrottling: settings.backgroundThrottling,
          bypassCORS: settings.bypassCORS,
          spellchecker: settings.spellchecker,
          exitFullscreenOnEscape: settings.exitFullscreenOnEscape,
          richPresenceAvailable: RichPresence.isAvailable(),
          richPresence: settings.richPresence,
          renderGpuMode: settings.renderGpuMode,
          renderResolutionCap: settings.renderResolutionCap
        }
      };
    });

    this.ipc.handle('set-update-checker', async (event, updateChecker) => {
      settings.updateChecker = updateChecker;
      await settings.save();
    });

    this.ipc.handle('check-for-updates', async () => {
      const {fetchUpdateInfo} = require('../update-checker');
      // force = true：用户手动点检查更新时，不受 settings.updateChecker === 'never'
      // 与「已忽略该版本」的限制，也不受 isUpdateCheckerAllowed() 影响。
      const info = await fetchUpdateInfo({force: true});
      if (!info) {
        throw new Error('Update information is unavailable');
      }
      return {
        success: true,
        currentVersion: info.currentVersion,
        latestVersion: info.latestVersion,
        updateAvailable: info.updateAvailable,
        prerelease: info.prerelease,
        publishedAt: info.publishedAt,
        releaseUrl: info.releaseUrl,
        releasesPage: info.releasesPage,
        changelog: info.changelog,
        sourceCount: info.sources.length
      };
    });

    this.ipc.handle('open-update-window', async () => {
      // 复用 update-checker 的入口：它会先尝试拉最新数据，失败时回退到缓存，
      // 保证 API 限流或离线时「查看更新」按钮仍然可用。
      const {openUpdateWindow} = require('../update-checker');
      return openUpdateWindow();
    });

    this.ipc.handle('open-releases-page', async () => {
      const {RELEASES_PAGE} = require('../github-releases');
      // Imported late due to circular dependency
      const openExternal = require('../open-external');
      openExternal(RELEASES_PAGE);
    });

    this.ipc.handle('enumerate-media-devices', async () => {
      // Imported late due to circular dependencies
      const EditorWindow = require('./editor');
      const anEditorWindow = AbstractWindow.getWindowsByClass(EditorWindow)[0];
      if (!anEditorWindow) {
        // If you change this error message, please make sure to update desktop settings' error handling
        throw new Error('Editor must be open');
      }
      return anEditorWindow.enumerateMediaDevices();
    });

    this.ipc.handle('set-microphone', async (event, microphone) => {
      settings.microphone = microphone;
      await settings.save();
    });

    this.ipc.handle('set-camera', async (event, camera) => {
      settings.camera = camera;
      await settings.save();
    });

    this.ipc.handle('set-hardware-acceleration', async (event, hardwareAcceleration) => {
      settings.hardwareAcceleration = hardwareAcceleration;
      await settings.save();
    });

    this.ipc.handle('set-background-throttling', async (event, backgroundThrottling) => {
      settings.backgroundThrottling = backgroundThrottling;
      AbstractWindow.settingsChanged();
      await settings.save();
    });

    this.ipc.handle('set-bypass-cors', async (event, bypassCORS) => {
      settings.bypassCORS = bypassCORS;
      await settings.save();
    });

    this.ipc.handle('set-spellchecker', async (event, spellchecker) => {
      settings.spellchecker = spellchecker;
      AbstractWindow.settingsChanged();
      await settings.save();
    });

    this.ipc.handle('set-exit-fullscreen-on-escape', async (event, exitFullscreenOnEscape) => {
      settings.exitFullscreenOnEscape = exitFullscreenOnEscape;
      await settings.save();
    });

    this.ipc.handle('set-rich-presence', async (event, richPresence) => {
      settings.richPresence = richPresence;
      if (richPresence) {
        RichPresence.enable();
      } else {
        RichPresence.disable();
      }
      await settings.save();
    });

    this.ipc.handle('open-user-data', async () => {
      shell.showItemInFolder(app.getPath('userData'));
    });

    this.ipc.handle('set-render-gpu-mode', async (event, renderGpuMode) => {
      if (['automatic', 'force-gpu', 'force-cpu'].includes(renderGpuMode)) {
        settings.renderGpuMode = renderGpuMode;
        AbstractWindow.settingsChanged();
        await settings.save();
      }
    });

    this.ipc.handle('set-render-resolution-cap', async (event, renderResolutionCap) => {
      if (typeof renderResolutionCap === 'number' && renderResolutionCap >= 0) {
        settings.renderResolutionCap = renderResolutionCap;
        AbstractWindow.settingsChanged();
        await settings.save();
      }
    });

    this.loadURL('tw-desktop-settings://./desktop-settings.html');
  }

  getDimensions () {
    return {
      width: 550,
      height: 640
    };
  }

  getPreload () {
    return 'desktop-settings';
  }

  isPopup () {
    return true;
  }

  static show () {
    const window = AbstractWindow.singleton(DesktopSettingsWindow);
    window.show();
  }
}

module.exports = DesktopSettingsWindow;