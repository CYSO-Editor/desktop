const privilegedFetch = require('./fetch');

const REPO = 'CYSO-Editor/desktop';

/** @type {string[]} */
const INSTALLER_FILE_EXTENSIONS = ['.exe', '.dmg', '.pkg', '.deb', '.appimage', '.zip', '.appx'];

const RELEASES_API = `https://api.github.com/repos/${REPO}/releases?per_page=30`;
const RELEASES_PAGE = `https://github.com/${REPO}/releases`;
const RELEASES_HOST = `github.com/${REPO}/releases/`;

const PRODUCT_KEYS = ['cysoeditor', 'cyso'];

/**
 * Order matters: x86_64 must be tested before x86.
 * @type {{id: string, keys: string[], patterns: RegExp[]}[]}
 */
const ARCH_KEYS = [
  {
    id: 'arm64',
    keys: ['aarch64', 'arm64'],
    patterns: []
  },
  {
    id: 'x64',
    keys: ['amd64', 'x64', 'win64', 'x86_64', 'x86-64'],
    patterns: [/x86[_-]64/]
  },
  {
    id: 'armv7l',
    keys: ['armv7l', 'armv7', 'armhf'],
    patterns: []
  },
  {
    id: 'ia32',
    keys: ['ia32', '686', 'win32', 'x86'],
    patterns: []
  }
];

/**
 * @param {string} name
 * @returns {string}
 */
const normalize = (name) => String(name || '')
  .replace(/\s+/g, '.')
  .toLowerCase();

/**
 * @param {string} haystack
 * @param {string} token
 * @returns {boolean}
 */
const hasToken = (haystack, token) => {
  const parts = haystack.split(/[.\-_]/);
  return parts.includes(token);
};

/**
 * @param {string} name
 * @returns {string}
 */
const detectArch = (name) => {
  const normalized = normalize(name);
  for (const {id, keys, patterns} of ARCH_KEYS) {
    for (const pattern of patterns) {
      if (pattern.test(normalized)) {
        return id;
      }
    }
    for (const key of keys) {
      if (hasToken(normalized, key)) {
        return id;
      }
    }
  }
  return 'universal';
};

/**
 * @param {string} rawName
 * @returns {{platform: string, method: string, arch: string} | null}
 */
const classifyAsset = (rawName) => {
  const name = normalize(rawName);
  if (!name) return null;

  let ours = false;
  for (const key of PRODUCT_KEYS) {
    if (hasToken(name, key)) {
      ours = true;
      break;
    }
  }
  if (!ours) return null;

  /** @type {string | null} */
  let platform = null;
  /** @type {string | null} */
  let method = null;

  if (name.endsWith('.exe')) {
    platform = 'windows';
    method = hasToken(name, 'portable') ? 'portable' : 'installer';
  } else if (name.endsWith('.dmg') || name.endsWith('.pkg')) {
    platform = 'macos';
    method = 'installer';
  } else if (name.endsWith('.deb')) {
    platform = 'linux';
    method = 'deb';
  } else if (name.endsWith('.appimage')) {
    platform = 'linux';
    method = 'appimage';
  } else if (name.endsWith('.tar.gz') || name.endsWith('.tgz')) {
    platform = 'linux';
    method = 'archive';
  } else if (name.endsWith('.zip') && hasToken(name, 'portable')) {
    platform = 'windows';
    method = 'portable';
  } else if (name.endsWith('.appx')) {
    platform = 'windows';
    method = 'ms-store';
  }

  if (!platform || !method) return null;

  return {
    platform,
    method,
    arch: detectArch(name)
  };
};

/**
 * @returns {'windows' | 'macos' | 'linux'}
 */
const detectHostPlatform = () => {
  switch (process.platform) {
  case 'win32':
    return 'windows';
  case 'darwin':
    return 'macos';
  default:
    return 'linux';
  }
};

/**
 * @returns {string}
 */
const detectHostArch = () => {
  switch (process.arch) {
  case 'arm64':
    return 'arm64';
  case 'arm':
    return 'armv7l';
  case 'ia32':
    return 'ia32';
  default:
    return 'x64';
  }
};

const METHOD_PRIORITY = {
  windows: ['installer', 'portable', 'ms-store'],
  macos: ['installer'],
  linux: ['appimage', 'deb', 'archive']
};

/**
 * @param {{arch: string, method: string, platform: string}[]} sources
 * @returns {{name: string, arch: string, method: string, platform: string} | null}
 */
const recommendSource = (sources) => {
  const platform = detectHostPlatform();
  const candidates = (Array.isArray(sources) ? sources : [])
    .filter((source) => source && source.platform === platform);
  if (!candidates.length) {
    return null;
  }

  const hostArch = detectHostArch();
  const order = METHOD_PRIORITY[platform] || [];
  const methodRank = (method) => {
    const index = order.indexOf(method);
    return index === -1 ? order.length : index;
  };
  const archRank = (arch) => {
    if (arch === hostArch) return 0;
    if (arch === 'universal') return 1;
    return 2;
  };

  let best = null;
  let bestScore = null;
  for (const source of candidates) {
    const rank = archRank(source.arch);
    if (rank >= 2) {
      continue;
    }
    const score = [rank, methodRank(source.method)];
    if (
      bestScore === null ||
      score[0] < bestScore[0] ||
      (score[0] === bestScore[0] && score[1] < bestScore[1])
    ) {
      best = source;
      bestScore = score;
    }
  }
  return best || null;
};

