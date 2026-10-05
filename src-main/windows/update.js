const {BrowserWindow} = require('electron');
const AbstractWindow = require('./abstract');
const {translate, getLocale, getStrings} = require('../l10n');
const {APP_NAME} = require('../brand');
const openExternal = require('../open-external');
const updates = require('../updates');
const {resolveDownloadURL, DOWNLOAD_PROXIES, readSelectedProxyId, saveSelectedProxyId} = require('../github-releases');
const {isCancelError} = require('../download');

/**
 * @typedef UpdateInfo
 * @property {string} currentVersion
 * @property {string} latestVersion
 * @property {boolean} updateAvailable
 * @property {boolean} prerelease
 * @property {string} publishedAt
 * @property {string} releaseUrl
 * @property {string[]} changelog
 * @property {{name: string, url: string, size: string, arch: string, method: string, platform: string}[]} sources
 * @property {string} [recommendedSourceName]
 * @property {string} [hostPlatform]
 * @property {string} [hostArch]
 * @property {string} releasesPage
 * @property {{id: string, name: string}[]} proxies
 * @property {string} [selectedProxyId]
 */

/**
 * @param {unknown} value
 * @returns {string}
 */
const readText = (value) => (typeof value === 'string' ? value.trim() : '');

/**
 * Builds the list of URLs to try in order.
 *
 * A mirror that fails outright is often just down, and the partial file it left
 * behind is still usable by the next mirror, so every candidate writes to the same
 * path. GitHub itself goes last because it is the slowest option but the most
 * reliable one.
 *
 * @param {string} assetURL
 * @param {string} primaryURL
 * @param {string} customSource
 * @returns {string[]}
 */
const buildFallbackChain = (assetURL, primaryURL, customSource) => {
  const urls = [primaryURL];
  for (const proxy of DOWNLOAD_PROXIES) {
    const candidate = resolveDownloadURL(assetURL, proxy.id, customSource);
    if (!urls.includes(candidate)) {
      urls.push(candidate);
    }
  }
  if (customSource) {
    return urls;
  }
  const direct = resolveDownloadURL(assetURL, '', '');
  if (!urls.includes(direct)) {
    urls.push(direct);
  }
  return urls;
};

class UpdateWindow extends AbstractWindow {
  /** @param {UpdateInfo} info */
  constructor (info) {
    super();

    this.info = info;

    this.window.setTitle(`${translate('update.window-title')} - ${APP_NAME}`);

    this.ipc.on('get-strings', (event) => {
      event.returnValue = {
        appName: APP_NAME,
        locale: getLocale(),
        strings: getStrings()
      };
    });

    this.ipc.on('get-info', (event) => {
      const recommended = this.getRecommendedSource();
      const downloading = recommended ? updates.isDownloading(recommended.name) : false;
      const progress = recommended ? updates.getDownloadProgress(recommended.name) : null;
      event.returnValue = {
        appName: APP_NAME,
        currentVersion: info.currentVersion,
        latestVersion: info.latestVersion,
        publishedAt: info.publishedAt,
        sources: info.sources,
        recommendedSourceName: recommended ? recommended.name : '',
        recommendedSourceMeta: recommended ?
          [recommended.platform, recommended.arch, recommended.method, recommended.size]
            .filter(Boolean)
            .join(' · ') :
          '',
        hostPlatform: info.hostPlatform || '',
        hostArch: info.hostArch || '',
        releasesPage: info.releasesPage,
        proxies: info.proxies,
        selectedProxyId: this.getSelectedProxyId(),
        installerReady: recommended ? updates.hasInstaller(recommended.name) : false,
        updateIgnored: this.isUpdateIgnored(),
        downloadDirectory: updates.getUpdatesDirectory(),
        customSource: this.getCustomSource(),
        downloading,
        downloadProgress: progress
      };
    });

    this.ipc.handle('set-custom-source', async (event, source) => {
      // Imported late due to circular dependency
      const settings = require('../settings');
      settings.customUpdateSource = readText(source);
      await settings.save();
      return {saved: true};
    });

    this.ipc.handle('set-proxy', async (event, proxyId) => {
      await saveSelectedProxyId(readText(proxyId));
      return {proxyId: this.getSelectedProxyId()};
    });

    this.ipc.handle('download', async (event, sourceName, {proxyId = '', customSource = ''} = {}) => {
      const source = info.sources.find((item) => item.name === sourceName);
      if (!source) {
        throw new Error(`Unknown download source: ${sourceName}`);
      }

      const effectiveCustomSource = readText(customSource) || this.getCustomSource();
      const primaryURL = resolveDownloadURL(source.url, proxyId, effectiveCustomSource);
      const urls = buildFallbackChain(source.url, primaryURL, effectiveCustomSource);
      const alreadyDownloaded = updates.hasInstaller(sourceName);

      let filePath;
      try {
        filePath = await updates.startDownload(source, {
          urls,
          onProgress: (progress) => {
            this.sendDownloadProgress(source.name, progress);
          },
          onRetry: ({url, nextUrl, attempt, total}) => {
            this.sendDownloadRetry(source, url, nextUrl, attempt, total);
          }
        });
      } catch (error) {
        // Electron drops custom error properties when an error crosses processes,
        // so a cancellation has to be reported as a return value instead.
        if (isCancelError(error)) {
          return {canceled: true};
        }
        console.error('Could not download the update:', error);
        return {failed: true, error: translate('update.download-failed')};
      }

      const check = updates.checkInstaller(source.name);
      if (!check.ok) {
        return {invalid: true, error: translate('update.install-invalid')};
      }

      this.onDownloadComplete(source, filePath);
      return {filePath, alreadyDownloaded};
    });

    this.ipc.handle('cancel-download', async (event, sourceName) => {
      const cancelled = updates.cancelDownload(sourceName);
      if (cancelled) {
        this.sendDownloadCanceled(sourceName);
      }
      return {cancelled};
    });

    this.ipc.handle('delete-installer', async (event, sourceName) => {
      return {deleted: updates.deleteInstaller(sourceName)};
    });

    this.ipc.handle('reveal-installer', async (event, filePath) => {
      return {revealed: updates.revealInstaller(filePath)};
    });

    // This one uses on + returnValue because the preload sends it with sendSync.
    this.ipc.on('get-installer-path', (event, sourceName) => {
      event.returnValue = updates.getInstallerPath(sourceName);
    });

    this.ipc.handle('open-releases-page', async () => {
      openExternal(info.releasesPage);
    });

    this.ipc.handle('install', async (event, filePath) => {
      const result = await updates.launchInstaller(filePath);
      return result;
    });

    this.ipc.handle('ignore', async (event, ignored) => {
      this.setIgnoreState(ignored === true);
      return {ignored: ignored === true};
    });

    this.window.webContents.on('did-finish-load', () => {
      this.show();
    });

    this.loadURL('tw-update://./update.html');
  }

