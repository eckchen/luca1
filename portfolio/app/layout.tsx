import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Syne } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { StarBackground } from "@/components/star-background"
import "./globals.css"

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: "Portfolio — Luca",
  description:
    "Luca — kurz vor der IK-Abschlussprüfung; interessiert an Web, Cybersecurity und Interfaces, die man nicht zweimal erklären muss.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${syne.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Sternenhimmel — über allem, damit sichtbar */}
          <div className="fixed inset-0 z-[100] pointer-events-none">
            <StarBackground />
          </div>
          <div className="relative z-10">
            <LanguageProvider>{children}</LanguageProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
