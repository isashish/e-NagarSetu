import React, { useState } from 'react'
import Layout from '../components/Layout'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import {
  Users, Truck, FileText, CreditCard, TrendingUp, AlertCircle,
  CheckCircle, MapPin, Zap, Leaf, Star, BarChart3
} from 'lucide-react'

const wasteData = [
  { day: 'Mon', collected: 420, target: 500 },
  { day: 'Tue', collected: 478, target: 500 },
  { day: 'Wed', collected: 512, target: 500 },
  { day: 'Thu', collected: 390, target: 500 },
  { day: 'Fri', collected: 465, target: 500 },
  { day: 'Sat', collected: 538, target: 500 },
  { day: 'Sun', collected: 310, target: 500 },
]

const revenueData = [
  { month: 'Jan', revenue: 42000 },
  { month: 'Feb', revenue: 38000 },
  { month: 'Mar', revenue: 51000 },
  { month: 'Apr', revenue: 47000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 61000 },
]

const complaintPie = [
  { name: 'Waste', value: 38, color: '#22c55e' },
  { name: 'Roads', value: 22, color: '#f97316' },
  { name: 'Water', value: 18, color: '#3b82f6' },
  { name: 'Lights', value: 14, color: '#a855f7' },
  { name: 'Other', value: 8, color: '#94a3b8' },
]

const vehicles = [
  { id: 'V-01', number: 'MP04-AB-1234', driver: 'Ramesh', ward: '3,4', status: 'Active', fuel: 72, pickups: 18 },
  { id: 'V-02', number: 'MP04-CD-5678', driver: 'Suresh', ward: '5,6', status: 'Active', fuel: 45, pickups: 22 },
  { id: 'V-03', number: 'MP04-EF-9012', driver: 'Mahesh', ward: '1,2', status: 'Maintenance', fuel: 0, pickups: 0 },
]

