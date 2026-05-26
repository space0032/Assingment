'use client'

import { motion } from 'framer-motion'
import { Flame, CalendarDays } from 'lucide-react'
import { BentoCard } from '../ui/BentoCard'

const STREAK = 14

export function HeroTile() {
  return (
    <BentoCard className="relative overflow-hidden min-h-[180px] flex flex-col justify-between p-6">
      {}
      <div
        aria-hidden
        className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-accent-cyan/10 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-accent-violet/10 blur-3xl pointer-events-none"
      />

      <div className="relative z-10">
        <p className="text-xs font-mono text-accent-cyan/70 tracking-widest uppercase mb-1">
          Good morning ⚡
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
          Welcome back,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-violet">
            Alex.
          </span>
        </h1>
        <p className="text-slate-400 text-sm mt-2 font-body">
          You have <span className="text-white font-semibold">3 lessons</span> due today.
        </p>
      </div>

      {}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1,   opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
        className="relative z-10 flex items-center gap-3 mt-4 self-start"
      >
        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 rounded-xl px-4 py-2.5">
          <Flame size={20} className="text-amber-400" />
          <div>
            <p className="text-amber-400 font-display font-bold text-xl leading-none">{STREAK}</p>
            <p className="text-amber-400/60 text-[10px] font-mono leading-none mt-0.5">DAY STREAK</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-bg-elevated border border-bg-border rounded-xl px-4 py-2.5">
          <CalendarDays size={18} className="text-slate-400" />
          <div>
            <p className="text-white font-display font-bold text-xl leading-none">48</p>
            <p className="text-slate-500 text-[10px] font-mono leading-none mt-0.5">TOTAL DAYS</p>
          </div>
        </div>
      </motion.div>
    </BentoCard>
  )
}
