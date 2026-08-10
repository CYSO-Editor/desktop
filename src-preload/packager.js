const {contextBridge, ipcRenderer} = require('electron');

let activeExtensionId = null;
const activeExtensionStack = [];
const getActiveExtensionId = () => {
  if (activeExtensionStack.length > 0) {
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

contextBridge.exposeInMainWorld('GlobalPackagerImporter', () => new Promise((resolve, reject) => {
  const channel = new MessageChannel();
  channel.port1.onmessage = (e) => {
    const data = e.data;
    if (data.error) {
      reject(new Error('Failed to import'));
    } else {
      resolve({
        name: `${data.name}.sb3`,
        data: data.data
      });
    }
  };
  ipcRenderer.postMessage('import-project-with-port', null, [channel.port2]);
}));

contextBridge.exposeInMainWorld('PromptsPreload', {
  alert: (message) => ipcRenderer.sendSync('alert', message),
  confirm: (message) => ipcRenderer.sendSync('confirm', message),
});

contextBridge.exposeInMainWorld('IsDesktop', true);

contextBridge.exposeInMainWorld('EditorPreload', {
  // 文件操作
  readFile: (filePath) => ipcRenderer.invoke('read-file', getActiveExtensionId(), filePath),
  writeFile: (filePath, content) => ipcRenderer.invoke('write-file', getActiveExtensionId(), filePath, content),
  deleteFile: (filePath) => ipcRenderer.invoke('delete-file', getActiveExtensionId(), filePath),
  fileExists: (filePath) => ipcRenderer.invoke('file-exists', getActiveExtensionId(), filePath),
  getFileStats: (filePath) => ipcRenderer.invoke('get-file-stats', getActiveExtensionId(), filePath),
  createFolder: (folderPath) => ipcRenderer.invoke('create-folder', getActiveExtensionId(), folderPath),
  readLocalFolder: (folderPath) => ipcRenderer.invoke('read-local-folder', getActiveExtensionId(), folderPath),

  // 系统路径
  getPath: (name) => ipcRenderer.invoke('get-path', name),

  // 系统命令
  executeCommand: (command, options) => ipcRenderer.invoke('execute-command', getActiveExtensionId(), command, options),

  // 通知
  showNotification: (options) => ipcRenderer.invoke('show-notification', options),

  // 权限默认值（控制中心设置）
  getDefaults: () => ipcRenderer.invoke('get-defaults'),
  setDefault: (permissionType, setting) => ipcRenderer.invoke('set-default', permissionType, setting),
  // 兼容旧通用接口（写入的是默认值）
  getPermissions: () => ipcRenderer.invoke('get-permissions'),
  setPermissions: (permissions) => ipcRenderer.invoke('set-permissions', permissions),
  getCYSOCoreEnabled: () => ipcRenderer.invoke('get-cyso-core-enabled'),
  setCYSOCoreEnabled: (enabled) => ipcRenderer.invoke('set-cyso-core-enabled', enabled),
  checkPermission: (extensionId, permissionType) => ipcRenderer.invoke('check-permission', extensionId, permissionType),

  // 扩展标识上下文（由渲染端在每块积木执行前后调用，preload 自身保存）
  setActiveExtensionId: (id) => { activeExtensionId = id || null; },
  pushActiveExtensionId: (id) => {
    activeExtensionStack.push(id);
    activeExtensionId = id;
  },
  popActiveExtensionId: () => {
    activeExtensionStack.pop();
    activeExtensionId = activeExtensionStack.length ? activeExtensionStack[activeExtensionStack.length - 1] : null;
  },

  // 扩展权限自动注册（按扩展隔离，携带友好名称供弹窗显示）
  registerExtensionPermissions: (extensionId, permissions, extensionName) => ipcRenderer.invoke('register-extension-permissions', extensionId, permissions, extensionName),
  getExtensionPermissions: (extensionId) => ipcRenderer.invoke('get-extension-permissions', extensionId),
  setExtensionPermission: (extensionId, permissionType, setting) => ipcRenderer.invoke('set-extension-permission', extensionId, permissionType, setting),
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

  // 硬件状态
  getHardwareStatus: (device) => ipcRenderer.invoke('get-hardware-status', getActiveExtensionId(), device),
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
