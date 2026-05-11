'use client'
import { motion } from 'framer-motion'
import { Shield, Wifi, MapPin, BookOpen, TrendingUp, Users, Star, Clock } from 'lucide-react'

const features = [
  {
    icon: Clock,
    title: '50+ Years of Trust',
    desc: 'Since 1975, we\'ve been a landmark of quality tailoring education in Gujarat. Our legacy speaks louder than any certificate.',
    color: 'text-gold',
    bg: 'bg-gold/10 border-gold/20',
  },
  {
    icon: BookOpen,
    title: '100% Practical Training',
    desc: 'No theory overload. From Day 1, you\'re working with real fabric, real patterns, real tools. Learn by doing.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: Users,
    title: 'Expert Instructor',
    desc: 'Tosif Ahmed Mansuri brings decades of professional tailoring experience directly into every class.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: Wifi,
    title: 'Online + Offline Classes',
    desc: 'Join from anywhere in India via live online classes, or visit us personally in Ahmedabad for in-person training.',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
  },
  {
    icon: TrendingUp,
    title: 'Career-Ready Skills',
    desc: 'Graduate with skills that let you start a tailoring business, work with fashion brands, or freelance immediately.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
  },
  {
    icon: Shield,
    title: 'Affordable Premium Education',
    desc: 'Professional-grade training at just ₹10,000 — a fraction of the cost of fashion institutes. Maximum value, zero compromise.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
  },
  {
    icon: Star,
    title: 'Proven Track Record',
    desc: '5,000+ students trained. Hundreds running their own businesses. Our alumni success stories are our greatest testimonial.',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10 border-teal-500/20',
  },
  {
    icon: MapPin,
    title: 'Ahmedabad\'s Premier Institute',
    desc: 'Located at Relief Complex, near GPO, Salahpas Road — accessible, recognized, and trusted by the community.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/20',
  },
]

export default function WhyNewIdeal() {
  return (
    <section id="why-us" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">
            <Shield className="w-3.5 h-3.5" /> Why Choose Us
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl font-black text-white mb-4">
            Why <span className="text-gold-gradient">New Ideal</span>{' '}
            Stands Apart
          </h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto">
            Not just a class — a complete professional transformation. Here's what makes us different.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass rounded-2xl p-6 group hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
            >
              <div className={`w-12 h-12 rounded-2xl border ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="font-heading font-bold text-white mb-2 text-sm leading-tight">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy-light via-navy to-navy-light" />
          <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/10" />
          <div className="relative text-center py-12 px-6">
            <h3 className="font-heading text-2xl lg:text-3xl font-black text-white mb-3">
              Ready to Start Your{' '}
              <span className="text-gold-gradient">Professional Journey?</span>
            </h3>
            <p className="text-white/55 mb-8 max-w-lg mx-auto">
              Join thousands of students who transformed their lives through the art of tailoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/signup" className="btn-gold">Enroll Today — ₹10,000</a>
              <a href="#contact" className="btn-outline">Talk to Us First</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
