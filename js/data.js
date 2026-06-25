function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : getDefaultData();
  } catch (e) { return getDefaultData(); }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getLikes() {
  try { return JSON.parse(localStorage.getItem(LIKES_KEY)) || []; }
  catch (e) { return []; }
}

function toggleLike(id) {
  const likes = getLikes();
  const idx = likes.indexOf(id);
  if (idx > -1) likes.splice(idx, 1);
  else likes.push(id);
  localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
  return idx === -1;
}

/* ── DEFAULT DUMMY DATA ───────────────────────────────────────── */
function getDefaultData() {
  const facilitiesList = [
    ['WiFi', 'AC', 'Kamar Mandi Dalam', 'Lemari', 'Meja Belajar'],
    ['WiFi', 'Parkir Motor', 'Dapur Bersama', 'Kipas Angin', 'Kasur'],
    ['WiFi', 'AC', 'TV', 'Kamar Mandi Dalam', 'Laundry', 'Dapur'],
    ['WiFi', 'Kamar Mandi Luar', 'Parkir Motor', 'Dispenser'],
    ['WiFi', 'AC', 'Kamar Mandi Dalam', 'TV', 'Kulkas', 'Security 24jam'],
    ['WiFi', 'Kipas Angin', 'Parkir Motor', 'Jemuran', 'Dapur Bersama']
  ];

  return [
    {
      id: 'kos-001',
      name: 'Kos Melati Indah',
      area: 'Jl. MT. Haryono, Balikpapan Timur',
      type: 'Putri',
      price: 750000,
      available: 3,
      desc: 'Kos putri dekat Bandara SAMS, lingkungan aman dan bersih. Akses mudah ke pusat perbelanjaan dan kampus terdekat. Tersedia fasilitas lengkap untuk kenyamanan penghuni.',
      photos: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
        'https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=800&q=80',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80'
      ],
      mapEmbed: 'https://maps.google.com/maps?q=-1.2534,116.8712&z=16&output=embed',
      facilities: facilitiesList[0]
    },
    {
      id: 'kos-002',
      name: 'Kos Bintang Timur',
      area: 'Jl. Ahmad Yani, Balikpapan Tengah',
      type: 'Putra',
      price: 600000,
      available: 5,
      desc: 'Kos putra strategis di kawasan Balikpapan Utara. Dekat dengan area industri dan pusat kota. Parkir motor tersedia luas.',
      photos: [
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80'
      ],
      mapEmbed: 'https://maps.google.com/maps?q=-1.2697,116.8312&z=16&output=embed',
      facilities: facilitiesList[1]
    },
    {
      id: 'kos-003',
      name: 'Kos Harmoni Residence',
      area: 'Jl. Ruhui Rahayu, Sepinggan Raya, Balikpapan Selatan',
      type: 'Campur',
      price: 1200000,
      available: 2,
      desc: 'Kos eksklusif area Sepinggan. Fasilitas lengkap, kamar luas, akses dekat Bandara. Cocok untuk profesional muda.',
      photos: [
        'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
        'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=800&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'
      ],
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7978.45!2d116.9044!3d-1.2641!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTUnNTAuOCJTIDExNsKwNTQnMTUuOCJF!5e0!3m2!1sid!2sid!4v1700000000003',
      facilities: facilitiesList[2]
    },
    {
      id: 'kos-004',
      name: 'Kos Mawar Balikpapan',
      area: 'Jl. Sepinggan Baru, Balikpapan Selatan',
      type: 'Putri',
      price: 500000,
      available: 4,
      desc: [
        'Kos putri harga terjangkau di Balikpapan Barat. Pemilik ramah, lingkungan tenang dan nyaman.',
        'Kos putri harga terjangkau di Balikpapan Barat. Pemilik ramah, lingkungan tenang dan nyaman.'
      ],
      photos: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80'
      ],
      mapEmbed: 'https://maps.google.com/maps?q=-1.2678,116.8947&z=16&output=embed',
      facilities: facilitiesList[3]
    },
    {
      id: 'kos-005',
      name: 'Kos Grand Kencana',
      area: 'Jl. Soekarno Hatta Km.8, Balikpapan Utara',
      type: 'Campur',
      price: 1500000,
      available: 1,
      desc: 'Kos premium di jantung kota Balikpapan. Dekat dengan pusat bisnis, mal, dan fasilitas umum.',
      photos: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'
      ],
      mapEmbed: 'https://maps.google.com/maps?q=-1.2049,116.8583&z=16&output=embed',
      facilities: facilitiesList[4]
    },
    {
      id: 'kos-006',
      name: 'Kos Mutiara Timur',
      area: 'Jl. Marsma Iswahyudi, Balikpapan Selatan',
      type: 'Putra',
      price: 650000,
      available: 6,
      desc: 'Kos putra nyaman di area Balikpapan Timur. Kamar bersih, air lancar, dekat jalan utama.',
      photos: [
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80'
      ],
      mapEmbed: 'https://maps.google.com/maps?q=-1.2741,116.8285&z=16&output=embed',
      facilities: facilitiesList[5]
    }
  ];
}