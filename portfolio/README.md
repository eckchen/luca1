# Portfolio — Luca Rüggen

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

Kopiere `.env.example` nach `.env.local` und fülle die Werte aus:

| Variable | Beschreibung |
|----------|--------------|
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree Form-ID für das Kontaktformular |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis URL (für IP-Bann) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis Token |

Ohne Formspree: Das Formular nutzt automatisch einen `mailto:`-Fallback.  
Ohne Upstash: IP-Bann bei Hassrede ist deaktiviert.

## Tech Stack

- Next.js 15 · Tailwind v4 · TypeScript
- next-themes · lucide-react · @splinetool/react-spline
- Formspree · Upstash Redis
