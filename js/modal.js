/* ══════════════════════════════════════════════════════════════
   DETAIL MODAL
══════════════════════════════════════════════════════════════ */
function openDetailModal(id) {
  const kos = allKos.find(k => k.id === id);
  if (!kos) return;

  activeDetailId = id;

  detailArea.textContent  = kos.area;
  detailName.textContent  = kos.name;
  detailPrice.textContent = formatRupiah(kos.price) + ' / bulan';
  detailType.textContent  = 'Kos ' + kos.type;
  detailAvail.textContent = kos.available > 0
    ? kos.available + ' Kamar Tersedia'
    : 'Penuh';
  detailDesc.textContent  = kos.desc || 'Belum ada deskripsi.';

  // Like button state
  likeBtn.classList.toggle('active', likes.includes(id));

  // Facilities
  detailFacilities.innerHTML = '';
  if (kos.facilities) {
    kos.facilities.forEach(f => {
      const chip = document.createElement('div');
      chip.className = 'facility-chip';
      chip.innerHTML = `<span class="icon">✓</span> ${escHtml(f)}`;
      detailFacilities.appendChild(chip);
    });
  }

  // Slideshow
  const photos = kos.photos && kos.photos.length ? kos.photos : [];
  detailSlideCount = photos.length || 1;
  detailCurrentSlide = 0;

  detailSlides.innerHTML = '';
  detailDots.innerHTML = '';

  if (photos.length > 0) {
    photos.forEach((url, i) => {
      const s = document.createElement('div');
      s.className = 'slide';
      s.style.backgroundImage = `url('${escHtml(url)}')`;
      s.style.minWidth = '100%';
      s.style.height = '100%';
      s.style.backgroundSize = 'cover';
      s.style.backgroundPosition = 'center';
      s.addEventListener('click', () => openLightbox(url, kos.name));
      detailSlides.appendChild(s);

      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goDetailSlide(i));
      detailDots.appendChild(dot);
    });
    detailPrev.style.display = photos.length > 1 ? 'flex' : 'none';
    detailNext.style.display = photos.length > 1 ? 'flex' : 'none';
  } else {
    const s = document.createElement('div');
    s.className = 'slide placeholder';
    s.textContent = '🏠';
    detailSlides.appendChild(s);
    detailPrev.style.display = 'none';
    detailNext.style.display = 'none';
  }
  // ── Peta Lokasi ──────────────────────────────────────────
  const mapSection  = document.getElementById('modal-map-section');
  const mapEl       = document.getElementById('modal-map');
  const mapAddress  = document.getElementById('modal-map-address');
  const mapLinkEl   = document.getElementById('modal-map-link');

  if (kos.mapEmbed) {
    // Ada data peta → tampilkan section
    mapSection.style.display = 'block';

    // Isi iframe Maps
    mapEl.innerHTML = `
      <iframe
        src="${kos.mapEmbed}"
        width="100%"
        height="220"
        style="border:0; border-radius:10px; margin-top:0.6rem;"
        allowfullscreen=""
        loading="lazy">
      </iframe>`;

    // Isi teks alamat
    mapAddress.textContent = kos.mapLabel || '';

    // Tombol buka di Google Maps
    if (kos.mapLink) {
      mapLinkEl.href         = kos.mapLink;
      mapLinkEl.style.display = 'inline-flex';
    } else {
      mapLinkEl.style.display = 'none';
    }

  } else {
    // Tidak ada data peta → sembunyikan seluruh section
    mapSection.style.display = 'none';
    mapEl.innerHTML          = '';
    mapAddress.textContent   = '';
    mapLinkEl.style.display  = 'none';
  }
  // ─────────────────────────────────────────────────────────

  goDetailSlide(0);
  modalDetail.classList.add('open');
  document.body.style.overflow = 'hidden';

  // SWIPE on modal slideshow
  const modalSlideshow = modalDetail.querySelector('.modal-slideshow');
  initSwipe(modalSlideshow, (dir) => {
    if (detailSlideCount <= 1) return;
    if (dir === 'left') {
      const idx = (detailCurrentSlide + 1) % detailSlideCount;
      goDetailSlide(idx);
    } else {
      const idx = (detailCurrentSlide - 1 + detailSlideCount) % detailSlideCount;
      goDetailSlide(idx);
    }
  });
}

function goDetailSlide(idx) {
  detailCurrentSlide = idx;
  detailSlides.style.transform = `translateX(-${idx * 100}%)`;
  document.querySelectorAll('#detail-dots .dot').forEach((d, i) => {
    d.classList.toggle('active', i === idx);
  });
}
