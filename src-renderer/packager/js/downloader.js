(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["downloader"],{

/***/ "./node_modules/@turbowarp/json/src/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@turbowarp/json/src/index.js ***!
  \***************************************************/
/*! exports provided: _parse, parse, stringify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_parse", function() { return _parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringify", function() { return stringify; });
/**
 * @param {string} source
 * @returns {unknown}
 */
const _parse = (source) => {
  let index = 0;

  const lineInfo = () => {
    let line = 0;
    let column = 0;
    for (let i = 0; i < index; i++) {
      if (source[i] === '\n') {
        line++;
        column = 0;
      } else {
        column++;
      }
    }
    return { line: line + 1, column: column + 1 };
  };

  const error = (message) => {
    const { line, column } = lineInfo();
    throw new SyntaxError(
      `${message} (Line ${line} Column ${column})`
    );
  };

  const charAt = (index) => {
    if (index >= source.length) {
      error('Unexpected end of input');
    }
    return source[index];
  };

  const currentChar = () => charAt(index);

  const next = () => {
    index++;
  };

  const expect = (char) => {
    if (currentChar() !== char) {
      error(`Expected '${char}' but found '${currentChar()}'`);
    }
    next();
  };

  const peek = (length = 1, offset = 1) => {
    if (index + offset + length > source.length) {
      return '';
    }
    if (length === 1) {
      return charAt(index + offset);
    }
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charAt(index + offset + i);
    }
    return result;
  };

  const skipWhitespaceAndComments = () => {
    while (true) {
      if (/\s/.test(currentChar())) {
        next();
      } else {
        const next2 = peek(2, 0);
        if (next2 === '//') {
          next(); // consume /
          next(); // consume /
          while (currentChar() !== '\n') {
            next();
          }
        } else if (next2 === '/*') {
          next(); // consume /
          next(); // consume *
          while (peek(2, 0) !== '*/') {
            next();
          }
          next(); // consume *
          next(); // consume /
        } else {
          break;
        }
      }
    }
  };

  const parseValue = () => {
    skipWhitespaceAndComments();
    const char = currentChar();
    switch (char) {
      case '"':
        return parseString();
      case '{':
        return parseObject();
      case '[':
        return parseList();
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '-':
        return parseNumber();
      default:
        return parseWord();
    }
  };

  const parseWord = () => {
    if (peek(4, 0) === 'null') {
      for (let i = 0; i < 4; i++) {
        next();
      }
      return null;
    }
    if (peek(4, 0) === 'true') {
      for (let i = 0; i < 4; i++) {
        next();
      }
      return true;
    }
    if (peek(5, 0) === 'false') {
      for (let i = 0; i < 5; i++) {
        next();
      }
      return false;
    }
    // Non-standard extensions
    if (peek(8, 0) === 'Infinity') {
      for (let i = 0; i < 8; i++) {
        next();
      }
      return Infinity;
    }
    if (peek(3, 0) === 'NaN') {
      for (let i = 0; i < 3; i++) {
        next();
      }
      return NaN;
    }
    error(`Unexpected character '${currentChar()}'`);
  };

  const parseNumber = () => {
    // Non-standard extension
    if (peek(9, 0) === '-Infinity') {
      for (let i = 0; i < 9; i++) {
        next();
      }
      return -Infinity;
    }
    let number = '';
    while (true) {
      number += currentChar();
      if (/[\d.e+-]/i.test(peek())) {
        next();
      } else {
        break;
      }
    }
    next();
    const value = +number;
    if (Number.isNaN(value)) {
      error(`Not a number: ${number}`);
    }
    return value;    
  };

  const parseString = () => {
    expect('"');
    let result = '';
    while (true) {
      const char = currentChar();
      if (char === '"') {
        break;
      } else if (char === '\\') {
        next();
        switch (currentChar()) {
          case '"':
            result += '"';
            break;
          case '/':
            result += '/';
            break;
          case '\\':
            result += '\\';
            break;
          case 'b':
            result += '\b';
            break;
          case 'f':
            result += '\f';
            break;
          case 'n':
            result += '\n';
            break;
          case 'r':
            result += '\r';
            break;
          case 't':
            result += '\t';
            break;
          case 'u': {
            let hexString = '';
            for (let i = 0; i < 4; i++) {
              next();
              const nextChar = currentChar();
              if (!/[0-9a-f]/i.test(nextChar)) {
                error(`Invalid hex code: ${nextChar}`);
              }
              hexString += nextChar;
            }
            const hexNumber = Number.parseInt(hexString, 16);
            const letter = String.fromCharCode(hexNumber);
            result += letter;
            break;
          }
          default:
            error(`Invalid escape code: \\${currentChar()}`);
        }
      } else {
        result += char;
      }
      next();
    }
    expect('"');
    return result;
  };

  const parseList = () => {
    expect('[');
    skipWhitespaceAndComments();
    const result = [];
    while (true) {
      skipWhitespaceAndComments();
      if (currentChar() === ']') {
        break;
      }
      const value = parseValue();
      result.push(value);
      skipWhitespaceAndComments();
      if (currentChar() === ',') {
        next();
      } else {
        break;
      }
    }
    expect(']');
    return result;
  };

  const parseObject = () => {
    expect('{');
    skipWhitespaceAndComments();
    const result = {};
    while (true) {
      skipWhitespaceAndComments();
      if (currentChar() === '}') {
        break;
      }
      const key = parseString();
      skipWhitespaceAndComments();
      expect(':');
      const value = parseValue();
      result[key] = value;
      skipWhitespaceAndComments();
      if (currentChar() === ',') {
        next();
      } else {
        break;
      }
    }
    expect('}');
    return result;
  };

  return parseValue();
};

/**
 * @param {string} source
 * @returns {unknown}
 */
const parse = (source) => {
  try {
    return JSON.parse(source);
  } catch (e1) {
    try {
      return _parse(source);
    } catch (e2) {
      // The error from JSON.parse is probably more useful.
      throw e1;
    }
  }
};

/**
 * @param {unknown} object
 * @returns {string}
 */
const stringify = (object) => {
  if (typeof object === 'string') {
    return JSON.stringify(object);
  }
  if (typeof object === 'number' || typeof object === 'boolean') {
    // Difference from regular JSON: [-]Infinity and NaN will be sanitized as-is
    return object.toString();
  }
  if (object === null || typeof object === 'undefined' || typeof object === 'symbol') {
    return 'null';
  }
  if (Array.isArray(object)) {
    return `[${object.map((i) => stringify(i)).join(',')}]`;
  }
  if (typeof object === 'object') {
    let result = '{';
    let isFirstItem = true;
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = object[key];
      if (typeof value !== 'undefined') {
        if (!isFirstItem) {
          result += ',';
        }
        result += `${JSON.stringify(key)}:${stringify(value)}`;
        isFirstItem = false;
      }
    }
    result += '}';
    return result;
  }
  if (typeof object === 'bigint') {
    throw new TypeError('Can not stringify bigint');
  }
  throw new TypeError(`Can not stringify: ${object}`);
};


