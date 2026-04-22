import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CitizenDashboard from './pages/CitizenDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ComplaintsPage from './pages/ComplaintsPage'
import PaymentsPage from './pages/PaymentsPage'
import WasteManagementPage from './pages/WasteManagementPage'
import TrackingPage from './pages/TrackingPage'
import ProfilePage from './pages/ProfilePage'
import BookingPage from './pages/BookingPage'
import NoticesPage from './pages/NoticesPage'
import VaultPage from './pages/VaultPage'

function AppRoutes() {
  const { user, role } = useApp()

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={user ? <Navigate to={role === 'admin' ? '/admin' : '/dashboard'} /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
      <Route path="/dashboard" element={user && role !== 'admin' ? <CitizenDashboard /> : <Navigate to="/login" />} />
      <Route path="/admin" element={user && role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
      <Route path="/complaints" element={user ? <ComplaintsPage /> : <Navigate to="/login" />} />
      <Route path="/payments" element={user ? <PaymentsPage /> : <Navigate to="/login" />} />
      <Route path="/waste" element={user ? <WasteManagementPage /> : <Navigate to="/login" />} />
      <Route path="/tracking" element={user ? <TrackingPage /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
      <Route path="/booking" element={user ? <BookingPage /> : <Navigate to="/login" />} />
      <Route path="/notices" element={user ? <NoticesPage /> : <Navigate to="/login" />} />
      <Route path="/vault" element={user ? <VaultPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}
