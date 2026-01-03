import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useForm, ValidationError } from '@formspree/react'
import { Loader2, CheckCircle2 } from 'lucide-react'

export function Contact() {
  const container = useRef<HTMLElement>(null)

  // Formspree Hook
  const [state, handleSubmit] = useForm('mzdzjzqn')

  const [showSuccess, setShowSuccess] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [time, setTime] = useState(new Date())

  // Clock effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Watch for success state from Formspree
  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true)
      setFormState({ name: '', email: '', message: '' })
      const timer = setTimeout(() => setShowSuccess(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [state.succeeded])

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
      <div className="container mx-auto grid md:grid-cols-2 gap-20 items-center px-6">
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

          <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-md contact-anim"
          >
            <div className="group">
              <label
                htmlFor="name"
                className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest group-focus-within:text-accent transition-colors"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className="w-full bg-transparent border-b border-white/20 py-4 focus:border-accent focus:outline-none transition-all text-xl font-display placeholder:text-white/10"
                placeholder="_John Doe"
                disabled={state.submitting}
                required
              />
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="group">
              <label
                htmlFor="email"
                className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest group-focus-within:text-accent transition-colors"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="w-full bg-transparent border-b border-white/20 py-4 focus:border-accent focus:outline-none transition-all text-xl font-display placeholder:text-white/10"
                placeholder="_john@example.com"
                disabled={state.submitting}
                required
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="group">
              <label
                htmlFor="message"
                className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest group-focus-within:text-accent transition-colors"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                className="w-full bg-transparent border-b border-white/20 py-4 focus:border-accent focus:outline-none transition-all text-xl font-display placeholder:text-white/10 resize-none h-32"
                placeholder="_Project Details..."
                disabled={state.submitting}
                required
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={state.submitting || showSuccess}
              className={`px-10 py-4 font-bold font-display uppercase tracking-widest transition-all duration-300 ml-0 clip-path-slant relative overflow-hidden group
               ${showSuccess ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-white text-black hover:bg-accent hover:text-black'}`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {state.submitting && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                {showSuccess && <CheckCircle2 className="w-4 h-4" />}

                {!state.submitting && !showSuccess && 'Initialize Signal'}
                {state.submitting && 'Transmitting...'}
                {showSuccess && 'Signal Sent'}
              </span>
            </button>
          </form>
        </div>

        <div className="h-full min-h-[500px] bg-white/5 rounded-2xl p-8 border border-white/10 contact-anim flex flex-col relative overflow-hidden backdrop-blur-md">
          {/* Dashboard Header */}
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">
                [ System Status ]
              </span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-bold text-white tracking-wider">
                  ONLINE
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">
                [ Grid Ref ]
              </span>
              <span className="text-sm font-mono text-accent">
                06°30'N, 03°24'E
              </span>
            </div>
          </div>

          {/* Clock & Info Grid */}
          <div className="grid grid-cols-1 gap-8 relative z-10 mb-auto">
            <div className="p-6 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-colors">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-4">
                Local Time _ Lagos, NG
              </span>
              <div className="text-5xl md:text-6xl font-display font-light text-white tabular-nums tracking-tighter">
                {time.toLocaleTimeString('en-US', {
                  timeZone: 'Africa/Lagos',
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </div>
            </div>
          </div>

          {/* Social Uplink */}
          <div className="relative z-10 mt-12 grid grid-cols-2 gap-4">
            <a
              href="https://github.com/taofeek-agiri"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <span className="text-sm font-mono text-muted-foreground group-hover:text-white transition-colors">
                GitHub
              </span>
              <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/agiri-taofeek/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <span className="text-sm font-mono text-muted-foreground group-hover:text-white transition-colors">
                LinkedIn
              </span>
              <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-blue-400 transition-colors" />
            </a>
            <a
              href="https://twitter.com/taofeek_agiri"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <span className="text-sm font-mono text-muted-foreground group-hover:text-white transition-colors">
                Twitter / X
              </span>
              <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
            </a>
            <a
              href="mailto:taofeeqomotolani@gmail.com"
              className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <span className="text-sm font-mono text-muted-foreground group-hover:text-white transition-colors">
                Email
              </span>
              <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-accent transition-colors" />
            </a>
          </div>

          {/* Background Decoration */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[32px_32px] opacity-20" />
          </div>
        </div>
      </div>
    </section>
  )
}
