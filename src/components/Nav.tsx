'use client'

import { Menu, X } from 'lucide-react'
import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react'
import { BrandGithubIcon, BrandLinkedInIcon } from '@/components/BrandIcons'
import { NAV_ITEMS, PERSONAL, SECTION_IDS, UI_COPY } from '@/lib/data'
import { useActiveSection } from '@/lib/hooks'
import { cn } from '@/lib/utils'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const sectionIds = useMemo(() => SECTION_IDS.slice(), [])
  const activeSection = useActiveSection(sectionIds)

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 80)
    updateScrolled()
    window.addEventListener('scroll', updateScrolled, { passive: true })
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    firstLinkRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }

      if (event.key !== 'Tab' || !menuRef.current) {
        return
      }

      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      )

      if (focusable.length === 0) {
        return
      }

      const firstElement = focusable[0]
      const lastElement = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    const target = id === 'top' ? document.body : document.getElementById(id)

    if (target) {
      const top = id === 'top' ? 0 : target.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top, behavior: 'smooth' })
    }

    setMenuOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-50 w-full transition-all duration-300',
        scrolled && 'border-b border-border bg-white/90 shadow-[0_1px_14px_rgba(26,26,26,0.04)] backdrop-blur-xl',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-16" aria-label="Primary">
        <a
          href="#top"
          aria-label={UI_COPY.homeAria}
          onClick={(event) => scrollToSection(event, 'top')}
          className="font-heading text-lg font-bold text-ink transition-colors hover:text-amber"
        >
          {UI_COPY.monogram}
        </a>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={UI_COPY.github}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-amber/10 hover:text-amber"
          >
            <BrandGithubIcon aria-hidden="true" size={18} />
          </a>
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={UI_COPY.linkedIn}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-amber/10 hover:text-amber"
          >
            <BrandLinkedInIcon aria-hidden="true" size={18} />
          </a>
          <a
            href="#connect"
            onClick={(event) => scrollToSection(event, 'connect')}
            className="ml-2 rounded-full border border-amber px-4 py-1.5 text-[13px] font-semibold text-amber transition-colors hover:bg-amber hover:text-white"
          >
            {UI_COPY.getInTouch}
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink md:hidden"
          aria-label={menuOpen ? UI_COPY.menuCloseAria : UI_COPY.menuOpenAria}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </nav>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-ink/20 opacity-0 transition-opacity duration-300 md:hidden',
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none',
        )}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />

      <div
        ref={menuRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label={UI_COPY.mobileMenuLabel}
        className={cn(
          'fixed right-0 top-0 z-50 h-screen w-72 border-l border-border bg-white p-6 shadow-2xl transition-transform duration-300 md:hidden',
          menuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="mb-10 flex items-center justify-between">
          <span className="font-heading text-lg font-bold text-ink">{UI_COPY.monogram}</span>
          <button
            type="button"
            aria-label={UI_COPY.menuCloseAria}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink"
            onClick={() => setMenuOpen(false)}
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.id}
              ref={index === 0 ? firstLinkRef : undefined}
              href={`#${item.id}`}
              aria-label={item.ariaLabel}
              className={cn('font-heading text-2xl font-semibold text-ink', activeSection === item.id && 'text-amber')}
              onClick={(event) => scrollToSection(event, item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
