import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { Truck, MapPin, Clock, Fuel, CheckCircle, Navigation, RefreshCw, Zap } from 'lucide-react'

const vehicles = [
  { id: 'V-01', number: 'MP04-AB-1234', driver: 'Ramesh Yadav', contact: '9876543210', ward: 'Ward 3 & 4', status: 'Active', fuel: 72, speed: 18, pickups: 18, eta: '10:32 AM', lat: 30, lng: 45 },
  { id: 'V-02', number: 'MP04-CD-5678', driver: 'Suresh Patel', contact: '9765432109', ward: 'Ward 5 & 6', status: 'Active', fuel: 45, speed: 12, pickups: 22, eta: '11:05 AM', lat: 55, lng: 60 },
  { id: 'V-03', number: 'MP04-EF-9012', driver: 'Mahesh Verma', contact: '9654321098', ward: 'Ward 1 & 2', status: 'Maintenance', fuel: 0, speed: 0, pickups: 0, eta: '--', lat: 75, lng: 30 },
]

const routeStops = [
  { name: 'Ward 5 Depot', type: 'start', done: true, eta: '7:00 AM', lat: 15, lng: 20 },
  { name: 'Block A – 12 houses', type: 'stop', done: true, eta: '7:45 AM', lat: 25, lng: 35 },
  { name: 'Market Area – 8 shops', type: 'stop', done: true, eta: '8:30 AM', lat: 40, lng: 50 },
  { name: 'Block B – 15 houses', type: 'stop', done: false, eta: '10:32 AM', lat: 55, lng: 60, current: true },
  { name: 'School Road – 10 houses', type: 'stop', done: false, eta: '11:15 AM', lat: 65, lng: 72 },
  { name: 'Ward 5 Dumping Yard', type: 'end', done: false, eta: '12:00 PM', lat: 80, lng: 85 },
]

const COLORS = { 'Active': '#22c55e', 'Maintenance': '#f97316' }

