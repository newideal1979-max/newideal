'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles, Star, Award, Users } from 'lucide-react'
import Link from 'next/link'

const floatingElements = [
  { top: '15%', left: '8%', delay: 0, size: 'w-3 h-3' },
  { top: '25%', right: '12%', delay: 1.5, size: 'w-2 h-2' },
  { top: '60%', left: '5%', delay: 0.8, size: 'w-4 h-4' },
  { top: '70%', right: '8%', delay: 2, size: 'w-2 h-2' },
  { top: '40%', left: '15%', delay: 1.2, size: 'w-1.5 h-1.5' },
  { top: '80%', right: '20%', delay: 0.5, size: 'w-3 h-3' },
]

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-bg-dark" />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-bg-dark to-bg-dark" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[80px] pointer-events-none" />

      {/* SVG Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* Floating particles */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className={`absolute ${el.size} rounded-full bg-gold/30`}
          style={{ top: el.top, left: el.left, right: el.right }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4 + i, delay: el.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Decorative fabric thread lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,200 Q300,100 600,300 T1200,200" stroke="#D4AF37" strokeWidth="1" fill="none" className="opacity-50" />
        <path d="M0,400 Q400,250 800,450 T1400,350" stroke="#D4AF37" strokeWidth="0.5" fill="none" className="opacity-30" />
        <path d="M200,0 Q350,300 400,600 T450,1000" stroke="#D4AF37" strokeWidth="0.5" fill="none" className="opacity-20" />
      </svg>

      {/* Main Content */}
      <div className="relative z-10 section-container text-center pt-32 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 glass-gold text-gold text-sm font-medium px-5 py-2.5 rounded-full mb-8 border border-gold/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>India's Trusted Tailoring Institute</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-gold/70">Est. 1975</span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight mb-6">
            <span className="text-white">Transform</span>{' '}
            <span className="text-gold-gradient shimmer-text">Skill</span>
            <br />
            <span className="text-white">Into </span>
            <span className="relative inline-block">
              <span className="text-gold-gradient">Profession</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-gold rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              />
            </span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Learn professional stitching and cutting from{' '}
          <span className="text-gold font-semibold">Tosif Ahmed Mansuri</span> —
          50 years of crafting careers, one stitch at a time.
          Online & Offline batches available across India.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/signup" className="btn-gold group flex items-center gap-2 text-base">
            Start Learning Today
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#courses"
            className="btn-outline flex items-center gap-2 text-base"
          >
            <Play className="w-4 h-4" />
            Explore Courses
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-16"
        >
          {[
            { icon: Award, label: 'Since 1975', sub: '50+ Years Legacy' },
            { icon: Users, label: '5000+ Students', sub: 'Trained Nationwide' },
            { icon: Star, label: '4.9/5 Rating', sub: '500+ Reviews' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 glass px-5 py-3 rounded-2xl">
              <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Icon className="w-4 h-4 text-gold" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-white">{label}</div>
                <div className="text-xs text-white/50">{sub}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Hero Visual — Fabric-style card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden glass border border-white/10 shadow-premium p-1">
            <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-light overflow-hidden aspect-video flex items-center justify-center relative">
              {/* Decorative content inside the hero visual */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy/60 to-transparent" />
              <div className="grid grid-cols-3 gap-4 p-8 w-full">
                {[
                  { label: "Men's Course", fees: '₹10,000', skills: 3, color: 'from-blue-900/40 to-navy' },
                  { label: 'Master Class', fees: 'Live Demo', skills: 0, color: 'from-gold/20 to-navy', isCenter: true },
                  { label: "Women's Course", fees: '₹10,000', skills: 3, color: 'from-purple-900/40 to-navy' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.2 }}
                    className={`bg-gradient-to-br ${item.color} rounded-2xl p-4 border border-white/10 ${item.isCenter ? 'scale-105 border-gold/30' : ''}`}
                  >
                    {item.isCenter ? (
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-3">
                          <Sparkles className="w-6 h-6 text-navy" />
                        </div>
                        <div className="text-gold font-heading font-bold text-sm">Live Class</div>
                        <div className="text-white/60 text-xs mt-1">Online & Offline</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-xs text-white/50 uppercase tracking-wider mb-2">{item.label}</div>
                        <div className="text-xl font-heading font-bold text-gold">{item.fees}</div>
                        <div className="flex gap-1 mt-2">
                          {[...Array(3)].map((_, j) => (
                            <div key={j} className="h-1 flex-1 rounded-full bg-gold/40" />
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating notification cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 -left-6 glass border border-gold/20 px-4 py-3 rounded-2xl shadow-gold hidden md:block"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-white">New Enrollment</div>
                <div className="text-[10px] text-white/50">Priya joined Women's Course</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-6 -right-6 glass border border-gold/20 px-4 py-3 rounded-2xl shadow-gold hidden md:block"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <Star className="w-4 h-4 text-gold fill-gold" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">5★ Review</div>
                <div className="text-[10px] text-white/50">"Best institute in Gujarat!"</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/30 uppercase tracking-widest">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
