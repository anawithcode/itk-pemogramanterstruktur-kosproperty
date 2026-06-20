'use strict';

/* ============================================================
   modal.js
   Mengurus popup detail kos: membangun struktur HTML-nya,
   mengisi data, menampilkan, menyembunyikan, dan navigasi foto.

   Bergantung pada: helpers.js (escHtml, formatRupiah)
                    state.js   (allKos, _modalSlides, _modalCurrent)
                    config.js  (SLIDE_LABELS, SLIDE_ICONS, SLIDE_COLORS)
   ============================================================ */

/* ------------------------------------------------------------
   buildModal()
   Buat struktur HTML modal dan sisipkan ke halaman.
   Fungsi ini hanya dipanggil SEKALI saat app pertama dijalankan.
   ------------------------------------------------------------ */
function buildModal() {
  if (document.getElementById('kos-modal')) return; // cegah duplikat

  const overlay = document.createElement('div');
  overlay.id = 'kos-modal';
  overlay.className = 'kos-modal-overlay';

  overlay.innerHTML = `
    <div class="kos-modal-box" id="kos-modal-box">

      <!-- Galeri Foto -->
      <div class="kos-modal-slider" id="modal-slider">
        <div class="kos-modal-track" id="modal-track"></div>
        <button class="kos-modal-nav prev" id="modal-prev">&#8592;</button>
        <button class="kos-modal-nav next" id="modal-next">&#8594;</button>
        <div class="kos-modal-dots" id="modal-dots"></div>
        <div class="kos-modal-counter" id="modal-counter"></div>
        <button class="kos-modal-close" id="modal-close" aria-label="Tutup">&#10005;</button>
      </div>

      <!-- Isi Detail (bisa di-scroll) -->
      <div class="kos-modal-content" id="modal-content">
        <div class="kos-modal-header">
          <div class="kos-modal-tags" id="modal-tags"></div>
          <h2 class="kos-modal-name" id="modal-name"></h2>
          <div class="kos-modal-price-row">
            <span class="kos-modal-price" id="modal-price"></span>
            <span class="kos-modal-per">/ bulan</span>
          </div>
          <div class="kos-modal-avail" id="modal-avail"></div>
        </div>

        <div class="kos-modal-rating" id="modal-rating"></div>

        <div class="kos-modal-section">
          <p class="kos-modal-sec-label">Deskripsi</p>
          <p class="kos-modal-desc" id="modal-desc"></p>
        </div>
        <div class="kos-modal-section">
          <p class="kos-modal-sec-label">Spesifikasi</p>
          <div class="kos-modal-spec-grid" id="modal-spec-grid"></div>
        </div>
        <div class="kos-modal-section">
          <p class="kos-modal-sec-label">Fasilitas Kamar</p>
          <div class="kos-modal-fac-grid" id="modal-room-fac"></div>
        </div>
        <div class="kos-modal-section">
          <p class="kos-modal-sec-label">Fasilitas Bersama</p>
          <div class="kos-modal-fac-grid" id="modal-shared-fac"></div>
        </div>
        <div class="kos-modal-section">
          <p class="kos-modal-sec-label">Lokasi Terdekat</p>
          <div class="kos-modal-nearby" id="modal-nearby"></div>
        </div>
        <div class="kos-modal-section" id="modal-map-section">
          <p class="kos-modal-sec-label">Peta Lokasi</p>
            <div id="modal-map"></div>
        </div>
<div class="kos-modal-section">
  <p class="kos-modal-sec-label">Aturan Kos</p>
  <ul class="kos-modal-rules" id="modal-rules"></ul>
</div>
        <div class="kos-modal-section">
          <p class="kos-modal-sec-label">Aturan Kos</p>
          <ul class="kos-modal-rules" id="modal-rules"></ul>
        </div>

        <div class="kos-modal-cta">
          <a class="kos-modal-wa-btn" id="modal-wa-btn" href="#" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Hubungi Pemilik via WhatsApp
          </a>
        </div>
      </div><!-- /modal-content -->
    </div>
  `;

  document.body.appendChild(overlay);

  // Tutup modal jika klik di area gelap (luar kotak)
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.getElementById('modal-close').addEventListener('click', closeModal);

  // Navigasi foto dengan tombol panah
  document.getElementById('modal-prev').addEventListener('click', () => modalSlide(-1));
  document.getElementById('modal-next').addEventListener('click', () => modalSlide(1));

  // Navigasi dengan keyboard
  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape')     closeModal();
    if (e.key === 'ArrowLeft')  modalSlide(-1);
    if (e.key === 'ArrowRight') modalSlide(1);
  });
}

