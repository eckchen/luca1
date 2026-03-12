"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <footer className="border-t border-border py-12 sm:py-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Luca Rüggen. {t.footer.rights}
          </div>
          <div className="text-xs text-muted-foreground/50 font-mono">
            {t.footer.built}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-muted-foreground/40 hidden sm:block mr-2">
            Luca Rüggen
          </span>
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={t.common.themeSwitch}
              className="p-3 rounded-lg border border-border hover:border-muted-foreground/50 text-muted-foreground hover:text-foreground transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          )}
        </div>
      </div>
    </footer>
  )
}
