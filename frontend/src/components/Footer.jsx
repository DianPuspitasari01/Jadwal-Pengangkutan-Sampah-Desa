import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sampah Sehat</h3>
            <p className="text-gray-400">Sistem manajemen pengangkutan sampah untuk lingkungan yang lebih baik.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition">Beranda</a></li>
              <li><a href="/login" className="hover:text-white transition">Login</a></li>
              <li><a href="/register" className="hover:text-white transition">Daftar</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Fitur</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Jadwal Pengangkutan</a></li>
              <li><a href="#" className="hover:text-white transition">Lapor Sampah</a></li>
              <li><a href="#" className="hover:text-white transition">Edukasi</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <p className="text-gray-400">Email: info@sampahsehat.com</p>
            <p className="text-gray-400">Telepon: 021-1234-5678</p>
            <p className="text-gray-400">Jakarta, Indonesia</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Sistem Manajemen Pengangkutan Sampah. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
