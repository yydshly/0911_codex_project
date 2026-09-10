const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm');
const dir=path.join(__dirname,'dist'),html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
assert(!html.includes('{{'),'No unresolved template placeholders');
for(const term of ['多 Agent 工具','通过文件实现协作通信','Multica','MetaGPT','LongHorizon','Memmy','上游运行未实测','未读消息强制续跑']) assert(html.includes(term),term);
assert.equal((html.match(/data-step="[0-5]"/g)||[]).length,6);
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
for(const [,link] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
 if(/^https?:/.test(link))continue;
 if(link.startsWith('#')){assert(ids.has(link.slice(1)),link);continue;}
 assert(fs.existsSync(path.join(dir,link)),link);
}
new vm.Script(fs.readFileSync(path.join(dir,'app.js'),'utf8'));
for(const name of ['overview.svg','overview.png']) assert(fs.readFileSync(path.join(dir,'assets',name)).equals(fs.readFileSync(path.join(__dirname,'../assets',name))));
console.log('Munder page content, links, interactions syntax and figure parity passed');
