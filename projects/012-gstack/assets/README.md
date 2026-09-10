# 图片与截图来源

[项目介绍](../README.md)

本目录包括原创研究图解和本次新增中文研究网页的实际 Chromium 截图，两者分别标注。均非上游界面或模拟执行轨迹。

| 文件 | 内容 | 来源 |
| --- | --- | --- |
| skills-capability-map.svg / .png | 57 项技能的能力、产物、实现原理与本地实测边界 | 固定版本目录整理的原创图解，2026-09-11；脚本生成 SVG 并用 Chromium 渲染 PNG，非界面截图 |
| overview.png | 原理首页、四环节与三层实现 | browser-check.cjs 实际桌面 1440px 截图 |
| lab-desktop.png | 重复原库输入及检查结果 | 同次实际桌面截图 |

技能详情与窄屏截图保存在[完整截图目录](../app/dist/evidence/screenshots/)。时间、路径与网页内容指纹见[browser.json](../app/dist/evidence/browser.json)。教学输入明确标注，图像本身是真实页面输出。

能力图为 2400 × 3936 像素，SVG 可无损缩放。在 `app/` 中运行 `node scripts/build-capability-map.cjs` 和 `node scripts/render-capability-map.cjs` 可重建；渲染需要 Playwright，模块定位方式同项目说明。生成器核对全部 57 项无遗漏，网页分发副本同步写入 `app/dist/assets/`。
