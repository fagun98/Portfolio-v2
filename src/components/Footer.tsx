import Image from 'next/image'
import { Mail } from 'lucide-react'
import { BrandGithubIcon, BrandLinkedInIcon } from '@/components/BrandIcons'
import { PERSONAL, SOCIAL_LINKS, UI_COPY } from '@/lib/data'

const iconMap = {
  Linkedin: BrandLinkedInIcon,
  Github: BrandGithubIcon,
  Mail,
}

export default function Footer() {
  return (
    <footer className="relative z-20 flex flex-col items-center justify-between gap-5 border-t border-border px-6 py-8 text-center sm:flex-row sm:text-left lg:px-16">
      <Image
        src="/assets/face-forward.png"
        alt={UI_COPY.portraitForwardAlt}
        width={48}
        height={48}
        loading="lazy"
        fetchPriority="low"
        unoptimized
        className="h-12 w-12 rounded-full border border-ink object-cover"
      />

      <p className="text-sm text-muted">
        &copy; {PERSONAL.year} {PERSONAL.name} · {PERSONAL.footerNote}
      </p>

      <div className="flex items-center gap-4">
        {SOCIAL_LINKS.map((link) => {
          const Icon = iconMap[link.icon]
          return (
            <a
              key={link.platform}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              aria-label={link.platform}
              className="text-muted transition-colors hover:text-amber"
            >
              <Icon aria-hidden="true" size={18} />
            </a>
          )
        })}
      </div>
    </footer>
  )
}
