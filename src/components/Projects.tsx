'use client'

import { Code2, ExternalLink } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import SectionShell from '@/components/SectionShell'
import TechChip from '@/components/TechChip'
import { MARGIN_WIDGETS, PROJECTS, SECTION_LABELS, UI_COPY } from '@/lib/data'
import { gsap } from '@/lib/gsap'

function ProjectsMarginWidget() {
  return (
    <div className="margin-widget margin-widget-dark p-3">
      {MARGIN_WIDGETS.projects.map((line, index) => (
        <p key={line} className={index === 0 ? 'text-[var(--code-blue)]' : index === 3 ? 'text-[var(--code-green)]' : ''}>
          {index === 0 ? line : `-> ${line}`}
        </p>
      ))}
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.12,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            id: 'project-cards',
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <SectionShell id="projects" label={SECTION_LABELS.projects} marginWidget={<ProjectsMarginWidget />} marginSide="left">
      <div ref={sectionRef}>
        <h2 className="font-heading text-3xl font-semibold text-ink lg:text-5xl">{SECTION_LABELS.projects.split(' - ')[1]}</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROJECTS.map((project) => (
            <article
              key={project.name}
              className="project-card glass-panel flex flex-col gap-3 rounded-2xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber/40 hover:shadow-[var(--eased-shadow)]"
            >
              <div>
                <h3 className="font-heading text-lg font-semibold text-ink">{project.name}</h3>
                <p className="mt-1 text-sm font-medium text-muted">{project.subtitle}</p>
              </div>
              <p className="text-sm leading-6 text-ink/75">{project.description}</p>
              <div className="my-1 border-t border-border" />
              <ul className="space-y-2 text-sm text-ink/75">
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden="true" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-2 pt-3">
                {project.stack.map((stackItem) => (
                  <TechChip key={stackItem} label={stackItem} />
                ))}
              </div>
              {(project.links.github || project.links.live || project.links.product) && (
                <div className="mt-2 flex flex-wrap gap-4 border-t border-border pt-4 text-sm font-medium">
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-ink/70 transition-colors hover:text-amber">
                      <Code2 aria-hidden="true" size={16} />
                      {UI_COPY.sourceLink}
                    </a>
                  )}
                  {(project.links.live || project.links.product) && (
                    <a
                      href={project.links.live ?? project.links.product}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-ink/70 transition-colors hover:text-amber"
                    >
                      <ExternalLink aria-hidden="true" size={16} />
                      {project.links.product ? UI_COPY.productLink : UI_COPY.liveLink}
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
