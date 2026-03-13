"use client"

import { useEffect, useRef, useCallback, useState } from "react"

/**
 * Star configuration – each star has unique properties for natural variation.
 */
interface Star {
  x: number
  y: number
  size: number          // Radius in px
  brightness: number    // 0–1 base opacity
  vx: number           // Horizontal drift speed
  vy: number           // Vertical drift speed
  twinklePhase: number // Phase offset for twinkle (0–2π)
  twinkleSpeed: number // How fast it twinkles
  hue: number          // 0 = white, slight blue tint ≈ 210–230
}

const STAR_COUNT_DESKTOP = 350
const BASE_HUE = 220
const MAX_SIZE = 3
const MAX_DRIFT = 0.06
const TWINKLE_AMOUNT = 0.3

function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.innerWidth <= 768
  )
}

function createStar(width: number, height: number): Star {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: 0.5 + Math.random() * (MAX_SIZE - 0.5),
    brightness: 0.7 + Math.random() * 0.3,
    vx: (Math.random() - 0.5) * 2 * MAX_DRIFT,
    vy: (Math.random() - 0.5) * 2 * MAX_DRIFT,
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.02 + Math.random() * 0.03,
    hue: BASE_HUE + (Math.random() - 0.5) * 40,
  }
}

export function StarBackground() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number | undefined>(undefined)
  const timeRef = useRef(0)
  const sizeRef = useRef({ w: 0, h: 0 })

  const initStars = useCallback((width: number, height: number) => {
    starsRef.current = Array.from(
      { length: STAR_COUNT_DESKTOP },
      () => createStar(width, height),
    )
  }, [])

  useEffect(() => {
    if (isMobileDevice()) {
      setIsMobile(true)
      return
    }
    setIsMobile(false)
  }, [])

  useEffect(() => {
    if (isMobile !== false) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight

      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      sizeRef.current = { w, h }
      initStars(w, h)
    }

    const animate = () => {
      timeRef.current += 1
      const { w, h } = sizeRef.current
      if (w === 0 || h === 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, w, h)

      starsRef.current.forEach((star) => {
        star.x += star.vx
        star.y += star.vy

        if (star.x < 0) star.x = w
        if (star.x > w) star.x = 0
        if (star.y < 0) star.y = h
        if (star.y > h) star.y = 0

        const twinkle =
          1 - TWINKLE_AMOUNT * (0.5 + 0.5 * Math.sin(star.twinklePhase + timeRef.current * star.twinkleSpeed))
        const alpha = Math.min(1, star.brightness * twinkle)

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)

        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 2,
        )
        gradient.addColorStop(0, `hsla(${star.hue}, 30%, 100%, ${alpha})`)
        gradient.addColorStop(0.5, `hsla(${star.hue}, 20%, 95%, ${alpha * 0.6})`)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [initStars, isMobile])

  if (isMobile) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ background: "transparent" }}
      aria-hidden
    />
  )
}
