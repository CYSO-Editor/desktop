const fsPromises = require('fs/promises');
const path = require('path')
const AbstractWindow = require('./abstract');
const settings = require('../settings');
const askForMediaAccess = require('../media-permissions');
const SecurityPromptWindow = require('./security-prompt');

const listLocalFiles = async () => {
  const files = await fsPromises.readdir(path.join(__dirname, '../../dist-library-files/'));
  return files.map(filename => filename.replace('.br', ''));
};

let cached = null;
const listLocalFilesCached = () => {
  if (!cached) {
    cached = listLocalFiles()
      .catch((error) => {
        console.error(error);
        return [];
      });
  }
  return cached;
};

/**
 * @param {string} url
 * @returns {string|null} eg. "https:" or null if invalid URL
 */
const getProtocol = url => {
  try {
    return new URL(url).protocol;
  } catch (e) {
    return null;
  }
};

const WEB_PROTOCOLS = ['http:', 'https:'];

class ProjectRunningWindow extends AbstractWindow {
  handlePermissionCheck (permission, details) {
    return (
      // Autoplay audio and media device enumeration
      permission === 'media' ||

      // Entering fullscreen with enhanced fullscreen addon
      permission === 'window-placement' ||

      // Notifications extension
      // Actually displaying notifications also requires handlePermissionRequest check
      permission === 'notifications' ||

      // Custom fonts menu
      permission === 'local-fonts'
    );
  }

  async handlePermissionRequest (permission, details) {
    // Attempting to record video or audio
    if (permission === 'media') {
      // mediaTypes is not guaranteed to exist
      const mediaTypes = details.mediaTypes || [];
      for (const mediaType of mediaTypes) {
        const hasPermission = await askForMediaAccess(this.window, mediaType);
        if (!hasPermission) {
          return false;
        }
      }
      return true;
    }

    // Clipboard extension
    if (permission === 'clipboard-read') {
      return SecurityPromptWindow.requestReadClipboard(this.window);
    }

    // Notifications extension
    if (permission === 'notifications') {
      return SecurityPromptWindow.requestNotifications(this.window);
    }

    return (
      // Enhanced fullscreen addon
      permission === 'fullscreen' ||

      // Pointerlock extension and experiment
      permission === 'pointerLock' ||

      // Clipboard extension
      // Writing is safer than reading
      permission === 'clipboard-sanitized-write' ||

      // Wake Lock extension
      permission === 'screen-wake-lock' ||

      // Backpack, restore points want persistent storage
      permission === 'persistent-storage'
    );
  }

  onBeforeRequest (details, callback) {
    if (details.resourceType === 'cspReport' || details.resourceType === 'ping') {
      return callback({
        cancel: true
      });
    }

    const parsed = new URL(details.url);

    if (parsed.origin === 'https://cdn.assets.scratch.mit.edu' || parsed.origin === 'https://assets.scratch.mit.edu') {
      const match = parsed.href.match(/[0-9a-f]{32}\.\w{3}/i);
      if (match) {
        const md5ext = match[0];
        console.log('[Library] Checking for local file:', md5ext);
        return listLocalFilesCached().then((localLibraryFiles) => {
          console.log('[Library] Local files:', localLibraryFiles);
          console.log('[Library] Including?', localLibraryFiles.includes(md5ext));
          if (localLibraryFiles.includes(md5ext)) {
            console.log('[Library] Redirecting to tw-library://./' + md5ext);
            return callback({
              redirectURL: `tw-library://./${md5ext}`
            });
          }
          console.log('[Library] File not found locally, allowing request to proceed');
          callback({});
        });
      }
    }

    if (parsed.origin === 'https://extensions.turbowarp.org') {
      console.log('[Extensions] Request:', parsed.pathname);
      // Don't redirect extension metadata JSON - fetch directly from network
      if (parsed.pathname.includes('/generated-metadata/extensions-v0.json')) {
        console.log('[Extensions] NOT redirecting extensions-v0.json');
        return callback({});
      }
      // Check if file exists locally before redirecting
      const fs = require('fs');
      const path = require('path');
      const localPath = path.join(__dirname, '../../dist-extensions', parsed.pathname);
      if (fs.existsSync(localPath) || fs.existsSync(localPath + '.br')) {
        console.log('[Extensions] Redirecting to tw-extensions://', parsed.pathname);
        return callback({
          redirectURL: `tw-extensions://.${parsed.pathname}`
        });
      }
      // File doesn't exist locally, fetch from network
      console.log('[Extensions] File not found locally, allowing request to proceed');
      return callback({});
    }

    if (parsed.origin === 'https://cysoeditor.pages.dev') {
      console.log('[Extensions] Request (cysoeditor):', parsed.pathname);
      // Don't redirect extension metadata JSON - fetch directly from network
      if (parsed.pathname.includes('/generated-metadata/extensions-v0.json')) {
        console.log('[Extensions] NOT redirecting extensions-v0.json');
        return callback({});
      }
      // Check if file exists locally before redirecting
      const fs = require('fs');
      const path = require('path');
      const localPath = path.join(__dirname, '../../dist-extensions', parsed.pathname);
      if (fs.existsSync(localPath) || fs.existsSync(localPath + '.br')) {
        console.log('[Extensions] Redirecting to tw-extensions://', parsed.pathname);
        return callback({
          redirectURL: `tw-extensions://.${parsed.pathname}`
        });
      }
      // File doesn't exist locally, fetch from network
      console.log('[Extensions] File not found locally, allowing request to proceed');
      return callback({});
    }

    super.onBeforeRequest(details, callback);
  }

