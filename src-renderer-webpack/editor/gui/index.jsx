import React from 'react';
import ReactDOM from 'react-dom';
import GUI from './gui.jsx';

import './media-device-chooser-impl.js';
import '../prompt/prompt.js';

const MIME_BY_EXTENSION = {
  mp4: 'video/mp4',
  webm: 'video/webm',
  ogv: 'video/ogg',
  ogg: 'video/ogg',
  mov: 'video/quicktime',
  avi: 'video/x-msvideo',
  mkv: 'video/x-matroska',
  m4v: 'video/mp4',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  oga: 'audio/ogg',
  m4a: 'audio/mp4',
  flac: 'audio/flac',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  bmp: 'image/bmp',
  json: 'application/json',
  txt: 'text/plain',
  pdf: 'application/pdf'
};

const mimeFromName = (name) => {
  const ext = String(name || '').split('.').pop().toLowerCase();
  return MIME_BY_EXTENSION[ext] || '';
};

// 让渲染进程内 <input type="file">.click() 透明改用原生文件对话框（Electron 不会弹 web 文件框）
(function patchFileInputClick() {
  const EP = window.EditorPreload;
  if (!window.HTMLInputElement || !EP ||
      typeof EP.showOpenFilePicker !== 'function' || typeof EP.getFile !== 'function') {
    return;
  }
  const origClick = window.HTMLInputElement.prototype.click;
  window.HTMLInputElement.prototype.click = function () {
    if (this.type !== 'file') {
      return origClick.apply(this, arguments);
    }
    const input = this;
    const exts = (this.getAttribute('accept') || this.accept || '')
      .split(',')
      .map((p) => p.trim())
      .filter((p) => p.charAt(0) === '.')
      .map((p) => p.slice(1));
    const filters = exts.length
      ? [{name: 'Files', extensions: exts}]
      : [{name: 'All Files', extensions: ['*']}];
    Promise.resolve(EP.showOpenFilePicker({
      filters,
      properties: this.multiple ? ['openFile', 'multiSelections'] : ['openFile'],
      multiple: !!this.multiple
    }))
      .then((result) => {
        if (!result) return;
        const list = Array.isArray(result) ? result : [result];
        return Promise.all(list.map((r) =>
          EP.getFile(r.id).then((data) => {
            const name = data.name || r.name;
            return new File([data.data], name, {type: mimeFromName(name) || ''});
          })
        ));
      })
      .then((files) => {
        if (!files || !files.length) return;
        const dt = new DataTransfer();
        for (const f of files) dt.items.add(f);
        Object.defineProperty(input, 'files', {
          configurable: true,
          enumerable: true,
          get: () => dt.files
        });
        input.dispatchEvent(new Event('change', {bubbles: true}));
        input.dispatchEvent(new Event('input', {bubbles: true}));
      })
      .catch((err) => console.error('file picker error:', err));
  };
})();

const appTarget = document.getElementById('app');
document.body.classList.add('tw-loaded');
GUI.setAppElement(appTarget);

ReactDOM.render(<GUI />, appTarget);

require('./addons');

EditorPreload.getAdvancedCustomizations().then(({userscript, userstyle}) => {
  if (userstyle) {
    const style = document.createElement('style');
    style.textContent = userstyle;
    document.body.appendChild(style);
  }

  if (userscript) {
    const script = document.createElement('script');
    script.textContent = userscript;
    document.body.appendChild(script);
  }
});
