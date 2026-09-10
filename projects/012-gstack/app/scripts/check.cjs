const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const app=path.resolve(__dirname,'..'),root=path.join(app,'dist');
const hash=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'catalog.js'),'utf8'),ctx);const catalog=ctx.window.GSTACK_CATALOG;
assert.equal(catalog.count,57);assert.equal(catalog.skills.length,57);assert.equal(new Set(catalog.skills.map(s=>s.id)).size,57);
const sourceManifest=JSON.parse(fs.readFileSync(path.join(root,'evidence/source-manifest.json'),'utf8'));
for(const s of catalog.skills){for(const key of ['id','title','goal','input','method','model','tools','check','output','boundary','sourcePath','source','localSource'])assert.ok(typeof s[key]==='string'&&s[key].length>0,s.id+':'+key);assert.ok(s.steps.length>0);assert.ok(s.source.includes(catalog.commit));assert.equal(hash(path.join(root,s.localSource)),s.sourceHash);assert.equal(sourceManifest.files[s.sourcePath],s.sourceHash);for(const r of s.relatedSources)assert.ok(fs.existsSync(path.join(root,r.local)));}
let fileCount=0;
function inspect(dir){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,ent.name);if(ent.isDirectory()){inspect(file);continue;}fileCount++;if(file.endsWith('.js'))new vm.Script(fs.readFileSync(file,'utf8'),{filename:file});if(file.endsWith('.html')){const t=fs.readFileSync(file,'utf8');assert.match(t,/<html lang="zh-CN">/);for(const [,url]of t.matchAll(/(?:src|href)="([^"]+)"/g)){if(/^(https?:|#)/.test(url))continue;assert.ok(fs.existsSync(path.resolve(path.dirname(file),url.split('#')[0])),url);}}}}
inspect(root);
const report=JSON.parse(fs.readFileSync(path.join(root,'evidence/tests.json'),'utf8'));assert.equal(report.failed,0);assert.equal(report.total,21);for(const [f,h]of Object.entries(report.files))assert.equal(hash(path.join(app,f)),h,'测试证据过期：'+f);
const before=JSON.parse(fs.readFileSync(path.join(root,'evidence/tests-before.json'),'utf8'));assert.equal(before.failed,1);assert.equal(hash(path.join(root,'evidence/validator-before.txt')),before.files['dist/validator.js']);
const browserPath=path.join(root,'evidence/browser.json');
if(fs.existsSync(browserPath)){const br=JSON.parse(fs.readFileSync(browserPath,'utf8'));assert.equal(br.failed,0);for(const [f,h]of Object.entries(br.files))assert.equal(hash(path.join(app,f)),h,'浏览器证据过期：'+f);for(const s of br.screenshots)assert.ok(fs.existsSync(path.join(root,s.path)));}
for(const p of ['01-design.md','02-scope.md','03-engineering.md','04-design-review.md','05-review.md','06-qa.md','07-documentation.md','08-delivery.md'])assert.ok(fs.existsSync(path.join(root,'evidence',p)),p);
const output={kind:'actual-static-check',recordedAt:new Date().toISOString(),skills:57,sourceFiles:Object.keys(sourceManifest.files).length,staticFiles:fileCount,ruleEvidence:'fresh',browserEvidence:fs.existsSync(browserPath)?'fresh':'missing',checks:['技能唯一与完整字段','固定来源与原文指纹','脚本语法','HTML 本地资源','规则测试内容指纹','历史失败源码指纹','阶段记录存在']};
fs.writeFileSync(path.join(root,'evidence/site-check.json'),JSON.stringify(output,null,2)+'\n');console.log(JSON.stringify(output,null,2));
