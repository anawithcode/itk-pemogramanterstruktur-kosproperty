/* ── STATE ───────────────────────────────────────────────────── */
let allKos   = loadData();
let filtered = [...allKos];
const cardSlideIndex = {};
const likes = getLikes();

/* ── DOM REFS ───────────────────────────────────────────────── */
const listingGrid    = document.getElementById('listing-grid');
const emptyState     = document.getElementById('empty-state');
const statTotal      = document.getElementById('stat-total');

const filterArea     = document.getElementById('filter-area');
const filterPrice    = document.getElementById('filter-price');
const filterType     = document.getElementById('filter-type');
const btnFilter      = document.getElementById('btn-filter');
const btnReset       = document.getElementById('btn-reset');

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
const detailFacilities = document.getElementById('facilities-grid');
const likeBtn        = document.getElementById('like-btn');
const btnWa          = document.getElementById('btn-wa');
const btnCopy        = document.getElementById('btn-copy');

const lightbox       = document.getElementById('lightbox');
const lightboxImg    = document.getElementById('lightbox-img');
const lightboxClose  = document.getElementById('lightbox-close');
const lightboxCaption = document.getElementById('lightbox-caption');

let detailSlideCount = 0;
let detailCurrentSlide = 0;
let activeDetailId = null;