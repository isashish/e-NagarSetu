import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Megaphone, Bell, Calendar, ChevronRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { fetchNotices } from '../api'

export default function NoticesPage() {
  const { announcements: staticAnnouncements, notices: staticNotices } = useApp()
  const [notices, setNotices] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchNotices()
        const mapped = data.map(n => ({
          id: n.id,
          title: n.title,
          content: n.content,
          category: n.category,
          date: new Date(n.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
        }))
        // Split them between announcements and notices for the UI logic
        setAnnouncements(mapped.filter(n => n.category !== 'Finance'))
        setNotices(mapped.filter(n => n.category === 'Finance'))
      } catch (e) {
        console.error(e)
        // Fallback to static data if API fails
        setAnnouncements(staticAnnouncements)
        setNotices(staticNotices)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in pb-12">
        <div className="relative rounded-[2rem] overflow-hidden bg-navy-900 p-10 text-white shadow-2xl flex items-center min-h-[200px]">
          <div className="absolute inset-0 z-0 text-white">
             <img src="/indian_municipal_notice_board_documentary_1776694133733.png" alt="Notices" className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[10s]" />
             <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent"></div>
          </div>
          <div className="relative z-10 space-y-2">
            <h1 className="text-4xl font-display font-bold">Municipal <span className="text-saffron-500">Notice Board</span></h1>
            <p className="text-slate-400 font-body max-w-md">Stay updated with official announcements and ward-level updates.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-6">
              <h2 className="section-title">Latest Announcements</h2>
              {announcements.map(a => (
                <div key={a.id} className="glass-card rounded-[1.5rem] p-8 hover:border-primary-200 transition-all border border-slate-100 bg-white">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                        <Megaphone size={20} />
                     </div>
                     <span className="text-xs font-bold text-slate-400 font-body">{a.date}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-navy-800 mb-3">{a.title}</h3>
                  <p className="text-slate-600 font-body leading-relaxed">{a.content}</p>
                </div>
              ))}
           </div>
           <div className="lg:col-span-1 space-y-6">
              <h2 className="section-title">Archive & Circulars</h2>
              <div className="space-y-4">
                 {notices.map(n => (
                    <div key={n.id} className="glass-card rounded-2xl p-5 hover:bg-slate-50 transition-colors border border-slate-100 flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-white transition-colors">
                             <Bell size={18} />
                          </div>
                          <div>
                             <p className="text-sm font-display font-bold text-navy-800">{n.title}</p>
                             <p className="text-[10px] text-primary-600 font-bold uppercase tracking-widest">{n.category} · {n.date}</p>
                          </div>
                       </div>
                       <ChevronRight size={16} className="text-slate-300 group-hover:text-primary-500 transition-colors" />
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </Layout>
  )
}
