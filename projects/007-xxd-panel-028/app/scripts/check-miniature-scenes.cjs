const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),dist=path.join(root,'app/dist'),run='runs/20260910-miniature-scenes-04/';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex'),read=p=>fs.readFileSync(path.join(root,p));
const original=read('vendor/xxd-panel-028/references/original-prompt/zh-CN.md').toString(),body=original.slice(original.indexOf('\n')+1);
const skill=read('vendor/xxd-panel-028/SKILL.md');
const jobs=JSON.parse(read('extensions/miniature-scenes/jobs.json'));assert.equal(jobs.length,6);
for(const job of jobs){
 const r=JSON.parse(read(run+job.id+'.json'));assert.equal(r.state,'reviewed');assert.ok(r.review.observation&&r.review.limit);
 assert.equal(r.originalSha256,hash(original));assert.equal(r.skillSha256,hash(skill));
 const prompt=read(r.prompt);assert.equal(hash(prompt),r.promptSha256);assert.ok(prompt.toString().startsWith(body));
 assert.equal((prompt.toString().match(/^OUTPUT MODE:/gm)||[]).length,1);assert.ok(prompt.toString().includes('LOCAL SCENARIO EXTENSION'));
 for(const ref of r.references)assert.equal(hash(read(ref.file)),ref.sha256);
 const bytes=read(r.output);assert.equal(hash(bytes),r.outputSha256);assert.equal(bytes.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
 assert.deepEqual(r.actualSize,[bytes.readUInt32BE(16),bytes.readUInt32BE(20)]);assert.equal(r.exactPixels,r.actualSize.join('x')===r.size);
 assert.equal(hash(fs.readFileSync(path.join(dist,'miniature-assets',path.basename(r.output)))),r.outputSha256);
 if(job.fromJob)assert.equal(r.references[0].sha256,JSON.parse(read(run+job.fromJob+'.json')).outputSha256);
}
const html=fs.readFileSync(path.join(dist,'miniatures.html'),'utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
for(const [,url]of html.matchAll(/(?:href|src|data-edit-image)="([^"]+)"/g)){
 if(/^https?:/.test(url))continue;
 if(url.startsWith('#'))assert.ok(ids.includes(url.slice(1)));else assert.ok(fs.existsSync(path.join(dist,url)),url);
}
new vm.Script(fs.readFileSync(path.join(dist,'miniatures.js'),'utf8'));
for(const file of ['miniatures.js','miniatures.css'])assert.ok(read('app/'+file).equals(fs.readFileSync(path.join(dist,file))));
for(const rel of [run+'README.md','extensions/miniature-scenes/README.md','assets/real-inputs/venue-source.md']){
 const file=path.join(root,rel);for(const[,url]of fs.readFileSync(file,'utf8').matchAll(/\]\(([^)]+)\)/g)){
  if(/^(https?:|#)/.test(url))continue;assert.ok(fs.existsSync(path.resolve(path.dirname(file),url.split('#')[0])),url);
 }
}
console.log('通过：六张微缩场景实际 PNG、提示词原文、参考与编辑来源哈希、网页及证据链接');
