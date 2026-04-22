import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useApp } from '../context/AppContext'
import { fetchComplaints, createComplaint } from '../api'
import { FileText, Plus, Upload, MapPin, X, CheckCircle, Clock, AlertCircle, Search, ShieldCheck } from 'lucide-react'

const initialComplaints = [
  { id: 'C-1042', title: 'Drain blockage on Main Street', category: 'Drainage', status: 'Pending', priority: 'High', date: 'Apr 19', location: 'Main Street, Ward 5', image: null, description: 'The drainage system near Main Street market is completely blocked causing water stagnation.' },
  { id: 'C-1031', title: 'Street light not working', category: 'Street Lights', status: 'In Progress', priority: 'Medium', date: 'Apr 18', location: 'Block B, Ward 5', image: null, description: 'Three consecutive street lights on Block B are not functioning since 2 days.' },
  { id: 'C-1024', title: 'Garbage overflow near market', category: 'Waste Management', status: 'Resolved', priority: 'High', date: 'Apr 17', location: 'Market Area, Ward 5', image: null, description: 'Garbage bins near the vegetable market are overflowing and spreading smell.' },
  { id: 'C-1019', title: 'Road pothole near school', category: 'Road Damage', status: 'Resolved', priority: 'Medium', date: 'Apr 15', location: 'School Road, Ward 5', image: null, description: 'Large pothole near the primary school entrance causing accidents.' },
]

const categories = ['Waste Management', 'Drainage', 'Street Lights', 'Road Damage', 'Water Supply', 'Other']

function StatusIcon({ status }) {
  const map = { Resolved: CheckCircle, 'In Progress': Clock, Pending: AlertCircle }
  const colorMap = { Resolved: 'text-primary-600', 'In Progress': 'text-saffron-500', Pending: 'text-red-500' }
  const Icon = map[status] || AlertCircle
  return <Icon size={14} className={colorMap[status] || 'text-slate-400'} />
}

function StatusBadge({ status }) {
  const map = { Resolved: 'badge-green', 'In Progress': 'badge-orange', Pending: 'badge-red' }
  return <span className={map[status] || 'badge-gray'}>{status}</span>
}

function PriorityBadge({ priority }) {
  const map = { High: 'badge-red', Medium: 'badge-orange', Low: 'badge-gray' }
  return <span className={map[priority] || 'badge-gray'}>{priority}</span>
}

