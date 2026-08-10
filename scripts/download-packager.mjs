import * as fs from 'node:fs';
import * as pathUtil from 'node:path';
import { computeSHA256, persistentFetch } from './lib.mjs';
import packagerInfo from './packager.json' with { type: 'json' };

const path = pathUtil.join(import.meta.dirname, '../src-renderer/packager/standalone.html');

// CYSOEditor 自定义打包器标记：检测文件中是否包含自定义内容
const CUSTOM_MARKER = 'cysoeditor';

/**
 * 检测当前 standalone.html 是否为 CYSOEditor 自定义编译版本
 * 自定义版本包含 CYSO Core 权限系统等定制代码，不应被官方原版覆盖
 */
const isCustomBuild = () => {
  try {
    const content = fs.readFileSync(path, 'utf8');
    return content.toLowerCase().includes(CUSTOM_MARKER);
  } catch (e) {
    return false;
  }
};

const isAlreadyDownloaded = () => {
  try {
    const data = fs.readFileSync(path);
    return computeSHA256(data) === packagerInfo.sha256;
  } catch (e) {
    // file might not exist, ignore
  }
  return false;
};

if (isCustomBuild()) {
  // 检测到 CYSOEditor 自定义编译版本，跳过下载以避免覆盖
  console.log('CYSOEditor custom packager detected, skipping download.');
} else if (!isAlreadyDownloaded()) {
  console.log(`Downloading ${packagerInfo.src}`);
  console.time('Download packager');

  persistentFetch(packagerInfo.src)
    .then((res) => res.arrayBuffer())
    .then((buffer) => {
      const sha256 = computeSHA256(buffer);
      if (packagerInfo.sha256 !== sha256) {
        throw new Error(`Hash mismatch: expected ${packagerInfo.sha256} but found ${sha256}`);
      }

      fs.mkdirSync(pathUtil.dirname(path), {
        recursive: true
      });
      fs.writeFileSync(path, new Uint8Array(buffer));
    })
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
} else {
  console.log('Packager already updated');
}
