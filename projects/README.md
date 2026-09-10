# 研究项目

按原库去重，目前已收录 **3 个研究项目**，对应 4 个历史目录；其中历史目录 `002-engineering-casebook` 是研究 001 的配套案例手册，不单独计数；LongHorizon 的研究索引为 002，oh-my-pi 的研究索引为 003。

| 编号 | 项目 | 原库 | 核心能力 | 状态 | 在线入口 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 001 | [Awesome Engineering Articles](001-awesome-engineering-articles/README.md) | [awesome-engineering-articles](https://github.com/ashishps1/awesome-engineering-articles) | 收集、分类并导航工程实践文章，帮助发现问题相关案例和原始资料 | 研究中 | [配套案例手册](https://yydshly.github.io/0911_codex_project/002-engineering-casebook/) |
| 002 | [LongHorizon-Harness](003-longhorizon-harness/README.md) | [LongHorizon-Harness](https://github.com/AMAP-ML/LongHorizon-Harness) | 动态拆解复杂目标，指导 Agent 分轮执行，以独立验收、可信进度和失败反馈持续推进并支持续接 | 研究中（文档已整理，上游运行待复现） | [在线研究存档](https://yydshly.github.io/0911_codex_project/003-longhorizon-harness/) |
| 003 | [oh-my-pi（OMP）](004-oh-my-pi/README.md) | [oh-my-pi](https://github.com/can1357/oh-my-pi) | 基于 Pi 二次开发、类似 Codex CLI 的 AI 编程 Agent 工具，依靠模型并完善代码编辑、调试、执行反馈与协作能力 | 研究中（理解与模块已整理，运行待复现） | [研究笔记](004-oh-my-pi/notes.md)；演示未部署 |

## 编号与目录

- [工程案例手册（历史目录 002）](002-engineering-casebook/README.md) 归属 001，保留独立目录、依赖和已发布地址，用于中文导读、搜索筛选和原文总结。
- 项目总索引按原库去重；同一原库的研究、展示与实验关联到同一个研究条目，不重复计数。
- 研究索引与存储目录编号分开维护。LongHorizon 的研究索引为 002，历史目录与网址仍使用 `003-longhorizon-harness`；目录前缀不代表当前研究排序。
- oh-my-pi 的研究索引为 003，存储目录为 `004-oh-my-pi`；新增内容为中文研究和引导图，尚未增加运行演示。
- 存储目录使用 `001-project-slug` 格式，按历史目录最大编号加一；短名使用小写英文和连字符。
- 研究索引从 `001` 开始，按独立原库收录顺序递增，配套演示不占用研究索引；超过 `999` 后扩展编号宽度。
- 本次按用户要求将 LongHorizon 的研究索引修正为 002。此后研究索引与存储编号分别保持稳定；归档不复用。
- 根 README 的索引与图片预览均按编号的数值升序排列。
- 项目状态使用：`待研究`、`研究中`、`已完成`、`已归档`；演示是否部署单独记录。

每个项目至少包含 `README.md`、`notes.md` 和 `assets/`。实际代码按需放入 `app/`，详细实验记录可继续拆分到项目内部。

请按照[收录指南](../docs/adding-a-project.md)复制模板，并同步更新[总索引](../README.md#项目索引)。
