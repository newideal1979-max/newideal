'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, MessageCircle, Send, Clock, Navigation } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', course: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1500))
    toast.success('Message sent! We\'ll contact you within 24 hours.')
    setForm({ name: '', email: '', phone: '', message: '', course: '' })
    setSubmitting(false)
  }

  const whatsappLink = `https://wa.me/919876543210?text=${encodeURIComponent("Hello! I'm interested in enrolling at New Ideal Stitching Institute. Please share details.")}`

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy/20 to-bg-dark/50 pointer-events-none" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">
            <Navigation className="w-3.5 h-3.5" /> Contact Us
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl font-black text-white mb-4">
            Get in{' '}
            <span className="text-gold-gradient">Touch</span>
          </h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto">
            Have questions? Want to visit? Ready to enroll? We're here for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Info cards */}
            {[
              {
                icon: MapPin,
                title: 'Visit Us',
                content: 'Relief Complex, near GPO, Salahpas Road, Ahmedabad, Gujarat',
                sub: 'Open Mon–Sat, 9 AM – 7 PM',
                color: 'text-gold',
                bg: 'bg-gold/10 border-gold/20',
              },
              {
                icon: Phone,
                title: 'Call Us',
                content: '+91 98765 43210',
                sub: 'Available 9 AM – 8 PM',
                color: 'text-green-400',
                bg: 'bg-green-500/10 border-green-500/20',
                href: 'tel:+919876543210',
              },
              {
                icon: Mail,
                title: 'Email Us',
                content: 'info@newideal.in',
                sub: 'Reply within 24 hours',
                color: 'text-blue-400',
                bg: 'bg-blue-500/10 border-blue-500/20',
                href: 'mailto:info@newideal.in',
              },
              {
                icon: Clock,
                title: 'Class Timings',
                content: 'Morning: 10 AM – 12 PM',
                sub: 'Evening: 2 PM – 4 PM',
                color: 'text-purple-400',
                bg: 'bg-purple-500/10 border-purple-500/20',
              },
            ].map(({ icon: Icon, title, content, sub, color, bg, href }) => (
              <a
                key={title}
                href={href || '#'}
                className={`flex items-start gap-4 glass rounded-2xl p-5 border hover:border-white/20 transition-all group ${href ? 'cursor-pointer' : ''}`}
              >
                <div className={`w-11 h-11 rounded-xl border ${bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-0.5">{title}</div>
                  <div className="font-semibold text-white text-sm">{content}</div>
                  <div className="text-xs text-white/40 mt-0.5">{sub}</div>
                </div>
              </a>
            ))}

            {/* WhatsApp CTA */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-2xl p-5 hover:bg-green-500/20 transition-all group font-semibold"
            >
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Chat on WhatsApp
              <span className="ml-auto text-xs text-green-400/60">Instant reply</span>
            </a>

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden border border-white/10 h-52">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.879!2d72.5714!3d23.0225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzIxLjAiTiA3MsKwMzQnMTcuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Right — Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-3xl p-8 border border-white/10">
              <h3 className="font-heading text-2xl font-bold text-white mb-2">Send an Inquiry</h3>
              <p className="text-white/50 text-sm mb-8">Fill out the form and we'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className="input-field"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="input-field"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="input-field"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">Course Interest</label>
                  <select
                    className="input-field bg-navy-light"
                    value={form.course}
                    onChange={e => setForm({ ...form, course: e.target.value })}
                  >
                    <option value="">Select a course</option>
                    <option value="mens">Men's Professional Tailoring</option>
                    <option value="womens">Women's Designer Tailoring</option>
                    <option value="both">Both Courses</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-white/50 uppercase tracking-wider mb-1.5 block">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about yourself and what you'd like to learn..."
                    className="input-field resize-none"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Inquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
