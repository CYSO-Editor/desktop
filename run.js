#!/usr/bin/env node
// 自动编译渲染端并启动 CYSOEditor
// 用法：在 desktop 目录下执行 `node run.js`
const { spawnSync } = require('child_process');

function run(script) {
  console.log(`[run] 执行 npm run ${script} ...`);
  const result = spawnSync('npm', ['run', script], {
    stdio: 'inherit',
    shell: true
  });
  return result.status === 0;
}

const compile = run('webpack:compile');
if (!compile) {
  console.error('[run] 编译失败，已中止。');
  process.exit(1);
}

console.log('[run] 编译完成，启动 Electron ...');
const start = run('electron:start');
process.exit(start ? 0 : 1);
