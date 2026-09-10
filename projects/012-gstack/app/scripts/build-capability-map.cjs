/* Original research diagram; source catalog is pinned to the recorded upstream commit. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const app=path.resolve(__dirname,'..'),ctx={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(app,'dist/catalog.js'),'utf8'),ctx);
const catalog=ctx.window.GSTACK_CATALOG;
const rows={
'office-hours':'探索需求 → 设计文档与备选方案',
'plan-ceo-review':'审视产品范围 → 价值与取舍结论',
'plan-eng-review':'检查工程方案 → 架构与测试矩阵',
'plan-design-review':'评审界面方案 → 层级与状态修订',
'plan-devex-review':'规划开发者体验 → 上手路径与基线',
'autoplan':'串联多类评审 → 整合后的计划',
'spec':'细化需求 → 可验收规格或工作项',
'design-consultation':'建立设计规范 → DESIGN.md 与预览',
'design-shotgun':'比较视觉方向 → 变体与选定方案',
'design-html':'实现已选设计 → HTML/CSS 页面',
'design-review':'审查实际页面 → 修复与前后截图',
'diagram':'绘制结构关系 → 可编辑图与图片',
'review':'审查代码变更 → 发现、修复与记录',
'investigate':'验证根因假设 → 原因与复测结果',
'qa':'操作页面并修复 → QA 报告与回归',
'qa-only':'只测试和报告 → 问题及复现证据',
'cso':'检查攻击面 → 安全发现与建议',
'health':'运行已有质量工具 → 状态与趋势',
'benchmark':'测量页面性能 → 基线与差异报告',
'benchmark-models':'对比模型执行 → 质量、耗时与成本',
'devex-review':'实走开发者旅程 → 阻力与耗时记录',
'browse':'观察并操作页面 → 快照与交互证据',
'open-gstack-browser':'打开可见浏览器 → 可观察的会话',
'scrape':'只读提取网页 → 结构化 JSON',
'setup-browser-cookies':'导入选定登录态 → 可认证会话',
'pair-agent':'配对远程 Agent → 受控会话入口',
'skillify':'固化成功提取 → 脚本、夹具与测试',
'hackernews-frontpage':'执行 HN 提取示例 → 首页文章数据',
'ship':'准备提交与 PR → 变更及验证记录',
'land-and-deploy':'合并部署并验证 → 发布结果与证据',
'setup-deploy':'登记部署信息 → 后续交付配置',
'canary':'短期观察部署 → 健康与异常报告',
'landing-report':'盘点交付队列 → 版本与候选快照',
'document-generate':'从代码整理知识 → 教程与参考文档',
'document-release':'对齐代码变更 → 更新说明与文档债',
'make-pdf':'排版并导出文档 → PDF 与源文件',
'retro':'回顾工程活动 → 复盘与趋势记录',
'learn':'整理项目经验 → 可复用经验条目',
'context-save':'保存任务进展 → 上下文快照',
'context-restore':'加载历史快照 → 恢复背景与下一步',
'plan-tune':'调整提问方式 → 偏好与观察记录',
'setup-gbrain':'接入外部记忆 → 可调用的连接',
'sync-gbrain':'同步代码上下文 → 新索引与搜索指导',
'careful':'检查危险命令 → 提醒或特定拒绝',
'freeze':'限定编辑目录 → 会话修改边界',
'guard':'组合命令与路径检查 → 保护会话',
'unfreeze':'清除目录限制 → 恢复编辑范围',
'ios-qa':'在真机上测试 → QA 与状态证据',
'ios-fix':'修复真机缺陷 → 夹具与复测记录',
'ios-design-review':'检查真机视觉 → iOS 设计报告',
'ios-sync':'同步调试桥 → 更新后的桥接代码',
'ios-clean':'移除调试桥 → 清理与验证结果',
'codex':'调用 Codex 第二意见 → 审查或答复',
'claude':'调用 Claude 第二意见 → 审查或答复',
'gstack':'识别任务类型 → 适合的技能入口',
'gstack-upgrade':'更新已有安装 → 新版本与变更摘要',
'add-host':'贡献新宿主适配 → 配置与生成技能'
};
const groups=[
['规划','01','需求与计划','把模糊目标推进到有范围、可验收的方案。'],
['设计','02','设计与页面','把视觉方向推进到可预览、可检查的界面。'],
['质量','03','评审、排障与测试','把“感觉没问题”推进到有发现、有复测的结论。'],
['浏览器','04','浏览器与网页数据','获得页面事实，执行交互，并固化已成功的提取。'],
['交付','05','交付与部署','把变更推进到可提交、可发布、可观察的状态。'],
['文档','06','文档与知识表达','让使用者能理解、使用和跟上当前代码。'],
['记忆','07','复盘与上下文','保留经验与任务背景，减少重复解释和探索。'],
['保护','08','会话操作保护','为已接入的命令与编辑工具增加明确检查。'],
['iOS','09','iOS 真机工作流','将测试、修复和视觉检查延伸到移动端真机。'],
['协作','10','跨模型第二意见','对同一问题取得外部审查或咨询结果。'],
['入口','11','任务路由','把用户目标分配给合适的工作方法。'],
['维护','12','安装与宿主扩展','维护技能版本，并接入新的运行宿主。']
];
const ids=catalog.skills.map(s=>s.id);
if(ids.length!==57||new Set(ids).size!==57||Object.keys(rows).length!==57||ids.some(id=>!rows[id]))throw Error('Diagram/catalog coverage differs');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
let out=[];const text=(x,y,t,size=28,fill='#173249',weight=400,extra='')=>out.push(`<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" ${extra}>${esc(t)}</text>`);
const rect=(x,y,w,h,fill,r=18,stroke='none')=>out.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`);
rect(0,0,2400,440,'#102537',0);
text(72,65,'GSTACK / SKILL CAPABILITY ATLAS',24,'#b9d1e4',600);
text(72,152,'57 个技能，一张图看懂能力与效果',66,'#ffffff',700);
text(72,208,'把软件研发经验写成可执行的工作方法：模型判断，工具行动，证据验收。',32,'#d4e1ec');
const flow=['需求与计划','设计与实现','评审与测试','交付与观察','文档与复盘'];
flow.forEach((t,i)=>{const x=72+i*459;rect(x,253,422,78,i===0?'#c2f362':'#243e51',12);text(x+211,303,t,31,i===0?'#173249':'#ffffff',600,'text-anchor="middle"');if(i<4)text(x+433,303,'→',30,'#91b7d2');});
text(72,391,'阅读方式：技能名  /  做什么 → 可获得的产物或结果',28,'#d4e1ec');
text(2328,391,'12 类能力 · 57 项独立定义',26,'#c2f362',600,'text-anchor="end"');
rect(72,468,2256,122,'#e4eefb',16);
text(102,512,'内部原理',28,'#245ce5',700);
text(287,512,'SKILL.md 定义步骤与验收  →  宿主模型读取上下文  →  调用工具执行  →  对照结果继续或修正',28);
text(287,558,'配套代码：模板与宿主适配 · 浏览器运行时 · 命令/路径 hook · 证据记录。不同技能使用其中不同部分。',26,'#526b7f');
let y=622;
for(let p=0;p<groups.length;p+=2){
 const pair=groups.slice(p,p+2),max=Math.max(...pair.map(g=>catalog.skills.filter(s=>s.group===g[0]).length));
 const height=152+max*52;
 pair.forEach((g,col)=>{
  const x=72+col*1144,ss=catalog.skills.filter(s=>s.group===g[0]);
  rect(x,y,1112,height,'#ffffff',20,'#d9e3eb');rect(x+24,y+24,62,52,'#e4eefb',10);
  text(x+55,y+61,g[1],26,'#245ce5',700,'text-anchor="middle"');text(x+105,y+63,g[2],34,'#173249',700);
  text(x+1080,y+62,ss.length+' 项',25,'#657d90',500,'text-anchor="end"');
  text(x+28,y+111,g[3],25,'#61798b');
  ss.forEach((s,i)=>{const yy=y+156+i*52;
   if(i%2===0)rect(x+16,yy-31,1080,46,'#f5f8fb',7);
   text(x+30,yy,s.id,25,'#173249',600,'font-family="Consolas,monospace"');
   text(x+443,yy,rows[s.id],25,'#27475f');
  });
 });
 y+=height+24;
}
rect(72,y,2256,209,'#102537',20);
text(102,y+52,'对我们的意义：把团队经验变成可复用的方法，让产物可以交接、结果可以追溯。',33,'#ffffff',700);
text(102,y+105,'本次实际场景：研究项目收录检查器  ·  9 个阶段  ·  规则测试 21/21  ·  浏览器检查 17/17',29,'#c2f362',600);
text(102,y+151,'实际发现并修复 1 个 URL 边界问题，保留 20/21 → 21/21 的回归记录。',28,'#d4e1ec');
text(102,y+186,'方法适配执行 7 项，/ship 仅本地检查；这些数字属于本地案例，不代表 57 项上游技能均已原生实测。',25,'#d4e1ec');
y+=250;
text(72,y,'使用边界',27,'#245ce5',700);
text(242,y,'能力依赖模型、工具、账户与环境；产出报告不等于质量保证，保护 hook 也不等于完整沙箱。',27);
text(72,y+48,'扩展方向',27,'#245ce5',700);
text(242,y+48,'接入团队规范与验收清单 → 增加领域工具 → 固化成功工作流 → 用真实任务持续评测。',27);
text(72,y+106,'来源：garrytan/gstack · 固定提交 '+catalog.commit.slice(0,12)+' · package 1.84.1 · 2026-09-11 整理',23,'#61798b');
text(72,y+144,'口径：54 个一级技能 + 总路由 + 贡献者适配 + 浏览器示例；生成副本不重复计数。此图为本地研究图解，非上游截图。',23,'#61798b');
const H=y+188;
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="${H}" viewBox="0 0 2400 ${H}" role="img" aria-labelledby="title desc"><title id="title">gstack 57 项技能能力与效果总览</title><desc id="desc">按十二类逐项列出技能名称、作用和产物，并说明技术原理、本地案例证据、使用边界与扩展方向。</desc><rect width="2400" height="${H}" fill="#f1f5f9"/><g font-family="Microsoft YaHei, Noto Sans CJK SC, sans-serif">${out.join('\n')}</g></svg>`;
for(const dir of [path.join(app,'../assets'),path.join(app,'dist/assets')]){fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'skills-capability-map.svg'),svg);}
console.log(JSON.stringify({skills:ids.length,groups:groups.length,width:2400,height:H,commit:catalog.commit}));