/***/ }),

/***/ "./node_modules/@turbowarp/sbdl/lib/bundle-web.cjs":
/*!*********************************************************!*\
  !*** ./node_modules/@turbowarp/sbdl/lib/bundle-web.cjs ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * SBDL v7.0.0 <https://github.com/forkphorus/sb-downloader>
 *
 * MIT License
 *
 * Copyright (c) 2019-2024 Thomas Weber
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */



var JSZip = __webpack_require__(/*! @turbowarp/jszip */ "./node_modules/@turbowarp/jszip/dist/jszip.min.js");
var ExtendedJSON = __webpack_require__(/*! @turbowarp/json */ "./node_modules/@turbowarp/json/src/index.js");

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var ExtendedJSON__namespace = /*#__PURE__*/_interopNamespaceDefault(ExtendedJSON);

const sanitizeURL = (url) => url.replace(/\?token=[^&#]+/, '?token=x');

class HTTPError extends Error {
  /**
   * @param {string} url
   * @param {number} status HTTP status
   */
  constructor (url, status) {
    super(`Unexpected status ${status} while fetching ${sanitizeURL(url)}`);
    this.name = 'HTTPError';
    this.url = url;
    this.status = status;
  }
}

class CanNotAccessProjectError extends Error {
  constructor (message) {
    super(message);
    this.name = 'CanNotAccessProjectError';
  }
}

/**
 * NOTE: Do NOT use `instanceof AbortError` to detect abort errors.
 * Use `error.name === 'AbortError'` instead.
 */
class AbortError extends Error {
  constructor (message) {
    super(message || 'The operation was aborted.');
    this.name = 'AbortError';
  }
}

// Wrapper around fetch() to make asset downloading more reliable.
//  - Maximum number of concurrent fetch() is limited and queued. Chrome in particular
//    tends to throw errors when you start too many fetch() at once.
//  - Requests are retried with randomized backoff between attempts.
//  - If an asset is determined to not exist, retries are cancelled.
//  - Handles assets.scratch.mit.edu status code quirks.

// Originally based on https://github.com/TurboWarp/scratch-storage/blob/develop/src/safer-fetch.js

let currentFetches = 0;
const queue = [];

const MAX_ATTEMPTS = 3;
const MAX_CONCURRENT = 100;
const RETRY_DELAY = 5000;

const finishedFetch = () => {
  currentFetches--;
  checkStartNextFetch();
};

const startNextFetch = ([resolve, url, options]) => {
  let firstError;
  let attempts = 0;

  const attemptToFetch = () => fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res.arrayBuffer();
      }

      // Don't retry if the asset doesn't exist.
      // assets.scratch.mit.edu returns 503 instead of 404 for unknown assets for unknown reasons.
      // eg. https://assets.scratch.mit.edu/00000000000000000000000000000000.png
      if (res.status === 404 || res.status === 503) {
        return null;
      }

      throw new HTTPError(url, res.status);
    })
    .then((buffer) => {
      finishedFetch();
      return buffer;
    })
    .catch((error) => {
      if (error && error.name === 'AbortError') {
        // The error we throw here must be an AbortError.
        finishedFetch();
        throw error;
      }

      console.warn(`Attempt to fetch ${url} failed`, error);
      if (!firstError) {
        firstError = error;
      }

      if (attempts < MAX_ATTEMPTS) {
        attempts++;
        return new Promise((cb) => setTimeout(cb, (attempts + Math.random() - 1) * RETRY_DELAY))
          .then(attemptToFetch);
      }

      finishedFetch();
      throw new Error(`Failed to fetch ${url}: ${firstError}`);
    });

  return resolve(attemptToFetch());
};

const findNextFetch = () => {
  while (true) {
    if (queue.length === 0) {
      return null;
    }
    const next = queue.shift();
    const options = next[2];
    if (options && options.signal && options.signal.aborted) {
      continue;
    }
    return next;
  }
};

const checkStartNextFetch = () => {
  if (currentFetches < MAX_CONCURRENT) {
    const nextFetch = findNextFetch();
    if (nextFetch) {
      currentFetches++;
      startNextFetch(nextFetch);
    }
  }
};

/**
 * @param {string} url
 * @param {RequestInit} options 
 * @returns {Promise<ArrayBuffer|null>} ArrayBuffer if loaded. null if does not exist. Rejects if unexpected error.
 */
const fetchAsset = (url, options) => new Promise((resolve) => {
  queue.push([resolve, url, options]);
  checkStartNextFetch();
});

