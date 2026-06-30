import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Sistem Manajemen Pengangkutan Sampah</h1>
              <p className="text-lg mb-6 text-primary-light">
                Bersama membangun lingkungan yang lebih bersih dan sehat melalui manajemen sampah yang teratur.
              </p>
              <div className="flex gap-4">
                <Link to="/register" className="btn btn-primary bg-white text-primary hover:bg-primary-light">
                  Daftar Sekarang
                </Link>
                <Link to="/login" className="btn btn-primary-outline text-white border-white">
                  Masuk
                </Link>
              </div>
            </div>
            <div className="text-center">
              <div className="text-6xl">♻️</div>
              <p className="text-xl mt-4">Kelola Sampah dengan Baik</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="page-title text-center">Fitur Utama</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2">Jadwal Pengangkutan</h3>
              <p className="text-gray-600">Lihat jadwal pengangkutan sampah untuk area Anda dalam bentuk kalender yang mudah dibaca.</p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Lapor Sampah</h3>
              <p className="text-gray-600">Laporkan masalah sampah langsung dengan foto dan lokasi untuk respons cepat dari tim.</p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Edukasi Sampah</h3>
              <p className="text-gray-600">Pelajari cara memilah sampah dan tips mengurangi limbah untuk lingkungan yang lebih baik.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-primary-light py-20">
        <div className="container mx-auto px-4">
          <h2 className="page-title text-center">Mengapa Memilih Kami?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Mudah Digunakan</h3>
                <p className="text-gray-700">Interface yang intuitif dan responsif untuk semua perangkat.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Real-time Tracking</h3>
                <p className="text-gray-700">Pantau status laporan sampah Anda secara real-time.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Transparansi</h3>
                <p className="text-gray-700">Lihat jadwal dan laporan dengan transparan dan jelas.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Ramah Lingkungan</h3>
                <p className="text-gray-700">Berkontribusi dalam menjaga kelestarian lingkungan bersama.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Memulai?</h2>
          <p className="text-lg mb-8 text-primary-light">Bergabunglah dengan ribuan warga yang peduli lingkungan.</p>
          <Link to="/register" className="btn btn-primary bg-white text-primary hover:bg-primary-light inline-block">
            Daftar Akun Baru
          </Link>
        </div>
      </section>
    </div>
  );
}
