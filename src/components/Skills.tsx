'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight, Braces, BrainCircuit, CloudCog, Database, Sparkles } from 'lucide-react'
import SectionShell from '@/components/SectionShell'
import SkillCluster from '@/components/SkillCluster'
import SkillSignal from '@/components/SkillSignal'
import { SECTION_LABELS } from '@/lib/data'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/hooks'
import { skillGroups } from '@/lib/skillsData'
import { cn } from '@/lib/utils'

const filters = [
  { id: 'all', label: 'All systems', icon: Sparkles },
  { id: 'ai', label: 'AI & ML', icon: BrainCircuit },
  { id: 'infra', label: 'Cloud & data', icon: CloudCog },
  { id: 'build', label: 'Build tools', icon: Braces },
] as const

const filterGroups: Record<(typeof filters)[number]['id'], string[]> = {
  all: skillGroups.map((group) => group.id),
  ai: ['ml-deep-learning', 'llm-ai-tools', 'frameworks-libraries'],
  infra: ['cloud-mlops', 'data-engineering', 'core-technologies'],
  build: ['languages', 'tools-platforms'],
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')
  const visibleGroups = skillGroups.filter((group) => filterGroups[filter].includes(group.id))

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-intro-reveal',
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            id: 'skills-intro',
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <SectionShell id="skills" label={SECTION_LABELS.skills} className="skills-section max-w-7xl overflow-visible py-28 lg:py-36">
      <div ref={sectionRef} aria-label="Technical skills" className="relative">
        <div className="skills-edge-signal skills-edge-signal-left" aria-hidden="true" />
        <div className="skills-edge-signal skills-edge-signal-right" aria-hidden="true" />

        <header className="skills-intro-reveal grid gap-6 border-b border-ink/10 pb-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase text-teal">/capability.atlas</p>
            <h2 className="font-heading mt-3 max-w-3xl text-3xl font-semibold leading-tight text-ink md:text-4xl lg:text-5xl">
              From model intelligence to production infrastructure.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-ink/65 lg:text-right">
            A practical systems stack for designing, shipping, and operating reliable AI products.
          </p>
        </header>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[21rem_minmax(0,1fr)] xl:gap-16">
          <aside className="skills-intro-reveal lg:sticky lg:top-24">
            <SkillSignal />
            <div className="mt-5 grid grid-cols-3 divide-x divide-ink/10 border-y border-ink/10 py-4 text-center">
              <div><strong className="font-heading block text-xl text-ink">8</strong><span className="text-[10px] uppercase text-ink/50">Domains</span></div>
              <div><strong className="font-heading block text-xl text-ink">60+</strong><span className="text-[10px] uppercase text-ink/50">Skills</span></div>
              <div><strong className="font-heading block text-xl text-teal">Live</strong><span className="text-[10px] uppercase text-ink/50">Systems</span></div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="skills-intro-reveal flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter skill categories">
              {filters.map((item) => {
                const Icon = item.icon
                const selected = filter === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setFilter(item.id)}
                    className={cn('skills-filter inline-flex min-h-10 shrink-0 items-center gap-2 border px-3.5 text-xs font-semibold transition-colors', selected ? 'border-ink bg-ink text-white' : 'border-ink/10 bg-white/70 text-ink/60 hover:border-ink/30 hover:text-ink')}
                  >
                    <Icon size={14} aria-hidden="true" />
                    {item.label}
                  </button>
                )
              })}
            </div>

            <div key={filter} className="skills-list mt-5 border-t border-ink/10" role="tabpanel">
              {visibleGroups.map((group, index) => <SkillCluster key={group.id} group={group} index={index} />)}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-5 font-mono text-[11px] font-semibold uppercase text-ink/45">
              <span className="inline-flex items-center gap-2"><Database size={13} aria-hidden="true" /> production tested</span>
              <span className="inline-flex items-center gap-1 text-teal">systems ready <ArrowUpRight size={13} aria-hidden="true" /></span>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
