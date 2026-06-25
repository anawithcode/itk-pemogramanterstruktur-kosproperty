/* ── INIT ────────────────────────────────────────────────────── */
function init() {
  // Simulate loading
  setTimeout(() => {
    renderCards(allKos);
    updateStat();
    animateCounters();
  }, 800);

  bindEvents();
  initScrollReveal();
  initParallax();
  initNavbarScroll();
}

/* ══════════════════════════════════════════════════════════════
   BIND EVENTS
══════════════════════════════════════════════════════════════ */
function bindEvents() {
  btnFilter.addEventListener('click', applyFilter);
  btnReset.addEventListener('click', resetFilter);

  [filterArea, filterPrice, filterType].forEach(el => {
    el.addEventListener('change', applyFilter);
  });

  closeDetail.addEventListener('click', () => {
    modalDetail.classList.remove('open');
    document.body.style.overflow = '';
  });

  detailPrev.addEventListener('click', () => {
    const idx = (detailCurrentSlide - 1 + detailSlideCount) % detailSlideCount;
    goDetailSlide(idx);
  });
  detailNext.addEventListener('click', () => {
    const idx = (detailCurrentSlide + 1) % detailSlideCount;
    goDetailSlide(idx);
  });

  // Like button in modal
  likeBtn.addEventListener('click', () => {
    if (!activeDetailId) return;
    const isLiked = toggleLike(activeDetailId);
    likeBtn.classList.toggle('active', isLiked);
    
    // Update card
    const card = document.querySelector(`.kos-card[data-id="${activeDetailId}"]`);
    if (card) card.classList.toggle('liked', isLiked);
    
    showToast(isLiked ? 'Ditambahkan ke favorit!' : 'Dihapus dari favorit');
  });

  // WhatsApp
  btnWa.addEventListener('click', () => {
    const kos = allKos.find(k => k.id === activeDetailId);
    if (!kos) return;
    const text = `Halo, saya tertarik dengan ${kos.name} di ${kos.area} (${formatRupiah(kos.price)}/bulan). Apakah masih tersedia?`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  });

  // Copy info
  btnCopy.addEventListener('click', () => {
    const kos = allKos.find(k => k.id === activeDetailId);
    if (!kos) return;
    const text = `${kos.name}\n${kos.area}\n${kos.type}\n${formatRupiah(kos.price)}/bulan\n${kos.desc}`;
    navigator.clipboard.writeText(text).then(() => showToast('Info disalin ke clipboard!'));
  });

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.style.transform = mobileMenu.classList.contains('open') ? 'rotate(90deg)' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.style.transform = '';
    });
  });

  // Lightbox
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard nav
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      return;
    }
    if (!modalDetail.classList.contains('open')) return;
    
    if (e.key === 'Escape') {
      modalDetail.classList.remove('open');
      document.body.style.overflow = '';
    }
    if (e.key === 'ArrowLeft') {
      const idx = (detailCurrentSlide - 1 + detailSlideCount) % detailSlideCount;
      goDetailSlide(idx);
    }
    if (e.key === 'ArrowRight') {
      const idx = (detailCurrentSlide + 1) % detailSlideCount;
      goDetailSlide(idx);
    }
  });

  // Close modal on overlay click
  modalDetail.addEventListener('click', (e) => {
    if (e.target === modalDetail) {
      modalDetail.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ── START ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', init);