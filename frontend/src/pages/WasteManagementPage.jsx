import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useApp } from '../context/AppContext'
import { createWastePickup, fetchWastePickups } from '../api'
import { Trash2, CheckCircle, Users, Clock, Calendar, Star, ArrowRight, Leaf, Zap, RefreshCw, ShieldAlert, Truck } from 'lucide-react'

const scheduleData = [
  { day: 'Monday', time: '7:00 AM – 9:00 AM', type: 'Dry Waste', status: 'completed' },
  { day: 'Tuesday', time: '7:00 AM – 9:00 AM', type: 'Wet Waste', status: 'completed' },
  { day: 'Wednesday', time: '7:30 AM – 9:30 AM', type: 'Mixed Waste', status: 'completed' },
  { day: 'Thursday', time: '7:00 AM – 9:00 AM', type: 'Dry Waste', status: 'today' },
  { day: 'Friday', time: '7:00 AM – 9:00 AM', type: 'Wet Waste', status: 'upcoming' },
  { day: 'Saturday', time: '8:00 AM – 10:00 AM', type: 'Bulk/E-Waste', status: 'upcoming' },
]

const wasteTypes = [
  { type: 'Dry Waste', desc: 'Paper, plastic, cardboard, metal', color: 'bg-blue-100 text-blue-700', icon: '📦' },
  { type: 'Wet Waste', desc: 'Food scraps, vegetable peels', color: 'bg-primary-100 text-primary-700', icon: '🌿' },
  { type: 'Hazardous', desc: 'Batteries, chemicals, medicines', color: 'bg-red-100 text-red-700', icon: '⚠️' },
  { type: 'E-Waste', desc: 'Electronics, wires, gadgets', color: 'bg-purple-100 text-purple-700', icon: '💻' },
]

