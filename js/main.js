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
const TRANSITION_MS = 450;

function _initCarousel(carousel) {
  const track = carousel.querySelector('.carousel-track');
  const origImgs = Array.from(track.querySelectorAll('img'));
  if (!origImgs.length) return;
  const N = origImgs.length;

  // Build strip: [clones of all] + [originals] + [clones of all]
  // This lets us animate seamlessly past both ends, then silently snap back.
  const strip = document.createElement('div');
  strip.className = 'carousel-strip';
  origImgs.forEach(img => strip.appendChild(img.cloneNode(true)));
  origImgs.forEach(img => strip.appendChild(img));
  origImgs.forEach(img => strip.appendChild(img.cloneNode(true)));
  track.appendChild(strip);

  const allImgs = Array.from(strip.children); // 3N elements

  const dotsEl = document.createElement('div');
  dotsEl.className = 'carousel-dots';
  for (let i = 0; i < N; i++) {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Photo ${i + 1}`);
    dotsEl.appendChild(dot);
  }
  carousel.appendChild(dotsEl);

  // stripIndex: position in allImgs (0..3N-1); starts at N (first original)
  const state = { logical: 0, stripIndex: N, timer: null, snapping: false };

  const centerAt = (si, animate) => {
    const img = allImgs[si];
    const trackW = track.offsetWidth;
    const offset = (trackW - img.offsetWidth) / 2 - img.offsetLeft;
    if (!animate) strip.style.transition = 'none';
    strip.style.transform = `translateX(${offset}px)`;
    if (!animate) requestAnimationFrame(() => { strip.style.transition = ''; });
  };

  const snapCurrentThenGo = (fromSi, toSi) => {
    // Instantly correct the "from" position before animating to "to".
    // This prevents a bad initial transform (caused by images not yet loaded)
    // from making the first transition look like a huge jump.
    const fromImg = allImgs[fromSi];
    const trackW = track.offsetWidth;
    strip.style.transition = 'none';
    strip.style.transform = `translateX(${(trackW - fromImg.offsetWidth) / 2 - fromImg.offsetLeft}px)`;
    requestAnimationFrame(() => {
      strip.style.transition = '';
      centerAt(toSi, true);
    });
  };

  // advance: step forward (+1) or backward (-1) through the strip
  const advance = (dir) => {
    if (state.snapping) return;
    const fromSi = state.stripIndex;
    const newSi = state.stripIndex + dir;
    const newLogical = ((state.logical + dir) % N + N) % N;

    dotsEl.children[state.logical].classList.remove('active');
    dotsEl.children[newLogical].classList.add('active');
    state.logical = newLogical;
    state.stripIndex = newSi;
    snapCurrentThenGo(fromSi, newSi);

    // If we entered a clone section, snap back to the middle copy after the transition
    if (newSi < N || newSi >= 2 * N) {
      state.snapping = true;
      setTimeout(() => {
        state.stripIndex = N + newLogical;
        centerAt(state.stripIndex, false);
        state.snapping = false;
      }, TRANSITION_MS + 10);
    }
  };

  // jumpTo: direct dot-click navigation, always lands in the middle copy
  const jumpTo = (logical) => {
    if (state.snapping) return;
    dotsEl.children[state.logical].classList.remove('active');
    dotsEl.children[logical].classList.add('active');
    state.logical = logical;
    state.stripIndex = N + logical;
    centerAt(state.stripIndex, true);
  };

  requestAnimationFrame(() => centerAt(N, false));
  // ResizeObserver re-centers whenever images finish loading (strip widens)
  // or the track resizes (accordion open, window resize).
  const ro = new ResizeObserver(() => centerAt(state.stripIndex, false));
  ro.observe(strip);
  ro.observe(track);

  const startAuto = () => {
    clearInterval(state.timer);
    state.timer = setInterval(() => advance(+1), AUTO_INTERVAL);
  };

  carousel.querySelectorAll('.carousel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      advance(btn.classList.contains('carousel-btn--prev') ? -1 : +1);
      startAuto();
    });
  });

  dotsEl.addEventListener('click', e => {
    const dot = e.target.closest('.carousel-dot');
    if (!dot) return;
    const index = Array.from(dotsEl.children).indexOf(dot);
    if (index !== -1) { jumpTo(index); startAuto(); }
  });

  carousel.addEventListener('mouseenter', () => clearInterval(state.timer));
  carousel.addEventListener('mouseleave', startAuto);

  startAuto();
}

document.querySelectorAll('.tool3-carousel').forEach(carousel => _initCarousel(carousel));
