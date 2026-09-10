(function () {
  'use strict';
  const scenes = {
    success: {title:'正常返回',route:'选取模型 A 的可用路线',model:'实际模型 A',desc:'完成推理，生成回答',back:'网关转换返回格式，同时记录额度与调用表现。',steps:['应用提交消息和调用参数。','候选 A 符合能力要求，密钥健康且有额度。','适配器调用 A，网关整理回答并返回。','记录消耗、耗时与成功状态，供后续路由参考。'],result:'返回回答',note:'调用成功，任务结果仍由应用或 Agent 验收。',warn:false},
    limited: {title:'主路线限流',route:'A 返回 429 → 冷却 A → 在预算内选取 B',model:'实际模型 B',desc:'在本教学场景中，B 符合能力且调用成功',back:'网关返回 B 的回答；实际路线应可追溯。',steps:['A 通过本地预检，但上游实际额度已触顶。','尚未提交有效输出，429 可以进入回退流程。','记录冷却，检查重试预算，再选择可用候选 B。','B 返回回答；若换了模型，结果质量仍需重新验收。'],result:'有条件地回退成功',note:'其他候选也可能失败；这个示例不表示真实请求一定成功。',warn:false},
    exhausted: {title:'全部不可用',route:'检查候选 → 没有符合当前额度与健康条件的路线',model:'未发起模型调用',desc:'本场景在选路阶段发现候选均不可用',back:'网关返回明确错误，客户端决定等待或调整配置。',steps:['应用提交请求。','检查候选 A、B 的能力、额度与冷却状态。','没有可用路线，结束本轮选择。','返回候选耗尽的错误；不是无限轮询或虚构回答。'],result:'返回错误',note:'错误类别和可用的重试时间取决于实际原因。',warn:true},
    stream: {title:'输出后中断',route:'A 已提交流式内容 → 上游中断 → 停止隐式回退',model:'模型 A 的流式连接中断',desc:'客户端已经接收了一部分回答',back:'网关返回流式错误；应用或 Agent 负责恢复。',steps:['网关选取 A 并开始流式返回。','有效内容已经发送给客户端。','上游连接发生故障，不能再透明切换模型。','返回流式错误，避免把 B 的回答静默接在 A 后面。'],result:'部分内容 + 流式错误',note:'恢复需要客户端保留上下文、工具结果和任务状态。',warn:true}
  };
  function show(key) {
    const scene = scenes[key];
    if (!scene) return;
    document.querySelectorAll('[data-scenario]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.scenario === key)));
    const fields = {'trace-title':scene.title,'route-state':scene.route,'model-title':scene.model,'model-desc':scene.desc,'return-copy':scene.back};
    Object.entries(fields).forEach(([id,value]) => { document.getElementById(id).textContent=value; });
    const list=document.getElementById('trace-list');
    list.replaceChildren(...scene.steps.map(step => {const item=document.createElement('li');item.textContent=step;return item;}));
    const outcome=document.getElementById('outcome');
    outcome.classList.toggle('warn',scene.warn);
    outcome.querySelector('b').textContent=scene.result;
    outcome.querySelector('p').textContent=scene.note;
  }
  document.querySelectorAll('[data-scenario]').forEach(button => button.addEventListener('click',() => show(button.dataset.scenario)));
}());