export default function WasteManagementPage() {
  const { role, user, setUser } = useApp()
  const [garbageReady, setGarbageReady] = useState(false)
  const [selectedType, setSelectedType] = useState('Mixed Waste')
  const [neighborMode, setNeighborMode] = useState(false)
  const [neighborName, setNeighborName] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [points, setPoints] = useState(user?.civicScore || 740)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user?.id) {
      fetchWastePickups(user.id).then(data => setHistory(data)).catch(console.error);
    }
  }, [user]);

  const confirmPickup = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const pickupData = {
        wasteType: selectedType,
        neighborMode: neighborMode,
        neighborName: neighborMode ? neighborName : null,
        user: { id: user.id }
      };
      
      const result = await createWastePickup(pickupData);
      setConfirmed(true);
      
      // Update local points
      const newPoints = neighborMode ? Math.max(0, points - 5) : points + 10;
      setPoints(newPoints);
      
      // Update global user context
      if (setUser) {
        setUser({ ...user, civicScore: newPoints });
      }
      
      // Refresh history
      const updatedHistory = await fetchWastePickups(user.id);
      setHistory(updatedHistory);
    } catch (err) {
      alert("Failed to schedule pickup: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Header Section */}
        <div className="relative rounded-[2rem] overflow-hidden bg-navy-900 p-10 text-white shadow-2xl group flex items-center min-h-[200px]">
          <div className="absolute inset-0 z-0">
             <img src="/waste_problem.png" alt="Waste Challenge" className="w-full h-full object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/60 to-transparent"></div>
          </div>
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold mb-2 border border-white/10">
              <Leaf size={12} />
              Sustainability Portal
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold">Waste <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Intelligence</span></h1>
            <p className="text-slate-400 font-body text-sm md:text-base max-w-md">Manage your household waste through AI-driven routing and professional collection services.</p>
          </div>
        </div>

        {/* Action Center - Floating Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Pickup Status Card */}
          <div className="lg:col-span-2 space-y-6">
            {confirmed ? (
              <div className="glass-card rounded-[2rem] p-8 border-l-8 border-primary-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 animate-float opacity-10">
                   <CheckCircle size={120} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 rounded-3xl bg-primary-500 flex items-center justify-center shadow-2xl shadow-primary-500/40 shrink-0">
                    <CheckCircle size={48} className="text-white" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-display font-bold text-navy-800">Dispatch Successful</h2>
                    <p className="text-slate-500 font-body mt-2 leading-relaxed">Your household has been added to the dynamic route. Our vehicle will arrive in your ward between <strong className="text-navy-900">10:00 AM – 11:00 AM</strong>.</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                      <span className="bg-primary-50 text-primary-700 text-xs px-4 py-2 rounded-xl border border-primary-100 font-bold uppercase tracking-wider">{selectedType}</span>
                      {!neighborMode && <span className="bg-saffron-50 text-saffron-700 text-xs px-4 py-2 rounded-xl border border-saffron-100 font-bold uppercase tracking-wider">+10 Credits Earned</span>}
                    </div>
                  </div>
                  <button onClick={() => { setConfirmed(false); setGarbageReady(false) }} className="p-4 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-navy-500 transition-all">
                    <RefreshCw size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-[2rem] p-8 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-saffron-500 flex items-center justify-center shadow-lg shadow-saffron-500/20">
                      <Trash2 size={28} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-display font-bold text-navy-800">Schedule Pickup</h2>
                      <p className="text-sm text-slate-400 font-body">Mark your waste as ready for collection</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100/50 p-1 rounded-2xl border border-slate-200/50">
                    <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assign Neighbor</span>
                    <button
                      onClick={() => setNeighborMode(!neighborMode)}
                      className={`w-12 h-6 rounded-full transition-all duration-300 relative ${neighborMode ? 'bg-primary-500' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${neighborMode ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Category</p>
                      <div className="grid grid-cols-2 gap-3">
                        {['Dry Waste', 'Wet Waste', 'Mixed Waste', 'E-Waste'].map(t => (
                          <button
                            key={t}
                            onClick={() => setSelectedType(t)}
                            className={`p-4 rounded-2xl text-sm font-display font-bold border-2 transition-all duration-300 text-left relative overflow-hidden group ${
                              selectedType === t
                                ? 'border-primary-500 bg-primary-50/50 text-primary-700'
                                : 'border-slate-100 bg-slate-50/50 text-slate-500 hover:border-slate-200'
                            }`}
                          >
                            {selectedType === t && <div className="absolute top-0 right-0 w-8 h-8 bg-primary-500 rounded-bl-2xl flex items-center justify-center"><CheckCircle size={14} className="text-white" /></div>}
                            {t}
                          </button>
                        ))}
                      </div>
                   </div>

                   <div className="space-y-4">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{neighborMode ? 'Responsible Party' : 'Verification'}</p>
                      {neighborMode ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-body focus:border-primary-500 outline-none transition-all"
                            placeholder="Neighbor's Unit/Name"
                            value={neighborName}
                            onChange={e => setNeighborName(e.target.value)}
                          />
                          <p className="text-[10px] text-red-500 font-bold bg-red-50 p-2 rounded-lg">SYSTEM: 5 PTS REDUCTION APPLIED FOR PROXY DELEGATION.</p>
                        </div>
                      ) : (
                        <div className="p-4 rounded-2xl bg-primary-50 border-2 border-primary-100">
                           <div className="flex items-center gap-3 mb-2">
                             <Zap size={16} className="text-primary-600" />
                             <span className="text-xs font-bold text-primary-700 uppercase">Impact Calculation</span>
                           </div>
                           <p className="text-[11px] text-primary-600 font-medium leading-relaxed">Confirming helps avoid empty visits, saving <strong className="text-primary-800">450g of CO2</strong> emission for this route.</p>
                        </div>
                      )}
                   </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={confirmPickup}
                    disabled={loading}
                    className="w-full bg-primary-600 text-white py-5 rounded-[1.5rem] font-display font-bold text-lg hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <RefreshCw size={24} className="animate-spin" />
                    ) : (
                      <>Authorize Pickup Dispatch <ArrowRight size={20} /></>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Weekly Timeline & Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-[2rem] p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-display font-bold text-navy-800">Weekly Cycle</h3>
                    <Calendar size={20} className="text-primary-500" />
                </div>
                <div className="space-y-4">
                    {scheduleData.slice(0, 4).map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                         <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${s.status === 'today' ? 'bg-primary-500 animate-pulse' : 'bg-slate-300'}`} />
                            <span className="text-sm font-display font-bold text-navy-800">{s.day}</span>
                         </div>
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.type}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="glass-card rounded-[2rem] p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-display font-bold text-navy-800">Recent Requests</h3>
                    <Clock size={20} className="text-saffron-500" />
                </div>
                <div className="space-y-4 max-h-[180px] overflow-y-auto custom-scrollbar pr-2">
                    {history.length > 0 ? history.slice().reverse().map((h, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                         <div className="flex flex-col">
                            <span className="text-sm font-display font-bold text-navy-800">{h.wasteType}</span>
                            <span className="text-[9px] text-slate-400 uppercase font-bold">{new Date(h.requestedAt).toLocaleDateString()}</span>
                         </div>
                         <span className={`text-[9px] font-bold px-2 py-1 rounded-lg uppercase tracking-widest ${
                           h.status === 'PENDING' ? 'bg-saffron-100 text-saffron-700' : 'bg-primary-100 text-primary-700'
                         }`}>{h.status}</span>
                      </div>
                    )) : (
                      <p className="text-center text-slate-400 text-xs py-10 font-body">No recent requests found.</p>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            
            {/* Citizen Credit Status */}
            <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-saffron-500 to-orange-600 p-8 text-white shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Star size={100} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Star size={20} className="fill-white" />
                   </div>
                   <h3 className="font-display font-bold text-xl">Civic Credits</h3>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                   <span className="text-5xl font-display font-bold">{points}</span>
                   <span className="text-lg opacity-80">pts</span>
                </div>
                <p className="text-[11px] text-white/80 font-body mb-6 leading-relaxed">You are in the <strong className="text-white">Gold Tier</strong>. Maintain 800+ score for a 15% property tax rebate next cycle.</p>
                <div className="space-y-3">
                   {[
                     { l: 'Pickup Ratio', v: '94%' },
                     { l: 'Segregation', v: 'A+' },
                     { l: 'Next Milestone', v: '100 pts' }
                   ].map(st => (
                     <div key={st.l} className="flex justify-between items-center bg-white/10 p-2.5 rounded-xl border border-white/10 uppercase font-display font-bold text-[10px] tracking-widest">
                       <span>{st.l}</span>
                       <span>{st.v}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* Waste Guide Guide */}
            <div className="glass-card rounded-[2rem] p-8">
               <div className="mb-6">
                  <h3 className="text-lg font-display font-bold text-navy-800">Compliance Guide</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sorting standards v1.2</p>
               </div>
               <div className="space-y-4">
                  {wasteTypes.map((w, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                       <span className="text-2xl w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 transition-all group-hover:scale-110 group-hover:bg-white group-hover:shadow-md">{w.icon}</span>
                       <div>
                          <p className="font-display font-bold text-navy-800 text-sm">{w.type}</p>
                          <p className="text-[10px] text-slate-500 font-body line-clamp-1">{w.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-8 py-3 rounded-xl border-2 border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:bg-slate-50 transition-all">
                  Documentation
               </button>
              {/* Admin Controls */}
            {role === 'admin' && (
              <div className="glass-card rounded-[2rem] p-8 bg-navy-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <ShieldAlert size={80} />
                </div>
                <div className="relative z-10 space-y-6">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                         <Truck size={16} className="text-secondary-400" />
                      </div>
                      <h3 className="font-display font-bold text-lg">Fleet Authority</h3>
                   </div>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">System override active. You have authority to redirect ward vehicles.</p>
                   <div className="space-y-3">
                      <button className="w-full bg-primary-600 py-3 rounded-xl font-display font-bold text-xs hover:bg-primary-500 transition-all">Authorize Emergency Dispatch</button>
                      <button className="w-full bg-white/10 border border-white/10 py-3 rounded-xl font-display font-bold text-xs hover:bg-white/20 transition-all">Reschedule Ward Route</button>
                   </div>
                </div>
              </div>
            )}
          </div>

          </div>
        </div>
      </div>
    </Layout>
  )
}
