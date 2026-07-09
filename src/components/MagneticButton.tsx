'use client'

import { MouseEvent, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  external?: boolean
  className?: string
  icon?: React.ReactNode
}

export default function MagneticButton({ children, href, onClick, external, className, icon }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const reducedMotion = useReducedMotion()

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (reducedMotion || !buttonRef.current) {
      return
    }

    const rect = buttonRef.current.getBoundingClientRect()
    const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 16
    const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 16

    gsap.to(buttonRef.current, {
      x: Math.max(-8, Math.min(8, offsetX)),
      y: Math.max(-8, Math.min(8, offsetY)),
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (reducedMotion || !buttonRef.current) {
      return
    }

    gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' })
  }

  const classes = cn(
    'inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-amber hover:text-amber hover:shadow-[0_0_16px_rgba(239,159,39,0.2)]',
    className,
  )

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {icon}
        {children}
      </a>
    )
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type="button"
      className={classes}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {icon}
      {children}
    </button>
  )
}
