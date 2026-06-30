import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { authAPI } from '../utils/api';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await authAPI.login(formData.username, formData.password);
      login(data.user, data.token);

      if (data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/warga/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Cek username dan password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-primary py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">Login</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="input"
              placeholder="Masukkan username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Loading...' : 'Masuk'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Belum punya akun? <Link to="/register" className="text-primary font-semibold hover:underline">Daftar di sini</Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
          <p className="text-sm font-semibold text-blue-900 mb-2">Data Test:</p>
          <p className="text-xs text-blue-800">Admin: admin / admin123</p>
          <p className="text-xs text-blue-800">Warga: budi / budi123</p>
        </div>
      </div>
    </div>
  );
}
