'use client'

import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import HeroAmbientPanels from '@/components/HeroAmbientPanels'
import HeroDepthName from '@/components/HeroDepthName'
import KeyboardNav from '@/components/KeyboardNav'
import { PERSONAL, UI_COPY } from '@/lib/data'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/hooks'

function portraitFallback(title: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" role="img" aria-label="${title}"><rect width="800" height="800" fill="white"/><circle cx="400" cy="250" r="118" fill="%231a1a1a" opacity="0.12"/><path d="M205 710c38-178 102-267 195-267s158 89 195 267" fill="%231a1a1a" opacity="0.12"/><path d="M250 690c50-117 100-176 150-176s100 59 150 176" fill="none" stroke="%231a1a1a" stroke-width="8" stroke-linecap="round"/></svg>`
  return `data:image/svg+xml;utf8,${svg}`
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const foregroundRef = useRef<HTMLDivElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [portraitSrc, setPortraitSrc] = useState('/assets/face-forward.png')

  useLayoutEffect(() => {
    if (reducedMotion || !heroRef.current) {
      return
    }

    const supportsPointerParallax = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!supportsPointerParallax) {
      return
    }

    const hero = heroRef.current

    const handleMouseMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = (event.clientX - centerX) / (rect.width / 2)
      const dy = (event.clientY - centerY) / (rect.height / 2)

      gsap.to(nameRef.current, { x: dx * 18, y: dy * 12, duration: 0.6, ease: 'power2.out' })
      gsap.to(portraitRef.current, { x: dx * 8, y: dy * 6, duration: 0.6, ease: 'power2.out' })
      gsap.to(foregroundRef.current, { x: dx * 3, y: dy * 2, duration: 0.6, ease: 'power2.out' })
    }

    const handleMouseLeave = () => {
      gsap.to([nameRef.current, portraitRef.current, foregroundRef.current], {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
      })
    }

    hero.addEventListener('mousemove', handleMouseMove)
    hero.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove)
      hero.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [reducedMotion])

  useLayoutEffect(() => {
    if (reducedMotion || !heroRef.current || !scrollCueRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.to(scrollCueRef.current, {
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          id: 'hero-scroll-cue',
          trigger: document.body,
          start: '50px top',
          end: '80px top',
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section ref={heroRef} id="top" className="relative z-20 h-screen min-h-[760px] w-full overflow-hidden bg-white px-6">
      <h1 className="sr-only">{PERSONAL.name} - ML Engineer, AI Systems</h1>

      <HeroDepthName ref={nameRef} />

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div ref={portraitRef} className="hero-portrait relative aspect-square w-[min(72vw,280px)] md:w-[400px]">
          <Image
            src={portraitSrc}
            alt={UI_COPY.portraitForwardAlt}
            width={520}
            height={520}
            priority
            loading="eager"
            unoptimized
            onError={() => setPortraitSrc(portraitFallback(UI_COPY.fallbackPortraitTitle))}
            className="h-full w-full object-cover object-[50%_27%] drop-shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            sizes="(min-width: 768px) 400px, 72vw"
          />
        </div>
      </div>

      <div
        className="absolute left-1/2 z-20 w-[min(92vw,620px)] -translate-x-1/2 text-center"
        style={{ top: 'calc(50% + min(31vw, 200px))' }}
      >
        <div ref={foregroundRef} className="hero-foreground">
          <p className="font-heading text-base font-medium uppercase text-muted">{PERSONAL.title}</p>
          <p className="mx-auto mt-2 max-w-[480px] text-[15px] leading-6 text-[var(--ink-soft)]">{PERSONAL.tagline}</p>
          <div className="mt-8">
            <KeyboardNav />
          </div>
        </div>
      </div>

      <div
        ref={scrollCueRef}
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[11px] font-medium text-muted md:inline-flex"
      >
        <span className="uppercase">{UI_COPY.scrollTiny}</span>
        <ChevronDown aria-hidden="true" className="scroll-bob text-amber" size={18} />
      </div>

      <HeroAmbientPanels />
    </section>
  )
}
