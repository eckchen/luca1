import { NextRequest, NextResponse } from "next/server"
import { containsBannedContent } from "@/lib/banned-words"
import { banIp, isIpBanned } from "@/lib/redis"
import { FORMSPREE_FORM_ID_FALLBACK } from "@/lib/site-config"

function getClientIp(req: NextRequest): string {
  // Cloudflare
  const cf = req.headers.get("cf-connecting-ip")
  if (cf) return cf
  // Vercel, allgemein
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  const real = req.headers.get("x-real-ip")
  if (real) return real
  return "unknown"
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)

  // Bereits gebannt?
  const banned = await isIpBanned(ip)
  if (banned) {
    return NextResponse.json(
      { error: "Zugriff verweigert." },
      { status: 403 },
    )
  }

  let body: { name?: string; email?: string; message?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: "Ungültige Anfrage." },
      { status: 400 },
    )
  }

  const { name = "", email = "", message = "" } = body
  const textToCheck = [name, email, message].join(" ")

  if (containsBannedContent(textToCheck)) {
    await banIp(ip)
    return NextResponse.json(
      { error: "Deine Nachricht verstößt gegen unsere Richtlinien. Der Zugriff wurde gesperrt." },
      { status: 403 },
    )
  }

  // Weiterleitung an Formspree (nur Server-Env; kein Secret)
  const formId =
    process.env.FORMSPREE_FORM_ID?.trim() ||
    process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim() ||
    FORMSPREE_FORM_ID_FALLBACK.trim()
  if (!formId) {
    return NextResponse.json(
      { error: "Kontaktformular ist nicht konfiguriert." },
      { status: 500 },
    )
  }

  try {
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name,
        email,
        message,
        _replyto: email,
      }),
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || "Versand fehlgeschlagen." },
        { status: res.status },
      )
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: "Versand fehlgeschlagen." },
      { status: 500 },
    )
  }
}
