const fs = require('fs');
const path = require('path');
const {net} = require('electron');
const {name, version} = require('../package.json');

/**
 * fetch.js is not used here because it buffers the whole response in memory, and
 * Node's own https module does not use the operating system certificate store, so
 * users with a corporate or self-signed root certificate would fail to verify the
 * connection. Electron's net module uses the Chromium network stack instead, and
 * its ClientRequest is still a readable stream.
 */

/** @type {number} */
const MAX_REDIRECTS = 10;

/** @type {number} */
const PROGRESS_INTERVAL_MS = 200;

const createCancelError = () => {
  const error = new Error('Download cancelled');
  error.code = 'ERR_DOWNLOAD_CANCELED';
  return error;
};

/**
 * @param {unknown} error
 * @returns {boolean}
 */
const isCancelError = (error) => {
  return Boolean(error) && error.code === 'ERR_DOWNLOAD_CANCELED';
};

/**
 * @returns {{
 *   cancelled: boolean,
 *   pending: Set<{request: object, response: object|null, stream: object|null, discard: (() => void)|null}>,
 *   settlers: Set<() => void>,
 *   cancel: () => void
 * }}
 */
const createDownloadControl = () => {
  const control = {
    cancelled: false,
    pending: new Set(),
    settlers: new Set(),
    cancel: () => {
      if (control.cancelled) {
        return;
      }
      control.cancelled = true;

      const settlers = Array.from(control.settlers);
      control.settlers.clear();
      for (const settle of settlers) {
        try {
          settle();
        } catch (error) {
          // Settlers do not throw; this is only a safety net.
        }
      }

      const entries = Array.from(control.pending);
      control.pending.clear();
      for (const entry of entries) {
        try {
          if (entry.response) entry.response.destroy();
        } catch (error) {
          // The response may already be finished.
        }
        try {
          if (entry.stream) entry.stream.destroy();
        } catch (error) {
          // Same.
        }
        try {
          entry.request.destroy();
        } catch (error) {
          // Same.
        }
        try {
          if (entry.discard) entry.discard();
        } catch (error) {
          // discard retries once the handle is closed.
        }
      }
    }
  };
  return control;
};

/**
 * @param {string} url
 * @returns {boolean}
 */
const hasRangeQuery = (url) => {
  try {
    return new URL(url).searchParams.has('range');
  } catch (error) {
    return true;
  }
};

/**
 * @param {string} temporaryPath
 * @returns {{url: string}|null}
 */
const readResumeMeta = (temporaryPath) => {
  try {
    return JSON.parse(fs.readFileSync(`${temporaryPath}.meta.json`, 'utf-8'));
  } catch (error) {
    return null;
  }
};

/**
 * @param {string} temporaryPath
 * @param {string} url
 * @returns {void}
 */
const writeResumeMeta = (temporaryPath, url) => {
  try {
    fs.writeFileSync(`${temporaryPath}.meta.json`, JSON.stringify({url}), 'utf-8');
  } catch (error) {
    // The download can continue without it; only resume support is lost.
  }
};

/**
 * @param {string} temporaryPath
 * @returns {void}
 */
const removeResumeMeta = (temporaryPath) => {
  try {
    fs.rmSync(`${temporaryPath}.meta.json`, {force: true});
  } catch (error) {
    // Nothing to do.
  }
};

/**
 * A partial file may only be resumed when the server can serve a byte range for
 * the exact same URL. Anything else risks appending to a file that does not belong
 * to this download.
 * @param {string} url
 * @param {string} temporaryPath
 * @returns {number} bytes already on disk
 */
const getResumableOffset = (url, temporaryPath) => {
  let stats;
  try {
    stats = fs.statSync(temporaryPath);
  } catch (error) {
    return 0;
  }
  if (!stats.isFile() || stats.size <= 0) {
    return 0;
  }
  if (hasRangeQuery(url)) {
    return 0;
  }
  const meta = readResumeMeta(temporaryPath);
  if (!meta || meta.url !== url) {
    try {
      fs.rmSync(temporaryPath, {force: true});
    } catch (error) {
      return 0;
    }
    return 0;
  }
  return stats.size;
};

/**
 * @param {string} temporaryPath
 * @param {number} offset
 * @returns {fs.WriteStream}
 */
const createPartialWriteStream = (temporaryPath, offset) => {
  if (offset <= 0) {
    return fs.createWriteStream(temporaryPath, {flags: 'w'});
  }
  // 'r+' alone would write at position 0 and corrupt what is already there.
  return fs.createWriteStream(temporaryPath, {flags: 'r+', start: offset});
};

/**
 * @param {string} url
 * @param {string} destination
 * @param {(progress: {received: number, total: number}) => void} [onProgress]
 * @param {ReturnType<typeof createDownloadControl>} [control]
 * @param {number} [redirectsLeft]
 * @returns {Promise<string>}
 */
