const fs = require('fs');
const path = require('path');
const {app} = require('electron');
const {writeFileAtomic} = require('./atomic-write-stream');

const PATH = path.resolve(app.getPath('userData'), 'tw_config.json');

/**
 * Migrates settings from before v1.9.0.
 * @param {unknown} legacyData
 * @returns {object}
 */
const migrateLegacyData = (legacyData) => {
  const options = {};
  if (typeof legacyData.locale === 'string') {
    options.locale = legacyData.locale;
  }
  if (legacyData.disable_update_checker === true) {
    options.updateChecker = 'never';
  }
  if (legacyData.bypass_cors === true) {
    options.bypassCORS = true;
  }
  if (legacyData.hardware_acceleration === false) {
    options.hardwareAcceleration = false;
  }
  if (legacyData.background_throttling === false) {
    options.backgroundThrottling = false;
  }
  if (typeof legacyData.last_accessed_directory === 'string') {
    options.lastDirectory = legacyData.last_accessed_directory;
  }
  return options;
};

class Settings {
  constructor () {
    try {
      const parsedFile = JSON.parse(fs.readFileSync(PATH, 'utf-8'));
      if (!parsedFile) throw new Error('data is null');

      if (parsedFile.v2) {
        this.data = parsedFile.v2;
      } else {
        this.data = migrateLegacyData(parsedFile);
      }
    } catch (e) {
      // File does not exist or is corrupted
      this.data = {};
    }
  }

  async save () {
    if (this.pendingWrite) {
      this.needsAnotherWrite = true;
      return this.pendingWrite;
    }
    const run = async () => {
      do {
        this.needsAnotherWrite = false;
        const serialized = {
          v2: this.data
        };
        await writeFileAtomic(PATH, JSON.stringify(serialized, null, 2));
      } while (this.needsAnotherWrite);
      this.pendingWrite = null;
    };
    this.pendingWrite = run().catch(err => {
      this.pendingWrite = null;
      throw err;
    });
    return this.pendingWrite;
  }

  /**
   * Tracks which manual data migration was most recently have been performed.
   */
  get dataVersion () {
    return this.data.dataVersion || 0;
  }
  set dataVersion (dataVersion) {
    this.data.dataVersion = dataVersion;
  }

  /**
   * Contains the version of the desktop app that was run previously.
   */
  get desktopVersion() {
    return this.data.desktopVersion || '0.0.0';
  }
  set desktopVersion (desktopVersion) {
    this.data.desktopVersion = desktopVersion;
  }

  /**
   * Contains the Electron version used by the version of the desktop app that was run previously.
   */
  get electronVersion() {
    return this.data.electronVersion || '0.0.0';
  }
  set electronVersion(electronVersion) {
    this.data.electronVersion = electronVersion;
  }

  get locale () {
    return this.data.locale || 'en';
  }
  set locale (locale) {
    this.data.locale = locale;
  }

  /**
   * 更新通知设置。
   *
   * 曾有第三档 'unstable'（连预发布版一起检查），现已移除：
   * 只保留「只接收正式版」与「从不提醒」两档。旧配置里残留的
   * 'unstable' 会在读取时降级为 'stable'，避免用户界面出现空选项。
   * @returns {'stable' | 'never'}
   */
  get updateChecker () {
    return this.data.updateChecker === 'never' ? 'never' : 'stable';
  }
  set updateChecker (updateChecker) {
    this.data.updateChecker = updateChecker === 'never' ? 'never' : 'stable';
  }

  /**
   * 用户主动忽略过的版本号。
   *
   * 只记版本号，不记时间：忽略是针对「某个版本」的决定，一旦做出就对
   * 该版本一直有效，出下一个版本时自动失效（因为新版本号不在列表里）。
   * 用户想重新考虑时，通过更新窗口里的开关取消。
   * @returns {string[]}
   */
  get ignoredUpdateVersions () {
    const versions = this.data.ignoredUpdateVersions;
    return Array.isArray(versions) ? versions : [];
  }
  set ignoredUpdateVersions (ignoredUpdateVersions) {
    this.data.ignoredUpdateVersions = Array.isArray(ignoredUpdateVersions) ?
      ignoredUpdateVersions.filter((item) => typeof item === 'string') :
      [];
  }

  /**
   * 某个版本是否被用户忽略。
   * @param {string} version
   * @returns {boolean}
   */
  isUpdateVersionIgnored (version) {
    return Boolean(version) && this.ignoredUpdateVersions.includes(version);
  }

