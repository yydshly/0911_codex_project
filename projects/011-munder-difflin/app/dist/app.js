'use strict';
const steps = [
 ['Agent A','把请求写入自己的发件箱','A 将收件人、请求类型、主题与正文写成 JSON，保存到自己的 outbox。此时消息已经落盘，B 还没有因此开始工作。','agents/A/outbox/消息.json'],
 ['平台路由器','定时扫描并投递文件','路由器默认约每 1.5 秒检查发件箱，解析消息并按收件人投递到 B 的 inbox。主要依靠定时轮询，不是文件变化直接触发模型。','A/outbox → 平台路由 → B/inbox'],
 ['平台提醒队列','发现新消息，排入提醒','界面侧默认约每 4 秒检查收件箱，按消息 ID 识别新消息并排队提醒。入队和真正发送是两个步骤，发送前还会复查消息是否仍待处理。','B/inbox → 新消息 ID → 提醒队列'],
 ['平台状态与投递控制','等待适合输入的时机','生命周期事件与终端活动帮助判断忙闲。正在执行、暂停、启动阶段或用户交互等状态会影响投递；不同引擎的事件适配深度不一致。','工具事件 / Stop / 通知 + 终端活动 → 判断时机'],
 ['平台终端输入','向仍在运行的 Agent 提交提醒','满足投递条件后，平台通过伪终端输入“你有新的收件箱消息，请读取并处理”再提交，相当于输入提示词并按回车。主进程还有约 15 秒一次的工作 Agent 检查补充。','提醒文字 → CLI 终端输入 → 下一轮执行'],
 ['Agent B','读文件，完成操作，再回复','B 用工具读取 inbox，让模型理解请求并执行检查；处理后将消息移到 inbox/.done，需要回复时写入自己的 outbox，再由平台送回 A。消息归档并不能证明检查结论正确。','B/inbox → 工具与模型 → B/outbox → A/inbox']
];
for (const button of document.querySelectorAll('[data-step]')) button.addEventListener('click', () => {
 const [actor,title,body,path] = steps[Number(button.dataset.step)];
 document.getElementById('step-actor').textContent='执行者：'+actor;
 document.getElementById('step-title').textContent=title;
 document.getElementById('step-body').textContent=body;
 document.getElementById('step-path').textContent=path;
 for (const other of document.querySelectorAll('[data-step]')) other.setAttribute('aria-pressed',String(other===button));
});
