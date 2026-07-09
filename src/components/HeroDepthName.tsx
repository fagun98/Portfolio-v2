import { forwardRef } from 'react'

const HeroDepthName = forwardRef<HTMLDivElement>(function HeroDepthName(_, ref) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hero-depth-name pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center"
    >
      <span className="hero-name-line">FAGUN</span>
      <span className="hero-name-line">RAITHATHA</span>
    </div>
  )
})

export default HeroDepthName
