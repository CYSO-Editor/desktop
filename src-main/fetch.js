// Can't use the global fetch() because we still need to support Electron 22

const {net} = require('electron');
const {name, version} = require('../package.json');

/**
 * 读取一个远程 URL 的完整内容。
 *
 * 这里刻意使用 Electron 的 net（Chromium 网络栈）而不是 Node 的 https：
 * Chromium 用操作系统的证书存储来校验 TLS，所以装有企业/自签根证书的用户
 * （校园网、SSL 过滤代理、抓包工具等）不会遇到
 * “unable to verify the first certificate”，而 Node 的默认 CA 列表会直接失败。
 *
 * @param {string} url
 * @param {Record<string, string>} [extraHeaders] Merged on top of the default headers.
 * @returns {Promise<Buffer>}
 */
const privilegedFetch = async (url, extraHeaders) => {
  const response = await net.fetch(url, {
    // GitHub API 会把 browser_download_url 之类的地址 302 到别处，需要跟随。
    redirect: 'follow',
    headers: Object.assign({
      'user-agent': `${name}/${version}`
    }, extraHeaders)
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status} while fetching ${url}`);
  }

  return Buffer.from(await response.arrayBuffer());
};

/**
 * @param {string} url
 * @param {Record<string, string>} [extraHeaders]
 * @returns {unknown} parsed JSON object
 */
privilegedFetch.json = async (url, extraHeaders) => {
  const buffer = await privilegedFetch(url, extraHeaders);
  return JSON.parse(buffer.toString('utf-8'));
};

module.exports = privilegedFetch;