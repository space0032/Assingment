'use client'

import { motion } from 'framer-motion'
import type { CourseRow, ActivityPoint } from '@/types'
import { HeroTile }     from './HeroTile'
import { CourseCard }   from './CourseCard'
import { ActivityTile } from './ActivityTile'
import { ErrorBanner }  from '../ui/ErrorBanner'

interface Props {
  courses:    CourseRow[]
  activity:   ActivityPoint[]
  fetchError: string | null
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren:   0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
}

export function BentoGrid({ courses, activity, fetchError }: Props) {
  return (
    <>
      {fetchError && <ErrorBanner message={fetchError} />}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-auto"
      >
        {/* ── Hero tile: spans 2 cols on lg+ ────────────────── */}
        <motion.div variants={item} className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
          <HeroTile />
        </motion.div>

        {/* ── Activity tile: spans 1 col on lg, 2 on xl ─────── */}
        <motion.div variants={item} className="col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2">
          <ActivityTile data={activity} />
        </motion.div>

        {/* ── Course tiles ──────────────────────────────────── */}
        {courses.map((course, index) => (
          <motion.div key={course.id} variants={item} className="col-span-1">
            <CourseCard course={course} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </>
  )
}
