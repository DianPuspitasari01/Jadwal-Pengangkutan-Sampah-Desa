import React, { useState, useEffect, useContext } from 'react';
import { schedulesAPI, reportsAPI } from '../../utils/api';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [nextSchedule, setNextSchedule] = useState(null);
  const [latestReports, setLatestReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schedulesRes, reportsRes] = await Promise.all([
          schedulesAPI.getAll(),
          reportsAPI.getAll(),
        ]);

        // Get next schedule
        const upcomingSchedules = schedulesRes.data
          .filter(s => new Date(s.date) >= new Date())
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        setNextSchedule(upcomingSchedules[0] || null);

        // Get latest 3 reports
        setLatestReports(reportsRes.data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="page-title">Selamat Datang, {user?.fullName}! 👋</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Next Schedule */}
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
          <h2 className="text-xl font-bold text-blue-900 mb-4">📅 Jadwal Pengangkutan Terdekat</h2>
          {nextSchedule ? (
            <div>
              <p className="text-sm text-blue-700 mb-2">Area: <span className="font-semibold text-lg text-blue-900">{nextSchedule.area}</span></p>
              <p className="text-sm text-blue-700 mb-2">Tanggal: <span className="font-semibold">{new Date(nextSchedule.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
              <p className="text-sm text-blue-700 mb-4">Jam: <span className="font-semibold text-lg">{nextSchedule.time}</span></p>
              <Link to="/warga/schedules" className="btn btn-primary text-sm">
                Lihat Semua Jadwal
              </Link>
            </div>
          ) : (
            <p className="text-blue-700">Tidak ada jadwal yang akan datang.</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">⚡ Menu Cepat</h2>
          <div className="space-y-2">
            <Link to="/warga/report/new" className="block p-3 bg-red-50 hover:bg-red-100 rounded transition text-red-600 font-medium">
              🚨 Lapor Sampah Baru
            </Link>
            <Link to="/warga/reports" className="block p-3 bg-yellow-50 hover:bg-yellow-100 rounded transition text-yellow-600 font-medium">
              📋 Lihat Laporan Saya
            </Link>
            <Link to="/warga/articles" className="block p-3 bg-green-50 hover:bg-green-100 rounded transition text-green-600 font-medium">
              📚 Baca Edukasi Sampah
            </Link>
            <Link to="/warga/schedules" className="block p-3 bg-blue-50 hover:bg-blue-100 rounded transition text-blue-600 font-medium">
              📅 Lihat Kalender Jadwal
            </Link>
          </div>
        </div>
      </div>

      {/* Latest Reports */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">📊 Laporan Terbaru</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {latestReports.map(report => {
            const statusColor = {
              menunggu: 'bg-yellow-50 border-yellow-200',
              diproses: 'bg-blue-50 border-blue-200',
              selesai: 'bg-green-50 border-green-200',
            };
            const statusText = {
              menunggu: '⏳ Menunggu',
              diproses: '⚙️ Diproses',
              selesai: '✓ Selesai',
            };

            return (
              <div key={report.id} className={`border-2 p-4 rounded ${statusColor[report.status]}`}>
                <img src={report.image} alt={report.title} className="w-full h-32 object-cover rounded mb-2" />
                <h3 className="font-semibold text-sm mb-1">{report.title}</h3>
                <p className="text-xs text-gray-600 mb-2">Oleh: {report.userName}</p>
                <p className="text-xs font-semibold">{statusText[report.status]}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-4">
          <Link to="/warga/reports" className="btn btn-primary">
            Lihat Semua Laporan
          </Link>
        </div>
      </div>
    </div>
  );
}
