'use client'
import { motion } from 'framer-motion'
import { Scissors, MapPin, Phone, Mail, MessageCircle, Instagram, Facebook, Youtube } from 'lucide-react'
import Link from 'next/link'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Courses', href: '#courses' },
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Student Results', href: '#results' },
  { label: 'Why New Ideal', href: '#why-us' },
  { label: 'Instructor', href: '#instructor' },
]

const courses = [
  { label: "Men's Course — ₹10,000", href: '/signup' },
  { label: "Women's Course — ₹10,000", href: '/signup' },
  { label: 'Online Classes', href: '/signup' },
  { label: 'Offline Classes', href: '#contact' },
  { label: 'Upcoming Batches', href: '#batches' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-bg-dark" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-gold opacity-30" />

      <div className="relative section-container pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
                <Scissors className="w-5 h-5 text-navy" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-heading font-bold text-lg text-white">New <span className="text-gold-gradient">Ideal</span></div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest">Since 1975</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              India's most trusted stitching & cutting institute. 50 years of crafting careers through professional tailoring education.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
                { icon: Youtube, href: '#', color: 'hover:text-red-400' },
                { icon: MessageCircle, href: 'https://wa.me/919876543210', color: 'hover:text-green-400' },
              ].map(({ icon: Icon, href, color }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 glass rounded-xl flex items-center justify-center text-white/50 ${color} hover:border-white/20 transition-all`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-gold text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">Courses</h4>
            <ul className="space-y-2.5">
              {courses.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-gold text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Relief Complex, near GPO, Salahpas Road, Ahmedabad, Gujarat</span>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-3 text-white/50 hover:text-gold text-sm transition-colors">
                  <Phone className="w-4 h-4 text-gold" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a href="mailto:info@newideal.in" className="flex items-center gap-3 text-white/50 hover:text-gold text-sm transition-colors">
                  <Mail className="w-4 h-4 text-gold" />
                  info@newideal.in
                </a>
              </li>
            </ul>

            <div className="mt-5 p-3 bg-gold/10 border border-gold/20 rounded-xl">
              <div className="text-xs text-gold font-semibold mb-0.5">Class Timings</div>
              <div className="text-xs text-white/60">Mon–Sat · 10AM–12PM & 2PM–4PM</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} New Ideal Stitching & Cutting Institute. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="text-white/20 text-xs">Est. 1975 · Ahmedabad, Gujarat</div>
            <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
            <div className="text-white/20 text-xs">Crafting Careers Since 1975</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
