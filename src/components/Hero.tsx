import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { HeroShader } from './HeroShader'
import { RuntimeEditor } from './RuntimeEditor'

gsap.registerPlugin(ScrollTrigger)

const BOOT_SEQUENCE = [
  '> booting frontend.runtime v3.2.1',
  '> loading shaders…',
  '> initializing scroll engine…',
  '> ready',
]

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statementRef = useRef<HTMLHeadingElement>(null)
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineText, setCurrentLineText] = useState('')
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [isReady, setIsReady] = useState(false)

  // Runtime State
  const [config, setConfig] = useState({
      intensity: 1.0,
      speed: 0.2 // Speed not fully wired in shader yet, but ready
  })

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
          // REDUCED MOTION: Skip animations
          if (!isReady) {
            setDisplayedLines(BOOT_SEQUENCE)
            setCurrentLineIndex(BOOT_SEQUENCE.length)
            setIsReady(true)
            setConfig(prev => ({ ...prev, intensity: 2.0 }))

            // Simple fade in for statement
            gsap.to(statementRef.current, { opacity: 1, y: 0, duration: 0.5 })
          }
          // Disable scroll scrub for reduced motion
          if (ScrollTrigger.getById("heroScroll")) {
            ScrollTrigger.getById("heroScroll")?.kill()
          }
          return
      }

      // STANDARD MOTION
      // 1. Boot Sequence Logic
      if (currentLineIndex < BOOT_SEQUENCE.length) {
        const fullText = BOOT_SEQUENCE[currentLineIndex]
        const tl = gsap.timeline({
          onComplete: () => {
            setDisplayedLines((prev) => [...prev, fullText])
            setCurrentLineText('')
            setCurrentLineIndex((prev) => prev + 1)
          },
        })

        const chars = fullText.split('')
        const duration = 0.03 * chars.length // Speed up slightly

        let progress = { value: 0 }

        tl.to(progress, {
          value: chars.length,
          duration: duration,
          ease: 'none',
          onUpdate: () => {
             const charIndex = Math.floor(progress.value)
             setCurrentLineText(fullText.substring(0, charIndex))
          }
        })

        if (currentLineIndex > 0) {
            tl.delay(0.1)
        }
      } else {
        // Sequence Complete
        if (!isReady) {
            setIsReady(true)
            // Auto-boost intensity on ready
            setConfig(prev => ({ ...prev, intensity: 2.0 }))

            // Reveal Statement
            gsap.fromTo(statementRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 }
            )
        }
      }

      // 2. Scroll Animation (Parallax)
      if (isReady) {
         gsap.to(contentRef.current, {
             yPercent: 50,
             opacity: 0,
             scrollTrigger: {
                 id: "heroScroll", // Add an ID to easily kill it
                 trigger: containerRef.current,
                 start: "top top",
                 end: "bottom top",
                 scrub: true
             }
         })
      }

    },
    { dependencies: [currentLineIndex, isReady], scope: containerRef },
  )

  const handleConfigChange = (key: 'intensity' | 'speed', value: number) => {
      setConfig(prev => ({ ...prev, [key]: value }))
  }

  return (
    <>
    <div
      ref={containerRef}
      className="layout-section relative h-screen w-screen overflow-hidden bg-[#050505] text-[#e0e0e0] font-mono"
      role="banner"
      aria-label="Interactive Hero Section"
    >
      {/* Background Layer: WebGL Canvas */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
         <Canvas camera={{ position: [0, 0, 1] }}>
            <HeroShader intensity={config.intensity} />
         </Canvas>
      </div>

      {/* Noise Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.03] mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
           }}
           aria-hidden="true"
      />

      {/* Editor (Bottom Right) */}
      <div className={`absolute bottom-8 right-8 z-30 transition-all duration-1000 ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
         <RuntimeEditor config={config} onChange={handleConfigChange} />
      </div>

      {/* Foreground Layer: DOM Content */}
      <div ref={contentRef} className="relative z-20 flex h-full w-full flex-col items-center justify-center p-8">
        {/* Boot Console */}
        <div
            className={`flex flex-col space-y-2 text-sm md:text-base items-start transition-opacity duration-1000 ${isReady ? 'opacity-50' : 'opacity-100'}`}
            aria-live="polite"
        >
            {displayedLines.map((line, i) => (
                <div key={i} className="boot-line text-gray-500">
                    {line}
                </div>
            ))}

            {currentLineIndex < BOOT_SEQUENCE.length && (
                 <div className="boot-line text-gray-500">
                    {currentLineText}
                    <span className="animate-pulse inline-block w-2 h-4 bg-gray-500 ml-1 align-middle" aria-hidden="true"></span>
                 </div>
            )}

             {currentLineIndex >= BOOT_SEQUENCE.length && (
                <div className="boot-line text-accent mt-1">
                   <span className="animate-pulse inline-block w-2 h-4 bg-accent ml-1 align-middle" aria-hidden="true"></span>
                </div>
            )}
        </div>

        {/* Statement (Reveals after ready) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-4xl px-4 pointer-events-none">
             <h1 ref={statementRef} className="text-4xl md:text-7xl font-display font-bold text-white tracking-tighter opacity-0 translate-y-4">
                 Hello, I build experiences that run.
             </h1>
        </div>
      </div>
    </div>

    {/* Dummy Next Section for Scrolling */}
    <div className="h-screen bg-[#0a0a0a] flex items-center justify-center text-gray-600">
        placeholder for next section
    </div>
    </>
  )
}
