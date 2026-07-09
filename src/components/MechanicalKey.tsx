'use client'

import { KeyboardEvent, ReactNode, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface MechanicalKeyHandle {
  press: () => void
}

interface MechanicalKeyProps {
  icon: ReactNode
  label: string
  targetSection?: string
  keyShortcut?: string
  highlight?: boolean
  tooltip?: string
  href?: string
  external?: boolean
  size?: 'md' | 'xl'
  ariaLabel?: string
  className?: string
}

function createClickAudio() {
  const sampleRate = 8000
  const samples = 240
  const buffer = new ArrayBuffer(44 + samples * 2)
  const view = new DataView(buffer)

  const writeString = (offset: number, value: string) => {
    for (let index = 0; index < value.length; index += 1) {
      view.setUint8(offset + index, value.charCodeAt(index))
    }
  }

  writeString(0, 'RIFF')
  view.setUint32(4, 36 + samples * 2, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeString(36, 'data')
  view.setUint32(40, samples * 2, true)

  for (let index = 0; index < samples; index += 1) {
    const envelope = Math.max(0, 1 - index / samples)
    const value = Math.sin(index * 1.35) * 0.22 * envelope
    view.setInt16(44 + index * 2, value * 32767, true)
  }

  return new Audio(URL.createObjectURL(new Blob([view], { type: 'audio/wav' })))
}

const interactiveTags = ['INPUT', 'TEXTAREA', 'SELECT']

const MechanicalKey = forwardRef<MechanicalKeyHandle, MechanicalKeyProps>(function MechanicalKey(
  {
    icon,
    label,
    targetSection,
    highlight = false,
    tooltip,
    href,
    external = true,
    size = 'md',
    ariaLabel,
    className,
  },
  ref,
) {
  const [pressed, setPressed] = useState(false)
  const isAnimatingRef = useRef(false)
  const timeoutRef = useRef<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playClick = () => {
    try {
      if (!audioRef.current) {
        audioRef.current = createClickAudio()
      }

      audioRef.current.currentTime = 0
      void audioRef.current.play()
    } catch {
      // Audio is a small tactile enhancement; failures should never block navigation.
    }
  }

  const activateTarget = () => {
    if (href) {
      if (external) {
        window.open(href, '_blank', 'noopener,noreferrer')
      } else {
        window.location.href = href
      }
      return
    }

    if (!targetSection) {
      return
    }

    const target = document.getElementById(targetSection)
    if (!target) {
      return
    }

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 80,
      behavior: 'smooth',
    })
  }

  const triggerPress = () => {
    if (isAnimatingRef.current) {
      return
    }

    isAnimatingRef.current = true
    setPressed(true)
    playClick()

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      setPressed(false)
      isAnimatingRef.current = false
      activateTarget()
    }, 120)
  }

  useImperativeHandle(ref, () => ({ press: triggerPress }))

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (interactiveTags.includes((event.target as HTMLElement).tagName)) {
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      triggerPress()
    }
  }

  return (
    <span className={cn('mech-key-wrap', className)}>
      <button
        type="button"
        role="button"
        tabIndex={0}
        aria-label={ariaLabel ?? (href ? `Open ${tooltip ?? label}` : `Navigate to ${tooltip ?? label}`)}
        className={cn('mech-key', highlight && 'highlight', pressed && 'pressed', size === 'xl' && 'mech-key-xl')}
        onClick={triggerPress}
        onKeyDown={handleKeyDown}
      >
        <span aria-hidden="true" className={size === 'xl' ? 'text-[34px]' : 'text-[21px]'}>
          {icon}
        </span>
        <span className="mech-key-label">{label}</span>
      </button>
      {tooltip && <span className="mech-tooltip">{tooltip}</span>}
    </span>
  )
})

export default MechanicalKey
