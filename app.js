/* ================================================================
   KOSHU BALIKPAPAN — app.js
   Pure vanilla JS. No libraries. No frameworks.
   Data storage: localStorage key = "koshu_data"
   ================================================================ */

'use strict';

/* ── STORAGE ──────────────────────────────────────────────────── */
const STORAGE_KEY = 'koshu_data';

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : getDefaultData();
  } catch (e) {
    return getDefaultData();
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* ── DEFAULT DUMMY DATA ───────────────────────────────────────── */
function getDefaultData() {
  return [
    {
      id: uid(),
      name: 'Kos Melati Indah',
      area: 'Balikpapan Selatan',
      type: 'Putri',
      price: 750000,
      available: 3,
      desc: 'Kos putri dekat Bandara SAMS, lingkungan aman dan bersih. Akses mudah ke pusat perbelanjaan dan kampus terdekat.',
      photos: []
    },
    {
      id: uid(),
      name: 'Kos Bintang Timur',
      area: 'Balikpapan Utara',
      type: 'Putra',
      price: 600000,
      available: 5,
      desc: 'Kos putra strategis di kawasan Balikpapan Utara. Dekat dengan area industri dan pusat kota. Parkir motor tersedia.',
      photos: []
    },
    {
      id: uid(),
      name: 'Kos Harmoni Residence',
      area: 'Sepinggan',
      type: 'Campur',
      price: 1200000,
      available: 2,
      desc: 'Kos eksklusif area Sepinggan. Fasilitas lengkap, kamar luas, akses dekat Bandara. Cocok untuk profesional muda.',
      photos: []
    },
    {
      id: uid(),
      name: 'Kos Mawar Balikpapan',
      area: 'Balikpapan Barat',
      type: 'Putri',
      price: 500000,
      available: 4,
      desc: 'Kos putri harga terjangkau di Balikpapan Barat. Pemilik ramah, lingkungan tenang dan nyaman.',
      photos: []
    },
    {
      id: uid(),
      name: 'Kos Grand Kencana',
      area: 'Balikpapan Tengah',
      type: 'Campur',
      price: 1500000,
      available: 1,
      desc: 'Kos premium di jantung kota Balikpapan. Dekat dengan pusat bisnis, mal, dan fasilitas umum.',
      photos: []
    },
    {
      id: uid(),
      name: 'Kos Mutiara Timur',
      area: 'Balikpapan Timur',
      type: 'Putra',
      price: 650000,
      available: 6,
      desc: 'Kos putra nyaman di area Balikpapan Timur. Kamar bersih, air lancar, dekat jalan utama.',
      photos: []
    }
  ];
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ── STATE ───────────────────────────────────────────────────── */
let allKos   = loadData();
let filtered = [...allKos];
let editingId = null;  // null = create, string = edit mode

/* ── SLIDESHOW STATE PER CARD (index tracker) ───────────────── */
const cardSlideIndex = {}; // { kosId: currentIndex }

/* ── DOM REFS ───────────────────────────────────────────────── */
const listingGrid    = document.getElementById('listing-grid');
const emptyState     = document.getElementById('empty-state');
const statTotal      = document.getElementById('stat-total');

const filterArea     = document.getElementById('filter-area');
const filterPrice    = document.getElementById('filter-price');
const filterType     = document.getElementById('filter-type');
const btnFilter      = document.getElementById('btn-filter');
const btnReset       = document.getElementById('btn-reset');

// Admin modal
const modalAdmin     = document.getElementById('modal-admin');
const closeAdmin     = document.getElementById('close-admin');
const formTitle      = document.getElementById('form-title');
const fName          = document.getElementById('f-name');
const fArea          = document.getElementById('f-area');
const fType          = document.getElementById('f-type');
const fPrice         = document.getElementById('f-price');
const fAvail         = document.getElementById('f-avail');
const fDesc          = document.getElementById('f-desc');
const fPhotos        = document.getElementById('f-photos');
const btnSave        = document.getElementById('btn-save');
const btnCancelForm  = document.getElementById('btn-cancel-form');

// Detail modal
const modalDetail    = document.getElementById('modal-detail');
const closeDetail    = document.getElementById('close-detail');
const detailSlides   = document.getElementById('detail-slides');
const detailDots     = document.getElementById('detail-dots');
const detailPrev     = document.getElementById('detail-prev');
const detailNext     = document.getElementById('detail-next');
const detailArea     = document.getElementById('detail-area');
const detailName     = document.getElementById('detail-name');
const detailPrice    = document.getElementById('detail-price');
const detailType     = document.getElementById('detail-type');
const detailAvail    = document.getElementById('detail-avail');
const detailDesc     = document.getElementById('detail-desc');
const detailEditBtn  = document.getElementById('detail-edit-btn');
const detailDeleteBtn= document.getElementById('detail-delete-btn');

let detailSlideCount = 0;
let detailCurrentSlide = 0;
let activeDetailId = null;

/* ── INIT ────────────────────────────────────────────────────── */
function init() {
  renderCards(allKos);
  updateStat();
  bindEvents();
}

/* ── RENDER CARDS ────────────────────────────────────────────── */
function renderCards(list) {
  listingGrid.innerHTML = '';

  if (list.length === 0) {
    emptyState.style.display = 'block';
    return;
  }
  emptyState.style.display = 'none';

  list.forEach(kos => {
    cardSlideIndex[kos.id] = 0;
    const card = buildCard(kos);
    listingGrid.appendChild(card);
  });
}

function buildCard(kos) {
  const card = document.createElement('div');
  card.className = 'kos-card';
  card.setAttribute('data-id', kos.id);

  const photos = kos.photos && kos.photos.length ? kos.photos : [];
  const totalSlides = photos.length || 1;

  /* --- Slideshow HTML --- */
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

  /* --- Dots HTML --- */
  let dotsHTML = '';
  if (photos.length > 1) {
    photos.forEach((_, i) => {
      dotsHTML += `<div class="card-dot ${i === 0 ? 'active' : ''}" data-dot="${i}"></div>`;
    });
  }

  /* --- Prev/next buttons (only if multiple photos) --- */
  const navBtns = photos.length > 1
    ? `<button class="card-slide-btn prev-btn" data-dir="prev">&#8592;</button>
       <button class="card-slide-btn next-btn" data-dir="next">&#8594;</button>`
    : '';

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

  /* Slideshow controls on card */
  const track = card.querySelector('.card-slide-track');
  const dots  = card.querySelectorAll('.card-dot');

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
      else                 idx = (idx - 1 + photos.length) % photos.length;
      goSlide(idx);
    });
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      goSlide(i);
    });
  });

  /* Open detail modal on card body click */
  card.querySelector('.card-body').addEventListener('click', () => {
    openDetailModal(kos.id);
  });
  /* Also open on slideshow click (except nav buttons) */
  card.querySelector('.card-slideshow').addEventListener('click', (e) => {
    if (e.target.classList.contains('card-slide-btn') || e.target.classList.contains('card-dot')) return;
    openDetailModal(kos.id);
  });

  return card;
}

