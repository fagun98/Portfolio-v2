'use client'

import { Line, PerspectiveCamera, Sphere } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { SECTION_IDS } from '@/lib/data'
import { gsap } from '@/lib/gsap'
import { useReducedMotion, useScrollProgress } from '@/lib/hooks'
import { lerp } from '@/lib/utils'

const sectionColors = '#EF9F27'
const signalColor = '#1D9E75'

function mapY(value: number) {
  return lerp(-3.1, 3.1, value)
}

function useMobileCanvas() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  return isMobile
}

function AxonTube({ progress, path }: { progress: number; path: THREE.CatmullRomCurve3 }) {
  const meshRef = useRef<THREE.Mesh<THREE.TubeGeometry, THREE.MeshStandardMaterial>>(null)
  const geometry = useMemo(() => new THREE.TubeGeometry(path, 180, 0.015, 8, false), [path])

  useFrame(() => {
    if (!meshRef.current) {
      return
    }

    const count = geometry.index?.count ?? geometry.attributes.position.count
    geometry.setDrawRange(0, Math.floor(Math.min(progress / 0.9, 1) * count))
  })

  useEffect(() => {
    return () => geometry.dispose()
  }, [geometry])

  return (
    <group>
      <Line points={path.getPoints(80)} color={sectionColors} lineWidth={1} transparent opacity={0.12} />
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={sectionColors}
          emissive={sectionColors}
          emissiveIntensity={0.72}
          roughness={0.25}
          metalness={0.08}
          transparent
          opacity={0.86}
        />
      </mesh>
    </group>
  )
}

function SignalPulses({ path, progress }: { path: THREE.CatmullRomCurve3; progress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const offsets = useMemo(() => [0, 0.24, 0.48, 0.72], [])

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return
    }

    groupRef.current.children.forEach((child, index) => {
      const travel = (clock.elapsedTime * 0.075 + offsets[index]) % 1
      const cappedTravel = Math.min(travel, Math.max(progress, 0.08))
      const point = path.getPointAt(cappedTravel)
      child.position.set(point.x, point.y, point.z)
      const scale = 0.85 + Math.sin(clock.elapsedTime * 4 + index) * 0.18
      child.scale.setScalar(scale)
    })
  })

  return (
    <group ref={groupRef}>
      {offsets.map((offset) => (
        <Sphere key={offset} args={[0.026, 12, 12]}>
          <meshStandardMaterial color={signalColor} emissive={signalColor} emissiveIntensity={1.6} transparent opacity={0.92} />
        </Sphere>
      ))}
    </group>
  )
}

function TopNeuron({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current || progress <= 0.05) {
      return
    }

    const pulse = Math.sin(clock.elapsedTime * 2) * 0.02 + 1
    meshRef.current.scale.setScalar(pulse)
  })

  return (
    <Sphere ref={meshRef} args={[0.06, 16, 16]} position={[0, mapY(0.9), 0]}>
      <meshStandardMaterial
        color={sectionColors}
        emissive={sectionColors}
        emissiveIntensity={1.1}
        transparent
        opacity={progress > 0.05 ? 0.95 : 0}
      />
    </Sphere>
  )
}

function SectionNode({ position, active }: { position: [number, number, number]; active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (active && meshRef.current) {
      gsap.to(meshRef.current.scale, { x: 2, y: 2, z: 2, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.out' })
    }
  }, [active])

  return (
    <Sphere ref={meshRef} args={[0.03, 12, 12]} position={position}>
      <meshStandardMaterial color={sectionColors} emissive={sectionColors} emissiveIntensity={active ? 0.9 : 0.35} />
    </Sphere>
  )
}

function seededNoise(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

function FloatingParticles({ pathPoints }: { pathPoints: THREE.Vector3[] }) {
  const groupRef = useRef<THREE.Group>(null)
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, index) => {
        const anchor = pathPoints[index % pathPoints.length]
        return {
          position: new THREE.Vector3(
            anchor.x + (seededNoise(index, 1) - 0.5) * 0.28,
            anchor.y + (seededNoise(index, 2) - 0.5) * 0.22,
            anchor.z + (seededNoise(index, 3) - 0.5) * 0.24,
          ),
          speed: 0.15 + seededNoise(index, 4) * 0.2,
          phase: seededNoise(index, 5) * Math.PI * 2,
        }
      }),
    [pathPoints],
  )

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return
    }

    groupRef.current.children.forEach((child, index) => {
      const particle = particles[index]
      child.position.x = particle.position.x + Math.sin(clock.elapsedTime * particle.speed + particle.phase) * 0.025
      child.position.y = particle.position.y + Math.cos(clock.elapsedTime * particle.speed + particle.phase) * 0.02
    })
  })

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => (
        <Sphere key={index} args={[0.008, 6, 6]} position={particle.position}>
          <meshStandardMaterial color={sectionColors} transparent opacity={0.25} />
        </Sphere>
      ))}
    </group>
  )
}

