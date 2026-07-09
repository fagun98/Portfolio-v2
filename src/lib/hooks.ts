'use client'

import { RefObject, useEffect, useState } from 'react'

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollHeight <= 0 ? 0 : Math.min(1, Math.max(0, scrollTop / scrollHeight)))
    }

    const requestUpdate = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame)
      }
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  return progress
}

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => setReducedMotion(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return reducedMotion
}

export function useInView(ref: RefObject<Element>, options?: IntersectionObserverInit): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    }, options)

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [options, ref])

  return inView
}

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (sections.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveSection(visible.target.id)
        }
      },
      { threshold: 0.4, rootMargin: '-20% 0px -35% 0px' },
    )

    sections.forEach((section) => observer.observe(section))

    const handleSectionEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: string }>
      if (customEvent.detail?.id) {
        setActiveSection(customEvent.detail.id)
      }
    }

    window.addEventListener('section-in-view', handleSectionEvent)

    return () => {
      observer.disconnect()
      window.removeEventListener('section-in-view', handleSectionEvent)
    }
  }, [sectionIds])

  return activeSection
}
