# CYSO Editor Desktop

CYSO Editor 的桌面客户端。基于 [TurboWarp Desktop](https://github.com/TurboWarp/desktop) 与 [LLK/scratch-desktop](https://github.com/LLK/scratch-desktop) 深度定制，内置 Aurora 主题、CYSO Core 权限与安全模块、高扩展性的自定义打包器。

CYSO Editor 是一个视觉化编程编辑器，支持将项目打包为 HTML / ZIP / 可执行程序，并通过 CYSO Core 对扩展访问系统资源进行细粒度权限控制。

## 主要特性

- **Aurora 主题**：为编辑器界面提供全新的 Aurora 视觉主题。
- **CYSO Core 安全模块**：扩展访问文件、命令、硬件、屏幕等资源时按权限模型授权，拦截危险命令与危险路径。
- **自定义打包器**：内置基于 Turbowarp Packager 定制的打包器，支持自定义脚手架。
- **跨平台**：Windows / macOS / Linux 均可构建运行。

## 开发

项目使用 submodule 管理组件仓库：

```bash
git clone --recursive https://github.com/CYSO-Editor/desktop.git cysoeditor-desktop
```

或克隆后执行：

```bash
git submodule init
git submodule update
```

安装依赖：

```bash
npm ci
```

拉取额外的 library、packager、extension 文件：

```bash
npm run fetch
```

> 每次从 GitHub 拉取更新后，建议重复上述三组命令。

### 源码结构

由于自定义扩展的安全要求，本应用比 Scratch 官方桌面端更复杂：

- **src-main**：Electron 主进程代码，无需构建，`src-main/entrypoint.js` 是整个应用的入口。
- **src-renderer-webpack**：Electron 渲染进程（编辑器），由 webpack 构建为 **dist-renderer-webpack**。
- **src-renderer**：Electron 渲染进程（无 webpack），用于隐私政策窗口等。
- **src-preload**：渲染进程 preload 脚本，提供主进程与渲染进程间的受控通信。
- **dist-library-files** / **dist-extensions**：`npm run fetch` 管理的静态资源。

### 开发构建

```bash
# 编译 webpack 部分（开发版）
npm run webpack:compile

# 监听源文件变化即时重编译
npm run webpack:watch
```

编译并抓取完成后，启动开发版 Electron：

```bash
npm run electron:start
```

开发时建议开两个终端：一个运行 `npm run webpack:watch`，一个运行 `npm run electron:start`。渲染进程改动按 ctrl+R / cmd+R 刷新即可，主进程改动需重启应用。

### 正式发布构建

```bash
# 编译 webpack 优化版本
npm run webpack:prod
```

然后使用 `release-automation/build.mjs`（见 [release-automation/README.md](release-automation/README.md)）或 electron-builder CLI 打包，产物保存在 `dist` 目录：

```bash
# Windows 安装包
npx electron-builder --windows nsis --x64
# macOS DMG
npx electron-builder --mac dmg --universal
# Linux Debian
npx electron-builder --linux deb
```

通常只能在本机系统上为对应操作系统打包。

## 组件仓库

| 仓库 | 说明 |
|---|---|
| [CYSO-Editor/gui](https://github.com/CYSO-Editor/gui) | 图形化用户界面 |
| [CYSO-Editor/vm](https://github.com/CYSO-Editor/vm) | 虚拟机器（项目执行引擎） |
| [CYSO-Editor/paint](https://github.com/CYSO-Editor/paint) | 造型编辑器 |
| [CYSO-Editor/extensions](https://github.com/CYSO-Editor/extensions) | 扩展集合 |
| [CYSO-Editor/packager](https://github.com/CYSO-Editor/packager) | 项目打包器 |
| [CYSO-Editor/core](https://github.com/CYSO-Editor/core) | 权限与安全核心模块 |

## License

[GPL-3.0](./LICENSE)
