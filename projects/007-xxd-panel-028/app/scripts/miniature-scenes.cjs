// Local scenario extensions retain the upstream aesthetic body and delivery blocks.
// This script prepares prompts and preserves results; the host invokes imagegen.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..');
const run='20260910-miniature-scenes-04';
const jobs=JSON.parse(fs.readFileSync(path.join(root,'extensions/miniature-scenes/jobs.json')));
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const [action,id,source]=process.argv.slice(2);
const job=jobs.find(j=>j.id===id);assert.ok(job);
const dir=path.join(root,'runs',run),record=path.join(dir,id+'.json');
if(action==='prepare'){
 assert.ok(!fs.existsSync(record),'Do not overwrite a run');
 fs.mkdirSync(path.join(dir,'prompts'),{recursive:true});
 const original=fs.readFileSync(path.join(root,'vendor/xxd-panel-028/references/original-prompt/zh-CN.md'),'utf8');
 const skill=fs.readFileSync(path.join(root,'vendor/xxd-panel-028/SKILL.md'),'utf8');
 const blocks=[...skill.matchAll(/```text\r?\n([\s\S]*?)```/g)].map(m=>m[1].trimEnd());
 const body=original.slice(original.indexOf('\n')+1);
 const common=blocks.find(b=>b.startsWith('MODE-SPECIFIC DELIVERY OVERRIDE')).replace('<resolved ratio and/or exact WIDTHxHEIGHT>','3:2 / 1536x1024');
 const mode=blocks.find(b=>b.startsWith('OUTPUT MODE: DESIGN_ONLY'));
 const text=blocks.find(b=>b.startsWith('TEXT MODE: NONE'));
 const prompt=body+'\n'+common+'\n\n'+mode+'\n\n'+text+'\n\nLOCAL SCENARIO EXTENSION — CURRENT DEMONSTRATION\nThe user has requested extensions within this miniature visual direction. Retain the entire original aesthetic language. The following scenario and input roles replace single-photo intake and select the demonstrated content. Produce one unified full-canvas miniature design with no photographic area, no upper portrait, and no diptych.\n'+job.request+'\n';
 const refFiles=job.fromJob?[JSON.parse(fs.readFileSync(path.join(dir,job.fromJob+'.json'))).output]:job.refs.map(f=>'assets/real-inputs/'+f);
 const references=refFiles.map((file,i)=>({file,role:job.roles[i],sha256:hash(fs.readFileSync(path.join(root,file)))}));
 const promptPath='runs/'+run+'/prompts/'+id+'.txt';fs.writeFileSync(path.join(root,promptPath),prompt);
 fs.writeFileSync(record,JSON.stringify({...job,run,origin:'local-scenario-extension',upstreamCommit:'3194d43ba95edbad0082b3604959e45067f72b7e',originalSha256:hash(original),skillSha256:hash(skill),references,prompt:promptPath,promptSha256:hash(prompt),size:'1536x1024',state:'prepared'},null,2)+'\n');
 console.log(JSON.stringify({id,references,prompt:promptPath}));
}else if(action==='record'){
 const r=JSON.parse(fs.readFileSync(record));assert.ok(!r.output);
 const bytes=fs.readFileSync(source);assert.equal(bytes.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
 r.actualSize=[bytes.readUInt32BE(16),bytes.readUInt32BE(20)];r.exactPixels=r.actualSize.join('x')===r.size;
 r.output='assets/generated/'+run+'/'+id+'-'+r.actualSize.join('x')+'.png';
 fs.mkdirSync(path.dirname(path.join(root,r.output)),{recursive:true});fs.copyFileSync(source,path.join(root,r.output));
 r.outputSha256=hash(bytes);r.tool='built-in imagegen';r.postprocessing='none';r.state='generated-awaiting-review';
 fs.writeFileSync(record,JSON.stringify(r,null,2)+'\n');console.log(JSON.stringify({id,output:r.output,actualSize:r.actualSize}));
}else throw new Error('prepare or record');
