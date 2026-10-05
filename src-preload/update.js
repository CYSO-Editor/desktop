const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('UpdatePreload', {
  getStrings: () => ipcRenderer.sendSync('get-strings'),
  getInfo: () => ipcRenderer.sendSync('get-info'),
  /**
   * @param {string} sourceName
   * @returns {string}
   */
  getInstallerPath: (sourceName) => ipcRenderer.sendSync('get-installer-path', sourceName),
  /**
   * @param {string} sourceName
   * @param {{proxyId?: string, customSource?: string}} [options]
   * @returns {Promise<object>}
   */
  download: (sourceName, options) => ipcRenderer.invoke('download', sourceName, options),
  /**
   * @param {string} sourceName
   * @returns {Promise<{cancelled: boolean}>}
   */
  cancelDownload: (sourceName) => ipcRenderer.invoke('cancel-download', sourceName),
  /**
   * @param {string} sourceName
   * @returns {Promise<{deleted: boolean}>}
   */
  deleteInstaller: (sourceName) => ipcRenderer.invoke('delete-installer', sourceName),
  /**
   * @param {string} filePath
   * @returns {Promise<{revealed: boolean}>}
   */
  revealInstaller: (filePath) => ipcRenderer.invoke('reveal-installer', filePath),
  /**
   * @param {string} filePath
   * @returns {Promise<{started: boolean, error?: string}>}
   */
  install: (filePath) => ipcRenderer.invoke('install', filePath),
  openReleasesPage: () => ipcRenderer.invoke('open-releases-page'),
  ignore: (ignored) => ipcRenderer.invoke('ignore', ignored),
  /**
   * @param {string} source
   * @returns {Promise<{saved: boolean}>}
   */
  setCustomSource: (source) => ipcRenderer.invoke('set-custom-source', source),
  /**
   * @param {string} proxyId
   * @returns {Promise<{proxyId: string}>}
   */
  setProxy: (proxyId) => ipcRenderer.invoke('set-proxy', proxyId),
  /**
   * @param {(payload: {sourceName: string, received: number, total: number, speed: number}) => void} listener
   * @returns {() => void}
   */
  onDownloadProgress: (listener) => {
    const handler = (event, payload) => listener(payload);
    ipcRenderer.on('download-progress', handler);
    return () => ipcRenderer.removeListener('download-progress', handler);
  },
  onDownloadComplete: (listener) => {
    const handler = (event, payload) => listener(payload);
    ipcRenderer.on('download-complete', handler);
    return () => ipcRenderer.removeListener('download-complete', handler);
  },
  /**
   * @param {(payload: {sourceName: string}) => void} listener
   * @returns {() => void}
   */
  onDownloadCanceled: (listener) => {
    const handler = (event, payload) => listener(payload);
    ipcRenderer.on('download-canceled', handler);
    return () => ipcRenderer.removeListener('download-canceled', handler);
  },
  /**
   * @param {(payload: {sourceName: string, mirror: string, next: string, attempt: number, total: number}) => void} listener
   * @returns {() => void}
   */
  onDownloadRetry: (listener) => {
    const handler = (event, payload) => listener(payload);
    ipcRenderer.on('download-retry', handler);
    return () => ipcRenderer.removeListener('download-retry', handler);
  }
});