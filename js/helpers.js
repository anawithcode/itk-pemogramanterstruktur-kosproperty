'use strict';

/* ============================================================
   helpers.js
   Fungsi-fungsi kecil serbaguna yang dipakai di banyak tempat.
   Tidak bergantung pada file JS lain (berdiri sendiri).
   ============================================================ */

// Buat ID unik acak → dipakai sebagai id tiap data kos
// Contoh hasil: "lf3k2abc9"
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Ubah angka jadi format Rupiah
// Contoh: 750000 → "Rp 750.000"
function formatRupiah(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

// Amankan teks dari serangan XSS
// Karakter berbahaya seperti <, >, &, " diubah jadi kode HTML yang aman
// Selalu pakai ini sebelum memasukkan teks dari data ke dalam HTML
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}