import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { Shield, Lock, FileText, Download, Plus, Eye } from 'lucide-react'

import { fetchDocuments } from '../api'

export default function VaultPage() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
     const load = async () => {
        try {
           // We'll use a placeholder user ID for now, in a real app this would come from Auth context
           const data = await fetchDocuments('default-user') 
           setDocuments(data.map(d => ({
              name: d.name,
              type: d.type.replace('_', ' '),
              date: new Date(d.issuedAt).toLocaleDateString(),
              size: 'Cloud Storage'
           })))
        } catch (e) {
           console.error(e)
        } finally {
           setLoading(false)
        }
     }
     load()
  }, [])

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in pb-12">
        <div className="relative rounded-[2rem] overflow-hidden bg-navy-900 p-10 text-white shadow-2xl flex items-center min-h-[200px]">
          <div className="absolute inset-0 z-0 text-white">
             <img src="/login_background_city_1776685166163.png" alt="Secure Vault" className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-[10s]" />
             <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-display font-bold">Document <span className="text-primary-400">Vault</span></h1>
              <p className="text-slate-400 font-body max-w-md">Securely access and manage your municipal records and certificates in one place.</p>
            </div>
            <button className="btn-primary flex items-center gap-2 px-8">
               <Plus size={18} /> Upload Document
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <div className="lg:col-span-1 glass-card rounded-[2rem] p-8 space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-primary-100 flex items-center justify-center text-primary-600 shadow-inner">
                 <Lock size={32} />
              </div>
              <div>
                 <h3 className="text-lg font-display font-bold text-navy-800">Security Status</h3>
                 <p className="text-xs text-slate-500 font-body mt-1">Your data is encrypted using AES-256 standards with 2FA protection active.</p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                 <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    <span>Vault Capacity</span>
                    <span className="text-primary-600">4.4 / 100 MB</span>
                 </div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: '4.4%' }}></div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-3 glass-card rounded-[2.5rem] overflow-hidden border border-slate-200/50">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-slate-50/50 border-b border-slate-100 font-display">
                    {['Document Name', 'Type', 'Added On', 'Actions'].map(h => (
                       <th key={h} className="py-5 px-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>
                    ))}
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {documents.map(d => (
                    <tr key={d.name} className="group hover:bg-slate-50 transition-colors">
                       <td className="py-5 px-8">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
                                <FileText size={20} />
                             </div>
                             <div>
                                <p className="text-sm font-display font-bold text-navy-800">{d.name}</p>
                                <p className="text-[10px] text-slate-400 font-body">{d.size}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-5 px-8">
                          <span className="badge-blue text-[10px]">{d.type}</span>
                       </td>
                       <td className="py-5 px-8 text-sm text-slate-500 font-body">{d.date}</td>
                       <td className="py-5 px-8">
                          <div className="flex items-center gap-2">
                             <button className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-navy-900 transition-colors shadow-sm bg-white"><Eye size={16} /></button>
                             <button className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-primary-600 transition-colors shadow-sm bg-white"><Download size={16} /></button>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
    </Layout>
  )
}
