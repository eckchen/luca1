"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X } from "lucide-react"
import { LanguageSwitch } from "@/components/language-switch"
import { useLanguage } from "@/components/language-provider"

/* ── Theme Toggle Switch ───────────────────────────────────── */
function ThemeSwitch({ ariaLabel }: { ariaLabel: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted,     setMounted]     = useState(false)
  const [stretching,  setStretching]  = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <div style={{ width: 92, height: 34 }} />

  const isDark = theme === "dark"

  /* Beim Klick: kurz strecken → Federschnapp */
  const handleToggle = () => {
    setStretching(true)
    setTheme(isDark ? "light" : "dark")
    setTimeout(() => setStretching(false), 350)
  }

  /*
   * Reiseweg: von x=4 (links) bis x=58 (rechts) = 54 px
   * Knopf: 26px rund, beim Gleiten kurz auf 38px gestreckt
   */
  const knobW     = stretching ? 38 : 26
  const knobLeft  = isDark ? (92 - 4 - knobW) : 4   // rechts oder links bündig

  return (
    <button
      onClick={handleToggle}
      aria-label={ariaLabel}
      role="switch"
      aria-checked={isDark}
      style={{
        position:     "relative",
        display:      "flex",
        alignItems:   "center",
        width:         92,
        height:        34,
        borderRadius:  999,
        border:       "1px solid var(--border)",
        background:    isDark ? "var(--muted)" : "var(--muted)",
        cursor:       "pointer",
        outline:      "none",
        flexShrink:    0,
      }}
    >
      {/* Sonne links */}
      <Sun size={13} style={{
        position:      "absolute",
        left:           11,
        pointerEvents: "none",
        color:          isDark ? "var(--muted-foreground)" : "var(--foreground)",
        opacity:        isDark ? 0.28 : 1,
        transition:    "opacity 500ms ease",
      }} />

      {/* Mond rechts */}
      <Moon size={13} style={{
        position:      "absolute",
        right:          11,
        pointerEvents: "none",
        color:          isDark ? "var(--foreground)" : "var(--muted-foreground)",
        opacity:        isDark ? 1 : 0.28,
        transition:    "opacity 500ms ease",
      }} />

      {/* Gleitender Knopf — streckt sich beim Bewegen */}
      <span style={{
        position:       "absolute",
        top:             4,
        left:            knobLeft,
        width:           knobW,
        height:          26,
        borderRadius:    999,
        background:     "var(--foreground)",
        color:          "var(--background)",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        boxShadow:      "0 1px 5px rgba(0,0,0,.3)",
        transition:     stretching
          ? "left 350ms cubic-bezier(0.4,0,0.2,1), width 150ms ease-out"
          : "left 500ms cubic-bezier(0.34,1.56,0.64,1), width 200ms cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {isDark ? <Moon size={12} /> : <Sun size={12} />}
      </span>
    </button>
  )
}

type Props = {
  activeSection: string
}

export function Navbar({ activeSection }: Props) {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/80 bg-background/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 min-h-16 flex items-center justify-between gap-3 pb-4 pt-[max(1rem,env(safe-area-inset-top,0px))]">
        {/* Logo */}
        <button
          onClick={() => scrollTo("#hero")}
          className="font-mono text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.18em] text-foreground hover:text-muted-foreground transition-colors duration-300 shrink-0 min-h-[44px] flex items-center"
        >
          PORTFOLIO
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`text-sm transition-colors duration-300 relative group ${
                activeSection === link.href.slice(1)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-px bg-foreground transition-all duration-300 ${
                  activeSection === link.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <LanguageSwitch />
          <ThemeSwitch ariaLabel={t.common.themeSwitch} />

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={t.common.menu}
            className="md:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-border hover:border-muted-foreground/50 text-muted-foreground hover:text-foreground active:scale-[0.98] transition-all duration-300"
          >
            {mobileOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-48 border-b border-border" : "max-h-0"
        } bg-background/95 backdrop-blur-xl`}
      >
        <nav className="max-w-5xl mx-auto px-6 py-5 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 py-3 min-h-[44px] -mx-2 px-2 rounded-lg hover:bg-muted/30 active:bg-muted/50"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
