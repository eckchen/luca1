"use client"

import { useState, useEffect } from "react"
import Script from "next/script"
import { Send, Github, Instagram, Mail, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { getFormspreeFormId } from "@/lib/site-config"

type Props = {
  sectionRef: (el: HTMLElement | null) => void
}

type FormState = {
  name: string
  email: string
  message: string
}

type SubmitStatus = "idle" | "sending" | "sent" | "error" | "banned"

const SOCIAL_LINKS = [
  { name: "GitHub", handle: "@eckchen", url: "https://github.com/eckchen", Icon: Github },
  { name: "Instagram", handle: "@lucaa_rue", url: "https://www.instagram.com/lucaa_rue", Icon: Instagram },
]

const INPUT_CLASSES =
  "w-full px-4 py-3 bg-background/40 border border-border/90 rounded-xl text-base sm:text-sm text-foreground placeholder:text-muted-foreground/60 dark:placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/15 transition-all duration-300"

const LABEL_CLASSES =
  "block text-xs font-mono tracking-[0.18em] text-muted-foreground uppercase mb-2"

const EMAIL_RE =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

async function getRecaptchaToken(siteKey: string): Promise<string | undefined> {
  const g = typeof window !== "undefined" ? (window as unknown as { grecaptcha?: Grecaptcha }).grecaptcha : undefined
  if (!g) return undefined
  await new Promise<void>((resolve) => {
    g.ready(() => resolve())
  })
  return g.execute(siteKey, { action: "contact" })
}

type Grecaptcha = {
  ready: (cb: () => void) => void
  execute: (siteKey: string, opts: { action: string }) => Promise<string>
}

export function Contact({ sectionRef }: Props) {
  const { t } = useLanguage()
  const [formspreeId, setFormspreeId] = useState<string>(() => getFormspreeFormId())
  const [configResolved, setConfigResolved] = useState(() => Boolean(getFormspreeFormId()))
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" })
  const [honeypot, setHoneypot] = useState("")
  const [status, setStatus] = useState<SubmitStatus>("idle")
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [formspreeErrorDetail, setFormspreeErrorDetail] = useState<string | null>(null)
  const [formspreeErrorStandalone, setFormspreeErrorStandalone] = useState(false)

  useEffect(() => {
    if (formspreeId) return
    let cancelled = false
    ;(async () => {
      try {
        const urls =
          typeof window !== "undefined"
            ? [
                new URL("formspree.json", window.location.href).href,
                `${window.location.origin}/formspree.json`,
              ]
            : ["/formspree.json"]
        const tried = new Set<string>()
        let data: { formId?: string } | null = null
        for (const url of urls) {
          if (tried.has(url)) continue
          tried.add(url)
          try {
            const res = await fetch(url, { cache: "no-store" })
            if (res.ok) {
              data = (await res.json()) as { formId?: string }
              break
            }
          } catch {
            continue
          }
        }
        const id =
          data && typeof data.formId === "string" ? data.formId.trim() : ""
        if (!cancelled && id) setFormspreeId(id)
      } catch {
        /* offline or missing file */
      } finally {
        if (!cancelled) setConfigResolved(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [formspreeId])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const validate = (): boolean => {
    const name = form.name.trim()
    const email = form.email.trim()
    const message = form.message.trim()
    if (name.length < 2) {
      setValidationError(t.contact.validationName)
      return false
    }
    if (!EMAIL_RE.test(email)) {
      setValidationError(t.contact.validationEmail)
      return false
    }
    if (message.length < 10) {
      setValidationError(t.contact.validationMessage)
      return false
    }
    setValidationError(null)
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formspreeId) return
    if (honeypot.trim() !== "") return
    if (!validate()) return

    setStatus("sending")
    setFormspreeErrorDetail(null)
    setFormspreeErrorStandalone(false)

    let recaptchaToken: string | undefined
    if (recaptchaSiteKey && recaptchaLoaded) {
      try {
        recaptchaToken = await getRecaptchaToken(recaptchaSiteKey)
      } catch {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 5000)
        return
      }
    }

    try {
      const body = new URLSearchParams()
      body.set("name", form.name.trim())
      body.set("email", form.email.trim())
      body.set("message", form.message.trim())
      body.set("_replyto", form.email.trim())
      body.set("_subject", `Kontakt: ${form.name.trim()}`)
      if (honeypot.trim()) body.set("_gotcha", honeypot)
      if (recaptchaToken) body.set("g-recaptcha-response", recaptchaToken)

      const res = await fetch(`https://formspree.io/f/${encodeURIComponent(formspreeId)}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      })

      const data = (await res.json().catch(() => ({}))) as {
        error?: string
        errors?: Record<string, unknown>
      }

      if (res.ok) {
        setStatus("sent")
        setForm({ name: "", email: "", message: "" })
        setTimeout(() => setStatus("idle"), 5000)
      } else if (res.status === 403) {
        setStatus("banned")
        setTimeout(() => window.location.reload(), 3000)
      } else {
        let hint: string | null = typeof data.error === "string" && data.error ? data.error : null
        if (!hint && data.errors) {
          for (const v of Object.values(data.errors)) {
            if (Array.isArray(v) && v[0] && typeof v[0] === "string") {
              hint = v[0]
              break
            }
          }
        }
        const hintBeforeNotFound = hint
        if (!hint && res.status === 404) {
          hint = t.contact.errorFormNotFound
        }
        let standalone = false
        if (
          hintBeforeNotFound &&
          /isn'?t set up yet|not set up yet|form isn'?t set up/i.test(hintBeforeNotFound)
        ) {
          hint = t.contact.errorFormspreeNotSetup
          standalone = true
        }
        if (hint) {
          setFormspreeErrorDetail(hint)
          setFormspreeErrorStandalone(standalone)
        }
        if (process.env.NODE_ENV === "development") {
          console.error("[Formspree]", res.status, data)
        }
        setStatus("error")
        setTimeout(() => setStatus("idle"), 8000)
      }
    } catch {
      setFormspreeErrorDetail(t.contact.errorNetwork)
      setFormspreeErrorStandalone(false)
      setStatus("error")
      setTimeout(() => setStatus("idle"), 8000)
    }
  }

  const configured = Boolean(formspreeId)
  const waitingForConfig = !configResolved && !formspreeId
  const recaptchaBlocking = Boolean(recaptchaSiteKey && !recaptchaLoaded)

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 sm:py-32"
    >
      {recaptchaSiteKey ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          strategy="afterInteractive"
          onLoad={() => setRecaptchaLoaded(true)}
        />
      ) : null}

      <div className="space-y-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-3 min-w-0">
            <span className="block h-px w-10 bg-gradient-to-r from-accent/70 to-transparent" aria-hidden />
            <h2 className="section-heading">{t.contact.title}</h2>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              {t.contact.subtitle}
            </p>
          </div>
          <span className="section-index hidden sm:block shrink-0">03</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="relative space-y-5 surface-panel p-6 sm:p-8"
            noValidate
          >
            {configResolved && !formspreeId && (
              <p className="text-sm text-amber-600 dark:text-amber-400/90 leading-relaxed" role="status">
                {t.contact.notConfigured}
              </p>
            )}

            {/* Honeypot — für Bots; nicht ausfüllen */}
            <div
              className="absolute left-[-9999px] top-0 w-px h-px overflow-hidden"
              aria-hidden="true"
            >
              <label htmlFor="contact-honeypot">Website</label>
              <input
                id="contact-honeypot"
                name="_gotcha"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className={LABEL_CLASSES}>
                  {t.contact.name}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t.contact.placeholderName}
                  className={INPUT_CLASSES}
                  disabled={!configured || waitingForConfig}
                />
              </div>
              <div>
                <label htmlFor="email" className={LABEL_CLASSES}>
                  {t.contact.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t.contact.placeholderEmail}
                  className={INPUT_CLASSES}
                  disabled={!configured || waitingForConfig}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className={LABEL_CLASSES}>
                {t.contact.message}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder={t.contact.placeholderMessage}
                className={`${INPUT_CLASSES} resize-none`}
                disabled={!configured || waitingForConfig}
              />
            </div>

            {validationError && (
              <p className="text-sm text-red-500/90" role="alert">
                {validationError}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending" || !configured || waitingForConfig || recaptchaBlocking}
              className="group btn-primary-solid disabled:opacity-60 disabled:active:scale-100"
            >
              {status === "sending" ? (
                <span className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full border-2 border-background/30 border-t-background animate-spin"
                  />
                  {t.contact.sending}
                </span>
              ) : status === "sent" ? (
                <>{t.contact.sent}</>
              ) : (
                <>
                  {t.contact.send}
                  <Send
                    size={14}
                    className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  />
                </>
              )}
            </button>

            {status === "sent" && (
              <p className="text-sm text-green-500/80" role="status">
                {t.contact.thanks}
              </p>
            )}
            {status === "banned" && (
              <p className="text-sm text-red-500/80" role="alert">
                {t.contact.banned}
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-500/80" role="alert">
                {formspreeErrorStandalone && formspreeErrorDetail ? (
                  formspreeErrorDetail
                ) : (
                  <>
                    {t.contact.error}
                    {formspreeErrorDetail ? (
                      <span className="block mt-1 text-red-500/70">{formspreeErrorDetail}</span>
                    ) : null}
                  </>
                )}
              </p>
            )}
          </form>

          {/* Contact Info */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="text-xs font-mono tracking-[0.18em] text-muted-foreground uppercase">
                {t.contact.direct}
              </div>
              <div className="flex gap-3 items-start text-muted-foreground">
                <Mail size={18} className="shrink-0 mt-0.5" aria-hidden />
                <p className="text-base sm:text-lg leading-relaxed">
                  {t.contact.directHint}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-mono tracking-[0.18em] text-muted-foreground uppercase">
                {t.contact.elsewhere}
              </div>
              <div className="space-y-3">
                {SOCIAL_LINKS.map(({ name, handle, url, Icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 rounded-xl border border-border/80 bg-card/30 hover:border-accent/25 hover:bg-muted/15 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className="text-muted-foreground" />
                      <div>
                        <div className="text-sm text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                          {name}
                        </div>
                        <div className="text-xs text-muted-foreground">{handle}</div>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="text-muted-foreground/40 group-hover:text-foreground transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
