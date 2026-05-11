'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Scissors, ArrowLeft, User, Mail, Lock, Phone, MapPin } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', city: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const update = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters')
    setLoading(true)
    try {
      await signup(form)
      toast.success('Account created! Welcome to New Ideal!')
      router.push('/dashboard')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Signup failed'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name', icon: User, required: true },
    { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com', icon: Mail, required: true },
    { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 XXXXX XXXXX', icon: Phone, required: false },
    { key: 'city', label: 'City', type: 'text', placeholder: 'Your city', icon: MapPin, required: false },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-dark py-10">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy/60 via-bg-dark to-bg-dark" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />

      {/* Back button */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors z-10">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4 mt-10"
      >
        <div className="glass rounded-3xl p-8 border border-white/10 shadow-premium">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-4 shadow-gold">
              <Scissors className="w-7 h-7 text-navy" strokeWidth={2.5} />
            </div>
            <h1 className="font-heading text-2xl font-black text-white">Create Account</h1>
            <p className="text-white/50 text-sm mt-1">Join New Ideal — Start your journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ key, label, type, placeholder, icon: Icon, required }) => (
              <div key={key}>
                <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    className="input-field pl-11"
                    value={form[key as keyof typeof form]}
                    onChange={e => update(key, e.target.value)}
                  />
                </div>
              </div>
            ))}

            {/* Password */}
            <div>
              <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">Password *</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Min. 6 characters"
                  className="input-field pl-11 pr-12"
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <p className="text-xs text-white/35 text-center">
              By creating an account, you agree to our{' '}
              <span className="text-gold">Terms of Service</span> and{' '}
              <span className="text-gold">Privacy Policy</span>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
              ) : 'Create Account'}
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-white/40 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-gold hover:text-gold-light font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
