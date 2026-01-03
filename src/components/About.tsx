import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function About() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.timeline-item', {
        opacity: 0,
        x: -50,
        stagger: 0.2,
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
        },
      })
    },
    { scope: container },
  )

  return (
    <section
      ref={container}
      className="py-32 bg-surface text-foreground relative z-10 border-t border-white/5"
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-display font-display leading-[0.8] mb-12">
            THE
            <br />
            <span className="text-muted-foreground opacity-50">JOURNEY</span>
          </h2>
          <p className="text-body text-muted-foreground mb-12 max-w-md text-balance">
            Architecture is not just about code. It is about the{' '}
            <span className="text-accent">symbiosis</span> of performance,
            accessibility, and sheer visual dominance.
          </p>

          <div className="space-y-12 border-l border-white/10 pl-8 ml-2">
            {[
              {
                year: '2024 - Present',
                role: 'Frontend Developer',
                company: '9 Payment Service Bank (9PSB)',
              },
              {
                year: '2022',
                role: 'B.Sc. Physics (Electronics)',
                company: 'University of Lagos',
              },
            ].map((item, i) => (
              <div key={i} className="timeline-item relative group">
                <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-surface border border-muted-foreground group-hover:bg-accent group-hover:border-accent transition-colors duration-300" />
                <h3 className="text-2xl font-bold font-display text-foreground group-hover:translate-x-2 transition-transform duration-300">
                  {item.role}
                </h3>
                <p className="text-sm font-mono text-accent mt-1">
                  {item.company}
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1 font-mono tracking-widest">
                  {item.year}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative bg-background/50 rounded-sm p-8 border border-white/5 backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-4 font-mono text-xs text-muted-foreground">
            [ 002 _ PHILOSOPHY ]
          </div>

          <h3 className="text-3xl font-display mb-6 mt-8">Core Tenets</h3>
          <ul className="space-y-4 mb-12">
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-accent mt-1">/</span>
              <span>
                User experience is the only metric that truly matters.
              </span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-accent mt-1">/</span>
              <span>Performance is not a feature, it is the baseline.</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="text-accent mt-1">/</span>
              <span>Code quality today determines velocity tomorrow.</span>
            </li>
          </ul>

          {/* Placeholder for Radar Chart */}
          <div className="w-full aspect-square bg-linear-to-br from-surface to-background rounded-full flex items-center justify-center border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[32px_32px]" />
            <div className="w-1/2 h-1/2 bg-accent/20 blur-[80px]" />
            <span className="text-xs font-mono text-accent relative z-10 animate-pulse">
              _Initializing Metrics
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
