(function(){
  'use strict';
  const data = window.REAL_CASE;
  const $ = id => document.getElementById(id);
  const routes = {
    structure:{title:'找到结构与阅读起点',files:'applications.py → routing.py → dependencies/utils.py',steps:['从应用对象与路由相关入口建立阅读顺序，记录每个文件的职责。','选择一个实际问题相关的符号，回源码检查定义、引用和范围。','画出只包含已核验关系的小图；未确认部分单独标记。']},
    calls:{title:'核验一条调用关系',files:'routing.py、dependencies/utils.py',steps:['从运行记录中选一条与你的问题有关的关系，先记录 EXTRACTED / INFERRED 类型。','回到固定版本的源文件核对调用者、被调用者与条件；无法定位则记录失败。','如需证明运行时路径，另建最小运行用例与观测记录；静态关系不能代替运行时证据。']},
    change:{title:'准备一次改动影响检查',files:'先定位目标符号，再检查其引用；按需要阅读 routing.py',steps:['写出想改动的具体行为与目标符号；不要凭节点度数直接决定修改。','核对相关引用和推断关系，记录已证实与未知的影响范围。','为具体行为补充适当验证；当前图不含 tests 和外部依赖，相关影响需另查。']}
  };
  function makeTask(question,route){
    const r=routes[route];
    if(!r || !question.trim() || question.length>1200) throw Error('请填写 1–1200 字的问题，并选择有效路线。');
    return `# 陌生代码库上手任务单\n\n状态：待实际执行；本页面未分析你的仓库。\n\n## 我的问题\n${question.trim()}\n\n## 选择的路线\n${r.title}\n\n## 参考案例与边界\nFastAPI：${data.receipt.commit}\nGraphify：${data.receipt.graphifyCommit}\n范围：${data.receipt.scope}\n既有运行：48 个 Python 文件、747 节点、1971 关系，其中 237 条为推断。\n来源：同仓库 Graphify 既有运行记录；此次没有重新执行。\n这不是对你项目的分析，图关系也不是运行时调用轨迹。\n\n## 执行步骤\n- [ ] 确认使用示范 FastAPI，还是另行固定自己项目的版本与范围。\n- [ ] 参考阅读起点（非已核验结论）：${r.files}\n${r.steps.map(s=>'- [ ] '+s).join('\n')}\n- [ ] 写出一项带源文件/符号与证据的结果，或一条可复现阻碍。\n\n## 验收回执\n实际仓库及版本：待填\n开始执行时间：待填\n首次核验完成时间与耗时：待填\n证据（源文件、符号、命令或记录）：待填\n结果：已完成 / 遇到阻碍 / 放弃（实际执行后选择）\n下一步：待填\n\n生成任务单或下载文件不代表任务已经完成。\n`;
  }
  // 可复用的纯函数也供离线行为检查使用。
  window.REAL_CASE_API = {makeTask};
  function showStep(index){
    const s=data.steps[index];
    for(const [i,b] of Array.from($('case-steps').children).entries()) {if(i===index)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');}
    const panel=$('case-step'); panel.replaceChildren();
    const h=document.createElement('h3');h.textContent=`${index+1}. ${s.title} · ${s.skill}`;panel.append(h);
    const dl=document.createElement('dl');for(const [key,value] of [['输入',s.input],['原文方法',s.method],['实际决策',s.decision]]){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=key;dd.textContent=value;dl.append(dt,dd);}panel.append(dl);
    const p=document.createElement('p');
    for(const [label,href] of [['下载实际产物',`real-case/${s.file}`],['阅读原始技能',`real-case/upstream/${s.skill}/SKILL.md`],['固定上游来源',`https://github.com/coreyhaines31/marketingskills/blob/${data.sha}/skills/${s.skill}/SKILL.md`]]){const a=document.createElement('a');a.textContent=label;a.href=href;p.append(a,document.createTextNode(' · '));}panel.append(p);
    const details=document.createElement('details'),summary=document.createElement('summary'),pre=document.createElement('pre');summary.textContent='展开完整已生成产物';pre.className='document';pre.textContent=s.output;details.append(summary,pre);panel.append(details);
  }
  data.steps.forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.textContent=`0${i+1} ${s.title}`;b.addEventListener('click',()=>showStep(i));$('case-steps').append(b);});showStep(0);
  const events={task_created:0,task_exported:0,feedback_exported:0};
  function measure(name){events[name]++;renderMetrics();}
  function renderMetrics(){$('local-metrics').textContent=`当前会话：生成 ${events.task_created} 次 · 请求导出任务 ${events.task_exported} 次 · 请求导出反馈 ${events.feedback_exported} 次。刷新清零，无数据上传；这些数值不是用户数或任务完成数。`;}
  function download(text,name,type){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  let current=null;
  $('task-form').addEventListener('submit',event=>{event.preventDefault();try{const question=$('task-question').value,route=$('task-route').value;const markdown=makeTask(question,route);current={id:'attempt_'+crypto.randomUUID(),question:question.trim(),route,markdown};$('task-preview').textContent=markdown;$('task-output').hidden=false;$('task-status').textContent='任务单已生成。请实际执行后再填写反馈。';$('feedback-evidence').value='';$('feedback-status').textContent='';measure('task_created');}catch(err){$('task-status').textContent=err.message;}});
  $('task-download').addEventListener('click',()=>{if(!current)return;download(current.markdown,'codebase-task.md','text/markdown;charset=utf-8');measure('task_exported');$('task-status').textContent='已请求浏览器下载任务单；请检查下载结果。';});
  $('feedback-form').addEventListener('submit',event=>{event.preventDefault();if(!current)return;const result=$('feedback-result').value,evidence=$('feedback-evidence').value.trim();if(!evidence || !['completed','blocked','abandoned'].includes(result)){$('feedback-status').textContent='请填写实际证据或阻碍。';return;}const record={id:current.id,result,evidence,route:current.route,question:current.question,recordedAt:new Date().toISOString()};download(JSON.stringify(record,null,2)+'\n','task-feedback.json','application/json');measure('feedback_exported');$('feedback-status').textContent='已请求下载反馈，尚未提交。请交给负责人核验后追加到反馈文件；同一尝试保留一个 ID。';});
  renderMetrics();
})();