const environment = {
  /**
   * Whether the module is able to directly talk to api.scratch.mit.edu or if a middleman
   * is required due to CORS.
   */
  canAccessScratchAPI: false,

  /**
   * Headers used when fetching remote APIs.
   */
  headers: {}
};

/**
 * @param {string} url
 * @param {(progress: number) => void} progressCallback
 * @param {AbortSignal} [abortSignal] 
 * @returns {Promise<ArrayBuffer>}
 */
const fetchAsArrayBufferWithProgress = async (url, progressCallback, abortSignal) => {
  // We can't always track real progress, but we should still fire explicit 0% and 100% complete events.
  progressCallback(0);

  if (typeof XMLHttpRequest === 'function') {
    // Running in browsers. Use XHR for progress monitoring as it is more universally supported.
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        if (xhr.status === 200) {
          progressCallback(1);
          resolve(xhr.response);
        } else {
          reject(new HTTPError(url, xhr.status));
        }
      };
      xhr.onerror = () => {
        reject(new Error(`Failed to fetch ${url}: xhr error`));
      };
      xhr.onabort = () => {
        reject(new AbortError(`Failed to fetch ${url}: aborted`));
      };
      xhr.onprogress = (e) => {
        if (e.lengthComputable) {
          progressCallback(e.loaded / e.total);
        }
      };
      if (abortSignal) {
        abortSignal.addEventListener('abort', () => {
          xhr.abort();
        });
      }
      xhr.responseType = 'arraybuffer';
      xhr.open('GET', url);
      xhr.send();
    });
  }

  // Running in Node.js
  // fetch() still lacks a simple way to monitor download progress that properly accounts for Content-Encoding
  const response = await fetch(url, {
    headers: environment.headers
  });
  if (response.status !== 200) {
    throw new HTTPError(url, response.status);
  }
  const buffer = await response.arrayBuffer();
  progressCallback(1);
  return buffer;
};

/**
 * @typedef {'sb'|'sb2'|'sb3'} ProjectType
 */

/**
 * @typedef DownloadedProject
 * @property {string} title
 * @property {ProjectType} type
 * @property {ArrayBuffer} arrayBuffer
 */

/**
 * @typedef Options
 * @property {(type: 'project' | 'assets' | 'compress', loaded: number, total: number) => void} [onProgress] Called periodically with progress updates.
 * @property {Date} [date] The date to use for the "last modified" time in generated projects. If not set, defaults to an arbitrary date in the past.
 * @property {boolean} [compress] Whether to compress generated projects or not. Compressed projects take longer to generate but are much smaller. Defaults to true.
 * @property {AbortSignal} [signal] An AbortSignal that can be used to cancel the download.
 * @property {string} [assetHost] The URL from which to download assets from. $id is replaced with the asset ID (md5ext).
 * @property {(type: ProjectType, data: unknown) => unknown | Promise<unknown>} [processJSON] Called during the download to access project.json. Return an object to replace project.json.
 */

/**
 * @param {Options} givenOptions
 * @returns {Options}
 */
const parseOptions = (givenOptions) => Object.assign({
  // Default asset host for scratch.mit.edu
  assetHost: 'https://assets.scratch.mit.edu/internalapi/asset/$id/get/'
}, givenOptions || {});

/**
 * @param {Options} options
 */
const throwIfAborted = (options) => {
  // Browser support for AbortSignal.prototype.throwIfAborted() is not good.
  if (options.signal && options.signal.aborted) {
    throw new AbortError();
  }
};

/**
 * @param {Options} options
 */
const makeAssetProgressTarget = (options) => {
  let totalAssets = 0;
  let loadedAssets = 0;
  let timeout = null;
  let isDone = false;

  const emitProgressUpdate = () => {
    throwIfAborted(options);

    if (isDone) {
      throw new Error('Asset progress target used after completion');
    } else if (totalAssets === loadedAssets) {
      // When we're done, don't wait for the timeout as by the time that finishes,
      // some other event may have been emitted and we would then overwrite it and
      // be out of order.
      isDone = true;
      if (options.onProgress) {
        options.onProgress('assets', loadedAssets, totalAssets);
      }
      clearTimeout(timeout);
      timeout = null;
    } else if (!timeout) {
      timeout = setTimeout(() => {
        throwIfAborted(options);
        timeout = null;
        if (options.onProgress) {
          options.onProgress('assets', loadedAssets, totalAssets);
        }
      });
    }
  };

  return {
    fetching: () => {
      totalAssets++;
      emitProgressUpdate();
    },
    fetched: () => {
      loadedAssets++;
      emitProgressUpdate();
    }
  };
};

/**
 * @param {JSZip} zip
 * @param {ProjectType} type
 * @param {SB2Project|SB3Project} projectData
 * @param {Options} options
 * @returns {Promise<boolean>} True if the zip was modified
 */
const storeProjectJSON = async (zip, type, projectData, options) => {
  if (options.processJSON) {
    const newData = await options.processJSON(type, projectData);
    throwIfAborted(options);

    if (newData) {
      zip.file('project.json', ExtendedJSON__namespace.stringify(newData));
      return true;
    }
  }

  // If project.json is already in the zip, don't overwrite it as that would lose
  // possibly interesting data from sb2 projects with comments in the JSON.
  if (!zip.file('project.json')) {
    zip.file('project.json', ExtendedJSON__namespace.stringify(projectData));
    return true;
  }

  return false;
};

const isAbortError = (error) => error && error.name === 'AbortError';

/**
 * Browser support for Array.prototype.flat is not to the level we want.
 * @template T
 * @param {T[][]} array
 * @returns {T[]}
 */
