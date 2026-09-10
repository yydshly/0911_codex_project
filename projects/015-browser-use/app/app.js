(function(){
  'use strict';
  const byId = id => document.getElementById(id);
  let scenario='success', index=0;
  function render(){
    const value=BrowserUseLesson.state(scenario,index), step=value.step;
    index=value.index;
    byId('step-count').textContent=`${index+1} / ${value.total}`;
    byId('step-list').replaceChildren(...value.stages.map((s,i)=>{
      const li=document.createElement('li'),button=document.createElement('button');
      button.type='button';button.textContent=`${i+1} ${s.title}`;
      if(i===index)button.setAttribute('aria-current','step');
      button.addEventListener('click',()=>{index=i;render();});li.append(button);return li;
    }));
    byId('model-message').textContent=step.model;
    byId('program-message').textContent=step.program;
    byId('step-title').textContent=`${index+1}. ${step.title}`;
    byId('step-explanation').textContent=step.explanation;
    byId('mock-input').textContent=step.filled?'无线耳机':'搜索商品';
    byId('mock-input').classList.toggle('filled',Boolean(step.filled));
    byId('mock-pointer').classList.toggle('visible',Boolean(step.pointer));
    byId('mock-button').classList.toggle('pressed',Boolean(step.pressed));
    byId('mock-result').className='mock-result '+(step.result||'');
    byId('mock-result').textContent=step.result==='success'?'商品 A · 199 元\n商品 B · 299 元（均为示意）':step.result==='error'?'页面已更新，旧按钮引用失效。':'尚未显示搜索结果';
    byId('prev').disabled=index===0;byId('next').disabled=index===value.total-1;
  }
  byId('prev').addEventListener('click',()=>{index--;render();});
  byId('next').addEventListener('click',()=>{index++;render();});
  byId('reset').addEventListener('click',()=>{index=0;render();});
  byId('scenario').addEventListener('change',event=>{scenario=event.target.value;index=0;render();});
  render();
})();
