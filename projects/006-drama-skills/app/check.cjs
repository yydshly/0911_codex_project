const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm');
const dist=path.join(__dirname,'dist'),context={window:{}};
for(const name of ['app.js','data.js'])new vm.Script(fs.readFileSync(path.join(dist,name),'utf8'),{filename:name});
vm.runInNewContext(fs.readFileSync(path.join(dist,'data.js'),'utf8'),context);
const d=context.window.DRAMA_DATA;
assert.equal(d.skills.length,11);assert.equal(new Set(d.skills.map(s=>s.id)).size,11);assert.equal(d.routes.length,7);
assert.equal(Object.keys(d.cases).length,2);
for(const c of Object.values(d.cases)){assert.equal(c.shots.length,6);assert.equal(c.steps.length,6);assert.ok(fs.statSync(path.join(dist,c.image)).size>1000);for(const s of c.steps)for(const [,key]of s.docs){assert.ok(d.docs[key]?.text.length>20);assert.match(d.docs[key].url,/^https:\/\/github.com\/yydshly\/0911_codex_project\/blob\/main\/projects\/006-drama-skills\//);}}
const html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){if(/^(https?:|\.\.\/)/.test(m[1]))continue;assert.ok(fs.existsSync(path.join(dist,m[1])),`Missing ${m[1]}`);}
for(const m of html.matchAll(/href="#([^"]+)"/g)){assert.ok(html.includes(`id="${m[1]}"`),`Missing anchor ${m[1]}`);}
assert.match(html,/小说或一句话点子/);assert.match(html,/capability-workflow.png/);assert.match(html,/视频暂未生成/);
for(const name of fs.readdirSync(dist))assert.ok(!/^\.short-drama|\.env|node_modules/.test(name));
assert.ok(!/127\.0\.0\.1|localhost|[A-Z]:\\\\|[?&]token=/i.test(fs.readFileSync(path.join(dist,'data.js'),'utf8')),'Public reading data must not contain local runtime addresses or credentials');
console.log(`PASS: 11 skills, 7 entry routes, 2 cases / 12 steps, ${Object.keys(d.docs).length} document references, 12 shots, asset/anchor paths, JS syntax and public export boundaries.`);
