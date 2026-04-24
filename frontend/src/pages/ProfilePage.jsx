import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useApp } from '../context/AppContext'
import { updateUser } from '../api'
import { User, Mail, Phone, MapPin, Star, Shield, Edit3, Save, CheckCircle, Award, TrendingUp, RefreshCw } from 'lucide-react'

const achievements = [
  { icon: '🏆', title: 'Consistent Reporter', desc: '30 days streak of daily garbage marking', earned: true },
  { icon: '💧', title: 'Water Saver', desc: 'Timely water bill payments for 6 months', earned: true },
  { icon: '🌱', title: 'Eco Warrior', desc: 'Contributed to 50kg CO₂ reduction', earned: false },
  { icon: '⭐', title: 'Star Citizen', desc: 'Civic score above 800', earned: false },
]

const activityLog = [
  { action: 'Garbage marked ready', points: '+10', date: 'Today', type: 'green' },
  { action: 'Complaint #C-1024 resolved', points: null, date: 'Apr 19', type: 'blue' },
  { action: 'Water bill paid ₹355', points: '+5', date: 'Mar 22', type: 'orange' },
  { action: 'Reported pothole on School Road', points: '+15', date: 'Apr 15', type: 'purple' },
  { action: 'Property tax paid ₹2,500', points: '+50', date: 'Jan 15', type: 'green' },
]

