"use client"

import { useLanguage } from "@/components/language-provider"

type Props = {
  sectionRef: (el: HTMLElement | null) => void
}

const SKILL_ITEMS: Record<string, string[]> = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js"],
  backend:  ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
  tools:    ["Git", "Docker", "Figma", "Vercel", "AWS", "Linux"],
}

const STAT_KEYS = ["projects", "apprenticeship", "focus", "coffee"] as const

export function About({ sectionRef }: Props) {
  const { t } = useLanguage()

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen py-24 sm:py-32"
    >
      <div className="space-y-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-3 min-w-0">
            <span className="block h-px w-10 bg-gradient-to-r from-accent/70 to-transparent" aria-hidden />
            <h2 className="section-heading">{t.about.title}</h2>
          </div>
          <span className="section-index shrink-0">01</span>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Bio */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.about.bio1}{" "}
              <span className="text-foreground">{t.about.bio1Highlight}</span>
              {t.about.bio1End}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t.about.bio2Before}
              <span className="text-foreground">{t.about.bio2Highlight}</span>
              {t.about.bio2End}
            </p>

            {/* Stats */}
            <div className="surface-panel p-6 sm:p-7 mt-2">
              <div className="grid grid-cols-2 gap-8">
                {STAT_KEYS.map((key, i) => (
                  <div key={key} className="space-y-1">
                    <div className="font-logo text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
                      {t.about.statValues[i]}
                    </div>
                    <div className="text-xs text-muted-foreground leading-snug">{t.about.stats[key]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-8">
            {(["frontend", "backend", "tools"] as const).map((key) => (
              <div key={key} className="space-y-3">
                <div className="text-xs font-mono tracking-[0.18em] text-muted-foreground uppercase">
                  {t.about.skills[key]}
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKILL_ITEMS[key].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm rounded-lg border border-border/70 bg-muted/20 text-muted-foreground hover:border-accent/25 hover:text-foreground transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Availability Card */}
            <div className="mt-4 surface-panel p-5 sm:p-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping motion-reduce:animate-none motion-reduce:opacity-0" />
                  <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                </span>
                <span className="text-sm text-foreground">{t.about.available}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t.about.availableDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