const flat = (array) => {
  const result = [];
  for (const i of array) {
    if (Array.isArray(i)) {
      for (const j of i) {
        result.push(j);
      }
    } else {
      result.push(i);
    }
  }
  return result;
};

/**
 * @param {Uint8Array} uint8array
 * @returns {boolean}
 */
const isScratch1Project = (uint8array) => {
  const MAGIC = 'ScratchV';
  for (let i = 0; i < MAGIC.length; i++) {
    if (uint8array[i] !== MAGIC.charCodeAt(i)) {
      return false;
    }
  }
  return true;
};

/**
 * @param {Uint8Array} uint8array
 * @returns {boolean}
 */
const isProbablyJSON = (uint8array) => uint8array[0] === '{'.charCodeAt(0);

/**
 * @typedef SB2Project
 * @property {SB2Costume[]} costumes
 * @property {SB2Sound[]} sounds
 * @property {Array<SB2ListMonitor | SB2VariableMonitor | SB2Sprite>} children
 */

/**
 * @typedef SB2ListMonitor
 * @property {string} listName
 */

/**
 * @typedef SB2VariableMonitor
 * @property {string} target
 */

/**
 * @typedef SB2Sprite
 * @property {SB2Costume[]} costumes
 * @property {SB2Sound[]} sounds
 */

/**
 * @typedef SB2Costume
 * @property {string} costumeName
 * @property {number} baseLayerID
 * @property {string} baseLayerMD5
 * @property {number} bitmapResolution
 * @property {number} rotationCenterX
 * @property {number} rotationCenterY
 */

/**
 * @typedef SB2Sound
 * @property {string} soundName
 * @property {number} soundID
 * @property {string} md5
 * @property {number} sampleCount
 * @property {number} rate
 * @property {string} format
 */

/**
 * @param {SB2Project} projectData
 * @param {JSZip|null} zip
 * @param {Options} options
 * @returns {Promise<{zip: JSZip; downloadedAssets: number; modifiedJSON: boolean;}>}
 */
const downloadScratch2 = async (projectData, zip, options) => {
  const progressTarget = makeAssetProgressTarget(options);
  zip = zip || new JSZip();

  // sb2 files have two ways of storing references to files.
  // In the online editor they use md5 hashes ("md5ext" because they also have an extension).
  // In the offline editor they use separate integer file IDs for images and sounds.
  // We need the sb2 to use those integer file IDs, but the ones from the Scratch API don't have those, so we create them ourselves

  /**
   * @param {string} md5ext
   * @returns {string}
   */
  const getExtension = (md5ext) => md5ext.split('.')[1] || '';

  /**
   * @param {string} md5ext
   * @param {number} id
   * @returns {Promise<{path: string, data: ArrayBuffer}|null>}
   */
  const fetchAndStoreAsset = async (md5ext, id) => {
    progressTarget.fetching(md5ext);

    // assetHost will never be undefined here because of parseOptions()
    const arrayBuffer = await fetchAsset(options.assetHost.replace('$id', md5ext), {
      headers: environment.headers
    });

    progressTarget.fetched(md5ext);
    if (!arrayBuffer) {
      return null;
    }

    const path = `${id}.${getExtension(md5ext)}`;
    return {
      path,
      data: arrayBuffer
    };
  };

  /**
   * @param {SB2Costume[]} costumes
   * @param {SB2Sound[]} sounds
   * @returns {Promise<Array<{path: string, data: ArrayBuffer}|null>>}
   */
  const downloadAssets = (costumes, sounds) => {
    const md5extToId = new Map();
    const needToFetch = [];

    // First pass: see which assets are already in the zip, as that determines
    // which asset IDs we can use for fetched assets

    let largestCostumeId = -1;
    for (const costume of costumes) {
      const baseLayerExtension = getExtension(costume.baseLayerMD5) || 'png';
      if (costume.baseLayerID >= 0 && zip.file(`${costume.baseLayerID}.${baseLayerExtension}`)) {
        md5extToId.set(costume.baseLayerMD5, costume.baseLayerID);
        largestCostumeId = Math.max(largestCostumeId, costume.baseLayerID);
      }

      if (costume.textLayerMD5) {
        if (costume.textLayerID >= 0 && zip.file(`${costume.textLayerID}.png`)) {
          md5extToId.set(costume.textLayerMD5, costume.textLayerID);
          largestCostumeId = Math.max(largestCostumeId, costume.textLayerID);
        }
      }
    }

    let largestSoundId = -1;
    for (const sound of sounds) {
      if (sound.soundID >= 0 && zip.file(`${sound.soundID}.${getExtension(sound.md5)}`)) {
        md5extToId.set(sound.md5, sound.soundID);
        largestSoundId = Math.max(largestSoundId, sound.soundID);
      }
    }

    // Second pass: assign new IDs to all unknown assets

    let costumeAccumulator = largestCostumeId === -1 ? 0 : largestCostumeId + 1;
    let soundAccumulator = largestSoundId === -1 ? 0 : largestSoundId + 1;
    const assignCostumeId = (md5ext) => {
      if (!md5extToId.has(md5ext)) {
        needToFetch.push(md5ext);
        md5extToId.set(md5ext, costumeAccumulator);
        costumeAccumulator++;
      }
      return md5extToId.get(md5ext);
    };
    const assignSoundId = (md5ext) => {
      if (!md5extToId.has(md5ext)) {
        needToFetch.push(md5ext);
        md5extToId.set(md5ext, soundAccumulator);
        soundAccumulator++;
      }
      return md5extToId.get(md5ext);
    };

    for (const costume of costumes) {
      if (costume.baseLayerMD5) {
        costume.baseLayerID = assignCostumeId(costume.baseLayerMD5);
      }

      if (costume.textLayerMD5) {
        costume.textLayerID = assignCostumeId(costume.textLayerMD5);
      }
    }

    for (const sound of sounds) {
      if (sound.md5) {
        sound.soundID = assignSoundId(sound.md5);
      }
    }

    // Now we know what to download and where to store it.
    return Promise.all(needToFetch.map(md5ext => fetchAndStoreAsset(md5ext, md5extToId.get(md5ext))));
  };

  /** @type {SB2Sprite[]} */
  const targets = [
    projectData,
    ...projectData.children.filter((c) => !c.listName && !c.target)
  ];
  const costumes = flat(targets.map((i) => i.costumes || []));
  const sounds = flat(targets.map((i) => i.sounds || []));
  const filesToAdd = (await downloadAssets(costumes, sounds)).filter(i => i !== null);

  // Project JSON may be mutated during loading, so add it at the end.
  const modifiedJSON = await storeProjectJSON(zip, 'sb2', projectData, options);

  // Add files to the zip at the end so the order will be consistent.
  for (const {path, data} of filesToAdd) {
    zip.file(path, data);
  }

  return {
    downloadedAssets: filesToAdd.length,
    modifiedJSON: modifiedJSON,
    zip
  };
};

