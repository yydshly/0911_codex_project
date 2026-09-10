(() => {
  const image=document.getElementById('edit-result');
  const link=document.getElementById('edit-result-link');
  const caption=document.getElementById('edit-caption');
  document.querySelectorAll('[data-edit-image]').forEach(button=>button.addEventListener('click',()=>{
    image.src=button.dataset.editImage;link.href=button.dataset.editImage;
    image.alt=button.dataset.caption;caption.textContent=button.dataset.caption;
    document.querySelectorAll('[data-edit-image]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  }));
})();
