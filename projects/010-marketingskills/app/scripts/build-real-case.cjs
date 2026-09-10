const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const project = path.resolve(__dirname,'../..');
const root = path.resolve(project,'../..');
const run = path.join(project,'runs/product-positioning');
const dist = path.join(project,'app/dist');
for (const file of ['capabilities-flow.png','capabilities-flow.svg']) fs.copyFileSync(path.join(project,'assets',file),path.join(dist,file));
fs.copyFileSync(path.join(project,'scope.md'),path.join(dist,'scope.md'));
const sha = '5b2c0007766c6a1cf1d53fd8fc73e979e0821022';
const steps = [
  ['product-marketing','.agents/product-marketing.md','明确定位','仓库索引、Graphify 说明与实际回执','按十二类信息形成共享背景；把事实与受众假设分开','先做任务实践包，以陌生代码库上手作为首个入口'],
  ['offers','02-offer.md','定义交付','产品背景 0.1、现有证据','按四个价值因素与六个交付组成部分检查方案','提供范围、证据、核验步骤与结果回执；价格待验证'],
  ['copywriting','03-copy.md','做出入口','共享背景、交付方案、运行证据','围绕一页的主要行动写文案，给出备选与编辑理由','主行动落为可运行的任务单生成器'],
  ['analytics','04-validation.md','定义成功','页面行动、交付验收条件','从要做的决策反推事件、分母和证据要求','下载不算完成；用真实任务回执判断价值'],
  ['marketing-loops','05-loop.md','推动下一步','验证计划、真实反馈文件','明确九项循环要素并保存去重状态','无新反馈不生成客户结论；新反馈只产生待审建议']
];
function copy(from,to){fs.mkdirSync(path.dirname(to),{recursive:true});fs.copyFileSync(from,to);}
if(process.argv[2]) {
  const upstream = path.resolve(process.argv[2]);
  if(cp.execFileSync('git',['-C',upstream,'rev-parse','HEAD'],{encoding:'utf8'}).trim()!==sha) throw Error('上游版本不匹配');
  for(const [name] of steps) copy(path.join(upstream,'skills',name,'SKILL.md'),path.join(run,'upstream',name,'SKILL.md'));
  for(const [name,file] of [['offers','offer-anatomy.md'],['marketing-loops','loop-template.md'],['marketing-loops','loop-state.md']]) copy(path.join(upstream,'skills',name,'references',file),path.join(run,'upstream',name,'references',file));
  copy(path.join(upstream,'LICENSE'),path.join(run,'upstream/LICENSE'));
  for(const [from,to] of [['README.md','research-index.md'],['projects/009-graphify/README.md','graphify-readme.md'],['projects/009-graphify/app/dist/native/fastapi/receipt.json','fastapi-receipt.json']]) copy(path.join(root,from),path.join(run,'inputs',to));
}
for(const [name] of steps) {
  const file = fs.readFileSync(path.join(run,'upstream',name,'SKILL.md'));
  const expected = JSON.parse(fs.readFileSync(path.join(project,'sources/inventory.json'),'utf8')).skills.find(s=>s.name===name);
  const actual = crypto.createHash('sha256').update(file).digest('hex');
  if(expected.sha256 !== actual) throw Error('技能快照哈希不同：'+name);
}
const receipt = JSON.parse(fs.readFileSync(path.join(run,'inputs/fastapi-receipt.json'),'utf8'));
const files = [];
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})) {const full=path.join(dir,item.name); if(item.isDirectory()) walk(full);else if(item.name!=='manifest.json') files.push({path:path.relative(run,full).replaceAll('\\','/'),sha256:crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex')});}}
walk(run);
files.sort((a,b)=>a.path<b.path?-1:a.path>b.path?1:0);
for(const f of files){
  f.publicPath=f.path.replace(/^\.agents\//,'context/');
  let raw=fs.readFileSync(path.join(run,f.path));
  if(f.path==='README.md')raw=Buffer.from(raw.toString('utf8').replaceAll('](.agents/','](context/'));
  f.publicSha256=crypto.createHash('sha256').update(raw).digest('hex');
  const target=path.join(dist,'real-case',f.publicPath);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,raw);
}
const manifest = {upstream:'https://github.com/coreyhaines31/marketingskills',commit:sha,executor:'本任务中的 Agent 读取原文后逐步产出；非上游 CLI 或自主工作流引擎',status:'定位草案；业务验证尚无反馈',files};
fs.writeFileSync(path.join(run,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
fs.copyFileSync(path.join(run,'manifest.json'),path.join(dist,'real-case/manifest.json'));
const data={sha,receipt:{files:receipt.files,nodes:receipt.nodes,edges:receipt.edges,communities:receipt.communities,confidence:receipt.confidence,commit:receipt.commit,graphifyCommit:receipt.graphifyCommit,scope:receipt.scope},steps:steps.map(([skill,file,title,input,method,decision])=>({skill,file:file.replace(/^\.agents\//,'context/'),title,input,method,decision,output:fs.readFileSync(path.join(run,file),'utf8')}))};
fs.writeFileSync(path.join(dist,'real-case-data.js'),'window.REAL_CASE = '+JSON.stringify(data,null,2)+';\n');
console.log('已构建真实应用场景：5 份技能原文、5 份产物、输入快照与 SHA-256 清单。');
