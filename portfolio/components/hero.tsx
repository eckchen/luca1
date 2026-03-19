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
      className="relative min-h-screen flex items-center pt-36 sm:pt-40 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -left-1/4 top-1/3 h-[min(420px,50vh)] w-[min(420px,90vw)] rounded-full opacity-40 dark:opacity-25 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklch, var(--accent) 35%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div className="w-full max-w-2xl relative">
        <div className="space-y-8 sm:space-y-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3 text-xs font-mono tracking-[0.22em] text-muted-foreground uppercase">
              <span className="h-px w-8 bg-accent/60 shrink-0" aria-hidden />
              {t.hero.subtitle}
            </div>
            <HeroName />
            <a
              href="https://guns.lol/ecke"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-mono text-muted-foreground hover:text-accent transition-colors duration-300"
            >
              guns.lol/ecke
            </a>
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
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping motion-reduce:animate-none motion-reduce:opacity-0" />
                <span className="relative inline-flex size-2 rounded-full bg-green-500" />
              </span>
              {t.hero.available}
            </div>
            <div className="hidden sm:block text-border">·</div>
            <div>{t.hero.germany}</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a href="#projects" className="group btn-primary-solid">
              {t.hero.viewProjects}
              <ArrowRight
                size={15}
                className="transform group-hover:translate-x-0.5 transition-transform duration-300"
              />
            </a>
            <a href="#contact" className="btn-secondary-outline">
              {t.hero.contactCta}
            </a>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs rounded-full border border-border/70 bg-muted/25 text-muted-foreground hover:border-accent/30 hover:text-foreground transition-all duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-muted-foreground/60 dark:text-muted-foreground/40">
        <span className="text-[10px] font-mono tracking-[0.25em]">{t.hero.scroll}</span>
        <ChevronDown size={14} className="animate-bounce motion-reduce:animate-none" />
      </div>
    </section>
  )
}
