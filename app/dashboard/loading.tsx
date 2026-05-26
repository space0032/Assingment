export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent-cyan border-t-transparent" />
        <p className="font-mono text-sm text-slate-400">Loading dashboard...</p>
      </div>
    </div>
  )
}
