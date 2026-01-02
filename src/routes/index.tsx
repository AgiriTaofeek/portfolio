import { useGSAP } from '@gsap/react'
import { createFileRoute } from '@tanstack/react-router'
import { gsap } from 'gsap'
import { useRef } from 'react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.boot-line',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      )
    },
    { scope: containerRef },
  )

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center p-4 text-fg-0"
    >
      {/* <ThemeToggle /> */}
      <div className="font-mono text-sm md:text-base space-y-2 mb-12">
        <div className="boot-line opacity-0 text-gray-500">
          &gt; booting frontend.runtime v3.2.1
        </div>
        <div className="boot-line opacity-0 text-gray-500">
          &gt; loading shaders…
        </div>
        <div className="boot-line opacity-0 text-gray-500">
          &gt; initializing scroll engine…
        </div>
        <div className="boot-line opacity-0 text-accent">&gt; ready</div>
      </div>

      <h1 className="boot-line opacity-0 text-4xl md:text-6xl font-display font-bold text-center max-w-4xl leading-tight">
        Hello, I build experiences that run.
      </h1>
    </div>
  )
}
