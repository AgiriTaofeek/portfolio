import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // Animate text reveal
      gsap.from('.manifesto-text', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 60%',
        },
      })

      // Animate timeline items
      gsap.from('.timeline-entry', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 70%',
        },
      })
    },
    { scope: container },
  )

  return (
    <section
      ref={container}
      className="relative py-32 md:py-48 bg-surface text-foreground z-10 border-t border-white/5 overflow-hidden"
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        {/* Left Column - Sticky Manifesto */}
        <div className="md:col-span-5 relative">
          <div className="md:sticky md:top-32">
            <span className="font-mono text-xs text-accent uppercase tracking-widest mb-8 block">
              [ 002 — The Journey ]
            </span>

            <h2 className="text-4xl md:text-5xl font-display font-light leading-[1.1] mb-12 text-balance">
              <span className="manifesto-text inline-block">Refining</span>{' '}
              <span className="manifesto-text inline-block">complexity</span>{' '}
              <span className="manifesto-text inline-block">into</span>{' '}
              <span className="manifesto-text inline-block text-white">
                clarity
              </span>
              .
            </h2>

            <div className="space-y-6 text-muted-foreground font-light text-lg leading-relaxed max-w-sm">
              <p className="manifesto-text">
                My work is a dialogue between the precise logic of code and the
                fluid nature of human interaction.
              </p>
              <p className="manifesto-text">
                Every pixel is intentional. Every interaction is calculated. Not
                just to be seen, but to be felt.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Timeline Stream */}
        <div className="md:col-span-7 timeline-container pt-8 md:pt-32">
          <div className="relative border-l border-white/10 pl-12 space-y-24">
            {[
              {
                year: '2024 — Present',
                role: 'Frontend Developer',
                company: '9 Payment Service Bank (9PSB)',
                description:
                  'Architecting the next generation of financial interfaces. Building scalable design systems and high-performance web applications that serve millions.',
              },
              {
                year: '2023',
                role: 'Intern / Student',
                company: 'Zuri Team',
                description:
                  'Intensive full-stack development training. Collaborated on real-world projects, mastered modern workflows, and sharpened problem-solving skills in a fast-paced environment.',
              },
              {
                year: '2022',
                role: 'B.Sc. Physics (Electronics)',
                company: 'University of Lagos',
                description:
                  'The foundation of my engineering mindset. Understanding systems, signals, and the fundamental laws that govern our reality.',
              },
            ].map((item, i) => (
              <div key={i} className="timeline-entry relative group">
                {/* Marker */}
                <div className="absolute -left-[53px] top-2 w-2 h-2 rounded-full bg-surface border border-white/20 group-hover:bg-accent group-hover:border-accent group-hover:scale-150 transition-all duration-300" />

                <span className="font-mono text-xs text-accent mb-2 block tracking-wider">
                  {item.year}
                </span>
                <h3 className="text-3xl font-display text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                  {item.role} @{' '}
                  <span className="text-muted-foreground">{item.company}</span>
                </h3>
                <p className="text-muted-foreground/80 leading-relaxed max-w-xl group-hover:text-white/80 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
