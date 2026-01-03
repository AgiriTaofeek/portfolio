import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { ForceGraphEngine } from '../utils/PhysicsEngine'

// SKILL DATA
const SKILLS = [
  { id: 'react', label: 'React', connections: ['gsap', 'threejs', 'ts', 'nextjs'] },
  { id: 'gsap', label: 'GSAP', connections: ['react', 'threejs', 'creative'] },
  { id: 'threejs', label: 'Three.js', connections: ['react', 'gsap', 'creative', 'webgl'] },
  { id: 'ts', label: 'TypeScript', connections: ['react', 'nextjs', 'node'] },
  { id: 'nextjs', label: 'Next.js', connections: ['react', 'ts', 'node', 'perf'] },
  { id: 'node', label: 'Node.js', connections: ['ts', 'nextjs'] },
  { id: 'webgl', label: 'WebGL', connections: ['threejs', 'perf'] },
  { id: 'creative', label: 'Creative Dev', connections: ['gsap', 'threejs'] },
  { id: 'perf', label: 'Performance', connections: ['webgl', 'nextjs'] },
  { id: 'a11y', label: 'Accessibility', connections: ['react'] },
]

function GraphScene() {
  const engine = useMemo(() => new ForceGraphEngine(SKILLS), [])
  const nodesRef = useRef<THREE.Group>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // Simulation Loop
  useFrame(() => {
    engine.update()

    // Update Node Visuals
    if (nodesRef.current) {
        nodesRef.current.children.forEach((mesh, i) => {
            const node = engine.nodes[i]
            mesh.position.copy(node.position)

            // Hover Response - Simple scale
            if (node.id === hoveredNode) {
                mesh.scale.lerp(new THREE.Vector3(1.5, 1.5, 1.5), 0.1)

                // Pull neighbors logic can go here (apply force in engine)
            } else {
                mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
            }
        })
    }
  })

  // Prepare Lines Geometry
  // We need to construct line points dynamically.
  // For better perf, we could use a single buffer geometry with 'setDrawRange' or similar,
  // but Drei's Line is convenient. Let's try separate Lines first or segments.
  // Actually, to update every frame, a custom BufferGeometry is best.

  const ConnectionLines = () => {
      const geometryRef = useRef<THREE.BufferGeometry>(null)

      useFrame(() => {
          if (geometryRef.current) {
              const points: THREE.Vector3[] = []
              engine.nodes.forEach(node => {
                  node.connections.forEach(targetId => {
                      const target = engine.nodes.find(n => n.id === targetId)
                      if (target) {
                          points.push(node.position)
                          points.push(target.position)
                      }
                  })
              })
              geometryRef.current.setFromPoints(points)
          }
      })

      return (
          <lineSegments>
              <bufferGeometry ref={geometryRef} />
              <lineBasicMaterial color="#ffffff" opacity={0.15} transparent />
          </lineSegments>
      )
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Nodes */}
      <group ref={nodesRef}>
        {engine.nodes.map((node) => (
            <mesh
                key={node.id}
                onPointerOver={() => {
                    setHoveredNode(node.id)
                    document.body.style.cursor = 'pointer'
                }}
                onPointerOut={() => {
                    setHoveredNode(null)
                    document.body.style.cursor = 'auto'
                }}
            >
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial
                    color={hoveredNode === node.id ? "#ffffff" : "#4444ff"}
                    emissive={hoveredNode === node.id ? "#4444ff" : "#000000"}
                    roughness={0.3}
                    metalness={0.8}
                />

                <Html distanceFactor={10} className="pointer-events-none">
                    <div className={`
                        px-2 py-1 rounded bg-black/50 backdrop-blur-sm border border-white/10 text-xs font-mono text-white whitespace-nowrap transition-opacity duration-300
                        ${hoveredNode === node.id ? 'opacity-100 scale-110' : 'opacity-60'}
                    `}>
                        {node.label}
                    </div>
                </Html>
            </mesh>
        ))}
      </group>

      {/* Connections */}
      <ConnectionLines />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!hoveredNode} autoRotateSpeed={0.5} />
    </>
  )
}

export function SkillsGraph() {
  return (
    <div className="layout-section w-screen h-screen">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <GraphScene />
      </Canvas>
    </div>
  )
}
