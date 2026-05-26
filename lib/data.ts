import type { CourseRow, ActivityPoint } from '@/types'
import { createServerClient } from './supabase'

const MOCK_COURSES: CourseRow[] = [
  { id: '1', title: 'React',  progress: 75, icon_name: 'Layers',      created_at: '' },
  { id: '2', title: 'Next.js ', progress: 42, icon_name: 'Zap',     created_at: '' },
  { id: '3', title: 'TypeScript ',        progress: 88, icon_name: 'Code2',      created_at: '' },
  { id: '4', title: 'System Design Fundamentals',progress: 31, icon_name: 'Network',    created_at: '' },
]

export async function getCourses(): Promise<{ data: CourseRow[]; error: string | null }> {
  const supabase = createServerClient()

  if (!supabase) {
    console.warn('[Supabase] Missing credentials, using mock data.')
    return { data: MOCK_COURSES, error: 'Missing Supabase credentials' }
  }

  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('[Supabase] getCourses error:', error.message)
    return { data: MOCK_COURSES, error: error.message }
  }

  return { data: data ?? [], error: null }
}

export function generateActivityData(): ActivityPoint[] {
  const points: ActivityPoint[] = []
  const now = new Date()
  for (let i = 119; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    points.push({
      date:  d.toISOString().split('T')[0],
      count: Math.floor(((Math.sin(i * 2.3 + 1) + 1) / 2) * 5),
    })
  }
  return points
}
