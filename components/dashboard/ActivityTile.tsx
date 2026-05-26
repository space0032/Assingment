'use client'

import { motion } from 'framer-motion'
import type { ActivityPoint } from '@/types'
import { BentoCard } from '../ui/BentoCard'
import { Activity } from 'lucide-react'

interface Props { data: ActivityPoint[] }

const INTENSITY = [
  'bg-bg-base border-bg-border',
  'bg-accent-cyan/10 border-accent-cyan/15',
  'bg-accent-cyan/25 border-accent-cyan/30',
  'bg-accent-cyan/50 border-accent-cyan/55',
  'bg-accent-cyan/80 border-accent-cyan/85',
]

export function ActivityTile({ data }: Props) {
  const weeks: ActivityPoint[][] = []
  for (let w = 0; w < 17; w++) {
    weeks.push(data.slice(w * 7, w * 7 + 7))
  }

  const totalActive = data.filter(d => d.count > 0).length

  return (
    <BentoCard className="flex flex-col gap-4 p-5 min-h-[180px]">
      {}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-accent-cyan" />
          <h2 className="font-display font-semibold text-sm text-white">Learning Activity</h2>
        </div>
        <span className="text-xs font-mono text-slate-500">
          {totalActive} active days
        </span>
      </header>

      {}
      <div className="flex gap-[3px] overflow-hidden" aria-label="Activity heatmap">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((point, di) => (
              <motion.div
                key={point.date}
                title={`${point.date}: ${point.count} session${point.count !== 1 ? 's' : ''}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: (wi * 7 + di) * 0.004,
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                className={`w-3 h-3 rounded-sm border ${INTENSITY[Math.min(point.count, 4)]}`}
              />
            ))}
          </div>
        ))}
      </div>

      {}
      <footer className="flex items-center gap-1.5 mt-auto">
        <span className="text-[10px] text-slate-600 font-mono">Less</span>
        {INTENSITY.map((cls, i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-sm border ${cls}`} />
        ))}
        <span className="text-[10px] text-slate-600 font-mono">More</span>
      </footer>
    </BentoCard>
  )
}
