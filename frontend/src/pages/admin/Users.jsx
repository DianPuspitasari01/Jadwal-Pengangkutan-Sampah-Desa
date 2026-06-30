import React, { useState, useEffect } from 'react';
import { usersAPI, authAPI } from '../../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await usersAPI.getAll();
      setUsers(data.filter(u => u.role === 'warga'));
      setLoading(false);
    } catch (err) {
      setError('Gagal memuat data warga');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus warga ini?')) {
      try {
        await usersAPI.deleteUser(id);
        setUsers(users.filter(u => u.id !== id));
      } catch (err) {
        alert('Gagal menghapus warga');
      }
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditData(user);
  };

  const handleSaveEdit = async () => {
    try {
      await usersAPI.updateProfile(editingId, editData);
      setUsers(users.map(u => (u.id === editingId ? editData : u)));
      setEditingId(null);
    } catch (err) {
      alert('Gagal memperbarui warga');
    }
  };

  const handleAddUser = async () => {
    setFormError('');
    if (!formData.username || !formData.email || !formData.password || !formData.fullName) {
      setFormError('Username, email, password, dan nama lengkap wajib diisi');
      return;
    }

    try {
      const { data } = await authAPI.register(formData);
      setUsers([...users, data.user]);
      setShowForm(false);
      setFormData({
        username: '',
        email: '',
        password: '',
        fullName: '',
        phone: '',
        address: '',
      });
    } catch (err) {
      setFormError(err.response?.data?.message || 'Gagal menambahkan warga baru');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="page-title">Daftar Warga</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? 'Batal' : '+ Tambah Warga'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">Tambah Warga Baru</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Nama Lengkap</label>
              <input
                type="text"
                className="input"
                placeholder="Nama lengkap"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="input"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password warga baru"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Nomor Telepon</label>
              <input
                type="tel"
                className="input"
                placeholder="Nomor telepon"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="form-group md:col-span-2">
              <label className="form-label">Alamat</label>
              <textarea
                className="input"
                placeholder="Alamat"
                rows="3"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              ></textarea>
            </div>
          </div>
          {formError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {formError}
            </div>
          )}
          <button onClick={handleAddUser} className="btn btn-primary">Simpan</button>
        </div>
      )}

      <div className="overflow-x-auto card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Username</th>
              <th>Email</th>
              <th>No. Telepon</th>
              <th>Alamat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {editingId === user.id ? (
                    <input
                      type="text"
                      className="input text-sm"
                      value={editData.fullName}
                      onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                    />
                  ) : (
                    user.fullName
                  )}
                </td>
                <td>{user.username}</td>
                <td>
                  {editingId === user.id ? (
                    <input
                      type="email"
                      className="input text-sm"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingId === user.id ? (
                    <input
                      type="tel"
                      className="input text-sm"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    />
                  ) : (
                    user.phone
                  )}
                </td>
                <td>
                  {editingId === user.id ? (
                    <input
                      type="text"
                      className="input text-sm"
                      value={editData.address}
                      onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                    />
                  ) : (
                    user.address
                  )}
                </td>
                <td>
                  {editingId === user.id ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="btn btn-primary btn-sm text-xs px-2 py-1 mr-1"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="btn btn-secondary btn-sm text-xs px-2 py-1"
                      >
                        Batal
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(user)}
                        className="btn btn-primary btn-sm text-xs px-2 py-1 mr-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="btn btn-danger btn-sm text-xs px-2 py-1"
                      >
                        Hapus
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
