import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const skills = [
  { name: 'React', level: 95 },
  { name: 'GSAP', level: 90 },
  { name: 'WebGL', level: 85 },
  { name: 'TypeScript', level: 95 },
  { name: 'Node.js', level: 80 },
  { name: 'Tailwind', level: 95 },
]

export function Skills() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // Placeholder for physics simulation
      gsap.from('.skill-badge', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
        },
      })
    },
    { scope: container },
  )

  return (
    <section
      ref={container}
      className="py-40 bg-background relative z-10 border-t border-white/5"
    >
      <div className="container mx-auto text-center mb-24">
        <h2 className="text-display font-display font-medium text-transparent bg-clip-text bg-linear-to-b from-white to-white/40 mb-6">
          ARSENAL
        </h2>
        <p className="text-body text-muted-foreground font-mono uppercase tracking-widest text-xs opacity-70">
          [ Core Capabilities ]
        </p>
      </div>

      <div className="container mx-auto relative h-[700px] border border-white/5 rounded-3xl bg-surface/20 backdrop-blur-md overflow-hidden flex items-center justify-center shadow-2xl shadow-black/50">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px]" />

        {/* Physics Container Placeholder */}
        <div className="flex flex-wrap gap-6 justify-center max-w-4xl p-12 relative z-10">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="skill-badge px-8 py-4 rounded-full bg-surface border border-white/10 text-foreground font-mono text-sm tracking-wider backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-accent hover:text-accent hover:shadow-[0_0_30px_-5px_var(--color-accent-glow)] cursor-none"
            >
              <span className="opacity-50 mr-2 text-xs">
                0{Math.floor(Math.random() * 9)}
              </span>
              {skill.name}
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 right-6 text-[10px] text-muted-foreground/40 font-mono tracking-widest uppercase">
          // Simulation _ Active
        </div>
      </div>
    </section>
  )
}
