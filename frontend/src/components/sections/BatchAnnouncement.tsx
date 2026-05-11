'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, Wifi, MapPin, ArrowRight, Bell } from 'lucide-react'
import Link from 'next/link'

const staticBatches = [
  {
    id: '1',
    course: "Men's Professional Tailoring",
    batchName: "Men's Batch — June 2026",
    startDate: new Date('2026-06-15'),
    timing: '10:00 AM – 12:00 PM',
    days: ['Mon', 'Wed', 'Fri'],
    totalSeats: 20,
    seatsLeft: 12,
    mode: 'both',
    type: 'mens',
  },
  {
    id: '2',
    course: "Women's Designer Tailoring",
    batchName: "Women's Batch — June 2026",
    startDate: new Date('2026-06-16'),
    timing: '2:00 PM – 4:00 PM',
    days: ['Tue', 'Thu', 'Sat'],
    totalSeats: 20,
    seatsLeft: 8,
    mode: 'both',
    type: 'womens',
  },
]

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now()
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const t = setInterval(calc, 1000)
    return () => clearInterval(t)
  }, [targetDate])

  return (
    <div className="flex items-center gap-2">
      {Object.entries(timeLeft).map(([unit, val]) => (
        <div key={unit} className="text-center">
          <div className="glass rounded-xl px-3 py-2 min-w-[40px] text-center">
            <div className="text-lg font-heading font-black text-gold leading-none">{String(val).padStart(2, '0')}</div>
          </div>
          <div className="text-[9px] text-white/40 uppercase mt-1 tracking-wider">{unit.slice(0, 1)}</div>
        </div>
      ))}
    </div>
  )
}

export default function BatchAnnouncement() {
  return (
    <section id="batches" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy/30 to-transparent pointer-events-none" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">
            <Bell className="w-3.5 h-3.5 animate-[wiggle_1s_ease-in-out_infinite]" /> Upcoming Batches
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl font-black text-white mb-4">
            Next Batch{' '}
            <span className="text-gold-gradient">Starting Soon</span>
          </h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto">
            Limited seats available. Enroll now to secure your spot in the upcoming batch.
          </p>
        </motion.div>

        {/* Batch Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {staticBatches.map((batch, i) => {
            const seatsPercent = ((batch.totalSeats - batch.seatsLeft) / batch.totalSeats) * 100

            return (
              <motion.div
                key={batch.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative glass rounded-3xl p-7 border transition-all duration-300 hover:border-gold/30 hover:shadow-gold ${
                  batch.seatsLeft <= 5 ? 'border-orange-500/30' : 'border-white/10'
                }`}
              >
                {/* Urgent badge */}
                {batch.seatsLeft <= 5 && (
                  <div className="absolute -top-3 left-6 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Only {batch.seatsLeft} seats left!
                  </div>
                )}

                {/* Course name */}
                <div className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 border ${
                  batch.type === 'mens'
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    : 'bg-pink-500/10 text-pink-400 border-pink-500/20'
                }`}>
                  {batch.course}
                </div>

                <h3 className="font-heading font-bold text-white text-lg mb-6">{batch.batchName}</h3>

                {/* Countdown */}
                <div className="mb-6">
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Batch starts in</div>
                  <CountdownTimer targetDate={batch.startDate} />
                </div>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-white/65">
                    <Calendar className="w-4 h-4 text-gold" />
                    {batch.startDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/65">
                    <Clock className="w-4 h-4 text-gold" />
                    {batch.timing} · {batch.days.join(', ')}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/65">
                    <Wifi className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Online</span>
                    <span className="text-white/20">|</span>
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400">Offline</span>
                  </div>
                </div>

                {/* Seat availability bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-white/50 mb-2">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {batch.seatsLeft} seats remaining
                    </span>
                    <span>{batch.totalSeats - batch.seatsLeft}/{batch.totalSeats} filled</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${seatsPercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={`h-full rounded-full ${seatsPercent > 70 ? 'bg-orange-500' : 'bg-gradient-gold'}`}
                    />
                  </div>
                </div>

                <Link href="/signup" className="btn-gold w-full text-center flex items-center justify-center gap-2">
                  Book Your Seat
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
