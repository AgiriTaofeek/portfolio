import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export function Contact() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.contact-anim', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
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
      <div className="container mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div>
          <div className="overflow-hidden">
            <h2 className="text-display font-display leading-[0.8] mb-6 contact-anim">
              LET'S
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-accent-secondary">
                TALK
              </span>
            </h2>
          </div>
          <p className="text-body text-muted-foreground mb-12 contact-anim max-w-md">
            The future is built by those who dare to break the grid. <br />
            Let's build something impossible.
          </p>

          <div className="mb-12 contact-anim space-y-2">
            <a
              href="mailto:taofeeqomotolani@gmail.com"
              className="block text-xl text-white hover:text-accent transition-colors"
            >
              taofeeqomotolani@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/agiri-taofeek/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-mono text-muted-foreground hover:text-accent transition-colors"
            >
              linkedin.com/in/agiri-taofeek
            </a>
          </div>

          <form className="space-y-6 max-w-md contact-anim">
            <div className="group">
              <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest group-focus-within:text-accent transition-colors">
                Name
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-white/20 py-4 focus:border-accent focus:outline-none transition-all text-xl font-display placeholder:text-white/10"
                placeholder="_John Doe"
              />
            </div>
            <div className="group">
              <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest group-focus-within:text-accent transition-colors">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-white/20 py-4 focus:border-accent focus:outline-none transition-all text-xl font-display placeholder:text-white/10"
                placeholder="_john@example.com"
              />
            </div>
            <button className="px-10 py-4 bg-white text-black font-bold font-display uppercase tracking-widest hover:bg-accent hover:text-black transition-all duration-300 mt-8 clip-path-slant relative overflow-hidden group">
              <span className="relative z-10">Initialize Signal</span>
            </button>
          </form>
        </div>

        <div className="h-full min-h-[500px] bg-surface rounded-sm p-1 border border-white/5 contact-anim flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(112,0,255,0.05),transparent)]" />

          {/* Mock Terminal/Playground UX */}
          <div className="w-full h-8 bg-white/5 flex items-center px-4 gap-2 border-b border-white/5">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="text-[10px] font-mono text-muted-foreground ml-4">
              devverse_playground.exe
            </div>
          </div>

          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-display mb-2">Physics Sandbox</h3>
            <p className="text-xs font-mono text-accent mb-8">
              [ System Offline _ Coming Soon ]
            </p>

            <div className="w-full max-w-xs h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-accent w-1/3 animate-[shimmer_2s_infinite_linear]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
