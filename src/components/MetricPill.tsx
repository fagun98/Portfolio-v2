import { cn } from '@/lib/utils'

interface MetricPillProps {
  value: string
  label: string
  prefix?: string
  suffix?: string
  highlight?: boolean
}

export default function MetricPill({ value, label, prefix, suffix, highlight }: MetricPillProps) {
  return (
    <div className={cn('metric-pill glass-panel rounded-2xl border border-border p-5', highlight && 'reveal-glow')}>
      <div className="font-heading text-3xl font-bold text-amber">
        {prefix}
        {value}
        {suffix}
      </div>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  )
}
