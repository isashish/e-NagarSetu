import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { Truck, MapPin, Clock, Fuel, CheckCircle, Navigation, RefreshCw, Zap } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import { useApp } from '../context/AppContext'
import { fetchVehicles } from '../api'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for Leaflet default icon issues in React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const initialVehicles = [
  { id: 'V-01', vehicleNumber: 'MP04-AB-1234', driverName: 'Ramesh Yadav', contactNumber: '9876543210', ward: 'Ward 3 & 4', status: 'ACTIVE', fuelLevel: 72, speed: 18, pickups: 18, nextEta: '10:32 AM', currentLat: 23.2599, currentLng: 77.4126 },
  { id: 'V-02', vehicleNumber: 'MP04-CD-5678', driverName: 'Suresh Patel', contactNumber: '9765432109', ward: 'Ward 5 & 6', status: 'ACTIVE', fuelLevel: 45, speed: 12, pickups: 22, nextEta: '11:05 AM', currentLat: 23.2492, currentLng: 77.4242 },
  { id: 'V-03', vehicleNumber: 'MP04-EF-9012', driverName: 'Mahesh Verma', contactNumber: '9654321098', ward: 'Ward 1 & 2', status: 'MAINTENANCE', fuelLevel: 0, speed: 0, pickups: 0, nextEta: '--', currentLat: 23.2333, currentLng: 77.4333 },
]

const routeStops = [
  { name: 'Ward 5 Depot', type: 'start', done: true, eta: '7:00 AM', lat: 23.2500, lng: 77.4000 },
  { name: 'Block A – 12 houses', type: 'stop', done: true, eta: '7:45 AM', lat: 23.2550, lng: 77.4100 },
  { name: 'Market Area – 8 shops', type: 'stop', done: true, eta: '8:30 AM', lat: 23.2600, lng: 77.4200 },
  { name: 'Block B – 15 houses', type: 'stop', done: false, eta: '10:32 AM', lat: 23.2650, lng: 77.4300, current: true },
  { name: 'School Road – 10 houses', type: 'stop', done: false, eta: '11:15 AM', lat: 23.2700, lng: 77.4400 },
  { name: 'Ward 5 Dumping Yard', type: 'end', done: false, eta: '12:00 PM', lat: 23.2800, lng: 77.4500 },
]

const COLORS = { 'Active': '#22c55e', 'Maintenance': '#f97316' }

