import React, { useState, useEffect, useContext } from 'react';
import { reportsAPI } from '../../utils/api';
import { AuthContext } from '../../contexts/AuthContext';

export default function Reports() {
  const { user } = useContext(AuthContext);
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

  const filteredReports = filter === 'semua' ? reports : reports.filter(r => r.status === filter);

  const getDisplayAddress = (report) => report?.location?.address || 'Sumurjomblangbogo';

  const getStatusBadge = (status) => {
    const statusMap = {
      menunggu: 'badge-warning',
      diproses: 'badge-info',
      selesai: 'badge-success',
    };
    const statusText = {
      menunggu: '⏳ Menunggu Ditinjau',
      diproses: '⚙️ Sedang Diproses',
      selesai: '✓ Selesai',
    };
    return <span className={`badge ${statusMap[status]}`}>{statusText[status]}</span>;
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="page-title">📋 Laporan Sampah Saya</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {['semua', 'menunggu', 'diproses', 'selesai'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded transition text-sm ${
              filter === status
                ? 'btn btn-primary'
                : 'btn btn-secondary'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({
              status === 'semua' ? reports.length : reports.filter(r => r.status === status).length
            })
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Reports List */}
        <div className="md:col-span-2 space-y-4">
          {filteredReports.length > 0 ? (
            filteredReports.map(report => (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className={`card cursor-pointer transition transform hover:shadow-lg ${
                  selectedReport?.id === report.id ? 'border-primary border-2' : ''
                }`}
              >
                <div className="flex gap-4">
                  <img
                    src={report.image}
                    alt={report.title}
                    className="w-32 h-32 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{report.title}</h3>
                      {getStatusBadge(report.status)}
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{report.description}</p>
                    <p className="text-gray-500 text-xs">
                      📍 {getDisplayAddress(report)} | {new Date(report.createdAt).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card text-center py-12">
              <p className="text-gray-600 text-lg mb-4">Belum ada laporan {filter !== 'semua' ? `dengan status "${filter}"` : ''}.</p>
              <a href="/warga/report/new" className="btn btn-primary">
                + Buat Laporan Baru
              </a>
            </div>
          )}
        </div>

        {/* Detail View */}
        {selectedReport && (
          <div className="card sticky top-4">
            <h2 className="text-xl font-bold mb-4">Detail Laporan</h2>

            <img
              src={selectedReport.image}
              alt={selectedReport.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm text-gray-600">Judul</p>
                <p className="font-semibold">{selectedReport.title}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Deskripsi</p>
                <p className="text-sm">{selectedReport.description}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Lokasi</p>
                <p className="text-sm">{getDisplayAddress(selectedReport)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Status</p>
                {getStatusBadge(selectedReport.status)}
              </div>

              <div>
                <p className="text-sm text-gray-600">Tanggal Lapor</p>
                <p className="text-sm">{new Date(selectedReport.createdAt).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>

              {selectedReport.status === 'selesai' && (
                <div className="bg-green-50 border border-green-200 p-3 rounded">
                  <p className="text-sm text-green-800">
                    ✓ Terima kasih! Laporan Anda telah ditangani dengan baik.
                  </p>
                </div>
              )}

              {selectedReport.status === 'diproses' && (
                <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                  <p className="text-sm text-blue-800">
                    ⚙️ Tim kami sedang menangani laporan Anda. Mohon ditunggu.
                  </p>
                </div>
              )}

              {selectedReport.status === 'menunggu' && (
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                  <p className="text-sm text-yellow-800">
                    ⏳ Laporan Anda sedang menunggu ditinjau oleh admin.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
