import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { CreditCard, CheckCircle, Download, Clock, AlertCircle, X, Lock } from 'lucide-react'
import { fetchPayments, makePayment } from '../api'

export default function PaymentsPage() {
  const [payModal, setPayModal] = useState(null)
  const [paying, setPaying] = useState(false)
  const [paidIds, setPaidIds] = useState([])
  const [success, setSuccess] = useState(null)
  const [cardForm, setCardForm] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [tab, setTab] = useState('dues')
  const [dues, setDues] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
     loadData()
  }, [])

  const loadData = async () => {
     try {
        const data = await fetchPayments()
        // Split data into dues and history
        setDues(data.filter(p => p.status === 'PENDING').map(p => ({
           id: p.id,
           type: p.type.replace('_', ' '),
           amount: p.amount,
           dueDate: 'Upcoming',
           period: 'FY 2024-25',
           overdue: false
        })))
        setHistory(data.filter(p => p.status === 'COMPLETED').map(p => ({
           id: p.transactionId || p.id,
           type: p.type.replace('_', ' '),
           amount: p.amount,
           date: new Date(p.paidAt).toLocaleDateString(),
           status: 'Completed'
        })))
     } catch (e) {
        console.error(e)
     } finally {
        setLoading(false)
     }
  }

  const handlePay = async (e) => {
    e.preventDefault()
    setPaying(true)
    try {
       // Send payment request to backend
       await makePayment({
          id: payModal.id,
          status: 'COMPLETED',
          paidAt: new Date().toISOString(),
          transactionId: 'TXN-' + Math.floor(Math.random() * 1000000)
       })
       
       setPaidIds(p => [...p, payModal.id])
       setSuccess(payModal)
       setPayModal(null)
       loadData()
    } catch (err) {
       console.error("Payment failed", err)
       alert("Transaction declined. Please check credentials.")
    } finally {
       setPaying(false)
    }
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Premium Finance Header */}
        <div className="relative rounded-[2rem] overflow-hidden bg-navy-900 p-10 text-white shadow-2xl group flex items-center min-h-[220px]">
          <div className="absolute inset-0 z-0">
             <img src="/digital_payments_slider_1776682371030.png" alt="Utility Challenge" className="w-full h-full object-cover opacity-40 transition-transform duration-[10s] group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-saffron-500/20 text-saffron-300 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold mb-2 border border-white/10">
                <CreditCard size={12} />
                Financial Command Center
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold">Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Settlements</span></h1>
              <p className="text-slate-400 font-body text-sm md:text-base max-w-md">Manage municipal taxes, utility bills, and transaction history through our encrypted portal.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] text-right hidden lg:block">
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Electronic Balance</p>
               <h3 className="text-3xl font-display font-bold text-white">₹7,450.00</h3>
               <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">System Sync: Active</span>
            </div>
          </div>
        </div>

        {/* Success Banner - Animated */}
        {success && (
          <div className="glass-card rounded-[2rem] p-6 border-l-8 border-primary-500 relative overflow-hidden animate-slide-up">
            <div className="absolute top-0 right-0 p-4 animate-float opacity-10">
               <CheckCircle size={80} />
            </div>
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-primary-500 flex items-center justify-center shrink-0 shadow-lg shadow-primary-500/20">
                <CheckCircle size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-display font-bold text-navy-800 text-lg">Transaction Complete</h4>
                <p className="text-sm text-slate-500 font-body">₹{success.amount.toLocaleString()} settled for {success.type}. Digital receipt is now available.</p>
              </div>
              <button onClick={() => setSuccess(null)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-all">
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Financial Summary - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Outstandings', value: `₹${dues.filter(d => !paidIds.includes(d.id)).reduce((s, d) => s + d.amount, 0).toLocaleString()}`, color: 'text-red-500', bg: 'bg-red-50', desc: 'Active invoices', icon: AlertCircle },
            { label: 'Critically Overdue', value: dues.filter(d => d.overdue && !paidIds.includes(d.id)).length, color: 'text-saffron-600', bg: 'bg-saffron-50', desc: 'Interest applying', icon: Clock },
            { label: 'Annual Contributions', value: `₹${history.reduce((s, h) => s + h.amount, 0).toLocaleString()}`, color: 'text-primary-600', bg: 'bg-primary-50', desc: 'Fiscal Year 2024', icon: CheckCircle },
          ].map(s => (
            <div key={s.label} className="glass-card rounded-3xl p-6 group hover:scale-[1.02] transition-transform">
               <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                    <s.icon size={20} className={s.color} />
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{s.desc}</span>
               </div>
               <h3 className={`text-3xl font-display font-bold text-navy-800`}>{s.value}</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tab Controls - Premium Slider */}
        <div className="flex gap-2 p-1.5 bg-slate-100/50 backdrop-blur-sm rounded-[1.25rem] border border-slate-200/50 w-fit">
          {['dues', 'history'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-8 py-2.5 rounded-xl text-sm font-display font-bold transition-all duration-300 ${
                tab === t
                  ? 'bg-white text-navy-800 shadow-xl shadow-navy-900/5 border border-slate-200/50'
                  : 'text-slate-500 hover:text-navy-800 font-medium'
              }`}
            >
              {t === 'dues' ? 'Pending Invoices' : 'Ledger History'}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {tab === 'dues' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dues.map(d => {
              const paid = paidIds.includes(d.id)
              return (
                <div key={d.id} className={`glass-card rounded-[2rem] p-8 group relative overflow-hidden transition-all duration-500 border-t-8 ${paid ? 'border-primary-500' : d.overdue ? 'border-red-500 bg-red-50/10' : 'border-navy-100'}`}>
                  <div className="flex items-start justify-between mb-8">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                         <h4 className="text-2xl font-display font-bold text-navy-800">{d.type}</h4>
                         {paid && <CheckCircle size={16} className="text-primary-500" />}
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">{d.period} · ID: {d.id}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${paid ? 'bg-primary-50' : d.overdue ? 'bg-red-50' : 'bg-slate-50'}`}>
                      {paid ? <CreditCard size={20} className="text-primary-600" /> : d.overdue ? <AlertCircle size={20} className="text-red-500" /> : <Clock size={20} className="text-slate-400" />}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-baseline md:items-center justify-between gap-6">
                    <div>
                       <p className="text-3xl font-display font-bold text-navy-800">₹{d.amount.toLocaleString()}</p>
                       <p className="text-[10px] text-slate-400 font-body mt-1 uppercase tracking-widest">Final Amount inclusive of tax</p>
                    </div>
                    {!paid ? (
                      <button onClick={() => setPayModal(d)} className="bg-navy-900 text-white px-8 py-3.5 rounded-2xl font-display font-bold text-sm hover:bg-navy-800 transition-all shadow-xl shadow-navy-900/10 active:scale-95 whitespace-nowrap">
                        Initiate Payment
                      </button>
                    ) : (
                      <button className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary-600 group-hover:bg-primary-50 px-4 py-2 rounded-xl transition-all border border-transparent hover:border-primary-100">
                        <Download size={14} /> Download Receipt
                      </button>
                    )}
                  </div>

                  {d.overdue && !paid && (
                    <div className="mt-6 p-3 rounded-xl bg-red-100/50 border border-red-200/50 flex items-center gap-2">
                       <AlertCircle size={14} className="text-red-600" />
                       <span className="text-[10px] text-red-600 font-bold uppercase tracking-widest">Interest Accruing (₹24.00 added)</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="glass-card rounded-[2.5rem] overflow-hidden border border-slate-200/50">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 font-display">
                    {['Ref ID', 'Service Category', 'Capital', 'Timepoint', 'Status', 'Artifacts'].map(h => (
                      <th key={h} className="py-5 px-8 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.map(h => (
                    <tr key={h.id} className="group hover:bg-slate-50/80 transition-colors">
                      <td className="py-5 px-8 font-mono text-xs text-slate-500 font-semibold">{h.id}</td>
                      <td className="py-5 px-8">
                         <p className="font-display font-bold text-navy-800 text-sm whitespace-nowrap">{h.type}</p>
                         <p className="text-[9px] text-slate-400 font-bold uppercase">Municipal Service</p>
                      </td>
                      <td className="py-5 px-8 font-display font-bold text-navy-800 text-lg whitespace-nowrap">₹{h.amount.toLocaleString()}</td>
                      <td className="py-5 px-8 font-body text-slate-500 text-sm whitespace-nowrap">{h.date}</td>
                      <td className="py-5 px-8">
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-widest border border-green-100">
                           <CheckCircle size={10} /> {h.status}
                         </span>
                      </td>
                      <td className="py-5 px-8">
                        <button className="text-navy-900 hover:text-primary-600 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-colors">
                           <Download size={14} /> Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modern Payment Gateway Modal */}
      {payModal && (
        <div className="fixed inset-0 bg-navy-950/40 backdrop-blur-md z-[100] flex items-center justify-center px-4" onClick={e => e.target === e.currentTarget && setPayModal(null)}>
          <div className="bg-white rounded-[2.5rem] shadow-[0_32px_128px_rgba(0,0,0,0.2)] w-full max-w-lg p-0 overflow-hidden animate-slide-up">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
               <div>
                  <h2 className="text-2xl font-display font-bold text-navy-800">Checkout</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Transaction Ref: {payModal.id}</p>
               </div>
               <button onClick={() => setPayModal(null)} className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400 transition-all">
                 <X size={20} />
               </button>
            </div>

            <div className="p-8 bg-slate-50/50">
               <div className="bg-navy-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                 <div className="relative z-10">
                    <p className="text-[10px] text-primary-200 font-bold uppercase tracking-[0.3em] mb-2">{payModal.type}</p>
                    <div className="flex items-baseline gap-2">
                       <span className="text-4xl font-display font-bold text-white">₹{payModal.amount.toLocaleString()}</span>
                       <span className="text-primary-300 font-body text-sm">/ {payModal.period}</span>
                    </div>
                 </div>
               </div>
            </div>

            <form onSubmit={handlePay} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-2">Card Credentials</label>
                <div className="relative group">
                  <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                  <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-mono text-sm outline-none focus:border-primary-500 focus:bg-white transition-all shadow-sm" placeholder="XXXX XXXX XXXX XXXX" maxLength={19} value={cardForm.number} onChange={e => setCardForm(f => ({ ...f, number: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim() }))} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-2">Valid Thru</label>
                  <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-mono text-sm outline-none focus:border-primary-500 focus:bg-white transition-all shadow-sm" placeholder="MM/YY" maxLength={5} value={cardForm.expiry} onChange={e => setCardForm(f => ({ ...f, expiry: e.target.value }))} required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-2">CVV Security</label>
                  <input type="password" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-mono text-sm outline-none focus:border-primary-500 focus:bg-white transition-all shadow-sm" placeholder="•••" maxLength={3} value={cardForm.cvv} onChange={e => setCardForm(f => ({ ...f, cvv: e.target.value }))} required />
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-primary-50 border border-primary-100 flex items-center gap-3">
                 <Lock size={16} className="text-primary-600" />
                 <p className="text-[10px] text-primary-600 font-bold uppercase tracking-widest leading-relaxed">System protected by 256-bit AES industry standard encryption</p>
              </div>

              <button type="submit" disabled={paying} className="w-full bg-primary-600 text-white py-5 rounded-[1.5rem] font-display font-bold text-lg hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 active:scale-95 flex items-center justify-center gap-3">
                {paying ? <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> : <Lock size={20} />}
                {paying ? 'Authorizing Cluster...' : `Settle ₹${payModal.amount.toLocaleString()}`}
              </button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}