  /**
   * @returns {UpdateInfo['sources'][0] | null}
   */
  getRecommendedSource () {
    const sources = Array.isArray(this.info.sources) ? this.info.sources : [];
    if (!this.info.recommendedSourceName) {
      return null;
    }
    return sources.find((source) => source.name === this.info.recommendedSourceName) || null;
  }

  /**
   * @returns {string}
   */
  getSelectedProxyId () {
    const saved = readSelectedProxyId();
    if (saved) {
      return saved;
    }
    return this.info.selectedProxyId || (DOWNLOAD_PROXIES[0] ? DOWNLOAD_PROXIES[0].id : '');
  }

  /**
   * @returns {string}
   */
  getCustomSource () {
    // Imported late due to circular dependency
    return require('../settings').customUpdateSource;
  }

  /**
   * @returns {boolean}
   */
  isUpdateIgnored () {
    // Imported late due to circular dependency
    const settings = require('../settings');
    return settings.isUpdateVersionIgnored(this.info.latestVersion);
  }

  /**
   * @param {boolean} ignored
   * @returns {void}
   */
  setIgnoreState (ignored) {
    // Imported late due to circular dependency
    const {ignoreUpdate} = require('../update-checker');
    ignoreUpdate(this.info.latestVersion, ignored)
      .catch((error) => {
        console.error('Could not save the ignore setting:', error);
      });
  }

  /**
   * @param {{name: string}} source
   * @param {string} filePath
   * @returns {void}
   */
  onDownloadComplete (source, filePath) {
    this.send('download-complete', {
      sourceName: source.name,
      filePath
    });

    updates.promptToInstall(filePath, this.info.latestVersion)
      .then((result) => {
        // A prompt the user dismissed, or one that could not be shown, must not
        // consume the one-shot flag; otherwise a retry can never ask again.
        if (!result.started) {
          updates.resetInstallPrompt();
        }
      })
      .catch((error) => {
        updates.resetInstallPrompt();
        console.error('Could not prompt to install:', error);
      });
  }

  /**
   * @param {string} sourceName
   * @param {{received: number, total: number, speed: number}} progress
   * @returns {void}
   */
  sendDownloadProgress (sourceName, progress) {
    this.send('download-progress', {
      sourceName,
      received: progress.received,
      total: progress.total,
      speed: progress.speed
    });
  }

  /**
   * @param {{name: string, url: string}} source
   * @param {string} url
   * @param {string} nextUrl
   * @param {number} attempt
   * @param {number} total
   * @returns {void}
   */
  sendDownloadRetry (source, url, nextUrl, attempt, total) {
    const host = (value) => {
      try {
        return new URL(value).host;
      } catch (error) {
        return value;
      }
    };
    this.send('download-retry', {
      sourceName: source.name,
      mirror: host(url),
      next: host(nextUrl),
      attempt,
      total
    });
  }

  /**
   * @param {string} sourceName
   * @returns {void}
   */
  sendDownloadCanceled (sourceName) {
    this.send('download-canceled', {sourceName});
  }

  /**
   * Sends to this window only. Progress belongs to the download this window
   * started, so other windows must not repaint from it.
   *
   * @param {string} channel
   * @param {unknown} payload
   * @returns {void}
   */
  send (channel, payload) {
    if (this.window.isDestroyed()) {
      return;
    }
    this.window.webContents.send(channel, payload);
  }

  getDimensions () {
    return {
      width: 520,
      height: 660
    };
  }

  getPreload () {
    return 'update';
  }

  isPopup () {
    return true;
  }

  /**
   * @param {UpdateInfo} info
   * @returns {UpdateWindow}
   */
  static updateAvailable (info) {
    const existing = AbstractWindow.getWindowsByClass(UpdateWindow)[0];
    if (existing) {
      if (existing.window.isMinimized()) {
        existing.window.restore();
      }
      existing.show();
      return existing;
    }
    return new UpdateWindow(info);
  }

  /**
   * @param {string} sourceName
   * @returns {boolean}
   */
  static isDownloading (sourceName) {
    return updates.isDownloading(sourceName);
  }
}

module.exports = UpdateWindow;
module.exports.buildFallbackChain = buildFallbackChain;