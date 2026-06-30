// ============================================
// INTERVISIONS — Main JS
// ============================================

// Bio toggle (+Info / -Info)
document.addEventListener('click', e => {
  const btn = e.target.closest('.bio-toggle');
  if (!btn) return;
  e.preventDefault();
  const bio = btn.closest('.member-info').querySelector('.member-bio');
  const expanded = bio.classList.toggle('expanded');
  btn.textContent = expanded ? '-Info' : '+Info';
});

// Workshop image carousel
const AUTO_INTERVAL = 4000;

function _initCarousel(carousel) {
  const imgs = Array.from(carousel.querySelectorAll('.carousel-track img'));
  if (!imgs.length) return;

  imgs[0].classList.add('carousel-active');

  const dotsEl = document.createElement('div');
  dotsEl.className = 'carousel-dots';
  imgs.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Photo ${i + 1}`);
    dotsEl.appendChild(dot);
  });
  carousel.appendChild(dotsEl);

  const state = { current: 0, timer: null };

  const goTo = (index) => {
    imgs[state.current].classList.remove('carousel-active');
    dotsEl.children[state.current].classList.remove('active');
    state.current = ((index % imgs.length) + imgs.length) % imgs.length;
    imgs[state.current].classList.add('carousel-active');
    dotsEl.children[state.current].classList.add('active');
  };

  const startAuto = () => {
    clearInterval(state.timer);
    state.timer = setInterval(() => goTo(state.current + 1), AUTO_INTERVAL);
  };

  carousel.querySelectorAll('.carousel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      goTo(state.current + (btn.classList.contains('carousel-btn--prev') ? -1 : 1));
      startAuto();
    });
  });

  dotsEl.addEventListener('click', e => {
    const dot = e.target.closest('.carousel-dot');
    if (!dot) return;
    const index = Array.from(dotsEl.children).indexOf(dot);
    if (index !== -1) { goTo(index); startAuto(); }
  });

  carousel.addEventListener('mouseenter', () => clearInterval(state.timer));
  carousel.addEventListener('mouseleave', startAuto);

  startAuto();
}

document.querySelectorAll('.tool3-carousel').forEach(carousel => _initCarousel(carousel));
