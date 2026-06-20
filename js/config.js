'use strict';

/* ============================================================
   config.js
   Berisi semua nilai tetap (konstanta) yang dipakai di seluruh
   file JS lainnya. Jika ingin ganti nama storage key atau
   label slide, cukup edit file ini saja.
   ============================================================ */

// Nama "laci" penyimpanan di localStorage
const STORAGE_KEY = 'koshu_data';

// Label, ikon, dan warna untuk slide placeholder (saat foto belum ada)
const SLIDE_LABELS = ['Tampak Depan', 'Kamar Tidur', 'Kamar Mandi'];
const SLIDE_ICONS  = ['🏠', '🛏', '🚿'];
const SLIDE_COLORS = [
  'linear-gradient(160deg,#1c1008,#2a1a0a,#3a2510)',
  'linear-gradient(160deg,#080e1c,#0a1a2a,#102035)',
  'linear-gradient(160deg,#0a180a,#102010,#183018)'
];

// Data kos bawaan — muncul pertama kali sebelum ada data sungguhan
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
      photos: [
        'image/melati/kos1.webp',
        'image/melati/melati-bed.jpg',
        'image/melati/melati-bath.jpg'
      ],
      spec: {
        roomSize: '3 × 4 meter', floor: 2, totalRooms: 12, contact: '6281234000001',
        rating: 4.7, reviewCount: 24,
        rules: ['Jam malam maksimal pukul 22.00 WITA', 'Tamu lawan jenis dilarang masuk kamar', 'Dilarang membawa hewan peliharaan', 'Dilarang memasak di dalam kamar', 'Bayar sewa paling lambat tanggal 5 tiap bulan'],
        roomFacilities: ['Kasur & Bantal', 'Lemari Pakaian', 'Meja Belajar', 'AC', 'Kamar Mandi Dalam', 'Cermin'],
        sharedFacilities: ['Wi-Fi Kecepatan Tinggi', 'Dapur Umum', 'Parkir Motor', 'CCTV 24 Jam', 'Ruang Santai'],
        nearbyPlaces: ['Bandara SAMS ±2 km', 'Mall Balikpapan ±3 km', 'RS Pertamina ±1.5 km'],
        mapEmbed: 'https://maps.google.com/maps?q=-1.2800,116.8950&z=15&output=embed'
        
      },
    },
    {
      id: uid(),
      name: 'Kos Bintang Timur',
      area: 'Balikpapan Utara',
      type: 'Putra',
      price: 600000,
      available: 5,
      desc: 'Kos putra strategis di kawasan Balikpapan Utara. Dekat dengan area industri dan pusat kota.',
      photos: [
        'image/bintang/kos4.webp',
        'image/bintang/bintang-bed.jpeg',
        'image/bintang/bintang-bath.webp',
      ],
      spec: {
        roomSize: '3 × 3 meter', floor: 1, totalRooms: 8, contact: '6281234000002',
        rating: 4.3, reviewCount: 17,
        rules: ['Jam malam maksimal pukul 23.00 WITA', 'Dilarang membawa hewan peliharaan', 'Merokok hanya di area yang ditentukan', 'Bayar sewa paling lambat tanggal 10 tiap bulan'],
        roomFacilities: ['Kasur & Bantal', 'Lemari Pakaian', 'Kipas Angin', 'Kamar Mandi Dalam'],
        sharedFacilities: ['Wi-Fi', 'Parkir Motor', 'Parkir Mobil (terbatas)', 'CCTV 24 Jam'],
        nearbyPlaces: ['Kawasan Industri Kariangau ±5 km', 'Pasar Pandansari ±1 km', 'SPBU ±500 m'],
        mapEmbed: 'https://maps.google.com/maps?q=-1.2680,116.8980&z=15&output=embed'
      },
    },
    {
      id: uid(),
      name: 'Kos Harmoni Residence',
      area: 'Sepinggan',
      type: 'Campur',
      price: 1200000,
      available: 2,
      desc: 'Kos eksklusif area Sepinggan. Fasilitas lengkap, kamar luas, akses dekat Bandara. Cocok untuk profesional muda.',
      photos: [
        'image/harmoni/kos3.webp',
        'image/harmoni/harmoni-bed.jpg',
        'image/harmoni/harmoni-bath.webp'
      ],
      spec: {
        roomSize: '4 × 5 meter', floor: 3, totalRooms: 20, contact: '6281234000003',
        rating: 4.9, reviewCount: 38,
        rules: ['Jam malam maksimal pukul 22.30 WITA', 'Wajib lapor jika ada tamu menginap', 'Dilarang membawa hewan peliharaan', 'Kebersihan kamar pribadi menjadi tanggung jawab penghuni', 'Bayar sewa paling lambat tanggal 5 tiap bulan'],
        roomFacilities: ['Kasur Spring Bed', 'Lemari 2 Pintu', 'Meja Kerja', 'AC Inverter', 'Kamar Mandi Dalam', 'Water Heater', 'TV 24"'],
        sharedFacilities: ['Wi-Fi Fiber Optik', 'Dapur Umum Lengkap', 'Parkir Motor', 'Parkir Mobil', 'CCTV 24 Jam', 'Gym Mini', 'Rooftop Garden'],
        nearbyPlaces: ['Bandara SAMS ±1.5 km', 'Sepinggan Raya ±500 m', 'Rumah Sakit Siloam ±2 km'],
        mapEmbed: 'https://maps.google.com/maps?q=-1.2500,116.7900&z=15&output=embed'
      },
    },
    {
      id: uid(),
      name: 'Kos Mawar Balikpapan',
      area: 'Balikpapan Barat',
      type: 'Putri',
      price: 500000,
      available: 4,
      desc: 'Kos putri harga terjangkau di Balikpapan Barat. Pemilik ramah, lingkungan tenang dan nyaman.',
      photos: [
        'image/mawar/kos2.webp',
        'image/mawar/mawar-bed.jpg',
        'image/mawar/mawar-bath.jpg'
      ],
      spec: {
        roomSize: '3 × 3 meter', floor: 1, totalRooms: 10, contact: '6281234000004',
        rating: 4.1, reviewCount: 11,
        rules: ['Jam malam maksimal pukul 21.30 WITA', 'Tamu lawan jenis dilarang masuk area kos', 'Dilarang membawa hewan peliharaan', 'Wajib menjaga kebersihan kamar mandi bersama', 'Bayar sewa paling lambat tanggal 1 tiap bulan'],
        roomFacilities: ['Kasur & Bantal', 'Lemari Kecil', 'Meja & Kursi Belajar', 'Kipas Angin'],
        sharedFacilities: ['Wi-Fi', 'Kamar Mandi Bersama (2 unit)', 'Parkir Motor', 'Ruang Cuci & Jemur'],
        nearbyPlaces: ['Pasar Klandasan ±2 km', 'Pelabuhan Semayang ±3 km', 'Minimarket ±300 m'],
        mapEmbed: 'https://maps.google.com/maps?q=-1.2500,116.7900&z=15&output=embed'
      },
    },
    {
      id: uid(),
      name: 'Kos Grand Kencana',
      area: 'Balikpapan Tengah',
      type: 'Campur',
      price: 1500000,
      available: 1,
      desc: 'Kos premium di jantung kota Balikpapan. Dekat dengan pusat bisnis, mal, dan fasilitas umum.',
      photos: [
        'image/grand/kos5.webp',
        'image/grand/grand-bed.webp',
        'image/grand/grand-bath.webp'
      ],
      spec: {
        roomSize: '4 × 4 meter', floor: 4, totalRooms: 16, contact: '6281234000005',
        rating: 4.8, reviewCount: 42,
        rules: ['Jam malam maksimal pukul 23.00 WITA', 'Tamu wajib lapor ke resepsionis', 'Dilarang membawa hewan peliharaan', 'Dilarang mengadakan pesta atau keramaian', 'Bayar sewa paling lambat tanggal 5 tiap bulan'],
        roomFacilities: ['Kasur Spring Bed King Size', 'Lemari Built-in', 'Meja Kerja', 'AC', 'Kamar Mandi Dalam', 'Water Heater', 'Kulkas Mini', 'TV 32"'],
        sharedFacilities: ['Wi-Fi Fiber Optik', 'Lift', 'Dapur Bersama', 'Parkir Basement', 'CCTV 24 Jam', 'Keamanan 24 Jam', 'Ruang Meeting'],
        nearbyPlaces: ['Mal Balikpapan Plaza ±500 m', 'Kantor Pemkot ±1 km', 'RS Pertamina ±2 km'],
        mapEmbed: 'https://maps.google.com/maps?q=-1.2600,116.8300&z=15&output=embed'
      },
    },
    {
      id: uid(),
      name: 'Kos Mutiara Timur',
      area: 'Balikpapan Timur',
      type: 'Putra',
      price: 650000,
      available: 6,
      desc: 'Kos putra nyaman di area Balikpapan Timur. Kamar bersih, air lancar, dekat jalan utama.',
      photos: [
        'image/mutiara/kos6.webp',
        'image/mutiara/mutiara-bed.webp',
        'image/mutiara/mutiara-bath.jpg'
      ],
      spec: {
        roomSize: '3 × 4 meter', floor: 1, totalRooms: 14, contact: '6281234000006',
        rating: 4.5, reviewCount: 29,
        rules: ['Jam malam maksimal pukul 22.00 WITA', 'Merokok hanya di area belakang kos', 'Dilarang membawa hewan peliharaan', 'Sepeda motor wajib parkir di area yang ditentukan', 'Bayar sewa paling lambat tanggal 10 tiap bulan'],
        roomFacilities: ['Kasur & Bantal', 'Lemari Pakaian', 'Meja Belajar', 'AC', 'Kamar Mandi Dalam'],
        sharedFacilities: ['Wi-Fi', 'Dapur Umum', 'Parkir Motor Luas', 'CCTV 24 Jam', 'Area Bersantai'],
        nearbyPlaces: ['Jl. Soekarno-Hatta ±200 m', 'Kampus UKKW ±3 km', 'SPBU ±1 km'],
        mapEmbed: 'https://maps.google.com/maps?q=-1.2400,116.9200&z=15&output=embed'
      },
    },
  ];
}