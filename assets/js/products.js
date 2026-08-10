// aplicacion: 'Interior' | 'Exterior' | 'Emergencia' | 'Pendiente'
// Set `image` to an assets/images path; empty string keeps “Foto pendiente”.
// Optional `ratio`: '9/16' for tall media (street lights). Default card ratio is 1/1.
// Display order: spots → focos → emergencia → street
const img = (file) => (file ? `assets/images/${file}` : '');

const products = [
  // --- Spots ---
  {
    nombre: 'Spot redondo 3W',
    categoria: 'Iluminación Interior',
    subcategoria: 'Spots LED · Redondos',
    tipo: 'Spot LED',
    potencia: '3W',
    temp: '6500K',
    forma: 'Redondo',
    aplicacion: 'Interior',
    image: img('spot-redondo-3W.jpeg'),
  },
  {
    nombre: 'Spot redondo 6W',
    categoria: 'Iluminación Interior',
    subcategoria: 'Spots LED · Redondos',
    tipo: 'Spot LED',
    potencia: '6W',
    temp: '6500K',
    forma: 'Redondo',
    aplicacion: 'Interior',
    image: img('spot-redondo-6W.jpeg'),
  },
  {
    nombre: 'Spot redondo 12W',
    categoria: 'Iluminación Interior',
    subcategoria: 'Spots LED · Redondos',
    tipo: 'Spot LED',
    potencia: '12W',
    temp: '6500K',
    forma: 'Redondo',
    aplicacion: 'Interior',
    image: img('spot-redondo-12W.jpeg'),
  },
  {
    nombre: 'Spot redondo color 6+3W',
    categoria: 'Iluminación Interior',
    subcategoria: 'Spots LED · Redondos',
    tipo: 'Spot LED',
    potencia: '6+3W',
    temp: '6500K',
    forma: 'Redondo',
    aplicacion: 'Interior',
    image: img('spot-redondo-color-6+3W.jpeg'),
  },
  {
    nombre: 'Spot redondo color 12+4W',
    categoria: 'Iluminación Interior',
    subcategoria: 'Spots LED · Redondos',
    tipo: 'Spot LED',
    potencia: '12+4W',
    temp: '6500K',
    forma: 'Redondo',
    aplicacion: 'Interior',
    image: img('spot-redondo-color-12+4W.jpeg'),
  },
  {
    nombre: 'Spot cuadrado 3W',
    categoria: 'Iluminación Interior',
    subcategoria: 'Spots LED · Cuadrados',
    tipo: 'Spot LED',
    potencia: '3W',
    temp: '6500K',
    forma: 'Cuadrado',
    aplicacion: 'Interior',
    image: img('spot-cuadrado-3W.jpeg'),
  },
  {
    nombre: 'Spot cuadrado color 3+3W',
    categoria: 'Iluminación Interior',
    subcategoria: 'Spots LED · Cuadrados',
    tipo: 'Spot LED',
    potencia: '3+3W',
    temp: '6500K',
    forma: 'Cuadrado',
    aplicacion: 'Interior',
    image: img('spot-cuadrado-color-3+3W.jpeg'),
  },
  {
    nombre: 'Spot cuadrado 6W',
    categoria: 'Iluminación Interior',
    subcategoria: 'Spots LED · Cuadrados',
    tipo: 'Spot LED',
    potencia: '6W',
    temp: '6500K',
    forma: 'Cuadrado',
    aplicacion: 'Interior',
    image: img('spot-cuadrado-6W.jpeg'),
  },
  {
    nombre: 'Spot cuadrado color 6+3W',
    categoria: 'Iluminación Interior',
    subcategoria: 'Spots LED · Cuadrados',
    tipo: 'Spot LED',
    potencia: '6+3W',
    temp: '6500K',
    forma: 'Cuadrado',
    aplicacion: 'Interior',
    image: img('spot-cuadrado-color-6+3W.jpeg'),
  },
  {
    nombre: 'Spot cuadrado 12W',
    categoria: 'Iluminación Interior',
    subcategoria: 'Spots LED · Cuadrados',
    tipo: 'Spot LED',
    potencia: '12W',
    temp: '6500K',
    forma: 'Cuadrado',
    aplicacion: 'Interior',
    image: img('spot-cuadrado-12W.jpeg'),
  },
  {
    nombre: 'Spot cuadrado color 12+4W',
    categoria: 'Iluminación Interior',
    subcategoria: 'Spots LED · Cuadrados',
    tipo: 'Spot LED',
    potencia: '12+4W',
    temp: '6500K',
    forma: 'Cuadrado',
    aplicacion: 'Interior',
    image: img('spot-cuadrado-color-12+4W.jpeg'),
  },
  {
    nombre: 'Spot cuadrado 18W',
    categoria: 'Iluminación Interior',
    subcategoria: 'Spots LED · Cuadrados',
    tipo: 'Spot LED',
    potencia: '18W',
    temp: '6500K',
    forma: 'Cuadrado',
    aplicacion: 'Interior',
    image: img('spot-cuadrado-18W.jpeg'),
  },
  {
    nombre: 'Spot cuadrado color 18+6W',
    categoria: 'Iluminación Interior',
    subcategoria: 'Spots LED · Cuadrados',
    tipo: 'Spot LED',
    potencia: '18+6W',
    temp: '6500K',
    forma: 'Cuadrado',
    aplicacion: 'Interior',
    image: img('spot-cuadrado-color-18+6W.jpeg'),
  },

  // --- Focos ---
  ...[7, 9, 12, 15, 18, 20].map((w) => ({
    nombre: `Foco LED ${w}W`,
    categoria: 'Iluminación Interior',
    subcategoria: 'Focos LED',
    tipo: 'Foco LED',
    potencia: w + 'W',
    temp: '6500K',
    forma: 'Focos',
    aplicacion: 'Interior',
    // 7–18W packaging shots are 9:16; 20W uses 5:7
    ...( [7, 9, 12, 15, 18].includes(w) ? { ratio: '9/16' } : { ratio: '5/7' } ),
    image: img(`foco-${w}W.jpeg`),
  })),
  ...[30, 40, 50, 60, 70, 80, 100].map((w) => ({
    nombre: `Foco LED ${w}W`,
    categoria: 'Iluminación Exterior',
    subcategoria: 'Focos LED de Alta Potencia',
    tipo: 'Foco LED',
    potencia: w + 'W',
    temp: '6500K',
    forma: 'Focos',
    aplicacion: 'Pendiente',
    ratio: '5/7',
    image: img(`foco-${w}W.jpeg`),
  })),

  // --- Emergencia ---
  {
    nombre: 'Bombillo LED de Emergencia',
    categoria: 'Iluminación de Emergencia',
    subcategoria: 'Bombillos LED de Emergencia',
    tipo: 'Bombillo LED de Emergencia',
    potencia: '—',
    temp: '6500K',
    forma: '—',
    aplicacion: 'Emergencia',
    image: img('emergencia.mov'),
  },

  // --- Street ---
  {
    nombre: 'LED Street Light 150W',
    categoria: 'Iluminación Exterior',
    subcategoria: 'Lámparas LED para Calle',
    tipo: 'Lámpara LED de Calle',
    potencia: '150W',
    temp: '6500K',
    forma: '—',
    aplicacion: 'Exterior',
    ratio: '9/16',
    image: img('street-150W.jpeg'),
  },
  {
    nombre: 'LED Street Light 200W',
    categoria: 'Iluminación Exterior',
    subcategoria: 'Lámparas LED para Calle',
    tipo: 'Lámpara LED de Calle',
    potencia: '200W',
    temp: '6500K',
    forma: '—',
    aplicacion: 'Exterior',
    ratio: '9/16',
    image: img('street-200W.jpeg'),
  },
];