export default function ProfilePage() {
  const { user, login } = useApp()
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [form, setForm] = useState({
    name: user?.fullName || user?.name || '',
    email: user?.email || '',
    mobile: user?.phone || user?.mobile || '',
    address: user?.address || '',
    city: user?.city || '',
    ward: user?.ward || '',
    pincode: user?.pincode || '',
  })

  const handleSave = async () => {
    setLoading(true)
    setError('')
    try {
      const updatedData = {
        ...user,
        fullName: form.name,
        email: form.email,
        phone: form.mobile,
        address: form.address,
        city: form.city,
        ward: form.ward,
        pincode: form.pincode
      };
      
      const response = await updateUser(user.id, updatedData);
      
      // Update global context
      login(response, response.role.toLowerCase());
      
      setSaved(true)
      setEditing(false)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err.message || 'Failed to update profile. Ensure backend is running.');
    } finally {
      setLoading(false)
    }
  }

  const score = user?.civicScore || user?.score || 740
  const scoreLevel = score >= 800 ? 'Gold' : score >= 600 ? 'Silver' : 'Bronze'
  const levelColors = { Gold: 'text-yellow-600', Silver: 'text-slate-500', Bronze: 'text-orange-600' }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in pb-12 max-w-6xl mx-auto">
        {/* Premium Profile Header */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-navy-900 p-10 text-white shadow-2xl group flex items-center min-h-[250px]">
          <div className="absolute inset-0 z-0 text-white">
             <img src="/smart_city_hero_1776681701175.png" alt="Citizen Mission" className="w-full h-full object-cover opacity-40 transition-transform duration-[10s] group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/60 to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-8">
            <div className="flex items-center gap-8">
               <div className="relative group/avatar">
                  <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-primary-500 to-primary-700 p-1 shadow-2xl shadow-primary-500/30">
                     <div className="w-full h-full rounded-[1.8rem] bg-navy-900 flex items-center justify-center border border-white/10 uppercase font-display font-bold text-4xl text-white">
                        {form.name.charAt(0)}
                     </div>
                  </div>
                  <button 
                    disabled={loading}
                    onClick={() => editing ? handleSave() : setEditing(true)} 
                    className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-white text-navy-900 flex items-center justify-center shadow-xl hover:scale-110 transition-all border border-slate-100 disabled:opacity-50"
                  >
                     {loading ? (
                       <RefreshCw size={18} className="animate-spin text-primary-600" />
                     ) : editing ? (
                       <Save size={18} className="text-primary-600" />
                     ) : (
                       <Edit3 size={18} />
                     )}
                  </button>
               </div>
               <div className="space-y-2">
                 <div className="inline-flex items-center gap-2 bg-saffron-500/20 text-saffron-300 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold border border-white/10">
                    <Shield size={12} /> Verified Resident
                 </div>
                 <h1 className="text-4xl font-display font-bold">{form.name}</h1>
                 <p className="text-slate-400 font-body text-sm flex items-center gap-2">
                    <MapPin size={14} className="text-primary-500" /> Ward {form.ward}, {form.city} Nagar Palika
                 </p>
               </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] min-w-[280px]">
               <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Civic Score Index</span>
                  <Star size={16} className="text-saffron-400 fill-saffron-400" />
               </div>
               <div className="flex items-baseline gap-2 mb-3">
                  <h3 className="text-4xl font-display font-bold text-white">{score}</h3>
                  <span className={`text-sm font-bold uppercase tracking-widest ${levelColors[scoreLevel]}`}>{scoreLevel} Tier</span>
               </div>
               <div className="space-y-2">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-gradient-to-r from-saffron-400 to-saffron-600 transition-all duration-1000" style={{ width: `${Math.min(score / 800 * 100, 100)}%` }} />
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] text-center">Next Re-evaluation: 12 May 2024</p>
               </div>
            </div>
          </div>
        </div>

        {saved && (
          <div className="glass-card rounded-2xl p-4 border-l-4 border-green-500 flex items-center gap-3 animate-slide-up">
            <CheckCircle size={20} className="text-green-500" />
            <p className="text-sm font-display font-bold text-navy-800">Operational Profile Synchronized Successfully</p>
          </div>
        )}

        {error && (
          <div className="glass-card rounded-2xl p-4 border-l-4 border-red-500 flex items-center gap-3 animate-slide-up">
            <Shield size={20} className="text-red-500" />
            <p className="text-sm font-display font-bold text-red-800">{error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info Columns */}
          <div className="lg:col-span-2 space-y-8">
             {/* Personal and Address Bento */}
             <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-card rounded-[2rem] p-8 space-y-6">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                         <User size={16} />
                      </div>
                      <h3 className="text-lg font-display font-bold text-navy-800">Identity Details</h3>
                   </div>
                   <div className="space-y-5">
                      {[
                        { icon: User, label: 'Legal Name', key: 'name', type: 'text' },
                        { icon: Mail, label: 'Secure Email', key: 'email', type: 'email' },
                        { icon: Phone, label: 'Validated Contact', key: 'mobile', type: 'tel' },
                      ].map(({ icon: Icon, label, key, type }) => (
                        <div key={key} className="space-y-1.5 focus-within:translate-x-1 transition-transform">
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-2">{label}</label>
                          {editing ? (
                            <input type={type} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-body outline-none focus:border-primary-500 focus:bg-white transition-all shadow-sm" value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                          ) : (
                            <p className="text-sm font-display font-bold text-navy-800 bg-slate-100/50 px-4 py-3.5 rounded-2xl border border-slate-200/50">{form[key]}</p>
                          )}
                        </div>
                      ))}
                   </div>
                </div>

                <div className="glass-card rounded-[2rem] p-8 space-y-6">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-saffron-50 text-saffron-600 flex items-center justify-center">
                         <MapPin size={16} />
                      </div>
                      <h3 className="text-lg font-display font-bold text-navy-800">Geospatial Data</h3>
                   </div>
                   <div className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-2">Street Address</label>
                        {editing ? <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-body outline-none focus:border-primary-500 focus:bg-white transition-all" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} /> : <p className="text-sm font-display font-bold text-navy-800 bg-slate-100/50 px-4 py-3.5 rounded-2xl border border-slate-200/50">{form.address}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-2">Municipality</label>
                          {editing ? <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-body outline-none focus:border-primary-500" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} /> : <p className="text-sm font-display font-bold text-navy-800 bg-slate-100/50 px-4 py-3.5 rounded-2xl">{form.city}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-2">Ward Assignment</label>
                          {editing ? <input type="number" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-body outline-none focus:border-primary-500" value={form.ward} onChange={e => setForm(f => ({ ...f, ward: e.target.value }))} /> : <p className="text-sm font-display font-bold text-navy-800 bg-slate-100/50 px-4 py-3.5 rounded-2xl">Unit {form.ward}</p>}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-2">Postal Routing</label>
                        {editing ? <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-body outline-none focus:border-primary-500" value={form.pincode} onChange={e => setForm(f => ({ ...f, pincode: e.target.value }))} /> : <p className="text-sm font-display font-bold text-navy-800 bg-slate-100/50 px-4 py-3.5 rounded-2xl">{form.pincode}</p>}
                      </div>
                   </div>
                </div>
             </div>

             {/* Recent Activity Log */}
             <div className="glass-card rounded-[2rem] p-8">
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-600 flex items-center justify-center">
                         <TrendingUp size={20} />
                      </div>
                      <h3 className="text-xl font-display font-bold text-navy-800">Operational Log</h3>
                   </div>
                   <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-600 hover:underline">Download Annual Audit</button>
                </div>
                <div className="space-y-2">
                  {activityLog.map((a, i) => (
                    <div key={i} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(0,0,0,0.1)]`} style={{ background: a.type === 'green' ? '#22c55e' : a.type === 'blue' ? '#3b82f6' : a.type === 'orange' ? '#f97316' : '#a855f7' }} />
                      <div className="flex-1">
                         <p className="text-sm font-display font-bold text-navy-800">{a.action}</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Municipal Record · {a.date}</p>
                      </div>
                      {a.points && (
                         <div className="bg-saffron-50 px-3 py-1 rounded-lg border border-saffron-100">
                            <p className="text-xs font-display font-bold text-saffron-700">{a.points} PTS</p>
                         </div>
                      )}
                    </div>
                  ))}
                </div>
             </div>
          </div>

          {/* Sidebar Columns */}
          <div className="space-y-8">
             {/* Achievements Bento Card */}
             <div className="glass-card rounded-[2.5rem] p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Award size={120} />
                </div>
                <div className="relative z-10">
                   <h3 className="text-xl font-display font-bold text-navy-800 mb-8">Citizen Merit</h3>
                   <div className="space-y-4">
                     {achievements.map(a => (
                       <div key={a.title} className={`group flex items-center gap-4 p-4 rounded-3xl transition-all border ${a.earned ? 'bg-white border-saffron-100 shadow-xl shadow-saffron-500/5' : 'bg-slate-50/50 border-slate-100 opacity-60 grayscale'}`}>
                         <div className="text-3xl transition-transform group-hover:scale-110 duration-500">{a.icon}</div>
                         <div className="flex-1">
                           <p className="text-sm font-display font-bold text-navy-800">{a.title}</p>
                           <p className="text-[10px] text-slate-400 font-body mt-0.5 leading-tight">{a.desc}</p>
                         </div>
                         {a.earned && <CheckCircle size={16} className="text-primary-500 shrink-0" />}
                       </div>
                     ))}
                   </div>
                   <button className="w-full mt-8 py-4 rounded-2xl border-2 border-dashed border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-slate-50 hover:border-primary-500 transition-all">
                      View Global Hall of Fame
                   </button>
                </div>
             </div>

             {/* System & Support Card */}
             <div className="glass-card rounded-[2.5rem] p-8 bg-gradient-to-br from-slate-50 to-white">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Security Context</h3>
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
                         <Shield size={20} />
                      </div>
                      <div>
                         <p className="text-xs font-display font-bold text-navy-800">2FA Protected</p>
                         <p className="text-[10px] text-slate-400 font-body">Biometric sync enabled</p>
                      </div>
                   </div>
                   <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">Login Footprint</p>
                      <div className="space-y-1.5">
                         <p className="text-[10px] font-mono text-slate-500">IP: 192.168.1.1</p>
                         <p className="text-[10px] font-mono text-slate-500">Vidisha, IN · Chrome v123</p>
                      </div>
                   </div>
                </div>
                <button className="w-full mt-8 py-4 rounded-2xl bg-red-50 text-red-600 font-display font-bold text-sm hover:bg-red-100 transition-all">
                   Terminate all Citations
                </button>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
