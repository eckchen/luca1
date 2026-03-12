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
    <div className="min-h-screen bg-background text-foreground">

      <Navbar activeSection={activeSection} />

      {/* Side Dot Navigation — Desktop only */}
      <nav
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3"
        aria-label={t.common.sectionNav}
      >
        {SECTIONS.map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            aria-label={t.common.jumpTo.replace("{0}", sectionLabels[section])}
            className={`rounded-full transition-all duration-500 ${
              activeSection === section
                ? "w-1.5 h-8 bg-foreground"
                : "w-1.5 h-3 bg-muted-foreground/25 hover:bg-muted-foreground/55 hover:h-5"
            }`}
          />
        ))}
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
        <Hero     sectionRef={setRef(0)} />
        <About    sectionRef={setRef(1)} />
        <Projects sectionRef={setRef(2)} />
        <Contact  sectionRef={setRef(3)} />
      </main>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
        <Footer />
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background via-background/70 to-transparent dark:via-background/50 pointer-events-none" />

    </div>
  )
}
