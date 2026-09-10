const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const project=path.resolve(__dirname,'../..');
const dist=path.join(project,'app/dist');
const context={window:{}};vm.createContext(context);
for(const file of ['inventory.js','content.js','catalog.js','evidence.js'])vm.runInContext(fs.readFileSync(path.join(dist,file),'utf8'),context);
const {MARKETING_INVENTORY:inventory,MARKETING_CONTENT:content,MARKETING_CATALOG:catalog,MARKETING_EVIDENCE:evidence}=context.window;
const upstream=`https://github.com/coreyhaines31/marketingskills/blob/${inventory.commit}/`;
let html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
const start='<!-- HANDBOOK:START -->',end='<!-- HANDBOOK:END -->';
const handbook=fs.readFileSync(path.join(project,'app/handbook.html'),'utf8');
if(html.includes(start))html=html.slice(0,html.indexOf(start))+start+'\n'+handbook+'\n'+html.slice(html.indexOf(end));
else html=html.replace('    <section class="section application">',`    ${start}\n${handbook}\n${end}\n    <section class="section application">`);
html=html.replace(/\s*<section class="section application">[\s\S]*?<\/section>/,'');
html=html.replace('05 / 证据与边界','09 / 证据与边界');
fs.writeFileSync(path.join(dist,'index.html'),html);
let md=`# Marketing Skills · 50 个技能中文手册\n\n固定提交：${inventory.commit}。每项的输入、方法与产物为源码归纳；验收与协作顺序为本地实践建议，不是强制运行契约。未实测全部技能。\n\n`;
for(const group of content.groups){
 md+=`## ${group.title}\n\n${group.goal}。\n\n`;
 for(const [name,title]of Object.entries(group.skills)){
  const card=catalog[name]; const skill=inventory.skills.find(s=>s.name===name);
  md+=`### ${title} / ${name}\n\n版本 ${skill.version} · [固定源码](${upstream}skills/${name}/SKILL.md)\n\n`;
  for(const [label,key]of [['适用任务','when'],['准备输入','input'],['主要方法','method'],['典型产物','output'],['本地验收提示','check']])md+=`- **${label}**：${card[key]}\n`;
  md+=`- **本地协作建议**：${card.related.map(n=>`[${n}](${upstream}skills/${n}/SKILL.md)`).join(' → ')}\n\n`;
 }
}
md+='## 工具指南目录\n\n以下是固定版本上游登记，不代表已经连接或当前接口已验证。◆ 表示上游赞助伙伴。\n\n| 指南 | 类别 | 上游登记方式 | 本库脚本 |\n| --- | --- | --- | --- |\n';
for(const tool of evidence.guides){const r=tool.registry;md+=`| [${r?.partner?'◆ ':''}${tool.name}](${upstream}${tool.source}) | ${r?.category||'未登记'} | ${['api','mcp','cli','sdk'].filter(k=>r?.[k]).map(k=>k.toUpperCase()).join(' / ')||'无标记'} | ${r?.bundledCli?`[文件](${upstream}tools/${r.bundledCli})`:'没有本库链接'} |\n`;}
md+='\n## 本库脚本目录\n\n环境变量为名称，不含凭据值。预览标记仅为静态源码检测，GA4 的三个离线路径另有测试。\n\n| 脚本 | 环境变量 | 检测到 dry-run 分支 |\n| --- | --- | --- |\n';
for(const cli of evidence.clis)md+=`| [${cli.name}](${upstream}${cli.source}) | ${cli.environmentVariables.join(' / ')||'未提取到'} | ${cli.hasDryRunBranch?'是':'否'} |\n`;
fs.writeFileSync(path.join(project,'catalog.md'),md);
fs.writeFileSync(path.join(dist,'catalog.md'),md);
console.log('已生成静态上手手册、50 技能中文手册及 95 指南 / 64 脚本目录。');
