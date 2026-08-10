const fsPromises = require('fs/promises');
const path = require('path');
const nodeURL = require('url');
const zlib = require('zlib');
const nodeCrypto = require('crypto');
const {app, dialog} = require('electron');
const ProjectRunningWindow = require('./project-running-window');
const AddonsWindow = require('./addons');
const DesktopSettingsWindow = require('./desktop-settings');
const PrivacyWindow = require('./privacy');
const AboutWindow = require('./about');
const PackagerWindow = require('./packager');
const {createAtomicWriteStream} = require('../atomic-write-stream');
const {translate, updateLocale, getStrings} = require('../l10n');
const {APP_NAME} = require('../brand');
const prompts = require('../prompts');
const settings = require('../settings');
const privilegedFetch = require('../fetch');
const RichPresence = require('../rich-presence.js');
const FileAccessWindow = require('./file-access-window.js');
const ExtensionDocumentationWindow = require('./extension-documentation.js');
const CYSOCore = require('cyso-core');
const { Action } = CYSOCore;

const TYPE_FILE = 'file';
const TYPE_URL = 'url';
const TYPE_SCRATCH = 'scratch';
const TYPE_SAMPLE = 'sample';

class OpenedFile {
  constructor (type, path) {
    /** @type {TYPE_FILE|TYPE_URL|TYPE_SCRATCH|TYPE_SAMPLE} */
    this.type = type;

    /**
     * Absolute file path or URL
     * @type {string}
     */
    this.path = path;
  }

  async read () {
    if (this.type === TYPE_FILE) {
      return {
        name: path.basename(this.path),
        data: await fsPromises.readFile(this.path)
      };
    }

    if (this.type === TYPE_URL) {
      const buffer = await privilegedFetch(this.path);
      return {
        name: decodeURIComponent(path.basename(this.path)),
        data: buffer
      };
    }

    if (this.type === TYPE_SCRATCH) {
      const metadata = await privilegedFetch.json(`https://api.scratch.mit.edu/projects/${this.path}`);
      const token = metadata.project_token;
      const title = metadata.title;

      const projectBuffer = await privilegedFetch(`https://projects.scratch.mit.edu/${this.path}?token=${token}`);
      return {
        name: title,
        data: projectBuffer
      };
    }

    if (this.type === TYPE_SAMPLE) {
      const sampleRoot = path.resolve(__dirname, '../../dist-extensions/samples/');
      const resolvedPath = path.join(sampleRoot, this.path);
      if (resolvedPath.startsWith(sampleRoot)) {
        const compressedPath = `${resolvedPath}.br`;
        const compressedData = await fsPromises.readFile(compressedPath);

        // dist-extensions is all brotli'd; must decompress
        const decompressedData = await new Promise((resolve, reject) => {
          zlib.brotliDecompress(compressedData, (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          });
        });

        return {
          name: this.path,
          data: decompressedData
        };
      }
      throw new Error('Unsafe join');
    }

    throw new Error(`Unknown type: ${this.type}`);
  }
}

/**
 * @param {string} file
 * @param {string|null} workingDirectory
 * @returns {OpenedFile}
 */
const parseOpenedFile = (file, workingDirectory) => {
  let url;
  try {
    url = new URL(file);
  } catch (e) {
    // Error means it was not a valid full URL
  }

  if (url) {
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      // Scratch URLs require special treatment as they are not direct downloads.
      const scratchMatch = file.match(/^https?:\/\/scratch\.mit\.edu\/projects\/(\d+)\/?/);
      if (scratchMatch) {
        return new OpenedFile(TYPE_SCRATCH, scratchMatch[1]);
      }

      // Need to manually redirect extension samples to the copies we already have offline as the
      // fetching code will not go through web request handlers or custom protocols.
      const sampleMatch = file.match(/^https?:\/\/extensions\.turbowarp\.org\/samples\/(.+\.sb3)$/);
      if (sampleMatch) {
        return new OpenedFile(TYPE_SAMPLE, decodeURIComponent(sampleMatch[1]));
      }

      return new OpenedFile(TYPE_URL, file);
    }

    // Parse file:// URLs.
    // Notably we receive these in the flatpak version of the app when we can only access a file through
    // the XDG document portal instead of having direct access with eg. --filesystem=home
    if (url.protocol === 'file:') {
      let filePath;
      try {
        filePath = nodeURL.fileURLToPath(file);
      } catch (e) {
        // Very unlikely but possible
      }

      if (filePath) {
        return new OpenedFile(TYPE_FILE, path.resolve(workingDirectory, filePath));
      }
    }

    // Don't throw an error just because we don't recognize the URL protocol as
    // Windows paths look close enough to real URLs to be parsed successfully.
  }

  return new OpenedFile(TYPE_FILE, path.resolve(workingDirectory, file));
};

/**
 * @returns {Array<{path: string; app: string;}>}
 */
