'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, Scissors, Sun, Moon, User, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Courses', href: '#courses' },
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Results', href: '#results' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Instructor', href: '#instructor' },
  { label: 'Feedback', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleDark = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('light')
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-navy/90 backdrop-blur-xl border-b border-white/10 shadow-navy py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold group-hover:shadow-gold-lg transition-all duration-300 group-hover:scale-110">
                <Scissors className="w-5 h-5 text-navy" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-heading font-bold text-lg leading-tight text-white">
                  New <span className="text-gold-gradient">Ideal</span>
                </div>
                <div className="text-[10px] text-white/50 tracking-widest uppercase leading-none">Since 1975</div>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium text-white/70 hover:text-gold transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-gold group-hover:w-full transition-all duration-300 rounded-full" />
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDark}
                className="hidden md:flex w-9 h-9 rounded-full glass items-center justify-center text-white/60 hover:text-gold transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-white hover:border-gold/40 transition-all"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-gold flex items-center justify-center text-navy text-xs font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:block font-medium">{user.name?.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 glass-dark rounded-2xl p-2 shadow-premium border border-white/10"
                      >
                        <Link
                          href={user.role === 'admin' ? '/admin' : '/dashboard'}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/80 hover:bg-white/10 hover:text-gold transition-all"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          {user.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
                        </Link>
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false) }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/80 hover:bg-red-500/10 hover:text-red-400 transition-all"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="hidden md:block btn-glass text-sm py-2.5 px-5">
                    Login
                  </Link>
                  <Link href="/signup" className="btn-gold text-sm py-2.5 px-5">
                    Enroll Now
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 glass rounded-xl flex items-center justify-center text-white"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-0 right-0 z-40 glass-dark border-b border-white/10 px-4 py-6"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-white/80 hover:text-gold hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.label}
                </motion.a>
              ))}
              {!user && (
                <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">
                  <Link href="/login" className="flex-1 btn-glass text-center text-sm py-2.5">Login</Link>
                  <Link href="/signup" className="flex-1 btn-gold text-center text-sm py-2.5">Enroll Now</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