export default function TrackingPage() {
  const { user } = useApp()
  const [vehicles, setVehicles] = useState(initialVehicles)
  const [selected, setSelected] = useState(initialVehicles[0])
  const [tick, setTick] = useState(0)
  const [mapCenter, setMapCenter] = useState([23.2599, 77.4126]) // Default Bhopal
  const [hasJumpedToUser, setHasJumpedToUser] = useState(false)
  const [liveLocation, setLiveLocation] = useState(null)
  const [distance, setDistance] = useState(null)

  // Fetch Live Vehicles from Backend
  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await fetchVehicles();
        if (data && data.length > 0) {
          setVehicles(data);
          // Keep the selected vehicle object updated with fresh data
          setSelected(prev => data.find(v => v.id === prev.id) || data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch live vehicles:", err);
      }
    };

    loadVehicles();
    const interval = setInterval(loadVehicles, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Track Browser Live Location
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLiveLocation([latitude, longitude]);
      },
      (err) => console.error("Live GPS error:", err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Distance Calculation Utility (Haversine Formula)
  useEffect(() => {
    if (liveLocation && selected) {
      const R = 6371; // Radius of Earth in km
      const dLat = (selected.currentLat - liveLocation[0]) * Math.PI / 180;
      const dLon = (selected.currentLng - liveLocation[1]) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(liveLocation[0] * Math.PI / 180) * Math.cos(selected.currentLat * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      setDistance((R * c).toFixed(2));
    }
  }, [liveLocation, selected]);

  // Geocoding: Fetch coordinates based on user address/ward
  useEffect(() => {
    const fetchCoords = async () => {
      const locationQuery = user?.address || (user?.ward ? `Ward ${user.ward}, Vidisha` : null);
      if (!locationQuery) return;
      
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationQuery)}&limit=1`);
        const data = await response.json();
        
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          const newCoords = [parseFloat(lat), parseFloat(lon)];
          setMapCenter(newCoords);
          if (!hasJumpedToUser) setHasJumpedToUser(true);
        }
      } catch (err) {
        console.error("Geocoding failed:", err);
      }
    };

    fetchCoords();
  }, [user, hasJumpedToUser]);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 2000)
    return () => clearInterval(interval)
  }, [])

  const getPos = (base, offset) => base + Math.sin(tick * 0.3 + offset) * 0.0005

  // Map Component to handle center changes
  function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
      if (center && center[0] && center[1]) {
        map.setView(center, zoom, { animate: true });
      }
    }, [center, zoom]);
    return null;
  }

  // Effect to jump to live location once it's found
  useEffect(() => {
    if (liveLocation && !hasJumpedToUser) {
      setMapCenter(liveLocation);
      setHasJumpedToUser(true);
    }
  }, [liveLocation, hasJumpedToUser]);

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
                    <div className={`w-10 h-10 rounded-[1rem] flex items-center justify-center shrink-0 ${v.status === 'ACTIVE' ? 'bg-primary-100 text-primary-600' : 'bg-saffron-100 text-saffron-600'}`}>
                      <Truck size={20} />
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                      v.status === 'ACTIVE' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-saffron-50 text-saffron-600 border-saffron-100'
                    }`}>{v.status}</span>
                  </div>

                  <div className="space-y-1 mb-4">
                    <p className="font-display font-bold text-navy-800 text-base">{v.vehicleNumber}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{v.ward}</p>
                  </div>

                  {v.status === 'ACTIVE' && (
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                         <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Energy Core</span>
                         <span className="text-[10px] font-bold text-navy-800">{v.fuelLevel}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-1000 ${v.fuelLevel > 50 ? 'bg-primary-500' : v.fuelLevel > 25 ? 'bg-saffron-500' : 'bg-red-500'}`} style={{ width: `${v.fuelLevel}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Premium ETA Forecast */}
            {selected.status === 'ACTIVE' && (
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
                    <h4 className="text-5xl font-display font-bold text-white tracking-tight">{selected.nextEta}</h4>
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
              
              <div className="flex-1 bg-[#f8fafc] relative overflow-hidden group min-h-[400px]">
                <MapContainer 
                  center={mapCenter} 
                  zoom={16} 
                  scrollWheelZoom={true}
                  className="h-full w-full z-10"
                >
                  <ChangeView center={selected.id === vehicles[0].id ? (liveLocation || mapCenter) : [selected.currentLat, selected.currentLng]} zoom={16} />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  />
                  
                  {/* User's Registered Location Marker */}
                  <Marker position={mapCenter}>
                    <Popup>
                      <div className="font-display font-bold text-navy-800">My Registered Location</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest">{user?.address || `Ward ${user?.ward}`}</div>
                    </Popup>
                  </Marker>

                  {/* User's Live GPS Location (Blue Dot) */}
                  {liveLocation && (
                    <Marker 
                      position={liveLocation}
                      icon={L.divIcon({
                        className: 'live-user-icon',
                        html: `
                          <div class="relative flex items-center justify-center">
                            <div class="absolute w-6 h-6 bg-blue-500/30 rounded-full animate-ping"></div>
                            <div class="relative w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                          </div>
                        `,
                        iconSize: [24, 24],
                        iconAnchor: [12, 12]
                      })}
                    >
                      <Popup>
                        <div className="font-display font-bold text-blue-600">You Are Here</div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase">Live Signal Tracking</p>
                      </Popup>
                    </Marker>
                  )}

                  {/* Active Vehicles */}
                  {vehicles.filter(v => v.status === 'ACTIVE').map((v, i) => (
                    <Marker 
                      key={v.id} 
                      position={[getPos(v.currentLat, i * 2), getPos(v.currentLng, i)]}
                      icon={L.divIcon({
                        className: 'custom-truck-icon',
                        html: `
                          <div class="relative flex items-center justify-center">
                            <div class="absolute w-10 h-10 bg-primary-500/20 rounded-full animate-ping shadow-[0_0_15px_rgba(34,197,94,0.4)]"></div>
                            <img src="https://cdn-icons-png.flaticon.com/512/2776/2776067.png" style="width: 38px; height: 38px; position: relative; z-index: 10;" />
                          </div>
                        `,
                        iconSize: [40, 40],
                        iconAnchor: [20, 20],
                      })}
                    >
                      <Popup>
                        <div className="font-display font-bold text-navy-800">{v.vehicleNumber}</div>
                        <div className="text-[10px] text-primary-600 font-bold uppercase tracking-widest">{v.ward}</div>
                        <div className="text-[10px] text-slate-500 mt-1">Driver: {v.driverName}</div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>

                {/* Map Overlay Controls */}

                {/* Map Overlay Controls */}
                <div className="absolute bottom-6 left-6 flex flex-col gap-3 z-[1000]">
                   {/* Distance Card */}
                   {distance && (
                     <div className="bg-navy-900/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/10 animate-slide-right">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
                              <Navigation size={14} className="text-primary-400" />
                           </div>
                           <div>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Unit Proximity</p>
                              <p className="text-sm font-display font-bold text-white">{distance} km <span className="text-[10px] text-primary-400">to Truck</span></p>
                           </div>
                        </div>
                     </div>
                   )}

                   <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-600 shadow-2xl border border-slate-100 space-y-3 min-w-[140px]">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/40 animate-pulse"></div> Live Position
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-saffron-500 shadow-lg shadow-saffron-500/40"></div> Registered Point
                      </div>
                      <div className="flex items-center gap-3">
                        <img src="https://cdn-icons-png.flaticon.com/512/2776/2776067.png" className="w-3 h-3" alt="truck" /> Service Unit
                      </div>
                   </div>
                </div>

                {/* Snap to Me Button */}
                {liveLocation && (
                  <button 
                    onClick={() => setMapCenter(liveLocation)}
                    className="absolute top-6 right-6 z-[1000] w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl border border-slate-100 text-primary-600 hover:bg-primary-50 active:scale-95 transition-all"
                  >
                    <MapPin size={20} />
                  </button>
                )}
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
