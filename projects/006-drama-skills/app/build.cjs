const fs=require('node:fs'),path=require('node:path');
const {version,skills,routes,cases}=require('./content.cjs');
const project=path.resolve(__dirname,'..'),dist=path.join(__dirname,'dist');
fs.mkdirSync(path.join(dist,'assets'),{recursive:true});
for(const file of ['index.html','app.css','app.js'])fs.copyFileSync(path.join(__dirname,file),path.join(dist,file));
const media={
 'assets/capability-workflow.png':'assets/capability-workflow.png',
 'assets/capability-workflow.svg':'assets/capability-workflow.svg',
 'assets/empty-room-storyboard.png':'demos/empty-room/剧集/EP001/制作成果/images/storyboard-v1.png',
 'assets/shuihu-dashboard.png':'demos/shuihu/生成记录/dashboard-script.png'
};
for(const [output,input]of Object.entries(media))fs.copyFileSync(path.join(project,input),path.join(dist,output));
const docs={};
for(const [id,c]of Object.entries(cases)){
 for(const step of c.steps)for(const d of step.docs){
  const relative=`demos/${id}/${d[1]}`,key=`${id}/${d[1]}`;
  const source=fs.readFileSync(path.join(project,relative),'utf8');
  // Public reading copies exclude host-specific imagegen output locations. Originals remain in the repository.
  const text=source.replace(/`[A-Za-z]:[\\/][^`\r\n]+`/g,'`本机生成文件（已保存到本案例）`');
  docs[key]={title:d[0],text,url:'https://github.com/yydshly/0911_codex_project/blob/main/projects/006-drama-skills/'+relative.split('/').map(encodeURIComponent).join('/')};
  d[1]=key;
 }
}
fs.writeFileSync(path.join(dist,'data.js'),'window.DRAMA_DATA = '+JSON.stringify({version,skills,routes,cases,docs}).replace(/</g,'\\u003c')+';\n');
console.log(`Drama Skills: built ${skills.length} skills, ${Object.keys(cases).length} cases, ${Object.keys(docs).length} reading files and ${Object.keys(media).length} assets.`);
