const fs = require('fs');
const path = require('path');
const {app, shell, dialog, BrowserWindow} = require('electron');
const {downloadFile, createDownloadControl, isCancelError} = require('./download');
const {translate} = require('./l10n');
const {APP_NAME} = require('./brand');
const {writeFileAtomic} = require('./atomic-write-stream');

/**
 * @typedef InstallerRecord
 * @property {number} size
 * @property {string} completedAt
 *
 * @typedef InstallerCheck
 * @property {boolean} ok
 * @property {boolean} exists
 * @property {string} reason
 */

/**
 * @type {Map<string, DownloadTask>}
 */
const activeDownloads = new Map();

/** @type {Map<string, InstallerRecord> | null} */
let installerRecords = null;

/**
 * Only one install prompt per session keeps a stray "install now" click from
 * opening a second dialog on top of the first.
 * @type {string | null}
 */
let installPromptShownFor = null;

/**
 * @param {string} template
 * @param {Record<string, string>} values
 * @returns {string}
 */
const formatTemplate = (template, values) => {
  let result = String(template);
  for (const [key, value] of Object.entries(values)) {
    result = result.split(`{${key}}`).join(value);
  }
  return result;
};

/**
 * @returns {string}
 */
const getDefaultUpdatesDirectory = () => {
  try {
    const downloads = app.getPath('downloads');
    if (downloads) {
      return downloads;
    }
  } catch (error) {
    // Not every platform has a downloads path.
  }
  return app.getPath('userData');
};

/**
 * @returns {string}
 */
const getUpdatesDirectory = () => {
  // Imported late due to circular dependency
  const custom = require('./settings').updateDownloadDirectory;
  if (typeof custom === 'string' && custom.trim()) {
    const resolved = path.resolve(custom.trim());
    try {
      if (fs.statSync(resolved).isDirectory()) {
        return resolved;
      }
    } catch (error) {
      // Fall through to the default.
    }
  }
  return getDefaultUpdatesDirectory();
};

/**
 * @param {string} fileName
 * @returns {string}
 */
const getInstallerPath = (fileName) => path.join(getUpdatesDirectory(), path.basename(String(fileName || '')));

/**
 * @param {unknown} filePath
 * @returns {boolean}
 */
const isInsideUpdatesDirectory = (filePath) => {
  if (typeof filePath !== 'string' || !filePath) return false;
  const directory = getUpdatesDirectory();
  return path.resolve(filePath).startsWith(directory + path.sep);
};

/** @type {string[]} */
const INSTALLER_EXTENSIONS = ['.exe', '.dmg', '.pkg', '.deb', '.appimage', '.zip', '.appx'];

/**
 * electron-builder artifact names all start with the product name, separated from
 * the rest by a dash, an underscore, or a space ("CYSOEditor Portable ...").
 * @type {RegExp}
 */
const INSTALLER_FILE_NAME_PATTERN = /^cyso(editor)?[-_ ]/i;

/**
 * @param {string} fileName
 * @returns {boolean}
 */
const isInstallerExtension = (fileName) => {
  const lower = String(fileName || '').toLowerCase();
  return INSTALLER_EXTENSIONS.some((extension) => lower.endsWith(extension));
};

/**
 * @param {string} fileName
 * @returns {boolean}
 */
const isInstallerFileName = (fileName) => {
  const name = String(fileName || '');
  return INSTALLER_FILE_NAME_PATTERN.test(name) && isInstallerExtension(name);
};

/**
 * @param {string} fileName
 * @returns {boolean}
 */
const isPartialInstallerName = (fileName) => {
  const name = String(fileName || '');
  if (!name.endsWith('.part')) return false;
  return INSTALLER_FILE_NAME_PATTERN.test(name) && isInstallerExtension(name.slice(0, -5));
};

/**
 * Header bytes every installer format must start with. A file that does not match
 * is a leftover from an interrupted or corrupted download, not an installer.
 * @type {{extension: string, offset: number, bytes: number[]}[]}
 */
