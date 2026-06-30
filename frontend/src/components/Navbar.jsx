import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            ♻️ Sampah Sehat
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-primary-light transition">Beranda</Link>

            {!user ? (
              <>
                <Link to="/login" className="btn btn-primary text-sm px-4 py-2">Login</Link>
                <Link to="/register" className="btn btn-primary-outline text-sm px-4 py-2">Daftar</Link>
              </>
            ) : (
              <>
                {user.role === 'admin' && (
                  <>
                    <Link to="/admin/dashboard" className="hover:text-primary-light transition">Dashboard</Link>
                    <Link to="/admin/users" className="hover:text-primary-light transition">Warga</Link>
                    <Link to="/admin/schedules" className="hover:text-primary-light transition">Jadwal</Link>
                    <Link to="/admin/articles" className="hover:text-primary-light transition">Edukasi</Link>
                    <Link to="/admin/reports" className="hover:text-primary-light transition">Laporan</Link>
                  </>
                )}

                {user.role === 'warga' && (
                  <>
                    <Link to="/warga/dashboard" className="hover:text-primary-light transition">Dashboard</Link>
                    <Link to="/warga/schedules" className="hover:text-primary-light transition">Jadwal</Link>
                    <Link to="/warga/articles" className="hover:text-primary-light transition">Edukasi</Link>
                    <Link to="/warga/report/new" className="hover:text-primary-light transition">Lapor Sampah</Link>
                    <Link to="/warga/reports" className="hover:text-primary-light transition">Laporan Saya</Link>
                  </>
                )}

                <div className="flex items-center gap-4">
                  <span className="text-sm">{user.fullName}</span>
                  <Link to={user.role === 'warga' ? '/warga/profile' : '#'} className="hover:text-primary-light transition text-sm">
                    Profil
                  </Link>
                  <button onClick={handleLogout} className="btn btn-primary-outline text-sm px-4 py-2">Logout</button>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block text-sm hover:bg-primary-dark px-2 py-2 rounded">Beranda</Link>

            {!user ? (
              <>
                <Link to="/login" className="block text-sm hover:bg-primary-dark px-2 py-2 rounded">Login</Link>
                <Link to="/register" className="block text-sm hover:bg-primary-dark px-2 py-2 rounded">Daftar</Link>
              </>
            ) : (
              <>
                {user.role === 'admin' && (
                  <>
                    <Link to="/admin/dashboard" className="block text-sm hover:bg-primary-dark px-2 py-2 rounded">Dashboard</Link>
                    <Link to="/admin/users" className="block text-sm hover:bg-primary-dark px-2 py-2 rounded">Warga</Link>
                    <Link to="/admin/schedules" className="block text-sm hover:bg-primary-dark px-2 py-2 rounded">Jadwal</Link>
                    <Link to="/admin/articles" className="block text-sm hover:bg-primary-dark px-2 py-2 rounded">Edukasi</Link>
                    <Link to="/admin/reports" className="block text-sm hover:bg-primary-dark px-2 py-2 rounded">Laporan</Link>
                  </>
                )}

                {user.role === 'warga' && (
                  <>
                    <Link to="/warga/dashboard" className="block text-sm hover:bg-primary-dark px-2 py-2 rounded">Dashboard</Link>
                    <Link to="/warga/schedules" className="block text-sm hover:bg-primary-dark px-2 py-2 rounded">Jadwal</Link>
                    <Link to="/warga/articles" className="block text-sm hover:bg-primary-dark px-2 py-2 rounded">Edukasi</Link>
                    <Link to="/warga/report/new" className="block text-sm hover:bg-primary-dark px-2 py-2 rounded">Lapor Sampah</Link>
                    <Link to="/warga/reports" className="block text-sm hover:bg-primary-dark px-2 py-2 rounded">Laporan Saya</Link>
                  </>
                )}

                <button onClick={handleLogout} className="block text-sm w-full text-left hover:bg-primary-dark px-2 py-2 rounded">
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
