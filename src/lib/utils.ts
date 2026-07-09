import clsx from 'clsx'

export function cn(...classes: (string | undefined | false | null)[]): string {
  return clsx(classes)
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}