const INSTALLER_SIGNATURES = [
  {extension: '.exe', offset: 0, bytes: [0x4d, 0x5a]},
  {extension: '.appimage', offset: 0, bytes: [0x7f, 0x45, 0x4c, 0x46]},
  {extension: '.zip', offset: 0, bytes: [0x50, 0x4b, 0x03, 0x04]},
  {extension: '.appx', offset: 0, bytes: [0x50, 0x4b, 0x03, 0x04]},
  {extension: '.deb', offset: 0, bytes: [0x21, 0x3c, 0x61, 0x72, 0x63, 0x68, 0x3e, 0x0a]},
  {extension: '.pkg', offset: 0, bytes: [0x78, 0x61, 0x72, 0x21]},
  {extension: '.dmg', offset: 512, bytes: [0x6b, 0x6f, 0x6c, 0x79]}
];

/**
 * @param {string} filePath
 * @returns {boolean} true if there is no signature to check
 */
const hasValidSignature = (filePath) => {
  const lower = filePath.toLowerCase();
  const signature = INSTALLER_SIGNATURES.find((entry) => lower.endsWith(entry.extension));
  if (!signature) return true;

  const buffer = Buffer.alloc(signature.bytes.length);
  let descriptor = null;
  try {
    descriptor = fs.openSync(filePath, 'r');
    const read = fs.readSync(descriptor, buffer, 0, buffer.length, signature.offset);
    if (read < buffer.length) return false;
  } catch (error) {
    return false;
  } finally {
    if (descriptor !== null) {
      try {
        fs.closeSync(descriptor);
      } catch (error) {
        // Nothing to do.
      }
    }
  }
  return signature.bytes.every((byte, index) => buffer[index] === byte);
};

/**
 * @returns {string}
 */
const getInstallerStatePath = () => path.join(app.getPath('userData'), 'installer-state.json');

/**
 * @returns {Map<string, InstallerRecord>}
 */
const readInstallerRecords = () => {
  if (installerRecords) {
    return installerRecords;
  }
  installerRecords = new Map();
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(getInstallerStatePath(), 'utf-8'));
  } catch (error) {
    return installerRecords;
  }
  if (!parsed || typeof parsed !== 'object' || !parsed.installers || typeof parsed.installers !== 'object') {
    return installerRecords;
  }
  for (const [fileName, record] of Object.entries(parsed.installers)) {
    if (!isInstallerFileName(fileName)) continue;
    if (!record || typeof record.size !== 'number' || record.size <= 0) continue;
    installerRecords.set(fileName, {
      size: record.size,
      completedAt: typeof record.completedAt === 'string' ? record.completedAt : ''
    });
  }
  return installerRecords;
};

/**
 * @returns {Promise<void>}
 */
const writeInstallerRecords = () => {
  const installers = {};
  for (const [fileName, record] of readInstallerRecords()) {
    installers[fileName] = record;
  }
  return writeFileAtomic(getInstallerStatePath(), JSON.stringify({installers}, null, 2));
};

/**
 * Remember the size a completed installer is expected to have. Without this a file
 * that was truncated after the download would still pass an existence check and be
 * handed to the installer.
 * @param {string} fileName
 */
const recordInstaller = (fileName) => {
  let size = 0;
  try {
    size = fs.statSync(getInstallerPath(fileName)).size;
  } catch (error) {
    return;
  }
  if (size <= 0) return;
  const records = readInstallerRecords();
  records.set(fileName, {size, completedAt: new Date().toISOString()});
  writeInstallerRecords().catch((error) => {
    console.error('Could not record the installer:', error);
  });
};

/**
 * @param {string} fileName
 */
const forgetInstaller = (fileName) => {
  if (!readInstallerRecords().delete(fileName)) return;
  writeInstallerRecords().catch((error) => {
    console.error('Could not update the installer records:', error);
  });
};

/**
 * @param {string} fileName
 * @returns {InstallerCheck}
 */
const checkInstaller = (fileName) => {
  if (!isInstallerFileName(fileName)) {
    return {ok: false, exists: false, reason: 'name'};
  }
  const filePath = getInstallerPath(fileName);
  if (!isInsideUpdatesDirectory(filePath)) {
    return {ok: false, exists: false, reason: 'path'};
  }

  let stats;
  try {
    stats = fs.statSync(filePath);
  } catch (error) {
    return {ok: false, exists: false, reason: 'missing'};
  }
  if (!stats.isFile() || stats.size <= 0) {
    return {ok: false, exists: true, reason: 'empty'};
  }

  const record = readInstallerRecords().get(fileName);
  if (record && record.size !== stats.size) {
    return {ok: false, exists: true, reason: 'size'};
  }
  if (!hasValidSignature(filePath)) {
    return {ok: false, exists: true, reason: 'signature'};
  }
  return {ok: true, exists: true, reason: ''};
};

