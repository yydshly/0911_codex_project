const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=__dirname,dist=path.join(root,'dist'),ctx={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(dist,'data.js'),'utf8'),ctx);
const data=JSON.parse(JSON.stringify(ctx.window.GRAPHIFY_DATA));
const E=require('./dist/engine.js'),oracle=JSON.parse(fs.readFileSync(path.join(root,'oracle.json'),'utf8'));
const ids=new Set(data.nodes.map(n=>n.id));assert.equal(ids.size,data.nodes.length);
assert.equal(data.nodes.length,18);assert.equal(data.edges.length,40);
assert.equal(data.meta.inputTokens+data.meta.outputTokens,0);
for(const e of data.edges){assert(ids.has(e.source)&&ids.has(e.target),'边端点存在');assert.equal(e.confidence,'EXTRACTED');}
for(const [file,hash] of Object.entries(data.meta.sourceHashes)){
  const bytes=fs.readFileSync(path.join(root,'../sample',file));
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),hash,'源文件未漂移');
  assert.equal(bytes.toString('utf8'),data.files[file],'展示源码与输入一致');
}
let pairs=0;
for(const scope of ['all','calls']){
  const edges=data.edges.filter(e=>scope==='all'||e.relation==='calls');
  for(const a of ids){
    assert.deepEqual(E.affected(edges,a).map(h=>h.id).sort(),oracle[scope].affected[a],`影响分析与上游一致：${scope}/${a}`);
    for(const b of ids){const route=E.path(edges,a,b),expected=oracle[scope].distances[a][b];assert.equal(route.length?route.length-1:undefined,expected,'有向最短路径一致');pairs++;}
  }
}
assert.equal(E.path(data.edges,'catalog_get_product','api_checkout').length,0,'不反向编造调用路径');
for(const file of fs.readdirSync(dist).filter(f=>f.endsWith('.js')))new vm.Script(fs.readFileSync(path.join(dist,file),'utf8'),{filename:file});
const html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
for(const [,url] of html.matchAll(/(?:src|href)="([^"]+)"/g)){if(/^(https?:|#)/.test(url))continue;assert(fs.existsSync(path.join(dist,url)),'静态资源存在：'+url);}
const raw=JSON.parse(fs.readFileSync(path.join(dist,'graph.json'),'utf8'));
assert.equal(raw.nodes.length,data.nodes.length);assert.equal((raw.links||raw.edges).length,data.edges.length);
for(const file of ['README.md','notes.md','assets/README.md'])assert(!/\{\{[^}]+\}\}/.test(fs.readFileSync(path.join(root,'..',file),'utf8')),'文档占位已清理');
console.log(`Graphify 检查通过：18 节点 / 40 关系，${pairs} 组有向路径、36 组上游影响分析对照，来源哈希与静态资源通过。`);
