import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, UserPlus, ArrowLeft, CheckCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { registerUser } from '../api'

export default function RegisterPage() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    fullName: '', username: '', email: '', phone: '', password: '',
    city: '', ward: '', address: '', pincode: ''
  })

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleNext = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const userData = await registerUser({
        fullName: form.fullName,
        username: form.username,
        email: form.email,
        phone: form.phone,
        password: form.password,
        address: `${form.address}, ${form.city} - ${form.pincode}`,
        role: 'CITIZEN'
      });
      
      login(userData, 'citizen');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Try a different username.');
      setStep(1);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 font-body mb-6 transition-colors">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <div className="card shadow-xl border-0">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 mb-4 shadow-lg">
              <span className="text-white font-display font-bold text-xl">eN</span>
            </div>
            <h1 className="text-3xl font-display font-bold text-navy-500">Create Account</h1>
            <p className="text-slate-500 font-body text-sm mt-1">Register as a citizen of e-NagarSetu</p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3 mb-6">
            {[1, 2].map(s => (
              <React.Fragment key={s}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-display font-bold transition-all duration-300 ${step >= s ? 'bg-primary-600 text-white shadow-md' : 'bg-slate-200 text-slate-500'
                  }`}>
                  {step > s ? <CheckCircle size={16} /> : s}
                </div>
                {s < 2 && <div className={`flex-1 h-1 rounded-full transition-all duration-300 ${step > s ? 'bg-primary-500' : 'bg-slate-200'}`} />}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-400 font-body mb-6 -mt-3">
            <span>Identity Details</span>
            <span>Geography Details</span>
          </div>

          {error && <p className="text-xs text-red-600 font-bold bg-red-50 p-3 rounded-xl mb-6">{error}</p>}

          {step === 1 ? (
            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <label className="form-label">Full Name</label>
                <input name="fullName" type="text" className="form-input" placeholder="Ashish Suryavanshi" value={form.fullName} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Username</label>
                  <input name="username" type="text" className="form-input" placeholder="ashish_s" value={form.username} onChange={handleChange} required />
                </div>
                <div>
                  <label className="form-label">Mobile</label>
                  <input name="phone" type="tel" className="form-input" placeholder="9876543210" value={form.phone} onChange={handleChange} required />
                </div>
              </div>
              <div>
                <label className="form-label">Email Address</label>
                <input name="email" type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>
              <div>
                <label className="form-label">Secure Password</label>
                <div className="relative">
                  <input name="password" type={showPass ? 'text' : 'password'} className="form-input pr-10" placeholder="••••••••" value={form.password} onChange={handleChange} required />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full mt-2">Next Step: Address →</button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">City / Town</label>
                  <input name="city" type="text" className="form-input" placeholder="Vidisha" value={form.city} onChange={handleChange} required />
                </div>
                <div>
                  <label className="form-label">Ward Index</label>
                  <input name="ward" type="number" className="form-input" placeholder="5" value={form.ward} onChange={handleChange} required />
                </div>
              </div>
              <div>
                <label className="form-label">Residential Address</label>
                <textarea name="address" className="form-input resize-none" rows={2} placeholder="Building, Street, Landmark" value={form.address} onChange={handleChange} required />
              </div>
              <div>
                <label className="form-label">Zip/Pincode</label>
                <input name="pincode" type="text" className="form-input" placeholder="464001" value={form.pincode} onChange={handleChange} required />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1">Modify Identity</button>
                <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2 shadow-xl shadow-primary-500/20">
                  {loading ? <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> : <UserPlus size={16} />}
                  {loading ? 'Hanging on...' : 'Initialize Profile'}
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-slate-500 font-body mt-5">
            Already registered?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:underline">Return to Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
