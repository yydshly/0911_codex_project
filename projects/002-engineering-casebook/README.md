# 002 · 工程案例手册

> 基于原库“工程案例收集、分类与导航”的能力，提供可搜索、可筛选的中文阅读入口。全部 343 个条目具备标题导读，6 篇补充有原文依据的结构化总结；检索与中文解读是本项目新增能力。

[返回总索引](../../README.md#项目索引) · [中文案例目录](cases.md) · [研究笔记](notes.md) · [上游研究项目](../001-awesome-engineering-articles/README.md)

## 项目信息

| 项目 | 内容 |
| :--- | :--- |
| 固定编号 | 002 |
| 上游仓库 | [ashishps1/awesome-engineering-articles](https://github.com/ashishps1/awesome-engineering-articles) |
| 研究版本 | `9ef9509126254406440c0e5ee09f609d0876418a`，2026-03-01 |
| 收录日期 | 2026-09-10 |
| 技术栈 | 原生 HTML、CSS、JavaScript；Node.js 数据生成、预览与检查，无第三方依赖 |
| 上游许可证 | [MIT 本地副本](sources/LICENSE)；保留原作者版权声明 |
| 研究状态 | 研究中；展示页已实现，全文精读持续扩展 |
| 在线演示 | [打开工程案例手册](https://yydshly.github.io/0911_codex_project/002-engineering-casebook/) |
| 部署平台 | GitHub Pages；[站点总入口](https://yydshly.github.io/0911_codex_project/) |
| 展示内容 | 343 个条目、39 个公司／品牌、16 个主题、6 篇原文总结 |

## 展示与总结

- 搜索中文问题、英文技术名、公司名称以及已总结的内容。
- 组合筛选公司、主题与内容依据，按年份或上游顺序排序。
- 每页展示 12 条案例，支持分页与筛选重置。
- 点击卡片展开详情：原文总结包含问题、关键做法、原文结果、代价与边界、对我们的启示。
- 保留英文标题、上游年份、原文链接和编号，便于回溯。
- 提供[纯文档版中文目录](cases.md)，不启动网页也可阅读。

| 标记 | 含义 |
| :--- | :--- |
| 原文总结（6 篇） | 已阅读原文，记录依据章节与核对日期；未复现生产结果 |
| 标题导读（337 篇） | 根据上游标题与主题撰写中文概括，提供阅读问题；不声称已总结全文 |

六篇原文总结覆盖 Canva S3 降本与图片检索、Discord 消息存储、Meta 缓存一致性、GitHub 代码搜索、Slack 单元化架构。年份沿用上游标注；标题中的规模与效果不视为本项目验证的事实。

## 界面与效果

### 整体理解引导图

![工程案例研究与实践：整体理解引导图](assets/overview-guide.png)

图中串联上游定位、展示能力、主题覆盖、研究路径、使用价值、六篇原文总结及扩展方向。进度快照为 2026-09-10：343 条已接入，6 篇已总结，337 篇仍为标题导读。

此图由 AI 生成，是整体说明图，不是软件截图；图中“未上线”为部署前快照，实际状态以本页“在线演示”为准。[生成说明与提示词](assets/overview-guide-prompt.md)

### 展示页面

页面采用主题侧栏、案例卡片与详情弹窗；窄屏使用主题下拉选择和单列卡片。弹窗使用浏览器原生对话框，支持关闭按钮、Escape 和关闭后焦点返回。

暂无真实截图。已完成静态资源、数据、搜索筛选和分页逻辑检查，未进行浏览器交互及截图验收。[配图说明](assets/README.md)

## 运行与演示

最简单的方式：将项目保存到本机，用现代浏览器打开 [app/dist/index.html](app/dist/index.html)。页面资源全部位于同一目录，展示数据不会从外部网站动态请求；访问原文需要网络。GitHub 上的 HTML 文件链接展示源码，需要下载到本地使用。

也可在本子项目的 `app/` 目录运行：

```powershell
node scripts/serve.cjs
```

默认预览地址为 `http://127.0.0.1:4173/`。仅在服务启动后有效；本次已验证 HTTP 200，**不是线上部署地址**。如端口已被占用，可设置 `CASEBOOK_PORT` 后启动。结束服务使用 Ctrl+C。

数据更新与检查，同样在 `app/` 目录执行：

```powershell
node scripts/build-data.cjs
node scripts/check.cjs
```

生成过程不依赖网络，输出网页数据与 [cases.md](cases.md)。项目声明的同名 npm 脚本也可使用，无需安装第三方包。

### GitHub Pages 发布

按用户指定使用 GitHub Pages。根目录的 [发布工作流](../../.github/workflows/pages.yml) 执行本项目检查，并由 [站点打包脚本](../../scripts/build-pages.cjs) 将静态文件汇入独立的 `002-engineering-casebook/` 子路径。网站首页关联原库、能力分析、研究文档与案例手册。

正式入口：[在线工程案例手册](https://yydshly.github.io/0911_codex_project/002-engineering-casebook/)。2026-09-10 首次部署成功，已核对首页、案例页面、数据、脚本、样式、图标、许可证与说明图，HTTP 响应正常且内容与发布提交一致。首次发布提交为 `9dc501b1926baac79be8c371b07eebe96ba299e0`，见[成功工作流](https://github.com/yydshly/0911_codex_project/actions/runs/34477023345)。此验证不代替浏览器交互或上游实验复现。

[hosting.json](app/.openai/hosting.json) 保留静态目录描述，不参与 GitHub Pages 构建，也不代表已注册 Sites 项目。

## 文件结构与维护

| 文件 | 用途 |
| :--- | :--- |
| [sources/upstream-README.md](sources/upstream-README.md) | 固定版本的上游索引快照 |
| [sources/README.md](sources/README.md) | 来源、版权和快照维护约定 |
| [guides.tsv](app/scripts/guides.tsv) | 全部条目的中文导读 |
| [reviews.json](app/scripts/reviews.json) | 已阅读原文的结构化总结 |
| [build-data.cjs](app/scripts/build-data.cjs) | 解析快照，校验对应关系，生成网页与文档数据 |
| [app/dist/index.html](app/dist/index.html) | 可直接打开的网页入口 |
| [check.cjs](app/scripts/check.cjs) | 数据对应关系、筛选分页与静态资源检查 |

网页静态文件是交付内容，由本项目 .gitignore 明确保留，避免根目录的构建忽略规则将其排除。中文内容更新应修改导读或总结源文件，再运行数据生成与检查，不直接编辑生成的数据文件。

## 研究清单

- [x] 复制模板并分配独立项目编号
- [x] 保留固定版本来源与 MIT 版权声明
- [x] 展示全部 343 个条目与中文导读
- [x] 整理六篇原文总结并标注依据
- [x] 实现搜索、组合筛选、排序、分页与详情
- [x] 检查数据、核心逻辑和本地页面响应
- [x] 同步总索引、数量、预览和演示状态
- [ ] 继续精读原文，逐条将标题导读升级为原文总结
- [ ] 浏览器交互与截图验收
- [x] 部署至 GitHub Pages 并验证线上页面及主要资源

## 来源与改动

本地保留上游索引、许可证与其引用图片，中文导读、研究总结和展示应用为本次新增。未转载外链文章全文。上游 MIT 许可证不用于代替外链文章各自的使用条件。
