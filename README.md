# MegaWatt

Static marketing site for MegaWatt LED lighting (Comayagua, Honduras): landing page shown via salesperson NFC cards, filterable product catalog, and distributor lead form.

## Open locally

Serve the repo root with any static server (file:// can block some behaviors in some browsers):

```bash
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

Pages:

- `index.html` — landing (hero, action cards, catalog, distributor)
- `productos.html` — dedicated catalog

## Product photos

1. Add image files under [`assets/images/`](assets/images/).
2. In [`assets/js/products.js`](assets/js/products.js), set each product’s `image` field, e.g. `'assets/images/foco-led-6w.jpg'`.

Cards without an `image` keep the “Foto pendiente” placeholder.

## Deploy

Hosted on [Vercel](https://vercel.com) via GitHub integration. No build step — the repo root is served as a static site.

| | |
|---|---|
| **Production** | [mega-watt-wheat.vercel.app](https://mega-watt-wheat.vercel.app) |
| **Branch** | `main` deploys to production; every push also gets a Preview URL |
| **Config** | Managed in the Vercel dashboard (no `vercel.json` in repo) |

## Distributor leads

The lead form and WhatsApp link on the landing page open a chat with **+504 9500-2199** (MegaWatt / ferretería central).

- **Form submit** — pre-filled message with name, business, phone, and city.
- **“Escribir por WhatsApp”** — shorter intro message without form fields.

Salesperson NFC cards use `?vendedor=nombre` on the URL so internal links keep the referral. Per-vendor WhatsApp numbers and personalized greetings (e.g. “Hola María…”) are planned for a later phase once cards are assigned.
