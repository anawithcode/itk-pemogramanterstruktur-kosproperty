'use strict';

/* ============================================================
   main.js
   Titik awal (entry point) aplikasi KosPapan.
   
   File ini HANYA berisi fungsi init() yang memanggil semua
   fungsi dari file lain secara berurutan.

   Semua file JS lain HARUS sudah di-load di HTML sebelum
   file ini (lihat urutan <script> tag di index.html).
   ============================================================ */

function init() {
  renderCards(allKos);  // 1. tampilkan semua kartu kos
  updateStat();          // 2. perbarui angka statistik di stats bar
  buildModal();          // 3. buat struktur HTML modal (sekali saja)
  bindEvents();          // 4. aktifkan semua tombol & event
}

// Tunggu sampai seluruh HTML selesai dimuat, baru jalankan init()
document.addEventListener('DOMContentLoaded', init);