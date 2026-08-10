# MegaWatt

Static marketing site for MegaWatt LED lighting (Comayagua, Honduras): NFC-style landing page, filterable product catalog, and distributor lead form.

## Open locally

Serve the repo root with any static server (file:// can block some behaviors in some browsers):

```bash
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

Pages:

- `index.html` — landing (hero, NFC cards, catalog, distributor)
- `productos.html` — dedicated catalog

Seller demo: add `?vendedor=Jason` or `?vendedor=Marwan`, or use the strip buttons.

## Product photos

1. Add image files under [`assets/images/`](assets/images/).
2. In [`assets/js/products.js`](assets/js/products.js), set each product’s `image` field, e.g. `'assets/images/foco-led-6w.jpg'`.

Cards without an `image` keep the “Foto pendiente” placeholder.

## Deploy

Host the repo root as a static site (GitHub Pages, Netlify, etc.). No build step.