function DendriteArrival({ progress }: { progress: number }) {
  const [phase, setPhase] = useState(0)
  const phaseRef = useRef({ value: 0 })
  const directions = useMemo(
    () => [
      new THREE.Vector3(-0.45, -0.2, 0),
      new THREE.Vector3(-0.32, 0.22, 0.04),
      new THREE.Vector3(0.4, -0.24, 0),
      new THREE.Vector3(0.34, 0.18, -0.03),
      new THREE.Vector3(-0.12, -0.44, 0.02),
      new THREE.Vector3(0.14, -0.42, -0.02),
    ],
    [],
  )

  useEffect(() => {
    if (progress < 0.95 || phaseRef.current.value > 0) {
      return
    }

    gsap.to(phaseRef.current, {
      value: 1,
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: () => setPhase(phaseRef.current.value),
    })
  }, [progress])

  const origin = new THREE.Vector3(0, mapY(0.05), 0)
  const opacity = phase > 0.75 ? Math.max(0, 1 - (phase - 0.75) / 0.25) : phase

  return (
    <group>
      {directions.map((direction, index) => {
        const end = origin.clone().add(direction.clone().multiplyScalar(phase))
        return (
          <Line
            key={index}
            points={[origin, end]}
            color={sectionColors}
            lineWidth={1}
            transparent
            opacity={opacity}
          />
        )
      })}
    </group>
  )
}

function SpineScene({
  progress,
  activeIndex,
  isMobile,
}: {
  progress: number
  activeIndex: number
  isMobile: boolean
}) {
  const invalidate = useThree((state) => state.invalidate)
  const pathPoints = useMemo(
    () => [
      new THREE.Vector3(0, mapY(0.9), 0),
      new THREE.Vector3(0, mapY(0.7), 0.04),
      new THREE.Vector3(0, mapY(0.5), -0.03),
      new THREE.Vector3(0, mapY(0.35), 0.04),
      new THREE.Vector3(0, mapY(0.2), -0.02),
      new THREE.Vector3(0, mapY(0.05), 0),
    ],
    [],
  )
  const path = useMemo(() => new THREE.CatmullRomCurve3(pathPoints), [pathPoints])

  useEffect(() => {
    invalidate()
  }, [activeIndex, invalidate, progress])

  useEffect(() => {
    const interval = window.setInterval(() => invalidate(), 80)
    return () => window.clearInterval(interval)
  }, [invalidate])

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
      <ambientLight intensity={0.65} />
      <pointLight position={[1.5, 2, 3]} intensity={1.8} color={sectionColors} />
      <pointLight position={[-1.4, -1.6, 2.4]} intensity={0.75} color={signalColor} />
      <AxonTube progress={progress} path={path} />
      <SignalPulses progress={progress} path={path} />
      <TopNeuron progress={progress} />
      {pathPoints.map((point, index) => (
        <SectionNode key={index} position={[point.x, point.y, point.z]} active={activeIndex === index} />
      ))}
      {!isMobile && <FloatingParticles pathPoints={pathPoints} />}
      <DendriteArrival progress={progress} />
    </>
  )
}

export default function NeuralSpine() {
  const reducedMotion = useReducedMotion()
  const progress = useScrollProgress()
  const isMobile = useMobileCanvas()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const handleSectionEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: string }>
      const index = SECTION_IDS.indexOf(customEvent.detail?.id as (typeof SECTION_IDS)[number])
      if (index >= 0) {
        setActiveIndex(index)
      }
    }

    window.addEventListener('section-in-view', handleSectionEvent)
    return () => window.removeEventListener('section-in-view', handleSectionEvent)
  }, [])

  if (reducedMotion || isMobile || typeof window === 'undefined') {
    return null
  }

  return (
    <div className="pointer-events-none fixed left-1/2 top-0 z-10 hidden h-screen w-20 -translate-x-1/2 md:block" aria-hidden="true">
      <Canvas frameloop="always" gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        <Suspense fallback={null}>
          <SpineScene progress={progress} activeIndex={activeIndex} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  )
}
