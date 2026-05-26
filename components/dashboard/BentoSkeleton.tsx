export function BentoSkeleton() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-auto"
      aria-label="Loading dashboard…"
      aria-busy="true"
    >
      {/* Hero skeleton */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 h-[220px] rounded-2xl skeleton border border-bg-border" />

      {/* Activity skeleton */}
      <div className="col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2 h-[220px] rounded-2xl skeleton border border-bg-border" />

      {/* Four course skeletons */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="col-span-1 h-[200px] rounded-2xl skeleton border border-bg-border" />
      ))}
    </div>
  )
}
