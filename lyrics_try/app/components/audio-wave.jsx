"use client"

import { useEffect, useRef } from "react"

export default function AudioWave() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId
    let offset = 0

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = canvas.parentElement.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Draw the SoundCloud-style wave
    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Wave properties
      const barCount = 120
      const barWidth = canvas.width / barCount
      const barGap = 2
      const barMaxHeight = canvas.height * 0.9 // Increased from 0.8 to 0.9

      // Draw the bars
      for (let i = 0; i < barCount; i++) {
        // Create a pattern that resembles a sound wave
        // Using multiple sine waves with different frequencies for a more natural look
        const x = i * (barWidth + barGap)

        // Calculate height using sine waves and the offset for animation
        // Changed direction to move from left to right by changing the sign of offset
        const normalizedI = i / barCount
        const wave1 = Math.sin(normalizedI * 10 - offset * 0.03) * 0.5
        const wave2 = Math.sin(normalizedI * 5 - offset * 0.05) * 0.3
        const wave3 = Math.sin(normalizedI * 20 - offset * 0.02) * 0.2

        // Combine waves and add some randomness
        let height = (wave1 + wave2 + wave3 + 1) * 0.5 * barMaxHeight

        // Add a center-focused shape (higher in the middle, lower at edges)
        const centerEffect = 1 - Math.abs(normalizedI - 0.5) * 1.5
        height *= 0.5 + centerEffect

        // Ensure minimum height
        height = Math.max(height, 5)

        // Calculate y position (centered vertically)
        const y = (canvas.height - height) / 2

        // Draw the bar
        ctx.beginPath()
        ctx.rect(x, y, barWidth, height)

        // Gradient based on height
        const hue = 260 - (height / barMaxHeight) * 60 // Increased color range
        ctx.fillStyle = `hsla(${hue}, 90%, 65%, 0.85)` // More saturation and opacity
        ctx.fill()
      }

      // Update offset for animation - positive value for left-to-right movement
      offset += 2

      // Continue animation
      animationFrameId = requestAnimationFrame(drawWave)
    }

    drawWave()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

