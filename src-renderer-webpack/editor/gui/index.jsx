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

// Electron never shows the web file chooser for a programmatic click on <input type="file">.
// Redirect those clicks to the native dialog and feed the chosen files back into the input.
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

if (window.EditorPreload && typeof window.EditorPreload.getExtensionCache === 'function') {
  window.__cysoExtensionCache = {
    get: url => window.EditorPreload.getExtensionCache(url)
  };
}

window.__CYsoRenderConfig = {
  gpuMode: 'automatic',
  resolutionCap: 0
};
const applyRenderSettings = renderSettings => {
  if (!renderSettings || typeof renderSettings !== 'object') return;
  if (['automatic', 'force-gpu', 'force-cpu'].includes(renderSettings.gpuMode)) {
    window.__CYsoRenderConfig.gpuMode = renderSettings.gpuMode;
  }
  if (typeof renderSettings.resolutionCap === 'number' && renderSettings.resolutionCap >= 0) {
    window.__CYsoRenderConfig.resolutionCap = renderSettings.resolutionCap;
  }
  window.dispatchEvent(new CustomEvent('cyso:render-settings', {
    detail: window.__CYsoRenderConfig
  }));
};
if (window.EditorPreload && typeof window.EditorPreload.getRenderSettings === 'function') {
  window.EditorPreload.getRenderSettings().then(applyRenderSettings).catch(() => {});
  window.EditorPreload.onRenderSettingsChanged(applyRenderSettings);
}

const appTarget = document.getElementById('app');
document.body.classList.add('tw-loaded');
GUI.setAppElement(appTarget);

ReactDOM.render(<GUI />, appTarget);

const startAddons = () => {
  try {
    require('./addons');
  } catch (error) {
    console.error('Failed to load addons:', error);
  }
};
if (typeof window.requestIdleCallback === 'function') {
  window.requestIdleCallback(startAddons, {timeout: 2000});
} else {
  setTimeout(startAddons, 200);
}

// Custom CSS is cheap and must land before the first paint of the editor chrome. The userscript is
// arbitrary code, so it is deferred until after cyso:load-done to keep it off the loading path.
const applyUserstyle = userstyle => {
  if (!userstyle) return;
  const style = document.createElement('style');
  style.textContent = userstyle;
  document.body.appendChild(style);
};

EditorPreload.getAdvancedCustomizations()
  .then(({userscript, userstyle}) => {
    applyUserstyle(userstyle);
    if (!userscript) return;
    return new Promise(resolve => {
      window.addEventListener('cyso:load-done', resolve, {once: true});
      window.setTimeout(resolve, 4000);
    }).then(() => {
      const script = document.createElement('script');
      script.textContent = userscript;
      document.body.appendChild(script);
    });
  });
