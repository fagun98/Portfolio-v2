'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import SectionShell from '@/components/SectionShell'
import TechChip from '@/components/TechChip'
import { EXPERIENCE, MARGIN_WIDGETS, SECTION_LABELS, UI_COPY } from '@/lib/data'
import type { ExperienceItem } from '@/lib/data'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'

function RoleCard({ role }: { role: ExperienceItem }) {
  const [expanded, setExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!contentRef.current) {
      return
    }

    gsap.set(contentRef.current, { height: 0, overflow: 'hidden' })
  }, [])

  useLayoutEffect(() => {
    if (!contentRef.current) {
      return
    }

    gsap.to(contentRef.current, {
      height: expanded ? 'auto' : 0,
      duration: 0.4,
      ease: 'power2.inOut',
      overwrite: true,
    })
  }, [expanded])

  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setExpanded(true)
    }
  }

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setExpanded(false)
    }
  }

  return (
    <article
      className="timeline-card glass-panel rounded-2xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber/40 hover:shadow-[var(--eased-shadow)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="w-full text-left"
        aria-expanded={expanded}
        aria-label={expanded ? UI_COPY.collapseRole : UI_COPY.expandRole}
        onClick={() => setExpanded((value) => !value)}
      >
        <span className="block text-sm font-medium text-amber">{role.dates}</span>
        <span className="font-heading mt-2 block text-2xl font-semibold text-ink">{role.company}</span>
        <span className="mt-1 block text-base font-medium text-ink/80">{role.title}</span>
        <span className="mt-1 block text-sm text-muted">{role.location}</span>
        <span className="mt-4 line-clamp-2 block text-sm leading-6 text-ink/70">{role.summary}</span>
      </button>

      <div ref={contentRef}>
        <div className="pt-5">
          {role.subProjects.map((project) => (
            <p key={project} className="mb-3 inline-flex rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
              {project}
            </p>
          ))}
          <ul className="space-y-3 text-sm leading-6 text-ink/75">
            {role.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {role.techChips.map((chip) => (
              <TechChip key={chip} label={chip} />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function ExperienceMarginWidget() {
  return (
    <div className="margin-widget margin-widget-light w-[140px] p-4">
      <p className="text-[10px] uppercase text-muted">{MARGIN_WIDGETS.experience.label}</p>
      <p className="mt-1 font-heading text-lg font-bold text-ink">{MARGIN_WIDGETS.experience.value}</p>
      <p className="mt-1 text-[11px] font-semibold text-amber">up {MARGIN_WIDGETS.experience.delta}</p>
    </div>
  )
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.from('.timeline-card', {
        x: -20,
        opacity: 0,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          id: 'experience-cards',
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.timeline-node', {
        scale: 0,
        stagger: 0.15,
        delay: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          id: 'experience-nodes',
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <SectionShell id="experience" label={SECTION_LABELS.experience} marginWidget={<ExperienceMarginWidget />} marginSide="right">
      <div ref={sectionRef}>
        <h2 className="font-heading text-3xl font-semibold text-ink lg:text-5xl">{SECTION_LABELS.experience.split(' - ')[1]}</h2>
        <div className="relative mt-10 pl-8">
          <div className="absolute left-3 top-0 h-full w-px bg-border" aria-hidden="true" />
          <div className="space-y-8">
            {EXPERIENCE.map((role, index) => (
              <div key={role.company} className="relative">
                <span
                  className={cn('timeline-node absolute -left-[1.9rem] top-7 h-4 w-4 rounded-full border-4 border-white bg-amber shadow-[0_0_0_1px_var(--border)]', index === 0 && 'animate-pulse-slow')}
                  aria-hidden="true"
                />
                <RoleCard role={role} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
