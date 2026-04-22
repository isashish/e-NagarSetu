import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Trash2, FileText, CreditCard, MapPin,
  User, BarChart3, Truck, Settings, Star,
  Calendar, Megaphone, Shield
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const citizenLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/waste', label: 'Waste Pickup', icon: Trash2 },
  { to: '/complaints', label: 'My Complaints', icon: FileText },
  { to: '/payments', label: 'Pay Bills & Tax', icon: CreditCard },
  { to: '/tracking', label: 'Live Tracking', icon: MapPin },
  { to: '/booking', label: 'Resource Booking', icon: Calendar },
  { to: '/notices', label: 'Notice Board', icon: Megaphone },
  { to: '/vault', label: 'Document Vault', icon: Shield },
  { to: '/profile', label: 'My Profile', icon: User },
]

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/complaints', label: 'All Complaints', icon: FileText },
  { to: '/tracking', label: 'Vehicle Tracking', icon: Truck },
  { to: '/payments', label: 'Revenue', icon: BarChart3 },
  { to: '/profile', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const { role, user } = useApp()
  const location = useLocation()
  const links = role === 'admin' ? adminLinks : citizenLinks

  return (
    <aside className="hidden lg:flex flex-col w-72 h-[calc(100vh-64px)] sticky top-16 pt-8 pb-6 px-5 border-r border-slate-200/50 overflow-hidden bg-white/50 backdrop-blur-xl">
      {/* Dynamic Profile Section - Premium Drawer Card */}
      <div className="relative rounded-3xl overflow-hidden p-5 mb-6 group bg-navy-900 shadow-2xl min-h-[120px] flex flex-col justify-center shrink-0 border border-white/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/30 to-navy-900 mix-blend-overlay"></div>
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-all duration-700"></div>
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl shrink-0">
                <span className="text-white font-display font-bold text-xl tracking-tighter">{user?.name?.charAt(0) || 'U'}</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-[3px] border-navy-900"></div>
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-white text-sm truncate leading-tight group-hover:text-primary-400 transition-colors uppercase tracking-tight">
                {user?.name?.split(' ')[0] || 'Citizen'}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                 <span className="text-[8px] text-primary-400 uppercase tracking-[0.15em] font-bold font-body">{role} Entity</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-2.5 px-3 flex items-center justify-between group-hover:bg-white/10 transition-all shadow-inner">
            <div className="flex flex-col">
               <span className="text-[8px] text-primary-400 font-bold uppercase tracking-[0.15em]">Index Score</span>
               <div className="flex items-center gap-1">
                  <Star size={9} className="text-saffron-400 fill-saffron-400" />
                  <span className="text-[8px] text-slate-300 font-bold uppercase tracking-widest">Global Rank</span>
               </div>
            </div>
            <span className="text-xl font-display font-bold text-white leading-none tracking-tighter">{user?.civicScore || user?.score || 740}</span>
          </div>
        </div>
      </div>

      {/* Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
        <nav className="space-y-2">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] px-4 mb-3">Main Navigation</p>
          {links.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-[1.25rem] text-sm font-display font-bold transition-all duration-300 group/link ${
                  active
                    ? 'bg-primary-600 text-white shadow-xl shadow-primary-500/30 translate-x-1'
                    : 'text-slate-500 hover:bg-white hover:text-navy-900 hover:shadow-lg hover:shadow-slate-200/50'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                   active ? 'bg-white/20' : 'bg-slate-100 group-hover/link:bg-primary-50 group-hover/link:text-primary-600'
                }`}>
                  <Icon size={18} className={active ? 'text-white' : 'text-slate-400 group-hover/link:text-primary-600 transition-colors'} />
                </div>
                <span className="truncate tracking-tight">{label}</span>
                {active && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>}
              </Link>
            )
          })}
        </nav>

        {/* Modern Version Label - Inside scrollable area to ensure visibility on small heights */}
        <div className="px-4 py-4 rounded-2xl bg-slate-100/50 border border-slate-200/50 mt-8 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">System v2.4</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] shrink-0"></span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
             <div className="w-full h-full bg-gradient-to-r from-primary-400 to-primary-600"></div>
          </div>
        </div>
      </div>
    </aside>
  )
}
