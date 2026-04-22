import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { useApp } from '../context/AppContext'
import {
  Trash2, FileText, CreditCard, MapPin, Star, Zap, Leaf,
  ChevronRight, CheckCircle, Clock, AlertCircle, TrendingUp, Users,
  Wind, CloudRain, ShieldAlert, Megaphone, Bell, Shield
} from 'lucide-react'

const quickActions = [
  { to: '/waste', icon: Trash2, label: 'Request Pickup', desc: 'Mark garbage ready', color: 'from-primary-500 to-primary-700' },
  { to: '/complaints', icon: FileText, label: 'File Complaint', desc: 'Report an issue', color: 'from-blue-500 to-blue-700' },
  { to: '/payments', icon: CreditCard, label: 'Pay Bills', desc: 'Tax & charges', color: 'from-saffron-500 to-saffron-600' },
  { to: '/tracking', icon: MapPin, label: 'Live Track', desc: 'Vehicle location', color: 'from-purple-500 to-purple-700' },
]

const recentComplaints = [
  { id: 'C-1024', title: 'Garbage overflow near market', status: 'Resolved', date: 'Apr 17', priority: 'High' },
  { id: 'C-1031', title: 'Street light not working', status: 'In Progress', date: 'Apr 18', priority: 'Medium' },
  { id: 'C-1042', title: 'Drain blockage on Main St', status: 'Pending', date: 'Apr 19', priority: 'High' },
]

const paymentDues = [
  { type: 'Property Tax', due: '₹2,500', dueDate: 'May 31', overdue: false },
  { type: 'Water Bill', due: '₹380', dueDate: 'Apr 25', overdue: true },
]

function StatusBadge({ status }) {
  const map = {
    'Resolved': 'badge-green',
    'In Progress': 'badge-orange',
    'Pending': 'badge-red',
    'Submitted': 'badge-blue',
  }
  return <span className={map[status] || 'badge-gray'}>{status}</span>
}

const dashboardSlider = [
  { url: '/waste_management.png', quote: 'Cleanliness starts with you. Join the Ward 05 initiative.', highlight: 'Green Initiative' },
  { url: '/digital_citizen.png', quote: 'Transparent governance at your fingertips.', highlight: 'Digital India' },
  { url: '/community_problem_ref.png', quote: 'Building a sustainable future, together.', highlight: 'Smart City' },
]

