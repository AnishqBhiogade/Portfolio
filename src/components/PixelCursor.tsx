import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function PixelCursor() {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      // Dot is instant
      gsap.set(dot, { x: mouseX, y: mouseY })
    }

    // Ring follows with snappy lerp — 0.18 factor = faster than 0.1
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.18)
      ringY = lerp(ringY, mouseY, 0.18)
      gsap.set(ring, { x: ringX, y: ringY })
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
    </>
  )
}
