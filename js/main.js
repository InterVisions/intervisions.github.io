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

// Workshop image carousel — state keyed by carousel element
const _carousels = new Map();

function _carouselState(carousel) {
  if (!_carousels.has(carousel)) {
    const imgs = Array.from(carousel.querySelectorAll('.carousel-track img'));
    if (!imgs.length) return null;
    let active = imgs.findIndex(img => img.classList.contains('carousel-active'));
    if (active === -1) { active = 0; imgs[0].classList.add('carousel-active'); }
    _carousels.set(carousel, { imgs, current: active });
  }
  return _carousels.get(carousel);
}

// Activate first image in every carousel on load
document.querySelectorAll('.tool3-carousel .carousel-track img:first-child')
  .forEach(img => img.classList.add('carousel-active'));

// Event delegation — works even if DOM is modified after init
document.addEventListener('click', e => {
  const btn = e.target.closest('.carousel-btn');
  if (!btn) return;
  const carousel = btn.closest('.tool3-carousel');
  if (!carousel) return;
  const state = _carouselState(carousel);
  if (!state) return;
  const dir = btn.classList.contains('carousel-btn--prev') ? -1 : 1;
  state.imgs[state.current].classList.remove('carousel-active');
  state.current = (state.current + dir + state.imgs.length) % state.imgs.length;
  state.imgs[state.current].classList.add('carousel-active');
});