export default function ComplaintsPage() {
  const { role } = useApp()
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ title: '', category: '', description: '', location: '', priority: 'Medium' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    loadComplaints()
  }, [])

  const loadComplaints = async () => {
    try {
      setLoading(true)
      const data = await fetchComplaints()
      // Map backend data to frontend format
      const mappedData = data.map(c => ({
        id: `C-${c.id}`,
        title: c.title,
        category: c.category,
        description: c.description,
        status: c.status?.charAt(0).toUpperCase() + c.status?.slice(1).toLowerCase().replace('_', ' ') || 'Pending',
        priority: c.priority?.charAt(0).toUpperCase() + c.priority?.slice(1).toLowerCase() || 'Medium',
        location: c.location || 'N/A',
        date: new Date(c.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
      }))
      setComplaints(mappedData)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const resolveComplaint = (id) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'Resolved' } : c))
  }

  const filtered = complaints.filter(c => {
    const matchFilter = filter === 'All' || c.status === filter
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload = {
        title: form.title,
        category: form.category,
        description: form.description || form.title,
        location: form.location,
        priority: form.priority.toUpperCase(),
        status: 'PENDING',
        createdAt: new Date().toISOString()
      }
      await createComplaint(payload)
      setSubmitted(true)
      loadComplaints()
      setTimeout(() => { 
        setSubmitted(false)
        setShowForm(false)
        setForm({ title: '', category: '', description: '', location: '', priority: 'Medium' }) 
      }, 2000)
    } catch (error) {
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Premium Header */}
        <div className="relative rounded-[2rem] overflow-hidden bg-navy-900 p-10 text-white shadow-2xl group flex items-center min-h-[220px]">
          <div className="absolute inset-0 z-0">
             <img src="/infrastructure_problem.png" alt="Infrastructure Challenge" className="w-full h-full object-cover opacity-35 transition-transform duration-1000 group-hover:scale-110" />
             <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/70 to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold mb-2 border border-white/10">
                <FileText size={12} />
                Citizen Grievance Redressal
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold">Public <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Reports</span></h1>
              <p className="text-slate-400 font-body text-sm md:text-base max-w-md">Transparency at every step. Report civic issues and track resolution in real-time.</p>
            </div>
            <button onClick={() => setShowForm(true)} className="btn-primary hover:shadow-primary-500/40 bg-primary-600 px-8 py-4 rounded-2xl font-display font-bold text-lg flex items-center gap-3 transition-all active:scale-95 whitespace-nowrap self-start md:self-auto shadow-xl">
              <Plus size={24} /> New Report
            </button>
          </div>
        </div>

        {/* Global Stats - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Logs', value: complaints.length, color: 'text-primary-600', bg: 'bg-primary-50', icon: FileText, desc: 'Across all wards' },
            { label: 'Unresolved', value: complaints.filter(c => c.status === 'Pending').length, color: 'text-red-500', bg: 'bg-red-50', icon: AlertCircle, desc: 'Needs attention' },
            { label: 'Success Rate', value: '82%', color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle, desc: 'Resolved this quarter' },
          ].map(s => (
            <div key={s.label} className="glass-card rounded-3xl p-6 flex items-center gap-5 group hover:scale-[1.02] transition-transform">
              <div className={`w-14 h-14 rounded-2xl ${s.bg} flex items-center justify-center shrink-0`}>
                <s.icon size={24} className={s.color} />
              </div>
              <div>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{s.label}</p>
                 <h3 className={`text-3xl font-display font-bold text-navy-800`}>{s.value}</h3>
                 <p className="text-[10px] text-slate-400 font-body mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls - Premium Filtering */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="relative flex-1 group">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by ID, Category or Title..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200/50 rounded-2xl py-4 pl-12 pr-4 font-body text-slate-700 outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-2 p-1.5 bg-slate-100 rounded-[1.25rem] border border-slate-200/50">
            {['All', 'Pending', 'In Progress', 'Resolved'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-xl text-sm font-display font-bold transition-all duration-300 ${
                  filter === f
                    ? 'bg-white text-navy-800 shadow-xl shadow-navy-900/5'
                    : 'text-slate-500 hover:text-navy-800'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Complaints Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full glass-card rounded-[2rem] text-center py-24">
              <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-6 text-slate-300">
                <FileText size={40} />
              </div>
              <h3 className="text-xl font-display font-bold text-navy-800">Clear Records</h3>
              <p className="text-slate-400 font-body mt-2">No complaints matching your criteria were found.</p>
            </div>
          ) : (
            filtered.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelected(c)}
                className="glass-card rounded-[2rem] p-8 group cursor-pointer hover:shadow-2xl hover:shadow-navy-900/5 transition-all duration-500 border border-transparent hover:border-primary-500/20"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${
                    c.status === 'Resolved' ? 'bg-primary-50 text-primary-600' : c.status === 'In Progress' ? 'bg-saffron-50 text-saffron-600' : 'bg-red-50 text-red-600'
                  }`}>
                    <StatusIcon status={c.status} />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                     <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-md">{c.id}</span>
                     <div className="flex gap-2">
                        <PriorityBadge priority={c.priority} />
                     </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-display font-bold text-navy-800 mb-1 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{c.title}</h3>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{c.category}</span>
                       <span className="text-slate-300 text-xs">·</span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{c.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <MapPin size={14} className="text-primary-600" />
                    <span className="text-xs text-slate-500 font-body truncate">{c.location}</span>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                     <StatusBadge status={c.status} />
                     {role === 'admin' && c.status !== 'Resolved' ? (
                        <button 
                          onClick={(e) => { e.stopPropagation(); resolveComplaint(c.id); }}
                          className="text-[10px] font-bold uppercase tracking-[0.2em] bg-primary-600 text-white px-4 py-2 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 flex items-center gap-2"
                        >
                          <ShieldCheck size={14} /> Resolve Case
                        </button>
                     ) : (
                        <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-600 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          Audit Log →
                        </button>
                     )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modern Complaint Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-navy-950/40 backdrop-blur-md z-[100] flex items-center justify-center px-4" onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
          <div className="bg-white rounded-[2.5rem] shadow-[0_32px_128px_rgba(0,0,0,0.2)] w-full max-w-xl p-0 overflow-hidden animate-slide-up">
            {submitted ? (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary-500 shadow-xl shadow-primary-500/20 mb-6 animate-float">
                  <CheckCircle size={48} className="text-white" />
                </div>
                <h3 className="text-3xl font-display font-bold text-navy-800 mb-4">Report Lodged!</h3>
                <p className="text-slate-500 font-body leading-relaxed mb-8">Your ticket <strong className="text-navy-900 font-bold">C-{1050 + complaints.length - 1}</strong> is now in the resolution pipeline. You can track updates from your dashboard.</p>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-primary-500 animate-loading-bar"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="p-8 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-navy-800">Public Filing</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Official Grievance Entry</p>
                  </div>
                  <button onClick={() => setShowForm(false)} className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-navy-800 transition-all">
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 pt-2 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-2">Description Header</label>
                    <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-body outline-none focus:border-primary-500 focus:bg-white transition-all shadow-sm" placeholder="e.g. Broken streetlight on main crossing" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-2">Ward / Sector</label>
                      <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-body outline-none focus:border-primary-500 focus:bg-white transition-all" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required>
                        <option value="">Choose Logic...</option>
                        {categories.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-2">Severity Index</label>
                      <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-body outline-none focus:border-primary-500 focus:bg-white transition-all" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-2">Exact Coordinates</label>
                    <div className="relative group">
                      <MapPin size={18} className="absolute left-4 top-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                      <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-body outline-none focus:border-primary-500 focus:bg-white transition-all shadow-sm" placeholder="Area, Landmark or Street No." value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-2">Resolution Artifacts</label>
                    <div className="group relative border-2 border-dashed border-slate-200 rounded-[1.5rem] p-8 text-center hover:border-primary-500 hover:bg-primary-50/10 transition-all cursor-pointer">
                      <Upload size={32} className="text-slate-400 mx-auto mb-4 group-hover:scale-110 duration-500" />
                      <p className="text-xs font-bold text-navy-800">Attach Evidence</p>
                      <p className="text-[10px] text-slate-400 font-body mt-1">Image or Video up to 10MB</p>
                    </div>
                  </div>

                  <button type="submit" disabled={submitting} className="w-full bg-navy-900 text-white py-5 rounded-[1.5rem] font-display font-bold text-lg hover:bg-navy-800 transition-all shadow-xl shadow-navy-900/20 active:scale-95 flex items-center justify-center gap-3">
                    {submitting ? <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> : <CheckCircle size={20} />}
                    {submitting ? 'Encrypting & Sending...' : ' Lodge Official Grievance'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Premium Complaint Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-navy-950/40 backdrop-blur-md z-[100] flex items-center justify-center px-4" onClick={(e) => e.target === e.currentTarget && setSelected(null)}>
          <div className="bg-white rounded-[2.5rem] shadow-[0_32px_128px_rgba(0,0,0,0.2)] w-full max-w-2xl p-0 overflow-hidden animate-slide-up">
            <div className="relative h-48 bg-navy-900 p-8 flex flex-col justify-end">
               <div className="absolute inset-0 z-0">
                  <img src="/stats_bg.png" alt="" className="w-full h-full object-cover opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent"></div>
               </div>
               <button onClick={() => setSelected(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition-all z-20">
                  <X size={20} />
               </button>
               <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-3">
                     <span className="text-[10px] font-mono text-primary-300 bg-white/10 px-2.5 py-1 rounded-full uppercase tracking-widest">{selected.id}</span>
                     <StatusBadge status={selected.status} />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white uppercase tracking-tight line-clamp-1">{selected.title}</h3>
               </div>
            </div>

            <div className="p-10 space-y-8">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { l: 'Category', v: selected.category, i: FileText },
                    { l: 'Prio', v: selected.priority, i: AlertCircle },
                    { l: 'Filed', v: selected.date, i: Clock },
                    { l: 'Ward', v: '05', i: MapPin }
                  ].map(stat => (
                    <div key={stat.l} className="space-y-1">
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5"><stat.i size={10} /> {stat.l}</p>
                       <p className="text-sm font-display font-bold text-navy-800">{stat.v}</p>
                    </div>
                  ))}
               </div>

               <div className="space-y-3">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Description</p>
                  <p className="text-base text-slate-600 font-body leading-relaxed">{selected.description}</p>
               </div>

               <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">Resolution Lifecycle</p>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative">
                    {['Submission', 'Verification', 'Dispatch', 'Resolved'].map((s, i) => {
                      const current = selected.status === 'Pending' ? 0 : selected.status === 'In Progress' ? 2 : 3
                      const done = i <= current
                      return (
                        <div key={s} className="flex flex-row md:flex-col items-center gap-4 flex-1 relative h-full">
                           <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border-4 transition-all duration-500 z-10 ${
                             done ? 'bg-primary-500 border-primary-100' : 'bg-white border-slate-50'
                           }`}>
                             <CheckCircle size={16} className={done ? 'text-white' : 'text-slate-100'} />
                           </div>
                           <div className="flex flex-col md:items-center">
                              <span className={`text-[10px] font-bold uppercase tracking-widest ${done ? 'text-navy-800' : 'text-slate-300'}`}>{s}</span>
                              <p className="text-[9px] text-slate-400 font-body mt-0.5">{done ? 'Checkpoint met' : 'Pending'}</p>
                           </div>
                        </div>
                      )
                    })}
                    <div className="hidden md:block absolute top-5 left-10 right-10 h-[2px] bg-slate-100 -z-0">
                       <div className="h-full bg-primary-500 transition-all duration-1000" style={{ width: `${(selected.status === 'Pending' ? 0 : selected.status === 'In Progress' ? 0.6 : 1) * 100}%` }}></div>
                    </div>
                  </div>
               </div>

               <button disabled className="w-full py-4 rounded-2xl bg-slate-100 text-slate-400 font-display font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                  Audit logs are restricted to Municipal Admins
               </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
