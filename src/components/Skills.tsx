import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const skillCategories = [
  {
    title: 'Frontend Architecture',
    skills: [
      'React',
      'Next.js',
      'React Router',
      'TanStack Start',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'GSAP',
      'Shadcn UI',
      'React Native',
    ],
    colSpan: 'md:col-span-2',
    bg: 'from-blue-500/10 to-purple-500/10',
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Golang', 'Firebase', 'PostgreSQL'],
    colSpan: 'md:col-span-1',
    bg: 'from-emerald-500/10 to-teal-500/10',
  },
  {
    title: 'Tools & DevOps',
    skills: ['Git', 'Docker', 'Vite', 'Turborepo', 'Figma'],
    colSpan: 'md:col-span-1',
    bg: 'from-orange-500/10 to-red-500/10',
  },
  {
    title: 'Core Fundamentals',
    skills: [
      'JavaScript (ES6+)',
      'HTML5',
      'CSS3',
      'Accessibility',
      'Performance',
    ],
    colSpan: 'md:col-span-2',
    bg: 'from-pink-500/10 to-rose-500/10',
  },
]

export function Skills() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // Spotlight Effect
      const cards = document.querySelectorAll('.bento-card')

      const handleMouseMove = (e: MouseEvent) => {
        cards.forEach((card) => {
          const rect = (card as HTMLElement).getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top

          ;(card as HTMLElement).style.setProperty('--mouse-x', `${x}px`)
          ;(card as HTMLElement).style.setProperty('--mouse-y', `${y}px`)
        })
      }

      window.addEventListener('mousemove', handleMouseMove)

      // Intro Animation
      gsap.from('.bento-card', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
        },
      })

      return () => window.removeEventListener('mousemove', handleMouseMove)
    },
    { scope: container },
  )

  return (
    <section
      ref={container}
      className="relative py-32 md:py-48 bg-background overflow-hidden"
    >
      {/* Section Header */}
      <div className="container mx-auto px-6 md:px-12 mb-24">
        <h2 className="text-[12vw] leading-[0.8] font-display font-medium text-transparent bg-clip-text bg-linear-to-b from-white to-white/20">
          THE
          <br />
          <span className="ml-[10vw]">ARSENAL</span>
        </h2>
        <div className="mt-8 flex justify-end border-t border-white/10 pt-4">
          <p className="font-mono text-xs md:text-sm text-muted-foreground uppercase tracking-widest max-w-md text-right">
            A curated stack of technologies used to build scalable,
            high-performance applications.
          </p>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <div
              key={i}
              className={`bento-card group relative p-px rounded-3xl overflow-hidden ${category.colSpan}`}
            >
              {/* Spotlight Border */}
              <div
                className="absolute inset-0 z-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15), transparent 40%)`,
                }}
              />

              {/* Card Content */}
              <div
                className={`relative z-10 h-full w-full bg-surface/50 backdrop-blur-xl rounded-[23px] p-8 md:p-10 border border-white/5 transition-colors duration-500 group-hover:border-white/10`}
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${category.bg} opacity-0 group-hover:opacity-20 transition-opacity duration-700`}
                />

                <h3 className="font-display text-2xl md:text-3xl text-white mb-8 relative z-20">
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-3 relative z-20">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-mono text-muted-foreground transition-all duration-300 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
