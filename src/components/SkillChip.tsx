import { cn } from '@/lib/utils'

interface SkillChipProps {
  label: string
  featured?: boolean
}

export default function SkillChip({ label, featured = false }: SkillChipProps) {
  return (
    <span className={cn('skill-chip inline-flex min-h-8 items-center border px-2.5 py-1 text-xs font-medium', featured ? 'border-teal/20 bg-teal/[0.07] text-ink' : 'border-ink/10 bg-white/70 text-ink/55')}>
      {label}
    </span>
  )
}
