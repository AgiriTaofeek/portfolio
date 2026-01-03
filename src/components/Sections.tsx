export function Projects() {
  return (
    <div className="layout-section min-h-screen w-screen bg-[#080808] flex items-center justify-center p-20">
      <div className="max-w-4xl w-full">
        <h2 className="text-6xl font-display font-bold text-white mb-8 shared-element">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white/5 border border-white/10 aspect-video rounded-lg p-6 hover:bg-white/10 transition-colors">
                    <h3 className="text-xl text-white mb-2">Project {i}</h3>
                    <p className="text-gray-500 text-sm">A webgl experiment aimed at disrupting the status quo.</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

import { SkillsGraph } from './SkillsGraph'

export function About() {
  return <SkillsGraph />
}

export function Experiments() {
  return (
     <div className="layout-section min-h-screen w-screen bg-[#050505] flex items-center justify-center">
         <h2 className="text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 shared-element">Experiments</h2>
    </div>
  )
}

export function Contact() {
    return (
       <div className="layout-section min-h-screen w-screen bg-black flex items-center justify-center">
           <h2 className="text-6xl font-display font-bold text-white mb-8 shared-element">Contact</h2>
      </div>
    )
  }