const downloadFile = (url, destination, onProgress, control, redirectsLeft = MAX_REDIRECTS) => new Promise((resolve, reject) => {
  let settled = false;
  let unregisterSettler = null;
  const temporaryPath = `${destination}.part`;

  const fail = (error) => {
    if (settled) return;
    settled = true;
    if (unregisterSettler) {
      unregisterSettler();
      unregisterSettler = null;
    }
    if (control && control.cancelled) {
      reject(createCancelError());
      return;
    }
    reject(error instanceof Error ? error : new Error(`${error}`));
  };

  /**
   * @param {string} savedPath
   */
  const succeed = (savedPath) => {
    if (settled) return;
    settled = true;
    if (unregisterSettler) {
      unregisterSettler();
      unregisterSettler = null;
    }
    resolve(savedPath);
  };

  if (control) {
    const settleOnCancel = () => fail(createCancelError());
    control.settlers.add(settleOnCancel);
    unregisterSettler = () => control.settlers.delete(settleOnCancel);
  }

  if (control && control.cancelled) {
    fail(createCancelError());
    return;
  }
  if (redirectsLeft < 0) {
    fail(new Error(`Too many redirects while downloading ${url}`));
    return;
  }

  try {
    fs.mkdirSync(path.dirname(destination), {recursive: true});
  } catch (error) {
    fail(new Error(`Could not create download directory: ${error.message}`));
    return;
  }

  const offset = getResumableOffset(url, temporaryPath);
  const headers = {
    'user-agent': `${name}/${version}`,
    'accept': 'application/octet-stream'
  };
  if (offset > 0) {
    headers.range = `bytes=${offset}-`;
  }

  const request = net.request({
    url,
    method: 'GET',
    // browser_download_url redirects to objects.githubusercontent.com.
    redirect: 'follow',
    headers
  });

  const entry = {request, response: null, stream: null, discard: null};
  if (control) {
    control.pending.add(entry);
  }
  const unregister = () => {
    if (control) {
      control.pending.delete(entry);
    }
  };

  request.on('response', (response) => {
    entry.response = response;
    const statusCode = response.statusCode;

    if (statusCode >= 300 && statusCode < 400 && response.headers.location) {
      response.on('error', () => {});
      response.resume();
      unregister();
      const nextURL = new URL(response.headers.location, url).toString();
      downloadFile(nextURL, destination, onProgress, control, redirectsLeft - 1)
        .then(succeed, fail);
      return;
    }

    if (statusCode !== 200 && statusCode !== 206) {
      response.on('error', () => {});
      response.resume();
      unregister();
      fail(new Error(`HTTP error ${statusCode} while downloading ${url}`));
      return;
    }

    const contentLength = Number(response.headers['content-length']) || 0;
    // The server ignored the range request and is sending the whole file again.
    const appending = statusCode === 206 && offset > 0;
    let received = appending ? offset : 0;
    if (!appending && offset > 0) {
      // The .part file must not be double-written, so start over.
      try {
        fs.rmSync(temporaryPath, {force: true});
      } catch (error) {
        console.error('Could not reset the partial download:', error);
      }
    }
    if (!appending) {
      writeResumeMeta(temporaryPath, url);
    }

    const total = appending ? offset + contentLength : contentLength;
    let lastProgressAt = 0;
    const reportProgress = (receivedNow, force) => {
      if (!onProgress) return;
      const now = Date.now();
      if (!force && now - lastProgressAt < PROGRESS_INTERVAL_MS) {
        return;
      }
      lastProgressAt = now;
      onProgress({received: receivedNow, total});
    };

    const out = createPartialWriteStream(temporaryPath, appending ? offset : 0);
    entry.stream = out;

    const discard = () => {
      const remove = () => {
        try {
          fs.rmSync(temporaryPath, {force: true});
        } catch (error) {
          console.error('Could not remove the partial download:', error);
        }
        removeResumeMeta(temporaryPath);
      };
      if (out.destroyed || out.closed) {
        remove();
      } else {
        out.once('close', remove);
      }
    };
    if (control) {
      entry.discard = discard;
    }
    out.once('close', () => {
      entry.discard = null;
    });

    response.on('data', (chunk) => {
      received += chunk.length;
      reportProgress(received);
    });

    response.on('error', (error) => {
      response.destroy();
      out.destroy();
      unregister();
      fail(error);
    });

    response.on('aborted', () => {
      response.destroy();
      out.destroy();
      unregister();
      fail(new Error(`The connection was closed while downloading ${url}`));
    });

    response.pipe(out);

    out.on('error', (error) => {
      response.destroy();
      out.destroy();
      unregister();
      fail(error);
    });

    out.on('finish', () => {
      // fs.rename fails if the destination already exists on Windows.
      const finalize = () => {
        try {
          if (fs.existsSync(destination)) {
            fs.unlinkSync(destination);
          }
          fs.renameSync(temporaryPath, destination);
        } catch (error) {
          unregister();
          fail(new Error(`Could not finalize download: ${error.message}`));
          return;
        }
        removeResumeMeta(temporaryPath);
        entry.discard = null;
        unregister();
        reportProgress(received, true);
        succeed(destination);
      };
      out.close(finalize);
    });
  });

  request.on('error', (error) => {
    unregister();
    fail(error);
  });

  request.end();
});

module.exports = {
  MAX_REDIRECTS,
  PROGRESS_INTERVAL_MS,
  createCancelError,
  createDownloadControl,
  isCancelError,
  downloadFile
};