import { AlertTriangle } from 'lucide-react'

interface Props { message: string }


export function ErrorBanner({ message }: Props) {
  return (
    <aside
      role="alert"
      className="mb-4 flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-3 text-sm"
    >
      <AlertTriangle size={16} className="text-rose-400 mt-0.5 shrink-0" />
      <div>
        <p className="font-semibold text-rose-400">Database error – showing cached data</p>
        <p className="text-rose-400/60 text-xs mt-0.5 font-mono">{message}</p>
      </div>
    </aside>
  )
}