  onBeforeSendHeaders (details, callback) {
    const parsed = new URL(details.url);

    if (WEB_PROTOCOLS.includes(parsed.protocol)) {
      // Some third-party APIs (eg. YouTube embeds) require a non-empty referer header.
      // The website being contacted already receives "cysoeditor-desktop/x.y.z" in the user-agent so this isn't
      // revealing any metadata that they couldn't already have access to.
      return callback({
        requestHeaders: {
          referer: 'https://cysoeditor.pages.dev/referer.html'
        }
      });
    }

    callback({});
  }

  onHeadersReceived (details, callback) {
    if (
      settings.bypassCORS &&
      // Don't give extra powers when fetching our custom protocols
      WEB_PROTOCOLS.includes(getProtocol(details.url))
    ) {
      const newHeaders = {};

      const isMainFrame = details.frame === this.window.webContents.mainFrame;
      if (isMainFrame) {
        newHeaders['access-control-allow-origin'] = '*';
      }

      for (const [key, headers] of Object.entries(details.responseHeaders)) {
        switch (key.toLowerCase()) {
          case 'access-control-allow-origin':
            if (isMainFrame) {
              // Above we forced this header to be *, so ignore any other value
            } else {
              newHeaders[key] = headers;
            }
            break;

          // Remove x-frame-options so that embedding is allowed
          case 'x-frame-options':
            break;

          // Modify CSP frame-ancestors to allow embedding
          // We modify the report-only header to reduce console spam
          case 'content-security-policy':
          case 'content-security-policy-report-only': {
            // We try to add allowed origins rather than completely remove/replace to reduce possible security impact.
            const extraFrameAncestors = this.protocol ? this.protocol : null;
            if (extraFrameAncestors) {
              // Note that frame-ancestors does not fall back to default-src.
              // Regex based on ABNF from https://www.w3.org/TR/CSP3/#grammardef-serialized-policy
              newHeaders[key] = headers.map(csp => (
                csp.replace(
                  /((?:;[\x09\x0A\x0C\x0D\x20]*)?frame-ancestors[\x09\x0A\x0C\x0D\x20]+)([^;,]+)/ig,
                  (_, directiveName, directiveValue) => `${directiveName}${directiveValue} ${extraFrameAncestors}`
                )
              ));
            }
            break;  
          }

          default:
            newHeaders[key] = headers;
            break;
        }
      }

      return callback({
        responseHeaders: newHeaders
      });
    }

    super.onHeadersReceived(details, callback);
  }

  handleWindowOpen (details) {
    const parsed = new URL(details.url);
    if (parsed.protocol === 'data:') {
      // Imported lazily due to circular dependencies
      const DataPreviewWindow = require('./data-preview');
      DataPreviewWindow.open(this.window, details.url);

      return {
        action: 'deny'
      };
    }

    return super.handleWindowOpen(details);
  }
}

module.exports = ProjectRunningWindow;
