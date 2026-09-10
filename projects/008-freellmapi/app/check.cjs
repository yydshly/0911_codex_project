const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const out=path.join(__dirname,'dist');
const project=path.dirname(__dirname);
const htmlFiles=fs.readdirSync(out).filter(f=>f.endsWith('.html'));
assert.equal(htmlFiles.length,7,'首页和六篇阅读页齐全');
let links=0;
for(const file of htmlFiles){
 const text=fs.readFileSync(path.join(out,file),'utf8');
 assert.match(text,/<html lang="zh-CN">/);
 assert.ok(!text.includes('{{'),'页面不能含模板占位');
 const ids=[...text.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,'页面 ID 唯一：'+file);
 for(const [,ref] of text.matchAll(/(?:src|href)="([^"]+)"/g)){
  if(/^https?:/.test(ref))continue;
  const [relative,anchor]=ref.split('#');
  const target=path.resolve(out,relative||file);
  assert.ok(target.startsWith(out+path.sep),'资源必须在静态目录内');
  assert.ok(fs.existsSync(target),'本地资源存在：'+ref);
  if(anchor&&target.endsWith('.html')){
   const targetHTML=fs.readFileSync(target,'utf8');
   assert.ok(targetHTML.includes('id="'+decodeURIComponent(anchor)+'"'),'锚点存在：'+file+' → '+ref);
  }
  links++;
 }
}
const manifest=JSON.parse(fs.readFileSync(path.join(out,'source-manifest.json'),'utf8'));
for(const [name,hash] of Object.entries(manifest.documents)){
 const source=Buffer.from(fs.readFileSync(path.join(project,name),'utf8').replace(/^\uFEFF/,'').replace(/\r\n/g,'\n'));
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),hash,'源文档更新后需重新生成：'+name);
 assert.equal(Buffer.compare(source,fs.readFileSync(path.join(out,'downloads',name))),0,'下载副本同步');
}
const homepage=fs.readFileSync(path.join(out,'index.html'),'utf8');
for(const product of ['FreeLLMAPI','LiteLLM','New API','Portkey','Bifrost','OpenRouter','Cloudflare AI Gateway'])assert.ok(homepage.includes(product),product);
const code=fs.readFileSync(path.join(out,'app.js'),'utf8');
new vm.Script(code);
// Exercise the fixed teaching scenarios without network, browser or real model calls.
const nodes=new Map();
for(const [,id] of homepage.matchAll(/\bid="([^"]+)"/g))nodes.set(id,{textContent:'',children:[],replaceChildren(...items){this.children=items;}});
const outcome=nodes.get('outcome');
outcome.parts={b:{textContent:''},p:{textContent:''}};
outcome.querySelector=s=>outcome.parts[s];
outcome.classList={toggle(name,on){outcome[name]=on;}};
const buttons=[...homepage.matchAll(/data-scenario="([^"]+)"/g)].map(m=>({dataset:{scenario:m[1]},attrs:{},setAttribute(k,v){this.attrs[k]=v;},addEventListener(event,fn){this[event]=fn;}}));
assert.equal(buttons.length,4);
const document={querySelectorAll:s=>{assert.equal(s,'[data-scenario]');return buttons;},getElementById:id=>{assert.ok(nodes.has(id));return nodes.get(id);},createElement:()=>({textContent:''})};
vm.runInNewContext(code,{document});
const expected={success:['返回回答','实际模型 A'],limited:['有条件地回退成功','实际模型 B'],exhausted:['返回错误','未发起模型调用'],stream:['部分内容 + 流式错误','模型 A 的流式连接中断']};
for(const b of [...buttons].reverse()){
 b.click();
 assert.equal(buttons.filter(x=>x.attrs['aria-pressed']==='true').length,1);
 assert.equal(b.attrs['aria-pressed'],'true');
 assert.equal(outcome.parts.b.textContent,expected[b.dataset.scenario][0]);
 assert.equal(nodes.get('model-title').textContent,expected[b.dataset.scenario][1]);
 assert.equal(nodes.get('trace-list').children.length,4,'切换场景不累积旧记录');
}
console.log(`Checked ${htmlFiles.length} HTML pages, ${links} local references, 6 synchronized documents and 4 scenario states. No model requests made.`);
