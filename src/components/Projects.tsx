import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

const projects = [
  {
    id: 1,
    title: 'Neon Financial',
    category: 'Fintech / WebGL',
    image:
      'https://placehold.co/1200x800/101010/FFFFFF/png?text=Neon+Financial',
  },
  {
    id: 2,
    title: 'Aero Systems',
    category: 'Aerospace / Dashboard',
    image: 'https://placehold.co/1200x800/050505/FFFFFF/png?text=Aero+Systems',
  },
  {
    id: 3,
    title: 'Lumina Art',
    category: 'E-commerce / 3D',
    image: 'https://placehold.co/1200x800/202020/FFFFFF/png?text=Lumina+Art',
  },
]

export function Projects() {
  const container = useRef<HTMLElement>(null)

  // Placeholder for horizontal scroll logic
  useGSAP(
    () => {
      // Implementation to come: ScrollTrigger horizontal scroll
    },
    { scope: container },
  )

  return (
    <section
      ref={container}
      className="py-40 bg-background overflow-hidden relative z-10"
    >
      <div className="container mx-auto mb-20 flex items-end justify-between border-b border-white/10 pb-8">
        <div>
          <h2 className="text-display font-display font-medium text-white leading-none">
            WORKS
          </h2>
          <p className="font-mono text-accent text-sm mt-2">
            [ Selected Cases _ 2024-26 ]
          </p>
        </div>
        <div className="hidden md:block">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
            <div className="w-3 h-3 rounded-full bg-accent/20" />
            <div className="w-3 h-3 rounded-full bg-accent/20" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-32 container mx-auto">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="group relative w-full aspect-video md:aspect-[2.33/1] bg-surface overflow-hidden rounded-sm cursor-none border border-white/5"
          >
            {/* Project Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/60 backdrop-blur-sm pointer-events-none">
              <h3 className="text-6xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-linear-to-b from-white to-white/0 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                {project.title}
              </h3>
              <div className="mt-4 flex items-center gap-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-100 ease-out">
                <span className="px-3 py-1 border border-accent text-accent font-mono text-xs uppercase bg-accent/10">
                  {project.category}
                </span>
                <span className="text-white font-mono text-xs uppercase tracking-widest">
                  View Case
                </span>
              </div>
            </div>

            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105 group-hover:grayscale-[0.5]"
            />

            {/* Minimal Info Always Visible */}
            <div className="absolute bottom-6 left-6 z-10 mix-blend-difference group-hover:opacity-0 transition-opacity duration-300">
              <span className="font-mono text-white text-4xl font-bold">
                0{i + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
