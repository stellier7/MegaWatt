// aplicacion: 'Interior' | 'Exterior' | 'Emergencia'
// Set `image` to an assets/images path; empty string keeps “Foto pendiente”.
// Optional `ratio`: '9/16' for tall media (street lights). Default card ratio is 1/1.
// Display order: spots → focos → street → emergencia
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
    aplicacion: 'Exterior',
    ratio: '5/7',
    image: img(`foco-${w}W.jpeg`),
  })),

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
];

const wattOptions = [
  'Todas',
  ...Array.from(new Set(products.map((p) => p.potencia))).filter((p) => p !== '—'),
];

const shapeOptions = ['Todas', 'Redondo', 'Cuadrado', 'Focos'];
const appOptions = ['Todas', 'Interior', 'Exterior', 'Emergencia'];

const catalogState = {
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
          <span>${p.aplicacion}</span>
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
          <span>${p.aplicacion}</span>
        </div>
      </div>
    </div>
  `;
}

function updateFilterDropdownTrigger(dropdown) {
  const key = dropdown.dataset.filterKey;
  const valueEl = dropdown.querySelector('.filter-dropdown-value');
  if (valueEl && key) valueEl.textContent = catalogState[key];
}

function renderFilterDropdownOptions(dropdown) {
  const key = dropdown.dataset.filterKey;
  const list = dropdown.querySelector('.filter-dropdown-list');
  if (!list || !key) return;

  const options =
    key === 'watt' ? wattOptions : key === 'shape' ? shapeOptions : key === 'app' ? appOptions : [];

  list.innerHTML = options
    .map(
      (option) => `
      <li>
        <button
          type="button"
          class="filter-dropdown-option${catalogState[key] === option ? ' is-selected' : ''}"
          role="option"
          aria-selected="${catalogState[key] === option}"
          data-value="${option}"
        >${option}</button>
      </li>`
    )
    .join('');

  updateFilterDropdownTrigger(dropdown);
}

function closeAllFilterDropdowns() {
  document.querySelectorAll('.filter-dropdown.open').forEach((dropdown) => {
    dropdown.classList.remove('open');
    const trigger = dropdown.querySelector('.filter-dropdown-trigger');
    const panel = dropdown.querySelector('.filter-dropdown-panel');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (panel) panel.hidden = true;
  });
}

function openFilterDropdown(dropdown) {
  closeAllFilterDropdowns();
  const trigger = dropdown.querySelector('.filter-dropdown-trigger');
  const panel = dropdown.querySelector('.filter-dropdown-panel');
  dropdown.classList.add('open');
  if (trigger) trigger.setAttribute('aria-expanded', 'true');
  if (panel) panel.hidden = false;
  renderFilterDropdownOptions(dropdown);
}

function initFilterDropdowns() {
  const dropdowns = document.querySelectorAll('.filter-dropdown');
  if (!dropdowns.length) return;

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('.filter-dropdown-trigger');
    const list = dropdown.querySelector('.filter-dropdown-list');
    if (!trigger || !list) return;

    renderFilterDropdownOptions(dropdown);

    trigger.addEventListener('click', () => {
      if (dropdown.classList.contains('open')) {
        closeAllFilterDropdowns();
      } else {
        openFilterDropdown(dropdown);
      }
    });

    list.addEventListener('click', (e) => {
      const option = e.target.closest('.filter-dropdown-option');
      if (!option) return;

      const key = dropdown.dataset.filterKey;
      if (!key) return;

      catalogState[key] = option.dataset.value;
      renderFilterDropdownOptions(dropdown);
      renderProductGrid();
      closeAllFilterDropdowns();
      trigger.focus();
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-dropdown')) closeAllFilterDropdowns();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const openDropdown = document.querySelector('.filter-dropdown.open');
    if (!openDropdown) return;
    const trigger = openDropdown.querySelector('.filter-dropdown-trigger');
    closeAllFilterDropdowns();
    trigger?.focus();
  });
}

function renderProductGrid() {
  const grid = document.getElementById('productGrid');
  const emptyNote = document.getElementById('emptyNote');
  if (!grid) return;

  const filtered = products.filter(
    (p) =>
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
  initFilterDropdowns();
  renderProductGrid();
}