/* ── FORMAT RUPIAH ────────────────────────────────────────────── */
function formatRupiah(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

/* ── ESCAPE HTML ─────────────────────────────────────────────── */
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

/* ══════════════════════════════════════════════════════════════
   FILTER
══════════════════════════════════════════════════════════════ */
function applyFilter() {
  const area  = filterArea.value;
  const price = filterPrice.value ? parseInt(filterPrice.value) : null;
  const type  = filterType.value;

  filtered = allKos.filter(kos => {
    if (area  && kos.area !== area)      return false;
    if (type  && kos.type !== type)      return false;
    if (price && kos.price > price)      return false;
    return true;
  });

  renderCards(filtered);
}

function resetFilter() {
  filterArea.value  = '';
  filterPrice.value = '';
  filterType.value  = '';
  filtered = [...allKos];
  renderCards(filtered);
}

/* ══════════════════════════════════════════════════════════════
   DETAIL MODAL
══════════════════════════════════════════════════════════════ */
function openDetailModal(id) {
  const kos = allKos.find(k => k.id === id);
  if (!kos) return;

  activeDetailId = id;

  /* Fill info */
  detailArea.textContent  = kos.area;
  detailName.textContent  = kos.name;
  detailPrice.textContent = formatRupiah(kos.price) + ' / bulan';
  detailType.textContent  = 'Kos ' + kos.type;
  detailAvail.textContent = kos.available > 0
    ? kos.available + ' Kamar Tersedia'
    : 'Penuh';
  detailDesc.textContent  = kos.desc || 'Belum ada deskripsi.';

  /* Build slideshow */
  const photos = kos.photos && kos.photos.length ? kos.photos : [];
  detailSlideCount   = photos.length || 1;
  detailCurrentSlide = 0;

  detailSlides.innerHTML = '';
  detailDots.innerHTML   = '';

  if (photos.length > 0) {
    photos.forEach((url, i) => {
      const s = document.createElement('div');
      s.className = 'slide';
      s.style.backgroundImage = `url('${escHtml(url)}')`;
      s.style.minWidth = '100%';
      s.style.height   = '100%';
      s.style.backgroundSize = 'cover';
      s.style.backgroundPosition = 'center';
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
    s.style.minWidth = '100%';
    s.style.height = '100%';
    s.style.display = 'flex';
    s.style.alignItems = 'center';
    s.style.justifyContent = 'center';
    s.style.background = '#1a1a1a';
    s.style.fontSize = '4rem';
    s.style.opacity = '0.15';
    detailSlides.appendChild(s);
    detailPrev.style.display = 'none';
    detailNext.style.display = 'none';
  }

  goDetailSlide(0);
  modalDetail.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function goDetailSlide(idx) {
  detailCurrentSlide = idx;
  detailSlides.style.transform = `translateX(-${idx * 100}%)`;
  document.querySelectorAll('#detail-dots .dot').forEach((d, i) => {
    d.classList.toggle('active', i === idx);
  });
}

/* ══════════════════════════════════════════════════════════════
   ADMIN MODAL (CRUD)
══════════════════════════════════════════════════════════════ */
function openAdminModal(editId = null) {
  editingId = editId;

  if (editId) {
    const kos = allKos.find(k => k.id === editId);
    if (!kos) return;
    formTitle.textContent = 'Edit Data Kos';
    fName.value   = kos.name;
    fArea.value   = kos.area;
    fType.value   = kos.type;
    fPrice.value  = kos.price;
    fAvail.value  = kos.available || '';
    fDesc.value   = kos.desc || '';
    fPhotos.value = (kos.photos || []).join('\n');
  } else {
    formTitle.textContent = 'Tambah Kos Baru';
    fName.value = fArea.value = fType.value = fPrice.value = fAvail.value = fDesc.value = fPhotos.value = '';
  }

  modalAdmin.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAdminModal() {
  modalAdmin.classList.remove('open');
  document.body.style.overflow = '';
  editingId = null;
}

function saveKos() {
  /* Validate */
  const name  = fName.value.trim();
  const area  = fArea.value;
  const type  = fType.value;
  const price = parseInt(fPrice.value);
  const avail = parseInt(fAvail.value) || 0;
  const desc  = fDesc.value.trim();
  const photos = fPhotos.value
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);

  if (!name) { showToast('Nama kos tidak boleh kosong.'); fName.focus(); return; }
  if (!area) { showToast('Pilih area Balikpapan.'); fArea.focus(); return; }
  if (!type) { showToast('Pilih tipe kos.'); fType.focus(); return; }
  if (!price || price < 1) { showToast('Masukkan harga yang valid.'); fPrice.focus(); return; }

  if (editingId) {
    /* UPDATE */
    const idx = allKos.findIndex(k => k.id === editingId);
    if (idx !== -1) {
      allKos[idx] = { ...allKos[idx], name, area, type, price, available: avail, desc, photos };
      showToast('Data kos berhasil diperbarui ✓');
    }
  } else {
    /* CREATE */
    allKos.unshift({ id: uid(), name, area, type, price, available: avail, desc, photos });
    showToast('Kos baru berhasil ditambahkan ✓');
  }

  saveData(allKos);
  filtered = [...allKos];
  resetFilter();
  updateStat();
  closeAdminModal();

  // If we were in detail modal, close it
  modalDetail.classList.remove('open');
  document.body.style.overflow = '';
}

function deleteKos(id) {
  if (!confirm('Yakin ingin menghapus kos ini? Data tidak bisa dikembalikan.')) return;
  allKos = allKos.filter(k => k.id !== id);
  saveData(allKos);
  filtered = [...allKos];
  resetFilter();
  updateStat();
  modalDetail.classList.remove('open');
  document.body.style.overflow = '';
  showToast('Kos berhasil dihapus.');
}

/* ── TOAST ───────────────────────────────────────────────────── */
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ══════════════════════════════════════════════════════════════
   BIND EVENTS
══════════════════════════════════════════════════════════════ */
function bindEvents() {
  /* Filter */
  btnFilter.addEventListener('click', applyFilter);
  btnReset.addEventListener('click', resetFilter);

  /* Filter on Enter */
  [filterArea, filterPrice, filterType].forEach(el => {
    el.addEventListener('change', applyFilter);
  });

  /* Open admin modal */
  ['open-admin-btn', 'open-admin-btn-mobile', 'footer-admin-link'].forEach(btnId => {
    const el = document.getElementById(btnId);
    if (el) el.addEventListener('click', (e) => { e.preventDefault(); openAdminModal(); });
  });

  /* Close admin modal */
  closeAdmin.addEventListener('click', closeAdminModal);
  btnCancelForm.addEventListener('click', closeAdminModal);

  /* Save kos */
  btnSave.addEventListener('click', saveKos);

  /* Close detail modal */
  closeDetail.addEventListener('click', () => {
    modalDetail.classList.remove('open');
    document.body.style.overflow = '';
  });

  /* Detail slideshow */
  detailPrev.addEventListener('click', () => {
    const idx = (detailCurrentSlide - 1 + detailSlideCount) % detailSlideCount;
    goDetailSlide(idx);
  });
  detailNext.addEventListener('click', () => {
    const idx = (detailCurrentSlide + 1) % detailSlideCount;
    goDetailSlide(idx);
  });

  /* Detail modal actions */
  detailEditBtn.addEventListener('click', () => {
    modalDetail.classList.remove('open');
    openAdminModal(activeDetailId);
  });
  detailDeleteBtn.addEventListener('click', () => {
    deleteKos(activeDetailId);
  });

  /* Close modals on overlay click */
  modalAdmin.addEventListener('click', (e) => {
    if (e.target === modalAdmin) closeAdminModal();
  });
  modalDetail.addEventListener('click', (e) => {
    if (e.target === modalDetail) {
      modalDetail.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* Hamburger mobile menu */
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  /* Close mobile menu on link click */
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  /* Keyboard ESC to close modal */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalAdmin.classList.contains('open'))  closeAdminModal();
      if (modalDetail.classList.contains('open')) {
        modalDetail.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });
}

/* ── START ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', init);