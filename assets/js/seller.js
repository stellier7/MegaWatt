function getSellerSlugFromPath() {
  const match = window.location.pathname.match(/^\/v\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : '';
}

function getSellerRawFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('vendedor') || getSellerSlugFromPath() || '';
}

/** Slug canónico si está en el registro; si no, el valor crudo de la URL. */
function getSellerFromUrl() {
  const raw = getSellerRawFromUrl();
  const resolved = resolveSeller(raw);
  if (resolved) return resolved.slug;
  return raw;
}

function getResolvedSeller() {
  return resolveSeller(getSellerRawFromUrl());
}

function sellerQuery(slug) {
  return slug ? '?vendedor=' + encodeURIComponent(slug) : '';
}

function setSeller(slug) {
  const backLink = document.getElementById('backLink');
  const catalogCard = document.getElementById('catalogCard');

  if (backLink) {
    backLink.href = 'index.html' + sellerQuery(slug);
  }

  if (catalogCard) {
    catalogCard.href = 'productos.html' + sellerQuery(slug);
  }

  const featuredCatalogLink = document.getElementById('featuredCatalogLink');
  if (featuredCatalogLink) {
    featuredCatalogLink.href = 'productos.html' + sellerQuery(slug);
  }

  const footerHome = document.getElementById('footerHome');
  if (footerHome) {
    footerHome.href = 'index.html' + sellerQuery(slug);
  }
}

function initSeller() {
  setSeller(getSellerFromUrl());
}
