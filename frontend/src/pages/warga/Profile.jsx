import React, { useState, useEffect, useContext } from 'react';
import { usersAPI, reportsAPI } from '../../utils/api';
import { AuthContext } from '../../contexts/AuthContext';

export default function Profile() {
  const { user, login } = useContext(AuthContext);
  const [reportStats, setReportStats] = useState({ total: 0, processing: 0, completed: 0 });
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReportStats = async () => {
      try {
        const { data } = await reportsAPI.getAll();
        setReportStats({
          total: data.length,
          processing: data.filter(r => r.status === 'diproses').length,
          completed: data.filter(r => r.status === 'selesai').length,
        });
      } catch (err) {
        console.error('Failed to fetch report stats:', err);
      }
    };
    fetchReportStats();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const { data } = await usersAPI.updateProfile(user.id, formData);
      login({
        ...user,
        ...data,
      }, localStorage.getItem('token'));
      setSuccess('Profil berhasil diperbarui!');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memperbarui profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="page-title">👤 Profil Saya</h1>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="card text-center">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-bold mb-2">{user?.fullName}</h2>
          <p className="text-gray-600 mb-4">@{user?.username}</p>
          <div className="space-y-2 text-left bg-primary-light p-4 rounded">
            <p className="text-sm"><span className="font-semibold">Email:</span> {user?.email}</p>
            <p className="text-sm"><span className="font-semibold">Role:</span> {user?.role === 'warga' ? 'Warga' : 'Admin'}</p>
            <p className="text-sm"><span className="font-semibold">Status:</span> <span className="badge badge-success">Aktif</span></p>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 card">
          <h2 className="text-xl font-bold mb-6">Edit Profil</h2>

          <div className="form-group">
            <label className="form-label">Nama Lengkap</label>
            <input
              type="text"
              name="fullName"
              className="input"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nomor Telepon</label>
            <input
              type="tel"
              name="phone"
              className="input"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Alamat</label>
            <textarea
              name="address"
              className="input"
              rows="4"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </div>

      {/* Additional Info */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="card">
          <h3 className="text-lg font-bold mb-4">📊 Statistik</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <span>Laporan Dibuat</span>
              <span className="font-semibold">{reportStats.total}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>Laporan Diproses</span>
              <span className="font-semibold">{reportStats.processing}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Laporan Selesai</span>
              <span className="font-semibold">{reportStats.completed}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold mb-4">ℹ️ Informasi Akun</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Username</p>
              <p className="font-semibold">{user?.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Member Sejak</p>
              <p className="font-semibold">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Verifikasi Email</p>
              <span className="badge badge-success">✓ Terverifikasi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