export default function TrackingPage() {
  const [selected, setSelected] = useState(vehicles[0])
  const [tick, setTick] = useState(0)

  // Simulate vehicle movement
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 2000)
    return () => clearInterval(interval)
  }, [])

  // Animate vehicle position slightly
  const getPos = (base, offset) => base + Math.sin(tick * 0.3 + offset) * 2

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Premium Fleet Header */}
        <div className="relative rounded-[2rem] overflow-hidden bg-navy-900 p-10 text-white shadow-2xl group flex items-center min-h-[220px]">
          <div className="absolute inset-0 z-0 text-white">
             <img src="/fleet_reality.png" alt="Fleet Reality" className="w-full h-full object-cover opacity-35 transition-transform duration-1000 group-hover:scale-110" />
             <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/60 to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold mb-2 border border-white/10">
                <Navigation size={12} className="animate-pulse" />
                Global Fleet Navigation
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold">Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Positioning</span></h1>
              <p className="text-slate-400 font-body text-sm md:text-base max-w-md">Precision tracking of municipal service vehicles. Real-time telemetry and arrival forecasting.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center gap-4">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,1)]"></div>
                 <span className="text-[10px] text-white font-bold uppercase tracking-widest">Signal: Excellent</span>
              </div>
              <button className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-4 rounded-2xl font-display font-bold text-sm shadow-xl shadow-primary-500/20 flex items-center gap-3 transition-all active:scale-95">
                 <RefreshCw size={18} className="animate-spin-slow" /> Resync Satellite
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Fleet Status Center */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] px-2">Active Fleet Units</h3>
            <div className="space-y-4">
              {vehicles.map(v => (
                <div
                  key={v.id}
                  onClick={() => setSelected(v)}
                  className={`glass-card rounded-[1.5rem] p-5 cursor-pointer transition-all duration-300 border-2 ${
                    selected.id === v.id ? 'border-primary-500 bg-primary-50/50 shadow-xl' : 'border-transparent hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-[1rem] flex items-center justify-center shrink-0 ${v.status === 'Active' ? 'bg-primary-100 text-primary-600' : 'bg-saffron-100 text-saffron-600'}`}>
                      <Truck size={20} />
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                      v.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-saffron-50 text-saffron-600 border-saffron-100'
                    }`}>{v.status}</span>
                  </div>

                  <div className="space-y-1 mb-4">
                    <p className="font-display font-bold text-navy-800 text-base">{v.number}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{v.ward}</p>
                  </div>

                  {v.status === 'Active' && (
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                         <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Energy Core</span>
                         <span className="text-[10px] font-bold text-navy-800">{v.fuel}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-1000 ${v.fuel > 50 ? 'bg-primary-500' : v.fuel > 25 ? 'bg-saffron-500' : 'bg-red-500'}`} style={{ width: `${v.fuel}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Premium ETA Forecast */}
            {selected.status === 'Active' && (
              <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-navy-900 to-navy-800 p-8 text-white shadow-2xl animate-slide-up border border-white/5">
                <div className="absolute top-0 right-0 p-4 opacity-10 animate-float pointer-events-none">
                   <Clock size={80} />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-500/20 backdrop-blur-md flex items-center justify-center border border-primary-500/30">
                       <Zap size={16} className="text-primary-300" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-300">Arrival Logic</span>
                  </div>
                  <div>
                    <h4 className="text-5xl font-display font-bold text-white tracking-tight">{selected.eta}</h4>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 mt-2">Target Sector: <span className="text-white">Block 05</span></p>
                  </div>
                  <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center gap-3 shadow-inner">
                    <Navigation size={14} className="text-primary-400 animate-pulse" />
                    <span className="text-[11px] font-display font-bold text-slate-100 italic">Passing Ward 3 Crossing</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Visualization Zone */}
          <div className="lg:col-span-3 space-y-8">
            {/* Interactive Live Map */}
            <div className="glass-card rounded-[2.5rem] overflow-hidden border border-slate-200/50 shadow-2xl flex flex-col h-[500px]">
              <div className="p-6 bg-white/50 backdrop-blur-sm border-b border-slate-100 flex items-center justify-between">
                <div>
                   <h2 className="text-lg font-display font-bold text-navy-800 uppercase tracking-tight">Cordon Alpha Tracking</h2>
                   <div className="flex items-center gap-2 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sector Grid: Active (Precision 0.2m)</span>
                   </div>
                </div>
                <div className="flex gap-2">
                   {['Satellite', 'Grid', 'Hybird'].map(m => (
                     <button key={m} className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
                       m === 'Grid' ? 'bg-navy-900 text-white border-navy-900 shadow-lg' : 'bg-white text-slate-400 border-slate-200 hover:border-primary-500'
                     }`}>{m}</button>
                   ))}
                </div>
              </div>
              
              <div className="flex-1 bg-[#f8fafc] relative overflow-hidden group">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Grid System Styling */}
                  <g stroke="#e2e8f0" strokeWidth="0.5">
                    {[...Array(10)].map((_, i) => (
                      <React.Fragment key={i}>
                        <line x1={i * 10} y1="0" x2={i * 10} y2="100" />
                        <line x1="0" y1={i * 10} x2="100" y2={i * 10} />
                      </React.Fragment>
                    ))}
                  </g>

                  {/* Main Arterial Roads */}
                  <g stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round">
                    <line x1="5" y1="50" x2="95" y2="50" />
                    <line x1="50" y1="5" x2="50" y2="95" />
                    <line x1="25" y1="5" x2="25" y2="95" strokeWidth="1.5" />
                    <line x1="75" y1="5" x2="75" y2="95" strokeWidth="1.5" />
                    <line x1="5" y1="25" x2="95" y2="25" strokeWidth="1.5" />
                    <line x1="5" y1="75" x2="95" y2="75" strokeWidth="1.5" />
                  </g>

                  {/* Dynamic Route Path */}
                  <polyline
                    points={routeStops.map(s => `${s.lng},${s.lat}`).join(' ')}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.2"
                    strokeDasharray="4 2"
                    opacity="0.6"
                    className="animate-dash"
                  />
                  
                  {/* Completed Corridor */}
                  <polyline
                    points={routeStops.filter(s => s.done || s.current).map(s => `${s.lng},${s.lat}`).join(' ')}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.2"
                    opacity="1"
                  />
                </svg>

                {/* Satellite Nodes (Stops) */}
                {routeStops.map((stop, i) => (
                  <div key={i} className="absolute transform -translate-x-1/2 -translate-y-1/2 group/stop" style={{ left: `${stop.lng}%`, top: `${stop.lat}%` }}>
                    <div className={`w-3 h-3 rounded-full border-4 border-white shadow-xl transition-all ${
                      stop.current ? 'bg-saffron-500 scale-150 ring-4 ring-saffron-500/20' : 
                      stop.done ? 'bg-primary-500' : 'bg-slate-300'
                    }`} />
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-navy-800 text-white text-[8px] font-bold px-2 py-1 rounded opacity-0 group-hover/stop:opacity-100 transition-opacity whitespace-nowrap z-30">
                       {stop.name}
                    </div>
                  </div>
                ))}

                {/* Dynamic Fleet Units */}
                {vehicles.filter(v => v.status === 'Active').map((v, i) => (
                  <div
                    key={v.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-[2000ms] z-20"
                    style={{
                      left: `${getPos(v.lng, i)}%`,
                      top: `${getPos(v.lat, i * 2)}%`
                    }}
                  >
                    <div className={`relative w-12 h-12 rounded-[1.25rem] flex items-center justify-center shadow-2xl border-2 border-white group/unit ${
                      selected.id === v.id ? 'bg-navy-900 scale-125' : 'bg-primary-600'
                    }`}>
                      <div className="absolute inset-0 bg-primary-400 rounded-full animate-ping-slow opacity-20"></div>
                      <Truck size={18} className="text-white relative z-10" />
                      
                      {selected.id === v.id && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-navy-500 text-white text-[10px] px-3 py-1.5 rounded-xl font-display font-bold whitespace-nowrap shadow-xl border border-navy-400 z-30">
                          {v.number} ( {v.eta} )
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Map Overlay Controls */}
                <div className="absolute bottom-6 left-6 flex flex-col gap-3">
                   <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-600 shadow-2xl border border-slate-100 space-y-3 min-w-[140px]">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-saffron-500 shadow-lg shadow-saffron-500/40"></div> Focus Target
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary-500"></div> Perimeter Unit
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div> Inactive Node
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Route Timeline & Sequence */}
            <div className="glass-card rounded-[2.5rem] p-8">
               <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                       <Navigation size={20} />
                    </div>
                    <div>
                       <h3 className="text-xl font-display font-bold text-navy-800">Mission Sequence</h3>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Automated Route Optimization v4.0</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Progress Index</span>
                     <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="w-[66%] h-full bg-primary-500"></div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                 <div className="absolute top-10 left-0 right-0 h-[2px] bg-slate-100 -z-0 hidden lg:block"></div>
                 {routeStops.map((stop, i) => (
                   <div key={i} className="relative z-10 glass-card rounded-2xl p-6 border group hover:border-primary-500/20 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-all ${
                          stop.current ? 'bg-saffron-500 border-saffron-100 text-white shadow-lg' : 
                          stop.done ? 'bg-primary-500 border-primary-100 text-white' : 
                          'bg-white border-slate-100 text-slate-300'
                        }`}>
                           {stop.done ? <CheckCircle size={14} /> : stop.current ? <Navigation size={14} className="animate-pulse" /> : <Clock size={14} />}
                        </div>
                        <span className={`text-[10px] font-mono font-bold ${stop.done ? 'text-primary-600' : stop.current ? 'text-saffron-600' : 'text-slate-400'}`}>{stop.eta}</span>
                      </div>
                      <h4 className={`text-sm font-display font-bold ${stop.current ? 'text-navy-800' : stop.done ? 'text-slate-400' : 'text-slate-600'}`}>{stop.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{stop.type === 'start' ? 'Operational Base' : stop.type === 'end' ? 'Terminal Point' : 'Collection Site'}</p>
                      
                      {stop.current && (
                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-saffron-500 rounded-full animate-ping"></div>
                           <span className="text-[9px] font-bold text-saffron-600 uppercase tracking-widest">Active Link</span>
                        </div>
                      )}
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
