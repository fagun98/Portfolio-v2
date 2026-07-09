'use client'

import { ArrowUp } from 'lucide-react'
import MechanicalKey from '@/components/MechanicalKey'
import { UI_COPY } from '@/lib/data'
import { useScrollProgress } from '@/lib/hooks'

export default function ScrollToTopKey() {
  const progress = useScrollProgress()

  if (progress <= 0.025) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-[90] md:bottom-6 md:right-6">
      <MechanicalKey
        icon={<ArrowUp aria-hidden="true" size={18} />}
        label="Top"
        targetSection="top"
        tooltip={UI_COPY.backToTop}
        size="sm"
        accent="amber"
        ariaLabel={UI_COPY.backToTop}
      />
    </div>
  )
}
