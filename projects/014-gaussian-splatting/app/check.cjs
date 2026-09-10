// Validate the generated reading site and its source documents without a browser.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),dist=path.join(__dirname,'dist');
const expected=['index','principles','implementation','comparison','chatgpt','applications','notes'];
let links=0,documents=0;
const read=p=>fs.readFileSync(p,'utf8');
const decode=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
for(const slug of expected){
  const file=path.join(dist,slug+'.html'),html=read(file);
  assert.ok(html.length>3000,'完整章节内容：'+slug);
  assert.match(html,/<html lang="zh-CN">/);
  assert.equal((html.match(/<h1 /g)||[]).length,1,'唯一正文标题');
  assert.equal((html.match(/aria-current="page"/g)||[]).length,1,'唯一活动章节');
  assert.ok(!/\{\{|待记录|尚未开始研究|\u0001|\u0002/.test(html),'无模板或渲染占位');
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,'锚点无重复');
  for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    const url=decode(m[1]);links++;
    if(/^https?:/.test(url)){assert.equal(new URL(url).protocol,'https:');continue;}
    const [relative,hash]=url.split('#');const target=path.resolve(path.dirname(file),decodeURIComponent(relative||path.basename(file)));
    assert.ok(target.startsWith(dist+path.sep),'内部资源不越界：'+url);
    assert.ok(fs.existsSync(target),'存在目标：'+url);
    if(hash&&target.endsWith('.html'))assert.ok(read(target).includes('id="'+hash+'"'),'存在章节锚点：'+url);
  }
}
// Check relative links and images in the authored Markdown, including the app guide.
for(const relative of [...fs.readdirSync(root).filter(x=>x.endsWith('.md')),'app/README.md','assets/README.md']){
  const file=path.join(root,relative),md=read(file);documents++;
  assert.ok(!/\{\{|\}\}|尚未开始研究/.test(md),'无模板残留：'+relative);
  for(const m of md.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)){
    if(/^(?:https?:|#)/.test(m[1]))continue;
    assert.ok(fs.existsSync(path.resolve(path.dirname(file),m[1].split('#')[0])),'文档目标存在：'+relative+' → '+m[1]);
  }
}
assert.equal(JSON.parse(read(path.join(root,'upstream.json'))).commit,'54c035f7834b564019656c3e3fcc3646292f727d');
assert.equal(JSON.parse(read(path.join(root,'registration.json'))).researchIndex,'012');
assert.match(read(path.join(root,'UPSTREAM-LICENSE.txt')),/Inria/);
const sources=JSON.parse(read(path.join(root,'sources.json'))).sources;
assert.ok(sources.length>=30,'保留完整外部来源索引');
for(const source of sources){assert.equal(new URL(source.url).protocol,'https:');assert.ok(source.chapters.every(c=>fs.existsSync(path.join(root,c))));}
const comparison=read(path.join(root,'comparison.md')).split('## Splat.js 与官方库')[0];
assert.equal((comparison.match(/^\| \[/gm)||[]).length,21,'21 个产品与框架');
const repository=path.resolve(root,'../..');
const manifest=JSON.parse(read(path.join(repository,'docs/web-demos.json')));
assert.equal(manifest.projects.find(p=>p.slug==='014-gaussian-splatting').researchIndex,'012');
const index=read(path.join(repository,'README.md'));
const numbers=[...index.matchAll(/^\| (\d{3}) \|/gm)].map(m=>+m[1]);
assert.equal(new Set(numbers).size,numbers.length,'研究索引无重复');
assert.deepEqual(numbers,[...numbers].sort((a,b)=>a-b),'研究索引升序');
assert.match(index,/### 012 · Gaussian Splatting/);
console.log(JSON.stringify({pages:expected.length,checkedLinks:links,documents,sources:sources.length,comparedEntries:21,status:'passed'},null,2));
