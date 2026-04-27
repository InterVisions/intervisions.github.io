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
