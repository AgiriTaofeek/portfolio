type EditorProps = {
  config: {
    intensity: number
    speed: number
  }
  onChange: (key: 'intensity' | 'speed', value: number) => void
}

export function RuntimeEditor({ config, onChange }: EditorProps) {
  return (
    <div className="hidden md:flex flex-col w-64 bg-[#0a0a0a]/90 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden font-mono text-xs shadow-2xl">
      {/* Header */}
      <div className="flex items-center px-3 py-2 border-b border-white/10 bg-white/5">
        <div className="flex space-x-1.5 mr-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <span className="text-gray-500">runtime.config.ts</span>
      </div>

      {/* Editor Content */}
      <div className="p-4 space-y-1 text-gray-400">
        <div>
          <span className="text-purple-400">export</span>{' '}
          <span className="text-blue-400">const</span>{' '}
          <span className="text-yellow-100">config</span> = {'{'}
        </div>

        {/* Intensity Control */}
        <div className="pl-4 group relative">
          <div className="flex items-center">
            <span className="text-blue-300">intensity</span>:{' '}
            <span className="text-orange-300 ml-1">{config.intensity.toFixed(1)}</span>,
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={config.intensity}
            onChange={(e) => onChange('intensity', parseFloat(e.target.value))}
            className="absolute left-0 top-0 w-full h-full opacity-0 cursor-ew-resize"
          />
        </div>

        {/* Speed Control (Mock for now, or hook up if shader supports it) */}
         <div className="pl-4 group relative">
          <div className="flex items-center">
            <span className="text-blue-300">speed</span>:{' '}
            <span className="text-orange-300 ml-1">{config.speed.toFixed(1)}</span>,
          </div>
           <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={config.speed}
            onChange={(e) => onChange('speed', parseFloat(e.target.value))}
            className="absolute left-0 top-0 w-full h-full opacity-0 cursor-ew-resize"
          />
        </div>

        <div>{'}'}</div>
      </div>

      {/* Footer / Status */}
      <div className="px-3 py-1 bg-black/20 text-[10px] text-gray-600 border-t border-white/5 flex justify-between">
          <span>TSX</span>
          <span>Ln 1, Col 1</span>
      </div>
    </div>
  )
}
