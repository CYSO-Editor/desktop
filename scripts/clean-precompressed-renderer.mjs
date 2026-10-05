/**
 * 删除 dist-renderer-webpack 下的 .br 预压缩副本。
 *
 * 协议层（src-main/protocols.js）的 brotli 分支只要发现 .br 就优先使用，不比较新旧。
 * 开发时产物里留着旧的 .br，协议就会返回过期代码，所以开发流程必须先清掉它们。
 */
import pathUtil from 'node:path';
import fsPromises from 'node:fs/promises';

const root = pathUtil.join(import.meta.dirname, '../dist-renderer-webpack');

const walk = async directory => {
  const entries = await fsPromises.readdir(directory, {withFileTypes: true});
  const files = [];
  for (const entry of entries) {
    const full = pathUtil.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(full));
    } else if (entry.name.endsWith('.br')) {
      files.push(full);
    }
  }
  return files;
};

try {
  const files = await walk(root);
  await Promise.all(files.map(file => fsPromises.rm(file, {force: true})));
  console.log(`Removed ${files.length} precompressed files`);
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
  console.log('Nothing to remove, build output does not exist yet');
}
