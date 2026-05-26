import { Suspense } from 'react'
import { getCourses, generateActivityData } from '@/lib/data'
import { BentoGrid } from '@/components/dashboard/BentoGrid'
import { BentoSkeleton } from '@/components/dashboard/BentoSkeleton'

// Ensure we don't cache this page so data updates in Supabase are reflected on reload
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function DashboardContent() {
  const { data: courses, error } = await getCourses()
  const activity = generateActivityData()

  return (
    <BentoGrid
      courses={courses}
      activity={activity}
      fetchError={error}
    />
  )
}

export default function DashboardPage() {
  return (
    <section className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <Suspense fallback={<BentoSkeleton />}>
        <DashboardContent />
      </Suspense>
    </section>
  )
}
