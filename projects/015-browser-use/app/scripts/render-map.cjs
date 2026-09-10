const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'../..');
const playwright=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const sharp=require(process.env.SHARP_MODULE||'sharp');
(async()=>{
  await sharp(path.join(root,'assets/understanding-map.svg')).png().toFile(path.join(root,'assets/understanding-map.png'));
  const opts={headless:true};
  if(process.env.BROWSER_EXECUTABLE)opts.executablePath=process.env.BROWSER_EXECUTABLE;
  const browser=await playwright.chromium.launch(opts);
  try{
    const page=await browser.newPage({viewport:{width:1800,height:3200},deviceScaleFactor:1});
    await page.goto(pathToFileURL(path.join(root,'assets/understanding-map.svg')).href);
    await page.evaluate(()=>document.fonts.ready);
    const bounds=await page.locator('svg text').evaluateAll(nodes=>nodes.map(n=>{const b=n.getBBox();return {text:n.textContent,x:b.x,y:b.y,right:b.x+b.width,bottom:b.y+b.height};}));
    const outside=bounds.filter(b=>b.x<0||b.y<0||b.right>1800||b.bottom>3200);
    if(outside.length)throw new Error('图中文字超出画布：'+JSON.stringify(outside));
    fs.writeFileSync(path.join(root,'assets/render-check.json'),JSON.stringify({kind:'original-diagram-render',renderer:'sharp; Chromium text bounds',width:1800,height:3200,textCount:bounds.length,outsideCanvas:outside,svgSha256:require('node:crypto').createHash('sha256').update(fs.readFileSync(path.join(root,'assets/understanding-map.svg'))).digest('hex')},null,2)+'\n');
    console.log('已渲染完整图，文字均位于画布内。');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