export default function CitizenDashboard() {
  const { user, envMetrics, announcements } = useApp()
  const [garbageReady, setGarbageReady] = useState(false)
  const [pickupConfirmed, setPickupConfirmed] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dashboardSlider.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const confirmPickup = () => {
    setGarbageReady(true)
    setTimeout(() => setPickupConfirmed(true), 500)
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Premium Greeting Header */}
        <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-navy-900 p-6 md:p-8 text-white shadow-2xl group min-h-[180px] md:min-h-[220px] flex items-center transition-all duration-700">
          <div className="absolute inset-0 z-0">
             {dashboardSlider.map((slide, idx) => (
                <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-30' : 'opacity-0'}`}>
                   <img src={slide.url} alt="Slide" className="w-full h-full object-cover transition-transform duration-[10s] scale-105" />
                   <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/40 to-transparent"></div>
                </div>
             ))}
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between w-full gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
              <div className="relative group/avatar">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl border border-white/20 flex items-center justify-center text-2xl md:text-3xl font-display font-bold shadow-2xl transition-transform group-hover/avatar:rotate-3">
                  {user?.name?.charAt(0) || 'C'}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-7 md:h-7 rounded-lg md:rounded-xl bg-green-500 border-[3px] md:border-[4px] border-navy-900 flex items-center justify-center shadow-lg">
                   <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                   <div className="bg-primary-500/20 backdrop-blur-md text-primary-300 px-2.5 py-1 rounded-full text-[8px] md:text-[9px] uppercase tracking-[0.15em] font-bold border border-white/5 flex items-center gap-1.5">
                     <Shield size={9} className="fill-primary-300/30" />
                     Verified
                   </div>
                   <div className="bg-white/5 backdrop-blur-md text-saffron-300 px-2.5 py-1 rounded-full text-[8px] md:text-[9px] uppercase tracking-[0.15em] font-bold border border-white/5">
                     {dashboardSlider[currentSlide].highlight}
                   </div>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-1 tracking-tight">
                  Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-400">{user?.name?.split(' ')[0]}</span>
                </h1>
                <div className="flex flex-col gap-0.5">
                  <p className="text-slate-400 font-body flex items-center gap-2 text-xs md:text-sm">
                    <MapPin size={12} className="text-primary-400" /> 
                    Ward {user?.ward || 5} · Sector B
                  </p>
                  <p className="text-[9px] md:text-[10px] text-primary-400/70 font-bold uppercase tracking-[0.1em] italic leading-tight">
                     "{dashboardSlider[currentSlide].quote}"
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-3 mt-2 lg:mt-0">
               <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-5 px-6 rounded-[1.5rem] md:rounded-[2rem] min-w-full sm:min-w-[200px] border-white/5 group-hover:bg-white/10 transition-all duration-500">
                  <div className="w-full space-y-2 md:space-y-3">
                    <p className="text-[8px] md:text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] text-center opacity-70">Civic Index</p>
                    
                    <p className="text-3xl md:text-4xl font-display font-bold text-white text-center leading-none tracking-tighter">
                      {user?.civicScore || user?.score || 740}
                    </p>
                    
                    <div className="flex flex-col items-center gap-1">
                       <div className="flex items-center gap-1.5 text-saffron-400 font-bold text-[8px] md:text-[9px] uppercase tracking-[0.15em]">
                          <Star size={9} className="fill-saffron-400" />
                          <span>Elite Contributor</span>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Floating Garbage Ready Banner */}
        <div className={`glass-card rounded-3xl p-6 transition-all duration-700 transform ${
          pickupConfirmed ? 'border-primary-500/30' : 'border-saffron-500/30'
        } hover:shadow-2xl`}>
          {pickupConfirmed ? (
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30 animate-float">
                <CheckCircle size={32} className="text-white" />
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-xl font-display font-bold text-navy-800">Route Optimized!</h3>
                <p className="text-slate-500 font-body mt-1">Vehicle <span className="font-bold text-primary-600">GJ-01-ET-2024</span> is assigned. Est: <strong className="text-navy-900">10:30 AM</strong></p>
              </div>
              <div className="flex gap-2">
                 <Link to="/tracking" className="btn-primary text-sm px-6">Live Track</Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-saffron-500 flex items-center justify-center shadow-lg shadow-saffron-500/30 animate-bounce-slow">
                  <Trash2 size={30} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-navy-800">Is your garbage ready?</h3>
                  <p className="text-slate-500 font-body mt-1 max-w-xs">One tap helps us save <strong className="text-saffron-600">20% fuel</strong> by optimizing collection routes.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <button onClick={confirmPickup} className="flex-1 lg:flex-none bg-primary-600 text-white px-8 py-4 rounded-2xl font-display font-bold hover:bg-primary-700 transition-all shadow-xl hover:shadow-primary-500/20 active:scale-95">
                  Confirm Ready
                </button>
                <button className="flex-1 lg:flex-none glass-card px-8 py-4 rounded-2xl font-display font-bold text-slate-600 hover:bg-slate-50 transition-all">
                  Skip Today
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Main Action App Tiles */}
          {quickActions.map(({ to, icon: Icon, label, desc, color }) => (
            <Link key={to} to={to} className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-0">
               <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-[0.03] rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700`}></div>
               <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg sm:mb-6 group-hover:rotate-6 transition-transform shrink-0`}>
                 <Icon size={20} className="text-white sm:w-6 sm:h-6" />
               </div>
               <div className="min-w-0">
                 <h3 className="font-display font-bold text-navy-800 text-base sm:text-lg mb-0.5 sm:mb-1 truncate">{label}</h3>
                 <p className="text-[10px] sm:text-xs text-slate-400 font-body leading-relaxed line-clamp-1 sm:line-clamp-none">{desc}</p>
                 <div className="mt-2 hidden sm:flex items-center text-[10px] font-bold text-primary-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                   Open Utility →
                 </div>
               </div>
            </Link>
          ))}

          {/* Large Analytics Card (Span 2) */}
          <div className="lg:col-span-2 glass-card rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-8">
             <div className="w-full md:w-1/2 space-y-4">
                <h3 className="section-title">Eco-Impact Index</h3>
                <p className="text-sm text-slate-500 font-body mb-6">Tracking your contribution toward a <span className="font-bold text-primary-600">Net Zero</span> Ward 05.</p>
                <div className="space-y-4">
                   <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                         <span>Carbon Offset</span>
                         <span className="text-primary-600">6.4 / 10 kg</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full" style={{ width: '64%' }}></div>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                         <span>Community Rank</span>
                         <span className="text-saffron-600">Gold Tier</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-gradient-to-r from-saffron-400 to-saffron-600 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                   </div>
                </div>
             </div>
             <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="relative w-40 h-40">
                   <svg className="w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                      <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * 0.74)} className="text-primary-500" strokeLinecap="round" />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-display font-bold text-navy-800">74%</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Efficiency</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Pending Dues (Bento Box style) */}
          <div className="lg:col-span-1 glass-card rounded-[2rem] p-8">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-navy-800">Unpaid Dues</h3>
                <CreditCard size={20} className="text-saffron-500" />
             </div>
             <div className="space-y-4">
               {paymentDues.map(p => (
                 <div key={p.type} className="flex flex-col gap-1 p-3 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-primary-200 transition-colors">
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-bold text-slate-700 font-display">{p.type}</span>
                       <span className={`text-xs font-bold ${p.overdue ? 'text-red-500' : 'text-primary-600'}`}>{p.due}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{p.dueDate}</span>
                 </div>
               ))}
               <Link to="/payments" className="block w-full text-center py-3 rounded-xl bg-navy-900 text-white font-display font-bold text-sm hover:bg-navy-800 transition-colors mt-2">
                 Settle All Dues
               </Link>
             </div>
          </div>

          {/* Recent Reports Status */}
          <div className="lg:col-span-1 glass-card rounded-[2rem] p-8">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-navy-800">Reports</h3>
                <Link to="/complaints" className="text-[10px] font-bold text-primary-600 uppercase">Manage</Link>
             </div>
             <div className="space-y-6">
                {recentComplaints.slice(0, 2).map((c) => (
                   <div key={c.id} className="flex gap-4">
                      <div className={`mt-1 w-2.5 h-2.5 rounded-full ring-4 ring-offset-2 ${
                        c.status === 'Resolved' ? 'bg-primary-500 ring-primary-100' : 
                        c.status === 'In Progress' ? 'bg-saffron-500 ring-saffron-100' : 'bg-red-500 ring-red-100'
                      }`} />
                      <div className="min-w-0">
                         <p className="text-xs font-bold text-navy-700 truncate">{c.title}</p>
                         <p className="text-[10px] text-slate-400 mt-0.5">{c.status} · {c.date}</p>
                      </div>
                   </div>
                ))}
                <div className="pt-2 border-t border-slate-100 text-center">
                   <p className="text-[10px] text-slate-400 font-body">Showing 2 of 12 active reports</p>
                </div>
             </div>
          </div>

        </div>

        {/* New Features Row: SOS, AQI/Weather, and Notice Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           
           {/* SOS EMERGENCY CARD */}
           <div className="lg:col-span-1 glass-card rounded-[2rem] p-8 bg-red-50 border-red-100 group hover:bg-red-600 transition-all duration-500 overflow-hidden relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-100 rounded-full opacity-50 group-hover:scale-[3] transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-red-500/30 group-hover:bg-white group-hover:text-red-600">
                   <ShieldAlert size={24} className="animate-pulse" />
                </div>
                <h3 className="font-display font-bold text-navy-800 text-lg group-hover:text-white">Emergency SOS</h3>
                <p className="text-xs text-slate-500 mt-2 font-body group-hover:text-red-50">One tap for immediate municipal assistance.</p>
                <button className="mt-6 w-full py-3 bg-red-600 text-white rounded-xl font-display font-bold text-sm shadow-xl group-hover:bg-white group-hover:text-red-600">
                   Trigger Alert
                </button>
              </div>
           </div>

           {/* AQI & WEATHER CARD */}
           <div className="lg:col-span-1 glass-card rounded-[2rem] p-8 bg-gradient-to-br from-white to-slate-50 transition-all hover:shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                 <div>
                    <h3 className="font-display font-bold text-navy-800">Local Environment</h3>
                    <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Last updated: {envMetrics?.lastUpdated}</p>
                 </div>
                 <Wind size={20} className="text-primary-500" />
              </div>
              <div className="flex items-center gap-6 mb-6">
                 <div className="text-center">
                    <p className="text-3xl font-display font-bold text-primary-600 leading-none">{envMetrics?.aqi}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">AQI Status</p>
                    <span className="badge-green text-[9px] mt-1 inline-block">{envMetrics?.aqiStatus}</span>
                 </div>
                 <div className="w-px h-10 bg-slate-200"></div>
                 <div className="text-center">
                    <p className="text-3xl font-display font-bold text-navy-800 leading-none">{envMetrics?.temp}°</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Temp (C)</p>
                    <span className="text-[10px] font-bold text-slate-600 mt-1 flex items-center gap-1"><CloudRain size={10} /> {envMetrics?.condition}</span>
                 </div>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-body italic">"Air quality is ideal for outdoor municipal participation today."</p>
           </div>

           {/* NOTICE BOARD CARD */}
           <div className="lg:col-span-2 glass-card rounded-[2rem] p-8 border-primary-100">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
                       <Megaphone size={20} />
                    </div>
                    <div>
                       <h3 className="font-display font-bold text-navy-800">Notice Board</h3>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Official Municipal Updates</p>
                    </div>
                 </div>
                 <Link to="/notices" className="text-[10px] font-bold text-primary-600 uppercase tracking-widest hover:underline">View All Updates</Link>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                 {announcements?.map(a => (
                    <div key={a.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-primary-200 transition-all cursor-pointer">
                       <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-bold text-primary-600 uppercase bg-primary-50 px-2 py-0.5 rounded-full">{a.date}</span>
                       </div>
                       <h4 className="text-sm font-display font-bold text-navy-800 mb-1 group-hover:text-primary-700 transition-colors uppercase tracking-tight">{a.title}</h4>
                       <p className="text-xs text-slate-500 font-body line-clamp-2 leading-relaxed">{a.content}</p>
                    </div>
                 ))}
              </div>
           </div>

        </div>
      </div>
    </Layout>
  )
}
