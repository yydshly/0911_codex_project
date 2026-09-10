const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const project=path.resolve(__dirname,'../..');
const app=path.join(project,'app');
const dist=path.join(app,'dist');
const checks=[];
function check(name,fn){fn();checks.push(name);}
const html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
check('本地资源与锚点可解析',()=>{
  const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
  assert.equal(ids.size,[...html.matchAll(/\bid="([^"]+)"/g)].length,'锚点不能重复');
  for(const [,href] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
    if(/^https?:/.test(href))continue;
    if(href.startsWith('#')){assert.ok(ids.has(href.slice(1)),href);continue;}
    const target=path.resolve(dist,href.split('#')[0]);
    assert.ok(target.startsWith(dist+path.sep));assert.ok(fs.existsSync(target),href);
  }
});
check('完整正文、来源、关键澄清存在',()=>{
  for(let i=1;i<=12;i++)assert.ok(html.includes(`id="s${String(i).padStart(2,'0')}"`));
  for(const term of ['系统鼠标指针','CSS 像素','WebSocket','mousePressed','mouseReleased','Graphify','gstack','上游 Agent','教学模拟'])assert.ok(html.includes(term),term);
  assert.equal([...html.matchAll(/id="source-\d+"/g)].length,11);
});
check('本地文档无模板占位且相对文件存在',()=>{
  for(const name of ['README.md','notes.md','understanding.md','assets/README.md']){
    const file=path.join(project,name),s=fs.readFileSync(file,'utf8');
    assert.ok(!/\{\{[^}]+\}\}/.test(s),name);
    for(const [,link] of s.matchAll(/\]\(([^)]+)\)/g)){
      if(/^(https?:|#)/.test(link))continue;
      assert.ok(fs.existsSync(path.resolve(path.dirname(file),link.split('#')[0])),`${name}: ${link}`);
    }
  }
});
check('浏览器脚本语法与本地模拟范围',()=>{
  for(const name of ['lesson.js','app.js']){
    const s=fs.readFileSync(path.join(dist,name),'utf8');new vm.Script(s,{filename:name});
    assert.ok(!/\b(fetch|XMLHttpRequest|WebSocket)\s*\(/.test(s));
  }
});
const context={};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(dist,'lesson.js'),'utf8'),context);
const state=context.BrowserUseLesson.state;
check('正常搜索覆盖定位、输入事件与最终反馈',()=>{
  const values=Array.from({length:9},(_,i)=>state('success',i).step);
  assert.ok(values[0].program.includes('CDP'));
  assert.equal(values[2].filled,undefined);assert.equal(values[3].filled,true);
  assert.ok(values[4].program.includes('当前按钮节点'));
  assert.ok(values[5].program.includes('mouseMoved'));
  assert.ok(values[6].program.includes('mousePressed'));
  assert.ok(values[6].program.includes('mouseReleased'));
  assert.equal(values[7].result,'success');assert.equal(values[8].result,'success');
});
check('失效目标必须刷新后才再次执行',()=>{
  assert.equal(state('stale',5).step.result,'error');
  assert.ok(state('stale',6).step.program.includes('重新计算'));
  assert.ok(state('stale',7).step.program.includes('mouseMoved'));
  assert.equal(state('stale',8).step.result,'success');
});
check('步骤边界与异常分支输入',()=>{
  assert.equal(state('success',-1).index,0);assert.equal(state('success',99).index,8);
  assert.equal(state('stale',NaN).index,0);assert.throws(()=>state('unknown',1));
});
check('文档与图形下载和源文件一致',()=>{
  for(const [a,b] of [['understanding.md','downloads/understanding.md'],['assets/understanding-map.svg','assets/understanding-map.svg'],['assets/understanding-map.png','assets/understanding-map.png']])assert.ok(fs.readFileSync(path.join(project,a)).equals(fs.readFileSync(path.join(dist,b))));
  const render=JSON.parse(fs.readFileSync(path.join(project,'assets/render-check.json'),'utf8'));
  assert.equal(render.svgSha256,crypto.createHash('sha256').update(fs.readFileSync(path.join(project,'assets/understanding-map.svg'))).digest('hex'));
});
const fingerprints={};
for(const name of ['understanding.md','app/dist/index.html','app/dist/style.css','app/dist/lesson.js','app/dist/app.js','assets/understanding-map.svg','assets/understanding-map.png'])fingerprints[name]=crypto.createHash('sha256').update(fs.readFileSync(path.join(project,name))).digest('hex');
fs.writeFileSync(path.join(app,'verification.json'),JSON.stringify({scope:'静态网页、文档链接、教学状态和原创图一致性；非上游运行或站点浏览器 QA',passed:checks.length,checks,fingerprints},null,2)+'\n');
console.log(`通过 ${checks.length} 组检查；未运行上游 Agent。`);
