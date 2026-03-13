"use client"

import { ArrowRight, ChevronDown } from "lucide-react"
import { HeroName } from "@/components/hero-name"
import { useLanguage } from "@/components/language-provider"

type Props = {
  sectionRef: (el: HTMLElement | null) => void
}

const TECH_STACK = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"]

export function Hero({ sectionRef }: Props) {
  const { t } = useLanguage()

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-16"
    >
      <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* ── Linke Spalte: Text & CTAs ── */}
        <div className="space-y-8 sm:space-y-10">
          <div className="space-y-3">
            <div className="text-xs font-mono tracking-[0.22em] text-muted-foreground uppercase">
              {t.hero.subtitle}
            </div>
            <div className="flex flex-col gap-1">
              <span className="inline-block w-fit cursor-default transition-all duration-500 ease-out hover:scale-105 hover:tracking-wide hover:drop-shadow-[0_0_20px_rgba(192,132,252,0.4)]">
                <HeroName />
              </span>
              <a
                href="https://guns.lol/ecke"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-fit text-[11px] sm:text-xs font-mono tracking-wider text-violet-300 transition-all duration-300 [text-shadow:0_0_16px_rgba(192,132,252,0.9),0_0_32px_rgba(167,139,250,0.6)] hover:[text-shadow:0_0_20px_rgba(192,132,252,1),0_0_40px_rgba(167,139,250,0.8)]"
              >
                guns.lol/ecke
              </a>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-md">
            {t.hero.taglineBefore}
            <span className="text-foreground">{t.hero.taglineHighlight1}</span>
            {t.hero.taglineBetween1}
            <span className="text-foreground">{t.hero.taglineHighlight2}</span>
            {t.hero.taglineBetween2}
            <span className="text-foreground">{t.hero.taglineHighlight3}</span>
            {t.hero.taglineEnd}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-green-500" />
              </span>
              {t.hero.available}
            </div>
            <div className="hidden sm:block text-border">·</div>
            <div>{t.hero.germany}</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] bg-foreground text-background text-sm font-medium rounded-lg hover:opacity-80 active:scale-[0.98] transition-all duration-300"
            >
              {t.hero.viewProjects}
              <ArrowRight
                size={15}
                className="transform group-hover:translate-x-0.5 transition-transform duration-300"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 min-h-[48px] border border-border text-foreground text-sm rounded-lg hover:border-muted-foreground/60 hover:bg-muted/30 active:scale-[0.98] transition-all duration-300"
            >
              {t.hero.contactCta}
            </a>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs border border-border rounded-full text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground transition-all duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── Rechte Spalte: Platzhalter (Spline temporär deaktiviert) ── */}
        <div className="hidden lg:flex relative h-[520px] w-full items-center justify-center">
          <div className="w-full h-full max-w-md rounded-2xl bg-gradient-to-br from-muted/40 via-muted/20 to-transparent border border-border/50 flex items-center justify-center">
            <span className="text-4xl font-light text-muted-foreground/40 tracking-[0.3em]">DEV</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-muted-foreground/60 dark:text-muted-foreground/40">
        <span className="text-[10px] font-mono tracking-[0.25em]">{t.hero.scroll}</span>
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  )
}
