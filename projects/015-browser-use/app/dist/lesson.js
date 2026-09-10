(function(root){
  'use strict';
  const stages = [
    {title:'读取页面',model:'模型还没有收到当前页面。',program:'通过 CDP 读取：\n页面结构、布局、无障碍信息\n以及可选截图。',explanation:'浏览器原本就知道页面由什么组成。程序读取这些信息，而不是让模型凭空猜测网页。'},
    {title:'提供上下文',model:'任务：搜索无线耳机\n[1] 输入框：搜索商品\n[2] 按钮：搜索\n可用动作：输入、点击、读取',program:'整理网页信息。\n维护编号映射：\n1 → 真实输入框节点\n2 → 真实搜索按钮节点',explanation:'像给模型发一份页面说明，再附可选截图。编号由框架添加，是后续定位的引用。'},
    {title:'模型选动作',model:'动作意图：\n向元素 1 输入“无线耳机”\n点击元素 2',program:'接收模型结构化输出。\n解析动作，校验参数，\n准备调用输入与点击工具。',explanation:'模型负责判断下一步，程序负责执行。这里显示简化动作意图，实际运行会使用可解析的结构化格式。'},
    {title:'程序输入',model:'已提出输入与点击动作。\n等待程序执行结果。',program:'定位输入框 1 → 聚焦\n执行文字输入\n核对输入后的页面状态。',filled:true,explanation:'输入也由程序完成。它让输入框获得焦点，再通过输入机制写入文字；网页可能自动格式化输入。'},
    {title:'定位按钮',model:'选中的目标：元素 2。',program:'编号 2 → 当前按钮节点\n必要时滚动 → 读取区域\n示意点击点：(420, 180)\n坐标相对页面视口。',filled:true,explanation:'元素点击中，模型选择编号，程序查找真实节点并确定点击位置。这里的坐标只是示意，与左边绘制的位置不作像素对应。'},
    {title:'模拟移动',model:'模型没有移动系统鼠标。',program:'CDP / Input.dispatchMouseEvent\ntype: mouseMoved\nx: 420, y: 180',filled:true,pointer:true,explanation:'程序向浏览器发送鼠标移动事件。左边的橙色指针只是事件位置示意，桌面系统指针不一定会移动。'},
    {title:'按下与松开',model:'等待点击后的反馈。',program:'CDP 鼠标输入：\nmousePressed / 左键\nmouseReleased / 左键\n位置：(420, 180)',filled:true,pointer:true,pressed:true,explanation:'浏览器收到按下与松开事件，网页按自己的逻辑处理点击。发出了事件仍不能保证搜索成功。'},
    {title:'浏览器响应',model:'程序准备发送新页面。',program:'网页执行搜索逻辑。\n程序重新读取页面与结果，\n整理给模型。',filled:true,result:'success',explanation:'本例预设商品列表出现。在真实网站中也可能遇到登录、请求失败或页面变化，所以必须重新观察。'},
    {title:'检查结果',model:'看到了商品列表与价格。\n可继续提取、比较，\n或按用户要求结束。',program:'检查结果是否满足目标。\n保留来源与执行记录；\n未完成时说明原因。',filled:true,result:'success',explanation:'观察结果才知道任务是否推进。这里所有商品与价格都是教学预设，没有调用真实网站或模型。'}
  ];
  const stale = stages.slice(0,5).concat([
    {title:'旧目标失效',model:'收到反馈：旧按钮已失效。',program:'准备点击时发现：\n节点已脱离或引用失效。\n停止使用旧位置。',filled:true,result:'error',explanation:'页面更新可能替换按钮，旧编号或位置不能继续假定有效。这个分支用于解释为什么要重新观察。'},
    {title:'刷新定位',model:'新页面说明：\n[8] 按钮：搜索\n下一步：点击元素 8。',program:'重新获取页面状态。\n建立新编号映射。\n重新计算当前点击点。',filled:true,explanation:'新的编号和坐标来自新的页面状态。重新定位后再尝试，不是对着旧位置反复点击。'},
    {...stages[6],title:'再次执行',program:'使用刷新后的目标位置：\nmouseMoved\nmousePressed\nmouseReleased',explanation:'程序用新定位重新发送移动、按下和松开。示例预设重试成功；真实任务仍受失败次数与步骤限制。'},
    stages[8]
  ]);
  function state(scenario,index){
    if(!['success','stale'].includes(scenario)) throw new Error('未知教学分支');
    const list = scenario==='stale'?stale:stages;
    const position = Math.max(0,Math.min(list.length-1,Number.isFinite(index)?Math.trunc(index):0));
    return {scenario,index:position,total:list.length,stages:list,step:list[position]};
  }
  root.BrowserUseLesson = Object.freeze({state});
})(typeof globalThis!=='undefined'?globalThis:this);
