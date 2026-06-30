# 🚀 PANDUAN SETUP & MENJALANKAN APLIKASI

## Status Saat Ini

✅ **Semua file sudah dibuat dan siap digunakan!**
✅ **Backend server berjalan di port 5000**
✅ **Frontend server berjalan di port 3000**

---

## Cara Termudah: Gunakan File .bat

### Windows Users:

1. **Jalankan aplikasi:**
   - Double-click file `RUN.bat` di folder `c:\tugas pak mujib\`
   - Dua jendela command prompt akan terbuka (Backend & Frontend)
   - Tunggu 5-10 detik sampai keduanya siap

2. **Akses aplikasi:**
   - Buka browser: **http://localhost:3000**

3. **Menghentikan aplikasi:**
   - Double-click file `STOP.bat`
   - Atau tutup kedua jendela command prompt

---

## Cara Manual: Menggunakan Command Prompt

### Terminal 1 - Backend:
```bash
cd c:\tugas pak mujib\backend
npm start
```

### Terminal 2 - Frontend:
```bash
cd c:\tugas pak mujib\frontend
npm run dev
```

Kemudian buka di browser: **http://localhost:3000**

---

## 🔐 Login Data

### Admin (1 akun):
```
Username: admin
Password: admin123
```

### Warga (5 contoh akun):
```
Username: budi      / Password: budi123
Username: siti      / Password: siti123
Username: roni      / Password: roni123
Username: linda     / Password: linda123
Username: ahmad     / Password: ahmad123
```

---

## Fitur-Fitur yang Tersedia

### ✅ Admin Dashboard
- Dashboard dengan statistik (total warga, laporan, jadwal)
- Kelola data warga (tambah, edit, hapus)
- Kelola jadwal pengangkutan sampah
- Kelola artikel edukasi
- Kelola laporan sampah dari warga (ubah status)

### ✅ Warga Dashboard
- Lihat jadwal pengangkutan (kalender interaktif)
- Baca artikel edukasi sampah
- Lapor sampah (form + foto + lokasi)
- Tracking status laporan
- Kelola profil sendiri

### ✅ Public Pages
- Halaman beranda/home
- Login
- Register/Pendaftaran baru

---

## 📂 Struktur Project

```
c:\tugas pak mujib\
│
├── RUN.bat                    # Jalankan aplikasi (Windows)
├── STOP.bat                   # Hentikan aplikasi
├── README.md                  # Dokumentasi utama
│
├── backend/
│   ├── server.js              # Entry point backend
│   ├── package.json
│   ├── .env                   # Environment variables
│   ├── routes/                # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── schedules.js
│   │   ├── articles.js
│   │   └── reports.js
│   ├── middleware/
│   │   └── auth.js            # JWT authentication
│   └── models/
│       └── db.js              # Mock database
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Users.jsx
│   │   │   │   ├── Schedules.jsx
│   │   │   │   ├── Articles.jsx
│   │   │   │   └── Reports.jsx
│   │   │   └── warga/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Schedules.jsx
│   │   │       ├── Articles.jsx
│   │   │       ├── ReportCreate.jsx
│   │   │       ├── Reports.jsx
│   │   │       └── Profile.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   └── styles/
│   │       └── globals.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── .gitignore
```

---

## Teknologi yang Digunakan

### Backend:
- Node.js 14+
- Express.js 4.18
- JWT (JSON Web Token)
- bcryptjs (Password hashing)

### Frontend:
- React 18
- Vite 4
- TailwindCSS 3
- React Router v6
- Axios

---

## Tips & Troubleshooting

### Jika port sudah terpakai:
```bash
# Cek siapa yang menggunakan port 5000
netstat -ano | findstr :5000

# Cek siapa yang menggunakan port 3000
netstat -ano | findstr :3000

# Kill process dengan PID tertentu
taskkill /PID <PID> /F
```

### Jika npm tidak bekerja:
```bash
# Gunakan npx
npx npm install

# Atau clear cache
npm cache clean --force
```

### Jika file tidak ter-update:
```bash
# Clear browser cache (Ctrl + Shift + Delete)
# atau buka dengan Ctrl + Shift + R
```

---

## 🎨 Fitur Frontend

✅ **Responsive Design**
- Mobile-friendly
- Optimal di semua ukuran layar

✅ **Tema Hijau**
- Warna primary: #10b981
- Mencerminkan komitmen lingkungan

✅ **User-Friendly Interface**
- Navigation yang intuitif
- Dark/light mode ready
- Loading states

✅ **Real-time Updates**
- Status laporan update langsung
- Form validation
- Error handling

---

## 📊 Database

Saat ini menggunakan **Mock Database** dalam memory:
- Data hilang ketika server restart
- Cocok untuk testing dan development

### Untuk Production:
Ganti dengan MySQL, PostgreSQL, atau MongoDB:
```bash
npm install mongoose  # Untuk MongoDB
# atau
npm install mysql2   # Untuk MySQL
```

---

## 🔒 Keamanan

✅ Password di-hash dengan bcryptjs
✅ JWT Token untuk setiap API call
✅ Role-based access control (Admin vs Warga)
✅ CORS enabled untuk development

---

## 📝 Log & Debugging

### Melihat log backend:
Lihat di jendela command prompt Backend Server

### Melihat log frontend:
- Buka DevTools (F12)
- Tab Console
- Buka Network tab untuk melihat API calls

---

## 🆘 Kontakt Support

Jika ada error:
1. Liat console log (F12 di browser)
2. Liat jendela command prompt (backend/frontend error)
3. Cek `.env` file di backend
4. Pastikan port 3000 dan 5000 tidak terpakai

---

**Selamat menggunakan Sistem Manajemen Pengangkutan Sampah!** 🌍♻️
