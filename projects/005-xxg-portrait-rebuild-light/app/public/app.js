'use strict';
(() => {
  const data = window.PORTRAIT_DATA;
  const byId = id => document.getElementById(id);
  let currentRecipe = data.recipes[0];
  const galleryButtons = [];
  const recipeButtons = [];
  function selectExample(example, index) {
    galleryButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    byId('example-image').src = 'assets/' + example.image;
    byId('example-image').alt = '上游' + example.title + '对比图：左侧为作者标注的原图，其余为展示效果';
    byId('full-image').href = 'assets/' + example.image;
    byId('source-image').href = 'https://github.com/moskoo/xxg-portrait-rebuild-light/blob/' + data.commit + '/assets/' + example.image;
    byId('example-title').textContent = example.title;
    byId('example-description').textContent = example.description;
    byId('example-count').textContent = String(index + 1).padStart(2, '0') + ' / 04';
  }
  data.examples.forEach((example, index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = example.label;
    button.setAttribute('aria-controls', 'example-image');
    button.addEventListener('click', () => selectExample(example, index));
    galleryButtons.push(button); byId('gallery-controls').append(button);
  });
  function selectRecipe(recipe, index) {
    currentRecipe = recipe;
    recipeButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    ['scope', 'title', 'intent', 'change', 'preserve', 'use', 'audit', 'code'].forEach(field => { byId('recipe-' + field).textContent = recipe[field]; });
    byId('recipe-prompt').textContent = window.compilePortraitPrompt(recipe);
    byId('copy-status').textContent = '';
  }
  data.recipes.forEach((recipe, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    const number = document.createElement('span'); number.textContent = String(index + 1).padStart(2, '0');
    button.append(number, document.createTextNode(recipe.label));
    button.setAttribute('aria-controls', 'recipe-title');
    button.addEventListener('click', () => selectRecipe(recipe, index));
    recipeButtons.push(button); byId('recipe-controls').append(button);
  });
  byId('copy-prompt').addEventListener('click', async () => {
    const recipe = currentRecipe;
    try {
      await navigator.clipboard.writeText(window.compilePortraitPrompt(recipe));
      if (currentRecipe === recipe) byId('copy-status').textContent = '已复制，请与原始人像一起使用。';
    } catch {
      if (currentRecipe === recipe) byId('copy-status').textContent = '浏览器未允许复制，请选中上方文字手动复制。';
    }
  });
  selectExample(data.examples[0], 0); selectRecipe(currentRecipe, 0);
})();