const categories = [
  'Todos',
  'Iluminación Interior',
  'Iluminación Exterior',
  'Iluminación de Emergencia',
];

const wattOptions = [
  'Todas',
  ...Array.from(new Set(products.map((p) => p.potencia))).filter((p) => p !== '—'),
];

const shapeOptions = ['Todas', 'Redondo', 'Cuadrado', 'Focos'];
const appOptions = ['Todas', 'Interior', 'Exterior', 'Emergencia', 'Pendiente'];

const catalogState = {
  cat: 'Todos',
  watt: 'Todas',
  shape: 'Todas',
  app: 'Todas',
};

function isVideoPath(path) {
  return /\.(mp4|webm|mov)$/i.test(path || '');
}

function productPhotoHtml(product) {
  if (!product.image) {
    return '<span>Foto pendiente</span>';
  }
  if (isVideoPath(product.image)) {
    return `<video src="${product.image}" muted defaultMuted playsinline loop autoplay preload="metadata" aria-label="${product.nombre}"></video>`;
  }
  return `<img src="${product.image}" alt="${product.nombre}" loading="lazy">`;
}

function photoClass(product) {
  if (product.ratio === '9/16') return 'p-photo ratio-9-16';
  if (product.ratio === '5/7') return 'p-photo ratio-5-7';
  return 'p-photo';
}