const getUnsafePaths = () => {
  const unsafePaths = [
    // Current app, regardless of where it is installed or how modded it is.
    // This applies on every platform: on macOS the app bundle lives in
    // /Applications, on Linux it may be installed to /opt or /usr.
    {
      path: path.dirname(app.getPath('exe')),
      app: APP_NAME,
    },
    {
      path: app.getPath('userData'),
      app: APP_NAME,
    }
  ];

  if (process.platform !== 'win32') {
    // macOS app bundles expose the actual .app directory one level above the
    // executable. Guard that too so users can't save over the application.
    if (process.platform === 'darwin') {
      const appBundle = path.resolve(path.dirname(app.getPath('exe')), '..', '..');
      if (path.basename(appBundle) === `${APP_NAME}.app`) {
        unsafePaths.push({ path: appBundle, app: APP_NAME });
      }
    }
    return unsafePaths;
  }

  const localPrograms = path.join(app.getPath('home'), 'AppData', 'Local', 'Programs');
  const appData = app.getPath('appData');
  unsafePaths.push(
    // TurboWarp Desktop defaults
    {
      path: path.join(appData, 'turbowarp-desktop'),
      app: 'TurboWarp Desktop'
    },
    {
      path: path.join(localPrograms, 'TurboWarp'),
      app: 'TurboWarp Desktop'
    },

    // Scratch Desktop defaults
    {
      path: path.join(appData, 'Scratch'),
      app: 'Scratch Desktop'
    },
    {
      path: path.join(localPrograms, 'Scratch 3'),
      app: 'Scratch Desktop'
    }
  );
  return unsafePaths;
};

/**
 * @param {string} parent
 * @param {string} child
 * @returns {boolean}
 */
const isChildPath = (parent, child) => {
  const relative = path.relative(parent, child);
  return !!relative && !relative.startsWith('..') && !path.isAbsolute(relative);
};

/**
 * @returns {string} A unique string.
 */
const generateFileId = () => {
  // Note that we can't use the randomUUID from web crypto as we need to support Electron 22.
  return `desktop_file_id{${nodeCrypto.randomUUID()}}`;
};

