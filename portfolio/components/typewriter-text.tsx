"use client"

import { useState, useEffect, useRef } from "react"

type Props = {
  text: string
  className?: string
  minDelay?: number
  maxDelay?: number
  startDelay?: number
  /** Cursor nach dem Text anzeigen (default: true) */
  showCursor?: boolean
  /** Wird aufgerufen sobald der Text fertig getippt ist */
  onComplete?: () => void
  /** Typing startet erst wenn true (default: true) */
  enabled?: boolean
}

export function TypewriterText({
  text,
  className,
  minDelay    = 80,
  maxDelay    = 120,
  startDelay  = 800,
  showCursor  = true,
  onComplete,
  enabled     = true,
}: Props) {
  const [displayed, setDisplayed] = useState("")
  const [done,      setDone]      = useState(false)
  const indexRef      = useRef(0)
  const onCompleteRef = useRef(onComplete)

  // Ref aktuell halten ohne den Effect neu zu starten
  useEffect(() => { onCompleteRef.current = onComplete })

  useEffect(() => {
    if (!enabled) return

    indexRef.current = 0
    setDisplayed("")
    setDone(false)

    let timeout: ReturnType<typeof setTimeout>

    const typeNext = () => {
      const i = indexRef.current
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        indexRef.current++
        const delay = Math.random() * (maxDelay - minDelay) + minDelay
        timeout = setTimeout(typeNext, delay)
      } else {
        setDone(true)
        onCompleteRef.current?.()
      }
    }

    timeout = setTimeout(typeNext, startDelay)
    return () => clearTimeout(timeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, enabled])

  return (
    <span className={className}>
      {displayed}

      {showCursor && (
        <span
          aria-hidden="true"
          className={`
            inline-block align-baseline
            w-[3px] h-[0.82em]
            bg-foreground ml-[2px]
            ${done ? "animate-blink" : "opacity-100"}
          `}
        />
      )}
    </span>
  )
}