/* ------------------------------------------------------------
   openModal(id)
   Isi modal dengan data kos yang sesuai id, lalu tampilkan.
   ------------------------------------------------------------ */
function openModal(id) {
  const kos  = allKos.find(k => k.id === id);
  if (!kos) return;

  const overlay = document.getElementById('kos-modal');
  const spec    = kos.spec || {};

  // ── Bangun slide foto ──
  const track  = document.getElementById('modal-track');
  const dotsCt = document.getElementById('modal-dots');
  const photos       = kos.photos && kos.photos.length ? kos.photos : [];
  const useGenerated = photos.length === 0;
  const slideCount   = useGenerated ? 4 : photos.length;

  _modalSlides  = slideCount;
  _modalCurrent = 0;
  track.innerHTML  = '';
  dotsCt.innerHTML = '';

  if (useGenerated) {
    // Placeholder berwarna jika foto belum ada
    for (let i = 0; i < 4; i++) {
      track.innerHTML += `
        <div class="kos-modal-slide" style="background:${SLIDE_COLORS[i]};">
          <div class="kos-modal-slide-icon">${SLIDE_ICONS[i]}</div>
          <div class="kos-modal-slide-label">${SLIDE_LABELS[i]}</div>
        </div>`;
    }
  } else {
    photos.forEach(url => {
      track.innerHTML += `
        <div class="kos-modal-slide"
             style="background-image:url('${escHtml(url)}');background-size:cover;background-position:center;">
        </div>`;
    });
  }

  // Buat titik indikator
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'kos-modal-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => { _modalCurrent = i; _applyModalSlide(); });
    dotsCt.appendChild(dot);
  }

  // Sembunyikan tombol panah jika hanya 1 slide
  document.querySelectorAll('.kos-modal-nav').forEach(b => {
    b.style.display = slideCount > 1 ? 'flex' : 'none';
  });

  _applyModalSlide();

  // ── Isi teks dan info ──
  document.getElementById('modal-name').textContent  = kos.name;
  document.getElementById('modal-price').textContent = formatRupiah(kos.price);
  document.getElementById('modal-desc').textContent  = kos.desc;

  document.getElementById('modal-tags').innerHTML = `
    <span class="kos-modal-badge">${escHtml(kos.type)}</span>
    <span class="kos-modal-area-tag">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
      ${escHtml(kos.area)}
    </span>`;

  document.getElementById('modal-avail').innerHTML = kos.available > 0
    ? `<span class="avail-pill-green">● ${kos.available} kamar tersedia</span>`
    : `<span class="avail-pill-red">● Penuh</span>`;

  // ── Rating bintang ──
  const ratingEl = document.getElementById('modal-rating');
  if (spec.rating) {
    const stars = Math.round(spec.rating);
    let starHTML = '';
    for (let i = 1; i <= 5; i++) {
      starHTML += `<span class="${i <= stars ? 'star-on' : 'star-off'}">★</span>`;
    }
    ratingEl.innerHTML = `
      <div class="rating-stars">${starHTML}</div>
      <span class="rating-num">${spec.rating}</span>
      <span class="rating-count">(${spec.reviewCount || 0} ulasan)</span>`;
  } else {
    ratingEl.innerHTML = '';
  }

  // ── Spesifikasi ──
  document.getElementById('modal-spec-grid').innerHTML = `
    ${spec.roomSize   ? `<div class="spec-item"><span class="spec-icon">📐</span><span class="spec-label">Ukuran Kamar</span><span class="spec-val">${spec.roomSize}</span></div>` : ''}
    ${spec.floor      ? `<div class="spec-item"><span class="spec-icon">🏢</span><span class="spec-label">Lantai</span><span class="spec-val">Lantai ${spec.floor}</span></div>` : ''}
    ${spec.totalRooms ? `<div class="spec-item"><span class="spec-icon">🚪</span><span class="spec-label">Total Kamar</span><span class="spec-val">${spec.totalRooms} unit</span></div>` : ''}
    <div class="spec-item"><span class="spec-icon">📅</span><span class="spec-label">Sewa</span><span class="spec-val">Bulanan</span></div>
  `;

  // ── Fasilitas ──
  document.getElementById('modal-room-fac').innerHTML =
    (spec.roomFacilities   || []).map(f => `<div class="fac-chip">✔ ${escHtml(f)}</div>`).join('');
  document.getElementById('modal-shared-fac').innerHTML =
    (spec.sharedFacilities || []).map(f => `<div class="fac-chip">✔ ${escHtml(f)}</div>`).join('');

  // ── Lokasi terdekat ──
