"use client"

import { TypewriterText } from "@/components/typewriter-text"

export function HeroName() {
  return (
    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] min-w-0 break-words">
      <TypewriterText
        text="Luca"
        showCursor={true}
        startDelay={600}
      />
    </h1>
  )
}
