'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, BarChart2, Settings,
  Trophy, ChevronLeft, ChevronRight, Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types'

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard',  icon: 'LayoutDashboard', href: '/dashboard' },
  { id: 'courses',   label: 'My Courses', icon: 'BookOpen',        href: '/dashboard/courses' },
  { id: 'progress',  label: 'Progress',   icon: 'BarChart2',       href: '/dashboard/progress' },
  { id: 'achievements', label: 'Badges',  icon: 'Trophy',          href: '/dashboard/achievements' },
  { id: 'settings',  label: 'Settings',   icon: 'Settings',        href: '/dashboard/settings' },
]

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, BookOpen, BarChart2, Settings, Trophy,
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const check = () => setCollapsed(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <motion.nav
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative hidden md:flex flex-col shrink-0 h-screen border-r border-bg-border bg-bg-card sticky top-0 overflow-hidden"
      aria-label="Main navigation"
    >
      {}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-bg-border">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan/30 to-accent-violet/30 flex items-center justify-center shrink-0 border border-accent-cyan/20">
          <Zap size={16} className="text-accent-cyan" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              className="font-display font-bold text-sm tracking-wider text-white whitespace-nowrap"
            >
              LEARNDASHBOARD
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {}
      <ul className="flex flex-col gap-1 p-2 mt-2 flex-1" role="list">
        {NAV_ITEMS.map((item) => {
          const Icon   = ICON_MAP[item.icon]
          const active = pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <li key={item.id} className="relative">
              {active && (
                <motion.span
                  layoutId="nav-highlight"
                  className="absolute inset-0 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Link
                href={item.href}
                className={cn(
                  'relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 z-10',
                  active
                    ? 'text-accent-cyan'
                    : 'text-slate-400 hover:text-white'
                )}
              >
                <Icon size={18} className="shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.15 }}
                      className="whitespace-nowrap font-body"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          )
        })}
      </ul>

      {}
      <button
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="m-2 flex items-center justify-center h-9 rounded-lg border border-bg-border text-slate-500 hover:text-white hover:border-slate-500 transition-colors"
      >
        {collapsed
          ? <ChevronRight size={16} />
          : <ChevronLeft  size={16} />
        }
      </button>
    </motion.nav>
  )
}
