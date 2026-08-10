const {contextBridge, ipcRenderer} = require('electron');

let activeExtensionStack = [];
let activeExtensionId = null;

const getActiveExtensionId = () => {
  if (activeExtensionStack.length) {
    return activeExtensionStack[activeExtensionStack.length - 1];
  }
  return activeExtensionId;
};

// 全局快捷键事件转发
const shortcutTriggeredCallbacks = [];
ipcRenderer.on('global-shortcut-triggered', (event, data) => {
  for (const cb of shortcutTriggeredCallbacks) {
    try {
      cb(data);
    } catch (err) {
      console.error('onShortcutTriggered 回调出错:', err);
    }
  }
  try {
    if (typeof window !== 'undefined' &&
        typeof window.CustomEvent === 'function' &&
        typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new window.CustomEvent('global-shortcut-triggered', { detail: data }));
    }
  } catch (err) {
    console.error('派发快捷键 DOM 事件失败:', err);
  }
});

contextBridge.exposeInMainWorld('EditorPreload', {
  isInitiallyFullscreen: () => ipcRenderer.sendSync('is-initially-fullscreen'),
  getInitialFile: () => ipcRenderer.invoke('get-initial-file'),
  getFile: (id) => ipcRenderer.invoke('get-file', id),
  openedFile: (id) => ipcRenderer.invoke('opened-file', id),
  closedFile: () => ipcRenderer.invoke('closed-file'),
  showSaveFilePicker: (suggestedName) => ipcRenderer.invoke('show-save-file-picker', suggestedName),
  showOpenFilePicker: (options) => ipcRenderer.invoke('show-open-file-picker', options || null),
  setLocale: (locale) => ipcRenderer.sendSync('set-locale', locale),
  setChanged: (changed) => ipcRenderer.invoke('set-changed', changed),
  openNewWindow: () => ipcRenderer.invoke('open-new-window'),
  openAddonSettings: (search) => ipcRenderer.invoke('open-addon-settings', search),
  openPackager: () => ipcRenderer.invoke('open-packager'),
  openDesktopSettings: () => ipcRenderer.invoke('open-desktop-settings'),
  openPrivacy: () => ipcRenderer.invoke('open-privacy'),
  openAbout: () => ipcRenderer.invoke('open-about'),
  getPreferredMediaDevices: () => ipcRenderer.invoke('get-preferred-media-devices'),
  getAdvancedCustomizations: () => ipcRenderer.invoke('get-advanced-customizations'),
  setExportForPackager: (callback) => {
    exportForPackager = callback;
  },
  setIsFullScreen: (isFullScreen) => ipcRenderer.invoke('set-is-full-screen', isFullScreen),
  openExternalUrl: (url) => ipcRenderer.invoke('open-external-url', url),
  readLocalFolder: (folderPath) => ipcRenderer.invoke('read-local-folder', getActiveExtensionId(), folderPath),
  executeCommand: (command, options) => ipcRenderer.invoke('execute-command', getActiveExtensionId(), command, options),
  writeFile: (filePath, content) => ipcRenderer.invoke('write-file', getActiveExtensionId(), filePath, content),
  readFile: (filePath) => ipcRenderer.invoke('read-file', getActiveExtensionId(), filePath),
  deleteFile: (filePath) => ipcRenderer.invoke('delete-file', getActiveExtensionId(), filePath),
  fileExists: (filePath) => ipcRenderer.invoke('file-exists', getActiveExtensionId(), filePath),
  getFileStats: (filePath) => ipcRenderer.invoke('get-file-stats', getActiveExtensionId(), filePath),
  createFolder: (folderPath) => ipcRenderer.invoke('create-folder', getActiveExtensionId(), folderPath),
  getPath: (name) => ipcRenderer.invoke('get-path', name),
  showNotification: (options) => ipcRenderer.invoke('show-notification', options),
  // 权限默认值
  getDefaults: () => ipcRenderer.invoke('get-defaults'),
  // 兼容旧接口（只读）
  getPermissions: () => ipcRenderer.invoke('get-permissions'),
  getCYSOCoreEnabled: () => ipcRenderer.invoke('get-cyso-core-enabled'),
  setCYSOCoreEnabled: (enabled) => ipcRenderer.invoke('set-cyso-core-enabled', enabled),
  checkPermission: (extensionId, permissionType) => ipcRenderer.invoke('check-permission', extensionId, permissionType),
  // 用户设置的权限写入（默认值 / 指定扩展的某项权限），直接更新运行时强制使用的权限表
  setDefault: (permissionType, setting) => ipcRenderer.invoke('set-default', permissionType, setting),
  setExtensionPermission: (extensionId, permissionType, setting) =>
    ipcRenderer.invoke('set-extension-permission', extensionId, permissionType, setting),

  // 扩展标识上下文
  setActiveExtensionId: (id) => { activeExtensionId = id || null; },
  pushActiveExtensionId: (id) => {
    activeExtensionStack.push(id);
    activeExtensionId = id;
  },
  popActiveExtensionId: () => {
    activeExtensionStack.pop();
    activeExtensionId = activeExtensionStack.length ? activeExtensionStack[activeExtensionStack.length - 1] : null;
  },

  // 扩展权限自动注册
  registerExtensionPermissions: (extensionId, permissions, extensionName) => ipcRenderer.invoke('register-extension-permissions', extensionId, permissions, extensionName),
  getExtensionPermissions: (extensionId) => ipcRenderer.invoke('get-extension-permissions', extensionId),
  getExtensionPermissionStatus: (extensionId, permissionType) => ipcRenderer.invoke('get-extension-permission-status', extensionId, permissionType),
  getAllPermissionsStatus: () => ipcRenderer.invoke('get-all-permissions-status'),
  
  // 全局快捷键
  registerGlobalShortcut: (key, eventName) => ipcRenderer.invoke('register-global-shortcut', getActiveExtensionId(), key, eventName),
  unregisterGlobalShortcut: (key) => ipcRenderer.invoke('unregister-global-shortcut', key),
  onShortcutTriggered: (callback) => {
    if (typeof callback === 'function') {
      shortcutTriggeredCallbacks.push(callback);
    }
  },
  
  // 屏幕绘制窗口
  createOverlayWindow: (id, x, y, w, h) => ipcRenderer.invoke('create-overlay-window', getActiveExtensionId(), id, x, y, w, h),
  setOverlayContent: (id, content) => ipcRenderer.invoke('set-overlay-content', getActiveExtensionId(), id, content),
  closeOverlayWindow: (id) => ipcRenderer.invoke('close-overlay-window', id),
  
  // 屏幕捕获
  captureScreen: (target) => ipcRenderer.invoke('capture-screen', getActiveExtensionId(), target),
  captureRegion: (x, y, w, h) => ipcRenderer.invoke('capture-region', getActiveExtensionId(), x, y, w, h),
  
  // 高级窗口
  createAdvancedWindow: (id, options) => ipcRenderer.invoke('create-advanced-window', getActiveExtensionId(), id, options),
  setWindowProperty: (id, prop, value) => ipcRenderer.invoke('set-window-property', getActiveExtensionId(), id, prop, value),
  closeAdvancedWindow: (id) => ipcRenderer.invoke('close-advanced-window', id),
  
  // 硬件
  getHardwareStatus: (device) => ipcRenderer.invoke('get-hardware-status', getActiveExtensionId(), device),

  setNativeTheme: (isDark) => {
    ipcRenderer.send('tw-set-native-theme', isDark);
  }
});

