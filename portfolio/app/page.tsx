"use client"

import { useEffect, useRef, useState } from "react"
import { Navbar }   from "@/components/navbar"
import { Hero }     from "@/components/hero"
import { About }    from "@/components/about"
import { Projects } from "@/components/projects"
import { Contact }  from "@/components/contact"
import { Footer }   from "@/components/footer"
import { useLanguage } from "@/components/language-provider"

const SECTIONS = ["hero", "about", "projects", "contact"] as const

export default function Page() {
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useState<string>("hero")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 },
    )
    sectionsRef.current.forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const setRef = (index: number) => (el: HTMLElement | null) => {
    sectionsRef.current[index] = el
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const sectionLabels: Record<string, string> = {
    hero: t.nav.hero,
    about: t.nav.about,
    projects: t.nav.projects,
    contact: t.nav.contact,
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative z-10">

      <Navbar activeSection={activeSection} />

      {/* Side Dot Navigation — Desktop only */}
      <nav
        className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3 pl-2 py-3 rounded-full border border-border/50 bg-background/40 backdrop-blur-md shadow-sm shadow-black/5 dark:shadow-black/20"
        aria-label={t.common.sectionNav}
      >
        {SECTIONS.map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            aria-label={t.common.jumpTo.replace("{0}", sectionLabels[section])}
            title={sectionLabels[section]}
            className={`rounded-full transition-all duration-500 ease-out ${
              activeSection === section
                ? "w-1.5 h-9 bg-accent shadow-[0_0_12px_color-mix(in_oklch,var(--accent)_45%,transparent)]"
                : "w-1.5 h-3 bg-muted-foreground/20 hover:bg-muted-foreground/50 hover:h-5"
            }`}
          />
        ))}
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <Hero     sectionRef={setRef(0)} />
        <About    sectionRef={setRef(1)} />
        <Projects sectionRef={setRef(2)} />
        <Contact  sectionRef={setRef(3)} />
      </main>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <Footer />
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent dark:via-background/55 pointer-events-none" />

    </div>
  )
}
