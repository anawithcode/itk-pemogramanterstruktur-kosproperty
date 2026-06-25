/* ── FORMAT RUPIAH ────────────────────────────────────────────── */
function formatRupiah(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── STAT COUNTER ─────────────────────────────────────────────── */
function updateStat() {
  statTotal.textContent = allKos.length;
}

function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-target')) || allKos.length;
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);
      el.textContent = current + (el.getAttribute('data-target') === '100' ? '' : '');
      if (progress < 1) requestAnimationFrame(update);
      else if (el.getAttribute('data-target') === '100') el.textContent = '100%';
    }
    requestAnimationFrame(update);
  });
}

/* ══════════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════════ */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ── SWIPE HANDLER ───────────────────────────────────────────── */
function initSwipe(element, callback) {
  let startX = 0, startY = 0, isSwiping = false;

  element.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isSwiping = true;
  }, { passive: true });

  element.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    const diffX = startX - x;
    const diffY = startY - y;

    // Prevent vertical scroll if horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY)) {
      e.preventDefault();
    }
  }, { passive: false });

  element.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    isSwiping = false;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      callback(diff > 0 ? 'left' : 'right');
    }
  });
}