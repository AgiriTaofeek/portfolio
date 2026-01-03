import { createContext, useContext, useState, ReactNode, useRef } from 'react'
import { gsap } from 'gsap'
import { Flip } from 'gsap/all'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(Flip)

export type NavState = 'home' | 'projects' | 'about' | 'experiments' | 'contact'

type NavigationContextType = {
  activeState: NavState
  navigateTo: (target: NavState) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeState, setActiveState] = useState<NavState>('home')
  const containerRef = useRef<HTMLDivElement>(null)

  // Placeholder logic for standard FLIP deleted. See navigateToWithFlip below.

  // Handle the FLIP animation when activeState changes
  useGSAP(() => {
     // NOTE: We can't easily capture "previous" state inside the effect *after* it changed without refs.
     // So robust FLIP in React often requires capturing *before* set state (which we did inside navigateTo)
     // but we need to pass that 'state' object to this effect or use a ref to hold it.
  }, [activeState])

  // REVISED APPROACH for React + FLIP:
  // 1. Capture state immediately in `navigateTo` and store in a ref.
  // 2. Triggers re-render.
  // 3. `useGSAP` (useLayoutEffect) runs after render.
  // 4. `Flip.from(storedStateRef.current)`

  const previousStateRef = useRef<Flip.FlipState | null>(null)

  // Hash-based URL Sync
  useGSAP(() => {
     const handleHashChange = () => {
         const hash = window.location.hash.replace('#/', '') as NavState
         if (hash && hash !== activeState && ['home', 'projects', 'about', 'experiments', 'contact'].includes(hash)) {
             navigateToWithFlip(hash)
         }
     }

     // Initial Logic
     handleHashChange()

     window.addEventListener('hashchange', handleHashChange)
     return () => window.removeEventListener('hashchange', handleHashChange)
  }, []) // Empty deps - verify logic to avoid loops

  const navigateToWithFlip = (target: NavState) => {
       if (activeState === target) return

       const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

       // 1. Capture State (Only if not reduced motion)
       if (!prefersReducedMotion) {
           // We target a specific class .layout-section that all our "pages" will share or be contained in
           const state = Flip.getState('.layout-section, .shared-element')
           previousStateRef.current = state
       }

       // 2. Update React State
       setActiveState(target)

       // 3. Update Hash
       // Update hash silently? Or just update it.
       // If we update hash, the listener above fires BUT we check activeState === target so it should be fine.
       // We use history.pushState to avoid triggering hashchange immediately if possible/desired, but straight assign is easier.
       // Actually, let's just pushState to effectively change it.
       if (window.location.hash.replace('#/', '') !== target) {
           window.history.pushState(null, '', `#/${target === 'home' ? '' : target}`)
       }
  }

  useGSAP(() => {
      // Standard FLIP Motion
      if (previousStateRef.current) {
          Flip.from(previousStateRef.current, {
              duration: 1.1,
              ease: "expo.inOut",
              absolute: true, // This allows elements to overlap during transition if layout changes drastically
              stagger: 0.02,
              onComplete: () => {
                  previousStateRef.current = null
              }
          })
      }
  }, { scope: containerRef, dependencies: [activeState] })


  return (
    <NavigationContext.Provider value={{ activeState, navigateTo: navigateToWithFlip }}>
      <div ref={containerRef} className="relative w-full h-full">
         {children}
      </div>
    </NavigationContext.Provider>
  )
}