const featuredProductNames = [
  'Spot redondo 12W',
  'Spot cuadrado color 6+3W',
  'Foco LED 9W',
  'Foco LED 18W',
  'Foco LED 50W',
  'Bombillo LED de Emergencia',
  'LED Street Light 150W',
  'LED Street Light 200W',
];

function getFeaturedProducts() {
  return featuredProductNames
    .map((name) => products.find((p) => p.nombre === name))
    .filter(Boolean);
}

function productCardHtml(p) {
  return `
    <div class="product-card">
      <div class="${photoClass(p)}">${productPhotoHtml(p)}</div>
      <div class="p-body">
        <div class="p-cat">${p.subcategoria}</div>
        <h4>${p.nombre}</h4>
        <div class="p-specs">
          <span>${p.temp}</span>
          ${p.forma !== '—' ? `<span>${p.forma}</span>` : ''}
          <span>${p.aplicacion === 'Pendiente' ? 'Aplicación pendiente' : p.aplicacion}</span>
        </div>
      </div>
    </div>
  `;
}

function featuredCardHtml(p) {
  return `
    <div class="product-card featured-card">
      <div class="p-photo featured-photo">${productPhotoHtml(p)}</div>
      <div class="p-body">
        <div class="p-cat">${p.subcategoria}</div>
        <h4>${p.nombre}</h4>
        <div class="p-specs">
          <span>${p.temp}</span>
          ${p.forma !== '—' ? `<span>${p.forma}</span>` : ''}
          <span>${p.aplicacion === 'Pendiente' ? 'Aplicación pendiente' : p.aplicacion}</span>
        </div>
      </div>
    </div>
  `;
}

function renderCatalogTabs() {
  const el = document.getElementById('catTabs');
  if (!el) return;
  el.innerHTML = categories
    .map(
      (c) =>
        `<button type="button" class="cat-tab ${catalogState.cat === c ? 'active' : ''}" data-cat="${c}">${c}</button>`
    )
    .join('');
  el.querySelectorAll('.cat-tab').forEach((b) => {
    b.addEventListener('click', () => {
      catalogState.cat = b.dataset.cat;
      renderCatalogTabs();
      renderProductGrid();
    });
  });
}

function renderSelectFilter(selectId, options, key) {
  const el = document.getElementById(selectId);
  if (!el) return;
  el.innerHTML = options
    .map((o) => `<option value="${o}"${catalogState[key] === o ? ' selected' : ''}>${o}</option>`)
    .join('');
  el.onchange = () => {
    catalogState[key] = el.value;
    renderProductGrid();
  };
}

function renderProductGrid() {
  const grid = document.getElementById('productGrid');
  const emptyNote = document.getElementById('emptyNote');
  if (!grid) return;

  const filtered = products.filter(
    (p) =>
      (catalogState.cat === 'Todos' || p.categoria === catalogState.cat) &&
      (catalogState.watt === 'Todas' || p.potencia === catalogState.watt) &&
      (catalogState.shape === 'Todas' || p.forma === catalogState.shape) &&
      (catalogState.app === 'Todas' || p.aplicacion === catalogState.app)
  );

  if (emptyNote) {
    emptyNote.style.display = filtered.length ? 'none' : 'block';
  }

  grid.innerHTML = filtered.map(productCardHtml).join('');
}

function renderFeaturedCarousel() {
  const track = document.getElementById('featuredTrack');
  if (!track) return;

  const featured = getFeaturedProducts();
  if (!featured.length) return;

  const cards = featured.map(featuredCardHtml).join('');
  track.innerHTML = cards + cards;
}

function initFeatured() {
  renderFeaturedCarousel();
}

function initCatalog() {
  renderCatalogTabs();
  renderSelectFilter('wattSelect', wattOptions, 'watt');
  renderSelectFilter('shapeSelect', shapeOptions, 'shape');
  renderSelectFilter('appSelect', appOptions, 'app');
  renderProductGrid();
}
