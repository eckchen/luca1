"use client"

import { useEffect, useState } from "react"

const MIN_DISPLAY_MS = 1800
const FADE_DURATION_MS = 600

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const startTime = Date.now()
    document.documentElement.style.overflow = "hidden"

    const hide = () => {
      const elapsed = Date.now() - startTime
      const delay = Math.max(0, MIN_DISPLAY_MS - elapsed)
      setTimeout(() => {
        setOpacity(0)
        setTimeout(() => {
          setVisible(false)
          document.documentElement.style.overflow = ""
        }, FADE_DURATION_MS)
      }, delay)
    }

    if (document.readyState === "complete") {
      hide()
    } else {
      window.addEventListener("load", hide)
      const fallback = setTimeout(hide, MIN_DISPLAY_MS + 500)
      return () => {
        window.removeEventListener("load", hide)
        clearTimeout(fallback)
        document.documentElement.style.overflow = ""
      }
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black transition-opacity duration-[600ms] ease-out"
      style={{ opacity }}
      aria-hidden
    >
      <div className="flex flex-col items-center gap-6">
        <span className="font-mono text-sm tracking-[0.35em] text-white/90 uppercase">
          Authorize
        </span>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-0.5 w-1 bg-white/70 animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
