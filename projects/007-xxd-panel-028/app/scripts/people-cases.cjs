// Source photos selected for the user's requested wedding and everyday-life demonstrations.
const run = '20260910-people-scenes-02';
const cases = {
  wedding: { order: '005', source: 'wedding.jpg', mode: 'top-bottom', contract: 'TOP_BOTTOM', ratio: '2:3', size: '1024x1536', title: '婚纱双人照 · 婚礼纪念', purpose: '观察双人对望、婚纱与礼服能否形成可辨识的纪念插画', creator: 'ömer çelik / Pexels', photoId: '17542182', creditSlug: 'omer', page: 'bride-and-groom-standing-close-together-and-looking-at-each-other-17542182' },
  family: { order: '006', source: 'family.jpg', mode: 'left-right', contract: 'LEFT_RIGHT', ratio: '3:2', size: '1536x1024', title: '亲子一起做饭 · 家庭生活', purpose: '观察多人互动、操作台和日常动作如何被概括', creator: 'Vanessa Loring / Pexels', photoId: '5082212', creditSlug: 'vanessa-loring', page: 'a-family-preparing-food-together-in-the-kitchen-5082212' },
  beach: { order: '007', source: 'beach.jpg', mode: 'design-only', contract: 'DESIGN_ONLY', ratio: '1:1', size: '1024x1024', title: '伴侣海边散步 · 旅行记忆', purpose: '观察牵手关系、步态与海岸环境的纯设计转译', creator: 'Kampus Production / Pexels', photoId: '6180470', creditSlug: 'kampus', page: 'a-couple-walking-on-the-beach-6180470' }
};
for (const item of Object.values(cases)) {
  item.license = 'Pexels License（非 CC0）；来源页与许可链接见运行记录';
  item.inputUrl = `https://images.pexels.com/photos/${item.photoId}/pexels-photo-${item.photoId}.jpeg?cs=srgb&dl=pexels-${item.creditSlug}-${item.photoId}.jpg&fm=jpg`;
  item.inputDocumentation = `https://www.pexels.com/photo/${item.page}/`;
  item.licenseUrl = 'https://www.pexels.com/license/';
}
module.exports = { run, cases };