document.getElementById('modal-nearby').innerHTML =
  (spec.nearbyPlaces || []).map(p => `<div class="nearby-item">📍 ${escHtml(p)}</div>`).join('');
  

// ── Peta lokasi ──
const mapContainer = document.getElementById('modal-map');
if (mapContainer) {
  if (spec.mapEmbed) {
    mapContainer.innerHTML = `
      <iframe 
        src="${spec.mapEmbed}"
        width="100%" height="250" style="border:0;border-radius:8px;" 
        allowfullscreen="" loading="lazy">
      </iframe>`;
    mapContainer.style.display = 'block';
  } else {
    mapContainer.style.display = 'none';
  }
}

  // ── Aturan kos ──
  document.getElementById('modal-rules').innerHTML =
    (spec.rules || []).map(r => `<li class="kos-modal-rule-item">${escHtml(r)}</li>`).join('');

  // ── Tombol WhatsApp ──
  const waMsg = encodeURIComponent(
    `Halo, saya tertarik dengan ${kos.name} di ${kos.area}. Apakah masih tersedia kamar?`
  );
  document.getElementById('modal-wa-btn').href =
    `https://wa.me/${spec.contact || '6281234567890'}?text=${waMsg}`;

  // ── Tampilkan modal ──
  document.getElementById('modal-content').scrollTop = 0;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden'; // kunci scroll halaman
}

/* ------------------------------------------------------------
   closeModal()
   Sembunyikan modal.
   ------------------------------------------------------------ */
function closeModal() {
  document.getElementById('kos-modal').classList.remove('open');
  document.body.style.overflow = '';
}

/* ------------------------------------------------------------
   modalSlide(dir) & _applyModalSlide()
   Navigasi foto di dalam modal.
   dir: -1 = kiri, +1 = kanan
   ------------------------------------------------------------ */
function modalSlide(dir) {
  if (_modalSlides < 2) return;
  _modalCurrent = (_modalCurrent + dir + _modalSlides) % _modalSlides;
  _applyModalSlide();
}

function _applyModalSlide() {
  document.getElementById('modal-track').style.transform =
    `translateX(-${_modalCurrent * 100}%)`;

  document.querySelectorAll('.kos-modal-dot').forEach((d, i) =>
    d.classList.toggle('active', i === _modalCurrent)
  );

  document.getElementById('modal-counter').textContent =
    `${_modalCurrent + 1} / ${_modalSlides}`;
}