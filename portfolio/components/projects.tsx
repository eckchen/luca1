"use client"

import { Shield, Loader2 } from "lucide-react"
import { CodingAnimation } from "@/components/coding-animation"
import { useLanguage } from "@/components/language-provider"

type Props = {
  sectionRef: (el: HTMLElement | null) => void
}

export function Projects({ sectionRef }: Props) {
  const { t } = useLanguage()

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 sm:py-32"
    >
      <div className="space-y-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div className="space-y-2 min-w-0">
            <h2 className="text-2xl sm:text-4xl font-light">{t.projects.title}</h2>
            <p className="text-sm text-muted-foreground max-w-sm">
              {t.projects.subtitle}
            </p>
          </div>
          <span className="text-sm font-mono text-muted-foreground hidden sm:block shrink-0">02</span>
        </div>

        {/* Security Checker Project */}
        <article className="group flex flex-col border border-border rounded-xl overflow-hidden hover:border-muted-foreground/35 transition-all duration-500 hover:shadow-xl hover:shadow-foreground/[0.04] bg-card">
          {/* Visual Header */}
          <div className="relative h-32 sm:h-40 bg-gradient-to-br from-emerald-500/20 via-teal-500/12 to-transparent dark:from-emerald-500/15 dark:via-teal-500/10 overflow-hidden">
            <CodingAnimation />
            <div className="absolute inset-0 flex items-end p-4 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground/80 dark:text-muted-foreground/70 uppercase">
                  {t.projects.security}
                </span>
              </div>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-2 px-2.5 py-1 rounded-md bg-background/80 dark:bg-background/60 border border-border backdrop-blur-sm">
              <Loader2 size={12} className="animate-spin text-muted-foreground" />
              <span className="text-[10px] font-mono text-muted-foreground">{t.projects.inProgress}</span>
            </div>
            <div
              className="absolute inset-0 opacity-[0.06] dark:opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          {/* Card Content */}
          <div className="flex flex-col flex-1 p-5 gap-4">
            <div className="flex items-start gap-3">
              <div className="shrink-0 p-2 rounded-lg border border-border bg-muted/30">
                <Shield size={20} className="text-emerald-500" />
              </div>
              <div className="space-y-2 flex-1 min-w-0">
                <h3 className="text-base font-medium group-hover:text-muted-foreground transition-colors duration-300">
                  {t.projects.securityTitle}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.projects.securityDesc}
                </p>
              </div>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                {t.projects.securityFeature1}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                {t.projects.securityFeature2}
              </li>
            </ul>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/60">
              {t.projects.techTags.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs font-mono border border-border rounded text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
