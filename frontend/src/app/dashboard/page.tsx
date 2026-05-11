'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Scissors, GraduationCap, CreditCard, Calendar, Clock,
  MapPin, Wifi, ArrowRight, LogOut, User, Bell, BookOpen, CheckCircle2
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { enrollmentsAPI, paymentsAPI } from '@/lib/api'
import toast from 'react-hot-toast'

interface Enrollment {
  _id: string
  status: string
  paymentStatus: string
  mode: string
  enrolledAt: string
  course: { title: string; type: string; fees: number; skills: string[]; duration: string }
  batch: { batchName: string; startDate: string; endDate: string; timing: string; days: string[]; instructor: string; mode: string }
}

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('enrollments')

  useEffect(() => {
    if (!user) { router.push('/login'); return }
    if (user.role === 'admin') { router.push('/admin'); return }
    fetchData()
  }, [user])

  const fetchData = async () => {
    try {
      const { data } = await enrollmentsAPI.myEnrollments()
      setEnrollments(data.enrollments || [])
    } catch {
      toast.error('Failed to load your data')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
    toast.success('Logged out successfully')
  }

  if (!user) return null

  const initials = user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 glass-dark border-r border-white/10 hidden lg:flex flex-col z-40">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center">
              <Scissors className="w-4.5 h-4.5 text-navy" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-white">New <span className="text-gold">Ideal</span></div>
              <div className="text-[9px] text-white/40 uppercase tracking-widest">Student Portal</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'enrollments', icon: BookOpen, label: 'My Courses' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? 'bg-gold/10 text-gold border border-gold/20'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        {/* Enroll CTA */}
        <div className="p-4 border-t border-white/10">
          <Link href="/#courses" className="btn-gold w-full text-center text-sm py-2.5 block">
            Enroll in a Course
          </Link>
        </div>

        {/* User + Logout */}
        <div className="p-4">
          <div className="flex items-center gap-3 glass rounded-xl px-3 py-2.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-navy text-xs font-bold">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">{user.name}</div>
              <div className="text-[10px] text-white/40 truncate">{user.email}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Mobile header */}
        <div className="lg:hidden glass-dark border-b border-white/10 px-4 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-gold flex items-center justify-center">
              <Scissors className="w-4 h-4 text-navy" />
            </div>
            <span className="font-heading font-bold text-white text-sm">New Ideal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-navy text-xs font-bold">{initials}</div>
            <button onClick={handleLogout}><LogOut className="w-5 h-5 text-white/50" /></button>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          {/* Welcome banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-navy-light to-navy" />
            <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-transparent" />
            <div className="relative p-8 flex items-center justify-between">
              <div>
                <div className="text-gold text-sm font-medium mb-1">Welcome back 👋</div>
                <h1 className="font-heading text-2xl lg:text-3xl font-black text-white">{user.name}</h1>
                <p className="text-white/50 text-sm mt-1">
                  {enrollments.length > 0
                    ? `You have ${enrollments.length} active enrollment${enrollments.length > 1 ? 's' : ''}`
                    : 'Ready to start your tailoring journey?'}
                </p>
              </div>
              <div className="hidden md:flex w-16 h-16 rounded-2xl bg-gradient-gold items-center justify-center shadow-gold">
                <GraduationCap className="w-8 h-8 text-navy" />
              </div>
            </div>
          </motion.div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: BookOpen, label: 'Enrolled', value: enrollments.length, color: 'text-gold' },
              { icon: CheckCircle2, label: 'Active', value: enrollments.filter(e => e.status === 'active').length, color: 'text-green-400' },
              { icon: CreditCard, label: 'Paid', value: enrollments.filter(e => e.paymentStatus === 'paid').length, color: 'text-blue-400' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="glass rounded-2xl p-4 text-center">
                <Icon className={`w-5 h-5 ${color} mx-auto mb-1.5`} />
                <div className={`text-xl font-heading font-black ${color}`}>{value}</div>
                <div className="text-xs text-white/40">{label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          {activeTab === 'enrollments' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-heading text-xl font-bold text-white mb-6">My Courses</h2>

              {loading ? (
                <div className="grid lg:grid-cols-2 gap-5">
                  {[1, 2].map(i => (
                    <div key={i} className="glass rounded-2xl h-48 animate-pulse" />
                  ))}
                </div>
              ) : enrollments.length === 0 ? (
                <div className="glass rounded-3xl p-12 text-center border border-dashed border-white/20">
                  <GraduationCap className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-white mb-2">No Enrollments Yet</h3>
                  <p className="text-white/40 text-sm mb-6">Enroll in a course to start your professional journey</p>
                  <Link href="/#courses" className="btn-gold inline-flex items-center gap-2">
                    Browse Courses <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-5">
                  {enrollments.map((enrollment) => (
                    <motion.div
                      key={enrollment._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass rounded-2xl p-6 border border-white/10 hover:border-gold/20 transition-all"
                    >
                      {/* Course header */}
                      <div className="flex items-start justify-between mb-5">
                        <div>
                          <div className={`text-xs font-semibold px-2.5 py-1 rounded-full border mb-2 inline-block ${
                            enrollment.course?.type === 'mens'
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                              : 'bg-pink-500/10 text-pink-400 border-pink-500/20'
                          }`}>
                            {enrollment.course?.type === 'mens' ? "👔 Men's Course" : "👗 Women's Course"}
                          </div>
                          <h3 className="font-heading font-bold text-white text-sm">{enrollment.course?.title}</h3>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full border ${
                          enrollment.status === 'active'
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                        }`}>
                          {enrollment.status}
                        </span>
                      </div>

                      {/* Batch details */}
                      <div className="space-y-2.5 mb-5">
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <Calendar className="w-3.5 h-3.5 text-gold" />
                          {enrollment.batch?.startDate
                            ? new Date(enrollment.batch.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
                            : 'TBD'}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <Clock className="w-3.5 h-3.5 text-gold" />
                          {enrollment.batch?.timing || 'To be announced'}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          {enrollment.mode === 'online'
                            ? <><Wifi className="w-3.5 h-3.5 text-green-400" /><span className="text-green-400">Online Class</span></>
                            : <><MapPin className="w-3.5 h-3.5 text-blue-400" /><span className="text-blue-400">Offline Class · Ahmedabad</span></>
                          }
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <User className="w-3.5 h-3.5 text-gold" />
                          Instructor: {enrollment.batch?.instructor || 'Tosif Ahmed Mansuri'}
                        </div>
                      </div>

                      {/* Payment status */}
                      <div className={`flex items-center justify-between p-3 rounded-xl border ${
                        enrollment.paymentStatus === 'paid'
                          ? 'bg-green-500/10 border-green-500/20'
                          : 'bg-orange-500/10 border-orange-500/20'
                      }`}>
                        <div className="flex items-center gap-2 text-sm">
                          <CreditCard className={`w-4 h-4 ${enrollment.paymentStatus === 'paid' ? 'text-green-400' : 'text-orange-400'}`} />
                          <span className={enrollment.paymentStatus === 'paid' ? 'text-green-400' : 'text-orange-400'}>
                            Payment {enrollment.paymentStatus === 'paid' ? 'Confirmed' : 'Pending'}
                          </span>
                        </div>
                        <span className="font-bold text-white">₹{enrollment.course?.fees?.toLocaleString()}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-heading text-xl font-bold text-white mb-6">My Profile</h2>
              <div className="glass rounded-2xl p-6 border border-white/10 max-w-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center text-navy text-2xl font-black shadow-gold">
                    {initials}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-lg">{user.name}</h3>
                    <p className="text-white/50 text-sm">{user.email}</p>
                    <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded-full">Student</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Phone', value: user.phone || 'Not provided' },
                    { label: 'City', value: user.city || 'Not provided' },
                    { label: 'Member Since', value: new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-2.5 border-b border-white/5 last:border-0">
                      <span className="text-white/40 text-sm">{label}</span>
                      <span className="text-white text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
