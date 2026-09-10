// Verify the published files against the local build; no browser automation.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../../..'),project=path.resolve(__dirname,'..');
const base='https://yydshly.github.io/0911_codex_project/';
const manifest=JSON.parse(fs.readFileSync(path.join(root,'docs/web-demos.json'),'utf8'));
const slug='014-gaussian-splatting',items=[];
function walk(dir,relative=''){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const name=relative+e.name,file=path.join(dir,e.name);if(e.isDirectory())walk(file,name+'/');else items.push({url:base+slug+'/'+name,file});}}
walk(path.join(__dirname,'dist'));
items.push({url:base,file:path.join(root,'_site/index.html')});
items.push({url:base+'assets/'+slug+'.png',file:path.join(project,'assets/core-understanding.png')});
for(const p of manifest.projects.filter(p=>p.slug!==slug))items.push({url:base+p.slug+'/',existingSite:true});
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
async function check(item){
  const response=await fetch(item.url,{signal:AbortSignal.timeout(30000)});
  if(response.status!==200)throw new Error(item.url+' returned '+response.status);
  const remote=Buffer.from(await response.arrayBuffer());
  const record={url:item.url,status:response.status,bytes:remote.length};
  if(item.file){const local=fs.readFileSync(item.file);const text=/\.(html|css|md|json|svg|txt)$/.test(item.file);const normalize=b=>text?Buffer.from(b.toString('utf8').replace(/\r\n/g,'\n')):b;record.comparison=text?'normalized LF text':'exact bytes';record.sha256=hash(normalize(remote));if(record.sha256!==hash(normalize(local)))throw new Error('Published content differs: '+item.url);record.matchesBuild=true;}
  else{if(!remote.toString('utf8').includes('<html'))throw new Error('Expected existing site HTML: '+item.url);record.existingSite=true;}
  return record;
}
(async()=>{const checks=[];let next=0;await Promise.all(Array.from({length:6},async()=>{while(next<items.length){const item=items[next++];checks.push(await check(item));}}));checks.sort((a,b)=>a.url.localeCompare(b.url));const report={checkedAt:new Date().toISOString(),deploymentCommit:process.env.DEPLOYMENT_COMMIT||null,workflowUrl:process.env.DEPLOYMENT_WORKFLOW_URL||null,baseUrl:base+slug+'/',status:'passed',scope:'全部新站文件与本地构建对照、总入口及预览图、既有子站可访问性；不含浏览器视觉测试和上游模型训练',total:checks.length,checks};if(process.argv[2])fs.writeFileSync(path.resolve(process.argv[2]),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({status:report.status,total:report.total,baseUrl:report.baseUrl},null,2));})().catch(e=>{console.error(e.message);process.exitCode=1;});
