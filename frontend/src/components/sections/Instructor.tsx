'use client'
import { motion } from 'framer-motion'
import { Quote, Award, Users, Clock, Star } from 'lucide-react'

const achievements = [
  { icon: Clock, value: '50+', label: 'Years Teaching' },
  { icon: Users, value: '5000+', label: 'Students Mentored' },
  { icon: Award, value: '100%', label: 'Dedication' },
  { icon: Star, value: '4.9/5', label: 'Avg. Rating' },
]

export default function Instructor() {
  return (
    <section id="instructor" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/30 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-1/3 h-[600px] bg-gold/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative rounded-3xl overflow-hidden glass border border-gold/20 p-8 shadow-gold-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />

              {/* Avatar placeholder */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 border-2 border-gold/40 flex items-center justify-center shadow-gold-lg">
                    <span className="text-6xl font-heading font-black text-gold">T</span>
                  </div>
                  {/* Online indicator */}
                  <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-green-500 border-2 border-bg-dark" />
                  {/* Glow ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-gold/20 animate-ping" style={{ animationDuration: '3s' }} />
                </div>

                <h3 className="font-heading text-2xl font-black text-white mb-1">Tosif Ahmed Mansuri</h3>
                <p className="text-gold font-medium text-sm mb-4">Master Tailor & Lead Instructor</p>
                <p className="text-white/55 text-sm">New Ideal Stitching & Cutting Institute</p>
                <p className="text-white/40 text-xs mt-1">Ahmedabad, Gujarat · Since 1975</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mt-6 w-full">
                  {achievements.map(({ icon: Icon, value, label }) => (
                    <div key={label} className="glass rounded-xl py-3 px-2 text-center">
                      <Icon className="w-4 h-4 text-gold mx-auto mb-1" />
                      <div className="text-lg font-heading font-bold text-gold">{value}</div>
                      <div className="text-[11px] text-white/50">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote floating card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -right-6 glass border border-gold/20 rounded-2xl p-4 shadow-gold max-w-[200px]"
            >
              <Quote className="w-4 h-4 text-gold mb-2" />
              <p className="text-xs text-white/70 italic leading-relaxed">
                "Every student who learns here carries 50 years of craft with them."
              </p>
            </motion.div>
          </motion.div>

          {/* Right — Bio & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="section-tag">
              <Award className="w-3.5 h-3.5" /> Your Instructor
            </span>

            <h2 className="font-heading text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Meet{' '}
              <span className="text-gold-gradient">Tosif Ahmed</span>
              <br />
              Mansuri
            </h2>

            <div className="space-y-5 text-white/65 text-lg leading-relaxed mb-8">
              <p>
                With over <span className="text-white font-semibold">50 years of tailoring experience</span>, Tosif Ahmed Mansuri is not just a teacher — he is a craftsman who has shaped the careers of thousands of individuals across Gujarat and beyond.
              </p>
              <p>
                His teaching philosophy is rooted in <span className="text-gold font-semibold">practice over theory</span>. He believes that the best way to learn tailoring is to cut real fabric, make real mistakes, and produce real garments — from the very first class.
              </p>
              <p>
                Under his guidance, students don't just learn stitching — they learn the <span className="text-white font-medium">language of fabric, the geometry of the human body, and the business of craftsmanship</span>.
              </p>
            </div>

            {/* Teaching philosophy points */}
            <div className="space-y-3 mb-8">
              {[
                'Hands-on from Day 1 — no passive learning',
                'Individual attention to every student',
                'Industry-standard techniques and quality',
                'Career guidance included in the program',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 text-white/70">
                  <div className="w-5 h-5 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gold text-xs">✓</span>
                  </div>
                  <span className="text-sm">{point}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-gold inline-flex items-center gap-2">
              Talk to Our Instructor
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
