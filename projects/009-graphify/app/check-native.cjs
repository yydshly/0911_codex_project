const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto'),vm=require('node:vm');
const dist=path.join(__dirname,'dist'),base=path.join(dist,'native/fastapi');
const read=name=>fs.readFileSync(path.join(base,name),'utf8'),json=name=>JSON.parse(read(name));
const graph=json('graph.json'),receipt=json('receipt.json'),edges=graph.links||graph.edges;
assert.equal(graph.nodes.length,747);assert.equal(edges.length,1971);
assert.equal(receipt.nodes,graph.nodes.length);assert.equal(receipt.edges,edges.length);
assert.equal(new Set(graph.nodes.map(n=>n.community)).size,46);
assert.equal(receipt.files,48);assert.deepEqual(receipt.failedSources,[]);
assert.equal(receipt.inputTokens+receipt.outputTokens,0);assert.equal(receipt.graphAggregated,false);
const ids=graph.nodes.map(n=>n.id).sort(),idSet=new Set(ids);
for(const e of edges)assert(idSet.has(e.source)&&idSet.has(e.target),'Dangling edge');
const network=read('graph.html');
const extract=name=>JSON.parse(network.match(new RegExp('^const '+name+' = (.+);$','m'))[1]);
assert.deepEqual(extract('RAW_NODES').map(n=>n.id).sort(),ids);
assert.deepEqual(extract('RAW_EDGES').map(e=>JSON.stringify([e.from,e.to,e.label])).sort(),edges.map(e=>JSON.stringify([e.source,e.target,e.relation])).sort());
assert.equal(network,read('graph.upstream.html').replace('https://unpkg.com/vis-network@9.1.6/standalone/umd/vis-network.min.js','../vendor/vis-network.min.js'));
assert(!read('tree.html').includes('(+'),'Tree has a truncation marker');
for(const file of ['graph.html','tree.html','callflow.html']){
 const html=read(file);
 for(const script of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi))if(!/\bsrc=|application\/json/.test(script[1]))new vm.Script(script[2],{filename:file});
 for(const src of html.matchAll(/<script[^>]*\bsrc="([^"]+)"/gi))assert(fs.existsSync(path.resolve(base,src[1])),src[1]);
}
const vendor=path.join(dist,'native/vendor');
for(const item of JSON.parse(fs.readFileSync(path.join(vendor,'manifest.json'))))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(vendor,item.file))).digest('hex'),item.sha256);
for(const name of ['native.js','native-data.js'])new vm.Script(fs.readFileSync(path.join(dist,name),'utf8'),{filename:name});
for(const record of json('queries.json')){assert.equal(record.exitCode,0);assert(!/TRUNCATED|[A-Z]:[\\/]/.test(record.output));}
const integration=json('integration.json');
assert.equal(integration.mcp.status,'passed');assert.equal(integration.incremental.status,'passed');
assert.equal(integration.incremental.beforeNodes,18);assert.equal(integration.incremental.afterNodes,19);assert(integration.incremental.newCallEdgeVerified);
assert(!/TRUNCATED|[A-Z]:[\\/]/.test(JSON.stringify(integration.mcp)));
for(const file of ['GRAPH_REPORT.md','report.html','graph.svg','graph.graphml','cypher.txt','graph.canvas','obsidian.zip','source.zip','sources.json','wiki/index.html','Graphify-LICENSE','Graphify-LICENSE-MIT','Graphify-NOTICE','LICENSE-FastAPI'])assert(fs.statSync(path.join(base,file)).size>0,file);
console.log('Native Graphify: all 747 nodes / 1971 edges match upstream HTML; 46 communities; local dependency hashes, syntax, exports, query and integration evidence passed.');
