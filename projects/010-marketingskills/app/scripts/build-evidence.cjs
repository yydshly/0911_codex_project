const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const root = path.resolve(process.argv[2] || '.');
const project = path.resolve(__dirname, '../..');
const commit = '5b2c0007766c6a1cf1d53fd8fc73e979e0821022';
assert.equal(cp.execFileSync('git',['-C',root,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),commit);
const inventory = JSON.parse(fs.readFileSync(path.join(project,'sources/inventory.json'),'utf8'));
const registry = fs.readFileSync(path.join(root,'tools/REGISTRY.md'),'utf8');
const section = registry.split('## Tool Index')[1].split('\n---')[0];
const rows = section.split('\n').filter(line => /^\|/.test(line)).map(line => line.split('|').slice(1,-1).map(c=>c.trim())).filter(c=>c.length===7 && /integrations\//.test(c[6]));
const registered = rows.map(c=>({name:c[0].replace(/^◆\s*/,''), category:c[1], api:c[2].includes('✓'), mcp:c[3].includes('✓'), cli:c[4].includes('✓'), sdk:c[5].includes('✓'), partner:c[0].includes('◆'), guide:c[6].match(/\(([^)]+)\)/)[1], bundledCli:c[4].match(/\(([^)]+)\)/)?.[1] || null}));
const guides = fs.readdirSync(path.join(root,'tools/integrations')).filter(n=>n.endsWith('.md')).sort().map(file=> {
 const row = registered.find(r=>r.guide===`integrations/${file}`);
 return {name:file.slice(0,-3), source:`tools/integrations/${file}`, registry:row || null};
});
const clis = fs.readdirSync(path.join(root,'tools/clis')).filter(n=>n.endsWith('.js')).sort().map(file=>{
 const body = fs.readFileSync(path.join(root,'tools/clis',file),'utf8');
 return {name:file.slice(0,-3), source:`tools/clis/${file}`, sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'tools/clis',file))).digest('hex'), environmentVariables:[...new Set([...body.matchAll(/process\.env\.([A-Z][A-Z0-9_]*)/g)].map(m=>m[1]))], hasDryRunBranch:body.includes("args['dry-run']")};
});
const skills = inventory.skills.map(skill=>{
 const text = fs.readFileSync(path.join(root,skill.source),'utf8');
 const lines = text.split(/\r?\n/);
 const references = [...new Set([...text.matchAll(/(?:\(|`)(references\/[^\s`)#]+)(?:#[^\s`)]*)?[`)]/g)].map(m=>m[1]))].filter(p=>fs.existsSync(path.join(root,'skills',skill.name,p)));
 return {name:skill.name, lineCount:lines.length, headings:lines.flatMap((line,i)=>/^## /.test(line)?[{title:line.slice(3),line:i+1}]:[]), references};
});
assert.equal(guides.length,95); assert.equal(clis.length,64); assert.equal(skills.length,50);
const data = {commit, guides, clis, skills, registryRowCount:registered.length, notes:'工具能力列为固定版本上游登记，未连接或验证平台当前服务；环境变量与 dry-run 标记由源码静态提取。'};
fs.writeFileSync(path.join(project,'sources/evidence.json'),JSON.stringify(data,null,2)+'\n');
fs.writeFileSync(path.join(project,'app/dist/evidence.js'),'window.MARKETING_EVIDENCE = '+JSON.stringify(data,null,2)+';\n');
fs.copyFileSync(path.join(root,'tools/clis/ga4.js'),path.join(project,'sources/upstream-ga4.js'));
console.log(`证据索引已生成：${skills.length} 技能、${guides.length} 指南、${clis.length} 脚本；注册表 ${registered.length} 行。`);
