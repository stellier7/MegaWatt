# MegaWatt

Static marketing site for MegaWatt LED lighting (Comayagua, Honduras): landing page shown via salesperson NFC cards, filterable product catalog, quote cart via WhatsApp, and distributor lead form.

## Open locally

Serve the repo root with any static server (file:// can block some behaviors in some browsers):

```bash
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

Pages:

- `index.html` — landing (hero, action cards, catalog, distributor)
- `productos.html` — dedicated catalog

Local seller test (sin redirect de Vercel):

- [http://localhost:8080/?vendedor=ramon](http://localhost:8080/?vendedor=ramon)

## Product photos

1. Add image files under [`assets/images/`](assets/images/).
2. In [`assets/js/products.js`](assets/js/products.js), set each product’s `image` field, e.g. `'assets/images/foco-led-6w.jpg'`.

Cards without an `image` keep the “Foto pendiente” placeholder.

## Deploy

Hosted on [Vercel](https://vercel.com) via GitHub integration. No build step — the repo root is served as a static site. [`vercel.json`](vercel.json) redirects `/v/:slug` → `/?vendedor=:slug`.

| | |
|---|---|
| **Production** | [mega-watt-wheat.vercel.app](https://mega-watt-wheat.vercel.app) |
| **Branch** | `main` deploys to production; every push also gets a Preview URL |
| **Config** | Redirects in repo (`vercel.json`); other project settings in the Vercel dashboard |

Custom domain (p. ej. megawatt.com) pendiente de confirmar — las mismas rutas `/v/{slug}` aplican cuando se apunte el dominio.

## Vendedores (tarjetas NFC)

Registro en [`assets/js/sellers.js`](assets/js/sellers.js). URL corta para cada tarjeta:

| Vendedor | NFC / link |
|---|---|
| Ramón Euceda | `/v/ramon` |
| Isaac Rodriguez | `/v/isaac` |
| Edson Nuñez | `/v/edson` |
| Yeison Padilla | `/v/yeison` |
| Marvin Reyes | `/v/marvin` |
| Jose Carlos Dias | `/v/jose-carlos` |
| Nelson Leiva | `/v/nelson` |
| Edwin Ramos | `/v/edwin` |
| Ruth Alcerro | `/v/ruth` |
| Marwan Khaliliyeh | `/v/marwan` |

Ejemplo en producción actual: `https://mega-watt-wheat.vercel.app/v/ramon`

Con vendedor en la URL, el formulario y el botón de WhatsApp abren el chat **del vendedor** con saludo personalizado (`Hola Ramón, …`). Sin vendedor, el contacto es **Ferretería El Jordán** (+504 9500-2199). El carrito de cotización (Agregar en el catálogo / featured → lista → WhatsApp) usa el mismo destino.

También funciona `?vendedor=ramon` (y queda en los links al catálogo).
