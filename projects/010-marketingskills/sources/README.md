# 研究来源与复制范围

[返回项目](../README.md)

上游：[coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)，固定提交 `5b2c0007766c6a1cf1d53fd8fc73e979e0821022`。

- [LICENSE](LICENSE)：原样保留上游 MIT 许可证，Copyright (c) 2025 Corey Haines。页面包含同份许可证副本。
- [inventory.json](inventory.json)：技能名称、自身版本、文件 SHA-256、插件版本与数量；来源是固定提交的实际文件。
- [evidence.json](evidence.json)：50 个技能的节标题与行号、有效参考资料链接、95 份工具指南与注册表标记、64 个脚本的环境变量名称、SHA-256 和预览分支静态检测。
- [upstream-ga4.js](upstream-ga4.js)：原样复制上游 `tools/clis/ga4.js`，仅用于阻断网络的离线预览测试，遵循上方 MIT 许可。校验值保存于 `evidence.json` 对应条目。

提取脚本不运行外部业务操作。测试只提供虚拟凭据并替换网络函数，没有配置真实账号或调用 GA4 服务。网页静态目录不包含测试用脚本。

中文阅读卡、协作与验收建议、教学场景及原理图为本地新增。工具能力标记为上游登记，未核实所有服务的当前连通性或平台规则。赞助标记不表示本地推荐或排名。

新增的[真实产品定位场景](../runs/product-positioning/README.md)保留五份原始 SKILL.md、三个实际读取的参考文件与 MIT 许可证。输入快照为本仓库既有资料，产物由当前 Agent 应用技能后形成。文件哈希与复制范围在场景目录内记录；原文部分相对参考链接未镜像，完整资料请回到固定上游提交阅读。浏览器任务入口和手动循环执行器为本地新增代码。
