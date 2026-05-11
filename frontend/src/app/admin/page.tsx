'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Scissors, Users, CreditCard, TrendingUp, BookOpen, Calendar, Settings,
  LogOut, BarChart3, MessageSquare, Bell, CheckCircle2, XCircle,
  Wifi, MapPin, Eye, Trash2, Plus, Edit3, Menu, X, Home
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import { useAuth } from '@/contexts/AuthContext'
import { adminAPI } from '@/lib/api'
import toast from 'react-hot-toast'

const NAV = [
  { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
  { id: 'students', icon: Users, label: 'Students' },
  { id: 'enrollments', icon: BookOpen, label: 'Enrollments' },
  { id: 'payments', icon: CreditCard, label: 'Payments' },
  { id: 'batches', icon: Calendar, label: 'Batches' },
  { id: 'testimonials', icon: MessageSquare, label: 'Testimonials' },
  { id: 'settings', icon: Settings, label: 'Settings' },
]

const CHART_COLORS = ['#D4AF37', '#3B82F6', '#10B981', '#8B5CF6']

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

interface DashboardStats {
  totalStudents: number
  totalEnrollments: number
  activeEnrollments: number
  totalRevenue: number
  monthlyRevenue: number
  yearlyRevenue: number
  pendingTestimonials: number
  onlineEnrollments: number
  offlineEnrollments: number
}

export default function AdminPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [dashData, setDashData] = useState<{
    stats: DashboardStats
    recentEnrollments: unknown[]
    recentPayments: unknown[]
    monthlyTrend: { _id: { year: number; month: number }; count: number }[]
  } | null>(null)
  const [students, setStudents] = useState<unknown[]>([])
  const [payments, setPayments] = useState<unknown[]>([])
  const [enrollments, setEnrollments] = useState<unknown[]>([])
  const [testimonials, setTestimonials] = useState<unknown[]>([])

  useEffect(() => {
    if (!user) { router.push('/login'); return }
    if (user.role !== 'admin') { router.push('/dashboard'); return }
    loadDashboard()
  }, [user])

  const loadDashboard = async () => {
    try {
      const { data } = await adminAPI.dashboard()
      setDashData(data)
    } catch { toast.error('Failed to load dashboard') }
    finally { setLoading(false) }
  }

  const loadTab = async (tab: string) => {
    setActiveTab(tab)
    setSidebarOpen(false)
    try {
      if (tab === 'students') {
        const { data } = await adminAPI.students()
        setStudents(data.students || [])
      } else if (tab === 'payments') {
        const { data } = await adminAPI.payments()
        setPayments(data.payments || [])
      } else if (tab === 'enrollments') {
        const { data } = await adminAPI.allEnrollments()
        setEnrollments(data.enrollments || [])
      } else if (tab === 'testimonials') {
        const { data } = await adminAPI.allTestimonials()
        setTestimonials(data.testimonials || [])
      }
    } catch { toast.error('Failed to load data') }
  }

  const approveTestimonial = async (id: string) => {
    try {
      await adminAPI.updateTestimonial(id, { isApproved: true })
      setTestimonials(t => (t as { _id: string }[]).map((x) => x._id === id ? { ...(x as Record<string, unknown>), isApproved: true } : x))
      toast.success('Testimonial approved!')
    } catch { toast.error('Failed to approve') }
  }

  const deleteTestimonial = async (id: string) => {
    try {
      await adminAPI.deleteTestimonial(id)
      setTestimonials(t => (t as { _id: string }[]).filter((x) => x._id !== id))
      toast.success('Deleted')
    } catch { toast.error('Failed to delete') }
  }

  if (!user) return null

  const trendChartData = dashData?.monthlyTrend?.map(m => ({
    name: monthNames[m._id.month - 1],
    enrollments: m.count,
  })) || []

  const modeData = dashData?.stats ? [
    { name: 'Online', value: dashData.stats.onlineEnrollments, color: '#10B981' },
    { name: 'Offline', value: dashData.stats.offlineEnrollments, color: '#D4AF37' },
  ] : []

  return (
    <div className="min-h-screen bg-bg-dark flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 glass-dark border-r border-white/10 flex flex-col transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center">
              <Scissors className="w-4 h-4 text-navy" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-white">New <span className="text-gold">Ideal</span></div>
              <div className="text-[9px] text-white/40 uppercase tracking-widest">Admin Panel</div>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/50"><X className="w-5 h-5" /></button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => loadTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? 'bg-gold/10 text-gold border border-gold/20'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {id === 'testimonials' && (dashData?.stats?.pendingTestimonials ?? 0) > 0 && (
                <span className="ml-auto text-xs bg-gold text-navy font-bold px-1.5 py-0.5 rounded-full">
                  {dashData?.stats?.pendingTestimonials}
                </span>
              )}
            </button>
          ))}
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all"
          >
            <Home className="w-4 h-4" />
            View Website
          </Link>
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 glass rounded-xl px-3 py-2.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-navy text-xs font-bold">A</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">{user.name}</div>
              <div className="text-[10px] text-gold">Administrator</div>
            </div>
          </div>
          <button
            onClick={() => { logout(); router.push('/') }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="lg:ml-64 flex-1 min-h-screen">
        {/* Top bar */}
        <header className="glass-dark border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/60 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-heading font-bold text-white capitalize">{activeTab}</h1>
              <p className="text-xs text-white/40">New Ideal Institute · Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-white/40 hidden sm:block">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
            <Bell className="w-5 h-5 text-white/40" />
          </div>
        </header>

        <div className="p-6 lg:p-8">
          {/* ─── DASHBOARD ─── */}
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: Users, label: 'Total Students', value: dashData?.stats?.totalStudents ?? 0, color: 'text-gold', bg: 'bg-gold/10 border-gold/20' },
                  { icon: BookOpen, label: 'Total Enrollments', value: dashData?.stats?.totalEnrollments ?? 0, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
                  { icon: TrendingUp, label: 'Monthly Revenue', value: `₹${((dashData?.stats?.monthlyRevenue ?? 0) / 1000).toFixed(0)}K`, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
                  { icon: CreditCard, label: 'Total Revenue', value: `₹${((dashData?.stats?.totalRevenue ?? 0) / 1000).toFixed(0)}K`, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
                ].map(({ icon: Icon, label, value, color, bg }) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-2xl p-5"
                  >
                    <div className={`w-10 h-10 rounded-xl border ${bg} flex items-center justify-center mb-3`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <div className={`text-2xl font-heading font-black ${color}`}>{loading ? '...' : value}</div>
                    <div className="text-xs text-white/50 mt-0.5">{label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                {/* Enrollment Trend */}
                <div className="lg:col-span-2 glass rounded-2xl p-6 border border-white/10">
                  <h3 className="font-heading font-bold text-white mb-4">Enrollment Trend (6 Months)</h3>
                  {trendChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={trendChartData}>
                        <defs>
                          <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{ background: '#1E293B', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 12, fontSize: 12 }}
                          labelStyle={{ color: '#F8FAFC' }}
                        />
                        <Area type="monotone" dataKey="enrollments" stroke="#D4AF37" strokeWidth={2} fill="url(#goldGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[200px] flex items-center justify-center text-white/30 text-sm">No data yet</div>
                  )}
                </div>

                {/* Mode Distribution */}
                <div className="glass rounded-2xl p-6 border border-white/10">
                  <h3 className="font-heading font-bold text-white mb-4">Enrollment Mode</h3>
                  {modeData.some(d => d.value > 0) ? (
                    <>
                      <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                          <Pie data={modeData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={4}>
                            {modeData.map((entry, i) => (
                              <Cell key={i} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ background: '#1E293B', borderRadius: 8, fontSize: 12 }} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex justify-center gap-4 mt-2">
                        {modeData.map(d => (
                          <div key={d.name} className="flex items-center gap-1.5 text-xs text-white/60">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                            {d.name} ({d.value})
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="h-[150px] flex items-center justify-center text-white/30 text-sm">No data</div>
                  )}
                </div>
              </div>

              {/* Recent activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent enrollments */}
                <div className="glass rounded-2xl p-6 border border-white/10">
                  <h3 className="font-heading font-bold text-white mb-4">Recent Enrollments</h3>
                  {(dashData?.recentEnrollments as { _id: string; student: { name: string; email: string }; course: { title: string; type: string }; mode: string; createdAt: string }[] | undefined)?.length ? (
                    <div className="space-y-3">
                      {(dashData!.recentEnrollments as { _id: string; student: { name: string; email: string }; course: { title: string; type: string }; mode: string; createdAt: string }[]).map((e) => (
                        <div key={e._id} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
                          <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-navy text-xs font-bold flex-shrink-0">
                            {e.student?.name?.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white truncate">{e.student?.name}</div>
                            <div className="text-xs text-white/40 truncate">{e.course?.title}</div>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-white/40 flex-shrink-0">
                            {e.mode === 'online' ? <Wifi className="w-3 h-3 text-green-400" /> : <MapPin className="w-3 h-3 text-blue-400" />}
                            {new Date(e.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-white/30 text-sm py-6">No enrollments yet</div>
                  )}
                </div>

                {/* Recent payments */}
                <div className="glass rounded-2xl p-6 border border-white/10">
                  <h3 className="font-heading font-bold text-white mb-4">Recent Payments</h3>
                  {(dashData?.recentPayments as { _id: string; student: { name: string; email: string }; course: { title: string }; amount: number; status: string; paidAt: string }[] | undefined)?.length ? (
                    <div className="space-y-3">
                      {(dashData!.recentPayments as { _id: string; student: { name: string; email: string }; course: { title: string }; amount: number; status: string; paidAt: string }[]).map((p) => (
                        <div key={p._id} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                            <CreditCard className="w-4 h-4 text-green-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white truncate">{p.student?.name}</div>
                            <div className="text-xs text-white/40">{p.course?.title}</div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-sm font-bold text-green-400">₹{p.amount?.toLocaleString()}</div>
                            <div className="text-xs text-white/30">{p.paidAt ? new Date(p.paidAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '-'}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-white/30 text-sm py-6">No payments yet</div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── STUDENTS ─── */}
          {activeTab === 'students' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="glass rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                  <h3 className="font-heading font-bold text-white">All Students ({(students as unknown[]).length})</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        {['Student', 'Email', 'Phone', 'City', 'Joined'].map(h => (
                          <th key={h} className="px-5 py-3 text-left text-xs text-white/40 uppercase tracking-wider font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(students as { _id: string; name: string; email: string; phone?: string; city?: string; createdAt: string }[]).map((s) => (
                        <tr key={s._id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-navy text-xs font-bold">
                                {s.name?.charAt(0)}
                              </div>
                              <span className="text-sm text-white font-medium">{s.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-sm text-white/60">{s.email}</td>
                          <td className="px-5 py-4 text-sm text-white/60">{s.phone || '—'}</td>
                          <td className="px-5 py-4 text-sm text-white/60">{s.city || '—'}</td>
                          <td className="px-5 py-4 text-sm text-white/60">
                            {new Date(s.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                          </td>
                        </tr>
                      ))}
                      {students.length === 0 && (
                        <tr><td colSpan={5} className="px-5 py-10 text-center text-white/30 text-sm">No students yet</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── PAYMENTS ─── */}
          {activeTab === 'payments' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="glass rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-5 border-b border-white/10">
                  <h3 className="font-heading font-bold text-white">Payment Records ({(payments as unknown[]).length})</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        {['Student', 'Course', 'Amount', 'Mode', 'Status', 'Date'].map(h => (
                          <th key={h} className="px-5 py-3 text-left text-xs text-white/40 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(payments as { _id: string; student: { name: string; email: string }; course: { title: string }; amount: number; mode: string; status: string; paidAt: string; createdAt: string }[]).map((p) => (
                        <tr key={p._id} className="border-b border-white/5 hover:bg-white/3">
                          <td className="px-5 py-4 text-sm text-white font-medium">{p.student?.name}</td>
                          <td className="px-5 py-4 text-sm text-white/60">{p.course?.title}</td>
                          <td className="px-5 py-4 text-sm font-bold text-green-400">₹{p.amount?.toLocaleString()}</td>
                          <td className="px-5 py-4">
                            <span className={`text-xs px-2 py-1 rounded-full border ${
                              p.mode === 'online'
                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            }`}>{p.mode || '—'}</span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`text-xs px-2 py-1 rounded-full border ${
                              p.status === 'paid'
                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                            }`}>{p.status}</span>
                          </td>
                          <td className="px-5 py-4 text-xs text-white/40">
                            {p.paidAt ? new Date(p.paidAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' }) : '—'}
                          </td>
                        </tr>
                      ))}
                      {payments.length === 0 && (
                        <tr><td colSpan={6} className="px-5 py-10 text-center text-white/30 text-sm">No payments yet</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── TESTIMONIALS ─── */}
          {activeTab === 'testimonials' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-heading text-xl font-bold text-white mb-6">Manage Testimonials</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(testimonials as { _id: string; studentName: string; course: string; city: string; review: string; rating: number; isApproved: boolean; createdAt: string }[]).map((t) => (
                  <div key={t._id} className={`glass rounded-2xl p-5 border transition-all ${
                    t.isApproved ? 'border-green-500/20' : 'border-orange-500/20'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-white text-sm">{t.studentName}</div>
                        <div className="text-xs text-white/40">{t.course} · {t.city}</div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full border ${
                        t.isApproved
                          ? 'bg-green-500/10 text-green-400 border-green-500/20'
                          : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                      }`}>
                        {t.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm line-clamp-3 mb-4">"{t.review}"</p>
                    <div className="flex gap-2">
                      {!t.isApproved && (
                        <button
                          onClick={() => approveTestimonial(t._id)}
                          className="flex-1 flex items-center justify-center gap-1.5 text-xs bg-green-500/10 text-green-400 border border-green-500/20 rounded-xl py-2 hover:bg-green-500/20 transition-all"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                        </button>
                      )}
                      <button
                        onClick={() => deleteTestimonial(t._id)}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl py-2 hover:bg-red-500/20 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
                {testimonials.length === 0 && (
                  <div className="col-span-3 text-center text-white/30 text-sm py-10 glass rounded-2xl">No testimonials yet</div>
                )}
              </div>
            </motion.div>
          )}

          {/* ─── SETTINGS ─── */}
          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-heading text-xl font-bold text-white mb-6">Settings</h2>
              <div className="max-w-lg space-y-4">
                {[
                  { key: 'mens_fees', label: "Men's Course Fees (₹)", type: 'number', defaultVal: '10000' },
                  { key: 'womens_fees', label: "Women's Course Fees (₹)", type: 'number', defaultVal: '10000' },
                  { key: 'institute_phone', label: 'Institute Phone', type: 'tel', defaultVal: '+91 98765 43210' },
                  { key: 'institute_email', label: 'Institute Email', type: 'email', defaultVal: 'info@newideal.in' },
                  { key: 'institute_whatsapp', label: 'WhatsApp Number', type: 'tel', defaultVal: '+91 98765 43210' },
                ].map(({ key, label, type, defaultVal }) => (
                  <div key={key} className="glass rounded-2xl p-5 border border-white/10">
                    <label className="text-xs text-white/50 uppercase tracking-wider mb-2 block">{label}</label>
                    <div className="flex gap-3">
                      <input
                        type={type}
                        defaultValue={defaultVal}
                        className="input-field flex-1"
                        id={`setting-${key}`}
                      />
                      <button
                        onClick={async () => {
                          const el = document.getElementById(`setting-${key}`) as HTMLInputElement
                          if (!el) return
                          try {
                            await adminAPI.updateSetting({ key, value: el.value, category: 'content' })
                            toast.success(`${label} updated!`)
                          } catch { toast.error('Failed to update') }
                        }}
                        className="btn-gold py-2.5 px-4 text-sm"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── ENROLLMENTS ─── */}
          {activeTab === 'enrollments' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="glass rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-5 border-b border-white/10">
                  <h3 className="font-heading font-bold text-white">All Enrollments ({(enrollments as unknown[]).length})</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        {['Student', 'Course', 'Batch', 'Mode', 'Status', 'Payment', 'Date'].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(enrollments as { _id: string; student: { name: string; email: string }; course: { title: string; type: string }; batch: { batchName: string }; mode: string; status: string; paymentStatus: string; createdAt: string }[]).map((e) => (
                        <tr key={e._id} className="border-b border-white/5 hover:bg-white/3">
                          <td className="px-4 py-4 text-sm text-white font-medium">{e.student?.name}</td>
                          <td className="px-4 py-4 text-xs text-white/60 max-w-[100px] truncate">{e.course?.title}</td>
                          <td className="px-4 py-4 text-xs text-white/60">{e.batch?.batchName}</td>
                          <td className="px-4 py-4">
                            <span className={`text-xs px-2 py-1 rounded-full border ${
                              e.mode === 'online'
                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            }`}>{e.mode}</span>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              e.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                            }`}>{e.status}</span>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              e.paymentStatus === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                            }`}>{e.paymentStatus}</span>
                          </td>
                          <td className="px-4 py-4 text-xs text-white/40">
                            {new Date(e.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </td>
                        </tr>
                      ))}
                      {enrollments.length === 0 && (
                        <tr><td colSpan={7} className="px-5 py-10 text-center text-white/30 text-sm">No enrollments yet</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── BATCHES ─── */}
          {activeTab === 'batches' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold text-white">Batch Management</h2>
                <button className="btn-gold text-sm py-2.5 px-5 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> New Batch
                </button>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/10">
                <p className="text-white/50 text-sm">Use the seed script to create initial batches. Full batch CRUD via the API is available. Connect a batch creation form here to add new batches dynamically.</p>
                <div className="mt-4 p-3 bg-gold/10 border border-gold/20 rounded-xl">
                  <code className="text-xs text-gold">POST /api/batches · PATCH /api/batches/:id · DELETE /api/batches/:id</code>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
