import React, { useState, useEffect } from 'react';
import { reportsAPI } from '../../utils/api';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('semua');
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data } = await reportsAPI.getAll();
      setReports(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { data } = await reportsAPI.updateStatus(id, newStatus);
      setReports(reports.map(r => (r.id === id ? data : r)));
      setSelectedReport(data);
    } catch (error) {
      alert('Gagal mengubah status laporan');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus laporan ini?')) {
      try {
        await reportsAPI.delete(id);
        setReports(reports.filter(r => r.id !== id));
        setSelectedReport(null);
      } catch (error) {
        alert('Gagal menghapus laporan');
      }
    }
  };

  const filteredReports = filter === 'semua' ? reports : reports.filter(r => r.status === filter);

  const getDisplayAddress = (report) => report?.location?.address || 'Sumurjomblangbogo';

  const getStatusBadge = (status) => {
    const statusMap = {
      menunggu: 'badge-warning',
      diproses: 'badge-info',
      selesai: 'badge-success',
    };
    const statusText = {
      menunggu: 'Menunggu',
      diproses: 'Diproses',
      selesai: 'Selesai',
    };
    return <span className={`badge ${statusMap[status]}`}>{statusText[status]}</span>;
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="page-title">Kelola Laporan Sampah</h1>

      <div className="flex gap-2 mb-6">
        {['semua', 'menunggu', 'diproses', 'selesai'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded transition ${
              filter === status
                ? 'btn btn-primary'
                : 'btn btn-secondary'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({status === 'semua' ? reports.length : reports.filter(r => r.status === status).length})
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Reports List */}
        <div className="md:col-span-2">
          <div className="space-y-4">
            {filteredReports.map(report => (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className={`card cursor-pointer transition ${
                  selectedReport?.id === report.id ? 'border-primary border-2' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{report.title}</h3>
                  {getStatusBadge(report.status)}
                </div>
                <p className="text-gray-600 text-sm mb-2">Oleh: {report.userName}</p>
                <p className="text-gray-700 mb-2">{report.description}</p>
                <p className="text-gray-500 text-xs">
                  📍 {getDisplayAddress(report)} | {new Date(report.createdAt).toLocaleDateString('id-ID')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detail View */}
        {selectedReport && (
          <div className="card sticky top-4">
            <h2 className="text-xl font-bold mb-4">Detail Laporan</h2>

            <img
              src={selectedReport.image}
              alt={selectedReport.title}
              className="w-full h-48 object-cover rounded mb-4"
            />

            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm text-gray-600">Judul</p>
                <p className="font-semibold">{selectedReport.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Pelapor</p>
                <p className="font-semibold">{selectedReport.userName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Deskripsi</p>
                <p>{selectedReport.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Lokasi</p>
                <p>{getDisplayAddress(selectedReport)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status Saat Ini</p>
                {getStatusBadge(selectedReport.status)}
              </div>
              <div>
                <p className="text-sm text-gray-600">Tanggal Lapor</p>
                <p>{new Date(selectedReport.createdAt).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Ubah Status</label>
              <select
                value={selectedReport.status}
                onChange={(e) => handleStatusChange(selectedReport.id, e.target.value)}
                className="input"
              >
                <option value="menunggu">Menunggu</option>
                <option value="diproses">Diproses</option>
                <option value="selesai">Selesai</option>
              </select>
            </div>

            <button
              onClick={() => handleDelete(selectedReport.id)}
              className="btn btn-danger w-full"
            >
              Hapus Laporan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
