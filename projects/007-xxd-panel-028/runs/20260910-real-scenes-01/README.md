# 四个真实摄影场景 · XXD Panel 028 执行记录

[返回项目](../../README.md) · [摄影来源](../../assets/real-inputs/README.md) · [固定上游快照](../../vendor/README.md)

## 本次做了什么

使用真实公开摄影输入，在固定版本 `3194d43ba95edbad0082b3604959e45067f72b7e` 的 XXD Panel 028 Skill 下完成四组生成。每组首次生成一次，按验收发现的失败约束重试一次，共 8 次图像调用；全部实际输出保留。没有用上游双联成品当输入，没有先生成假照片，没有通过代码拼贴或改画最终图片。

本次走的是上游 SKILL.md 明确规定的“宿主 Agent + 内置 imagegen 工具”路径。图像模型是这个库的执行依赖；没有运行仅在内置工具不可用时才用的 configured_imagegen.py。没有脱离原库另外编写审美方案。不能把“使用库”误解为不需要图像模型。

## 执行依据

1. 原样保存上游 SKILL.md、中文原始提示词、参考规范和脚本，并保留许可证。
2. 从原始文件逐次读取审美正文，只去掉首行管理标题。提取 SKILL.md 的公共交付块、唯一选定模式块与无文字块，只代入本次画布。
3. 每张请求仅提供该张原始摄影作为参考，不传上游样张、不借用其他任务或旧结果。
4. 首轮失败时保留整个原请求，仅追加对具体失败约束的重申。每组只重试一次，符合原库重试上限。
5. 已逐一核对 8 个实际传给图像工具的提示词字符串，与保存的提示词文件完全相同。每份记录包含输入、提示词和输出的 SHA-256。
6. 图像文件按工具返回内容原样复制；未缩放、裁切、拼版或放大。视觉验收与实际像素分别记录。

准备脚本 [prepare-real-demo.cjs](../../app/scripts/prepare-real-demo.cjs) 只编译原库提示词和交付参数，不生成图片。重试脚本 [prepare-demo-retry.cjs](../../app/scripts/prepare-demo-retry.cjs) 只追加失败约束；图片由宿主实际调用内置 imagegen 工具生成。最终画面仍可能违反提示词，这也是本次实测要保留的事实。

## 结果概览

| 场景 | 请求 | 主展示 | 结论 |
| :--- | :--- | :--- | :--- |
| 咖啡桌面 | 左右双联，1536×1024，无文字 | 第 2 次，1536×1024 | 主要交付要求通过；仍补了一只原图没有的小花瓶 |
| 航天员肖像 | 纯设计图，1536×2048，无文字 | 第 2 次，1086×1448 | 修正首轮错误的双联模式；像素尺寸未达标 |
| 火箭设施 | 上下双联，1536×2048，无文字 | 第 2 次，1086×1448 | 布局与无文字通过；像素尺寸未达标 |
| 宠物特写 | 纯设计图，1024×1024，无文字 | 第 1 次，1254×1254 | 首轮模式正确但补出较多物件；重试又错误变为双联，尺寸两轮均未达标 |

四组均有真实生成结果，但不能宣称四组全部通过原定交付契约。咖啡主要要求通过，另外三组存在尺寸或模式偏差。为忠实记录通道表现，没有放大图片伪装满足指定分辨率。未实测四端壁纸、准确文字和目录中断恢复；费用未由工具提供，未编造速度或成本比较。

## 原图、成品与提示词

### 咖啡桌面

[原始摄影](../../assets/real-inputs/coffee.png) · [首轮生成](../../assets/generated/20260910-real-scenes-01/source-001-coffee-left-right-3x2-1536x1024-attempt-1.png) · [重试／主展示](../../assets/generated/20260910-real-scenes-01/source-001-coffee-left-right-3x2-1536x1024-attempt-2.png) · [首轮提示词](prompts/coffee.txt) · [重试提示词](prompts/coffee-retry.txt) · [完整记录](coffee.json)

### 航天员肖像

[原始摄影](../../assets/real-inputs/astronaut.png) · [首轮失败](../../assets/generated/20260910-real-scenes-01/source-002-astronaut-design-only-3x4-1086x1448-attempt-1.png) · [重试／主展示](../../assets/generated/20260910-real-scenes-01/source-002-astronaut-design-only-3x4-1086x1448-attempt-2.png) · [首轮提示词](prompts/astronaut.txt) · [重试提示词](prompts/astronaut-retry.txt) · [完整记录](astronaut.json)

### 火箭设施

[原始摄影](../../assets/real-inputs/rocket.jpg) · [首轮生成](../../assets/generated/20260910-real-scenes-01/source-003-rocket-top-bottom-3x4-1086x1448-attempt-1.png) · [重试／主展示](../../assets/generated/20260910-real-scenes-01/source-003-rocket-top-bottom-3x4-1086x1448-attempt-2.png) · [首轮提示词](prompts/rocket.txt) · [重试提示词](prompts/rocket-retry.txt) · [完整记录](rocket.json)

### 宠物特写

[原始摄影](../../assets/real-inputs/chelsea.png) · [首轮／主展示](../../assets/generated/20260910-real-scenes-01/source-004-chelsea-design-only-1x1-1254x1254-attempt-1.png) · [重试失败](../../assets/generated/20260910-real-scenes-01/source-004-chelsea-design-only-1x1-1254x1254-attempt-2.png) · [首轮提示词](prompts/chelsea.txt) · [重试提示词](prompts/chelsea-retry.txt) · [完整记录](chelsea.json)

## 从结果得到的判断

- 库的风格规则确实能组织出可辨识的纸上微缩表达，但生成结果还会补出原图没有的身体、道具或设施。
- 原始审美文中旧的上下双联容器，与后置纯设计模式之间存在执行冲突的实际风险。航天员首轮和宠物重试均出现模式偏离。
- “无文字”可通过针对性重试改善；本次由 Agent 视觉检查，没有 OCR 量化分数。
- 本次内置通道未稳定遵从提示词里的准确像素。输出比例成立，不代表准确分辨率成立。
- 重试不保证单调改善：宠物重试减少配件，同时破坏了模式要求。因此两轮输出都必须保留。
- 以上是四张输入、一个宿主通道的小规模观察，不能推导所有模型或所有照片的成功率。

## 检查命令

在子项目目录执行：

```text
node app/scripts/check-real-demos.cjs
node app/scripts/build.cjs
node app/scripts/check.cjs
```

这些检查验证证据一致性与静态展示，不会重新调用模型，也不把质量偏差转成“通过”。已生成文件需要重新试验时，应使用新的任务目录，不覆盖本次证据。
