import React, { useState, useEffect } from 'react';
import { usersAPI, schedulesAPI, articlesAPI, reportsAPI } from '../../utils/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReports: 0,
    totalSchedules: 0,
    reportsProcessing: 0,
    reportsCompleted: 0,
  });
  const [todayReports, setTodayReports] = useState(0);
  const [nextWeekSchedules, setNextWeekSchedules] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, schedulesRes, articlesRes, reportsRes] = await Promise.all([
          usersAPI.getStats(),
          schedulesAPI.getAll(),
          articlesAPI.getAll(),
          reportsAPI.getAll(),
        ]);
        setStats(statsRes.data);

        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        setTodayReports(reportsRes.data.filter(r => {
          const reportDate = new Date(r.createdAt).toISOString().split('T')[0];
          return reportDate === todayStr;
        }).length);

        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
        setNextWeekSchedules(schedulesRes.data.filter(s => {
          const scheduleDate = new Date(s.date);
          return scheduleDate >= today && scheduleDate <= oneWeekFromNow;
        }).length);

        setTotalArticles(articlesRes.data.length);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
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
      <h1 className="page-title">Dashboard Admin</h1>

      <div className="grid md:grid-cols-5 gap-4 mb-8">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500">
          <h3 className="text-sm font-semibold text-gray-600">Total Warga</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalUsers}</p>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500">
          <h3 className="text-sm font-semibold text-gray-600">Total Laporan</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.totalReports}</p>
        </div>

        <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100 border-l-4 border-yellow-500">
          <h3 className="text-sm font-semibold text-gray-600">Laporan Diproses</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.reportsProcessing}</p>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-500">
          <h3 className="text-sm font-semibold text-gray-600">Laporan Selesai</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.reportsCompleted}</p>
        </div>

        <div className="card bg-gradient-to-br from-pink-50 to-pink-100 border-l-4 border-pink-500">
          <h3 className="text-sm font-semibold text-gray-600">Total Jadwal</h3>
          <p className="text-3xl font-bold text-pink-600 mt-2">{stats.totalSchedules}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Menu Cepat</h2>
          <div className="space-y-2">
            <a href="/admin/users" className="block p-3 bg-blue-50 hover:bg-blue-100 rounded transition text-primary font-medium">
              👥 Kelola Data Warga
            </a>
            <a href="/admin/schedules" className="block p-3 bg-green-50 hover:bg-green-100 rounded transition text-primary font-medium">
              📅 Kelola Jadwal Pengangkutan
            </a>
            <a href="/admin/articles" className="block p-3 bg-purple-50 hover:bg-purple-100 rounded transition text-primary font-medium">
              📚 Kelola Artikel Edukasi
            </a>
            <a href="/admin/reports" className="block p-3 bg-red-50 hover:bg-red-100 rounded transition text-primary font-medium">
              📋 Kelola Laporan Warga
            </a>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Ringkasan Aktivitas</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Laporan Baru Hari Ini</span>
              <span className="font-semibold">{todayReports}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Warga Aktif</span>
              <span className="font-semibold">{stats.totalUsers}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Jadwal Minggu Depan</span>
              <span className="font-semibold">{nextWeekSchedules}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Artikel</span>
              <span className="font-semibold">{totalArticles}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