/**
 * @typedef SB3Project
 * @property {SB3Target[]} targets
 */

/**
 * @typedef SB3Target
 * @property {SB3Asset[]} sounds
 * @property {SB3Asset[]} costumes
 */

/**
 * @typedef SB3Asset Raw costume or sound data from an sb3 project.json.
 * @property {string} assetId md5 checksum of the asset (eg. b7b7898cfcd9ba13e89a4e74dd56a1ff)
 * @property {string} dataFormat file extension of the asset (eg. svg, wav)
 * @property {string|undefined} md5ext dataFormat (eg. b7b7898cfcd9ba13e89a4e74dd56a1ff.svg)
 * md5ext is not guaranteed to exist.
 * There are additional properties that we don't care about.
 */

/**
 * @param {SB3Project} projectData
 * @param {JSZip|null} zip
 * @param {Options} options
 * @returns {Promise<{zip: JSZip; downloadedAssets: number; modifiedJSON: boolean;}>}
 */
const downloadScratch3 = async (projectData, zip, options) => {
  const progressTarget = makeAssetProgressTarget(options);
  zip = zip || new JSZip();

  /**
   * @param {SB3Asset[]} assets
   * @returns {string[]}
   */
  const prepareAssets = (assets) => {
    const knownMd5exts = new Set();
    const missing = [];

    for (const asset of assets) {
      // There are some projects with assets with the same assetId but different extension,
      // we need to include each of those so we use md5ext instead of asset id, eg.
      // https://scratch.mit.edu/projects/531881458

      // md5ext may not exist, eg. the "Cake" costume of https://projects.scratch.mit.edu/630358355
      // https://github.com/forkphorus/forkphorus/issues/504
      const md5ext = asset.md5ext || `${asset.assetId}.${asset.dataFormat}`;

      // Deduplicate assets to avoid unnecessary requests.
      if (knownMd5exts.has(md5ext)) {
        continue;
      }

      // Don't download assets that are already in the zip
      if (zip.file(md5ext)) {
        continue;
      }

      knownMd5exts.add(md5ext);
      missing.push(md5ext);
    }

    return missing;
  };

  /**
   * @param {string} md5ext
   * @returns {Promise<{path: string, data: ArrayBuffer}|null>}
   */
  const addFile = async (md5ext) => {
    progressTarget.fetching(md5ext);

    // assetHost will never be undefined here because of parseOptions()
    const arrayBuffer = await fetchAsset(options.assetHost.replace('$id', md5ext), {
      signal: options.signal,
      headers: environment.headers
    });

    progressTarget.fetched(md5ext);

    if (!arrayBuffer) {
      return null;
    }

    return {
      path: md5ext,
      data: arrayBuffer
    };
  };

  const targets = projectData.targets;
  const costumes = flat(targets.map((t) => t.costumes || []));
  const sounds = flat(targets.map((t) => t.sounds || []));
  const assets = prepareAssets([...costumes, ...sounds]);
  const filesToAdd = (await Promise.all(assets.map(addFile))).filter(file => file !== null);

  const modifiedJSON = await storeProjectJSON(zip, 'sb3', projectData, options);

  // Add files to the zip at the end so the order will be consistent.
  for (const {path, data} of filesToAdd) {
    zip.file(path, data);
  }

  return {
    zip,
    modifiedJSON,
    downloadedAssets: filesToAdd.length
  };
};

/**
 * @param {unknown} projectData
 * @returns {'sb2'|'sb3'|null}
 */
const identifyProjectTypeFromJSON = (projectData) => {
  if (Object.prototype.hasOwnProperty.call(projectData, 'targets')) {
    return 'sb3';
  } else if (Object.prototype.hasOwnProperty.call(projectData, 'objName')) {
    return 'sb2';
  }
  return null;
};

/**
 * @param {JSZip} zip
 * @param {Options} options
 * @returns {Promise<ArrayBuffer>}
 */
const generateZip = (zip, options) => {
  const date = options.date || new Date('Fri, 31 Dec 2021 00:00:00 GMT');
  for (const file of Object.values(zip.files)) {
    file.date = date;
  }
  return zip.generateAsync({
    type: 'arraybuffer',
    compression: options.compress !== false ? 'DEFLATE' : 'STORE'
  }, (meta) => {
    if (options.onProgress) {
      options.onProgress('compress', meta.percent / 100, 1);
    }
  });
};

/**
 * @param {object} projectData Parsed project.json or stringified JSON.
 * @param {Options} [options]
 * @returns {Promise<DownloadedProject>}
 */
