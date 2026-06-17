'use strict';

/* ============================================================
   render.js
   Mengurus tampilan kartu-kartu kos di halaman listing.

   Bergantung pada: helpers.js (escHtml, formatRupiah)
                    state.js   (cardSlideIndex)
                    modal.js   (openModal) ← dipanggil saat kartu diklik
   ============================================================ */

// Tampilkan semua kartu dari array `list` ke dalam grid
function renderCards(list) {
  const listingGrid = document.getElementById('listing-grid');
  const emptyState  = document.getElementById('empty-state');

  listingGrid.innerHTML = ''; // kosongkan grid dulu

  if (list.length === 0) {
    emptyState.style.display = 'block'; // tampilkan pesan "tidak ada hasil"
    return;
  }

  emptyState.style.display = 'none';
  list.forEach(kos => {
    cardSlideIndex[kos.id] = 0;              // mulai dari foto pertama
    listingGrid.appendChild(buildCard(kos)); // tambahkan kartu ke grid
  });
}

// Buat satu elemen kartu HTML untuk data kos tertentu
function buildCard(kos) {
  const card = document.createElement('div');
  card.className = 'kos-card';
  card.setAttribute('data-id', kos.id);

  const photos = kos.photos && kos.photos.length ? kos.photos : [];

  // Buat HTML slide foto (atau placeholder jika foto kosong)
  let slidesHTML = '';
  if (photos.length > 0) {
    photos.forEach(url => {
      slidesHTML += `<div class="card-slide" style="background-image:url('${escHtml(url)}')"></div>`;
    });
  } else {
    slidesHTML = `
      <div class="card-slide placeholder">
        <span class="ph-icon">🏠</span>
        <p>Foto belum tersedia</p>
      </div>`;
  }

  // Tombol panah kiri/kanan (hanya tampil jika foto > 1)
  const navBtns = photos.length > 1
    ? `<button class="card-slide-btn prev-btn" data-dir="prev">&#8592;</button>
       <button class="card-slide-btn next-btn" data-dir="next">&#8594;</button>`
    : '';

  // Titik indikator slide
  let dotsHTML = '';
  if (photos.length > 1) {
    photos.forEach((_, i) => {
      dotsHTML += `<div class="card-dot ${i === 0 ? 'active' : ''}" data-dot="${i}"></div>`;
    });
  }

  // Rakit semua bagian menjadi HTML kartu
  card.innerHTML = `
    <div class="card-slideshow">
      <div class="card-slide-track">${slidesHTML}</div>
      ${navBtns}
      <div class="card-dot-row">${dotsHTML}</div>
      <div class="card-badge">${escHtml(kos.type)}</div>
    </div>
    <div class="card-body" data-open="${kos.id}">
      <p class="card-area">${escHtml(kos.area)}</p>
      <p class="card-name">${escHtml(kos.name)}</p>
      <p class="card-price">${formatRupiah(kos.price)}<span>/ bulan</span></p>
    </div>
  `;

  // Ambil referensi elemen slide di dalam kartu ini
  const track = card.querySelector('.card-slide-track');
  const dots  = card.querySelectorAll('.card-dot');

  // Fungsi lokal: geser ke slide index tertentu
  function goSlide(idx) {
    cardSlideIndex[kos.id] = idx;
    track.style.transform = `translateX(-${idx * 100}%)`; // geser track ke kiri
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  // Event: tombol panah kiri / kanan
  card.querySelectorAll('.card-slide-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation(); // cegah klik membuka modal
      const dir = btn.getAttribute('data-dir');
      let idx = cardSlideIndex[kos.id] || 0;
      idx = dir === 'next'
        ? (idx + 1) % photos.length
        : (idx - 1 + photos.length) % photos.length;
      goSlide(idx);
    });
  });

  // Event: klik titik indikator
  dots.forEach((dot, i) => {
    dot.addEventListener('click', e => { e.stopPropagation(); goSlide(i); });
  });

  // Event: klik area body kartu → buka modal
  card.querySelector('.card-body').addEventListener('click', () => openModal(kos.id));

  // Event: klik area foto → buka modal (kecuali klik tombol/titik)
  card.querySelector('.card-slideshow').addEventListener('click', e => {
    if (e.target.classList.contains('card-slide-btn') || e.target.classList.contains('card-dot')) return;
    openModal(kos.id);
  });

  return card;
}

// Perbarui angka jumlah properti di stats bar
function updateStat() {
  document.getElementById('stat-total').textContent = allKos.length;
}