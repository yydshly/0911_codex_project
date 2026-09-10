# 固定上游执行快照

`xxd-panel-028/` 保存 nevertoday/xxd-panel-028 提交 `3194d43ba95edbad0082b3604959e45067f72b7e` 的原样文件：SKILL.md、LICENSE、README.md、agents/、references/、scripts/。通过该提交的 Git archive 提取，未修改内容；不包含上游效果样张，避免把样张误作为实测输入。

本次执行的入口是 [SKILL.md](xxd-panel-028/SKILL.md)。它明确规定：宿主暴露内置图像工具时，遵循 imagegen Skill，每个成品调用一次内置图像生成／编辑工具；仅在内置工具未暴露时使用 configured_imagegen.py 桥接。

因此本次采用原库的“宿主 Agent + 内置图像通道”路径。并未把原库当作独立图像模型，也没有声称运行其 API 桥接脚本。Python 文件保留用于来源核验，未在本次调用账号配置或接口。

本地的 `app/scripts/prepare-real-demo.cjs` 只从这个快照提取原文与交付块、代入明确参数、写入提示词与哈希记录；不包含自主审美提示词，不调用模型、不生成图片。实际生成由宿主按 Skill 执行，结果在 runs/ 中独立记录。

许可证：[PolyForm Noncommercial 1.0.0](xxd-panel-028/LICENSE)。原始提示词署名与来源遵循上游文档；本目录不改变原有授权范围。
