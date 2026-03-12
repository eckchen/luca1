import { Redis } from "@upstash/redis"

/** Redis-Client für gebannte IPs. Funktioniert mit Upstash (Edge/Serverless). */
export const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null

const BAN_KEY_PREFIX = "banned_ip:"

export async function isIpBanned(ip: string): Promise<boolean> {
  if (!redis) return false
  try {
    const val = await redis.get(`${BAN_KEY_PREFIX}${ip}`)
    return val === "1"
  } catch {
    return false
  }
}

export async function banIp(ip: string): Promise<void> {
  if (!redis) return
  try {
    await redis.set(`${BAN_KEY_PREFIX}${ip}`, "1")
    // Optional: Ablauf nach z.B. 1 Jahr – mit EX 31536000
  } catch {
    // Ignore – Redis nicht erreichbar
  }
}
