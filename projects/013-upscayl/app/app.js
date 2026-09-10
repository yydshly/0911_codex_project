'use strict';
document.getElementById('print').addEventListener('click', () => window.print());
const links = [...document.querySelectorAll('.contents a')];
function markCurrent() {
  const hash = window.location.hash || '#overview';
  links.forEach(link => {
    if (link.getAttribute('href') === hash) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('hashchange', markCurrent);
markCurrent();
