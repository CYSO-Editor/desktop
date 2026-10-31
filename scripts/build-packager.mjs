import {spawnSync} from 'node:child_process';
import * as fs from 'node:fs';
import * as pathUtil from 'node:path';

// 从本地 packager 仓库源码编译定制版打包器，替代上游"从官网下载预编译产物"的流程。
// 生成物不进 git，构建 / 打包前必须先执行 npm run fetch:packager。

const desktopRoot = pathUtil.join(import.meta.dirname, '..');
// Windows 文件系统大小写不敏感，但 webpack 4 的 babel include 匹配大小写敏感。
// 必须用磁盘真实大小写（如 TurboWarp）启动子进程，否则 babel 规则无法命中 ../scratch-vm 等目录。
const realCase = (p) => {
  try {
    return fs.realpathSync.native(p);
  } catch (e) {
    return pathUtil.resolve(p);
  }
};
const packagerRoot = realCase(pathUtil.resolve(desktopRoot, '../packager'));
const distRoot = pathUtil.join(packagerRoot, 'dist');
const outputRoot = pathUtil.join(desktopRoot, 'src-renderer', 'packager');

const FILES_TO_COPY = [
  'standalone.html',
  'scaffolding/scaffolding-min.js',
  'scaffolding/scaffolding-full.js'
];

// 每次都完整重新编译，保证产物始终反映 packager 最新源码
console.log(`Building packager from local source: ${packagerRoot}`);
const result = spawnSync('npm', ['run', 'build-standalone-prod'], {
  cwd: packagerRoot,
  stdio: 'inherit',
  shell: true
});
if (result.status !== 0) {
  console.error('Packager build failed');
  process.exit(result.status || 1);
}

for (const relative of FILES_TO_COPY) {
  const source = pathUtil.join(distRoot, relative);
  const target = pathUtil.join(outputRoot, relative);
  if (!fs.existsSync(source)) {
    console.error(`Build output missing: ${source}`);
    process.exit(1);
  }
  fs.mkdirSync(pathUtil.dirname(target), {recursive: true});
  fs.copyFileSync(source, target);
  console.log(`Copied ${relative}`);
}

console.log('Packager updated');
