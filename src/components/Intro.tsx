'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const INTRO_DURATION_SECONDS = 4
const INTRO_LOAD_TIMEOUT_MS = 5200

export default function Intro() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const backdropVideoRef = useRef<HTMLVideoElement>(null)

  useLayoutEffect(() => {
    const overlay = overlayRef.current
    const media = mediaRef.current
    const video = videoRef.current
    const backdropVideo = backdropVideoRef.current

    if (!overlay || !media || !video) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const depthName = document.querySelector<HTMLElement>('.hero-depth-name')
    const portrait = document.querySelector<HTMLElement>('.hero-portrait')
    const foreground = document.querySelector<HTMLElement>('.hero-foreground')
    const introTargets = [depthName, portrait, foreground].filter(
      (target): target is HTMLElement => Boolean(target),
    )

    if (prefersReducedMotion) {
      gsap.set(overlay, { autoAlpha: 0, display: 'none' })
      gsap.set(introTargets, { clearProps: 'all' })
      return
    }

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    let animationFrame = 0
    let loadTimeout = 0
    let finished = false
    let exitTimeline: gsap.core.Timeline | null = null

    const restorePageScroll = () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
    }

    const finishIntro = () => {
      if (finished) {
        return
      }

      finished = true
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(loadTimeout)
      video.pause()
      backdropVideo?.pause()

      exitTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          gsap.set(overlay, { display: 'none' })
          window.removeEventListener('keydown', handleKeydown)
          restorePageScroll()
        },
      })

      exitTimeline.to(media, { autoAlpha: 0, scale: 1.025, duration: 0.65, ease: 'power2.inOut' })
      exitTimeline.to(overlay, { autoAlpha: 0, duration: 0.7, ease: 'power2.inOut' }, '<0.08')

      if (portrait) {
        exitTimeline.to(portrait, { scale: 1, opacity: 1, duration: 0.9 }, '<0.08')
      }

      if (depthName) {
        exitTimeline.to(depthName, { opacity: 1, duration: 1.15, ease: 'power2.inOut' }, '<')
      }

      if (foreground) {
        exitTimeline.to(foreground, { y: 0, opacity: 1, duration: 0.65 }, '<0.16')
      }
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        finishIntro()
      }
    }

    const watchPlayback = () => {
      if (video.currentTime >= INTRO_DURATION_SECONDS || video.ended) {
        finishIntro()
        return
      }

      animationFrame = window.requestAnimationFrame(watchPlayback)
    }

    const handlePlaying = () => {
      if (backdropVideo && Math.abs(backdropVideo.currentTime - video.currentTime) > 0.15) {
        backdropVideo.currentTime = video.currentTime
      }
      gsap.to(media, { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'power2.out' })
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(watchPlayback)
    }

    const handlePlaybackFailure = () => finishIntro()

    gsap.set(overlay, { autoAlpha: 1 })
    gsap.set(media, { autoAlpha: 0, scale: 1.015, transformOrigin: 'center center' })
    if (depthName) {
      gsap.set(depthName, { opacity: 0 })
    }
    if (portrait) {
      gsap.set(portrait, { scale: 0.9, opacity: 0 })
    }
    if (foreground) {
      gsap.set(foreground, { y: 14, opacity: 0 })
    }

    video.currentTime = 0
    if (backdropVideo) {
      backdropVideo.currentTime = 0
      void backdropVideo.play().catch(() => undefined)
    }
    video.addEventListener('playing', handlePlaying)
    video.addEventListener('ended', finishIntro)
    video.addEventListener('error', handlePlaybackFailure)
    window.addEventListener('keydown', handleKeydown)

    loadTimeout = window.setTimeout(finishIntro, INTRO_LOAD_TIMEOUT_MS)
    void video.play().catch(handlePlaybackFailure)

    return () => {
      finished = true
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(loadTimeout)
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('ended', finishIntro)
      video.removeEventListener('error', handlePlaybackFailure)
      window.removeEventListener('keydown', handleKeydown)
      exitTimeline?.kill()
      gsap.killTweensOf([overlay, media, ...introTargets])
      restorePageScroll()
    }
  }, [])

  return (
    <div
      ref={overlayRef}
      className="intro-overlay fixed inset-0 z-[120] overflow-hidden bg-[#050505]"
      aria-hidden="true"
    >
      <div ref={mediaRef} className="intro-media absolute inset-0">
        <video
          ref={backdropVideoRef}
          className="intro-video-backdrop absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
        >
          <source
            src="/assets/intro.mp4"
            type="video/mp4"
            media="(max-width: 767px) and (orientation: portrait)"
          />
        </video>
        <video
          ref={videoRef}
          className="intro-video absolute inset-0 z-10 h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
        >
          <source src="/assets/intro.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-black/15 to-transparent" />
    </div>
  )
}