let exportForPackager = () => Promise.reject(new Error('exportForPackager missing'));

ipcRenderer.on('export-project-to-port', (e) => {
  const port = e.ports[0];
  exportForPackager()
    .then(({data, name}) => {
      port.postMessage({ data, name });
    })
    .catch((error) => {
      console.error(error);
      port.postMessage({ error: true });
    });
});

window.addEventListener('message', (e) => {
  if (e.source === window) {
    const data = e.data;
    if (data && typeof data.ipcStartWriteStream === 'string') {
      ipcRenderer.postMessage('start-write-stream', data.ipcStartWriteStream, e.ports);
    }
  }
});

ipcRenderer.on('enumerate-media-devices', (e) => {
  navigator.mediaDevices.enumerateDevices()
    .then((devices) => {
      e.sender.send('enumerated-media-devices', {
        devices: devices.map((device) => ({
          deviceId: device.deviceId,
          kind: device.kind,
          label: device.label
        }))
      });
    })
    .catch((error) => {
      console.error(error);
      e.sender.send('enumerated-media-devices', {
        error: `${error}`
      });
    });
});

contextBridge.exposeInMainWorld('PromptsPreload', {
  alert: (message) => ipcRenderer.sendSync('alert', message),
  confirm: (message) => ipcRenderer.sendSync('confirm', message),
});

// In some Linux environments, people may try to drag & drop files that we don't have access to.
// Remove when https://github.com/electron/electron/issues/30650 is fixed.
if (navigator.userAgent.includes('Linux')) {
  document.addEventListener('drop', (e) => {
    if (e.isTrusted) {
      for (const file of e.dataTransfer.files) {
        // Using webUtils is safe as we don't have a legacy build for Linux
        const {webUtils} = require('electron');
        const path = webUtils.getPathForFile(file);
        ipcRenderer.invoke('check-drag-and-drop-path', path);
      }
    }
  }, {
    capture: true
  });
}
