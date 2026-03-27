/**
 * Formspree: Form-ID aus der URL (z. B. `abcxyz` bei https://formspree.io/f/abcxyz).
 * Öffentlich (wie im Netzwerk sichtbar) — kein API-Secret.
 *
 * Wenn du kein `.env.local` mit NEXT_PUBLIC_FORMSPREE_ID beim Build nutzt
 * (z. B. nur Repo klonen und bauen): hier deine ID eintragen und neu deployen.
 * Alternativ: NEXT_PUBLIC_FORMSPREE_ID in .env.local — hat Vorrang vor diesem Fallback.
 */
export const FORMSPREE_FORM_ID_FALLBACK = "xyknazqk"

export function getFormspreeFormId(): string {
  const fromEnv = process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim()
  if (fromEnv) return fromEnv
  return FORMSPREE_FORM_ID_FALLBACK.trim()
}
