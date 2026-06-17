'use strict';

/* ============================================================
   storage.js
   Mengurus penyimpanan data ke localStorage dan pengambilannya.
   
   Bergantung pada: config.js (STORAGE_KEY, getDefaultData)
   ============================================================ */

// Ambil data dari localStorage.
// Jika belum ada atau rusak, kembalikan data default.
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : getDefaultData();
  } catch (e) {
    return getDefaultData();
  }
}

// Simpan data ke localStorage dalam format string JSON
function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}