"use client"

import { useEffect, useRef, useCallback, useState } from "react"

interface Star {
  x: number
  y: number
  size: number
  brightness: number
  vx: number
  vy: number
  twinklePhase: number
  twinkleSpeed: number
  hue: number
}

/** Weniger Sterne, einfaches Rendering — deutlich weniger GPU/CPU als vorher */
const STAR_COUNT = 72
const BASE_HUE = 220
const MAX_SIZE = 2.2
const MAX_DRIFT = 0.04
const TWINKLE_AMOUNT = 0.22
const MAX_DPR = 1.25

function isMobileOrCoarse(): boolean {
  if (typeof window === "undefined") return false
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.innerWidth <= 768
  )
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function createStar(width: number, height: number): Star {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: 0.45 + Math.random() * (MAX_SIZE - 0.45),
    brightness: 0.65 + Math.random() * 0.35,
    vx: (Math.random() - 0.5) * 2 * MAX_DRIFT,
    vy: (Math.random() - 0.5) * 2 * MAX_DRIFT,
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.015 + Math.random() * 0.02,
    hue: BASE_HUE + (Math.random() - 0.5) * 40,
  }
}

/** Statische Sterne als CSS — kein requestAnimationFrame */
function StaticStars() {
  return (
    <div
      className="fixed inset-0 pointer-events-none opacity-[0.35] dark:opacity-[0.28]"
      style={{
        backgroundImage: `
          radial-gradient(1.5px 1.5px at 8% 12%, rgba(255,255,255,0.55), transparent),
          radial-gradient(1px 1px at 22% 38%, rgba(255,255,255,0.4), transparent),
          radial-gradient(1.5px 1.5px at 41% 9%, rgba(255,255,255,0.45), transparent),
          radial-gradient(1px 1px at 55% 62%, rgba(255,255,255,0.35), transparent),
          radial-gradient(1.5px 1.5px at 73% 28%, rgba(255,255,255,0.5), transparent),
          radial-gradient(1px 1px at 88% 71%, rgba(255,255,255,0.38), transparent),
          radial-gradient(1px 1px at 15% 78%, rgba(255,255,255,0.32), transparent),
          radial-gradient(1.5px 1.5px at 92% 18%, rgba(255,255,255,0.42), transparent)
        `,
        backgroundSize: "100% 100%",
      }}
      aria-hidden
    />
  )
}

export function StarBackground() {
  const [mode, setMode] = useState<"static" | "canvas">("static")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const rafRef = useRef(0)
  const timeRef = useRef(0)
  const sizeRef = useRef({ w: 0, h: 0 })

  const initStars = useCallback((width: number, height: number) => {
    starsRef.current = Array.from({ length: STAR_COUNT }, () =>
      createStar(width, height),
    )
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    /* Tablet/Phone & „weniger Bewegung“: nur CSS, kein Canvas-Loop */
    if (prefersReducedMotion() || isMobileOrCoarse()) {
      setMode("static")
      return
    }
    setMode("canvas")
  }, [])

  useEffect(() => {
    if (mode !== "canvas") return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true })
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, MAX_DPR)
      const w = window.innerWidth
      const h = window.innerHeight

      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      sizeRef.current = { w, h }
      initStars(w, h)
    }

    const tick = () => {
      rafRef.current = 0
      if (document.hidden) return

      timeRef.current += 1
      const { w, h } = sizeRef.current
      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      ctx.clearRect(0, 0, w, h)

      for (const star of starsRef.current) {
        star.x += star.vx
        star.y += star.vy
        if (star.x < 0) star.x = w
        if (star.x > w) star.x = 0
        if (star.y < 0) star.y = h
        if (star.y > h) star.y = 0

        const twinkle =
          1 -
          TWINKLE_AMOUNT *
            (0.5 +
              0.5 *
                Math.sin(star.twinklePhase + timeRef.current * star.twinkleSpeed))
        const alpha = Math.min(1, star.brightness * twinkle)

        ctx.fillStyle = `hsla(${star.hue}, 28%, 96%, ${alpha})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    const startIfVisible = () => {
      if (!document.hidden && rafRef.current === 0) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    const onVisibility = () => {
      if (document.hidden && rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      } else {
        startIfVisible()
      }
    }

    resize()
    window.addEventListener("resize", resize)
    document.addEventListener("visibilitychange", onVisibility)
    startIfVisible()

    return () => {
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVisibility)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [mode, initStars])

  if (mode === "static") return <StaticStars />

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ background: "transparent" }}
      aria-hidden
    />
  )
}
