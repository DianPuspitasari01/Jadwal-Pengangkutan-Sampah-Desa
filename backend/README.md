  # Sampah Sehat - Backend

API Server untuk Sistem Manajemen Pengangkutan Sampah

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Server akan berjalan di `http://localhost:5000`

## 📦 Dependencies

- express - Web framework
- cors - Cross-origin resource sharing
- jsonwebtoken - JWT authentication
- bcryptjs - Password hashing
- dotenv - Environment variables

## 📁 Struktur

- `server.js` - Entry point aplikasi
- `routes/` - API endpoints
- `middleware/` - Authentication dan validasi
- `models/` - Mock database

## 🔐 Authentication

Menggunakan JWT (JSON Web Token) dengan secret key di `.env`

Token harus dikirim di header:
```
Authorization: Bearer <token>
```

## 📊 Database

Menggunakan mock data dalam memory. Data struktur:
- `users` - Data pengguna
- `schedules` - Jadwal pengangkutan
- `articles` - Artikel edukasi
- `reports` - Laporan sampah

Untuk production, integrasikan dengan MongoDB, PostgreSQL, atau database lainnya.
