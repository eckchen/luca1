"use client"

import { Shield, Loader2, Package } from "lucide-react"
import { CodingAnimation } from "@/components/coding-animation"
import { VendingMachineVisual } from "@/components/vending-machine-visual"
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

        {/* Automatenshop App */}
        <article className="group flex flex-col border border-border rounded-xl overflow-hidden hover:border-muted-foreground/35 transition-all duration-500 hover:shadow-xl hover:shadow-foreground/[0.04] bg-card">
          <div className="relative h-32 sm:h-40 bg-gradient-to-br from-sky-400/20 via-sky-300/12 to-transparent dark:from-sky-400/15 dark:via-sky-300/10 overflow-hidden">
            <VendingMachineVisual />
            <div className="absolute bottom-3 right-3 flex items-center gap-2 pointer-events-none opacity-90">
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/20 dark:bg-white/10 backdrop-blur-sm">
                {/* App Store Logo (iOS 2024): blaues Quadrat mit stilisiertem weißem A */}
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" fill="#007AFF" />
                  <path d="M8 18L12 6L16 18M10 14H14" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/20 dark:bg-white/10 backdrop-blur-sm">
                {/* Google Play Logo (offizielle Farben: #4285F4 #34A853 #FBBC04 #EA4335) */}
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                  <path fill="#4285F4" d="M3.61 1.81L13.79 12 3.61 22.19a1 1 0 0 1-.61-.92V2.73a1 1 0 0 1 .61-.92z" />
                  <path fill="#34A853" d="M14.5 12.7l2.3 2.3-10.56 6.34 8.26-8.64z" />
                  <path fill="#FBBC04" d="M17.7 9.5l2.81 1.63a1 1 0 0 1 0 1.73l-2.81 1.63-2.49-2.49 2.49-2.5z" />
                  <path fill="#EA4335" d="M5.86 2.66L16.8 8.99l-2.3 2.3-8.64-8.63 2.3-2.3z" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 flex items-end p-4 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground/80 dark:text-muted-foreground/70 uppercase">
                  {t.projects.automaten}
                </span>
              </div>
            </div>
            <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.04]" style={{ backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          </div>
          <div className="flex flex-col flex-1 p-5 gap-4">
            <div className="flex items-start gap-3">
              <div className="shrink-0 p-2 rounded-lg border border-border bg-muted/30">
                <Package size={20} className="text-sky-400" />
              </div>
              <div className="space-y-2 flex-1 min-w-0">
                <h3 className="text-base font-medium group-hover:text-muted-foreground transition-colors duration-300">
                  {t.projects.automatenTitle}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.projects.automatenDesc}
                </p>
              </div>
            </div>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-sky-400 shrink-0" />
                {t.projects.automatenFeature1}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-sky-400 shrink-0" />
                {t.projects.automatenFeature2}
              </li>
            </ul>
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/60">
              {t.projects.automatenTechTags.map((tech) => (
                <span key={tech} className="px-2 py-0.5 text-xs font-mono border border-border rounded text-muted-foreground">
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
