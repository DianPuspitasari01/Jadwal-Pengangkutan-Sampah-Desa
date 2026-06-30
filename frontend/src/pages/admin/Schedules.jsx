import React, { useState, useEffect } from 'react';
import { schedulesAPI } from '../../utils/api';

export default function Schedules() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    area: '',
    date: '',
    time: '',
    description: '',
  });

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const { data } = await schedulesAPI.getAll();
      setSchedules(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const { data } = await schedulesAPI.update(editingId, formData);
        setSchedules(schedules.map(s => (s.id === editingId ? data : s)));
      } else {
        const { data } = await schedulesAPI.create(formData);
        setSchedules([...schedules, data]);
      }

      setFormData({ area: '', date: '', time: '', description: '' });
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      alert('Gagal menyimpan jadwal');
    }
  };

  const handleEdit = (schedule) => {
    setFormData(schedule);
    setEditingId(schedule.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
      try {
        await schedulesAPI.delete(id);
        setSchedules(schedules.filter(s => s.id !== id));
      } catch (error) {
        alert('Gagal menghapus jadwal');
      }
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="page-title">Kelola Jadwal Pengangkutan</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditingId(null);
              setFormData({ area: '', date: '', time: '', description: '' });
            }
          }}
          className="btn btn-primary"
        >
          {showForm ? 'Batal' : '+ Tambah Jadwal'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Area/Lokasi</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Contoh: Jakarta Selatan - Blok A"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Tanggal</label>
                <input
                  type="date"
                  className="input"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Jam</label>
                <input
                  type="time"
                  className="input"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Deskripsi</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Deskripsi jadwal"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Perbarui' : 'Simpan'}
            </button>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {schedules.map(schedule => (
          <div key={schedule.id} className="card">
            <h3 className="text-lg font-bold text-primary mb-2">{schedule.area}</h3>
            <p className="text-gray-600 mb-2">
              📅 {new Date(schedule.date).toLocaleDateString('id-ID')}
            </p>
            <p className="text-gray-600 mb-2">
              🕐 {schedule.time}
            </p>
            <p className="text-gray-600 mb-4">{schedule.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(schedule)}
                className="btn btn-primary flex-1 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(schedule.id)}
                className="btn btn-danger flex-1 text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
