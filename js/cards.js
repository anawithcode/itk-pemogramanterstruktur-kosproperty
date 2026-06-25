/* ── RENDER CARDS ────────────────────────────────────────────── */
function renderCards(list) {
  listingGrid.innerHTML = '';

  if (list.length === 0) {
    emptyState.style.display = 'block';
    return;
  }
  emptyState.style.display = 'none';

  list.forEach((kos, index) => {
    cardSlideIndex[kos.id] = 0;
    const card = buildCard(kos, index);
    listingGrid.appendChild(card);
  });
}

function buildCard(kos, index) {
  const card = document.createElement('div');
  card.className = 'kos-card';
  if (likes.includes(kos.id)) card.classList.add('liked');
  card.setAttribute('data-id', kos.id);
  card.style.animationDelay = `${index * 0.1}s`;

  const photos = kos.photos && kos.photos.length ? kos.photos : [];
  const isLiked = likes.includes(kos.id);

  let slidesHTML = '';
  if (photos.length > 0) {
    photos.forEach(url => {
      slidesHTML += `<div class="card-slide" style="background-image:url('${escHtml(url)}')" loading="lazy"></div>`;
    });
  } else {
    slidesHTML = `
      <div class="card-slide placeholder">
        <span class="ph-icon">🏠</span>
        <p>Foto belum tersedia</p>
      </div>`;
  }

  let dotsHTML = '';
  if (photos.length > 1) {
    photos.forEach((_, i) => {
      dotsHTML += `<div class="card-dot ${i === 0 ? 'active' : ''}" data-dot="${i}"></div>`;
    });
  }

  const navBtns = photos.length > 1
    ? `<button class="card-slide-btn prev-btn" data-dir="prev">&#10094;</button>
       <button class="card-slide-btn next-btn" data-dir="next">&#10095;</button>`
    : '';

  card.innerHTML = `
    <div class="card-slideshow" data-swipe="card">
      <div class="card-slide-track">${slidesHTML}</div>
      ${navBtns}
      <div class="card-dot-row">${dotsHTML}</div>
      <div class="card-badge">${escHtml(kos.type)}</div>
      <div class="like-indicator">♥</div>
      ${photos.length > 1 ? '<div class="swipe-indicator"><span>← geser →</span></div>' : ''}
    </div>
    <div class="card-body" data-open="${kos.id}">
      <p class="card-area">${escHtml(kos.area)}</p>
      <p class="card-name">${escHtml(kos.name)}</p>
      <p class="card-price">${formatRupiah(kos.price)}<span>/ bulan</span></p>
    </div>
  `;

  const track = card.querySelector('.card-slide-track');
  const dots  = card.querySelectorAll('.card-dot');
  const slideshow = card.querySelector('.card-slideshow');

  function goSlide(idx) {
    cardSlideIndex[kos.id] = idx;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  card.querySelectorAll('.card-slide-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dir = btn.getAttribute('data-dir');
      let idx = cardSlideIndex[kos.id] || 0;
      if (dir === 'next') idx = (idx + 1) % photos.length;
      else idx = (idx - 1 + photos.length) % photos.length;
      goSlide(idx);
    });
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      goSlide(i);
    });
  });

  // SWIPE GESTURE on card slideshow
  if (photos.length > 1) {
    initSwipe(slideshow, (dir) => {
      let idx = cardSlideIndex[kos.id] || 0;
      if (dir === 'left') idx = (idx + 1) % photos.length;
      else idx = (idx - 1 + photos.length) % photos.length;
      goSlide(idx);
    });
  }

  // DOUBLE TAP TO LIKE
  let lastTap = 0;
  slideshow.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTap < 300) {
      e.preventDefault();
      const isNowLiked = toggleLike(kos.id);
      if (isNowLiked) {
        card.classList.add('liked');
        showToast('Ditambahkan ke favorit!');
      } else {
        card.classList.remove('liked');
        showToast('Dihapus dari favorit');
      }
    }
    lastTap = now;
  });

  // Open detail
  card.querySelector('.card-body').addEventListener('click', () => openDetailModal(kos.id));
  card.querySelector('.card-slideshow').addEventListener('click', (e) => {
    if (e.target.classList.contains('card-slide-btn') ||
        e.target.classList.contains('card-dot') ||
        e.target.closest('.card-dot')) return;
    openDetailModal(kos.id);
  });

  return card;
}