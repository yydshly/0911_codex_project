const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto'),os=require('node:os'),cp=require('node:child_process');
const project=path.resolve(__dirname,'../..'),dist=path.join(project,'app/dist'),run=path.join(project,'runs/product-positioning');
const manifest=JSON.parse(fs.readFileSync(path.join(run,'manifest.json'),'utf8'));
for(const f of manifest.files){const raw=fs.readFileSync(path.join(run,f.path));assert.equal(crypto.createHash('sha256').update(raw).digest('hex'),f.sha256);assert.ok(raw.equals(fs.readFileSync(path.join(dist,'real-case',f.path))));}
const html=fs.readFileSync(path.join(dist,'real-case.html'),'utf8');
const ids=[...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
for(const [,link] of html.matchAll(/(?:src|href)="([^"]+)"/g)){if(/^https?:/.test(link))continue;if(link.startsWith('#'))assert.ok(ids.includes(link.slice(1)),link);else assert.ok(fs.existsSync(path.join(dist,link)),link);}
class Element{constructor(tag){this.tag=tag;this.children=[];this.attrs={};this.events={};this.textContent='';this.value='';}append(...c){this.children.push(...c);}replaceChildren(...c){this.children=c;}setAttribute(k,v){this.attrs[k]=v;}removeAttribute(k){delete this.attrs[k];}addEventListener(k,f){this.events[k]=f;}click(){this.events.click?.();}remove(){}text(){return this.textContent+this.children.map(c=>c.text()).join('');}}
const nodes=new Map(ids.map(id=>[id,new Element(id)]));
const get=id=>{assert.ok(nodes.has(id),'DOM ID 必须真实存在：'+id);return nodes.get(id);};
const downloads=[];
const document={getElementById:get,body:new Element('body'),createElement:tag=>new Element(tag),createTextNode:text=>{const e=new Element('#text');e.textContent=text;return e;}};
const context={window:{},document,crypto,Blob,URL:{createObjectURL:b=>{downloads.push(b);return 'blob:offline';},revokeObjectURL:()=>{}},setTimeout:f=>f()};vm.createContext(context);
for(const name of ['real-case-data.js','real-case.js'])vm.runInContext(fs.readFileSync(path.join(dist,name),'utf8'),context);
assert.equal(get('case-steps').children.length,5);
for(let i=0;i<5;i++){get('case-steps').children[i].click();assert.ok(get('case-step').text().includes(context.window.REAL_CASE.steps[i].output));assert.equal(get('case-steps').children.filter(b=>b.attrs['aria-current']).length,1);}
const submit=id=>get(id).events.submit({preventDefault(){}});
get('task-route').value='structure';get('task-question').value='   ';submit('task-form');assert.match(get('task-status').textContent,/请填写/);assert.equal(downloads.length,0);
for(const route of ['structure','calls','change']){get('task-route').value=route;get('task-question').value='<img src=x onerror=alert(1)> 我的真实问题';submit('task-form');assert.ok(get('task-preview').textContent.includes('<img src=x'));assert.equal(get('task-preview').children.length,0,'输入只按文本展示');assert.equal(get('task-output').hidden,false);get('task-download').click();}
assert.equal(downloads.length,3);assert.throws(()=>context.window.REAL_CASE_API.makeTask('问题','unknown'));
get('feedback-result').value='completed';get('feedback-evidence').value=' ';submit('feedback-form');assert.equal(downloads.length,3);
get('feedback-evidence').value='测试专用证据，未混入实际反馈';submit('feedback-form');assert.equal(downloads.length,4);assert.match(get('feedback-status').textContent,/尚未提交/);
async function checks(){const exported=JSON.parse(await downloads[3].text());assert.equal(exported.result,'completed');assert.equal(exported.route,'change');assert.match(exported.id,/^attempt_/);assert.ok((await downloads[0].text()).includes('未分析你的仓库'));
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'marketing-loop-check-'));
  const feedback=path.join(temp,'feedback.json');const stateFile=path.join(temp,'.agents/loops/product-validation.json');
  const input={enabled:true,records:[]};const save=()=>fs.writeFileSync(feedback,JSON.stringify(input));
  const execute=()=>{const r=cp.spawnSync(process.execPath,[path.join(__dirname,'run-product-loop.cjs'),temp],{encoding:'utf8'});return r.status===0?JSON.parse(r.stdout):null;};
  try{save();assert.equal(execute().status,'baseline');input.records.push({id:'test_1',result:'blocked',evidence:'隔离测试'});save();assert.equal(execute().acted,1);const draft=fs.readFileSync(path.join(temp,'next-actions.md'),'utf8');assert.equal(execute().acted,0);assert.equal(fs.readFileSync(path.join(temp,'next-actions.md'),'utf8'),draft);let previous=fs.readFileSync(stateFile,'utf8');input.records[0].evidence='修改旧记录';save();assert.equal(execute(),null);assert.equal(fs.readFileSync(stateFile,'utf8'),previous);input.records[0].evidence='隔离测试';input.enabled=false;input.records.push({id:'test_2',result:'completed',evidence:'隔离测试'});save();assert.equal(execute().status,'stopped');assert.equal(fs.readFileSync(path.join(temp,'next-actions.md'),'utf8'),draft);input.enabled=true;save();assert.equal(execute().acted,1);previous=fs.readFileSync(stateFile,'utf8');input.records.push({...input.records[0]});save();assert.equal(execute(),null);assert.equal(fs.readFileSync(stateFile,'utf8'),previous);
  }finally{assert.equal(path.dirname(temp),os.tmpdir());assert.ok(path.basename(temp).startsWith('marketing-loop-check-'));fs.rmSync(temp,{recursive:true});}
  console.log('通过：5 份原文与产物哈希、镜像和链接；5 步切换、3 条任务路线、输入文本处理、任务/反馈导出；循环基线、去重、停止与错误不改状态。隔离测试未写入真实反馈。未做浏览器验收。');
}
checks().catch(error=>{console.error(error);process.exitCode=1;});
