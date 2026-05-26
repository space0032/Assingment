'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Props {
  children:  React.ReactNode
  className?: string
}


export const BentoCard = forwardRef<HTMLDivElement, Props>(
  ({ children, className }, ref) => {
    return (
      <motion.article
        ref={ref}
        whileHover={{ scale: 1.015, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
        whileTap={{ scale: 0.99 }}
        className={cn(
          'grain relative rounded-2xl border border-bg-border bg-bg-card',
          'transition-shadow duration-300',
          'hover:border-accent-cyan/25 hover:shadow-[0_0_0_1px_rgba(0,229,255,0.15),0_8px_32px_rgba(0,229,255,0.07)]',
          className
        )}
      >
        {children}
      </motion.article>
    )
  }
)

BentoCard.displayName = 'BentoCard'
