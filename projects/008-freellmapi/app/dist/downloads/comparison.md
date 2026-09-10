# 同类产品：模型网关如何分工

[项目介绍](README.md) · [我们的理解](understanding.md) · [架构详解](architecture.md)

比较日期：2026-09-10。FreeLLMAPI 依据固定提交 `83562ad` 的文档与关键源码；其他产品依据下列官方文档。未进行统一压测或功能复现，托管方案和企业功能以实际版本与计划为准。

## 共同架构

**应用 / Agent → 统一接口 → 路由与协议适配 → 实际模型 → 统一返回。**

差异主要是路由目标、资源管理范围、部署方式及运维责任。产品都能提供某些路由能力，并不意味着它们针对免费额度、企业预算或任务质量使用相同算法。

## 产品总览

| 产品 | 主要目标 | 路由与管理机制 | 部署与使用侧重点 |
| --- | --- | --- | --- |
| [FreeLLMAPI](https://github.com/tashfeenahmed/freellmapi) | 利用个人模型资源与免费额度 | 能力筛选、动态评分、额度跟踪、冷却和失败回退 | 自托管；个人实验优先，单用户设计 |
| [LiteLLM](https://docs.litellm.ai/docs/proxy/quick_start) | 通用模型接入与团队共享网关 | 多部署负载均衡、限流感知、延迟 / 成本策略、虚拟密钥与预算 | 可自托管；需要管理配置、运行状态和依赖；部分企业治理另分版本 |
| [New API](https://github.com/QuantumNous/new-api) | 模型渠道、用户配额与费用管理 | 渠道加权选择、失败重试、用户与令牌分组、模型限制及费用核算 | 可自托管；重点是渠道和使用者的管理 |
| [Portkey](https://portkey.ai/docs/product/ai-gateway) | 网关策略与应用运行管理 | 条件路由、负载均衡、可组合回退、缓存与观察能力 | 有开源网关、托管与企业部署；不能将商业管理平台等同于开源包 |
| [Bifrost](https://docs.getbifrost.ai/providers/provider-routing) | 注重性能和治理的模型网关 | 虚拟密钥规则、加权路由与回退；企业版提供实时表现驱动的自适应均衡 | 开源网关与企业功能分别核对；性能优势需在我们的负载上验证 |
| [OpenRouter](https://openrouter.ai/docs/guides/routing/provider-selection) | 托管模型聚合与调用 | 同模型供应商选择、供应商回退、跨模型回退，支持自带供应商密钥 | 直接使用托管入口，减少自建网关工作；依赖平台规则与可用路线 |
| [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/) | 云端模型调用与路由管理 | 可视化 / JSON 条件流程、预算与限流节点、流量分配、回退和版本管理 | 托管；可自带密钥，也有统一账单路径，凭证选择有具体规则 |

## 三个需要分清的问题

### 上游额度与下游预算

“这个模型密钥还能调用多少”属于上游资源可用性；“这个用户或项目允许花多少”属于下游使用治理。

FreeLLMAPI 的特色在于前者。LiteLLM 通过虚拟密钥与预算管理使用者；New API 包含用户、令牌分组及费用核算。它们可以同时管理上下游，但不能把用户预算误认为供应商真实剩余配额。[LiteLLM 虚拟密钥](https://docs.litellm.ai/docs/proxy/virtual_keys) · [New API 功能](https://github.com/QuantumNous/new-api)

### 故障切换与任务质量

固定优先级决定先尝试谁；限流感知决定谁当前可调用；延迟与成本策略决定谁更快或更省。要判断“谁更可能正确完成代码修改”，还需要任务评测数据。

FreeLLMAPI 的可靠性评分主要依据调用成功与失败，能力轴来自目录等级。不能把“智能路由”直接理解为任务正确性保证。LiteLLM 文档列有加权、限流感知、延迟、繁忙程度和成本等不同策略；具体应按目标选择。[LiteLLM 路由](https://docs.litellm.ai/docs/routing) · [FreeLLMAPI 评分源码](https://github.com/tashfeenahmed/freellmapi/blob/83562ad360a65d80b6319297fee4cd47dc5a2ff3/server/src/services/scoring.ts)

### 网关软件与托管聚合服务

自托管网关要求我们维护服务、凭证、配置与故障排查。托管服务减少部署工作，但请求经过对应平台，模型供应、账单与控制范围受该平台约束。

OpenRouter 支持供应商路由和跨模型回退。Cloudflare 的统一账单还提供平台管理凭证的调用路径，并与请求自带凭证、已存 BYOK 密钥存在优先关系。不能假设所有产品都要求用户逐个申请供应商密钥，也不能假设网关费包含全部模型费用。[OpenRouter 模型回退](https://openrouter.ai/docs/guides/routing/model-fallbacks) · [Cloudflare 统一账单](https://developers.cloudflare.com/ai-gateway/features/unified-billing/)

## 深一层的架构差异

| 观察点 | FreeLLMAPI | 对照产品的研究价值 |
| --- | --- | --- |
| 核心状态 | 单用户配置、SQLite 与内存状态 | LiteLLM 的共享冷却与用量可使用 Redis；需要研究多实例一致性 |
| 规则组合 | profiles、模型分组、评分与失败循环 | Portkey 的回退目标可以组合条件路由、均衡或其他回退，适合研究策略组织 |
| 动态优化 | 调用表现、目录能力与额度保护系数 | Bifrost 的企业自适应均衡同时考虑供应商与密钥层，不能按开源默认能力比较 |
| 配置发布 | 本地管理和模型目录同步 | Cloudflare 路由具有版本、草稿、部署和回滚，适合研究策略发布控制 |
| 模型身份 | 自动链可能跨模型；统一分组限制组内回退 | OpenRouter 区分同一模型的供应商选路与不同模型的 fallback 列表 |

来源：[LiteLLM 路由](https://docs.litellm.ai/docs/routing)、[Portkey 回退组合](https://portkey.ai/docs/product/ai-gateway/fallbacks)、[Bifrost 路由与版本边界](https://docs.getbifrost.ai/providers/provider-routing)、[Cloudflare 动态路由](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/)、[OpenRouter 供应商选择](https://openrouter.ai/docs/guides/routing/provider-selection)。

## 对我们的选型建议

以下是基于文档的研究建议，不是已经完成的选型结论。

| 我们的问题 | 优先对照 | 为什么 |
| --- | --- | --- |
| 怎样减少个人实验的额度中断？ | FreeLLMAPI | 已有研究可直接深化额度与回退实验 |
| 怎样为多个 Agent 提供共享模型入口？ | LiteLLM | 研究多部署路由、虚拟密钥、预算与共享状态 |
| 怎样管理不同用户和模型渠道？ | New API | 用户、令牌、渠道和费用管理比较直接 |
| 怎样减少基础设施维护？ | OpenRouter | 用托管服务对比接入成本与可控性 |
| 怎样设计生产策略与管理？ | Portkey / Bifrost / Cloudflare | 分别学习规则组合、性能治理和路由版本发布 |

第一轮建议用相同模型和任务对比 FreeLLMAPI 与 LiteLLM。记录任务通过率、重试、总耗时、模型调用费用和人工返工。第二轮再加入托管入口，并明确额外代理层和计费差异。不要仅比较供应商数量、宣传吞吐量或单次请求价格。

## 来源与限制

- 本文链接指向官方产品文档或官方仓库，访问记录日期为 2026-09-10；动态页面可能改变。
- [Portkey 版本比较](https://portkey.ai/docs/product/product-feature-comparison)说明开源、托管和企业能力范围不同；本研究不把完整平台能力归到免费开源网关。
- [Bifrost 自适应均衡](https://docs.getbifrost.ai/enterprise/adaptive-load-balancing)为企业功能；不引用官方性能宣传作为本地验证结果。
- 各产品对流式请求、工具调用、结构化输出、重试和计费的细节仍需分别验证。
