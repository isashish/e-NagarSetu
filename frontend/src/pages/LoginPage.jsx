import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn, ArrowLeft } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { loginUser } from '../api'

export default function LoginPage() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', role: 'citizen' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const userData = await loginUser({
        email: form.email,
        password: form.password
      });
      
      login(userData, userData.role.toLowerCase());
      navigate(userData.role === 'ADMIN' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.message || 'Connection refused or invalid credentials.');
    } finally {
      setLoading(false)
    }
  }

  const demoLogin = (role) => {
    const demos = {
      citizen: { email: 'john@example.com', password: 'password', role: 'citizen' },
      admin: { email: 'admin@enagarsetu.gov', password: 'admin123', role: 'admin' },
    }
    const d = demos[role]
    setForm(d)
    // Manually trigger handle submit or just do it
    setLoading(true)
    loginUser({ email: d.email, password: d.password })
      .then(userData => {
        login(userData, userData.role.toLowerCase());
        navigate(userData.role === 'ADMIN' ? '/admin' : '/dashboard');
      })
      .catch(err => setError("Demo account not seeded yet. Restart backend."))
      .finally(() => setLoading(false))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 font-body mb-6 transition-colors">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <div className="card shadow-xl border-0">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 mb-4 shadow-lg">
              <span className="text-white font-display font-bold text-xl">eN</span>
            </div>
            <h1 className="text-3xl font-display font-bold text-navy-500">Welcome Back</h1>
            <p className="text-slate-500 font-body text-sm mt-1">Sign in to your e-NagarSetu account</p>
          </div>

          {/* Role tabs */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
            {['citizen', 'admin', 'staff'].map(r => (
              <button
                key={r}
                onClick={() => setForm(f => ({ ...f, role: r }))}
                className={`flex-1 py-2 text-sm font-display font-semibold rounded-lg capitalize transition-all duration-200 ${form.role === r
                    ? 'bg-white text-primary-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="citizen@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="form-label mb-0">Password</label>
                <Link to="#" className="text-xs text-primary-600 hover:underline font-body">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="form-input pr-10"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required
                />
                <button
                   type="button"
                   onClick={() => setShowPass(!showPass)}
                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600 font-body">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : <LogIn size={16} />}
              {loading ? 'Authorizing Cluster...' : 'Verify & Login'}
            </button>
          </form>

          {/* Demo buttons */}
          <div className="mt-5 pt-5 border-t border-slate-100">
            <p className="text-xs text-center text-slate-400 font-body mb-3">Try with system defaults</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => demoLogin('citizen')} className="btn-secondary text-sm py-2 px-3">
                Citizen Portal
              </button>
              <button onClick={() => demoLogin('admin')} className="bg-navy-500 text-white text-sm py-2 px-3 rounded-lg font-display font-semibold hover:bg-navy-600 transition-colors">
                Admin Command
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 font-body mt-5">
            New to the ecosystem?{' '}
            <Link to="/register" className="text-primary-600 font-semibold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
