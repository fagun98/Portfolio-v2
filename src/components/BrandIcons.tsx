import type { SVGProps } from 'react'

interface BrandIconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

export function BrandLinkedInIcon({ size = 24, ...props }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" focusable="false" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.32 8.02h4.36V23H.32V8.02Zm7.3 0h4.18v2.05h.06c.58-1.1 2-2.26 4.12-2.26 4.4 0 5.21 2.9 5.21 6.67V23h-4.35v-7.56c0-1.8-.03-4.12-2.51-4.12-2.52 0-2.9 1.97-2.9 4V23H7.62V8.02Z" />
    </svg>
  )
}

export function BrandGithubIcon({ size = 24, ...props }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" focusable="false" {...props}>
      <path d="M12 .7C5.73.7.64 5.78.64 12.06c0 5.02 3.25 9.27 7.76 10.78.57.1.78-.25.78-.55v-2.15c-3.16.69-3.82-1.34-3.82-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.75 1.17 1.75 1.17 1.01 1.74 2.66 1.24 3.31.95.1-.73.4-1.24.72-1.52-2.52-.29-5.17-1.26-5.17-5.61 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3 0 0 .96-.31 3.12 1.16A10.9 10.9 0 0 1 12 6.18c.97 0 1.94.13 2.85.38 2.16-1.47 3.11-1.16 3.11-1.16.62 1.55.23 2.71.11 3 .73.79 1.17 1.8 1.17 3.04 0 4.36-2.66 5.32-5.19 5.6.41.35.77 1.04.77 2.1v3.15c0 .31.2.66.79.55a11.37 11.37 0 0 0 7.75-10.78C23.36 5.78 18.27.7 12 .7Z" />
    </svg>
  )
}
