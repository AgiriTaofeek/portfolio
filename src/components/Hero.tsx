import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function Hero() {
  const container = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      if (!titleRef.current) return

      const tl = gsap.timeline()

      tl.from(titleRef.current, {
        y: 120,
        opacity: 0,
        duration: 1.8,
        ease: 'power3.out',
        skewY: 5,
      }).to(
        titleRef.current,
        {
          backgroundImage: 'linear-gradient(to right, #ffffff, #888888)',
          duration: 2,
        },
        '-=1',
      )
    },
    { scope: container },
  )

  return (
    <section
      ref={container}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* Background Placeholder for WebGL */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] opacity-40 mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-secondary/10 rounded-full blur-[140px] opacity-30 mix-blend-screen" />
      </div>

      <div className="container mx-auto relative z-10 text-center px-4">
        <div className="overflow-hidden mb-6">
          <p className="text-mono text-accent text-sm tracking-[0.2em] uppercase opacity-80 mb-4 animate-fade-in">
            [ The Void ]
          </p>
        </div>

        <h1
          ref={titleRef}
          className="text-display font-display font-medium leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-white/50 py-4"
        >
          DEVVERSE
        </h1>

        <div className="mt-8 opacity-0 animate-fade-in delay-1000 max-w-xl mx-auto">
          <p className="text-body text-muted-foreground font-light text-balance">
            Crafting digital experiences at the edge of possibility. <br />
            <span className="text-white">Frontend Craftsman</span> ×{' '}
            <span className="text-white">Creative Developer</span>
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <div className="w-px h-12 bg-linear-to-b from-transparent via-white/20 to-transparent" />
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Scroll
          </span>
        </div>
      </div>
    </section>
  )
}
