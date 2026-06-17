'use strict';

/* ============================================================
   events.js
   Menghubungkan elemen HTML dengan fungsi yang harus dijalankan
   saat user melakukan sesuatu (klik tombol, ganti dropdown, dll).

   Bergantung pada: filter.js (applyFilter, resetFilter)
   ============================================================ */

function bindEvents() {
  // ── Filter & Reset ──
  document.getElementById('btn-filter').addEventListener('click', applyFilter);
  document.getElementById('btn-reset').addEventListener('click', resetFilter);

  // Filter otomatis berubah saat dropdown diganti (tanpa perlu klik tombol)
  ['filter-area', 'filter-price', 'filter-type'].forEach(id => {
    document.getElementById(id).addEventListener('change', applyFilter);
  });

  // ── Hamburger menu (untuk layar kecil / mobile) ──
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open'); // buka/tutup menu
  });

  // Tutup mobile menu otomatis saat salah satu link diklik
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}