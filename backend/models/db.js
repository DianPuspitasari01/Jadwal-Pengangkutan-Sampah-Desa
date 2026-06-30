const bcrypt = require('bcryptjs');

// Mock Database
let db = {
  users: [
    {
      id: 1,
      username: 'admin',
      email: 'admin@sampah.com',
      password: bcrypt.hashSync('admin123', 10),
      fullName: 'Admin Sampah',
      role: 'admin',
      phone: '081234567890',
      address: 'Sumurjomblangbogo',
      createdAt: new Date('2026-01-01')
    },
    {
      id: 2,
      username: 'budi',
      email: 'budi@email.com',
      password: bcrypt.hashSync('budi123', 10),
      fullName: 'Budi Santoso',
      role: 'warga',
      phone: '082111111111',
      address: 'Sumurjomblangbogo RW 07',
      createdAt: new Date('2026-01-15')
    },
    {
      id: 3,
      username: 'siti',
      email: 'siti@email.com',
      password: bcrypt.hashSync('siti123', 10),
      fullName: 'Siti Nurhaliza',
      role: 'warga',
      phone: '082222222222',
      address: 'Sumurjomblangbogo RW 07',
      createdAt: new Date('2026-01-20')
    },
    {
      id: 4,
      username: 'roni',
      email: 'roni@email.com',
      password: bcrypt.hashSync('roni123', 10),
      fullName: 'Roni Wijaya',
      role: 'warga',
      phone: '082333333333',
      address: 'Sumurjomblangbogo RW 07',
      createdAt: new Date('2026-02-01')
    },
    {
      id: 5,
      username: 'linda',
      email: 'linda@email.com',
      password: bcrypt.hashSync('linda123', 10),
      fullName: 'Linda Kusuma',
      role: 'warga',
      phone: '082444444444',
      address: 'Sumurjomblangbogo RW 07',
      createdAt: new Date('2026-02-05')
    },
    {
      id: 6,
      username: 'ahmad',
      email: 'ahmad@email.com',
      password: bcrypt.hashSync('ahmad123', 10),
      fullName: 'Ahmad Rizki',
      role: 'warga',
      phone: '082555555555',
      address: 'Sumurjomblangbogo RW 07',
      createdAt: new Date('2026-02-10')
    }
  ],
  schedules: [
    {
      id: 1,
      area: 'Pengangkutan sampah RT 20',
      date: '2026-04-16',
      time: '08:00',
      description: 'Pengangkutan sampah RT 20',
      createdAt: new Date()
    },
    {
      id: 2,
      area: 'Pengangkutan sampah RT 21',
      date: '2026-04-17',
      time: '10:00',
      description: 'Pengangkutan sampah RT 21',
      createdAt: new Date()
    },
    {
      id: 3,
      area: 'Pengangkutan sampah RT 22',
      date: '2026-04-18',
      time: '09:00',
      description: 'Pengangkutan sampah RT 22',
      createdAt: new Date()
    },
    {
      id: 4,
      area: 'Pengangkutan sampah RT 23',
      date: '2026-04-19',
      time: '07:30',
      description: 'Pengangkutan sampah RT 23',
      createdAt: new Date()
    },
    {
      id: 5,
      area: 'Pengangkutan sampah RT 24',
      date: '2026-04-20',
      time: '11:00',
      description: 'Pengangkutan sampah RT 24',
      createdAt: new Date()
    }
  ],
  articles: [
    {
      id: 1,
      title: 'Cara Memilah Sampah dengan Benar',
      content: 'Pemilahan sampah merupakan langkah penting dalam mengelola limbah. Sampah dapat dibagi menjadi beberapa kategori: sampah organik (sisa makanan, daun), sampah anorganik (plastik, kertas), sampah B3 (baterai, lampu), dan sampah lainnya. Dengan memilah sampah sejak dari rumah, kita dapat mengurangi beban TPA dan memudahkan proses daur ulang.',
      author: 'Admin',
      image: 'https://via.placeholder.com/300x200?text=Pemilahan+Sampah',
      createdAt: new Date('2026-03-01')
    },
    {
      id: 2,
      title: 'Pentingnya Daur Ulang untuk Lingkungan',
      content: 'Daur ulang adalah proses mengubah sampah menjadi produk yang dapat digunakan kembali. Manfaat daur ulang antara lain: mengurangi volume sampah, menghemat sumber daya alam, mengurangi polusi, dan menciptakan lapangan kerja baru. Mari kita mulai dari hal kecil dengan mendaur ulang sampah plastik, kertas, dan logam di rumah kita.',
      author: 'Admin',
      image: 'https://via.placeholder.com/300x200?text=Daur+Ulang',
      createdAt: new Date('2026-03-05')
    },
    {
      id: 3,
      title: 'Tips Mengurangi Produksi Sampah Harian',
      content: 'Kunci utama dalam mengelola sampah adalah dengan mengurangi jumlah sampah yang kita hasilkan. Beberapa tips yang dapat dilakukan: 1) Gunakan tas belanja yang dapat digunakan kembali, 2) Hindari produk dengan kemasan berlebihan, 3) Pilih produk yang ramah lingkungan, 4) Kompos sampah organik, 5) Jangan membeli barang yang tidak perlu. Dengan langkah-langkah sederhana ini, kita bisa berkontribusi menjaga kelestarian lingkungan.',
      author: 'Admin',
      image: 'https://via.placeholder.com/300x200?text=Kurangi+Sampah',
      createdAt: new Date('2026-03-10')
    }
  ],
  reports: [
    {
      id: 1,
      userId: 2,
      userName: 'Budi Santoso',
      title: 'Tumpukan sampah di depan rumah',
      description: 'Ada tumpukan sampah yang menumpuk di depan rumah sudah 3 hari',
      location: {
        lat: -6.2298,
        lng: 106.6461,
        address: 'Desa Sumurjomblangbogo RT 21'
      },
      image: 'https://via.placeholder.com/400x300?text=Sampah1',
      status: 'diproses',
      createdAt: new Date('2026-04-10')
    },
    {
      id: 2,
      userId: 3,
      userName: 'Siti Nurhaliza',
      title: 'Sampah di pinggir jalan',
      description: 'Sampah berserakan di pinggir jalan kompleks A',
      location: {
        lat: -6.1753,
        lng: 106.8294,
        address: 'Desa Sumurjomblangbogo RT 22'
      },
      image: 'https://via.placeholder.com/400x300?text=Sampah2',
      status: 'selesai',
      createdAt: new Date('2026-04-08')
    },
    {
      id: 3,
      userId: 4,
      userName: 'Roni Wijaya',
      title: 'Sampah plastik di taman',
      description: 'Banyak sampah plastik di taman keluarga',
      location: {
        lat: -6.2349,
        lng: 106.8956,
        address: 'Desa Sumurjomblangbogo RT 23'
      },
      image: 'https://via.placeholder.com/400x300?text=Sampah3',
      status: 'diproses',
      createdAt: new Date('2026-04-11')
    },
    {
      id: 4,
      userId: 5,
      userName: 'Linda Kusuma',
      title: 'Tumpukan kardus pembungkus',
      description: 'Kardus bekas pengiriman menumpuk di depan',
      location: {
        lat: -6.1666,
        lng: 106.7832,
        address: 'Desa Sumurjomblangbogo RT 24'
      },
      image: 'https://via.placeholder.com/400x300?text=Sampah4',
      status: 'selesai',
      createdAt: new Date('2026-04-09')
    },
    {
      id: 5,
      userId: 6,
      userName: 'Ahmad Rizki',
      title: 'Sampah organik menumpuk',
      description: 'Sisa makanan dan dedaunan menumpuk di tong sampah',
      location: {
        lat: -6.1247,
        lng: 106.6710,
        address: 'Desa Sumurjomblangbogo RT 21'
      },
      image: 'https://via.placeholder.com/400x300?text=Sampah5',
      status: 'menunggu',
      createdAt: new Date('2026-04-12')
    }
  ],
  nextIds: {
    user: 7,
    schedule: 6,
    article: 4,
    report: 6
  }
};

module.exports = db;