const wardData = [
  { ward: 'Ward 1', score: 88, complaints: 4, pickups: 95 },
  { ward: 'Ward 2', score: 75, complaints: 7, pickups: 88 },
  { ward: 'Ward 3', score: 92, complaints: 2, pickups: 98 },
  { ward: 'Ward 4', score: 68, complaints: 11, pickups: 79 },
  { ward: 'Ward 5', score: 85, complaints: 5, pickups: 91 },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Premium Command Header */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-navy-900 p-10 text-white shadow-2xl group flex items-center min-h-[220px]">
          <div className="absolute inset-0 z-0">
             <img src="/analytics_dashboard_slider_1776682397006.png" alt="Operational Oversight" className="w-full h-full object-cover opacity-35 transition-transform duration-[10s] group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold mb-2 border border-white/10">
                <BarChart3 size={12} className="animate-pulse" />
                Administrative Command Center
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold">Metric <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Intelligence</span></h1>
              <p className="text-slate-400 font-body text-sm md:text-base max-w-md">Real-time oversight of Vidisha municipality. Monitoring fiscal health and operational throughput.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl text-right hidden lg:block">
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Fiscal Flux</p>
                 <h3 className="text-2xl font-display font-bold text-white">₹61,420.00</h3>
                 <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">+12.4% Δ vs Last Month</span>
              </div>
              <button className="bg-white text-navy-900 px-6 py-4 rounded-2xl font-display font-bold text-sm shadow-xl hover:bg-slate-50 transition-all active:scale-95 flex items-center gap-2">
                 <FileText size={18} /> Export Log
              </button>
            </div>
          </div>
        </div>

        {/* Global KPI Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Citizen Base', value: '2,418', icon: Users, change: '+24 This Cycle', color: 'text-blue-500', bg: 'bg-blue-50', desc: 'Registered Households' },
            { label: 'Fleet Latency', value: '2 / 3', icon: Truck, change: '1 Unit Offline', color: 'text-primary-600', bg: 'bg-primary-50', desc: 'Active Operational Units' },
            { label: 'Grievance Queue', value: '18', icon: AlertCircle, change: '-5 Resolved Today', color: 'text-red-500', bg: 'bg-red-50', desc: 'Open Resolution Tickets' },
            { label: 'Network Revenue', value: '₹61K', icon: CreditCard, change: 'Optimal Collection', color: 'text-saffron-600', bg: 'bg-saffron-50', desc: 'Current Month Inflow' },
          ].map(s => (
            <div key={s.label} className="glass-card rounded-[2rem] p-6 group hover:scale-[1.02] transition-transform relative overflow-hidden">
               <div className="absolute -top-4 -right-4 w-16 h-16 bg-slate-100/50 rounded-full blur-2xl group-hover:bg-primary-100/50 transition-colors"></div>
               <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                    <s.icon size={20} className={s.color} />
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${s.color}`}>{s.change}</span>
               </div>
               <h3 className="text-3xl font-display font-bold text-navy-800 relative z-10">{s.value}</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 relative z-10">{s.label}</p>
               <p className="text-[8px] text-slate-300 font-medium mt-2 relative z-10 uppercase">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Functional Tabs - Slider-Pills */}
        <div className="flex gap-2 p-1.5 bg-slate-100/50 backdrop-blur-sm rounded-[1.25rem] border border-slate-200/50 w-fit">
          {['overview', 'vehicles', 'wards'].map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-8 py-2.5 rounded-xl text-sm font-display font-bold transition-all duration-300 capitalize ${
                activeTab === t
                  ? 'bg-white text-navy-800 shadow-xl shadow-navy-900/5 border border-slate-200/50'
                  : 'text-slate-500 hover:text-navy-800 font-medium'
              }`}
            >
              System {t}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Waste Collection Analytical Chart */}
            <div className="glass-card rounded-[2.5rem] p-8 space-y-6">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                       <Leaf size={16} />
                    </div>
                    <div>
                       <h3 className="text-lg font-display font-bold text-navy-800">Waste Throughput</h3>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Weekly Collection Index (KG)</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                       <div className="w-2 h-2 rounded-full bg-green-500"></div>
                       <span className="text-[9px] font-bold text-slate-400 uppercase">Actual</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                       <div className="w-2 h-2 rounded-full bg-green-100"></div>
                       <span className="text-[9px] font-bold text-slate-400 uppercase">Capacity</span>
                    </div>
                 </div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={wasteData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontFamily: 'Hind', fontWeight: 600, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontFamily: 'Hind', fontWeight: 600, fill: '#94a3b8' }} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '12px' }} />
                  <Bar dataKey="collected" fill="#22c55e" radius={[12, 12, 0, 0]} name="Metric Tonn" />
                  <Bar dataKey="target" fill="#dcfce7" radius={[12, 12, 0, 0]} name="Threshold" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Analytics Chart */}
            <div className="glass-card rounded-[2.5rem] p-8 space-y-6">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-saffron-50 text-saffron-600 flex items-center justify-center">
                       <TrendingUp size={16} />
                    </div>
                    <div>
                       <h3 className="text-lg font-display font-bold text-navy-800">Fiscal Projection</h3>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Revenue Collection Stream (₹)</p>
                    </div>
                 </div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontFamily: 'Hind', fontWeight: 600, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontFamily: 'Hind', fontWeight: 600, fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} formatter={(v) => [`₹${(v/1000).toFixed(0)}K`]} />
                  <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={4} dot={{ fill: '#f97316', r: 6, strokeWidth: 4, stroke: '#fff' }} activeDot={{ r: 8, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Sub-Metric Bento Section */}
            <div className="glass-card rounded-[2.5rem] p-8 col-span-1">
               <h3 className="text-lg font-display font-bold text-navy-800 mb-6">Grievance Distribution</h3>
               <div className="flex flex-col md:flex-row items-center gap-8">
                 <ResponsiveContainer width="100%" height={200} className="md:w-1/2">
                    <PieChart>
                      <Pie data={complaintPie} cx="50%" cy="50%" innerRadius={60} outerRadius={85} dataKey="value" paddingAngle={5}>
                        {complaintPie.map((entry, i) => <Cell key={i} fill={entry.color} strokeWidth={0} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '15px' }} />
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="flex-1 w-full space-y-3">
                   {complaintPie.map(c => (
                     <div key={c.name} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary-200 transition-colors">
                       <div className="flex items-center gap-2">
                         <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.name}</span>
                       </div>
                       <span className="text-sm font-display font-bold text-navy-800">{c.value}%</span>
                     </div>
                   ))}
                 </div>
               </div>
            </div>

            <div className="glass-card rounded-[2.5rem] p-10 bg-gradient-to-br from-primary-600 to-primary-900 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 animate-float pointer-events-none">
                   <Leaf size={160} />
               </div>
               <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                       <Star size={20} className="text-primary-200" />
                    </div>
                    <h2 className="text-2xl font-display font-bold">Climate Impact</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: 'Fuel Saved', value: '284 L', icon: Zap },
                      { label: 'CO₂ Emission Δ', value: '761 KG', icon: Leaf },
                      { label: 'Path Opt.', value: '1,240 KM', icon: MapPin },
                      { label: 'Net Efficiency', value: '38%', icon: TrendingUp },
                    ].map(s => (
                      <div key={s.label} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[1.5rem] p-5">
                        <s.icon size={18} className="text-primary-300 mb-2" />
                        <p className="text-[10px] text-primary-200 font-bold uppercase tracking-widest mb-1">{s.label}</p>
                        <p className="font-display font-bold text-3xl text-white">{s.value}</p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        )}

        {(activeTab === 'vehicles' || activeTab === 'wards') && (
          <div className="glass-card rounded-[2.5rem] overflow-hidden border border-slate-200/50 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 font-display">
                    {activeTab === 'vehicles' 
                      ? ['ID/Number', 'Operator Details', 'Tactical Ward', 'Link Status', 'Energy Level', 'Performance Activity'].map(h => (
                          <th key={h} className="py-5 px-8 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{h}</th>
                        ))
                      : ['Sequence', 'Sector ID', 'Integrity Score', 'Grievance Density', 'Service Rate'].map(h => (
                          <th key={h} className="py-5 px-8 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{h}</th>
                        ))
                    }
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeTab === 'vehicles' ? vehicles.map(v => (
                    <tr key={v.id} className="group hover:bg-slate-50/80 transition-colors">
                      <td className="py-5 px-8">
                         <p className="font-display font-bold text-navy-800 text-sm whitespace-nowrap">{v.number}</p>
                         <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">Fleet: {v.id}</p>
                      </td>
                      <td className="py-5 px-8">
                         <p className="text-sm font-body text-slate-600">{v.driver}</p>
                         <p className="text-[10px] text-slate-400 uppercase font-bold">Class A Operator</p>
                      </td>
                      <td className="py-5 px-8">
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 text-navy-600 text-[10px] font-bold uppercase tracking-widest border border-navy-100">
                           <MapPin size={10} /> Zone {v.ward}
                         </span>
                      </td>
                      <td className="py-5 px-8">
                         <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                           v.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-saffron-50 text-saffron-600 border-saffron-100'
                         }`}>
                           <div className={`w-1.5 h-1.5 rounded-full ${v.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-saffron-500'}`} />
                           {v.status}
                         </span>
                      </td>
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-3">
                           <div className="flex-1 h-1.5 bg-slate-100 rounded-full w-20 overflow-hidden">
                              <div className={`h-full rounded-full transition-all duration-1000 ${v.fuel > 50 ? 'bg-primary-500' : v.fuel > 25 ? 'bg-saffron-500' : 'bg-red-500'}`} style={{ width: `${v.fuel}%` }} />
                           </div>
                           <span className="text-[10px] font-bold text-slate-500">{v.fuel}%</span>
                        </div>
                      </td>
                      <td className="py-5 px-8">
                         <p className="font-display font-bold text-navy-800 text-lg">{v.pickups}</p>
                         <p className="text-[9px] text-slate-400 font-bold uppercase">Success Points</p>
                      </td>
                    </tr>
                  )) : [...wardData].sort((a, b) => b.score - a.score).map((w, i) => (
                    <tr key={w.ward} className="group hover:bg-slate-50/80 transition-colors">
                      <td className="py-5 px-8">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm ${
                          i === 0 ? 'bg-saffron-500 text-white shadow-lg' : i === 1 ? 'bg-slate-200 text-slate-600' : 'bg-navy-50 text-navy-600'
                        }`}>
                          {i + 1}
                        </div>
                      </td>
                      <td className="py-5 px-8">
                         <p className="font-display font-bold text-navy-800 text-sm">{w.ward}</p>
                         <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Administrative Sector</p>
                      </td>
                      <td className="py-5 px-8">
                        <div className="flex items-center gap-3">
                           <div className="flex-1 h-2.5 bg-slate-100 rounded-lg w-28 overflow-hidden">
                              <div className={`h-full rounded-lg transition-all duration-1000 ${w.score >= 85 ? 'bg-green-500' : w.score >= 70 ? 'bg-saffron-500' : 'bg-red-400'}`} style={{ width: `${w.score}%` }} />
                           </div>
                           <span className="font-display font-bold text-sm text-navy-800">{w.score}</span>
                        </div>
                      </td>
                      <td className="py-5 px-8">
                         <span className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border ${
                           w.complaints <= 4 ? 'bg-green-50 text-green-600 border-green-100' : w.complaints <= 8 ? 'bg-saffron-50 text-saffron-600 border-saffron-100' : 'bg-red-50 text-red-600 border-red-100'
                         }`}>
                           {w.complaints} Incidents
                         </span>
                      </td>
                      <td className="py-5 px-8 text-right pr-20">
                         <p className={`font-display font-bold text-lg ${w.pickups >= 90 ? 'text-primary-600' : 'text-saffron-600'}`}>{w.pickups}%</p>
                         <p className="text-[9px] text-slate-400 font-bold uppercase">Pickup Fulfillment</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
