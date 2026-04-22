import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Bell, Menu, X, LogOut, User, ChevronDown, Star } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { user, role, notifications, logout, markNotificationRead } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [showNotif, setShowNotif] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const unread = notifications.filter(n => !n.isRead).length

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLinks = role === 'admin'
    ? [
        { to: '/admin', label: 'Dashboard' },
        { to: '/complaints', label: 'Complaints' },
        { to: '/tracking', label: 'Vehicle Tracking' },
      ]
    : [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/waste', label: 'Waste Pickup' },
        { to: '/complaints', label: 'Complaints' },
        { to: '/payments', label: 'Payments' },
        { to: '/tracking', label: 'Live Tracking' },
        { to: '/booking', label: 'Booking' },
        { to: '/notices', label: 'Notices' },
        { to: '/vault', label: 'Vault' },
      ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={user ? (role === 'admin' ? '/admin' : '/dashboard') : '/'} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md">
              <span className="text-white font-display font-bold text-sm">eN</span>
            </div>
            <div>
              <span className="font-display font-bold text-navy-500 text-lg leading-none block">e-NagarSetu</span>
              <span className="text-xs text-slate-500 leading-none font-body">Smart Municipal Platform</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          {user && (
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1.5 rounded-lg text-sm font-display font-semibold tracking-wide transition-all duration-200 ${
                    location.pathname === link.to
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right section */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => { setShowNotif(!showNotif); setShowMenu(false) }}
                    className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all duration-200"
                  >
                    <Bell size={20} />
                    {unread > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {unread}
                      </span>
                    )}
                  </button>
                  {showNotif && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                        <span className="font-display font-bold text-navy-500">Notifications</span>
                        <span className="badge-orange">{unread} new</span>
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {notifications.map(n => (
                          <div
                            key={n.id}
                            onClick={() => markNotificationRead(n.id)}
                            className={`px-4 py-3 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${!n.isRead ? 'bg-primary-50/50' : ''}`}
                          >
                            <div className="flex items-start gap-3">
                              <span className={`mt-0.5 inline-block w-2 h-2 rounded-full flex-shrink-0 ${!n.isRead ? 'bg-primary-500' : 'bg-slate-300'}`} />
                              <div>
                                <p className="text-sm text-slate-700 font-body">{n.message}</p>
                                <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User menu */}
                <div className="relative">
                  <button
                    onClick={() => { setShowMenu(!showMenu); setShowNotif(false) }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                      <span className="text-white font-display font-bold text-xs">
                        {user.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="text-sm font-display font-semibold text-slate-700 hidden sm:block">{user.name}</span>
                    <ChevronDown size={14} className="text-slate-400" />
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                      <Link to="/profile" className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-body" onClick={() => setShowMenu(false)}>
                        <User size={15} /> Profile
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-body">
                        <LogOut size={15} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-sm py-2 px-4">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">Register</Link>
              </div>
            )}

            {/* Mobile hamburger */}
            {user && (
              <button className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>
        </div>

        {/* Premium Mobile Drawer Overlay */}
        <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 overflow-hidden ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
           <div className={`absolute inset-0 bg-navy-900/60 backdrop-blur-sm transition-opacity duration-500 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMobileOpen(false)}></div>
           <div className={`absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl transition-transform duration-500 transform ${mobileOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
              {/* Drawer Header */}
              <div className="p-6 bg-navy-900 text-white flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                       <span className="text-white font-display font-bold">eN</span>
                    </div>
                    <span className="font-display font-bold text-lg">Menu</span>
                 </div>
                 <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                    <X size={20} />
                 </button>
              </div>

              {/* Profile Brief in Drawer */}
              {user && (
                <div className="p-6 bg-slate-50 border-b border-slate-100">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-display font-bold text-xl">
                         {user.name?.charAt(0)}
                      </div>
                      <div>
                         <p className="font-display font-bold text-navy-800 leading-none">{user.name}</p>
                         <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">{role} Entity</p>
                      </div>
                   </div>
                   <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-2">
                         <Star size={12} className="text-saffron-500 fill-saffron-500" />
                         <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Civic Index</span>
                      </div>
                      <span className="text-lg font-display font-bold text-navy-900 leading-none">{user.civicScore || user.score || 740}</span>
                   </div>
                </div>
              )}

              {/* Nav Links */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                 {navLinks.map(link => (
                    <Link
                       key={link.to}
                       to={link.to}
                       onClick={() => setMobileOpen(false)}
                       className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-display font-bold transition-all ${
                          location.pathname === link.to
                             ? 'bg-primary-50 text-primary-700'
                             : 'text-slate-600 hover:bg-slate-50'
                       }`}
                    >
                       <span className="truncate">{link.label}</span>
                       {location.pathname === link.to && <div className="ml-auto w-1.5 h-1.5 bg-primary-500 rounded-full"></div>}
                    </Link>
                 ))}
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-slate-100 mt-auto">
                 <button onClick={handleLogout} className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-display font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
                    <LogOut size={18} /> Logout and End Session
                 </button>
              </div>
           </div>
        </div>
      </div>
    </nav>
  )
}
