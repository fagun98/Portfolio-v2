'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SkillChip from '@/components/SkillChip'
import type { SkillGroup } from '@/lib/skillsData'
import { cn } from '@/lib/utils'

interface SkillClusterProps {
  group: SkillGroup
  index: number
}

const featuredCount: Record<string, number> = {
  languages: 3,
  'ml-deep-learning': 5,
  'llm-ai-tools': 6,
  'cloud-mlops': 6,
  'data-engineering': 5,
  'frameworks-libraries': 6,
  'tools-platforms': 4,
  'core-technologies': 5,
}

export default function SkillCluster({ group, index }: SkillClusterProps) {
  const [expanded, setExpanded] = useState(false)
  const cutoff = featuredCount[group.id] ?? 5
  const primary = group.skills.slice(0, cutoff)
  const supporting = group.skills.slice(cutoff)
  const contentId = `skill-details-${group.id}`

  return (
    <article className="skill-cluster-row group border-b border-ink/10 py-6" style={{ '--row-index': index } as React.CSSProperties}>
      <div className="grid gap-4 md:grid-cols-[12rem_minmax(0,1fr)_auto] md:items-start">
        <div>
          <span className="font-mono text-[10px] font-semibold text-ink/35">0{index + 1} / {group.namespace}</span>
          <h3 className="font-heading mt-1.5 text-base font-semibold leading-snug text-ink">{group.title}</h3>
        </div>

        <div className="flex min-w-0 flex-wrap gap-2">
          {primary.map((skill) => <SkillChip key={`${group.id}-${skill}`} label={skill} featured />)}
          {expanded && supporting.map((skill) => <SkillChip key={`${group.id}-${skill}`} label={skill} />)}
        </div>

        {supporting.length > 0 && (
          <button
            type="button"
            className="inline-flex h-8 items-center justify-center gap-1.5 self-start border border-ink/10 bg-white px-2.5 text-[11px] font-semibold text-ink/55 transition-colors hover:border-teal/50 hover:text-teal"
            aria-expanded={expanded}
            aria-controls={contentId}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? 'Less' : `+${supporting.length}`}
            <ChevronDown size={13} className={cn('transition-transform', expanded && 'rotate-180')} aria-hidden="true" />
          </button>
        )}
      </div>
      <span id={contentId} className="sr-only">{expanded ? supporting.join(', ') : 'Additional skills collapsed'}</span>
    </article>
  )
}
