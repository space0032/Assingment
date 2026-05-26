import { Sidebar } from '@/components/layout/Sidebar'
import { MobileNav } from '@/components/layout/MobileNav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      {}
      <Sidebar />

      {}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
        {children}
      </main>

      {}
      <MobileNav />
    </div>
  )
}
