import { useEffect, useRef } from 'react'
import './App.css'

function App() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Bar chart data
    const barCount = 12
    let bars = Array.from({ length: barCount }, (_, i) => ({
      height: Math.random() * 0.4 + 0.3 + (i / barCount) * 0.3,
      targetHeight: Math.random() * 0.4 + 0.3 + (i / barCount) * 0.3
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw animated bar chart
      const chartWidth = canvas.width * 0.5
      const chartHeight = canvas.height * 0.35
      const chartX = (canvas.width - chartWidth) / 2
      const chartY = (canvas.height - chartHeight) / 2 + canvas.height * 0.15

      const barWidth = chartWidth / barCount
      const barSpacing = barWidth * 0.3

      // Animate bars
      bars.forEach((bar, index) => {
        // Smooth transition to target height
        bar.height += (bar.targetHeight - bar.height) * 0.05
        
        // Periodically change target heights with upward trend
        if (Math.random() < 0.01) {
          const trend = index / barCount * 0.4
          bar.targetHeight = Math.random() * 0.4 + 0.3 + trend
        }
      })

      // Draw bars
      bars.forEach((bar, index) => {
        const x = chartX + index * barWidth + barSpacing / 2
        const width = barWidth - barSpacing
        const height = bar.height * chartHeight
        const y = chartY + chartHeight - height

        // Gradient for bars
        const gradient = ctx.createLinearGradient(x, y, x, y + height)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)')

        ctx.fillStyle = gradient
        ctx.fillRect(x, y, width, height)

        // Top highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
        ctx.fillRect(x, y, width, 2)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="app">
      <div className="grid-background"></div>
      <canvas ref={canvasRef} className="chart-canvas"></canvas>
      <div className="content">
        <div className="brand">factura.com.ve</div>
        <h1 className="title">Próximamente en 2026</h1>
        <p className="subtitle">La solución definitiva para la facturación en Venezuela</p>
      </div>
    </div>
  )
}

export default App
