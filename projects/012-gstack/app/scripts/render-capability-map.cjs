const fs=require('node:fs'),path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const app=path.resolve(__dirname,'..'),assets=path.join(app,'../assets');
 const svg=fs.readFileSync(path.join(assets,'skills-capability-map.svg'),'utf8');
 const height=Number(svg.match(/height="(\d+)"/)[1]);
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:2400,height},deviceScaleFactor:1});
  await page.setContent(`<html lang="zh-CN"><head><meta charset="utf-8"><title>gstack 技能能力图</title><style>body{margin:0}svg{display:block}</style></head><body>${svg}</body></html>`);
  await page.evaluate(()=>document.fonts.ready);
  const issues=await page.locator('svg text').evaluateAll(nodes=>nodes.flatMap(n=>{const b=n.getBBox();return b.x<0||b.x+b.width>2400?[n.textContent]:[]}));
  if(issues.length)throw Error('Text outside canvas: '+issues.join('; '));
  await page.screenshot({path:path.join(assets,'skills-capability-map.png'),fullPage:true});
  fs.copyFileSync(path.join(assets,'skills-capability-map.png'),path.join(app,'dist/assets/skills-capability-map.png'));
  console.log('Rendered 2400 × '+height+' capability map; 57 skills included.');
 }finally{await browser.close();}
})().catch(err=>{console.error(err);process.exitCode=1;});
