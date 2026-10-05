const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('DesktopSettingsPreload', {
  init: () => ipcRenderer.sendSync('init'),
  setUpdateChecker: (updateChecker) => ipcRenderer.invoke('set-update-checker', updateChecker),
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  openUpdateWindow: () => ipcRenderer.invoke('open-update-window'),
  openReleasesPage: () => ipcRenderer.invoke('open-releases-page'),
  enumerateMediaDevices: () => ipcRenderer.invoke('enumerate-media-devices'),
  setMicrophone: (microphone) => ipcRenderer.invoke('set-microphone', microphone),
  setCamera: (camera) => ipcRenderer.invoke('set-camera', camera),
  setHardwareAcceleration: (hardwareAcceleration) => ipcRenderer.invoke('set-hardware-acceleration', hardwareAcceleration),
  setBackgroundThrottling: (backgroundThrottling) => ipcRenderer.invoke('set-background-throttling', backgroundThrottling),
  setBypassCORS: (bypassCORS) => ipcRenderer.invoke('set-bypass-cors', bypassCORS),
  setSpellchecker: (spellchecker) => ipcRenderer.invoke('set-spellchecker', spellchecker),
  setExitFullscreenOnEscape: (exitFullscreenOnEscape) => ipcRenderer.invoke('set-exit-fullscreen-on-escape', exitFullscreenOnEscape),
  setRichPresence: (richPresence) => ipcRenderer.invoke('set-rich-presence', richPresence),
  openUserData: () => ipcRenderer.invoke('open-user-data'),
  setRenderGpuMode: (renderGpuMode) => ipcRenderer.invoke('set-render-gpu-mode', renderGpuMode),
  setRenderResolutionCap: (renderResolutionCap) => ipcRenderer.invoke('set-render-resolution-cap', renderResolutionCap),
  /**
   * 订阅下载进度 / 完成 / 失败事件。返回取消订阅函数。
   * @param {(payload: object) => void} listener
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
  onDownloadFailed: (listener) => {
    const handler = (event, payload) => listener(payload);
    ipcRenderer.on('download-failed', handler);
    return () => ipcRenderer.removeListener('download-failed', handler);
  }
});