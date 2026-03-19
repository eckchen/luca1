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
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-sm shadow-black/[0.04] dark:shadow-black/25"
          : "bg-transparent"
      }`}
    >
      {/* Eigenes Feld oben — klar vom Rest des Headers getrennt */}
      <div className="pt-[max(0.5rem,env(safe-area-inset-top,0px))] px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto py-2">
          <div
            className="relative overflow-hidden rounded-xl border border-accent/30 bg-card/70 dark:bg-card/50 backdrop-blur-md px-3 py-2.5 sm:px-5 sm:py-3 shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--foreground)_6%,transparent)]"
            role="note"
          >
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent/80 via-accent/40 to-accent/80"
              aria-hidden
            />
            <p className="pl-2 sm:pl-3 text-center font-logo text-[13px] sm:text-[15px] font-medium leading-snug tracking-tight text-foreground">
              <span className="text-accent not-italic">»</span>
              <span className="mx-1.5 sm:mx-2">{t.common.headerQuote}</span>
              <span className="text-accent not-italic">«</span>
            </p>
          </div>
        </div>
      </div>

      <div
        className="h-px max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 bg-gradient-to-r from-transparent via-border to-transparent opacity-80"
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 min-h-14 flex items-center justify-between gap-3 pb-3 pt-3">
        {/* Logo */}
        <button
          onClick={() => scrollTo("#hero")}
          className="font-logo text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.18em] text-foreground hover:text-muted-foreground transition-colors duration-300 shrink-0 min-h-[44px] flex items-center"
        >
          <span className="glow-p-subtle inline-block scale-110 origin-left">P</span>ORTFOLIO
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
                className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-accent transition-all duration-300 ${
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
            className="md:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-border/90 bg-background/40 backdrop-blur-sm hover:border-accent/30 text-muted-foreground hover:text-foreground active:scale-[0.98] transition-all duration-300"
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
        <nav className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-1">
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
