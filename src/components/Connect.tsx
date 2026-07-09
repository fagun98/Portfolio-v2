'use client'

import { Mail } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { BrandGithubIcon, BrandLinkedInIcon } from '@/components/BrandIcons'
import MechanicalKey from '@/components/MechanicalKey'
import SectionShell from '@/components/SectionShell'
import { PERSONAL, SECTION_LABELS, UI_COPY } from '@/lib/data'
import { gsap } from '@/lib/gsap'

export default function Connect() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.from('.connect-key', {
        y: 32,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          id: 'connect-keys',
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.connect-email', {
        y: 18,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
          id: 'connect-email',
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <SectionShell id="connect" label={SECTION_LABELS.connect}>
      <div ref={sectionRef} className="text-center">
        <h2 className="font-heading text-4xl font-semibold text-ink lg:text-6xl">{UI_COPY.connectHeading}</h2>

        <div className="mt-12 flex flex-col items-center justify-center gap-10 sm:flex-row">
          <div className="connect-key flex flex-col items-center gap-4">
            <MechanicalKey
              icon={<BrandLinkedInIcon aria-hidden="true" size={38} />}
              label={UI_COPY.linkedIn}
              tooltip={UI_COPY.linkedIn}
              href={PERSONAL.linkedin}
              highlight
              size="xl"
              ariaLabel="Open LinkedIn"
            />
            <p className="text-[11px] text-muted">{UI_COPY.viewProfile}</p>
          </div>

          <div className="connect-key flex flex-col items-center gap-4">
            <MechanicalKey
              icon={<BrandGithubIcon aria-hidden="true" size={38} />}
              label={UI_COPY.github}
              tooltip={UI_COPY.github}
              href={PERSONAL.github}
              size="xl"
              ariaLabel="Open GitHub"
            />
            <p className="text-[11px] text-muted">{UI_COPY.seeCode}</p>
          </div>
        </div>

        <a
          href={`mailto:${PERSONAL.email}`}
          className="connect-email mx-auto mt-10 inline-flex items-center justify-center gap-2 text-sm font-medium text-ink/70 transition-colors hover:text-amber hover:underline"
        >
          <Mail aria-hidden="true" className="text-amber" size={16} />
          {PERSONAL.email}
        </a>
      </div>
    </SectionShell>
  )
}