/**
 * @param {string} fileName
 * @returns {boolean}
 */
const hasInstaller = (fileName) => checkInstaller(fileName).ok;

/**
 * @param {string} fileName
 * @returns {boolean}
 */
const removeInstallerFile = (fileName) => {
  try {
    fs.rmSync(getInstallerPath(fileName), {force: true});
  } catch (error) {
    console.error('Could not remove the installer:', fileName, error);
    return false;
  }
  forgetInstaller(fileName);
  return true;
};

/**
 * Removes the incomplete files left behind by a crash or a cancelled download.
 * Complete installers are never touched: the user may have closed the update
 * window on purpose and come back to install later, and a download that has been
 * verified should stay on disk until it is replaced or the user deletes it.
 * @returns {void}
 */
const cleanupPartialDownloads = () => {
  let entries;
  try {
    entries = fs.readdirSync(getUpdatesDirectory());
  } catch (error) {
    return;
  }
  for (const entry of entries) {
    if (!isPartialInstallerName(entry)) continue;
    try {
      fs.rmSync(getInstallerPath(entry), {force: true});
    } catch (error) {
      console.error('Could not remove the partial download:', entry, error);
    }
  }

  const records = readInstallerRecords();
  let changed = false;
  for (const fileName of Array.from(records.keys())) {
    if (!fs.existsSync(getInstallerPath(fileName))) {
      records.delete(fileName);
      changed = true;
    }
  }
  if (changed) {
    writeInstallerRecords().catch((error) => {
      console.error('Could not update the installer records:', error);
    });
  }
};

/**
 * @typedef DownloadTask
 * @property {string} filePath
 * @property {object} control
 * @property {{received: number, total: number, speed: number, url: string}} progress
 * @property {Promise<string>} promise
 */

/**
 * @param {string} url
 * @param {unknown} error
 * @returns {Error & {code?: string}}
 */
const createNetworkError = (url, error) => {
  const wrapped = new Error(
    `HTTP error while downloading ${url}: ${error && error.message ? error.message : error}`
  );
  if (error && typeof error.code === 'string') {
    wrapped.code = error.code;
  }
  return wrapped;
};

/**
 * @param {{name: string}} source
 * @param {{urls: string[], onProgress?: Function, onRetry?: Function}} options
 * @returns {Promise<string>}
 */
const startDownload = (source, {urls, onProgress, onRetry}) => {
  const existing = activeDownloads.get(source.name);
  if (existing) {
    return existing.promise;
  }

  const candidates = (Array.isArray(urls) ? urls : []).filter((url) => typeof url === 'string' && url);
  if (!candidates.length) {
    return Promise.reject(new Error('No download URL is available'));
  }

  const filePath = getInstallerPath(source.name);
  const control = createDownloadControl();
  const task = {
    filePath,
    control,
    progress: {received: 0, total: 0, speed: 0, url: candidates[0]},
    promise: null
  };
  activeDownloads.set(source.name, task);

  let lastSampleAt = Date.now();
  let lastSampleBytes = 0;

  const promise = (async () => {
    const check = checkInstaller(source.name);
    if (check.ok) {
      return filePath;
    }
    if (check.exists) {
      removeInstallerFile(source.name);
    }

    fs.mkdirSync(path.dirname(filePath), {recursive: true});

    let lastError = null;
    for (let index = 0; index < candidates.length; index++) {
      const url = candidates[index];
      task.progress.url = url;
      lastSampleAt = Date.now();
      lastSampleBytes = 0;
      try {
        const savedPath = await downloadFile(url, filePath, ({received, total}) => {
          const now = Date.now();
          const elapsed = now - lastSampleAt;
          if (elapsed >= 500) {
            task.progress.speed = ((received - lastSampleBytes) * 1000) / elapsed;
            lastSampleAt = now;
            lastSampleBytes = received;
          }
          task.progress = {
            received,
            total,
            speed: task.progress.speed,
            url
          };
          if (onProgress) {
            onProgress({received, total, speed: task.progress.speed});
          }
        }, control);
        recordInstaller(source.name);
        return savedPath;
      } catch (error) {
        if (isCancelError(error)) {
          throw error;
        }
        lastError = createNetworkError(url, error);
        if (index + 1 < candidates.length && !control.cancelled) {
          if (onRetry) {
            onRetry({url, nextUrl: candidates[index + 1], attempt: index + 1, total: candidates.length});
          }
        }
      }
    }
    throw lastError || new Error('Download failed');
  })()
    .then((savedPath) => {
      activeDownloads.delete(source.name);
      return savedPath;
    })
    .catch((error) => {
      activeDownloads.delete(source.name);
      throw error;
    });

  task.promise = promise;

  return promise;
};

