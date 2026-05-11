'use client'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Clock, MapPin, Trophy } from 'lucide-react'

const stats = [
  { icon: Clock, value: 50, suffix: '+', label: 'Years of Excellence', sub: 'Established 1975', color: 'text-gold' },
  { icon: GraduationCap, value: 5000, suffix: '+', label: 'Students Trained', sub: 'Across India', color: 'text-blue-400' },
  { icon: Trophy, value: 98, suffix: '%', label: 'Success Rate', sub: 'Career Placement', color: 'text-green-400' },
  { icon: MapPin, value: 2, suffix: ' Modes', label: 'Learning Options', sub: 'Online & Offline', color: 'text-purple-400' },
]

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section className="py-16 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-navy/30 via-transparent to-navy/30" />
      <div className="section-container relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, suffix, label, sub, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="premium-card group text-center"
            >
              <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:border-gold/30 transition-all`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div className={`text-3xl lg:text-4xl font-heading font-black ${color} mb-1`}>
                {inView ? (
                  <CountUp end={value} duration={2.5} delay={i * 0.2} />
                ) : '0'}
                {suffix}
              </div>
              <div className="font-semibold text-white text-sm">{label}</div>
              <div className="text-white/40 text-xs mt-0.5">{sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