class EditorWindow extends ProjectRunningWindow {
  /**
   * @param {OpenedFile|null} initialFile
   * @param {boolean} isInitiallyFullscreen
   */
  constructor (initialFile, isInitiallyFullscreen) {
    super();

    /**
     * Ideally we would revoke access after loading a new project, but our file handle handling in
     * the GUI isn't robust enough for that yet. We do at least use random file handle IDs which
     * makes it much harder for malicious code in the renderer process to enumerate all previously
     * opened IDs and overwrite them.
     * @type {Map<string, OpenedFile>}
     */
    this.openedFiles = new Map();
    this.activeFileId = null;

    if (initialFile !== null) {
      this.activeFileId = generateFileId();
      this.openedFiles.set(this.activeFileId, initialFile);
    }

    this.openedProjectAt = Date.now();

    const core = new CYSOCore({ getWindow: () => this.window, dialog });
    core.registerIpc(this.ipc);

    const gatePermission = (type, extensionId) =>
      core.request(Action.RESOLVE_PERMISSION, { extensionId, type });

    const resolveUserPath = (p) => path.resolve(core.expandPath(p));

    /**
     * @param {string} id
     * @returns {OpenedFile}
     * @throws if invalid ID
     */
    const getFileById = (id) => {
      if (!this.openedFiles.has(id)) {
        throw new Error('Invalid file ID');
      }
      return this.openedFiles.get(id);
    };

    let processingWillPreventUnload = false;
    this.window.webContents.on('will-prevent-unload', () => {
      // Using showMessageBoxSync synchronously in the event handler causes broken focus on Windows.
      // See https://github.com/TurboWarp/desktop/issues/1245
      // To work around that, we won't cancel that will-prevent-unload event so the window stays
      // open. After a very short delay to let focus get fixed, we'll show a dialog and force close
      // the window ourselves if the user wants.

      // Due to the timeout, this event could theoretically fire multiple times before we show the
      // dialog. Make sure to only show one dialog if that happens.
      if (processingWillPreventUnload) {
        return;
      }
      processingWillPreventUnload = true;

      setTimeout(() => {
        const choice = dialog.showMessageBoxSync(this.window, {
          title: APP_NAME,
          type: 'info',
          buttons: [
            translate('unload.stay'),
            translate('unload.leave')
          ],
          cancelId: 0,
          defaultId: 0,
          message: translate('unload.message'),
          detail: translate('unload.detail'),
          noLink: true
        });
        if (choice === 1) {
          this.window.destroy();
        }
        processingWillPreventUnload = false;
      });
    });

    this.window.on('page-title-updated', (event, title, explicitSet) => {
      event.preventDefault();
      if (explicitSet && title) {
        this.window.setTitle(`${title} - ${APP_NAME}`);
        this.projectTitle = title;
      } else {
        this.window.setTitle(APP_NAME);
        this.projectTitle = '';
      }

      this.updateRichPresence();
    });
    this.window.setTitle(APP_NAME);

    this.window.on('focus', () => {
      this.updateRichPresence();
    });

    // Unregister all global shortcuts when the window closes so stale callbacks
    // can't fire against a destroyed BrowserWindow.
    this.window.on('closed', () => {
      if (typeof registeredShortcuts !== 'undefined' && registeredShortcuts.size > 0) {
        try {
          const { globalShortcut } = require('electron');
          for (const key of registeredShortcuts.keys()) {
            globalShortcut.unregister(key);
          }
          registeredShortcuts.clear();
        } catch (error) {
          // ignore
        }
      }
    });

    this.ipc.on('is-initially-fullscreen', (e) => {
      e.returnValue = isInitiallyFullscreen;
    });

    this.ipc.handle('get-initial-file', () => {
      return this.activeFileId;
    });

    this.ipc.handle('get-file', async (event, id) => {
      const file = getFileById(id);
      const {name, data} = await file.read();
      return {
        name,
        type: file.type,
        data
      };
    });

    this.ipc.on('set-locale', async (event, locale) => {
      if (settings.locale !== locale) {
        settings.locale = locale;
        updateLocale(locale);

        // Imported late due to circular dependency
        const rebuildMenuBar = require('../menu-bar');
        rebuildMenuBar();

        // Let the save happen in the background, not important
        Promise.resolve().then(() => settings.save());
      }
      event.returnValue = {
        strings: getStrings()
      };
    });

    this.ipc.handle('set-changed', (event, changed) => {
      this.window.setDocumentEdited(changed);
    });

    this.ipc.handle('opened-file', (event, id) => {
      const file = getFileById(id);
      if (file.type !== TYPE_FILE) {
        throw new Error('Not a file');
      }
      this.activeFileId = id;
      this.openedProjectAt = Date.now();
      this.window.setRepresentedFilename(file.path);
    });

    this.ipc.handle('closed-file', () => {
      this.activeFileId = null;
      this.window.setRepresentedFilename('');
    });

    this.ipc.handle('show-open-file-picker', async (event, options) => {
      const opts = options || {};
      const filters = opts.filters || [
        {
          name: 'Scratch Project',
          extensions: ['sb3', 'sb2', 'sb'],
        }
      ];
      const properties = opts.properties || ['openFile'];
      const result = await dialog.showOpenDialog(this.window, {
        properties,
        defaultPath: settings.lastDirectory,
        filters
      });
      if (result.canceled) {
        return null;
      }

      const filePaths = result.filePaths;
      settings.lastDirectory = path.dirname(filePaths[0]);
      await settings.save();

      const makeResult = (filePath) => {
        const id = generateFileId();
        this.openedFiles.set(id, new OpenedFile(TYPE_FILE, filePath));
        return {
          id,
          name: path.basename(filePath)
        };
      };

      if (opts.multiple) {
        return filePaths.map(makeResult);
      }
      return makeResult(filePaths[0]);
    });

    this.ipc.handle('show-save-file-picker', async (event, suggestedName) => {
      const result = await dialog.showSaveDialog(this.window, {
        defaultPath: path.join(settings.lastDirectory, suggestedName),
        filters: [
          {
            name: 'Scratch 3 Project',
            extensions: ['sb3'],
          }
        ]
      });
      if (result.canceled) {
        return null;
      }

      const filePath = result.filePath;

      const unsafePath = getUnsafePaths().find(i => isChildPath(i.path, filePath));
      if (unsafePath) {
        // No need to block until the message box is closed
        dialog.showMessageBox(this.window, {
          type: 'error',
          title: APP_NAME,
          message: translate('unsafe-path.title'),
          detail: translate(`unsafe-path.details`)
            .replace('{APP_NAME}', unsafePath.app)
            .replace('{file}', filePath),
          noLink: true
        });  
        return null;
      }

      settings.lastDirectory = path.dirname(filePath);
      await settings.save();

      const id = generateFileId();
      this.openedFiles.set(id, new OpenedFile(TYPE_FILE, filePath));

      return {
        id,
        name: path.basename(filePath)
      };
    });

    this.ipc.handle('get-preferred-media-devices', () => {
      return {
        microphone: settings.microphone,
        camera: settings.camera
      };
    });

    this.ipc.on('start-write-stream', async (startEvent, id) => {
      const file = getFileById(id);
      if (file.type !== TYPE_FILE) {
        throw new Error('Not a file');
      }

      const port = startEvent.ports[0];

      /** @type {NodeJS.WritableStream|null} */
      let writeStream = null;

      const handleError = (error) => {
        console.error('Write stream error', error);
        port.postMessage({
          error
        });

        // Make sure the port is started in case we encounter an error before we normally
        // begin to accept messages.
        port.start();
      };

      try {
        writeStream = await createAtomicWriteStream(file.path);
      } catch (error) {
        handleError(error);
        return;
      }

      writeStream.on('atomic-error', handleError);

      const handleMessage = (data) => {
        if (data.write) {
          if (writeStream.write(data.write)) {
            // Still more space in the buffer. Ask for more immediately.
            return;
          }
          // Wait for the buffer to become empty before asking for more.
          return new Promise(resolve => {
            writeStream.once('drain', resolve);
          });
        } else if (data.finish) {
          // Wait for the atomic file write to complete.
          return new Promise(resolve => {
            writeStream.once('atomic-finish', resolve);
            writeStream.end();
          });
        } else if (data.abort) {
          writeStream.emit('error', new Error('Aborted by renderer process'));
          return;
        }
        throw new Error('Unknown message from renderer');
      };

      port.on('message', async (messageEvent) => {
        try {
          const data = messageEvent.data;
          const id = data.id;
          const result = await handleMessage(data);
          port.postMessage({
            response: {
              id,
              result
            }
          });
        } catch (error) {
          handleError(error);
        }
      });

      port.start();
    });

    this.ipc.on('alert', (event, message) => {
      event.returnValue = prompts.alert(this.window, message);
    });

    this.ipc.on('confirm', (event, message) => {
      event.returnValue = prompts.confirm(this.window, message);
    });

    this.ipc.handle('open-packager', () => {
      PackagerWindow.forEditor(this);
    });

    this.ipc.handle('open-new-window', () => {
      EditorWindow.newWindow();
    });

    this.ipc.handle('open-addon-settings', (event, search) => {
      AddonsWindow.show(search);
    });

    this.ipc.handle('open-desktop-settings', () => {
      DesktopSettingsWindow.show();
    });

    this.ipc.handle('open-privacy', () => {
      PrivacyWindow.show();
    });

    this.ipc.handle('open-about', () => {
      AboutWindow.show();
    });

    this.ipc.handle('get-advanced-customizations', async () => {
      const USERSCRIPT_PATH = path.join(app.getPath('userData'), 'userscript.js');
      const USERSTYLE_PATH = path.join(app.getPath('userData'), 'userstyle.css');

      const [userscript, userstyle] = await Promise.all([
        fsPromises.readFile(USERSCRIPT_PATH, 'utf-8').catch(() => ''),
        fsPromises.readFile(USERSTYLE_PATH, 'utf-8').catch(() => '')
      ]);

      return {
        userscript,
        userstyle
      };
    });

    this.ipc.handle('check-drag-and-drop-path', (event, filePath) => {
      FileAccessWindow.check(filePath);
    });

    /**
     * Refers to the full screen button in the editor, not the OS-level fullscreen through
     * F11/Alt+Enter (Windows, Linux) or buttons provided by the OS (macOS).
     */
    this.isInEditorFullScreen = false;

    this.ipc.handle('set-is-full-screen', (event, isFullScreen) => {
      this.isInEditorFullScreen = !!isFullScreen;
    });

    this.ipc.handle('open-external-url', async (event, url) => {
      try {
        const {shell} = require('electron');
        await shell.openExternal(url);
        return true;
      } catch (error) {
        console.error('Failed to open external URL:', error);
        return false;
      }
    });

    this.ipc.handle('read-local-folder', async (event, extensionId, folderPath) => {
      const checkResult = await gatePermission('file-read', extensionId);
      if (!checkResult || checkResult.action !== 'allow') {
        return { success: false, error: 'Permission denied: file-read' };
      }

      const pathCheck = await core.request(Action.VALIDATE_PATH, { path: core.expandPath(folderPath) });
      if (!pathCheck.safe) {
        return {
          success: false,
          error: '安全限制：不允许访问系统关键路径或风险路径'
        };
      }

      try {
        const fs = fsPromises;
        const safePath = resolveUserPath(folderPath);
        const entries = await fs.readdir(safePath, {withFileTypes: true});
        
        const files = [];
        for (const entry of entries) {
          const fullPath = path.join(safePath, entry.name);
          const stats = await fs.stat(fullPath);
          
          files.push({
            name: entry.name,
            path: fullPath,
            isDirectory: entry.isDirectory(),
            size: stats.size,
            mtime: stats.mtime.toISOString()
          });
        }
        
        return {
          success: true,
          files,
          folderPath: safePath
        };
      } catch (error) {
        console.error('Failed to read local folder:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });

    this.ipc.handle('execute-command', async (event, extensionId, command, options = {}) => {
      const checkResult = await gatePermission('system-command', extensionId);
      
      if (!checkResult || checkResult.action !== 'allow') {
        return { success: false, error: 'Permission denied: system-command' };
      }

      const cmdCheck = await core.request(Action.VALIDATE_COMMAND, {
        command,
        ui: {
          confirm: async (cmd) => {
            const r = await dialog.showMessageBox(this.window, {
              type: 'warning',
              buttons: [translate('cyso.command-confirm.cancel'), translate('cyso.command-confirm.run')],
              defaultId: 0,
              cancelId: 0,
              title: translate('cyso.command-confirm.title'),
              message: translate('cyso.command-confirm.message'),
              detail: translate('cyso.command-confirm.details').replace('{command}', cmd)
            });
            return r.response === 1;
          }
        }
      });
      if (cmdCheck.blocked) {
        return { success: false, error: translate('cyso.command-blocked') };
      }
      if (cmdCheck.warning && !cmdCheck.confirmed) {
        return { success: false, error: translate('cyso.command-cancelled') };
      }

      try {
        const { exec } = require('child_process');
        const { promisify } = require('util');
        const execAsync = promisify(exec);
        
        const cwd = options.cwd ? resolveUserPath(options.cwd) : process.cwd();
        const { stdout, stderr } = await execAsync(command, {
          cwd,
          timeout: options.timeout || 30000,
          maxBuffer: 10 * 1024 * 1024
        });
        
        return {
          success: true,
          stdout: stdout || '',
          stderr: stderr || '',
          cwd
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
          stderr: error.stderr || '',
          code: error.code
        };
      }
    });

    this.ipc.handle('write-file', async (event, extensionId, filePath, content) => {
      const checkResult = await gatePermission('file-write', extensionId);
      if (!checkResult || checkResult.action !== 'allow') {
        return { success: false, error: 'Permission denied: file-write' };
      }

      const pathCheck = await core.request(Action.VALIDATE_PATH, { path: core.expandPath(filePath) });
      if (!pathCheck.safe) {
        return {
          success: false,
          error: '安全限制：不允许写入系统关键路径或风险路径'
        };
      }

      try {
        const fs = fsPromises;

        const safePath = resolveUserPath(filePath);
        const dir = path.dirname(safePath);
        await fs.mkdir(dir, {recursive: true});

        let processedContent = content;
        if (content === null || content === undefined) {
          processedContent = '';
        } else if (typeof content === 'number' || typeof content === 'boolean') {
          processedContent = String(content);
        } else if (typeof content !== 'string' && !Buffer.isBuffer(content) && !(content instanceof Uint8Array)) {
          // ArrayBuffer 或其他类型转换为 Uint8Array
          if (content instanceof ArrayBuffer) {
            processedContent = new Uint8Array(content);
          } else {
            // 其他情况尝试转为字符串
            processedContent = String(content);
          }
        }

        await fs.writeFile(safePath, processedContent, 'utf-8');

        return {
          success: true,
          filePath: safePath
        };
      } catch (error) {
        console.error('Failed to write file:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });

    this.ipc.handle('read-file', async (event, extensionId, filePath) => {
      const checkResult = await gatePermission('file-read', extensionId);
      if (!checkResult || checkResult.action !== 'allow') {
        return { success: false, error: 'Permission denied: file-read' };
      }

      try {
        const fs = fsPromises;
        const safePath = resolveUserPath(filePath);
        const content = await fs.readFile(safePath, 'utf-8');
        
        return {
          success: true,
          content: content,
          filePath: safePath
        };
      } catch (error) {
        console.error('Failed to read file:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });

    this.ipc.handle('file-exists', async (event, extensionId, filePath) => {
      const checkResult = await gatePermission('file-read', extensionId);
      if (!checkResult || checkResult.action !== 'allow') {
        return { success: false, error: 'Permission denied', exists: false };
      }

      try {
        const fs = fsPromises;
        const safePath = resolveUserPath(filePath);
        try {
          await fs.access(safePath);
          return {
            success: true,
            exists: true
          };
        } catch {
          return {
            success: true,
            exists: false
          };
        }
      } catch (error) {
        console.error('Failed to check file exists:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });

    this.ipc.handle('get-file-stats', async (event, extensionId, filePath) => {
      const checkResult = await gatePermission('file-metadata', extensionId);
      if (!checkResult || checkResult.action !== 'allow') {
        return { success: false, error: 'Permission denied: file-metadata' };
      }

      const pathCheck = await core.request(Action.VALIDATE_PATH, { path: core.expandPath(filePath) });
      if (!pathCheck.safe) {
        return {
          success: false,
          error: '安全限制：不允许访问系统关键路径或风险路径'
        };
      }

      try {
        const fs = fsPromises;
        const safePath = resolveUserPath(filePath);
        const stats = await fs.stat(safePath);
        
        return {
          success: true,
          stats: {
            size: stats.size,
            isFile: stats.isFile(),
            isDirectory: stats.isDirectory(),
            created: stats.birthtime,
            modified: stats.mtime,
            accessed: stats.atime
          }
        };
      } catch (error) {
        console.error('Failed to get file stats:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });

    this.ipc.handle('create-folder', async (event, extensionId, folderPath) => {
      const checkResult = await gatePermission('file-write', extensionId);
      if (!checkResult || checkResult.action !== 'allow') {
        return { success: false, error: 'Permission denied: file-write' };
      }

      const pathCheck = await core.request(Action.VALIDATE_PATH, { path: core.expandPath(folderPath) });
      if (!pathCheck.safe) {
        return {
          success: false,
          error: '安全限制：不允许访问系统关键路径或风险路径'
        };
      }

      try {
        const fs = fsPromises;
        const safePath = resolveUserPath(folderPath);
        await fs.mkdir(safePath, {recursive: true});
        
        return {
          success: true,
          folderPath: safePath
        };
      } catch (error) {
        console.error('Failed to create folder:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });

    this.ipc.handle('get-path', (event, name) => {
      try {
        const {app} = require('electron');
        return {
          success: true,
          path: app.getPath(name)
        };
      } catch (error) {
        console.error('Failed to get path:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });

    this.ipc.handle('delete-file', async (event, extensionId, filePath) => {
      const checkResult = await gatePermission('file-delete', extensionId);
      if (!checkResult || checkResult.action !== 'allow') {
        return { success: false, error: 'Permission denied: file-delete' };
      }

      const pathCheck = await core.request(Action.VALIDATE_PATH, { path: core.expandPath(filePath) });
      if (!pathCheck.safe) {
        return { 
          success: false, 
          error: '安全限制：不允许删除系统关键路径或风险路径下的文件' 
        };
      }

      try {
        const fs = fsPromises;
        
        const safePath = resolveUserPath(filePath);
        
        try {
          await fs.access(safePath);
        } catch {
          return {
            success: false,
            error: '文件不存在'
          };
        }
        
        await fs.unlink(safePath);
        
        return {
          success: true,
          filePath: safePath
        };
      } catch (error) {
        console.error('Failed to delete file:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });

    this.ipc.handle('show-notification', async (event, options) => {
      try {
        const {Notification} = require('electron');

        if (Notification.isSupported()) {
          const notification = new Notification({
            title: options.title || 'CYSO 通知',
            body: options.body || '',
            icon: options.icon || null,
            silent: options.silent || false,
            timeoutType: options.timeoutType || 'default'
          });

          notification.show();

          return {
            success: true
          };
        } else {
          const {app} = require('electron');
          if (app && app.dock) {
            app.dock.bounce();
          }
          return {
            success: true,
            message: '使用系统托盘通知'
          };
        }
      } catch (error) {
        console.error('Failed to show notification:', error);
        return {
          success: false,
          error: error.message
        };
      }
    });

    const registeredShortcuts = new Map();
    const shortcutEventCallbacks = new Map();

    this.ipc.handle('register-global-shortcut', async (event, extensionId, key, eventName) => {
      const checkResult = await gatePermission('global-shortcut', extensionId);
      if (!checkResult || checkResult.action !== 'allow') {
        return { success: false, error: 'Permission denied: global-shortcut' };
      }

      try {
        const { globalShortcut, BrowserWindow } = require('electron');

        if (registeredShortcuts.has(key)) {
          globalShortcut.unregister(key);
        }

        const senderWindow = BrowserWindow.fromWebContents(event.sender);

        const success = globalShortcut.register(key, () => {
          if (senderWindow && !senderWindow.isDestroyed()) {
            senderWindow.webContents.send('global-shortcut-triggered', { key, eventName });
          }
        });

        if (success) {
          registeredShortcuts.set(key, eventName);
          return { success: true };
        } else {
          return { success: false, error: 'Failed to register shortcut' };
        }
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    this.ipc.handle('unregister-global-shortcut', async (event, key) => {
      try {
        const { globalShortcut } = require('electron');
        globalShortcut.unregister(key);
        registeredShortcuts.delete(key);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    const overlayWindows = new Map();

    this.ipc.handle('create-overlay-window', async (event, extensionId, id, x, y, w, h) => {
      const checkResult = await gatePermission('draw-window', extensionId);
      if (!checkResult || checkResult.action !== 'allow') {
        return { success: false, error: 'Permission denied: draw-window' };
      }

      try {
        const { BrowserWindow } = require('electron');
        
        if (overlayWindows.has(id)) {
          overlayWindows.get(id).close();
        }

        const overlay = new BrowserWindow({
          x: Math.round(x),
          y: Math.round(y),
          width: Math.round(w),
          height: Math.round(h),
          frame: false,
          transparent: true,
          backgroundColor: '#00000000',
          alwaysOnTop: true,
          skipTaskbar: true,
          resizable: false,
          webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
          }
        });

        await overlay.loadURL(`data:text/html,<html><body style="margin:0;padding:0;overflow:hidden;background:transparent;"></body></html>`);

        overlay.setFocusable(false);
        overlay.on('closed', () => overlayWindows.delete(id));

        overlayWindows.set(id, overlay);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    this.ipc.handle('set-overlay-content', async (event, extensionId, id, content) => {
      try {
        const overlay = overlayWindows.get(id);
        if (!overlay) {
          return { success: false, error: 'Overlay window not found' };
        }

        let processed = typeof content === 'string' ? content : String(content == null ? '' : content);

        const baseStyle =
          '<style>html,body{height:100%!important;width:100%!important;margin:0!important;' +
          'padding:0!important;overflow:hidden!important;background:transparent!important;}</style>';

        const headIdx = processed.toLowerCase().indexOf('</head>');
        if (headIdx !== -1) {
          processed = processed.slice(0, headIdx) + baseStyle + processed.slice(headIdx);
        } else if (processed.toLowerCase().indexOf('<head') !== -1) {
          const hIdx = processed.toLowerCase().indexOf('<head');
          const hEnd = processed.indexOf('>', hIdx);
          processed = processed.slice(0, hEnd + 1) + baseStyle + processed.slice(hEnd + 1);
        } else if (processed.toLowerCase().indexOf('<html') !== -1) {
          const htmlIdx = processed.toLowerCase().indexOf('<html');
          const htmlEnd = processed.indexOf('>', htmlIdx);
          processed = processed.slice(0, htmlEnd + 1) + '<head>' + baseStyle + '</head>' + processed.slice(htmlEnd + 1);
        } else {
          processed = '<!DOCTYPE html><html><head>' + baseStyle + '</head><body>' + processed + '</body></html>';
        }

        await overlay.webContents.executeJavaScript(
          'document.open();document.write(' + JSON.stringify(processed) + ');document.close();'
        );

        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    this.ipc.handle('close-overlay-window', async (event, id) => {
      try {
        const overlay = overlayWindows.get(id);
        if (overlay) {
          overlay.close();
          overlayWindows.delete(id);
        }
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    this.window.on('closed', () => {
      for (const ov of overlayWindows.values()) {
        if (!ov.isDestroyed()) ov.close();
      }
      overlayWindows.clear();
    });

    this.ipc.handle('capture-screen', async (event, extensionId, target) => {
      const checkResult = await gatePermission('screen-capture', extensionId);
      if (!checkResult || checkResult.action !== 'allow') {
        return { success: false, error: 'Permission denied: screen-capture' };
      }

      try {
        const { desktopCapturer, BrowserWindow } = require('electron');
        
        const sources = await desktopCapturer.getSources({
          types: [target === 'window' ? 'window' : 'screen']
        });

        if (sources.length === 0) {
          return { success: false, error: 'No capture sources found' };
        }

        const source = sources[0];
        const image = source.thumbnail.toDataURL();
        
        return { success: true, dataUrl: image };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    this.ipc.handle('capture-region', async (event, extensionId, x, y, w, h) => {
      const checkResult = await gatePermission('screen-capture', extensionId);
      if (!checkResult || checkResult.action !== 'allow') {
        return { success: false, error: 'Permission denied: screen-capture' };
      }

      try {
        const { desktopCapturer, nativeImage } = require('electron');
        
        const sources = await desktopCapturer.getSources({ types: ['screen'] });
        if (sources.length === 0) {
          return { success: false, error: 'No screen found' };
        }

        const fullImage = nativeImage.createFromDataURL(sources[0].thumbnail.toDataURL());
        const size = fullImage.getSize();
        
        const cropped = fullImage.crop({
          x: Math.min(x, size.width),
          y: Math.min(y, size.height),
          width: Math.min(w, size.width - x),
          height: Math.min(h, size.height - y)
        });

        return { success: true, dataUrl: cropped.toDataURL() };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    const advancedWindows = new Map();

    this.ipc.handle('create-advanced-window', async (event, extensionId, id, options) => {
      const checkResult = await gatePermission('advanced-window', extensionId);
      if (!checkResult || checkResult.action !== 'allow') {
        return { success: false, error: 'Permission denied: advanced-window' };
      }

      try {
        const { BrowserWindow } = require('electron');
        
        if (advancedWindows.has(id)) {
          const existing = advancedWindows.get(id);
          if (existing && !existing.isDestroyed()) {
            existing.close();
          }
          advancedWindows.delete(id);
        }

        const windowOptions = {
          width: options.width || 400,
          height: options.height || 300,
          frame: !options.frameless,
          transparent: options.transparent || false,
          alwaysOnTop: options.alwaysOnTop || false,
          webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
          }
        };

        if (options.x !== undefined) windowOptions.x = options.x;
        if (options.y !== undefined) windowOptions.y = options.y;

        const win = new BrowserWindow(windowOptions);
        win.on('closed', () => {
          if (advancedWindows.get(id) === win) {
            advancedWindows.delete(id);
          }
        });
        win.loadURL(options.url || 'about:blank');

        advancedWindows.set(id, win);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    this.ipc.handle('set-window-property', async (event, id, prop, value) => {
      try {
        const win = advancedWindows.get(id);
        if (!win || win.isDestroyed()) {
          return { success: false, error: 'Window not found' };
        }

        switch (prop) {
          case 'alwaysOnTop':
            win.setAlwaysOnTop(value);
            break;
          case 'transparent':
            return { success: false, error: 'Cannot change transparency after creation' };
          case 'frameless':
            return { success: false, error: 'Cannot change frame after creation' };
          case 'clickThrough':
            win.setIgnoreMouseEvents(value);
            break;
          case 'draggable':
            win.setMovable(value);
            break;
          default:
            return { success: false, error: `Unknown property: ${prop}` };
        }

        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    this.ipc.handle('close-advanced-window', async (event, id) => {
      try {
        const win = advancedWindows.get(id);
        if (win) {
          if (!win.isDestroyed()) {
            win.close();
          }
          advancedWindows.delete(id);
        }
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    this.ipc.handle('get-hardware-status', async (event, extensionId, device) => {
      const checkResult = await gatePermission('hardware-status', extensionId);
      if (!checkResult || checkResult.action !== 'allow') {
        return { success: false, error: 'Permission denied: hardware-status' };
      }

      try {
        const os = require('os');
        const data = {};

        switch (device) {
          case 'cpu':
            const cpus = os.cpus();
            const cpuUsage = process.cpuUsage();
            data.usage = Math.round((cpuUsage.user / (cpuUsage.user + cpuUsage.system)) * 100) || 0;
            data.model = cpus[0]?.model || 'Unknown';
            data.cores = cpus.length;
            data.speed = cpus[0]?.speed || 0;
            break;

          case 'memory':
            const totalMem = os.totalmem();
            const freeMem = os.freemem();
            data.total = totalMem;
            data.free = freeMem;
            data.used = totalMem - freeMem;
            data.usage = Math.round(((totalMem - freeMem) / totalMem) * 100);
            break;

          case 'gpu':
            data.info = 'GPU info requires additional native modules';
            break;

          case 'network':
            const networkInterfaces = os.networkInterfaces();
            data.interfaces = Object.keys(networkInterfaces);
            break;

          case 'disk':
            const diskUsage = await this._getDiskUsage();
            Object.assign(data, diskUsage);
            break;

          default:
            return { success: false, error: `Unknown device: ${device}` };
        }

        return { success: true, data };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    this.loadURL('cysoeditor://./gui/gui.html');
    this.show();
  }

  getWindowOptions () {
    const options = super.getWindowOptions();
    options.webPreferences = {
      ...options.webPreferences,
      sandbox: false,
    };
    return options;
  }

  getPreload () {
    return 'editor';
  }

  getDimensions () {
    return {
      width: 1280,
      height: 800
    };
  }

  getBackgroundColor () {
    return '#333333';
  }

  applySettings () {
    this.window.webContents.setBackgroundThrottling(settings.backgroundThrottling);
  }

  async _getDiskUsage () {
    try {
      const { exec } = require('child_process');
      const { promisify } = require('util');
      const execAsync = promisify(exec);
      
      if (process.platform === 'win32') {
        const { stdout } = await execAsync('wmic logicaldisk get size,freespace,caption');
        const lines = stdout.trim().split('\n').slice(1);
        const disks = [];
        
        for (const line of lines) {
          const parts = line.trim().split(/\s+/);
          if (parts.length >= 3) {
            const caption = parts[0];
            const freeSpace = parseInt(parts[1]) || 0;
            const size = parseInt(parts[2]) || 0;
            disks.push({
              drive: caption,
              total: size,
              free: freeSpace,
              used: size - freeSpace,
              usage: size > 0 ? Math.round(((size - freeSpace) / size) * 100) : 0
            });
          }
        }
        
        return { disks };
      } else {
        const { stdout } = await execAsync('df -h /');
        const lines = stdout.trim().split('\n');
        if (lines.length >= 2) {
          const parts = lines[1].split(/\s+/);
          return {
            disks: [{
              drive: '/',
              total: parts[1],
              used: parts[2],
              free: parts[3],
              usage: parseInt(parts[4])
            }]
          };
        }
        return { disks: [] };
      }
    } catch (error) {
      return { disks: [], error: error.message };
    }
  }

  enumerateMediaDevices () {
    // Used by desktop settings
    return new Promise((resolve, reject) => {
      this.ipc.once('enumerated-media-devices', (event, result) => {
        if (typeof result.error !== 'undefined') {
          reject(result.error);
        } else {
          resolve(result.devices);
        }
      });
      this.window.webContents.send('enumerate-media-devices');
    });
  }

  handleWindowOpen (details) {
    const url = new URL(details.url);
    const params = new URLSearchParams(url.search);

    // Open extension sample projects in-app
    if (
      url.protocol === 'cysoeditor:' &&
      url.host === '.' &&
      params.has('project_url')
    ) {
      const projectUrl = params.get('project_url');
      const parsedFile = parseOpenedFile(projectUrl, null);
      if (parsedFile.type === TYPE_SAMPLE) {
        new EditorWindow(parsedFile, null);
        return {
          action: 'deny'
        };
      }
    }

    // Open extension documentation in-app
    const extensionsDocsMatch = details.url.match(
      /^https:\/\/extensions\.turbowarp\.org\/([\w_\-.\/]+)$/
    );
    if (extensionsDocsMatch) {
      ExtensionDocumentationWindow.open(extensionsDocsMatch[1]);
      return {
        action: 'deny'
      };
    }

    return super.handleWindowOpen(details);
  }

  canExitFullscreenByPressingEscape () {
    return !this.isInEditorFullScreen;
  }

  onHeadersReceived (details, callback) {
    const url = details.url.toLowerCase();
    
    if (url.startsWith('tw-extensions://') || url.startsWith('cysoeditor://')) {
      const responseHeaders = details.responseHeaders || {};
      responseHeaders['access-control-allow-origin'] = ['*'];
      responseHeaders['access-control-allow-methods'] = ['GET, POST, PUT, DELETE, OPTIONS'];
      responseHeaders['access-control-allow-headers'] = ['Content-Type, Authorization'];
      
      callback({
        responseHeaders
      });
      return;
    }
    
    callback({});
  }

  updateRichPresence () {
    RichPresence.setActivity(this.projectTitle, this.openedProjectAt);
  }

  /**
   * @param {string[]} files
   * @param {boolean} fullscreen
   * @param {string|null} workingDirectory
   */
  static openFiles (files, fullscreen, workingDirectory) {
    if (files.length === 0) {
      EditorWindow.newWindow(fullscreen);
    } else {
      for (const file of files) {
        new EditorWindow(parseOpenedFile(file, workingDirectory), fullscreen);
      }
    }
  }

  /**
   * Open a new window with the default project.
   * @param {boolean} fullscreen
   */
  static newWindow (fullscreen) {
    new EditorWindow(null, fullscreen);
  }
}

module.exports = EditorWindow;
