'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { LayoutDashboard, BookOpen, BarChart2, Trophy, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const ITEMS = [
  { id: 'dashboard',     href: '/dashboard',              icon: LayoutDashboard, label: 'Home'     },
  { id: 'courses',       href: '/dashboard/courses',      icon: BookOpen,        label: 'Courses'  },
  { id: 'progress',      href: '/dashboard/progress',     icon: BarChart2,       label: 'Progress' },
  { id: 'achievements',  href: '/dashboard/achievements', icon: Trophy,          label: 'Badges'   },
  { id: 'settings',      href: '/dashboard/settings',     icon: Settings,        label: 'Settings' },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-bg-border bg-bg-card/90 backdrop-blur-xl"
    >
      <ul className="flex justify-around px-2 py-2" role="list">
        {ITEMS.map(({ id, href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <li key={id}>
              <Link
                href={href}
                className={cn(
                  'relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-xs transition-colors',
                  active ? 'text-accent-cyan' : 'text-slate-500'
                )}
              >
                {active && (
                  <motion.span
                    layoutId="mobile-nav-highlight"
                    className="absolute inset-0 rounded-xl bg-accent-cyan/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={20} className="relative z-10" />
                <span className="relative z-10 font-body">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
