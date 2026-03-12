"use client"

import { useState } from "react"
import { TypewriterText } from "@/components/typewriter-text"

export function HeroName() {
  const [lucaDone, setLucaDone] = useState(false)

  return (
    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] min-w-0 break-words">
      {/* "Luca" tippt zuerst — kein Cursor */}
      <TypewriterText
        text="Luca"
        showCursor={false}
        startDelay={600}
        onComplete={() => setLucaDone(true)}
      />

      <br />

      {/* "Rüggen." startet erst wenn "Luca" fertig ist — Cursor bleibt */}
      <TypewriterText
        text="Rüggen."
        className="text-muted-foreground"
        showCursor={true}
        enabled={lucaDone}
        startDelay={150}
      />
    </h1>
  )
}