  /**
   * 记录「忽略这个版本」。
   * @param {string} version
   */
  addIgnoredUpdateVersion (version) {
    if (!version) return;
    const versions = this.ignoredUpdateVersions;
    if (!versions.includes(version)) {
      this.ignoredUpdateVersions = [...versions, version];
    }
  }

  /**
   * 取消对某个版本的忽略。
   * @param {string} version
   */
  removeIgnoredUpdateVersion (version) {
    if (!version) return;
    this.ignoredUpdateVersions = this.ignoredUpdateVersions.filter((item) => item !== version);
  }

  /**
   * 安装包存放目录。留空表示用系统「下载」文件夹。
   *
   * 用户设了值但那个目录不存在或不可写时，updates.js 会静默回退到
   * 默认目录，不影响更新功能本身可用。
   * @returns {string} 空字符串表示使用默认目录
   */
  get updateDownloadDirectory () {
    return typeof this.data.updateDownloadDirectory === 'string' ?
      this.data.updateDownloadDirectory :
      '';
  }
  set updateDownloadDirectory (updateDownloadDirectory) {
    this.data.updateDownloadDirectory = typeof updateDownloadDirectory === 'string' ?
      updateDownloadDirectory :
      '';
  }

  /**
   * 用户自定义的下载源前缀。
   *
   * 语义是「替换 GitHub Releases 域名部分的前缀」，与代理同一套机制：
   * 拿到真实的下载链接后拼上这个前缀。留空表示直连 GitHub。
   * 国内直连 GitHub 经常很慢，自建源/内网源能绕开这个问题。
   * @returns {string}
   */
  get customUpdateSource () {
    return typeof this.data.customUpdateSource === 'string' ?
      this.data.customUpdateSource :
      '';
  }
  set customUpdateSource (customUpdateSource) {
    this.data.customUpdateSource = typeof customUpdateSource === 'string' ?
      customUpdateSource :
      '';
  }

  /**
   * @returns {string} 空字符串表示直连 GitHub
   */
  get updateDownloadProxy () {
    return typeof this.data.updateDownloadProxy === 'string' ?
      this.data.updateDownloadProxy :
      '';
  }
  set updateDownloadProxy (updateDownloadProxy) {
    this.data.updateDownloadProxy = typeof updateDownloadProxy === 'string' ?
      updateDownloadProxy :
      '';
  }

  get camera () {
    return this.data.camera || null;
  }
  set camera (camera) {
    this.data.camera = camera;
  }

  get microphone () {
    return this.data.microphone || null;
  }
  set microphone (microphone) {
    this.data.microphone = microphone;
  }

  get bypassCORS () {
    return this.data.bypassCORS === true;
  }
  set bypassCORS (bypassCORS) {
    this.data.bypassCORS = bypassCORS;
  }

  get hardwareAcceleration () {
    return this.data.hardwareAcceleration !== false;
  }
  set hardwareAcceleration (hardwareAcceleration) {
    this.data.hardwareAcceleration = hardwareAcceleration;
  }

  get backgroundThrottling () {
    return this.data.backgroundThrottling !== false;
  }
  set backgroundThrottling (backgroundThrottling) {
    this.data.backgroundThrottling = backgroundThrottling;
  }

  get lastDirectory () {
    return this.data.lastDirectory || app.getPath('downloads');
  }
  set lastDirectory (lastDirectory) {
    this.data.lastDirectory = lastDirectory;
  }

  get spellchecker () {
    return this.data.spellchecker !== false;
  }
  set spellchecker (spellchecker) {
    this.data.spellchecker = spellchecker;
  }

  get exitFullscreenOnEscape () {
    return this.data.exitFullscreenOnEscape !== false;
  }
  set exitFullscreenOnEscape(exitFullscreenOnEscape) {
    this.data.exitFullscreenOnEscape = exitFullscreenOnEscape;
  }

  get richPresence () {
    return this.data.richPresence === true;
  }
  set richPresence (richPresence) {
    this.data.richPresence = richPresence;
  }

  get renderGpuMode () {
    return this.data.renderGpuMode || 'automatic';
  }
  set renderGpuMode (renderGpuMode) {
    this.data.renderGpuMode = renderGpuMode;
  }

  get renderResolutionCap () {
    const value = this.data.renderResolutionCap;
    return typeof value === 'number' && value >= 0 ? value : 0;
  }
  set renderResolutionCap (renderResolutionCap) {
    this.data.renderResolutionCap = renderResolutionCap;
  }

}

module.exports = new Settings();
