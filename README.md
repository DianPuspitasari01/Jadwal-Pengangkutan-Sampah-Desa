# Sistem Manajemen Pengangkutan Sampah

Website untuk mengelola pengangkutan sampah dengan fitur administratif dan pelaporan warga.

## 🎯 Fitur Utama

### Admin
- Dashboard dengan statistik lengkap
- Kelola data warga (tambah, edit, hapus)
- Buat dan kelola jadwal pengangkutan sampah
- Kelola artikel edukasi
- Kelola laporan dari warga dengan ubah status

### Warga
- Melihat jadwal pengangkutan dalam bentuk kalender
- Membaca artikel edukasi tentang pemilahan sampah
- Melaporkan masalah sampah (dengan foto dan lokasi)
- Tracking status laporan mereka
- Kelola profil pribadi

## 🛠️ Teknologi

- **Frontend**: React 18 + Vite + TailwindCSS
- **Backend**: Express.js + Node.js
- **Database**: Mock data (dapat diubah ke database nyata)
- **Authentication**: JWT Token

## 📋 Data Test

### Admin
- Username: `admin`
- Password: `admin123`

### Warga
- Username: `budi`, Password: `budi123`
- Username: `siti`, Password: `siti123`
- Username: `roni`, Password: `roni123`
- Username: `linda`, Password: `linda123`
- Username: `ahmad`, Password: `ahmad123`

## 🚀 Cara Menjalankan

### Prerequisite
- Node.js 14+ dan npm/yarn

### Backend Setup

1. Masuk ke folder backend:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan server:
```bash
npm run dev
```

Server akan berjalan di `http://localhost:5000`

### Frontend Setup

1. Buka terminal baru, masuk ke folder frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

## 📂 Struktur Project

```
tugas pak mujib/
├── backend/
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── models/          # Mock database
│   ├── server.js        # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/       # Halaman aplikasi
│   │   ├── components/  # Komponen React
│   │   ├── contexts/    # Auth context
│   │   ├── utils/       # API utilities
│   │   ├── styles/      # Global styles
│   │   └── App.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user baru

### Users
- `GET /api/users` - Get semua users (admin only)
- `GET /api/users/profile` - Get profil user yang login
- `PUT /api/users/:id` - Update profil user
- `DELETE /api/users/:id` - Delete user (admin only)
- `GET /api/users/stats` - Get statistik (admin only)

### Schedules
- `GET /api/schedules` - Get semua jadwal
- `GET /api/schedules/month/:month/:year` - Get jadwal per bulan
- `POST /api/schedules` - Create jadwal (admin only)
- `PUT /api/schedules/:id` - Update jadwal (admin only)
- `DELETE /api/schedules/:id` - Delete jadwal (admin only)

### Articles
- `GET /api/articles` - Get semua artikel
- `GET /api/articles/:id` - Get artikel by ID
- `POST /api/articles` - Create artikel (admin only)
- `PUT /api/articles/:id` - Update artikel (admin only)
- `DELETE /api/articles/:id` - Delete artikel (admin only)

### Reports
- `GET /api/reports` - Get laporan (warga lihat milik mereka, admin lihat semua)
- `GET /api/reports/:id` - Get laporan by ID
- `POST /api/reports` - Create laporan (warga)
- `PUT /api/reports/:id/status` - Update status laporan (admin only)
- `DELETE /api/reports/:id` - Delete laporan (admin only)

## 🎨 Desain

- **Warna Tema**: Hijau (#10b981) untuk lingkungan yang sehat
- **Responsive**: Mobile-first design untuk semua ukuran layar
- **Modern UI**: TailwindCSS untuk styling yang rapi dan konsisten

## 📝 Catatan

- Data disimpan dalam memory (mock database) dan akan hilang saat server restart
- Untuk production, ganti dengan database nyata (MongoDB, PostgreSQL, dll)
- Upload foto masih menggunakan data URL (base64) untuk simplicity
- Map integration masih placeholder (dapat ditambahkan Google Maps/Leaflet)

## 👨‍💻 Kontribusi

Untuk menambah fitur atau memperbaiki bug, silakan modify file sesuai kebutuhan.

## 📄 Lisensi

MIT License - Sempurna untuk tujuan pembelajaran dan komersial

### nama: dian puspitasari
### nim: 101230016
### kelas: tf23b
