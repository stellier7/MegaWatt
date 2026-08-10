function getSellerFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('vendedor') || '';
}

function sellerQuery(name) {
  return name ? '?vendedor=' + encodeURIComponent(name) : '';
}

function setSeller(name) {
  const sellerName = document.getElementById('sellerName');
  const sellerUrlHint = document.getElementById('sellerUrlHint');
  const backLink = document.getElementById('backLink');
  const catalogCard = document.getElementById('catalogCard');

  if (sellerName) {
    sellerName.textContent = name || 'Equipo MegaWatt';
  }

  if (sellerUrlHint) {
    sellerUrlHint.textContent = name
      ? 'megawatt.com/vendedor/' + name.toLowerCase().replace(/\s+/g, '-')
      : 'megawatt.com/vendedor/tu-nombre';
  }

  document.querySelectorAll('.seller-btn').forEach((b) => {
    b.classList.toggle('active', (b.dataset.seller || '') === (name || ''));
  });

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

  const url = new URL(window.location.href);
  if (name) {
    url.searchParams.set('vendedor', name);
  } else {
    url.searchParams.delete('vendedor');
  }
  window.history.replaceState({}, '', url.pathname + url.search + url.hash);
}

function initSeller() {
  const initial = getSellerFromUrl();
  setSeller(initial);

  document.querySelectorAll('.seller-btn').forEach((b) => {
    b.addEventListener('click', () => setSeller(b.dataset.seller || ''));
  });
}
