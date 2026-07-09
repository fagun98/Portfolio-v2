interface TechChipProps {
  label: string
}

export default function TechChip({ label }: TechChipProps) {
  return <span className="inline-flex rounded-full border border-ink/10 bg-ink/5 px-2.5 py-1 text-xs font-medium text-ink/70">{label}</span>
}
