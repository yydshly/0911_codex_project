# 中文研究网页

[项目介绍](../README.md) · [文档入口](../understanding.md)

七章共用项目 Markdown，静态生成中文阅读网页，提供章节导航、页内目录、可滚动对照表、前后章与文档下载。无在线重建功能。

## 构建与检查

需要 Node.js 22 或兼容版本，无第三方 npm 依赖，因此无依赖安装与锁文件。在仓库根目录执行：

```powershell
node projects/014-gaussian-splatting/app/build.cjs
node projects/014-gaussian-splatting/app/check.cjs
```

输出为 `app/dist/`。生成器支持本项目使用的 Markdown 子集。正文改项目 Markdown，样式改 `src/style.css`，不要直接改生成 HTML。

## 本地预览

```powershell
python -m http.server 8774 --bind 127.0.0.1 --directory projects/014-gaussian-splatting/app/dist
```

启动后访问 `http://127.0.0.1:8774/`。Python 仅作本地静态服务。入口只在服务器运行时可用，不是公网地址。

## 统一发布

已纳入 [部署清单](../../../docs/web-demos.json)与 [Pages 工作流](../../../.github/workflows/pages.yml)。构建后通过根命令 `node scripts/build-pages.cjs` 汇总到 `_site/014-gaussian-splatting/`，与其他项目统一发布。

本轮未推送或部署；预留路径不能当作已验证在线入口。上线后核对页面和资源再更新状态。