const header = document.querySelector('[data-header]');
const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 30), { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach((item) => revealObserver.observe(item));

const tabs = [...document.querySelectorAll('[data-screen]')];
const image = document.querySelector('[data-screen-image]');
const title = document.querySelector('[data-screen-title]');
const copy = document.querySelector('[data-screen-copy]');

function activateTab(tab) {
  tabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
  image.classList.add('changing');
  window.setTimeout(() => {
    image.src = `assets/${tab.dataset.screen}`;
    image.alt = `Prévia da tela ${tab.textContent.trim()} do FitWay`;
    title.textContent = tab.dataset.title;
    copy.textContent = tab.dataset.copy;
    image.classList.remove('changing');
  }, 180);
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const offset = event.key === 'ArrowRight' ? 1 : -1;
    const next = tabs[(index + offset + tabs.length) % tabs.length];
    next.focus();
    activateTab(next);
  });
});

if (matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelector('.hero-visual')?.addEventListener('pointermove', (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    document.querySelectorAll('[data-tilt]').forEach((phone) => {
      const base = Number(phone.dataset.tilt);
      phone.style.transform = `rotate(${base + x * 2}deg) translate(${x * 6}px, ${y * 6}px)`;
    });
  });
}
