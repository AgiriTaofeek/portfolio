// Web Worker for safer code parsing
self.onmessage = (e) => {
  const code = e.data

  try {
    // Basic validation / sanitization
    // In a real scenario, you'd use a parser like Acorn to verify structure
    if (code.includes('import') || code.includes('require') || code.includes('fetch') || code.includes('XMLHttpRequest')) {
      throw new Error('External imports and requests are not allowed.')
    }

    // Wrap in function to check syntax
    const func = new Function(`return (${code})`)
    const result = func()

    // Validate expected schema (GSAP params + Visuals + Content)
    const validKeys = ['duration', 'ease', 'stagger', 'scale', 'color1', 'color2', 'distortion', 'speed', 'text']
    const sanitized = {}

    validKeys.forEach(key => {
      if (key in result) {
        sanitized[key] = result[key]
      }
    })

    self.postMessage({ success: true, data: sanitized })
  } catch (error) {
    self.postMessage({ success: false, error: error.message })
  }
}