/**
 * @param {string} fileName
 * @returns {{received: number, total: number} | null}
 */
const getDownloadProgress = (fileName) => {
  const task = activeDownloads.get(fileName);
  if (!task || !task.progress.total) {
    return null;
  }
  return {...task.progress};
};

/**
 * @param {string} fileName
 * @returns {boolean}
 */
const isDownloading = (fileName) => activeDownloads.has(fileName);

/**
 * @param {string} fileName
 * @returns {boolean}
 */
const cancelDownload = (fileName) => {
  const task = activeDownloads.get(fileName);
  if (!task) {
    return false;
  }
  task.control.cancel();
  return true;
};

/**
 * @param {string} fileName
 * @returns {boolean}
 */
const deleteInstaller = (fileName) => {
  if (!isInstallerFileName(fileName)) return false;
  if (!fs.existsSync(getInstallerPath(fileName))) {
    return false;
  }
  return removeInstallerFile(fileName);
};

/**
 * @returns {Electron.BrowserWindow | null}
 */
const getDialogParent = () => {
  const windows = BrowserWindow.getAllWindows().filter((window) => !window.isDestroyed() && window.isVisible());
  return windows.find((window) => window.isFocused()) || windows[0] || null;
};

/**
 * @param {unknown} filePath
 * @returns {boolean}
 */
const revealInstaller = (filePath) => {
  if (!isInsideUpdatesDirectory(filePath)) {
    console.error('Refused to reveal a file outside the updates directory:', filePath);
    return false;
  }
  if (!fs.existsSync(filePath)) {
    return false;
  }
  shell.showItemInFolder(filePath);
  return true;
};

/**
 * @param {unknown} filePath
 * @returns {Promise<{started: boolean, error?: string}>}
 */
const launchInstaller = async (filePath) => {
  if (!isInsideUpdatesDirectory(filePath)) {
    console.error('Refused to run a file outside the updates directory:', filePath);
    return {started: false, error: translate('update.install-invalid')};
  }

  const fileName = path.basename(filePath);
  const check = checkInstaller(fileName);
  if (!check.ok) {
    return {started: false, error: translate('update.install-invalid')};
  }

  const error = await shell.openPath(filePath);
  if (error) {
    return {started: false, error};
  }

  // The installer may still be reading itself, so quit a moment later.
  setTimeout(() => app.quit(), 1500);

  return {started: true};
};

/**
 * @param {string} filePath
 * @param {string} version
 * @returns {Promise<{started: boolean, error?: string}>}
 */
const promptToInstall = async (filePath, version) => {
  if (installPromptShownFor === filePath) {
    return {started: false};
  }
  installPromptShownFor = filePath;

  const options = {
    type: 'info',
    title: APP_NAME,
    message: translate('update.install-ready-title'),
    detail: formatTemplate(translate('update.install-ready-message'), {
      appNameVersion: `${APP_NAME} v${version}`
    }),
    buttons: [
      translate('update.install-button'),
      translate('update.install-later-button')
    ],
    defaultId: 0,
    cancelId: 1,
    noLink: true
  };

  try {
    const parent = getDialogParent();
    const result = parent ? await dialog.showMessageBox(parent, options) : await dialog.showMessageBox(options);
    if (result.response !== 0) {
      return {started: false};
    }
  } catch (error) {
    console.error('Could not show the install prompt:', error);
    return {started: false};
  }

  return launchInstaller(filePath);
};

/**
 * @returns {void}
 */
const resetInstallPrompt = () => {
  installPromptShownFor = null;
};

module.exports = {
  getUpdatesDirectory,
  getInstallerPath,
  checkInstaller,
  hasInstaller,
  cleanupPartialDownloads,
  startDownload,
  isDownloading,
  getDownloadProgress,
  cancelDownload,
  deleteInstaller,
  revealInstaller,
  launchInstaller,
  promptToInstall,
  resetInstallPrompt
};