/**
 * @param {number} bytes
 * @returns {string}
 */
const formatSize = (bytes) => {
  const b = Number(bytes) || 0;
  if (!b) return '';
  return b >= 1024 * 1024 * 1024 ?
    (b / 1024 / 1024 / 1024).toFixed(2) + ' GB' :
    Math.round(b / 1024 / 1024) + ' MB';
};

/**
 * @param {string | null | undefined} body
 * @param {number} [limit]
 * @returns {string[]}
 */
const parseChangelog = (body, limit = 30) => {
  const lines = String(body || '').split(/\r?\n/);
  const changes = [];
  for (const line of lines) {
    let text = line.trim();
    if (!text) continue;
    text = text.replace(/^\s*(?:[-*+]|\d+\.)\s+/, '');
    text = text.replace(/^#{1,6}\s*/, '');
    text = text.replace(/^(?:>\s*)+/, '');
    if (/^[>\-=*_#|\s]+$/.test(text)) continue;
    if (/^\|/.test(text)) continue;
    text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
    text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
    text = text.replace(/`([^`]+)`/g, '$1');
    text = text.trim();
    if (text) {
      changes.push(text);
    }
    if (changes.length >= limit) break;
  }
  return changes;
};

/**
 * @returns {Promise<unknown>}
 */
const fetchLatestRelease = async () => {
  const releases = await privilegedFetch.json(RELEASES_API, {
    'accept': 'application/vnd.github+json',
    'x-github-api-version': '2022-11-28'
  });

  if (!Array.isArray(releases)) {
    throw new Error('GitHub API did not return an array of releases');
  }

  const published = releases.filter((release) => (
    release &&
    typeof release.tag_name === 'string' &&
    release.draft !== true
  ));

  if (!published.length) {
    throw new Error('No releases found in repository');
  }

  const stable = published.find((release) => release.prerelease !== true);
  return stable || published[0];
};

/**
 * @param {unknown} release
 * @returns {string}
 */
const getReleaseVersion = (release) => {
  const tag = release && release.tag_name;
  return typeof tag === 'string' ? tag : '';
};

/**
 * @param {unknown} release
 * @returns {string}
 */
const getReleaseBody = (release) => {
  const body = release && release.body;
  return typeof body === 'string' ? body : '';
};

/**
 * @param {unknown} release
 * @returns {boolean}
 */
const isPrerelease = (release) => Boolean(release && release.prerelease === true);

/**
 * @type {{id: string, name: string}[]}
 */
const DOWNLOAD_PROXIES = [
  {id: '', name: 'GitHub（默认）'},
  {id: 'https://v4.gh-proxy.org/', name: 'v4.gh-proxy.org'},
  {id: 'https://ghproxy.net/', name: 'ghproxy.net'},
  {id: 'https://ghfast.top/', name: 'ghfast.top'}
];

/**
 * @param {string} prefix
 * @param {string} url
 * @returns {string}
 */
const prependPrefix = (prefix, url) => {
  const base = String(prefix || '').replace(/\/+$/, '');
  const target = String(url || '');
  if (!base) return target;
  if (target.startsWith(`${base}/`)) return target;
  return `${base}/${target}`;
};

/**
 * @param {string} url
 * @returns {boolean}
 */
const isGitHubAssetUrl = (url) => /^https?:\/\/([\w-]+\.)*github\.com\//i.test(String(url || ''));

/**
 * @param {string} url
 * @param {string} proxyId
 * @returns {string}
 */
const applyProxy = (url, proxyId) => {
  if (!proxyId || !isGitHubAssetUrl(url)) return url;
  return prependPrefix(proxyId, url);
};

/**
 * @param {unknown} value
 * @returns {string}
 */
const readCustomSource = (value) => (typeof value === 'string' ? value.trim() : '');

/**
 * A custom source that points straight at a file is used as-is; anything else is
 * treated as a prefix that the GitHub asset URL is appended to.
 * @param {string} source
 * @returns {boolean}
 */
const isCompleteDownloadURL = (source) => {
  try {
    const {pathname} = new URL(source);
    return INSTALLER_FILE_EXTENSIONS.some((extension) => pathname.toLowerCase().endsWith(extension));
  } catch (error) {
    return false;
  }
};

/**
 * @param {string} url
 * @param {unknown} customSource
 * @returns {string}
 */
const applyCustomSource = (url, customSource) => {
  let source = readCustomSource(customSource);
  if (!source) {
    // Imported late due to circular dependency
    source = readCustomSource(require('./settings').customUpdateSource);
  }
  if (!source) return url;

  const target = String(url || '');
  if (!target) return target;

  if (isCompleteDownloadURL(source)) {
    return source;
  }
  if (!isGitHubAssetUrl(target)) {
    return target;
  }
  return prependPrefix(source, target);
};

/**
 * @param {string} url
 * @param {string} proxyId
 * @param {unknown} customSource
 * @returns {string}
 */
const resolveDownloadURL = (url, proxyId, customSource) => {
  const custom = applyCustomSource(url, customSource);
  if (custom !== url) return custom;
  return applyProxy(url, proxyId);
};

/**
 * @param {unknown} release
 * @returns {{sources: object[], releasesPage: string, proxies: {id: string, name: string}[]}}
 */
const listDownloadSources = (release) => {
  const assets = release && Array.isArray(release.assets) ? release.assets : [];

  const sources = [];
  for (const asset of assets) {
    const name = asset && asset.name;
    const url = asset && asset.browser_download_url;
    if (typeof name !== 'string' || typeof url !== 'string') continue;

    const info = classifyAsset(name);
    // Filter out assets that are not installers of this project.
    if (!info) continue;

    sources.push({
      name,
      url,
      size: formatSize(asset.size),
      arch: info.arch,
      method: info.method,
      platform: info.platform
    });
  }

  // Installers come before portable builds, then sort by name for a stable order.
  const methodOrder = {
    installer: 0,
    'ms-store': 1,
    portable: 2,
    appimage: 3,
    deb: 4,
    archive: 5
  };
  sources.sort((a, b) => {
    const byMethod = (methodOrder[a.method] || 0) - (methodOrder[b.method] || 0);
    if (byMethod !== 0) return byMethod;
    return a.name.localeCompare(b.name);
  });

  return {
    sources,
    releasesPage: RELEASES_PAGE,
    proxies: DOWNLOAD_PROXIES
  };
};

/**
 * @param {unknown} value
 * @returns {boolean}
 */
const isProxyIdValid = (value) => {
  if (typeof value !== 'string' || !value) return false;
  return DOWNLOAD_PROXIES.some((proxy) => proxy.id === value);
};

/**
 * @returns {string}
 */
const readSelectedProxyId = () => {
  // Imported late due to circular dependency
  const settings = require('./settings');
  const saved = settings.updateDownloadProxy;
  if (isProxyIdValid(saved)) {
    return saved;
  }
  return DOWNLOAD_PROXIES[0].id;
};

/**
 * @param {string} proxyId
 * @returns {Promise<void>}
 */
const saveSelectedProxyId = async (proxyId) => {
  if (!isProxyIdValid(proxyId)) return;
  // Imported late due to circular dependency
  const settings = require('./settings');
  settings.updateDownloadProxy = proxyId;
  await settings.save();
};

/**
 * @returns {Promise<{
 *   currentVersion: string,
 *   latestVersion: string,
 *   updateAvailable: boolean,
 *   prerelease: boolean,
 *   publishedAt: string,
 *   releaseUrl: string,
 *   changelog: string[],
 *   sources: object[],
 *   recommendedSourceName: string,
 *   hostPlatform: string,
 *   hostArch: string,
 *   releasesPage: string,
 *   proxies: {id: string, name: string}[],
 *   selectedProxyId: string
 * }>}
 */
const resolveLatestRelease = async () => {
  const release = await fetchLatestRelease();

  const currentVersion = require('../package.json').version;

  const latestVersion = getReleaseVersion(release);
  const changelog = parseChangelog(getReleaseBody(release));

  const normalizeVersion = (version) => String(version || '').replace(/^v/i, '');

  const updateAvailable = Boolean(latestVersion) &&
    normalizeVersion(currentVersion) !== normalizeVersion(latestVersion);

  const {sources, releasesPage, proxies} = listDownloadSources(release);
  const recommended = recommendSource(sources);

  return {
    currentVersion,
    latestVersion,
    updateAvailable,
    prerelease: isPrerelease(release),
    publishedAt: String(release.published_at || release.created_at || '').slice(0, 10),
    releaseUrl: String(release.html_url || RELEASES_PAGE),
    changelog,
    sources,
    recommendedSourceName: recommended ? recommended.name : '',
    hostPlatform: detectHostPlatform(),
    hostArch: detectHostArch(),
    releasesPage,
    proxies,
    selectedProxyId: readSelectedProxyId()
  };
};

module.exports = {
  REPO,
  RELEASES_PAGE,
  DOWNLOAD_PROXIES,
  RELEASES_HOST,
  applyProxy,
  applyCustomSource,
  resolveDownloadURL,
  readSelectedProxyId,
  saveSelectedProxyId,
  classifyAsset,
  detectArch,
  detectHostPlatform,
  detectHostArch,
  recommendSource,
  parseChangelog,
  fetchLatestRelease,
  listDownloadSources,
  resolveLatestRelease
};