const downloadProjectFromJSON = async (projectData, options) => {
  options = parseOptions(options);

  if (typeof projectData === 'string') {
    projectData = ExtendedJSON__namespace.parse(projectData);
  }

  const type = identifyProjectTypeFromJSON(projectData);

  /** @type {JSZip} */
  let downloadedZip;
  if (type === 'sb3') {
    downloadedZip = (await downloadScratch3(projectData, null, options)).zip;
  } else if (type === 'sb2') {
    downloadedZip = (await downloadScratch2(projectData, null, options)).zip;
  } else {
    throw new Error(`Unknown project type: ${type}`);
  }

  throwIfAborted(options);

  const zippedProject = await generateZip(downloadedZip, options);
  throwIfAborted(options);

  return {
    title: '',
    type,
    arrayBuffer: zippedProject
  };
};

/**
 * @param {ArrayBuffer | ArrayBufferView} data Data of compressed project or project.json
 * @param {Options} [options]
 * @returns {Promise<DownloadedProject>}
 */
const downloadProjectFromBuffer = async (data, options) => {
  options = parseOptions(options);

  throwIfAborted(options);

  if (ArrayBuffer.isView(data)) {
    data = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  }
  const uint8array = new Uint8Array(data);

  if (isProbablyJSON(uint8array)) {
    // JSON project. We must download the assets.
    const text = new TextDecoder().decode(data);
    return downloadProjectFromJSON(text, options);
  }

  if (isScratch1Project(uint8array)) {
    // Scratch 1 project. Return as-is.
    return {
      title: '',
      type: 'sb',
      arrayBuffer: data,
    };
  }

  // Compressed project. Need to unzip to figure out what type it is.
  let zip;
  let needToReZip = !!options.date;
  try {
    zip = await JSZip.loadAsync(data);
  } catch (e) {
    throw new Error('Cannot parse project: not a zip or sb');
  }

  throwIfAborted(options);

  // Copy all files in subdirectories to the root. This makes logic much simpler later on
  // when we download assets or process JSON and ensures that makes our outputs more
  // "normalized".
  for (const oldPath of Object.keys(zip.files)) {
    if (oldPath.endsWith('/') || !oldPath.includes('/')) {
      continue;
    }

    // Array.prototype.at(-1) support is not good enough
    const parts = oldPath.split('/');
    const newPath = parts[parts.length - 1];

    if (zip.file(newPath)) {
      throw new Error(`Path conflict ${oldPath}`);
    }

    zip.file(newPath, await zip.file(oldPath).async('uint8array'));
    zip.remove(oldPath);
    needToReZip = true;

    throwIfAborted(options);
  }

  // Remove the now-empty subdirectories themselves
  for (const path of Object.keys(zip.files)) {
    if (path.includes('/')) {
      zip.remove(path);
      needToReZip = true;
    }
  }

  const projectDataFile = zip.file('project.json');
  if (!projectDataFile) {
    throw new Error('project.json is missing');
  }

  const projectDataText = await projectDataFile.async('text');
  const projectData = ExtendedJSON__namespace.parse(projectDataText);
  const type = identifyProjectTypeFromJSON(projectData);

  throwIfAborted(options);

  if (type === 'sb3') {
    const result = await downloadScratch3(projectData, zip, options);
    if (result.downloadedAssets > 0 || result.modifiedJSON) {
      needToReZip = true;
    }
  } else if (type === 'sb2') {
    const result = await downloadScratch2(projectData, zip, options);
    if (result.downloadedAssets > 0 || result.modifiedJSON) {
      needToReZip = true;
    }
  } else {
    throw new Error(`Unknown project type: ${type}`);
  }

  throwIfAborted(options);

  if (needToReZip) {
    data = await generateZip(zip, options);
    throwIfAborted(options);
  }

  return {
    title: '',
    type,
    arrayBuffer: data
  };
};

/**
 * @typedef ProjectMetadata
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} instructions
 * @property {string} visibility
 * @property {boolean} public
 * @property {boolean} comments_allowed
 * @property {boolean} is_published
 * @property {object} author
 * @property {number} author.id
 * @property {string} author.username
 * @property {boolean} author.scratchteam
 * @property {object} author.history
 * @property {string} author.history.joined
 * @property {object} author.profile
 * @property {null} author.profile.id
 * @property {Record<'90x90' | '60x60' | '55x55' | '50x50' | '32x32', string>} author.profile.images
 * @property {string} image
 * @property {Record<'282x218' | '216x163' | '200x200' | '144x108' | '135x102' | '100x80', string>} images
 * @property {object} history
 * @property {string} history.created
 * @property {string} history.modified
 * @property {string} history.shared
 * @property {object} stats
 * @property {number} stats.views
 * @property {number} stats.loves
 * @property {number} stats.favorites
 * @property {number} stats.remixes
 * @property {object} remix
 * @property {number|null} remix.parent
 * @property {number|null} remix.root
 * @property {string} project_token
 */

/**
 * @param {string} id
 * @param {Options} [options]
 * @returns {Promise<ProjectMetadata>}
 */
const getProjectMetadata = async (id, options) => {
  options = parseOptions(options);
  const urls = (
    [
      `https://trampoline.turbowarp.org/api/projects/${id}`,
      `https://trampoline.turbowarp.xyz/api/projects/${id}`,
    ]
  );
  let firstError = null;
  for (const url of urls) {
    try {
      const response = await fetch(url, {
        signal: options.signal,
        headers: environment.headers
      });
      if (response.status === 404) {
        throw new CanNotAccessProjectError(`${id} is unshared or does not exist`);
      }
      if (!response.ok) {
        throw new HTTPError(url, response.status);
      }
      const json = await response.json();
      return json;
    } catch (e) {
      if (e instanceof CanNotAccessProjectError || isAbortError(e)) {
        throw e;
      } else {
        firstError = e;
      }
    }
  }
  throw firstError;
};

