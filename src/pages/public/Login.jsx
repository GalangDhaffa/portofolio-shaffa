import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLock, FiMail } from 'react-icons/fi'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    
    // Hardcoded credentials for single admin system
    if (email === 'admin@shaffa.com' && password === 'password123') {
      localStorage.setItem('shaffa_admin_auth', 'true')
      navigate('/admin')
    } else {
      setError('Invalid email or password.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lavender-50 via-cream-50 to-teal-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lavender-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl" />
      
      <div className="relative w-full max-w-md p-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-lavender-400 to-teal-400 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white font-heading text-2xl font-bold">
            S
          </div>
          <h1 className="text-3xl font-bold font-heading text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-sm text-gray-500">Sign in to manage your portfolio</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-blush-50 border border-blush-100 text-blush-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:outline-none focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 transition-all font-sans"
                placeholder="admin@shaffa.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:outline-none focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 transition-all font-sans"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-lavender-500 to-teal-500 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  )
}
