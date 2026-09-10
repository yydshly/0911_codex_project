const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../../../..');
const project = path.resolve(__dirname, '../..');
const base = 'https://yydshly.github.io/0911_codex_project/';
const manifest = JSON.parse(fs.readFileSync(path.join(root,'docs/web-demos.json'),'utf8'));
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
(async()=>{
  const revision=process.argv[2],workflow=process.argv[3];
  assert.match(revision||'',/^[0-9a-f]{40}$/);
  assert.ok(workflow && workflow.startsWith('https://github.com/yydshly/0911_codex_project/actions/runs/'));
  const files=walk(path.join(project,'app/dist')).map(local=>({local,url:base+'015-browser-use/'+path.relative(path.join(project,'app/dist'),local).split(path.sep).join('/'),mode:'exact-bytes'}));
  files.push({local:path.join(root,'_site/index.html'),url:base,mode:'exact-bytes'});
  files.push({local:path.join(project,'assets/understanding-map.png'),url:base+'assets/015-browser-use.png',mode:'exact-bytes'});
  for(const p of manifest.projects)if(p.slug!=='015-browser-use')files.push({url:base+p.slug+'/',mode:'availability'});
  const results=[];
  for(let i=0;i<files.length;i+=5){
    const batch=await Promise.all(files.slice(i,i+5).map(async item=>{
      const response=await fetch(item.url,{signal:AbortSignal.timeout(30000),headers:{'Cache-Control':'no-cache'}});
      if(!response.ok)throw new Error(`${response.status}: ${item.url}`);
      const remote=Buffer.from(await response.arrayBuffer());
      const result={url:item.url,status:response.status,mode:item.mode,bytes:remote.length};
      if(item.local){result.sha256=hash(remote);assert.equal(result.sha256,hash(fs.readFileSync(item.local)),'线上内容不同：'+item.url);}
      return result;
    }));results.push(...batch);
  }
  const report={verifiedAt:new Date().toISOString(),sourceCommit:revision,workflow,site:base+'015-browser-use/',scope:'新站全部文件、总入口和预览图与本地构建逐字节一致；既有子站入口可访问。非上游 Agent 实测或浏览器交互 QA。',passed:results.length,results};
  if(!process.argv.includes('--check-only'))fs.writeFileSync(path.join(project,'deployment-verification.json'),JSON.stringify(report,null,2)+'\n');
  console.log(`线上核验 ${results.length} 项通过：${report.site}`);
})().catch(e=>{console.error(e);process.exitCode=1;});
