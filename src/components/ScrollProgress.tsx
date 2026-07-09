'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!progressRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressRef.current,
        { width: '0%' },
        {
          width: '100%',
          ease: 'none',
          scrollTrigger: {
            id: 'scroll-progress',
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.2,
          },
        },
      )
    }, progressRef)

    return () => ctx.revert()
  }, [])

  return <div ref={progressRef} className="fixed left-0 top-0 z-[100] h-0.5 w-0 bg-amber" aria-hidden="true" />
}
