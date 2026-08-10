function getSellerFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('vendedor') || '';
}

function sellerQuery(name) {
  return name ? '?vendedor=' + encodeURIComponent(name) : '';
}

function setSeller(name) {
  const backLink = document.getElementById('backLink');
  const catalogCard = document.getElementById('catalogCard');

  if (backLink) {
    backLink.href = 'index.html' + sellerQuery(name);
  }

  if (catalogCard) {
    catalogCard.href = 'productos.html' + sellerQuery(name);
  }

  const featuredCatalogLink = document.getElementById('featuredCatalogLink');
  if (featuredCatalogLink) {
    featuredCatalogLink.href = 'productos.html' + sellerQuery(name);
  }

  const footerHome = document.getElementById('footerHome');
  if (footerHome) {
    footerHome.href = 'index.html' + sellerQuery(name);
  }
}

function initSeller() {
  setSeller(getSellerFromUrl());
}
