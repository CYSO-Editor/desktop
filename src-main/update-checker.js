const settings = require('./settings');
const {resolveLatestRelease} = require('./github-releases');

const isUpdateCheckerAllowed = () => true;

/**
 * 拉取最新版本信息。
 *
 * 与上游 TurboWarp 的区别：上游读 desktop.turbowarp.org/version.json，
 * 本项目读 GitHub Releases（CYSO-Editor/desktop）。版本号与当前版本不同即视为需要更新。
 *
 * @param {{force?: boolean}} [options] force 为 true 时忽略「从不提醒」设置，用于用户主动触发的检查
 * @returns {Promise<object|null>}
 */
const fetchUpdateInfo = async ({force = false} = {}) => {
  if (!force && !isUpdateCheckerAllowed()) {
    return null;
  }
  if (!force && settings.updateChecker === 'never') {
    return null;
  }
  // 「忽略此版本」不在这里生效：菜单栏提示、更新窗口、设置里的查看更新都依赖
  // updateAvailable 字段，是否提示由调用方决定。
  return resolveLatestRelease();
};

/** 多个编辑器窗口可能同时打开，检查结果需要保持一致。 @type {Promise<void>|null} */
let checkInFlight = null;

/**
 * 用户是否主动忽略过该版本。忽略只针对版本号本身，新版本不受影响。
 * @param {object} info fetchUpdateInfo 的返回值
 * @returns {boolean}
 */
const isUpdateIgnored = (info) => {
  if (!info || !info.updateAvailable) {
    return false;
  }
  return settings.isUpdateVersionIgnored(info.latestVersion);
};

/**
 * 后台检查更新，只把结果广播给菜单栏，不弹窗。更新入口由用户主动点击。
 * @returns {Promise<void>}
 */
const checkForUpdatesSilently = async () => {
  if (checkInFlight) {
    return checkInFlight;
  }

  const task = (async () => {
    try {
      const info = await fetchUpdateInfo();
      rememberUpdateInfo(info);
      // 无论有没有更新都要广播，窗口才能把上一次的提示撤下来。
      const show = info && info.updateAvailable && !isUpdateIgnored(info);
      broadcastAvailableVersion(show ? info.latestVersion : '');
    } catch (error) {
      // 网络失败不该打扰用户，可能是断网或网络屏蔽了 GitHub。
      console.error('Error checking for updates:', error);
    }
  })();

  checkInFlight = task;
  try {
    await task;
  } finally {
    checkInFlight = null;
  }
};

/**
 * 记录忽略状态，并立刻同步菜单栏提示。
 * @param {string} version 版本号
 * @param {boolean} [ignored] true 表示忽略，false 表示取消忽略
 * @returns {Promise<void>}
 */
const ignoreUpdate = async (version, ignored = true) => {
  if (ignored) {
    settings.addIgnoredUpdateVersion(version);
  } else {
    settings.removeIgnoredUpdateVersion(version);
  }
  await settings.save();

  // 只在当前提示的正是这个版本时才动，避免误伤其他窗口的显示。
  if (availableVersion !== version) {
    return;
  }
  broadcastAvailableVersion(ignored ? '' : version);
};

/**
 * 最近一次成功拉取的更新信息。
 *
 * 缓存它是为了让「打开更新窗口」不依赖网络：GitHub API 未登录时限流，
 * 失败时至少还能用缓存把窗口打开。
 * @type {object|null}
 */
let cachedUpdateInfo = null;

const rememberUpdateInfo = (info) => {
  if (info && typeof info === 'object') {
    cachedUpdateInfo = info;
  }
};

/**
 * 打开更新窗口。优先用新鲜数据，失败时回退到缓存。
 * 用户是主动点击的，因此不受「已忽略该版本」的限制。
 * @returns {Promise<{opened: boolean}>}
 */
const openUpdateWindow = async () => {
  const UpdateWindow = require('./windows/update');

  let info = null;
  let fetchFailed = false;
  try {
    info = await fetchUpdateInfo({force: true});
    rememberUpdateInfo(info);
  } catch (error) {
    fetchFailed = true;
    console.error('Could not refresh update info, falling back to cache:', error);
  }

  if ((!info || !info.updateAvailable) && fetchFailed) {
    info = cachedUpdateInfo;
  }
  if (!info || !info.updateAvailable) {
    return {opened: false};
  }

  UpdateWindow.updateAvailable(info);
  return {opened: true};
};

/** 菜单栏只需要版本号，下载源和日志等重数据在打开更新窗口时再取。 @type {string} */
let availableVersion = '';

/** @returns {string} 空字符串表示没有可用更新 */
const getAvailableVersion = () => availableVersion;

/**
 * 把结果广播给所有编辑器窗口，保证多个窗口显示一致。
 * @param {string} version
 * @returns {void}
 */
const broadcastAvailableVersion = (version) => {
  availableVersion = version;
  const {BrowserWindow} = require('electron');
  for (const window of BrowserWindow.getAllWindows()) {
    if (!window.isDestroyed()) {
      window.webContents.send('cyso:update-available', version);
    }
  }
};

module.exports = {
  isUpdateCheckerAllowed,
  fetchUpdateInfo,
  checkForUpdatesSilently,
  openUpdateWindow,
  ignoreUpdate,
  getAvailableVersion,
  // 导出供 windows/update.js 还原「永久忽略」勾选状态
  isUpdateIgnored
};