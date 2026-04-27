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
document.querySelectorAll('.tool3-carousel').forEach(carousel => {
  const imgs = Array.from(carousel.querySelectorAll('.carousel-track img'));
  if (!imgs.length) return;
  let current = 0;
  imgs[0].classList.add('carousel-active');

  function show(n) {
    imgs[current].classList.remove('carousel-active');
    current = (n + imgs.length) % imgs.length;
    imgs[current].classList.add('carousel-active');
  }

  carousel.querySelector('.carousel-btn--prev').addEventListener('click', () => show(current - 1));
  carousel.querySelector('.carousel-btn--next').addEventListener('click', () => show(current + 1));
});
