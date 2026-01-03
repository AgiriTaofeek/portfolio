import { useState, useEffect, useRef } from 'react'
import { useNavigation, NavState } from './NavigationManager'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Search, Command } from 'lucide-react'

const COMMANDS: { id: NavState; label: string; desc: string }[] = [
  { id: 'projects', label: 'Projects', desc: 'View my work' },
  { id: 'about', label: 'About', desc: 'Who I am' },
  { id: 'experiments', label: 'Experiments', desc: 'Code sketches & fun' },
  { id: 'contact', label: 'Contact', desc: 'Get in touch' },
  { id: 'home', label: 'Home', desc: 'Return to start' },
]

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { navigateTo } = useNavigation()
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Filter commands
  const filteredCommands = COMMANDS.filter(cmd =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.desc.toLowerCase().includes(query.toLowerCase())
  )

  // Toggle Logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Navigation Logic within Palette
  const executeCommand = (id: NavState) => {
      navigateTo(id)
      setIsOpen(false)
      setQuery('')
  }

  useGSAP(() => {
     if (isOpen) {
         gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 })
         gsap.fromTo(contentRef.current,
            { scale: 0.95, opacity: 0, y: 10 },
            { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
         )
     }
  }, { dependencies: [isOpen] })

  // Touch Toggle
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 2) {
            e.preventDefault()
            setIsOpen(prev => !prev)
        }
    }
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    return () => window.removeEventListener('touchstart', handleTouchStart)
  }, [])

  // Voice Recognition (Simple)
  const [isListening, setIsListening] = useState(false)

  const toggleVoice = () => {
      if (!('webkitSpeechRecognition' in window)) {
          alert('Voice navigation not supported in this browser.')
          return
      }

      if (isListening) return // Already listening logic handled by end event usually but...

      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.lang = 'en-US'
      recognition.interimResults = false

      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)

      recognition.onresult = (event: any) => {
          const command = event.results[0][0].transcript.toLowerCase()
          console.log('Voice Command:', command)

          if (command.includes('project')) executeCommand('projects')
          else if (command.includes('about')) executeCommand('about')
          else if (command.includes('experiment')) executeCommand('experiments')
          else if (command.includes('contact')) executeCommand('contact')
          else if (command.includes('home')) executeCommand('home')
          else {
             setQuery(command) // Just type it in
          }
      }

      recognition.start()
  }

  if (!isOpen) return null

  return (
    <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
    >
      <div
        ref={contentRef}
        className="w-full max-w-lg bg-[#0a0a0a]/90 border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center px-4 py-3 border-b border-white/10">
          <Command className="w-5 h-5 text-gray-500 mr-3" />
          <input
            autoFocus
            type="text"
            placeholder="What would you like to do?"
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600 font-mono text-lg"
            value={query}
            onChange={e => {
                setQuery(e.target.value)
                setSelectedIndex(0)
            }}
            onKeyDown={e => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1))
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    setSelectedIndex(i => Math.max(i - 1, 0))
                }
                if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
                    executeCommand(filteredCommands[selectedIndex].id)
                }
            }}
          />
          {/* Voice Trigger */}
          <button
             onClick={toggleVoice}
             className={`ml-2 p-1.5 rounded-full transition-colors ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'hover:bg-white/10 text-gray-500'}`}
             title="Voice Command"
          >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
          </button>
        </div>

        {/* List */}
        <div className="max-h-[300px] overflow-y-auto py-2">
            {filteredCommands.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500 text-sm">No commands found.</div>
            ) : (
                filteredCommands.map((cmd, i) => (
                    <div
                        key={cmd.id}
                        className={`px-4 py-3 flex items-center cursor-pointer transition-colors ${i === selectedIndex ? 'bg-white/10' : 'hover:bg-white/5'}`}
                        onClick={() => executeCommand(cmd.id)}
                        onMouseEnter={() => setSelectedIndex(i)}
                    >
                        <Search className={`w-4 h-4 mr-3 ${i === selectedIndex ? 'text-white' : 'text-gray-500'}`} />
                        <div className="flex flex-col">
                            <span className={`text-sm font-medium ${i === selectedIndex ? 'text-white' : 'text-gray-300'}`}>{cmd.label}</span>
                            <span className="text-xs text-gray-500">{cmd.desc}</span>
                        </div>
                         {i === selectedIndex && (
                            <span className="ml-auto text-xs text-gray-500 bg-white/10 px-1.5 py-0.5 rounded">↵</span>
                        )}
                    </div>
                ))
            )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-white/5 border-t border-white/5 flex justify-between text-[10px] text-gray-500">
           <span>Navigate with arrows</span>
           <span>↵ Select</span>
        </div>
      </div>
    </div>
  )
}
