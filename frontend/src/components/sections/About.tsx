'use client'
import { motion } from 'framer-motion'
import { Scissors, Heart, Target, BookOpen } from 'lucide-react'

const milestones = [
  { year: '1979', title: 'Foundation', desc: 'New Ideal opened its doors in the heart of Ahmedabad, Gujarat.' },
  { year: '1990', title: 'Growth', desc: 'Expanded curriculum to include advanced women\'s designer courses.' },
  { year: '2010', title: 'Scale', desc: 'Over 2,000 students trained. Alumni running successful tailoring businesses.' },
  { year: '2024', title: 'Digital Era', desc: 'Launched online classes to serve students across India.' },
]

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy/20 to-transparent pointer-events-none" />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Story */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-tag">
                <Heart className="w-3.5 h-3.5" /> Our Story
              </span>
              <h2 className="font-heading text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                Five Decades of{' '}
                <span className="text-gold-gradient">Crafting</span>{' '}
                Careers
              </h2>
              <div className="space-y-4 text-white/65 text-lg leading-relaxed">
                <p>
                  In 1979, <span className="text-white font-semibold">New Ideal Stitching and Cutting Institute</span> was born from a simple yet powerful belief — that skill is the greatest equalizer. From a small classroom in Ahmedabad, Gujarat, we began teaching tailoring to those who dreamed of independence through craft.
                </p>
                <p>
                  Today, under the expert guidance of <span className="text-gold font-semibold">Tosifahmed Mansuri</span>, the institute continues that legacy. Generations of men and women have walked through our doors with no prior experience and left with a profession, a business, and a future.
                </p>
                <p>
                  We are not just a stitching class. <span className="text-white font-medium">We are a career launchpad</span> — practical, professional, and proven over fifty years.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                {[
                  { icon: Target, label: 'Career-Oriented' },
                  { icon: BookOpen, label: 'Practical Training' },
                  { icon: Scissors, label: 'Expert Guidance' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 glass-gold px-4 py-2 rounded-full text-sm text-gold">
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Milestones */}
          <div className="relative">
            <div className="space-y-4">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-5 group"
                >
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center font-heading font-black text-gold text-xs group-hover:from-gold/30 transition-all">
                      {m.year}
                    </div>
                    {i < milestones.length - 1 && (
                      <div className="w-[1px] flex-1 mt-2 bg-gradient-to-b from-gold/30 to-transparent" />
                    )}
                  </div>
                  <div className="pb-6">
                    <div className="font-heading font-bold text-white mb-1 group-hover:text-gold transition-colors">{m.title}</div>
                    <div className="text-white/55 text-sm leading-relaxed">{m.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent border border-gold/20"
            >
              <div className="text-5xl font-heading font-black text-gold-gradient mb-2">45+</div>
              <div className="text-white font-semibold">Years of Unbroken Legacy</div>
              <div className="text-white/50 text-sm mt-1">Relief Complex, Ahmedabad, Gujarat</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
