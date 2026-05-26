'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import type { CourseRow } from '@/types'
import { BentoCard } from '../ui/BentoCard'

interface Props { course: CourseRow; index: number }

function DynamicIcon({ name, size = 20, color }: { name: string; size?: number; color?: string }) {
  // @ts-expect-error – dynamic key into Lucide
  const Icon = (LucideIcons[name] as React.ElementType) ?? LucideIcons.BookOpen
  return <Icon size={size} color={color} />
}

const GRADIENTS = [
  { from: '#00e5ff22', to: '#7c3aed22', accent: '#00e5ff' },
  { from: '#0d948822', to: '#22c55e22', accent: '#0d9488' },
  { from: '#f59e0b22', to: '#f43f5e22', accent: '#f59e0b' },
  { from: '#7c3aed22', to: '#00e5ff22', accent: '#7c3aed' },
]

export function CourseCard({ course, index }: Props) {
  const { from, to, accent } = GRADIENTS[index % GRADIENTS.length]

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const motionProg = useMotionValue(0)
  const springProg = useSpring(motionProg, { stiffness: 60, damping: 18 })
  const displayValue = useTransform(springProg, v => `${Math.round(v)}%`)

  useEffect(() => {
    if (inView) motionProg.set(course.progress)
  }, [inView, course.progress, motionProg])

  return (
    <BentoCard ref={ref} className="relative overflow-hidden flex flex-col gap-4 p-5 min-h-[200px]">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: `radial-gradient(ellipse at top left, ${from}, transparent 60%),
                       radial-gradient(ellipse at bottom right, ${to}, transparent 60%)`,
        }}
      />

      <div
        className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${accent}22`, border: `1px solid ${accent}33` }}
      >
        <DynamicIcon name={course.icon_name} size={18} color={accent} />
      </div>

      <div className="relative z-10 flex-1">
        <h2 className="font-display font-semibold text-white text-sm leading-snug line-clamp-2">
          {course.title}
        </h2>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">Progress</span>
          <motion.span className="text-xs font-mono" style={{ color: accent }}>
            {displayValue}
          </motion.span>
        </div>

        <div className="h-1.5 rounded-full bg-bg-base overflow-hidden">
          {/* Fill – animates from 0 → progress.value */}
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${accent}99, ${accent})` }}
            initial={{ width: '0%' }}
            animate={inView ? { width: `${course.progress}%` } : { width: '0%' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </div>
      </div>
    </BentoCard>
  )
}
