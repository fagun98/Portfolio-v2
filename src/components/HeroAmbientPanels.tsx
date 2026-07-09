'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { HERO_AMBIENT } from '@/lib/data'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'

type CodeState = {
  lines: string[]
  activeLine: string
  showAutocomplete: boolean
}

function useDesktopAmbient() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1200px)')
    const update = () => setEnabled(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  return enabled
}

function renderCodeLine(line: string) {
  if (!line) {
    return <span>&nbsp;</span>
  }

  const parts = line.split(/(".*?"|\bfrom\b|\bimport\b|\bdef\b|\breturn\b|\bStateGraph\b|\bPipelineConfig\b|\bAgentState\b)/g)

  return (
    <>
      {parts.map((part, index) => {
        if (!part) {
          return null
        }

        if (part.startsWith('"')) {
          return (
            <span key={`${part}-${index}`} className="code-token-string">
              {part}
            </span>
          )
        }

        if (['from', 'import', 'def', 'return'].includes(part)) {
          return (
            <span key={`${part}-${index}`} className="code-token-keyword">
              {part}
            </span>
          )
        }

        if (['StateGraph', 'PipelineConfig', 'AgentState'].includes(part)) {
          return (
            <span key={`${part}-${index}`} className="code-token-type">
              {part}
            </span>
          )
        }

        return <span key={`${part}-${index}`}>{part}</span>
      })}
    </>
  )
}

