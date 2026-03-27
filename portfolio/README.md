# Portfolio — Luca

Persönliche Portfolio-Website mit **Next.js 15**, **Tailwind CSS v4** und **TypeScript**.

## Start

```bash
cd portfolio
npm install
npm run dev
# → http://localhost:3000
```

## Features

- **3D-Roboter** — Spline-Szene im Hero (Desktop)
- **Dark / Light Mode** — Toggle in Navbar
- **Mehrsprachig** — Deutsch, Englisch, Niederländisch
- **Kontaktformular** — Formspree + IP-Bann bei Hassrede
- **Responsive** — Optimiert für Desktop, Tablet & Handy

## Deployment (Vercel)

1. Repo auf GitHub pushen
2. [vercel.com](https://vercel.com) → Import Project → GitHub verbinden
3. **Root Directory:** `portfolio` (wenn Repo-Root) oder leer lassen
4. Environment Variables setzen (siehe `.env.example`)
5. Deploy

## Environment Variables

Kopiere `.env.example` nach `.env.local` und fülle die Werte aus (`.env*` ist **gitignored** – nicht committen).

| Variable | Beschreibung |
|----------|--------------|
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree Form-ID (wird **öffentlich** ins Client-Bundle gebaut) |
| `FORMSPREE_FORM_ID` | Optional: gleiche ID nur für **Server/API** (nicht im Browser-Build) |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Optional: reCAPTCHA **Site Key** (öffentlich; Secret nur bei Google/Formspree) |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis URL (nur Server / Middleware / API) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Token (nur Server — **nie** `NEXT_PUBLIC_`) |

**Sicherheit:** `NEXT_PUBLIC_*` niemals für echte Geheimnisse (DB-Passwörter, API-Secrets, Redis-Token) verwenden.  
Ohne Upstash: IP-Bann (Vercel) ist deaktiviert. **GitHub Pages** (statischer Export): keine API-Route, kein Redis/Middleware – Secrets dort nicht relevant.

## Tech Stack

- Next.js 15 · Tailwind v4 · TypeScript
- next-themes · lucide-react · @splinetool/react-spline
- Formspree · Upstash Redis
