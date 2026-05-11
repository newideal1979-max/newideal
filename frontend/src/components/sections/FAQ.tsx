'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What are the eligibility requirements to join?',
    a: 'There are no eligibility requirements! Anyone — male or female, any age, any educational background — can join. You just need a willingness to learn. No prior stitching experience needed.'
  },
  {
    q: 'What is the duration of the course?',
    a: 'Both the Men\'s and Women\'s courses are 3 months long. Classes run 3 days a week, so you can manage it alongside other responsibilities.'
  },
  {
    q: 'Is online learning as effective as offline classes?',
    a: 'Yes! Our online classes are live, interactive sessions — not pre-recorded videos. You can ask questions, get real-time feedback, and practice at home with materials you purchase locally.'
  },
  {
    q: 'What is the course fee and what does it include?',
    a: 'The course fee is ₹10,000 for a complete 3-month program. This covers all teaching sessions, course materials, and a completion certificate. No hidden charges.'
  },
  {
    q: 'Will I get a certificate after completing the course?',
    a: 'Yes, every student receives a professional completion certificate from New Ideal Stitching & Cutting Institute upon successfully completing the course.'
  },
  {
    q: 'Can I start a business after completing the course?',
    a: 'Absolutely! Many of our alumni have started their own tailoring shops, boutiques, or home-based businesses within months of completing the course. We provide career guidance as part of the program.'
  },
  {
    q: 'What is the batch timing?',
    a: 'We have two daily sessions: Morning (10:00 AM – 12:00 PM) and Evening (2:00 PM – 4:00 PM). Choose the one that suits your schedule. Both online and offline students follow the same timing.'
  },
  {
    q: 'How do I pay the course fee?',
    a: 'You can pay securely online through Razorpay (UPI, credit/debit card, net banking) when you enroll on our website. No cash required.'
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">
            <HelpCircle className="w-3.5 h-3.5" /> FAQ
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl font-black text-white mb-4">
            Frequently Asked{' '}
            <span className="text-gold-gradient">Questions</span>
          </h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto">
            Everything you need to know before enrolling.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`glass rounded-2xl border transition-all duration-300 ${
                openIndex === i ? 'border-gold/30' : 'border-white/5'
              }`}
            >
              <button
                className="w-full flex items-center gap-4 p-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                  openIndex === i ? 'bg-gold text-navy' : 'bg-white/5 text-white/50'
                }`}>
                  <span className="text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <span className={`font-semibold text-sm flex-1 transition-colors ${
                  openIndex === i ? 'text-gold' : 'text-white'
                }`}>
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-white/40 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180 text-gold' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-16 text-white/60 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
