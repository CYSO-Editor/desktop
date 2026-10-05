const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const {app} = require('electron');

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const DOWNLOAD_TIMEOUT_MS = 15000;

const getCacheDir = () => path.join(app.getPath('userData'), 'extension-cache');

const getCachePaths = url => {
    const hash = crypto.createHash('sha256').update(url).digest('hex');
    const base = path.join(getCacheDir(), hash);
    return {
        script: `${base}.js`,
        meta: `${base}.json`
    };
};

const readFileIfExists = async path => {
    try {
        return await fs.promises.readFile(path, 'utf-8');
    } catch (e) {
        return null;
    }
};

const readJSONIfExists = async path => {
    const content = await readFileIfExists(path);
    if (content === null) return null;
    try {
        return JSON.parse(content);
    } catch (e) {
        return null;
    }
};

const downloadScript = async url => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), DOWNLOAD_TIMEOUT_MS);
    try {
        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                // Match what a <script src> request would look like
                'accept': '*/*'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return await response.text();
    } finally {
        clearTimeout(timer);
    }
};

/**
 * Get the cached script content for an extension URL, downloading and caching
 * it if necessary.
 * @param {string} url the extension script URL
 * @returns {Promise<{content: string}|null>} null when uncached and unreachable
 */
const getExtensionScript = async url => {
    if (typeof url !== 'string' || !/^https?:\/\//i.test(url)) {
        return null;
    }

    const {script: scriptPath, meta: metaPath} = getCachePaths(url);
    const [meta, cachedContent] = await Promise.all([
        readJSONIfExists(metaPath),
        readFileIfExists(scriptPath)
    ]);

    const isFresh = meta && meta.url === url && (Date.now() - meta.time) < CACHE_TTL_MS;
    if (isFresh && cachedContent !== null) {
        return {content: cachedContent};
    }

    try {
        const content = await downloadScript(url);
        if (typeof content !== 'string' || content.length === 0) {
            throw new Error('empty response');
        }
        await fs.promises.mkdir(getCacheDir(), {recursive: true});
        await Promise.all([
            fs.promises.writeFile(scriptPath, content, 'utf-8'),
            fs.promises.writeFile(metaPath, JSON.stringify({
                url,
                time: Date.now(),
                length: content.length
            }), 'utf-8')
        ]);
        return {content};
    } catch (error) {
        if (cachedContent !== null) {
            return {content: cachedContent};
        }
        console.warn(`Extension cache miss for ${url}: ${error}`);
        return null;
    }
};

module.exports = {
    getExtensionScript
};
