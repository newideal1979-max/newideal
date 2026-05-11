'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react'

const testimonials = [
  { name: 'Priya Sharma', course: "Women's Course", city: 'Ahmedabad', rating: 5, review: 'Excellent teaching! I started with zero knowledge and now I stitch designer suits for clients. Tosif sir explains everything so patiently. This institute changed my life completely. I now earn from home.' },
  { name: 'Mohammed Rafiq', course: "Men's Course", city: 'Ahmedabad', rating: 5, review: 'Best stitching institute in Ahmedabad. Professional training, hands-on practice from Day 1. I opened my own tailoring shop within 4 months of completing the course. Cannot recommend enough.' },
  { name: 'Fatima Begum', course: "Women's Course", city: 'Surat', rating: 5, review: 'Online classes were very convenient. I learned from home and now I take custom orders. The live sessions were interactive and the instructor was very supportive. Very grateful for this opportunity!' },
  { name: 'Raju Patel', course: "Men's Course", city: 'Vadodara', rating: 5, review: 'The curriculum is very practical. From day one we were cutting actual fabric. No theory overload — pure skills. In 3 months I learned more than I could have imagined.' },
  { name: 'Sunita Devi', course: "Women's Course", city: 'Rajkot', rating: 5, review: 'My daughter and I both joined together. Within 2 months we were stitching Anarkali suits. The instructor\'s patience and expertise is unmatched. Highly recommended for anyone wanting to learn stitching!' },
  { name: 'Arif Khan', course: "Men's Course", city: 'Ahmedabad', rating: 5, review: '50 years of legacy is visible in the quality of teaching. This institute is a real gem for people who want a career in tailoring. The fees are very reasonable for what you get.' },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const go = (dir: number) => {
    setDirection(dir)
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/20 to-transparent" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">
            <MessageSquare className="w-3.5 h-3.5" /> Testimonials
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl font-black text-white mb-4">
            What Our{' '}
            <span className="text-gold-gradient">Students Say</span>
          </h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto">
            Over 500 reviews. Every story is unique. Every transformation is real.
          </p>
        </motion.div>

        {/* Main testimonial slider */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.4 }}
                className="glass border border-white/10 rounded-3xl p-8 lg:p-10"
              >
                <Quote className="w-10 h-10 text-gold/30 mb-4" />

                <p className="text-white/80 text-lg leading-relaxed mb-8 italic">
                  "{testimonials[current].review}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center font-bold text-navy text-lg">
                      {testimonials[current].name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonials[current].name}</div>
                      <div className="text-sm text-white/50">{testimonials[current].course} · {testimonials[current].city}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-gold' : 'w-1.5 bg-white/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/30 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mini testimonial grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 text-gold fill-gold" />)}
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">"{t.review}"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-navy text-xs font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">{t.name}</div>
                  <div className="text-[11px] text-white/40">{t.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
