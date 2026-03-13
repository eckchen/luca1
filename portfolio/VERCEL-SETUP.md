# Vercel + lucarue.vip – komplette Einrichtung

## 1. Vercel-Projekt prüfen

1. [vercel.com/dashboard](https://vercel.com/dashboard) → dein Projekt (luca1)
2. **Settings** → **General**
3. **Root Directory**: MUSS `portfolio` sein (nicht leer)
   - Klick auf **Edit** neben „Root Directory“
   - `portfolio` eintragen
   - Speichern

## 2. Domain lucarue.vip in Vercel

1. **Settings** → **Domains**
2. `lucarue.vip` hinzufügen
3. `www.lucarue.vip` hinzufügen (optional)
4. Vercel zeigt dir die benötigten DNS-Werte

## 3. Cloudflare DNS (lucarue.vip)

Gehe zu Cloudflare → DNS → Records.

**Lösche** alte Einträge für lucarue.vip (z.B. CNAME zu GitHub Pages).

**Füge hinzu:**

| Typ   | Name | Inhalt/Ziel               | Proxy     |
|-------|------|---------------------------|-----------|
| **A** | `@`  | `76.76.21.21`             | DNS only  |
| **CNAME** | `www` | `cname.vercel-dns.com` | DNS only  |

Wichtig: Die Wolke muss grau sein (DNS only), nicht orange.

## 4. Cloudflare Cache leeren (wichtig)

Falls lucarue.vip vorher auf GitHub Pages zeigte:
1. Cloudflare → **Caching** → **Configuration**
2. **Purge Everything** klicken
3. Bestätigen – damit wird der alte Inhalt entfernt

## 5. Nach Änderung

1. In Vercel unter Domains: Status prüfen (Valid = bereit)
2. 5–15 Minuten warten
3. lucarue.vip im Inkognito-Fenster testen (Strg+Shift+N)
4. Hard-Refresh: Strg+Shift+R

## 6. Neues Deployment auslösen

Nach Code-Änderungen:
- Vercel baut automatisch bei jedem Push auf `main`
- Oder: Deployments → „Redeploy“ für manuellen Neuaufbau

## 7. Checkliste

- [ ] Root Directory = `portfolio` in Vercel
- [ ] lucarue.vip als Domain in Vercel
- [ ] Cloudflare: A-Record + CNAME eingetragen
- [ ] Cloudflare: Proxy = DNS only (graue Wolke)
- [ ] GitHub: Änderungen gepusht
- [ ] Nach 15 Min: Test im Inkognito-Fenster
