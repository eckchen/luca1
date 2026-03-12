"use client"

import { Suspense, lazy, useRef, useEffect } from "react"

const Spline = lazy(() => import("@splinetool/react-spline"))

/*
 * SENSITIVITY  — wie weit der Roboter den Blick dreht
 *                0.0 = gar nicht bewegen  |  1.0 = voller Bereich
 *                0.4 = sanft & dezent  ←  aktueller Wert
 *
 * LERP         — wie schnell er der Maus folgt (Glättung)
 *                0.0 = bewegt sich nie  |  1.0 = sofort
 *                0.06 = träge, filmisch  ←  aktueller Wert
 */
const SENSITIVITY = 0.4
const LERP        = 0.06

export function RobotScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Startwerte: Bildschirmmitte (Roboter schaut geradeaus)
    let targetX  = window.innerWidth  / 2
    let targetY  = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY
    let rafId: number
    let initialized = false

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const tick = () => {
      // Sanft zum Ziel gleiten (Lerp)
      currentX += (targetX - currentX) * LERP
      currentY += (targetY - currentY) * LERP

      const canvas = containerRef.current?.querySelector("canvas")
      if (canvas) {
        const rect    = canvas.getBoundingClientRect()
        const centerX = rect.left + rect.width  / 2
        const centerY = rect.top  + rect.height / 2

        // Mausposition normalisieren → [-1, 1] relativ zur Fenstermitte
        const normX = (currentX / window.innerWidth)  * 2 - 1
        const normY = (currentY / window.innerHeight) * 2 - 1

        // Mit Empfindlichkeit auf Canvas-Koordinaten mappen
        const canvasX = centerX + normX * SENSITIVITY * (rect.width  / 2)
        const canvasY = centerY + normY * SENSITIVITY * (rect.height / 2)

        if (!initialized) {
          canvas.dispatchEvent(
            new PointerEvent("pointerenter", {
              bubbles: false, cancelable: false,
              clientX: canvasX, clientY: canvasY,
              pointerType: "mouse", isPrimary: true,
            }),
          )
          initialized = true
        }

        canvas.dispatchEvent(
          new PointerEvent("pointermove", {
            bubbles: true, cancelable: true,
            clientX: canvasX, clientY: canvasY,
            pointerType: "mouse", isPrimary: true, buttons: 0,
          }),
        )
      }

      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-border border-t-foreground animate-spin" />
          </div>
        }
      >
        <Spline
          scene="https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </Suspense>
    </div>
  )
}
