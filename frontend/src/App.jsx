import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import './styles/globals.css';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminSchedules from './pages/admin/Schedules';
import AdminArticles from './pages/admin/Articles';
import AdminReports from './pages/admin/Reports';
import WargaDashboard from './pages/warga/Dashboard';
import WargaSchedules from './pages/warga/Schedules';
import WargaArticles from './pages/warga/Articles';
import WargaReportCreate from './pages/warga/ReportCreate';
import WargaReports from './pages/warga/Reports';
import WargaProfile from './pages/warga/Profile';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

function AppContent() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin routes */}
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute role="admin">
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <PrivateRoute role="admin">
                  <AdminUsers />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/schedules"
              element={
                <PrivateRoute role="admin">
                  <AdminSchedules />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/articles"
              element={
                <PrivateRoute role="admin">
                  <AdminArticles />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <PrivateRoute role="admin">
                  <AdminReports />
                </PrivateRoute>
              }
            />

            {/* Warga routes */}
            <Route
              path="/warga/dashboard"
              element={
                <PrivateRoute role="warga">
                  <WargaDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/warga/schedules"
              element={
                <PrivateRoute role="warga">
                  <WargaSchedules />
                </PrivateRoute>
              }
            />
            <Route
              path="/warga/articles"
              element={
                <PrivateRoute role="warga">
                  <WargaArticles />
                </PrivateRoute>
              }
            />
            <Route
              path="/warga/report/new"
              element={
                <PrivateRoute role="warga">
                  <WargaReportCreate />
                </PrivateRoute>
              }
            />
            <Route
              path="/warga/reports"
              element={
                <PrivateRoute role="warga">
                  <WargaReports />
                </PrivateRoute>
              }
            />
            <Route
              path="/warga/profile"
              element={
                <PrivateRoute role="warga">
                  <WargaProfile />
                </PrivateRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
