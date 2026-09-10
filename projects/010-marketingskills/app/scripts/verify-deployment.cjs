// Verify deployed bytes against the assembled, validated local Pages output.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const project=path.resolve(__dirname,'../..'),root=path.resolve(project,'../..'),site=path.join(root,'_site');
const [commit,runUrl]=process.argv.slice(2);
if(!/^[a-f0-9]{40}$/.test(commit||'') || !/^https:\/\/github\.com\/yydshly\/0911_codex_project\/actions\/runs\/\d+$/.test(runUrl||'')) throw Error('需要完整部署提交和已完成 Actions 链接');
const base='https://yydshly.github.io/0911_codex_project/';
const manifest=JSON.parse(fs.readFileSync(path.join(root,'docs/web-demos.json'),'utf8'));
const files=['index.html','assets/010-marketingskills.png'];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,e.name);if(e.isDirectory())walk(file);else files.push(path.relative(site,file).replaceAll('\\','/'));}}
walk(path.join(site,'010-marketingskills'));
for(const p of manifest.projects)if(p.slug!=='010-marketingskills')files.push(p.slug+'/index.html');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const canonical=(file,b)=>/\.(html|css|js|svg|md|json|txt|log)$/.test(file)?Buffer.from(b.toString('utf8').replaceAll('\r\n','\n')):b;
async function main(){const results=[];let next=0;await Promise.all(Array.from({length:5},async()=>{while(next<files.length){const file=files[next++];try{const response=await fetch(base+file+'?verify='+commit,{signal:AbortSignal.timeout(25000)});const actual=Buffer.from(await response.arrayBuffer()),expected=fs.readFileSync(path.join(site,file));const expectedHash=hash(canonical(file,expected)),actualHash=hash(canonical(file,actual));results.push({file,status:response.status,matching:response.status===200&&actualHash===expectedHash,comparison:/\.(png|jpg|jpeg|webp)$/.test(file)?'bytes':'LF-normalized text',expectedSha256:expectedHash,actualSha256:actualHash});}catch(error){results.push({file,status:'error',matching:false,error:error.message});}}}));
results.sort((a,b)=>a.file.localeCompare(b.file));const failures=results.filter(r=>!r.matching);
const record={verifiedAt:new Date().toISOString(),commit,workflow:runUrl,site:base+'010-marketingskills/',realCase:base+'010-marketingskills/real-case.html',checks:results.length,passed:results.length-failures.length,files:results,browserVisualQA:'未执行；HTTP 内容核对与离线交互检查'};
if(failures.length){console.error(JSON.stringify({checked:results.length,failures},null,2));process.exitCode=1;return;}
fs.writeFileSync(path.join(project,'deployment-verification.json'),JSON.stringify(record,null,2)+'\n');console.log(JSON.stringify({checked:results.length,passed:results.length,url:record.site,commit}));}
main().catch(error=>{console.error(error);process.exitCode=1;});
