'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import AmbientEffects from '@/components/AmbientEffects'
import About from '@/components/About'
import Connect from '@/components/Connect'
import Education from '@/components/Education'
import Experience from '@/components/Experience'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Intro from '@/components/Intro'
import Nav from '@/components/Nav'
import Projects from '@/components/Projects'
import ScrollToTopKey from '@/components/ScrollToTopKey'
import Services from '@/components/Services'
import Skills from '@/components/Skills'
import { ScrollTrigger } from '@/lib/gsap'

const NeuralSpine = dynamic(() => import('@/components/NeuralSpine'), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <>
      <AmbientEffects />
      <ScrollToTopKey />
      <Nav />
      <Intro />
      <NeuralSpine />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Services />
        <Education />
        <Connect />
      </main>
      <Footer />
    </>
  )
}
