const path = require('path');
const AbstractWindow = require('./abstract');
const ProjectRunningWindow = require('./project-running-window');
const {translate} = require('../l10n');

class PackagerPreviewWindow extends ProjectRunningWindow {
  constructor (parentWindow, existingWindow) {
    super({
      existingWindow
    });

    this.window.setBounds(AbstractWindow.calculateWindowBounds(parentWindow.getBounds(), this.window.getBounds()));

    this.show();
  }

  isPopup () {
    return true;
  }

  static getBrowserWindowOverrides () {
    return {
      title: translate('packager.loading-preview'),
      // TODO: would be best to autodetect the right size
      width: 480,
      height: 360,
      useContentSize: true,
      backgroundColor: '#000000',
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        sandbox: true,
        // 预览窗口需要加载与打包器一致的主世界 preload，否则 EditorPreload（含屏幕绘制/全局快捷键等扩展能力）缺失，
        // 导致打包后的项目在预览中无法使用这些功能。
        preload: path.resolve(__dirname, '../../src-preload/packager.js')
      },
      // constructor will show it
      show: false
    };
  }
}

module.exports = PackagerPreviewWindow;
