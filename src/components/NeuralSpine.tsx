'use client'

import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SECTION_IDS, SECTION_LABELS } from '@/lib/data'
import { useReducedMotion, useScrollProgress } from '@/lib/hooks'
import { cn } from '@/lib/utils'

const ROUTE_PATH = 'M 94 28 C 22 112, 126 204, 58 296 C 4 372, 126 468, 70 564 C 18 654, 126 744, 54 838 C 24 878, 74 934, 86 972'

interface RoutePoint {
  x: number
  y: number
}

export default function NeuralSpine() {
  const routeRef = useRef<SVGPathElement>(null)
  const progress = useScrollProgress()
  const reducedMotion = useReducedMotion()
  const [trainPoint, setTrainPoint] = useState<RoutePoint>({ x: 94, y: 28 })
  const [stationPoints, setStationPoints] = useState<RoutePoint[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useLayoutEffect(() => {
    const route = routeRef.current
    if (!route) return

    const length = route.getTotalLength()
    setStationPoints(SECTION_IDS.map((_, index) => route.getPointAtLength(length * ((index + 0.55) / SECTION_IDS.length))))
  }, [])

  useEffect(() => {
    const route = routeRef.current
    if (!route) return

    const length = route.getTotalLength()
    setTrainPoint(route.getPointAtLength(length * progress))
  }, [progress])

  useEffect(() => {
    const handleSectionEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: string }>
      const index = SECTION_IDS.indexOf(customEvent.detail?.id as (typeof SECTION_IDS)[number])
      if (index >= 0) setActiveIndex(index)
    }

    window.addEventListener('section-in-view', handleSectionEvent)
    return () => window.removeEventListener('section-in-view', handleSectionEvent)
  }, [])

  const navigateToSection = (id: (typeof SECTION_IDS)[number]) => {
    const target = document.getElementById(id)
    if (!target) return
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 76, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <nav className="journey-rail" aria-label="Page journey">
      <span className="journey-rail-title" aria-hidden="true">The journey</span>
      <svg className="journey-rail-track" viewBox="0 0 150 1000" preserveAspectRatio="none" aria-hidden="true">
        <path className="journey-track-shadow" d={ROUTE_PATH} />
        <path className="journey-track-bed" d={ROUTE_PATH} />
        <path className="journey-track-ties" d={ROUTE_PATH} />
        <path
          ref={routeRef}
          className="journey-track-progress"
          d={ROUTE_PATH}
          pathLength="1"
          style={{ strokeDasharray: `${progress} 1` }}
        />
      </svg>

      {stationPoints.map((point, index) => {
        const id = SECTION_IDS[index]
        const active = activeIndex === index
        return (
          <button
            key={id}
            type="button"
            className={cn('journey-station', active && 'journey-station-active')}
            style={{ left: `${(point.x / 150) * 100}%`, top: `${(point.y / 1000) * 100}%` }}
            onClick={() => navigateToSection(id)}
            aria-label={`Go to ${SECTION_LABELS[id].replace(/^\d+\s*-\s*/, '')}`}
            aria-current={active ? 'step' : undefined}
          >
            <span className="journey-station-dot" aria-hidden="true" />
            <span className="journey-station-label">{SECTION_LABELS[id].replace(/^\d+\s*-\s*/, '')}</span>
          </button>
        )
      })}

      <div
        className={cn('journey-train', reducedMotion && 'journey-train-static')}
        style={{ left: `${(trainPoint.x / 150) * 100}%`, top: `${(trainPoint.y / 1000) * 100}%` }}
        aria-hidden="true"
      >
        <span className="journey-train-smoke journey-smoke-one" />
        <span className="journey-train-smoke journey-smoke-two" />
        <span className="journey-train-smoke journey-smoke-three" />
        <span className="journey-train-smoke journey-smoke-four" />
        <Image
          src="/assets/journey-locomotive.png"
          alt=""
          width={72}
          height={72}
          unoptimized
          className="journey-locomotive-image"
        />
      </div>

      <span className="journey-progress-label" aria-hidden="true">{Math.round(progress * 100)}%</span>
    </nav>
  )
}
