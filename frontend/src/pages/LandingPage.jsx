import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
  Truck, FileText, CreditCard, BarChart3, Leaf, Shield,
  Star, ArrowRight, MapPin, Bell, Users, CheckCircle, Zap,
  Facebook, Twitter, Instagram, Linkedin, Mail, Phone, Globe
} from 'lucide-react'

const features = [
  { icon: Truck, title: 'Smart Route Optimization', desc: 'AI-powered dynamic routing for garbage vehicles. Only visit homes with pickup ready — saving fuel and time.', color: 'bg-primary-100 text-primary-600' },
  { icon: FileText, title: 'Complaint Management', desc: 'Report sanitation, drainage, or road issues with geo-tagged photos. Track resolution in real time.', color: 'bg-blue-100 text-blue-600' },
  { icon: CreditCard, title: 'Digital Payments', desc: 'Pay property tax, water bills, and sanitation charges online. Download receipts instantly.', color: 'bg-saffron-100 text-saffron-600' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Data-driven insights for administrators. Monitor wards, vehicles, revenue, and performance.', color: 'bg-purple-100 text-purple-600' },
  { icon: Leaf, title: 'Eco Tracking', desc: 'Track CO₂ emissions reduced, fuel saved, and environmental impact across your municipality.', color: 'bg-emerald-100 text-emerald-600' },
  { icon: Shield, title: 'Civic Credit Score', desc: 'Earn points for responsible behavior. Redeem for tax rebates, bill discounts, and recognition.', color: 'bg-rose-100 text-rose-600' },
]

const stats = [
  { value: '40%', label: 'Fuel Savings', icon: Zap },
  { value: '3x', label: 'Faster Complaint Resolution', icon: CheckCircle },
  { value: '100%', label: 'Digital Payments', icon: CreditCard },
  { value: '50+', label: 'Wards Supported', icon: MapPin },
]

const steps = [
  { step: '01', title: 'Register Your Household', desc: 'Sign up with your ward details, address, and mobile number.' },
  { step: '02', title: 'Mark Garbage Ready', desc: 'Tap "Garbage Ready" each morning so the vehicle only visits your home.' },
  { step: '03', title: 'Pay Bills Online', desc: 'View and pay property tax, water bills, and fees without visiting the office.' },
  { step: '04', title: 'Report & Track Issues', desc: 'Upload photos of civic issues and track their resolution live.' },
]

const sliderImages = [
  { url: '/waste_management.png', title: 'Smart Waste Management', subtitle: 'AI-powered routing & collection' },
  { url: '/infrastructure_problem.png', title: 'Real-world Challenges', subtitle: 'Highlighting & resolving city problems' },
  { url: '/complaints.png', title: 'Citizen Grievance Redressal', subtitle: 'Resolve issues with geo-tagged reports' },
  { url: '/payments.png', title: 'Secure Digital Payments', subtitle: 'Pay taxes & bills instantly online' },
  { url: '/analytics.png', title: 'Command & Control Dashboard', subtitle: 'Data-driven city administration' },
]

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="hero-pattern relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 md:pt-10 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-700 px-4 py-2 rounded-full text-sm font-display font-semibold">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-slow" />
                Smart Cities Mission · Digital India
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-navy-500 leading-tight">
                Your City.<br />
                <span className="text-primary-600">Smarter.</span><br />
                <span className="text-saffron-500">Cleaner.</span>
              </h1>
              <p className="text-lg text-slate-600 font-body max-w-lg leading-relaxed">
                e-NagarSetu is a unified digital platform for Nagar Palikas — integrating smart waste management, citizen grievance redressal, digital payments, and real-time analytics.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/register" className="btn-primary flex items-center gap-2">
                  Get Started Free <ArrowRight size={16} />
                </Link>
                <Link to="/login" className="btn-secondary">
                  Login to Portal
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex -space-x-2">
                  {['A', 'R', 'P', 'S'].map((l) => (
                    <div key={l} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 border-2 border-white flex items-center justify-center">
                      <span className="text-white font-display font-bold text-xs">{l}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500 font-body"><strong className="text-slate-700">2,400+</strong> citizens already registered</p>
              </div>
            </div>

            {/* Hero Visual - Dynamic Slider */}
            <div className="relative animate-slide-up delay-200">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-primary-100 group aspect-[4/3] md:aspect-auto md:h-[500px]">
                {sliderImages.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={slide.url}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent"></div>
                    
                    <div className="absolute bottom-20 left-6 right-6 text-white">
                      <h3 className="text-2xl font-display font-bold mb-1">{slide.title}</h3>
                      <p className="text-primary-200 font-body text-sm">{slide.subtitle}</p>
                    </div>
                  </div>
                ))}

                {/* Progress Indicators */}
                <div className="absolute bottom-24 left-6 flex gap-2">
                  {sliderImages.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'w-8 bg-primary-500' : 'w-2 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  {/* Mock dashboard preview */}
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/50 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                         <span className="font-display font-bold text-navy-800 text-sm md:text-base">Live City Status</span>
                      </div>
                      <span className="bg-primary-100 text-primary-700 text-[10px] md:text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">Ward 5 Global</span>
                    </div>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                      {[
                        { label: 'Active Routes', value: '42' },
                        { label: 'Issues Fixed', value: '18' },
                        { label: 'Green Energy', value: '76%' },
                      ].map(s => (
                        <div key={s.label} className="bg-white rounded-xl p-2 md:p-3 text-center border border-slate-100 shadow-sm">
                          <p className="font-display font-bold text-lg md:text-xl text-primary-600">{s.value}</p>
                          <p className="text-[10px] md:text-xs text-slate-500 font-medium whitespace-nowrap">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/stats_bg.png" alt="Stats background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-900/85 backdrop-blur-[2px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-500/10 border border-primary-500/20 mb-4 group-hover:bg-primary-500/20 transition-all duration-300">
                  <Icon size={26} className="text-primary-400" />
                </div>
                <p className="text-4xl md:text-5xl font-display font-bold text-white mb-1">{value}</p>
                <p className="text-sm text-slate-300 font-body items-center flex justify-center gap-1 uppercase tracking-wider font-semibold">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-display font-bold text-navy-500 mb-3">Everything Your Municipality Needs</h2>
            <p className="text-slate-500 font-body max-w-xl mx-auto">One platform. Every civic service. From waste collection to tax payment — built for citizens and administrators.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card-hover group">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-display font-bold text-navy-500 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 font-body leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Steps */}
            <div>
              <div className="mb-10">
                <h2 className="text-4xl font-display font-bold text-navy-500 mb-4">How It Works</h2>
                <p className="text-lg text-slate-500 font-body">Follow straightforward steps to experience a seamless and transparent digital municipality.</p>
              </div>
              <div className="space-y-8">
                {steps.map(({ step, title, desc }, index) => (
                  <div key={step} className="flex gap-5 relative group">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-display font-bold text-lg z-10 shadow-sm group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                        {step}
                      </div>
                      {index !== steps.length - 1 && (
                        <div className="w-0.5 h-full bg-slate-200 mt-2"></div>
                      )}
                    </div>
                    <div className="pb-8">
                      <h3 className="text-xl font-display font-bold text-navy-800 mb-2">{title}</h3>
                      <p className="text-slate-600 font-body leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Visual */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-100 to-saffron-100 rounded-3xl transform rotate-3 blur-sm opacity-50"></div>
              <img src="/digital_citizen.png" alt="Citizen using App" className="relative rounded-3xl shadow-2xl border-4 border-white object-cover w-full h-[600px]" />
              
              <div className="absolute -left-8 top-12 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow">
                <div className="w-12 h-12 bg-green-100 text-green-500 flex items-center justify-center rounded-xl">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="font-display font-bold text-navy-800">Tax Paid</p>
                  <p className="text-sm text-slate-500">₹2,400 received</p>
                </div>
              </div>
              
            </div>
            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/cta_bg.png" alt="CTA Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary-900/90 mix-blend-multiply"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-display font-semibold mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Join the Digital Revolution
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            Ready to Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-100">Municipality?</span>
          </h2>
          <p className="text-lg text-primary-100 font-body mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of citizens who are already using e-NagarSetu for smarter, cleaner, and more efficient cities. Experience the power of digital governance today.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link to="/register" className="bg-white text-primary-900 px-10 py-4 rounded-2xl font-display font-bold text-lg hover:bg-green-50 transition-all duration-300 shadow-2xl hover:scale-105 flex items-center gap-2">
              Get Started Now <ArrowRight size={20} />
            </Link>
            <Link to="/login?role=admin" className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-display font-bold text-lg hover:bg-white/20 transition-all duration-300">
              Admin Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-navy-900 text-slate-300 pt-20 pb-10 border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Branding & Mission */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
                  <span className="text-white font-display font-bold text-base">eN</span>
                </div>
                <span className="font-display font-bold text-white text-2xl tracking-tight">e-NagarSetu</span>
              </div>
              <p className="text-sm font-body leading-relaxed text-slate-400">
                Revolutionizing municipal services through AI-driven waste management, digital transparency, and citizen-first governance.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon) => (
                  <a key={Icon.name || Icon.displayName} href="#" className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 border border-navy-700">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-bold text-white text-lg mb-6 tracking-wide">Quick Links</h4>
              <ul className="space-y-4 font-body text-sm">
                <li><Link to="/dashboard" className="hover:text-primary-400 transition-colors">Citizen Dashboard</Link></li>
                <li><Link to="/complaints" className="hover:text-primary-400 transition-colors">Report Issues</Link></li>
                <li><Link to="/payments" className="hover:text-primary-400 transition-colors">Property Tax & Bills</Link></li>
                <li><Link to="/tracking" className="hover:text-primary-400 transition-colors">Live Waste Tracking</Link></li>
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h4 className="font-display font-bold text-white text-lg mb-6 tracking-wide">Support</h4>
              <ul className="space-y-4 font-body text-sm">
                <li><a href="#" className="hover:text-primary-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Grievance Cell</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-display font-bold text-white text-lg mb-6 tracking-wide">Contact Us</h4>
              <ul className="space-y-4 font-body text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary-500 shrink-0" />
                  <span>Municipal Corporation HQ, Smart City Tower, Ward 01</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-primary-500 shrink-0" />
                  <span>1800-SMART-CITY (Toll Free)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-primary-500 shrink-0" />
                  <span>support@e-nagarsetu.gov.in</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-navy-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-body text-slate-500 uppercase tracking-widest font-semibold">
            <p>© 2024 e-NagarSetu · Powered by Smart Cities Mission</p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2"><Globe size={14} /> Made in India</span>
              <span>Digital India Initiative</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
