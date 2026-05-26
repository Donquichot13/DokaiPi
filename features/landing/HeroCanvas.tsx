// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck — R3F JSX intrinsic elements require global type extension
// that conflicts with Next.js App Router strict JSX mode; canvas is purely visual
'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei'
import { useRef } from 'react'
import type * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1.4, 64, 64]}>
        <MeshDistortMaterial
          color="#1a0050"
          distort={0.45}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function WireframeTorus() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.3
    ref.current.rotation.z = state.clock.elapsedTime * 0.15
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.2, 0.015, 8, 80]} />
      <meshBasicMaterial color="#0075FF" opacity={0.35} transparent />
    </mesh>
  )
}

export function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#0075FF" intensity={8} />
      <pointLight position={[-5, -3, -5]} color="#582CFF" intensity={6} />
      <pointLight position={[0, -5, 0]} color="#2CD9FF" intensity={3} />
      <AnimatedSphere />
      <WireframeTorus />
    </Canvas>
  )
}