function CodePanel({ enabled }: { enabled: boolean }) {
  const [codeState, setCodeState] = useState<CodeState>({ lines: [], activeLine: '', showAutocomplete: false })

  useEffect(() => {
    if (!enabled) {
      return
    }

    let cancelled = false
    let timeoutId = 0
    let rafId = 0
    let lineIndex = 0
    let charIndex = 0
    let renderedLines: string[] = []
    let autocompleteShown = false
    let paused = document.hidden

    const schedule = (delay: number) => {
      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        rafId = window.requestAnimationFrame(tick)
      }, delay)
    }

    const reset = () => {
      lineIndex = 0
      charIndex = 0
      renderedLines = []
      autocompleteShown = false
      setCodeState({ lines: [], activeLine: '', showAutocomplete: false })
      schedule(260)
    }

    const tick = () => {
      if (cancelled) {
        return
      }

      if (paused) {
        schedule(300)
        return
      }

      const line = HERO_AMBIENT.codeLines[lineIndex]
      const shouldShowAutocomplete =
        line.includes('graph.add_node') && !autocompleteShown && charIndex >= '    graph.add'.length

      if (shouldShowAutocomplete) {
        autocompleteShown = true
        setCodeState({ lines: renderedLines, activeLine: line.slice(0, charIndex), showAutocomplete: true })
        timeoutId = window.setTimeout(() => {
          if (!cancelled) {
            setCodeState({ lines: renderedLines, activeLine: line.slice(0, charIndex), showAutocomplete: false })
            schedule(70)
          }
        }, 1200)
        return
      }

      if (charIndex <= line.length) {
        setCodeState({ lines: renderedLines, activeLine: line.slice(0, charIndex), showAutocomplete: false })
        charIndex += 1
        schedule(30 + Math.random() * 50)
        return
      }

      renderedLines = [...renderedLines, line]
      lineIndex += 1
      charIndex = 0
      autocompleteShown = false
      setCodeState({ lines: renderedLines, activeLine: '', showAutocomplete: false })

      if (lineIndex >= HERO_AMBIENT.codeLines.length) {
        timeoutId = window.setTimeout(reset, 2000)
        return
      }

      schedule(160)
    }

    const handleVisibilityChange = () => {
      paused = document.hidden
      if (!paused) {
        schedule(120)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    reset()

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
      window.cancelAnimationFrame(rafId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [enabled])

  return (
    <div className="h-[340px] w-[280px] overflow-hidden rounded-[10px] border border-white/10 bg-[var(--code-bg)] font-mono text-[12px] text-[var(--code-muted)] shadow-[0_20px_60px_rgba(13,17,23,0.18)]">
      <div className="flex h-6 items-center gap-2 border-b border-white/10 px-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[11px] text-[var(--code-muted)]">{HERO_AMBIENT.codeFile}</span>
      </div>
      <div className="relative px-4 py-4">
        {[...codeState.lines, codeState.activeLine].slice(-10).map((line, index) => (
          <pre key={`${line}-${index}`} className="h-[22px] overflow-hidden whitespace-pre text-[12px] leading-[22px]">
            <code>{renderCodeLine(line)}</code>
          </pre>
        ))}
        <span className="inline-block h-4 w-[7px] translate-y-1 bg-[var(--code-blue)] opacity-70" />

        <div
          className={cn(
            'absolute left-[74px] top-[188px] w-[178px] origin-top overflow-hidden rounded-md border border-white/10 bg-[#161b22] py-1 text-[11px] shadow-2xl transition-all duration-150',
            codeState.showAutocomplete ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0',
          )}
        >
          {HERO_AMBIENT.autocomplete.map((item, index) => (
            <div
              key={item}
              className={cn(
                'flex items-center gap-2 px-2 py-1 text-[var(--code-muted)]',
                index === 0 && 'bg-[rgba(121,192,255,0.18)] text-[var(--code-blue)]',
              )}
            >
              <span>{index === 0 ? '>' : ' '}</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ThoughtPanel({ enabled }: { enabled: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (!enabled) {
      return
    }

    let cancelled = false
    let timeoutId = 0
    let paused = document.hidden

    const run = (index: number) => {
      if (cancelled) {
        return
      }

      if (paused) {
        timeoutId = window.setTimeout(() => run(index), 300)
        return
      }

      if (index <= HERO_AMBIENT.thoughtTrace.length) {
        setVisibleCount(index)
        timeoutId = window.setTimeout(() => run(index + 1), 400)
        return
      }

      timeoutId = window.setTimeout(() => {
        setVisibleCount(0)
        run(1)
      }, 2000)
    }

    const handleVisibilityChange = () => {
      paused = document.hidden
      if (!paused) {
        window.clearTimeout(timeoutId)
        run(1)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    run(1)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [enabled])

  return (
    <div className="h-[300px] w-[260px] overflow-hidden rounded-[10px] border border-[rgba(83,74,183,0.15)] bg-[rgba(83,74,183,0.05)] p-4 text-[11px] shadow-[0_20px_60px_rgba(83,74,183,0.08)]">
      <div className="mb-4 flex items-center gap-2 font-semibold uppercase text-[8px] text-purple">
        <span className="h-2 w-2 animate-pulse rounded-full bg-purple" />
        <span>reasoning trace</span>
      </div>
      <div className="space-y-2 text-ink/70">
        {HERO_AMBIENT.thoughtTrace.slice(0, visibleCount).map((line, index) => (
          <div
            key={line}
            className="translate-y-0 opacity-100 transition-all duration-300"
            style={{ transitionDelay: `${index * 24}ms` }}
          >
            <span className="text-purple">{index === HERO_AMBIENT.thoughtTrace.length - 1 ? '[ok]' : '->'}</span> {line}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HeroAmbientPanels() {
  const enabled = useDesktopAmbient()
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!enabled || !leftRef.current || !rightRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, delay: 1.2, ease: 'power3.out' })
      gsap.fromTo(rightRef.current, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, delay: 1.2, ease: 'power3.out' })
    })

    return () => ctx.revert()
  }, [enabled])

  if (!enabled) {
    return null
  }

  return (
    <div aria-hidden="true" role="presentation" className="pointer-events-none absolute inset-0 z-30 hidden xl:block">
      <div className="pointer-events-auto absolute left-[2%] top-1/2 -translate-y-1/2">
        <div ref={leftRef} className="hero-ambient-panel">
          <CodePanel enabled={enabled} />
        </div>
      </div>
      <div className="pointer-events-auto absolute right-[2%] top-1/2 -translate-y-1/2">
        <div ref={rightRef} className="hero-ambient-panel">
          <ThoughtPanel enabled={enabled} />
        </div>
      </div>
    </div>
  )
}
