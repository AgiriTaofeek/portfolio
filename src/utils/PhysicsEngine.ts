import * as THREE from 'three'

export interface NodeData {
  id: string
  label: string
  connections: string[]
  position: THREE.Vector3
  velocity: THREE.Vector3
  mass: number
}

export class ForceGraphEngine {
  nodes: NodeData[]

  // Config
  repulsion: number = 200
  springLength: number = 2
  springStiffness: number = 0.1
  viewCenter: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
  centerGravity: number = 0.05
  damping: number = 0.9

  constructor(initialNodes: any[]) {
    this.nodes = initialNodes.map((n) => ({
      ...n,
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5,
      ),
      velocity: new THREE.Vector3(0, 0, 0),
      mass: 1,
    }))
  }

  update() {
    // 1. Reset Forces (we just add to velocity directly for simplicity in basic verlet-ish steps)
    // Actually strictly: Force -> Accel -> Vel -> Pos

    const forces = this.nodes.map(() => new THREE.Vector3(0, 0, 0))

    // 2. Apply Forces
    for (let i = 0; i < this.nodes.length; i++) {
      const nodeA = this.nodes[i]
      const force = forces[i]

      // A. Center Gravity (Pull to 0,0,0)
      const distToCenter = nodeA.position.clone().sub(this.viewCenter)
      force.sub(distToCenter.multiplyScalar(this.centerGravity))

      // B. Repulsion (Between all nodes)
      for (let j = 0; j < this.nodes.length; j++) {
        if (i === j) continue
        const nodeB = this.nodes[j]

        const dir = nodeA.position.clone().sub(nodeB.position)
        let dist = dir.length()
        if (dist === 0) {
          dist = 0.01
          dir.set(Math.random(), Math.random(), Math.random())
        }

        const strength = this.repulsion / (dist * dist)
        force.add(dir.normalize().multiplyScalar(strength))
      }

      // C. Spring Attraction (Connections)
      nodeA.connections.forEach((targetId) => {
        const targetIdx = this.nodes.findIndex((n) => n.id === targetId)
        if (targetIdx !== -1) {
          const nodeB = this.nodes[targetIdx]
          const dir = nodeB.position.clone().sub(nodeA.position)
          const dist = dir.length()

          // F = k * (x - L)
          const displacement = dist - this.springLength
          const springForce = dir
            .normalize()
            .multiplyScalar(displacement * this.springStiffness)

          force.add(springForce)
          // Note: We will apply equal and opposite to nodeB when we reach it in the loop,
          // or we can optimize by doing pairs. For simplicity, we just do one-way lookup since connections array defines graph.
          // Wait, if A links B, does B link A?
          // If bidirectional data isn't guaranteed, we might double apply or miss.
          // Let's assume directed edges in data, or handle duplicates.
          // For a consistent system, usually easier to loop edges separate from nodes.
          // But traversing node.connections works if we consider them directed "attractions".
        }
      })
    }

    // 3. Integrate
    this.nodes.forEach((node, i) => {
      node.velocity.add(forces[i].multiplyScalar(0.016)) // dt ~ 60fps
      node.velocity.multiplyScalar(this.damping)
      node.position.add(node.velocity)
    })
  }

  // Helper to interact
  pullNode(id: string) {
    const node = this.nodes.find((n) => n.id === id)
    if (node) {
      // Stub interaction logic
    }
  }
}
