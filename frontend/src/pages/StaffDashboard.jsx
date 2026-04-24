import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useApp } from '../context/AppContext'
import { fetchVehicles, assignVehicle } from '../api'
import { Truck, Navigation, CheckCircle, Clock, MapPin, RefreshCw, Radio } from 'lucide-react'

export default function StaffDashboard() {
  const { user, setUser } = useApp()
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [assigning, setAssigning] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const vData = await fetchVehicles();
        setVehicles(vData);
      } catch (err) {
        console.error("Failed to load vehicles", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleAssign = async (vId) => {
    setAssigning(true);
    try {
      const updatedUser = await assignVehicle(user.id, vId);
      setUser(updatedUser); // Update local context
      alert("Vehicle assigned successfully! Your GPS is now broadcasting for " + vId);
    } catch (err) {
      alert("Failed to assign vehicle");
    } finally {
      setAssigning(false);
    }
  };

  const currentVehicle = vehicles.find(v => v.id === user.assignedVehicleId || v.vehicleNumber === user.assignedVehicleId);

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Header Section */}
        <div className="relative rounded-[2rem] overflow-hidden bg-navy-900 p-10 text-white shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/60 to-transparent z-10"></div>
          <img src="/fleet_reality.png" className="absolute inset-0 w-full h-full object-cover opacity-20 z-0" alt="Fleet" />
          
          <div className="relative z-20 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold border border-white/10 mb-2">
                <Radio size={12} className="animate-pulse" />
                Staff Control Center
              </div>
              <h1 className="text-4xl font-display font-bold">Duty <span className="text-primary-400">Dashboard</span></h1>
              <p className="text-slate-400 font-body max-w-md">Manage your assigned vehicle and broadcast live location data for civic transparency.</p>
            </div>
            
            {currentVehicle ? (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex items-center gap-6 animate-slide-right">
                <div className="w-16 h-16 rounded-2xl bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
                  <Truck size={32} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-primary-300 font-bold uppercase tracking-widest mb-1">Active Duty</p>
                  <h3 className="text-2xl font-display font-bold">{currentVehicle.vehicleNumber}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Broadcasting Live Location
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-saffron-500/10 backdrop-blur-xl border border-saffron-500/30 p-6 rounded-3xl flex items-center gap-4 animate-pulse">
                <Clock size={24} className="text-saffron-400" />
                <p className="text-sm font-display font-bold text-saffron-300">No Vehicle Assigned. Select one below to start duty.</p>
              </div>
            )}
          </div>
        </div>

        {/* Vehicle Selection Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-display font-bold text-navy-800 tracking-tight">Available Fleet Units</h2>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Select your vehicle</div>
          </div>

          {loading ? (
            <div className="flex justify-center p-20">
               <RefreshCw className="animate-spin text-primary-600" size={40} />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map(v => (
                <div 
                  key={v.id} 
                  className={`glass-card rounded-[2rem] p-8 border-2 transition-all duration-500 relative overflow-hidden group ${
                    user.assignedVehicleId === v.id || user.assignedVehicleId === v.vehicleNumber
                      ? 'border-primary-500 bg-primary-50/50 shadow-2xl' 
                      : 'border-transparent hover:border-slate-200'
                  }`}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                    <Truck size={100} />
                  </div>
                  
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        v.status === 'ACTIVE' ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-400'
                      }`}>
                        <Truck size={28} />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                        v.status === 'ACTIVE' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                      }`}>{v.status}</span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-display font-bold text-navy-800">{v.vehicleNumber}</h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{v.ward}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
                       <div className="space-y-1">
                          <p className="text-[9px] text-slate-400 font-bold uppercase">Fuel Level</p>
                          <p className="text-sm font-bold text-navy-800">{v.fuelLevel}%</p>
                       </div>
                       <div className="space-y-1 text-right">
                          <p className="text-[9px] text-slate-400 font-bold uppercase">Next ETA</p>
                          <p className="text-sm font-bold text-navy-800">{v.nextEta}</p>
                       </div>
                    </div>

                    <button 
                      disabled={assigning || user.assignedVehicleId === v.id || user.assignedVehicleId === v.vehicleNumber}
                      onClick={() => handleAssign(v.id)}
                      className={`w-full py-4 rounded-2xl font-display font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 ${
                        user.assignedVehicleId === v.id || user.assignedVehicleId === v.vehicleNumber
                          ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                          : 'bg-navy-900 text-white hover:bg-navy-800 shadow-xl'
                      }`}
                    >
                      {user.assignedVehicleId === v.id || user.assignedVehicleId === v.vehicleNumber ? (
                        <>
                          <CheckCircle size={18} />
                          On Duty
                        </>
                      ) : (
                        <>
                          <Navigation size={18} />
                          Assign to Me
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
