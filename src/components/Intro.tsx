'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function Intro() {
  const overlayRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!overlayRef.current) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const introPlayed = sessionStorage.getItem('intro-played') === 'true'
    const shouldPlay = !prefersReducedMotion && !introPlayed

    const ctx = gsap.context(() => {
      const depthName = document.querySelector<HTMLElement>('.hero-depth-name')
      const portrait = document.querySelector<HTMLElement>('.hero-portrait')
      const foreground = document.querySelector<HTMLElement>('.hero-foreground')
      const introTargets = [depthName, portrait, foreground].filter((target): target is HTMLElement => Boolean(target))

      if (!shouldPlay) {
        gsap.set(overlayRef.current, { autoAlpha: 0, display: 'none' })
        gsap.set(introTargets, { clearProps: 'all' })
        return
      }

      if (depthName) {
        gsap.set(depthName, { opacity: 0 })
      }
      if (portrait) {
        gsap.set(portrait, { scale: 0.85, opacity: 0 })
      }
      if (foreground) {
        gsap.set(foreground, { y: 10, opacity: 0 })
      }

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          sessionStorage.setItem('intro-played', 'true')
          gsap.set(overlayRef.current, { display: 'none' })
        },
      })

      timeline.to(overlayRef.current, { autoAlpha: 0, duration: 0.4, delay: 0.5 })

      if (portrait) {
        timeline.to(portrait, { scale: 1, opacity: 1, duration: 0.8 }, '<')
      }

      if (depthName) {
        timeline.to(depthName, { opacity: 1, duration: 1.2, ease: 'power2.inOut' }, '<')
      }

      if (foreground) {
        timeline.to(foreground, { y: 0, opacity: 1, duration: 0.5 }, '-=0.4')
      }
    }, overlayRef)

    return () => ctx.revert()
  }, [])

  return <div ref={overlayRef} className="fixed inset-0 z-[120] bg-white" aria-hidden="true" />
}
