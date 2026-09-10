# 实验记录：研究收录检查器

[项目介绍](README.md) · [完整理解](research.md) · [技能目录](skills.md)

## 版本与环境

固定上游提交 `71f6048e8ada25180e61438abc1d98cb151fe9a7`，MIT。本地 Windows、Node v22.15.0、Python 3.10，浏览器使用宿主预装 Playwright / Chromium。没有 Bun 全量环境，未安装上游全量技能或注册其全局配置。

目录扫描与模板保存是资料处理，不是技能执行。中文方法实践由当前 Agent 在现有授权与工具环境中完成；未完整执行上游问答门槛和全局前置步骤。

## 阶段产物

| 阶段 | 上游方法 | 本次产物 | 执行范围 |
| --- | --- | --- | --- |
| 1 | office-hours | [需求设计](app/dist/evidence/01-design.md) | 仓库事实与方案比较；没有虚构访谈 |
| 2 | plan-ceo-review | [范围](app/dist/evidence/02-scope.md) | 采用 Hold Scope 思路 |
| 3 | plan-eng-review | [工程与测试计划](app/dist/evidence/03-engineering.md) | 数据流、边界与断言 |
| 4 | plan-design-review | [交互状态](app/dist/evidence/04-design-review.md) | 输入、结果、异常与响应式 |
| 5 | 当前宿主实现 | [校验函数](app/dist/validator.js) | 实际编码；没有虚构 /build 技能 |
| 6 | review | [实际缺陷与修复](app/dist/evidence/05-review.md) | 当前 Agent 检查，未启动独立模型 |
| 7 | qa | [浏览器验收说明](app/dist/evidence/06-qa.md) | 实际 Playwright 替代上游浏览器 |
| 8 | document-release | [说明同步](app/dist/evidence/07-documentation.md) | 原库与本地能力分开 |
| 9 | ship 的局部方法 | [交付状态](app/dist/evidence/08-delivery.md) | 本地检查，未执行上游发布动作 |

## 实际失败与修复

初版执行 20 项规则测试全部通过。后续源码审查发现 upstreamKey 把 URL 中间的空路径段过滤掉，导致双斜杠地址被错误接受。添加第 21 条回归断言后实际失败。

保留[失败结果](app/dist/evidence/tests-before.json)和[初版源码](app/dist/evidence/validator-before.txt)。修复后同一集合[21/21 通过](app/dist/evidence/tests.json)。本次是真实发现，未预先植入，也不是有无技能的受控效率实验。

## 浏览器验证

[browser.json](app/dist/evidence/browser.json) 包含 17 项实际检查且全部通过。覆盖全部技能详情、搜索分类、方法范围过滤、场景产物读取、输入修改、JSON 解析、HTML 文本、窄屏、放大、键盘与控制台。

四张实际截图由该次运行生成；已查看首页和窄屏检查器，未见页面横向溢出。教学数据与实际运行证据分别标注。见[图片来源](assets/README.md)。

## 文件证据

规则报告记录校验函数、样例和测试脚本 SHA-256；浏览器报告记录页面及运行脚本的 SHA-256。检查程序拒绝将过期记录用于当前文件。这是本地新增记录机制，不是上游 gstack-evidence 的输出。

目录包含 57 项中文解读和 103 份原文来源指纹。check.cjs 检查唯一性、字段、来源、脚本语法、引用和阶段文档。

## 未验证

全量原生安装、多宿主等价性、上游 hook、独立模型质量、iOS、远程配对、外部记忆、生产交付及成本效率。发布本网页与复现上游发布技能是两回事，部署状态单独核对。

## 2026-09-11 · 一张图汇总技能能力

新增原创能力图，按 12 类逐项说明全部 57 个技能的作用与产物，附研发流程、共用实现原理、本地案例证据、边界和扩展方向。版本与现有研究目录一致，生成时检查 57 项无遗漏，输出 2400 × 3936 PNG 和可缩放 SVG。

已加入网页首页的展开面板和高清下载入口，同步项目与总索引预览及部署清单图片说明。现有浏览器检查重新运行 17/17 通过，静态与证据指纹检查通过；另实际打开能力图，确认 390px 窄屏无横向溢出、图片完整解码，PNG 与 SVG 请求均返回 200。图中数字沿用真实案例，未把制图行为记作上游 /diagram 的原生执行。

## 2026-09-11 · 范围摘要、提交与网页发布

补充 12 类范围、每类能力与产物、工作原理、场景及本地边界，同步项目摘要、总索引与网页。新站随统一 Pages 清单合并发布，142 项线上资源核验通过，另 5 项实际线上交互检查通过。完整记录见 [发布资源验证](deployment-verification.json) 与 [线上浏览器验证](deployment-browser.json)。部署是本研究网页的发布，不改变上游技能方法适配的执行口径。
