'use client'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Wifi, MapPin, ArrowRight, Scissors, Star } from 'lucide-react'
import Link from 'next/link'

const courses = [
  {
    id: 'mens',
    badge: 'Most Popular',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    title: "Men's Professional Tailoring",
    subtitle: 'Master the complete art of men\'s stitching & cutting',
    fees: 10000,
    duration: '3 Months',
    icon: '👔',
    gradient: 'from-blue-900/20 to-navy',
    borderColor: 'border-blue-500/20',
    glowColor: 'hover:border-blue-400/40 hover:shadow-[0_8px_40px_rgba(59,130,246,0.15)]',
    skills: [
      'Pant Cutting & Stitching',
      'Shirt Pattern Making',
      'Kurta Construction',
      'Pajama Techniques',
      'Professional Measurements',
      'Fabric Selection',
      'Advanced Finishing',
      'Custom Fitting',
    ],
  },
  {
    id: 'womens',
    badge: 'Bestseller',
    badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    title: "Women's Designer Tailoring",
    subtitle: 'From basics to designer fashion — master women\'s tailoring',
    fees: 10000,
    duration: '3 Months',
    icon: '👗',
    gradient: 'from-purple-900/20 to-navy',
    borderColor: 'border-purple-500/20',
    glowColor: 'hover:border-purple-400/40 hover:shadow-[0_8px_40px_rgba(168,85,247,0.15)]',
    skills: [
      'Salwar Suit Stitching',
      'Anarkali Design',
      'Plazo & Wide Leg',
      'Top Construction',
      'Measurement Techniques',
      'Pattern Making',
      'Designer Finishing',
      'Fashion Stitching',
    ],
  },
]

export default function Courses() {
  return (
    <section id="courses" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/10 to-transparent" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">
            <Scissors className="w-3.5 h-3.5" /> Our Courses
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl font-black text-white mb-4">
            Choose Your{' '}
            <span className="text-gold-gradient">Learning Path</span>
          </h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto">
            Two carefully designed courses. One goal — to make you a professional tailor ready for the real world.
          </p>
        </motion.div>

        {/* Course Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative bg-gradient-to-br ${course.gradient} border ${course.borderColor} rounded-3xl p-8 transition-all duration-500 ${course.glowColor} group cursor-pointer`}
            >
              {/* Badge */}
              <div className={`inline-flex items-center gap-1.5 border px-3 py-1 rounded-full text-xs font-semibold mb-6 ${course.badgeColor}`}>
                <Star className="w-3 h-3 fill-current" />
                {course.badge}
              </div>

              {/* Icon + Title */}
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">{course.icon}</div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-white leading-tight mb-1">{course.title}</h3>
                  <p className="text-white/50 text-sm">{course.subtitle}</p>
                </div>
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-2 gap-2 mb-8">
                {course.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-sm text-white/65">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>

              {/* Meta info */}
              <div className="flex items-center gap-4 mb-8 pt-4 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-sm text-white/50">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-white/50">
                  <Wifi className="w-4 h-4" />
                  Online
                </div>
                <div className="flex items-center gap-1.5 text-sm text-white/50">
                  <MapPin className="w-4 h-4" />
                  Offline
                </div>
              </div>

              {/* Fees + CTA */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-heading font-black text-gold">
                    ₹{course.fees.toLocaleString()}
                  </div>
                  <div className="text-xs text-white/40">Complete Course Fee</div>
                </div>
                <Link
                  href="/signup"
                  className="btn-gold group/btn flex items-center gap-2 py-3 px-6"
                >
                  Enroll Now
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Glow corner effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none group-hover:bg-gold/10 transition-all" />
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/40 text-sm mt-10"
        >
          Both courses available online & offline · Flexible batch timings · Certificate provided on completion
        </motion.p>
      </div>
    </section>
  )
}
