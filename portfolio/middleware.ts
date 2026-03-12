import { NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

function getClientIp(req: NextRequest): string {
  const cf = req.headers.get("cf-connecting-ip")
  if (cf) return cf
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  const real = req.headers.get("x-real-ip")
  if (real) return real
  return ""
}

export async function middleware(req: NextRequest) {
  const ip = getClientIp(req)
  if (!ip || ip === "unknown") return NextResponse.next()

  const redis =
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
      ? new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL!,
          token: process.env.UPSTASH_REDIS_REST_TOKEN!,
        })
      : null

  if (!redis) return NextResponse.next()

  try {
    const banned = await redis.get(`banned_ip:${ip}`)
    if (banned === "1") {
      return new NextResponse(
        `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Zugriff gesperrt</title></head><body style="font-family:system-ui;max-width:40rem;margin:4rem auto;padding:2rem;text-align:center;"><h1>Zugriff gesperrt</h1><p>Dein Zugriff auf diese Website wurde aufgrund eines Verstoßes gegen unsere Richtlinien dauerhaft gesperrt.</p></body></html>`,
        {
          status: 403,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        },
      )
    }
  } catch {
    // Redis-Fehler – nicht blockieren
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
