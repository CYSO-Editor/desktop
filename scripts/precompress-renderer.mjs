/**
 * 生成 dist-renderer-webpack 下可压缩文件的 .br 预压缩副本。
 *
 * 协议层的 brotli 分支会优先取 .br，缺失时回退到原文件，因此本脚本可独立运行。
 */
import pathUtil from 'node:path';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import { promisify } from 'node:util';
import zlib from 'node:zlib';

const root = pathUtil.join(import.meta.dirname, '../dist-renderer-webpack');
const brotliCompress = promisify(zlib.brotliCompress);

const COMPRESSIBLE = new Set(['.js', '.html', '.css', '.json', '.svg', '.map']);

const walk = async (directory) => {
  const entries = await fsPromises.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = pathUtil.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(full));
    } else if (entry.isFile() && COMPRESSIBLE.has(pathUtil.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
};

const brotliParams = {
  params: {
    [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
    [zlib.constants.BROTLI_PARAM_SIZE_HINT]: 0
  }
};

const totalRaw = [];
const totalCompressed = [];

const files = await walk(root);
for (const file of files) {
  const relative = pathUtil.relative(root, file);
  const contents = await fsPromises.readFile(file);

  // 小文件压缩收益抵不上解压开销，直接跳过。
  if (contents.length < 4096) continue;

  const compressed = await brotliCompress(contents, brotliParams);
  await fsPromises.writeFile(`${file}.br`, compressed);

  totalRaw.push(contents.length);
  totalCompressed.push(compressed.length);
  console.log(
    `${relative}: ${(contents.length / 1024).toFixed(0)} KB -> ${(compressed.length / 1024).toFixed(0)} KB` +
    ` (${((1 - compressed.length / contents.length) * 100).toFixed(0)}%)`
  );
}

const rawTotal = totalRaw.reduce((a, b) => a + b, 0);
const compressedTotal = totalCompressed.reduce((a, b) => a + b, 0);
console.log(
  `\nCompressed ${files.length} files: ` +
  `${(rawTotal / 1048576).toFixed(2)} MB -> ${(compressedTotal / 1048576).toFixed(2)} MB`
);