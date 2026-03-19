"use client"

import { TypewriterText } from "@/components/typewriter-text"

export function HeroName() {
  return (
    <h1 className="font-logo text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.92] min-w-0 break-words">
      <TypewriterText
        text="Luca"
        showCursor={true}
        startDelay={600}
      />
    </h1>
  )
}
