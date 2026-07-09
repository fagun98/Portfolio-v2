'use client'

import { useLayoutEffect, useRef } from 'react'
import MetricPill from '@/components/MetricPill'
import SectionShell from '@/components/SectionShell'
import { ABOUT_COPY, METRICS, SECTION_LABELS } from '@/lib/data'
import { gsap } from '@/lib/gsap'

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.from('.about-copy', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          id: 'about-copy',
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.metric-pill', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          id: 'about-metrics',
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <SectionShell id="about" label={SECTION_LABELS.about}>
      <div ref={sectionRef} className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <h2 className="font-heading text-3xl font-semibold text-ink lg:text-5xl">{SECTION_LABELS.about.split(' - ')[1]}</h2>
          <p className="about-copy mt-6 max-w-2xl text-lg leading-8 text-ink/80">{ABOUT_COPY}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {METRICS.map((metric) => (
            <MetricPill key={metric.label} value={metric.value} label={metric.label} highlight={metric.highlight} />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
