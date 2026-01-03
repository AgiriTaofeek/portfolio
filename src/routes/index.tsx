import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/Hero'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}
