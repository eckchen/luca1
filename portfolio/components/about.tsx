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

const STAT_KEYS = ["projects", "experience", "clients", "coffee"] as const
const STAT_VALUES = ["1", "3+", "2", "∞"]

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
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <h2 className="text-2xl sm:text-4xl font-light min-w-0">{t.about.title}</h2>
          <span className="text-sm font-mono text-muted-foreground shrink-0">01</span>
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
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
              {STAT_KEYS.map((key, i) => (
                <div key={key} className="space-y-1">
                  <div className="text-3xl font-light">{STAT_VALUES[i]}</div>
                  <div className="text-xs text-muted-foreground">{t.about.stats[key]}</div>
                </div>
              ))}
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
                      className="px-3 py-1.5 text-sm border border-border rounded-md text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Availability Card */}
            <div className="mt-4 p-5 border border-border rounded-xl space-y-2 bg-muted/30 dark:bg-muted/20">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
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
