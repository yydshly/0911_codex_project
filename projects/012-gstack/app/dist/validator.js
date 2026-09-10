(function (root) {
  'use strict';
  const number = value => typeof value === 'string' && /^\d{3,}$/.test(value) && Number.isSafeInteger(Number(value)) && Number(value) > 0;
  function upstreamKey(value) {
    if (typeof value !== 'string') return null;
    try {
      const u = new URL(value);
      if (u.protocol !== 'https:' || u.hostname.toLowerCase() !== 'github.com' || u.username || u.password || u.port) return null;
      const parts = u.pathname.replace(/\/+$/, '').slice(1).split('/');
      if (parts.length !== 2 || !/^[a-z\d-]+$/i.test(parts[0])) return null;
      const repo = parts[1].replace(/\.git$/i, '');
      if (!repo || !/^[a-z\d_.-]+$/i.test(repo) || repo === '.' || repo === '..') return null;
      return `${parts[0]}/${repo}`.toLowerCase();
    } catch { return null; }
  }
  function https(value) {
    try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password; } catch { return false; }
  }
  function validate(input) {
    const issues = [];
    const add = (row, code, severity, message, suggestion) => issues.push({ row, code, severity, message, suggestion });
    if (!Array.isArray(input)) return { ok: false, count: 0, researchCount: 0, issues: [{ row: 0, code: 'INPUT_ARRAY', severity: 'error', message: '输入必须是项目数组。', suggestion: '使用方括号包裹项目记录。' }] };
    if (input.length > 2000) return { ok: false, count: input.length, researchCount: 0, issues: [{ row: 0, code: 'INPUT_LIMIT', severity: 'error', message: '一次最多检查 2000 条记录。', suggestion: '请按研究批次拆分。' }] };
    const byIndex = new Map(), byUpstream = new Map(), directories = new Set();
    let previous = 0;
    input.forEach((p, i) => {
      const row = i + 1;
      if (!p || typeof p !== 'object' || Array.isArray(p)) { add(row, 'ROW_OBJECT', 'error', '项目记录必须是对象。', '检查本条 JSON 格式。'); return; }
      if (typeof p.name !== 'string' || !p.name.trim()) add(row, 'NAME_REQUIRED', 'error', '缺少项目名称。', '补充非空名称。');
      const validIndex = number(p.researchIndex), index = validIndex ? Number(p.researchIndex) : null;
      if (!validIndex) add(row, 'INDEX_FORMAT', 'error', '研究索引必须是至少三位的正整数字符串。', '例如 "011"；索引不等于目录编号。');
      if (validIndex) {
        if (index < previous) add(row, 'INDEX_ORDER', 'warning', '研究索引没有按数值升序排列。', '保留编号，调整展示顺序。');
        previous = index;
      }
      const directoryValid = typeof p.directory === 'string' && /^\d{3,}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.directory) && number(p.directory.split('-')[0]);
      if (!directoryValid) add(row, 'DIRECTORY_FORMAT', 'error', '目录须采用 NNN-slug 格式，且不能含路径跳转。', '例如 012-gstack；本工具只接受单个目录名。');
      else if (directories.has(p.directory)) add(row, 'DIRECTORY_DUPLICATE', 'error', '历史目录被重复使用。', '不同存储条目使用不同目录；保留历史目录编号。');
      else directories.add(p.directory);
      const key = upstreamKey(p.upstream);
      if (!key) add(row, 'UPSTREAM_FORMAT', 'error', '原库应是 HTTPS GitHub 仓库首页。', '使用 https://github.com/owner/repo，不填子页面或携带账户信息的地址。');
      if (key && validIndex) {
        if (byUpstream.has(key) && byUpstream.get(key) !== index) add(row, 'UPSTREAM_DUPLICATE', 'error', '同一原库占用了不同研究索引。', '将研究与配套演示归入同一个研究索引。');
        if (byIndex.has(index) && byIndex.get(index) !== key) add(row, 'INDEX_CONFLICT', 'error', '同一研究索引对应了不同原库。', '为新原库分配新的稳定研究索引。');
        if (!byUpstream.has(key)) byUpstream.set(key, index);
        if (!byIndex.has(index)) byIndex.set(index, key);
      }
      if (!['not-deployed', 'local', 'published'].includes(p.demoStatus)) add(row, 'STATUS_INVALID', 'error', '演示状态无法识别。', '使用 not-deployed、local 或 published。');
      if (p.demoStatus === 'published') {
        if (!https(p.demoUrl)) add(row, 'DEPLOY_URL', 'error', '标为已发布但没有有效的 HTTPS 演示地址。', '补充真实地址，或改为本地/未部署。');
        const e = p.verification;
        if (!e || typeof e !== 'object' || typeof e.checkedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}T/.test(e.checkedAt) || !Number.isFinite(Date.parse(e.checkedAt)) || !/^[a-f\d]{40}$/i.test(e.commit || '')) {
          add(row, 'DEPLOY_EVIDENCE', 'error', '已发布声明缺少完整的检查时间和提交证据。', '记录 ISO 检查时间与 40 位提交；填写字段仍不等于线上验证。');
        }
        add(row, 'REMOTE_UNVERIFIED', 'warning', '本地规则检查不会验证远程网页或提交真伪。', '发布前仍需访问页面、检查资源并核对部署提交。');
      }
      if (p.imageKind && !['screenshot', 'diagram', 'generated', 'none'].includes(p.imageKind)) add(row, 'IMAGE_KIND', 'error', '图片性质无法识别。', '区分真实截图、示意图、生成图或无图片。');
      if (p.imageKind === 'screenshot' && (typeof p.imageEvidence !== 'string' || !p.imageEvidence.trim())) add(row, 'IMAGE_EVIDENCE', 'warning', '截图缺少来源说明。', '补充截图对象、时间与版本；工具不会读取图片内容。');
    });
    return { ok: !issues.some(x => x.severity === 'error'), count: input.length, researchCount: byUpstream.size, issues };
  }
  const api = { validate, upstreamKey };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ResearchValidator = api;
})(typeof window !== 'undefined' ? window : globalThis);
