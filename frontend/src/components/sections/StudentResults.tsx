'use client'
import { motion } from 'framer-motion'
import { GraduationCap, TrendingUp, Award } from 'lucide-react'

const results = [
  { name: 'Priya S.', type: "Women's", before: 'Housewife with no skill', after: 'Running boutique with 50+ clients', city: 'Ahmedabad' },
  { name: 'Mohammed R.', type: "Men's", before: 'Unemployed graduate', after: 'Own tailoring shop, 3 employees', city: 'Ahmedabad' },
  { name: 'Sunita D.', type: "Women's", before: 'Wanted extra income', after: 'Home-based designer studio', city: 'Rajkot' },
  { name: 'Arif K.', type: "Men's", before: 'Working in factory', after: 'Master tailor at fashion brand', city: 'Surat' },
  { name: 'Fatima B.', type: "Women's", before: 'Learned online from home', after: 'Teaching stitching locally', city: 'Vadodara' },
  { name: 'Raju P.', type: "Men's", before: 'Zero tailoring knowledge', after: 'Full-time professional tailor', city: 'Ahmedabad' },
]

const workGallery = [
  { label: 'Bandhgala Suit', type: "Men's", emoji: '🧥' },
  { label: 'Anarkali Dress', type: "Women's", emoji: '👗' },
  { label: 'Formal Trousers', type: "Men's", emoji: '👖' },
  { label: 'Designer Salwar', type: "Women's", emoji: '👘' },
  { label: 'Classic Kurta', type: "Men's", emoji: '🥻' },
  { label: 'Plazo Set', type: "Women's", emoji: '👚' },
]

export default function StudentResults() {
  return (
    <section id="results" className="py-24 relative overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">
            <TrendingUp className="w-3.5 h-3.5" /> Student Results
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl font-black text-white mb-4">
            Real Students.{' '}
            <span className="text-gold-gradient">Real Transformations.</span>
          </h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto">
            Every career below started exactly where you are now — with a decision to learn.
          </p>
        </motion.div>

        {/* Transformation Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {results.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5 group hover:border-gold/20 transition-all hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center text-navy font-bold text-sm">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{r.name}</div>
                    <div className="text-xs text-white/40">{r.city}</div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border ${
                  r.type === "Men's"
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    : 'bg-pink-500/10 text-pink-400 border-pink-500/20'
                }`}>
                  {r.type}
                </span>
              </div>

              {/* Before / After */}
              <div className="space-y-3">
                <div className="flex gap-2 items-start">
                  <span className="text-xs px-2 py-0.5 rounded bg-red-500/10 text-red-400 flex-shrink-0 mt-0.5">Before</span>
                  <span className="text-sm text-white/55">{r.before}</span>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-400 flex-shrink-0 mt-0.5">After</span>
                  <span className="text-sm text-white font-medium">{r.after}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1 text-gold">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-xs">★</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Work Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="section-tag">
            <Award className="w-3.5 h-3.5" /> Student Work
          </span>
          <h3 className="font-heading text-3xl font-black text-white mb-2">
            What Our Students <span className="text-gold-gradient">Create</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {workGallery.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl p-5 text-center group hover:border-gold/30 transition-all hover:-translate-y-2 hover:shadow-gold cursor-pointer"
            >
              <div className="text-4xl mb-3">{item.emoji}</div>
              <div className="text-xs font-semibold text-white">{item.label}</div>
              <div className={`text-xs mt-1 ${item.type === "Men's" ? 'text-blue-400' : 'text-pink-400'}`}>
                {item.type}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-3 gap-4"
        >
          {[
            { value: '5000+', label: 'Students Trained', icon: GraduationCap },
            { value: '98%', label: 'Completion Rate', icon: TrendingUp },
            { value: '500+', label: 'Businesses Started', icon: Award },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center glass rounded-2xl py-6 px-4">
              <Icon className="w-6 h-6 text-gold mx-auto mb-2" />
              <div className="text-3xl font-heading font-black text-gold">{value}</div>
              <div className="text-white/50 text-sm mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
