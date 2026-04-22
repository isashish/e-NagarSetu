import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { Calendar, Clock, MapPin, CheckCircle, Info } from 'lucide-react'

import { fetchBookings, createBooking } from '../api'

export default function BookingPage() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
     const load = async () => {
        try {
           const data = await fetchBookings()
           // For mapping purposes, if no facilities exist, we can use the data as is
           setResources(data.map(b => ({
              id: b.id,
              name: b.facilityName,
              type: 'Municipal Resource',
              price: 'Varies',
              status: b.status === 'CONFIRMED' ? 'Booked' : 'Available'
           })))
        } catch (e) {
           console.error(e)
        } finally {
           setLoading(false)
        }
     }
     load()
  }, [])

  const handleBook = async (resource) => {
     try {
        await createBooking({
           facilityName: resource.name,
           status: 'CONFIRMED',
           date: new Date().toISOString().split('T')[0],
           timeSlot: '10:00 AM - 12:00 PM',
           createdAt: new Date().toISOString()
        })
        alert(`Successfully booked ${resource.name}!`)
        window.location.reload() // Refresh to show updated status
     } catch (e) {
        console.error(e)
        alert('Booking failed. Please try again.')
     }
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in pb-12">
        <div className="relative rounded-[2rem] overflow-hidden bg-navy-900 p-10 text-white shadow-2xl flex items-center min-h-[200px]">
          <div className="absolute inset-0 z-0 text-white">
             <img src="/indian_cityscape_overview_documentary_1776690872666.png" alt="City Resources" className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-[10s]" />
             <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent"></div>
          </div>
          <div className="relative z-10 space-y-2">
            <h1 className="text-4xl font-display font-bold">Resource <span className="text-primary-400">Booking</span></h1>
            <p className="text-slate-400 font-body max-w-md">Access and book municipal facilities and utilities digitally.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {resources.map(r => (
            <div key={r.id} className="glass-card rounded-[1.5rem] p-6 hover:shadow-xl transition-all border border-slate-100 group">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white`}>
                  <Calendar size={24} />
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${r.status === 'Available' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{r.status}</span>
              </div>
              <h3 className="font-display font-bold text-navy-800 text-lg mb-1">{r.name}</h3>
              <p className="text-xs text-slate-400 font-body mb-4">{r.type}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-navy-900 font-display font-bold">{r.price}</span>
                <button 
                  onClick={() => handleBook(r)}
                  disabled={r.status !== 'Available'} 
                  className="btn-primary text-xs px-4 py-2 disabled:opacity-50 disabled:bg-slate-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
