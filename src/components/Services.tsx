'use client'

import { BrainCircuit, Cloud, Search, ShieldCheck } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import SectionShell from '@/components/SectionShell'
import { MARGIN_WIDGETS, SECTION_LABELS, SERVICES } from '@/lib/data'
import { gsap } from '@/lib/gsap'

const iconMap = {
  BrainCircuit,
  Search,
  Cloud,
  ShieldCheck,
}

function ServicesMarginWidget() {
  return (
    <div className="margin-widget margin-widget-dark w-[170px] p-3">
      {MARGIN_WIDGETS.services.map((line) => (
        <p key={line} className="grid grid-cols-[10px_1fr_auto] items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--code-green)]" />
          <span>{line}</span>
          <span className="text-[var(--code-green)]">OK</span>
        </p>
      ))}
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          id: 'service-cards',
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <SectionShell id="services" label={SECTION_LABELS.services} marginWidget={<ServicesMarginWidget />} marginSide="right">
      <div ref={sectionRef}>
        <h2 className="font-heading text-3xl font-semibold text-ink lg:text-5xl">{SECTION_LABELS.services.split(' - ')[1]}</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon]
            return (
              <article
                key={service.title}
                className="service-card glass-panel rounded-2xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber/40 hover:shadow-[var(--eased-shadow)]"
              >
                <Icon aria-hidden="true" className="text-amber" size={24} />
                <h3 className="font-heading mt-3 text-lg font-semibold text-ink">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/75">{service.body}</p>
                <ul className="mt-5 space-y-2 text-sm text-muted">
                  {service.capabilities.map((capability) => (
                    <li key={capability} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden="true" />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}
