'use client'

import { Briefcase, Cpu, FolderOpen, GraduationCap, Sparkles } from 'lucide-react'
import { createRef, useEffect, useMemo, type RefObject } from 'react'
import { BrandGithubIcon, BrandLinkedInIcon } from '@/components/BrandIcons'
import MechanicalKey, { MechanicalKeyHandle } from '@/components/MechanicalKey'
import { KEYBOARD_NAV_ITEMS, UI_COPY } from '@/lib/data'

const iconMap = {
  Linkedin: BrandLinkedInIcon,
  Github: BrandGithubIcon,
  Briefcase,
  FolderOpen,
  Cpu,
  GraduationCap,
  Sparkles,
}

export default function KeyboardNav() {
  const keyRefs = useMemo(
    () =>
      KEYBOARD_NAV_ITEMS.reduce<Record<string, RefObject<MechanicalKeyHandle | null>>>((refs, item) => {
        if ('keyShortcut' in item && item.keyShortcut) {
          refs[item.keyShortcut] = createRef<MechanicalKeyHandle>()
        }
        return refs
      }, {}),
    [],
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return
      }

      const shortcut = event.key.toLowerCase()
      const matchingKey = keyRefs[shortcut]
      if (matchingKey?.current) {
        event.preventDefault()
        matchingKey.current.press()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [keyRefs])

  return (
    <div role="navigation" aria-label="Quick navigation" className="relative flex flex-col items-center">
      <div className="keyboard-key-row flex w-full flex-nowrap items-center justify-center">
        {KEYBOARD_NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon]
          const shortcut = 'keyShortcut' in item ? item.keyShortcut : undefined

          return (
            <MechanicalKey
              key={item.label}
              ref={shortcut ? keyRefs[shortcut] : undefined}
              icon={<Icon aria-hidden="true" />}
              label={item.label}
              tooltip={item.tooltip}
              href={'href' in item ? item.href : undefined}
              targetSection={'targetSection' in item ? item.targetSection : undefined}
              keyShortcut={shortcut}
              highlight={item.highlight}
              accent={'accent' in item ? item.accent : undefined}
              ariaLabel={item.ariaLabel}
              size="xl"
              className="hero-key-wrap"
            />
          )
        })}
      </div>

      <p className="keyboard-hint pointer-events-none absolute top-full mt-11 hidden text-[10px] font-medium text-muted md:block" aria-hidden="true">
        {UI_COPY.keyboardHint}{' '}
        {KEYBOARD_NAV_ITEMS.filter((item) => 'keyShortcut' in item).map((item) => (
          <span
            key={item.label}
            className="mx-0.5 inline-flex rounded border border-border bg-white px-1.5 py-0.5 font-mono text-[9px] text-ink/70"
          >
            {'keyShortcut' in item ? item.keyShortcut.toUpperCase() : ''}
          </span>
        ))}
      </p>
    </div>
  )
}
