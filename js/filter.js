/* ══════════════════════════════════════════════════════════════
   FILTER
══════════════════════════════════════════════════════════════ */
function applyFilter() {
  const area  = filterArea.value;
  const price = filterPrice.value ? parseInt(filterPrice.value) : null;
  const type  = filterType.value;

  filtered = allKos.filter(kos => {
    if (area && !kos.area.includes(area)) return false;
    if (type  && kos.type !== type) return false;
    if (price && kos.price > price) return false;
    return true;
  });

  renderCards(filtered);
  showToast(`Ditemukan ${filtered.length} properti`);
}

function resetFilter() {
  filterArea.value  = '';
  filterPrice.value = '';
  filterType.value  = '';
  filtered = [...allKos];
  renderCards(filtered);
  showToast('Filter direset');
};