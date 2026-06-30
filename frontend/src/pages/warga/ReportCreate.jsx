import React, { useState, useContext, useRef } from 'react';
import { reportsAPI } from '../../utils/api';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ReportCreate() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const rtOptions = [21, 22, 23, 24];
  const initialRT = rtOptions[Math.floor(Math.random() * rtOptions.length)];
  const [selectedRT, setSelectedRT] = useState(initialRT);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: {
      lat: -6.2088,
      lng: 106.8456,
      address: `Desa Sumurjomblangbogo RT ${initialRT}`,
    },
    image: 'https://via.placeholder.com/400x300?text=Laporan+Sampah',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const mapRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('location.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description || !formData.location.address) {
      setError('Semua field harus diisi');
      return;
    }

    setLoading(true);

    try {
      await reportsAPI.create(formData);
      alert('Laporan berhasil dibuat! Terima kasih atas laporan Anda.');
      navigate('/warga/reports');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal membuat laporan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="page-title">🚨 Lapor Sampah</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 card">
          <h2 className="text-xl font-bold mb-6">Isi Form Laporan</h2>

          <div className="form-group">
            <label className="form-label">Judul Laporan</label>
            <input
              type="text"
              name="title"
              className="input"
              placeholder="Contoh: Tumpukan sampah di depan rumah"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Deskripsi Detail</label>
            <textarea
              name="description"
              className="input"
              placeholder="Jelaskan masalah sampah secara detail..."
              rows="5"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Pilih RT</label>
              <select
                name="rt"
                className="input"
                value={selectedRT}
                onChange={(e) => {
                  const rt = parseInt(e.target.value, 10);
                  setSelectedRT(rt);
                  setFormData({
                    ...formData,
                    location: {
                      ...formData.location,
                      address: `Desa Sumurjomblangbogo RT ${rt}`,
                    },
                  });
                }}
              >
                {rtOptions.map((rt) => (
                  <option key={rt} value={rt}>
                    RT {rt}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Alamat Lengkap</label>
              <input
                type="text"
                name="location.address"
                className="input"
                value={formData.location.address}
                readOnly
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Latitude</label>
              <input
                type="number"
                name="location.lat"
                className="input"
                placeholder="-6.2088"
                step="0.0001"
                value={formData.location.lat}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Longitude</label>
              <input
                type="number"
                name="location.lng"
                className="input"
                placeholder="106.8456"
                step="0.0001"
                value={formData.location.lng}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Upload Foto Sampah</label>
            <input
              type="file"
              accept="image/*"
              className="input"
              onChange={handleImageUpload}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full text-lg" disabled={loading}>
            {loading ? 'Mengirim...' : 'Kirim Laporan'}
          </button>
        </form>

        {/* Preview */}
        <div className="space-y-4">
          <div className="card">
            <h2 className="text-lg font-bold mb-4">🔍 Preview Laporan</h2>

            <img
              src={formData.image}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Judul</p>
                <p className="font-semibold">{formData.title || 'Judul laporan'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Deskripsi</p>
                <p className="text-sm">{formData.description || 'Deskripsi laporan'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Lokasi</p>
                <p className="text-sm">{formData.location.address || 'Alamat lokasi'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Koordinat</p>
                <p className="text-xs font-mono">{formData.location.lat}, {formData.location.lng}</p>
              </div>

              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-blue-800">
                  ℹ️ Laporan Anda akan ditinjau oleh admin dan statusnya akan diupdate secara berkala. Terima kasih atas perhatian Anda terhadap lingkungan!
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-primary-light">
            <h3 className="font-bold mb-2">💡 Tips Melaporkan Sampah</h3>
            <ul className="text-sm space-y-2 text-gray-700">
              <li>✓ Ambil foto yang jelas</li>
              <li>✓ Tuliskan deskripsi detail</li>
              <li>✓ Pastikan lokasi akurat</li>
              <li>✓ Cantumkan waktu kejadian</li>
              <li>✓ Jelaskan dampak masalah</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
