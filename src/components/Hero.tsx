import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function SplitText({
  children,
  className = '',
}: {
  children: string
  className?: string
}) {
  return (
    <span className={`${className} inline-flex overflow-hidden`}>
      {children.split('').map((char, i) => (
        <span
          key={i}
          className="hero-char inline-block translate-y-[110%] opacity-0"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export function Hero() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Premium Reveal - Staggered Characters
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.to('.hero-char', {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        y: 0,
        duration: 1.2,
        stagger: 0.04,
        ease: 'back.out(1.2)',
      })

      // Subtext reveal
      tl.to(
        '.hero-subtext',
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.8',
      )

      // Scroll Indicator reveal
      tl.to(
        '.scroll-indicator',
        {
          opacity: 0.6,
          duration: 1,
        },
        '-=0.8',
      )

      // ID Tag Drop
      tl.to(
        '.hanging-tag-container',
        {
          y: 350, // Drop down into view
          duration: 2.5,
          ease: 'elastic.out(1, 0.4)',
        },
        '+=0.2',
      )

      // Secondary Swing
      tl.fromTo(
        '.tag-card',
        { rotation: 15 },
        {
          rotation: 0,
          duration: 3,
          ease: 'elastic.out(1, 0.2)',
        },
        '-=2.2',
      )

      // Kinetic Mouse Effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const xPos = (clientX / window.innerWidth - 0.5) * 15
        const yPos = (clientY / window.innerHeight - 0.5) * 15

        gsap.to('.hero-title-container', {
          rotationY: xPos,
          rotationX: -yPos,
          duration: 1.2,
          ease: 'power2.out',
        })

        // Parallax for ID Tag (swinging effect)
        gsap.to('.hanging-tag-container', {
          x: -xPos * 2,
          rotationZ: xPos,
          duration: 1.5,
          ease: 'power2.out',
        })
      }

      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    },
    { scope: container },
  )

  return (
    <section
      ref={container}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background perspective-1000"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-secondary/5 rounded-full blur-[140px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px] opacity-20" />
      </div>

      <div className="relative z-10 w-full px-4 md:px-10 flex flex-col items-center justify-center cursor-default">
        <div className="hero-title-container transform-style-3d relative">
          <h1 className="flex flex-col items-center justify-center leading-[0.85] font-display font-bold tracking-tighter text-white select-none">
            <div className="overflow-hidden mb-[-2vw]">
              <SplitText className="text-[15vw] md:text-[min(14vw,250px)] leading-none">
                AGIRI
              </SplitText>
            </div>
            <div className="overflow-hidden">
              <SplitText className="text-[15vw] md:text-[min(14vw,250px)] leading-none text-white/50">
                TAOFEEK
              </SplitText>
            </div>
          </h1>
        </div>

        <div className="hero-subtext opacity-0 translate-y-10 mt-12 max-w-2xl text-center mix-blend-difference">
          <p className="text-lg md:text-xl text-muted-foreground font-light text-balance leading-relaxed">
            Building scalable frontend applications at the edge of possibility.{' '}
            <br className="hidden md:block" />
            <span className="text-white font-medium">
              Frontend Developer
            </span>{' '}
            based in Lagos, Nigeria.
          </p>
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
        <div className="w-px h-12 bg-linear-to-b from-transparent via-white/40 to-transparent animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Scroll
        </span>
      </div>

      {/* Hanging ID Tag - Moved to Section Level */}
      <div className="hanging-tag-container absolute -top-[450px] left-[5%] md:left-[10%] z-20 flex flex-col items-center">
        <div className="rope h-[120px] md:h-[300px] w-px bg-linear-to-b from-white/0 via-white/20 to-white/40 origin-top" />
        <div className="tag-card w-[100px] h-[140px] rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-2 origin-top shadow-2xl transform-gpu">
          <div className="w-full h-full rounded-lg overflow-hidden relative group">
            <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent pointer-events-none z-10" />
            <img
              src="https://github.com/taofeek-agiri.png"
              alt="ID"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
            />
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 z-20 opacity-50">
            <div className="w-1 h-1 rounded-full bg-white" />
            <div className="w-8 h-0.5 bg-white rounded-full my-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
