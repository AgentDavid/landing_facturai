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

    // Simple animated chart data
    const dataPoints = 20
    let data = Array.from({ length: dataPoints }, () => Math.random() * 0.3 + 0.3)
    let animationFrame = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw animated chart
      const chartWidth = canvas.width * 0.4
      const chartHeight = canvas.height * 0.3
      const chartX = (canvas.width - chartWidth) / 2
      const chartY = (canvas.height - chartHeight) / 2 + canvas.height * 0.15

      const pointSpacing = chartWidth / (dataPoints - 1)

      // Animate data
      animationFrame += 0.01
      data = data.map((value, index) => {
        const trend = index / dataPoints * 0.4
        const wave = Math.sin(animationFrame + index * 0.3) * 0.1
        return Math.max(0.2, Math.min(0.8, value + (Math.random() - 0.5) * 0.02 + trend + wave))
      })

      // Draw line chart
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.lineWidth = 2

      data.forEach((value, index) => {
        const x = chartX + index * pointSpacing
        const y = chartY + chartHeight - value * chartHeight
        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()

      // Draw area under line
      ctx.lineTo(chartX + chartWidth, chartY + chartHeight)
      ctx.lineTo(chartX, chartY + chartHeight)
      ctx.closePath()
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
      ctx.fill()

      // Draw dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
      data.forEach((value, index) => {
        const x = chartX + index * pointSpacing
        const y = chartY + chartHeight - value * chartHeight
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()
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
        <h1 className="title">Próximamente...</h1>
        <p className="subtitle">La solución definitiva para la facturación en Venezuela</p>
      </div>
    </div>
  )
}

export default App
