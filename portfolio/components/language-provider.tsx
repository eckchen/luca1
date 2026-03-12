"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type { Lang } from "@/lib/translations"
import { translations } from "@/lib/translations"

const STORAGE_KEY = "portfolio-lang"

type ContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (typeof translations)[Lang]
}

const LanguageContext = createContext<ContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("de")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null
    if (stored && (stored === "de" || stored === "en" || stored === "nl")) {
      setLangState(stored)
      document.documentElement.lang = stored === "de" ? "de" : stored === "nl" ? "nl" : "en"
    }
    setMounted(true)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, l)
      document.documentElement.lang = l === "de" ? "de" : l === "nl" ? "nl" : "en"
    }
  }

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ lang: "de", setLang, t: translations.de }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
