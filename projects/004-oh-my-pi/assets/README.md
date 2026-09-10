# 项目引导图

[返回项目介绍](../README.md)

本目录保存本次讨论最后确认的模块流程图。节点、文字与关系沿用用户指定的图，仅固定渲染字体、间距和主题，便于 GitHub 阅读。

| 文件 | 用途与来源 |
| :--- | :--- |
| [guide.mmd](guide.mmd) | 唯一图形内容源；2026-09-10 讨论确认的 Mermaid 图 |
| [guide.svg](guide.svg) | 由源文件渲染的矢量图，可放大；不是软件截图 |
| [guide.png](guide.png) | 同一源文件渲染的 PNG，用于项目介绍与根 README 预览 |
| [mermaid-config.json](mermaid-config.json) | 字体、主题与布局设置 |

## 图中含义

- Pi → OMP：代码来源与能力完善关系。
- 大模型 ↔ OMP：模型提供思考与方案，OMP 组织任务并反馈代码和执行结果。
- 三组内部模块：开发工具、任务管理、接入与扩展。
- 项目工作 → 实际结果 → OMP：执行反馈循环。
- “类似 Codex CLI”表示产品类别，不表示从 Codex 派生或功能完全相同。

该图是原创理解示意图，非上游界面或实测截图。模块表示可用能力类别，不意味着全部默认启用。能力依据与局限见[研究笔记](../notes.md)。

## 重新渲染

使用 Mermaid CLI `11.12.0` 和可用的 Chromium 浏览器，从本项目目录执行：

```powershell
npx --yes --package @mermaid-js/mermaid-cli@11.12.0 mmdc -i assets/guide.mmd -o assets/guide.svg -c assets/mermaid-config.json -b white -w 2000
npx --yes --package @mermaid-js/mermaid-cli@11.12.0 mmdc -i assets/guide.mmd -o assets/guide.png -c assets/mermaid-config.json -b white -w 2000 -s 2
```

本次使用本机 Chrome 渲染。若使用已安装浏览器，可通过 `PUPPETEER_EXECUTABLE_PATH` 指定其可执行文件；机器路径不写入共享配置。需要系统中有中文字体，渲染后检查文字、连线和裁切。
