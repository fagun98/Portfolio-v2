'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils'

interface SectionShellProps {
  id: string
  label: string
  children: React.ReactNode
  className?: string
  marginWidget?: React.ReactNode
  marginSide?: 'left' | 'right'
}

export default function SectionShell({ id, label, children, className, marginWidget, marginSide = 'right' }: SectionShellProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const marginRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [mountMarginWidget, setMountMarginWidget] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.dispatchEvent(new CustomEvent('section-in-view', { detail: { id } }))
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [id])

  useEffect(() => {
    if (!marginWidget) {
      return
    }

    const mediaQuery = window.matchMedia('(min-width: 1536px)')
    const update = () => setMountMarginWidget(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [marginWidget])

  useLayoutEffect(() => {
    if (reducedMotion || !marginRef.current || !sectionRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        marginRef.current,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: 'power3.out',
          scrollTrigger: {
            id: `${id}-margin-widget`,
            trigger: sectionRef.current,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [id, mountMarginWidget, reducedMotion])

  const marginStyle = {
    [marginSide]: 'calc(50% - 680px - 180px)',
  }

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn('relative z-20 mx-auto max-w-6xl px-6 py-24 lg:px-16 lg:py-32', className)}
    >
      {mountMarginWidget && marginWidget && (
        <div
          aria-hidden="true"
          className="absolute top-1/2 hidden -translate-y-1/2 2xl:block"
          style={marginStyle}
        >
          <div ref={marginRef}>{marginWidget}</div>
        </div>
      )}
      <p className="mb-4 text-xs font-medium uppercase text-muted">{label}</p>
      {children}
    </section>
  )
}
