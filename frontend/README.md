# Sampah Sehat - Frontend

React Frontend untuk Sistem Manajemen Pengangkutan Sampah

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

## 📦 Dependencies

- react - UI library
- react-dom - React DOM rendering
- react-router-dom - Client-side routing
- axios - HTTP client
- tailwindcss - CSS framework

## 📁 Struktur

```
src/
├── pages/          # Halaman utama aplikasi
│   ├── admin/     # Halaman admin
│   ├── warga/     # Halaman warga/user
│   └── ...        # Public pages
├── components/    # Komponen reusable
├── contexts/      # React Context (Auth)
├── utils/         # Utility functions (API)
├── styles/        # Global styles
└── App.jsx       # Root component
```

## 🎯 Key Components

### Pages
- **Home** - Landing page
- **Login** - Halaman login
- **Register** - Halaman pendaftaran
- **Admin Pages** - Dashboard, Users, Schedules, Articles, Reports
- **Warga Pages** - Dashboard, Schedules, Articles, Reports, Profile

### Context
- **AuthContext** - Mengelola authentication state

### Utils
- **api.js** - Axios instance dan API methods

## 🌐 API Integration

Frontend terhubung ke backend di `http://localhost:5000`

Proxy configuration di `vite.config.js`:
```javascript
'/api': {
  target: 'http://localhost:5000',
  changeOrigin: true,
}
```

## 🔐 Authentication

- Token disimpan di localStorage
- User info disimpan di localStorage
- Token dikirim otomatis di setiap request via axios interceptor

## 🎨 Styling

Menggunakan TailwindCSS dengan custom color:
- Primary: #10b981 (Hijau)
- Primary Dark: #059669
- Primary Light: #d1fae5

## 📱 Responsive Design

- Mobile First approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

## 🚢 Build

```bash
npm run build
```

Output akan di folder `dist/`

## 📝 Environment

Tidak perlu `.env` untuk development karena proxy sudah di setup di Vite config.
Untuk production, tambahkan `VITE_API_URL` di `.env.production`
