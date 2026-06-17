'use strict';

/* ============================================================
   filter.js
   Mengurus logika filter pencarian kos berdasarkan area,
   harga maksimal, dan tipe kamar.

   Bergantung pada: state.js  (allKos, filtered)
                    render.js (renderCards)
   ============================================================ */

// Terapkan filter dan tampilkan hasilnya
function applyFilter() {
  const area  = document.getElementById('filter-area').value;
  const price = document.getElementById('filter-price').value
    ? parseInt(document.getElementById('filter-price').value)
    : null;
  const type  = document.getElementById('filter-type').value;

  // Saring allKos: hanya tampilkan yang lolos semua kondisi
  // Jika filter kosong (user tidak pilih), kondisi itu diabaikan
  filtered = allKos.filter(kos => {
    if (area  && kos.area  !== area)  return false;
    if (type  && kos.type  !== type)  return false;
    if (price && kos.price >  price)  return false;
    return true; // lolos semua filter
  });

  renderCards(filtered);
}

// Reset semua filter ke kondisi awal → tampilkan semua kos
function resetFilter() {
  document.getElementById('filter-area').value  = '';
  document.getElementById('filter-price').value = '';
  document.getElementById('filter-type').value  = '';
  filtered = [...allKos];
  renderCards(filtered);
}