/**
 * @param {string} url
 * @returns {string}
 */
const getProjectTitleFromURL = (url) => {
  const match = url.match(/\/([^\/]+)\.sb[2|3]?$/);
  if (match) {
    return match[1];
  }
  return '';
};

/**
 * @param {string} url
 * @param {Options} [options]
 * @returns {Promise<DownloadedProject>}
 */
const downloadProjectFromURL = async (url, options) => {
  options = parseOptions(options);
  let buffer;
  try {
    buffer = await fetchAsArrayBufferWithProgress(url, (progress) => {
      if (options.onProgress) {
        options.onProgress('project', progress, 1);
      }
    }, options.signal);
  } catch (e) {
    if (e instanceof HTTPError && e.status === 404) {
      throw new CanNotAccessProjectError(e.message);
    }
    throw e;
  }
  const project = await downloadProjectFromBuffer(buffer, options);
  project.title = getProjectTitleFromURL(url);
  return project;
};

/**
 * @param {string} id
 * @param {string} baseUrl
 * @param {Options} options
 * @returns {Promise<DownloadedProject>}
 */
const downloadFromScratchURLWithToken = async (id, baseUrl, options) => {
  options = parseOptions(options);
  if (options.onProgress) {
    options.onProgress('metadata', 0, 1);
  }
  const meta = await getProjectMetadata(id, options);
  if (options.onProgress) {
    options.onProgress('metadata', 1, 1);
  }
  throwIfAborted(options);
  const token = meta.project_token;
  const title = meta.title;
  const tokenPart = token ? `?token=${token}` : '';
  const fullUrl = baseUrl + tokenPart;
  const project = await downloadProjectFromURL(fullUrl, options);
  if (title) {
    project.title = title;
  }
  return project;
};

/**
 * @param {string} id
 * @param {Options} [options]
 * @returns {Promise<DownloadedProject>}
 */
const downloadProjectFromID = (id, options) => downloadFromScratchURLWithToken(
  id,
  `https://projects.scratch.mit.edu/${id}`,
  options
);

exports.downloadProjectFromBuffer = downloadProjectFromBuffer;
exports.downloadProjectFromID = downloadProjectFromID;
exports.downloadProjectFromJSON = downloadProjectFromJSON;
exports.downloadProjectFromURL = downloadProjectFromURL;
exports.getProjectMetadata = getProjectMetadata;


/***/ }),

/***/ "./src/packager/download-project.js":
/*!******************************************!*\
  !*** ./src/packager/download-project.js ***!
  \******************************************/
/*! exports provided: downloadProject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadProject", function() { return downloadProject; });
/* harmony import */ var _minify_sb3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./minify/sb3 */ "./src/packager/minify/sb3.js");
/* harmony import */ var _turbowarp_sbdl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turbowarp/sbdl */ "./node_modules/@turbowarp/sbdl/lib/bundle-web.cjs");
/* harmony import */ var _turbowarp_sbdl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_turbowarp_sbdl__WEBPACK_IMPORTED_MODULE_1__);



const unknownAnalysis = () => ({
  stageVariables: [],
  stageComments: [],
  usesMusic: true,
  usesSteamworks: false,
  extensions: []
});

const analyzeScratch2 = (projectData) => {
  const stageVariables = (projectData.variables || [])
    .map(({name, isPersistent}) => ({
      name,
      isCloud: isPersistent
    }));
  // This may have some false positives, but that's okay.
  const stringified = JSON.stringify(projectData);
  const usesMusic = stringified.includes('drum:duration:elapsed:from:') ||
    stringified.includes('playDrum') ||
    stringified.includes('noteOn:duration:elapsed:from:');
  return {
    ...unknownAnalysis(),
    stageVariables,
    usesMusic
  };
};

const analyzeScratch3 = (projectData) => {
  const stage = projectData.targets[0];
  if (!stage || !stage.isStage) {
    throw new Error('Project does not have stage');
  }
  const stageVariables = Object.values(stage.variables)
    .map(([name, _value, cloud]) => ({
      name,
      isCloud: !!cloud
    }));
  const stageComments = Object.values(stage.comments)
    .map((i) => i.text);
  // TODO: usesMusic has possible false negatives
  const usesMusic = projectData.extensions.includes('music');
  const usesSteamworks = projectData.extensions.includes('steamworks');
  const extensions = projectData.extensionURLs ? Object.values(projectData.extensionURLs) : [];
  return {
    ...unknownAnalysis(),
    stageVariables,
    stageComments,
    usesMusic,
    usesSteamworks,
    extensions
  };
};

const mutateScratch3InPlace = (projectData) => {
  const makeImpliedCloudVariables = (projectData) => {
    const stage = projectData.targets.find((i) => i.isStage);
    if (stage) {
      for (const variable of Object.values(stage.variables)) {
        const name = variable[0];
        if (typeof name === 'string' && name.startsWith('☁')) {
          variable[2] = true;
        }
      }
    }
  };

  const disableNonsenseCloudVariables = (projectData) => {
    const DISABLE_CLOUD_VARIABLES = [
      // The "original" Sprunki project includes a cloud variable presumably used to detect who
      // clicked on the report button. That seems like a Scratch community guidelines violation but
      // that's not our job to enforce. This affects us because these games are very popular and
      // create thousands of unnecessary concurrent cloud variable connections for a feature that
      // can't work because there is no report button to click on.
      '☁ potential reporters'
    ];

    // I want a more general solution here that automatically disables all unused cloud variables,
    // but making that work in the presence of various unknown extensions seems non-trivial.

    const stage = projectData.targets.find((i) => i.isStage);
    if (stage) {
      for (const variable of Object.values(stage.variables)) {
        // variable is [name, value, isCloud]
        if (variable[2] && DISABLE_CLOUD_VARIABLES.includes(variable[0])) {
          variable[2] = false;
        }
      }
    }
  };

  // Order matters -- check for implied cloud variables before disabling some of them.
  makeImpliedCloudVariables(projectData);
  disableNonsenseCloudVariables(projectData);
  Object(_minify_sb3__WEBPACK_IMPORTED_MODULE_0__["default"])(projectData);
};

