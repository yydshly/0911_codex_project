# Web 演示约定

[返回首页](../README.md)

## 当前发布方式

使用 GitHub Pages，由 [发布工作流](../.github/workflows/pages.yml) 将 [部署清单](web-demos.json) 中的项目统一发布。首次发布已于 2026-09-10 完成并验证。

[站点总入口](https://yydshly.github.io/0911_codex_project/) · [001 的配套工程案例手册](https://yydshly.github.io/0911_codex_project/002-engineering-casebook/) · [002 LongHorizon-Harness 存档](https://yydshly.github.io/0911_codex_project/003-longhorizon-harness/)

- 站点根目录：能力与演示总入口，关联原库、能力研究和案例展示。
- `002-engineering-casebook/`：工程案例手册的独立访问路径。
- `003-longhorizon-harness/`：LongHorizon-Harness 研究存档，不是上游 Agent 实测演示。
- `assets/`：站点展示所需的整体引导图。
- 本地预览仅用于本机，不作为线上部署结果。

## 构建与部署流程

1. 推送 `main` 分支中与部署相关的文件，或手动运行发布工作流。
2. 在 002 项目中生成数据，检查原文对应关系、搜索筛选、排序、分页及静态资源，并确认生成文件与提交一致。
3. 从根目录执行 `node scripts/build-pages.cjs`，根据部署清单汇总每个项目的静态目录。
4. 输出到根 `_site/`，只上传此目录；不上传整个仓库、研究原始资料或本地配置。
5. 通过 GitHub Actions 的 Pages artifact 和 deploy-pages 发布。
6. 部署完成后验证首页、各子路径与资源，核对部署提交，再更新文档入口。

本仓库根目录没有统一应用依赖；打包脚本使用 Node.js 内置模块。项目自身依赖、锁文件和检查命令仍独立维护。

## 增加其他演示

在 [web-demos.json](web-demos.json) 中追加项目，保留已有条目。每个条目包括：

| 字段 | 用途 |
| :--- | :--- |
| researchIndex | 所属原库的研究索引，用于展示和排序；同一原库的配套演示使用相同索引 |
| id / slug | 历史存储编号与独立 URL 子路径，保持已发布链接稳定；不代表研究索引 |
| sourceDirectory | 已完成构建的静态目录 |
| name / capability | 项目名称与原库核心能力摘要 |
| extension | 本地新增能力，避免与原库能力混淆 |
| upstream / upstreamName | 真实原库地址与名称 |
| readme / research | 本地项目介绍与原库能力研究 |
| image | 项目说明图或真实截图；明确图片性质 |

同时为新项目补充工作流中的构建检查步骤和路径触发条件，再更新根 README、子项目 README 的演示入口。打包按研究索引排序，同一研究内按存储编号排序，并检查重复路径、引用文件和 JavaScript 语法。

所有子项目一次性汇总发布，避免后部署的项目覆盖先前演示。静态文件使用相对资源路径，确保放在子路径下仍可加载。包含后端的项目需另外配置服务，GitHub Pages 不运行后端。

## 部署记录

| 项目 | 记录 |
| :--- | :--- |
| 平台 | GitHub Pages |
| 仓库 | [yydshly/0911_codex_project](https://github.com/yydshly/0911_codex_project) |
| 分支与触发 | main 的相关变更，或 workflow_dispatch |
| 工作流 | [.github/workflows/pages.yml](../.github/workflows/pages.yml) |
| 打包命令 | 根目录执行 `node scripts/build-pages.cjs` |
| 上传目录 | `_site/` |
| 002 静态源目录 | `projects/002-engineering-casebook/app/dist/` |
| 002 路径 | `002-engineering-casebook/` |
| 上游研究版本 | `9ef9509126254406440c0e5ee09f609d0876418a` |
| 首次发布状态 | 成功；2026-09-10 验证首页、两个子路径及主要静态资源正常，内容与提交一致 |
| 首次发布提交 | `9dc501b1926baac79be8c371b07eebe96ba299e0` |
| 工作流证据 | [Actions 运行记录](https://github.com/yydshly/0911_codex_project/actions/runs/34477023345) |
| HTTPS | 已启用并强制使用 |

权限由 GitHub Actions 的 `contents: read`、`pages: write` 和 `id-token: write` 控制，无需将访问令牌放入仓库。

参考：[GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
