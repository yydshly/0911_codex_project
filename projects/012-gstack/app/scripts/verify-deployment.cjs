// Verify deployed static resources against the local assembled site.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../../../..'),project=path.join(root,'projects/012-gstack');
const base='https://yydshly.github.io/0911_codex_project/';
const [commit,runId]=process.argv.slice(2);
if(!/^[a-f0-9]{40}$/.test(commit||'')||!/^\d+$/.test(runId||''))throw Error('Pass full deployed commit and successful Pages run ID.');
const digest=b=>crypto.createHash('sha256').update(b).digest('hex');
const tasks=[];
function walk(dir){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,ent.name);if(ent.isDirectory())walk(f);else tasks.push({resource:path.relative(path.join(root,'_site'),f).replaceAll('\\','/'),local:f,mode:'exact-bytes'});}}
walk(path.join(root,'_site/012-gstack'));
tasks.push({resource:'index.html',local:path.join(root,'_site/index.html'),mode:'normalized-text'});
tasks.push({resource:'assets/012-gstack.png',local:path.join(root,'_site/assets/012-gstack.png'),mode:'exact-bytes'});
const manifest=JSON.parse(fs.readFileSync(path.join(root,'docs/web-demos.json'),'utf8'));
for(const p of manifest.projects)if(p.slug!=='012-gstack')tasks.push({resource:p.slug+'/',mode:'availability'});
const results=[];let next=0;
async function worker(){while(next<tasks.length){const t=tasks[next++],url=new URL(t.resource,base).href;try{
 const response=await fetch(url+'?verify='+commit,{signal:AbortSignal.timeout(45000)});
 const remote=Buffer.from(await response.arrayBuffer());
 if(response.status!==200)throw Error('HTTP '+response.status);
 const result={resource:t.resource,url,status:response.status,mode:t.mode,remoteSha256:digest(remote)};
 if(t.local){const local=fs.readFileSync(t.local);result.localSha256=digest(local);
  if(t.resource.endsWith('/evidence/site-check.json')){
   const a=JSON.parse(local),b=JSON.parse(remote);delete a.recordedAt;delete b.recordedAt;
   if(JSON.stringify(a)!==JSON.stringify(b))throw Error('CI check report differs beyond timestamp');
   result.mode='same-report-except-ci-timestamp';
  }else if(t.mode==='normalized-text'){
   if(local.toString('utf8').replace(/\r\n/g,'\n')!==remote.toString('utf8').replace(/\r\n/g,'\n'))throw Error('Text differs');
  }else if(!remote.equals(local))throw Error('Bytes differ');
 }else if(!remote.toString('utf8').includes('<html'))throw Error('Expected existing HTML page');
 result.passed=true;results.push(result);
 }catch(e){results.push({resource:t.resource,url,passed:false,error:e.message});}
}}
(async()=>{await Promise.all(Array.from({length:6},worker));results.sort((a,b)=>a.resource.localeCompare(b.resource));
 const report={kind:'actual-github-pages-verification',recordedAt:new Date().toISOString(),commit,workflowRun:'https://github.com/yydshly/0911_codex_project/actions/runs/'+runId,site:base+'012-gstack/',total:results.length,passed:results.filter(r=>r.passed).length,failed:results.filter(r=>!r.passed).length,scope:'All gstack static resources and root preview compared; CI report timestamp excluded; nine existing subsite entries checked for availability.',results};
 fs.writeFileSync(path.join(project,'deployment-verification.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({total:report.total,passed:report.passed,failed:report.failed,failures:results.filter(r=>!r.passed)},null,2));if(report.failed)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
