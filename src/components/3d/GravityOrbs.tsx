import { Canvas, useThree } from '@react-three/fiber'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import { Text, Environment } from '@react-three/drei'
import { useState } from 'react'

// Colors for the orbs
const ACCENT = '#CCFE00'
const WHITE = '#FFFFFF'

const SKILLS = [
  'React',
  'GSAP',
  'WebGL',
  'Three.js',
  'Next.js',
  'Node',
  'Tailwind',
  'Vite',
  'TypeScript',
  'Shaders',
]

function Orb({
  position,
  text,
}: {
  position: [number, number, number]
  text: string
}) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [1.8, 0.6, 0.2], // Shape of the badge
    material: { friction: 0.3, restitution: 0.8 }, // Bouncy
  }))

  const [hovered, setHover] = useState(false)

  return (
    <mesh
      ref={ref as any}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => api.applyImpulse([0, 5, 0], [0, 0, 0])} // Jump on click
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1.8, 0.6, 0.2]} />
      <meshPhysicalMaterial
        color={hovered ? ACCENT : '#1a1a1a'}
        emissive={hovered ? ACCENT : '#000000'}
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
        clearcoat={1}
        transparent
        opacity={0.9}
      />
      <Text
        position={[0, 0, 0.11]}
        fontSize={0.25}
        color={hovered ? '#000000' : WHITE}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </mesh>
  )
}

function Boundaries() {
  const { viewport } = useThree()
  const height = viewport.height
  const width = viewport.width

  usePlane(() => ({
    position: [0, -height / 2.5, 0],
    rotation: [-Math.PI / 2, 0, 0],
  })) // Floor
  usePlane(() => ({
    position: [-width / 2, 0, 0],
    rotation: [0, Math.PI / 2, 0],
  })) // Left Wall
  usePlane(() => ({
    position: [width / 2, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
  })) // Right Wall
  // Invisible ceiling to keep them in view if they bounce too high? layout dependent.

  return null
}

// Scene component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[0, 10, 5]} intensity={0.5} castShadow />

      <Boundaries />

      {SKILLS.map((skill, i) => (
        <Orb
          key={skill}
          position={[
            (Math.random() - 0.5) * 3,
            5 + i * 1, // Drop from height
            0,
          ]}
          text={skill}
        />
      ))}

      <Environment preset="city" />
    </>
  )
}

export function GravityOrbs() {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ preserveDrawingBuffer: false }}
      >
        <Physics gravity={[0, -5, 0]}>
          <Scene />
        </Physics>
      </Canvas>
    </div>
  )
}