const downloadProject = async (projectData, progressCallback = () => {}, signal) => {
  let analysis = unknownAnalysis();

  const options = {
    signal,

    onProgress(type, loaded, total) {
      progressCallback(type, loaded, total);
    },

    processJSON(type, projectData) {
      if (type === 'sb3') {
        mutateScratch3InPlace(projectData);
        analysis = analyzeScratch3(projectData);
        return projectData;
      }
      if (type === 'sb2') {
        analysis = analyzeScratch2(projectData);
      }
    }
  };

  const project = await Object(_turbowarp_sbdl__WEBPACK_IMPORTED_MODULE_1__["downloadProjectFromBuffer"])(projectData, options);
  if (project.type !== 'sb3') {
    project.type = 'blob';
  }
  project.analysis = analysis;
  return project;
};


/***/ }),

/***/ "./src/packager/minify/sb3.js":
/*!************************************!*\
  !*** ./src/packager/minify/sb3.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// TODO: Extract this and TurboWarp/scratch-vm's compression to a shared module

// We don't generate new IDs using numbers at this time because their enumeration
// order can affect script execution order as they always come first.
// https://tc39.es/ecma262/#sec-ordinaryownpropertykeys
const SOUP = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#%()*+,-./:;=?@[]^_`{|}~';
const generateId = i => {
  let str = '';
  while (i >= 0) {
    str = SOUP[i % SOUP.length] + str;
    i = Math.floor(i / SOUP.length) - 1;
  }
  return str;
};

class Pool {
  constructor() {
    this.generatedIds = new Map();
    this.references = new Map();
    this.skippedIds = new Set();
    // IDs in Object.keys(vm.runtime.monitorBlocks._blocks) already have meaning, so make sure to skip those
    // We don't bother listing many here because most would take more than ten million items to be used
    this.skippedIds.add('of');
  }
  skip (id) {
    this.skippedIds.add(id);
  }
  addReference(id) {
    const currentCount = this.references.get(id) || 0;
    this.references.set(id, currentCount + 1);
  }
  generateNewIds() {
    const entries = Array.from(this.references.entries());
    // The most used original IDs should get the shortest new IDs.
    entries.sort((a, b) => b[1] - a[1]);

    let i = 0;
    for (const entry of entries) {
      const oldId = entry[0];

      let newId = generateId(i);
      while (this.skippedIds.has(newId)) {
        i++;
        newId = generateId(i);
      }

      this.generatedIds.set(oldId, newId);
      i++;
    }
  }
  getNewId(originalId) {
    if (this.generatedIds.has(originalId)) {
      return this.generatedIds.get(originalId);
    }
    return originalId;
  }
}

const optimizeSb3Json = (projectData) => {
  // Note: we modify projectData in-place

  // Scan global attributes of the project so we can generate optimal IDs later
  const blockPool = new Pool();

  for (const target of projectData.targets) {
    for (const [blockId, block] of Object.entries(target.blocks)) {
      blockPool.addReference(blockId);
      if (Array.isArray(block)) {
        continue;
      }

      if (block.parent) {
        blockPool.addReference(block.parent);
      }
      if (block.next) {
        blockPool.addReference(block.next);
      }

      if (block.inputs) {
        for (const input of Object.values(block.inputs)) {
          for (let i = 1; i < input.length; i++) {
            const inputValue = input[i];
            if (typeof inputValue === 'string') {
              blockPool.addReference(inputValue);
            }
          }
        }
      }
    }
  }

  blockPool.generateNewIds();

  if (projectData.monitors) {
    for (const monitor of projectData.monitors) {
      // Remove redundant monitor values
      monitor.value = Array.isArray(monitor.value) ? [] : 0;
    }
  }

  // Use gathered data to optimize the project
  for (const target of projectData.targets) {
    const newBlocks = {};
    const newComments = {};

    for (const [blockId, block] of Object.entries(target.blocks)) {
      newBlocks[blockPool.getNewId(blockId)] = block;
      if (Array.isArray(block)) {
        continue;
      }

      if (block.parent) {
        block.parent = blockPool.getNewId(block.parent);
      }
      if (block.next) {
        block.next = blockPool.getNewId(block.next);
      }

      if (block.inputs) {
        for (const input of Object.values(block.inputs)) {
          for (let i = 1; i < input.length; i++) {
            const inputValue = input[i];
            if (typeof inputValue === 'string') {
              input[i] = blockPool.getNewId(inputValue);
            }
          }
        }
      }
      if (!block.shadow) {
        delete block.shadow;
      }
      if (!block.topLevel) {
        delete block.topLevel;
      }
      delete block.x;
      delete block.y;
      delete block.comment;
    }
    if (target.comments) {
      for (const [commentId, comment] of Object.entries(target.comments)) {
        const text = comment.text;
        const isSpecial = text.includes(' // _twconfig_') || text.includes(' // _gamepad_') || text.includes(' // _cysocore_');
        if (isSpecial) {
          newComments[commentId] = comment;
        }
      }
    }

    target.blocks = newBlocks;
    target.comments = newComments;
  }

  // Remove unnecessary metadata
  if (projectData.meta) {
    delete projectData.meta.agent;
    delete projectData.meta.vm;
  }

  return projectData;
};

/* harmony default export */ __webpack_exports__["default"] = (optimizeSb3Json);


/***/ })

}]);
//# sourceMappingURL=downloader.js.map