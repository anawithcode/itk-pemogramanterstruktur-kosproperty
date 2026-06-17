'use strict';

/* ============================================================
   state.js
   Variabel global yang menyimpan "kondisi saat ini" dari app.
   Nilai-nilai ini bisa berubah saat user berinteraksi.

   Bergantung pada: storage.js (loadData)
   ============================================================ */

// Semua data kos — tidak berubah saat filter diterapkan
let allKos = loadData();

// Data yang sedang ditampilkan di grid — berubah saat filter aktif
let filtered = [...allKos];

// Menyimpan index slide aktif tiap kartu
// Format: { 'id-kos': 2 } → artinya kartu itu sedang di foto ke-3
const cardSlideIndex = {};

// State slider di dalam modal popup
let _modalSlides  = 0;   // total jumlah slide
let _modalCurrent = 0;   // index slide yang sedang tampil