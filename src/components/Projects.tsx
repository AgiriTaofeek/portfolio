import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Lock } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'Bank9ja Web',
    category: 'Fintech / Web App',
    image: '/bank9ja-1.png',
    image2: '/bank9ja-2.png',
    link: 'https://bank9jaweb.9psb.com.ng/app',
    year: '2024',
  },
  {
    id: 2,
    title: 'Transaction Tool',
    category: 'Internal / Dashboard',
    image:
      'https://placehold.co/1200x800/050505/FFFFFF/png?text=Transaction+Monitoring',
    year: '2024',
  },
  {
    id: 3,
    title: 'Account Opening',
    category: 'Fintech / Onboarding',
    image:
      'https://placehold.co/1200x800/202020/FFFFFF/png?text=Account+Opening',
    year: '2023',
  },
  {
    id: 4,
    title: 'Corporate Platform',
    category: 'Enterprise / Banking',
    image:
      'https://placehold.co/1200x800/151515/FFFFFF/png?text=Corporate+Platform',
    year: '2025',
  },
]

export function Projects() {
  const container = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!track.current) return

      const totalWidth = track.current.scrollWidth
      const viewPortWidth = window.innerWidth

      // Horizontal scroll animation
      const scrollTween = gsap.to(track.current, {
        x: () => -(totalWidth - viewPortWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // Parallax effect for images
      const images = gsap.utils.toArray('.project-image') as HTMLElement[]
      images.forEach((img) => {
        gsap.to(img, {
          backgroundPosition: '100% 50%',
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            containerAnimation: scrollTween,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        })
      })
    },
    { scope: container },
  )

  return (
    <section ref={container} className="relative bg-background overflow-hidden">
      <div ref={track} className="flex h-screen w-fit">
        {/* Intro Slide */}
        <div className="w-screen h-screen flex flex-col justify-center px-12 md:px-24 shrink-0 border-r border-white/5">
          <h2 className="text-display font-display font-medium text-8xl md:text-9xl leading-none mb-6">
            SELECTED
            <br />
            <span className="text-muted-foreground opacity-50 ml-12">
              WORKS
            </span>
          </h2>
          <div className="flex items-center gap-4 text-mono text-sm text-accent mt-8">
            <span className="animate-pulse">●</span>
            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>

        {/* Project Slides */}
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={`w-[85vw] md:w-[60vw] h-screen shrink-0 relative flex flex-col justify-center px-8 md:px-12 group ${project.link ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={() => project.link && window.open(project.link, '_blank')}
          >
            <div
              className={`relative w-full aspect-4/3 md:aspect-16/10 overflow-hidden grayscale-50 transition-all duration-700 ease-out border border-white/10 ${project.link ? 'group-hover:grayscale-0 group-hover:border-accent/50' : 'group-hover:border-white/20'}`}
            >
              <div
                className="project-image absolute inset-0 bg-cover bg-center scale-110 group-hover:scale-100 transition-transform duration-1000"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              {/* Secondary Image for Hover Reveal */}
              {/* Force type casting for image2 since we aren't using a strict interface yet */}
              {(project as any).image2 && (
                <div
                  className="project-image absolute inset-0 bg-cover bg-center scale-110 group-hover:scale-100 transition-all duration-1000 opacity-0 group-hover:opacity-100"
                  style={{ backgroundImage: `url(${(project as any).image2})` }}
                />
              )}

              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />

              {/* Overlay Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-xs font-mono text-white rounded-full">
                    {project.year}
                  </span>

                  {project.link ? (
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-110 relative group/btn cursor-pointer">
                      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-full group-hover/btn:-translate-y-full">
                        <span className="transform -rotate-45">→</span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center -translate-x-full translate-y-full transition-transform duration-300 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0">
                        <span className="transform -rotate-45">→</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/50">
                      <Lock className="w-3 h-3" />
                      <span className="text-xs font-mono uppercase tracking-widest">
                        Confidential
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-start">
              <span className="font-mono text-xs text-accent mb-3 block tracking-widest uppercase">
                0{i + 1} — {project.category}
              </span>
              <h3 className="text-5xl md:text-6xl font-display font-medium leading-[0.9] text-white/50 group-hover:text-white transition-colors duration-300">
                {project.title}
              </h3>
            </div>
          </div>
        ))}

        {/* Outro Space */}
        <div className="w-screen h-screen shrink-0 flex items-center justify-center border-r border-white/5">
          <p className="font-display text-4xl text-muted-foreground/20">
            [ END OF LIST ]
          </p>
        </div>
      </div>
    </section>
  )
}
