"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import type { Lang } from "@/lib/translations"

const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
]

export function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t.common.languageSwitch}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-2 px-3 py-2.5 min-h-[44px] rounded-lg border border-border hover:border-muted-foreground/50 active:scale-[0.98] text-sm text-muted-foreground hover:text-foreground transition-all duration-300"
      >
        <span className="text-base">{current.flag}</span>
        <span className="hidden sm:inline">{t.language}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute top-full right-0 mt-2 py-1 min-w-[160px] rounded-lg border border-border bg-background shadow-xl z-50"
        >
          {LANGUAGES.map(({ code, label, flag }) => (
            <li key={code} role="option" aria-selected={lang === code}>
              <button
                type="button"
                onClick={() => {
                  setLang(code)
                  setOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                  lang === code ? "bg-muted/50 text-foreground" : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                }`}
              >
                <span className="text-lg">{flag}</span>
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
