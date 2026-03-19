"use client"

import { useState, useEffect } from "react"

const CODE_LINES = [
  "scan.website(target)",
  "check.vulnerabilities()",
  "virusScan.files(limit: \"10GB\")",
  "report.generate()",
]

const TYPING_SPEED = 80
const LINE_DELAY = 1200

export function CodingAnimation() {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [staticMode, setStaticMode] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setStaticMode(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  useEffect(() => {
    if (staticMode) return
    const line = CODE_LINES[currentLineIndex]
    if (!line) return

    if (currentCharIndex < line.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => {
          const updated = [...prev]
          updated[currentLineIndex] = line.slice(0, currentCharIndex + 1)
          return updated
        })
        setCurrentCharIndex((c) => c + 1)
      }, TYPING_SPEED)
      return () => clearTimeout(timer)
    }

    const nextTimer = setTimeout(() => {
      setCurrentLineIndex((i) => (i + 1) % CODE_LINES.length)
      setCurrentCharIndex(0)
      setVisibleLines([])
    }, LINE_DELAY)
    return () => clearTimeout(nextTimer)
  }, [currentLineIndex, currentCharIndex, staticMode])

  if (staticMode) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[280px] rounded-lg border border-foreground/15 dark:border-foreground/10 bg-background/70 dark:bg-background/40 backdrop-blur-sm px-3 py-2.5 font-mono text-[10px] sm:text-[11px] leading-relaxed">
          <div className="text-muted-foreground/90">
            {CODE_LINES.map((line, i) => (
              <div key={i} className="text-emerald-700 dark:text-emerald-400/80">
                <span className="text-muted-foreground/70 dark:text-muted-foreground/50 mr-1.5">$</span>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="w-full max-w-[280px] rounded-lg border border-foreground/15 dark:border-foreground/10 bg-background/70 dark:bg-background/40 backdrop-blur-sm px-3 py-2.5 font-mono text-[10px] sm:text-[11px] leading-relaxed">
        <div className="text-muted-foreground/90">
          {CODE_LINES.slice(0, currentLineIndex).map((line, i) => (
            <div key={i} className="text-emerald-700 dark:text-emerald-400/80">
              <span className="text-muted-foreground/70 dark:text-muted-foreground/50 mr-1.5">$</span>
              {line}
            </div>
          ))}
          {currentLineIndex < CODE_LINES.length && (
            <div className="text-emerald-700 dark:text-emerald-400/80">
              <span className="text-muted-foreground/70 dark:text-muted-foreground/50 mr-1.5">$</span>
              {visibleLines[currentLineIndex] ?? ""}
              <span
                className="inline-block w-[6px] h-3.5 align-middle bg-emerald-500 ml-0.5 animate-blink motion-reduce:animate-none motion-reduce:opacity-90"
                style={{ boxShadow: "0 0 8px currentColor" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
