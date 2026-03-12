/**
 * Liste blockierter Begriffe (Rassismus, Hassrede, etc.)
 * Wird case-insensitive geprüft. Erweiterbar.
 * Quelle: Community-Standards, erweiterbar unter https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words
 */
const BANNED_WORDS = [
  // Rassistische & diskriminierende Begriffe (DE/EN)
  "nigger", "nigga", "neger", "negger",
  "negro", "kanake", "kanacke",
  "hitler", "heil hitler", "sieg heil",
  "nazi", "nationalsozialist",
  "judensau", "ausländer raus", "auslaender raus",
  "white power", "white supremacy",
  "untermensch", "übermensch",
  "zigeuner",
  // Weitere Hassrede
  "fotze", "hurensohn", "hurenkind",
  "arschloch",
]

/** Prüft, ob Text blockierte Begriffe enthält (case-insensitive) */
export function containsBannedContent(text: string): boolean {
  if (!text || typeof text !== "string") return false
  const lower = text.toLowerCase()
  return BANNED_WORDS.some((word) => lower.includes(word.toLowerCase()))
}
