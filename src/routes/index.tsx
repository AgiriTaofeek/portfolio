import { Hero } from '@/components/Hero'
import { createFileRoute } from '@tanstack/react-router'
import { NavigationProvider, useNavigation } from '../components/NavigationManager'
import { CommandPalette } from '../components/CommandPalette'
import { Projects, About, Experiments, Contact } from '../components/Sections'

export const Route = createFileRoute('/')({ component: App })

function Content() {
  const { activeState } = useNavigation()

  switch (activeState) {
    case 'projects': return <Projects />
    case 'about': return <About />
    case 'experiments': return <Experiments />
    case 'contact': return <Contact />
    case 'home':
    default:
      return <Hero />
  }
}

function App() {
  return (
   <NavigationProvider>
     <Content />
     <CommandPalette />
   </NavigationProvider>
  )
}
