'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ChevronDown, CheckCircle2 } from 'lucide-react'

const curriculumData = {
  mens: [
    {
      level: '01',
      tag: 'Beginner',
      title: 'Foundation Skills',
      color: 'from-blue-500/20 to-transparent border-blue-500/30',
      dot: 'bg-blue-500',
      topics: ['Understanding tailoring tools', 'Body measurement techniques', 'Fabric types and selection', 'Basic stitching methods', 'Needle and thread selection']
    },
    {
      level: '02',
      tag: 'Intermediate',
      title: 'Pattern Making',
      color: 'from-gold/15 to-transparent border-gold/30',
      dot: 'bg-gold',
      topics: ['Pant pattern drafting', 'Shirt pattern construction', 'Kurta pattern design', 'Pajama pattern creation', 'Dart and tuck techniques']
    },
    {
      level: '03',
      tag: 'Advanced',
      title: 'Professional Cutting',
      color: 'from-purple-500/20 to-transparent border-purple-500/30',
      dot: 'bg-purple-500',
      topics: ['Advanced cutting precision', 'Style variations and modifications', 'Fitting and alterations', 'Complex collar and cuff work', 'Custom order handling']
    },
    {
      level: '04',
      tag: 'Professional',
      title: 'Finishing & Career',
      color: 'from-green-500/20 to-transparent border-green-500/30',
      dot: 'bg-green-500',
      topics: ['Professional finishing standards', 'Quality control methods', 'Client measurement consultation', 'Business setup basics', 'Pricing and client handling']
    }
  ],
  womens: [
    {
      level: '01',
      tag: 'Beginner',
      title: 'Foundation Skills',
      color: 'from-pink-500/20 to-transparent border-pink-500/30',
      dot: 'bg-pink-500',
      topics: ['Women\'s measurement techniques', 'Fabric types for women\'s wear', 'Basic stitching and hemming', 'Understanding garment construction', 'Essential tailoring tools']
    },
    {
      level: '02',
      tag: 'Intermediate',
      title: 'Core Designs',
      color: 'from-gold/15 to-transparent border-gold/30',
      dot: 'bg-gold',
      topics: ['Salwar suit patterns', 'Kameez top construction', 'Basic neck and sleeve designs', 'Plazo and wide-leg construction', 'Elastic and drawstring waist']
    },
    {
      level: '03',
      tag: 'Advanced',
      title: 'Designer Patterns',
      color: 'from-orange-500/20 to-transparent border-orange-500/30',
      dot: 'bg-orange-500',
      topics: ['Anarkali frock construction', 'Designer necklines and embellishments', 'Complex sleeve variations', 'Layered skirt patterns', 'Embroidery placement planning']
    },
    {
      level: '04',
      tag: 'Professional',
      title: 'Fashion Finishing',
      color: 'from-teal-500/20 to-transparent border-teal-500/30',
      dot: 'bg-teal-500',
      topics: ['Professional finishing techniques', 'Boutique quality standards', 'Client consultation skills', 'Fashion trend adaptation', 'Home business setup']
    }
  ]
}

export default function Curriculum() {
  const [activeTab, setActiveTab] = useState<'mens' | 'womens'>('mens')
  const [openLevel, setOpenLevel] = useState<string | null>('01')

  return (
    <section id="curriculum" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-transparent to-navy/20 pointer-events-none" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="section-tag">
            <BookOpen className="w-3.5 h-3.5" /> Curriculum
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl font-black text-white mb-4">
            Structured{' '}
            <span className="text-gold-gradient">Learning Path</span>
          </h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto">
            From zero to professional in 4 progressive levels. Every skill builds on the last.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-12">
          <div className="glass p-1 rounded-2xl flex gap-1">
            {(['mens', 'womens'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setOpenLevel('01') }}
                className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-gold text-navy font-semibold shadow-gold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {tab === 'mens' ? "👔 Men's Course" : "👗 Women's Course"}
              </button>
            ))}
          </div>
        </div>

        {/* Curriculum levels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            {curriculumData[activeTab].map((level, i) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`bg-gradient-to-r ${level.color} border rounded-2xl overflow-hidden transition-all duration-300`}
              >
                {/* Level header */}
                <button
                  className="w-full flex items-center gap-4 p-5 text-left"
                  onClick={() => setOpenLevel(openLevel === level.level ? null : level.level)}
                >
                  <div className={`w-10 h-10 rounded-xl ${level.dot} bg-opacity-20 border border-current/20 flex items-center justify-center`}>
                    <span className="font-heading font-black text-sm text-white">{level.level}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-white/50 uppercase tracking-wider mb-0.5">{level.tag}</div>
                    <div className="font-heading font-bold text-white">{level.title}</div>
                  </div>
                  <div className={`w-6 h-6 rounded-lg glass flex items-center justify-center transition-transform duration-300 ${openLevel === level.level ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-white/60" />
                  </div>
                </button>

                {/* Level content */}
                <AnimatePresence>
                  {openLevel === level.level && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 grid sm:grid-cols-2 gap-2">
                        {level.topics.map((topic) => (
                          <div key={topic} className="flex items-start gap-2.5 text-sm text-white/70">
                            <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                            {topic}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
