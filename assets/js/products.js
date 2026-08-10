// aplicacion: 'Interior' | 'Exterior' | 'Emergencia' | 'Pendiente'
// Optional `image` path (e.g. 'assets/images/foco-6w.jpg') shows photo when set.
const products = [
  ...[6, 7, 9, 12, 15, 18, 20].map((w) => ({
    nombre: `Foco LED ${w}W`,
    categoria: 'Iluminación Interior',
    subcategoria: 'Focos LED',
    tipo: 'Foco LED',
    potencia: w + 'W',
    temp: '6500K',
    forma: '—',
    aplicacion: 'Interior',
    image: '',
  })),
  {
    nombre: 'Spot redondo 3W',
    categoria: 'Iluminación Interior',
    subcategoria: 'Spots LED · Redondos',
    tipo: 'Spot LED',
    potencia: '3W',
    temp: '6500K',
    forma: 'Redondo',
    aplicacion: 'Interior',
    image: '',
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
    image: '',
  },
  {
    nombre: 'Spot redondo 6+3W',
    categoria: 'Iluminación Interior',
    subcategoria: 'Spots LED · Redondos',
    tipo: 'Spot LED',
    potencia: '6+3W',
    temp: '6500K',
    forma: 'Redondo',
    aplicacion: 'Interior',
    image: '',
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
    image: '',
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
    image: '',
  },
  {
    nombre: 'Spot cuadrado 3+3W',
    categoria: 'Iluminación Interior',
    subcategoria: 'Spots LED · Cuadrados',
    tipo: 'Spot LED',
    potencia: '3+3W',
    temp: '6500K',
    forma: 'Cuadrado',
    aplicacion: 'Interior',
    image: '',
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
    image: '',
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
    image: '',
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
    image: '',
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
    image: '',
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
    image: '',
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
    image: '',
  },
  ...[30, 40, 50, 60, 70, 80, 100].map((w) => ({
    nombre: `Foco LED ${w}W`,
    categoria: 'Iluminación Exterior',
    subcategoria: 'Focos LED de Alta Potencia',
    tipo: 'Foco LED',
    potencia: w + 'W',
    temp: '6500K',
    forma: '—',
    aplicacion: 'Pendiente',
    image: '',
  })),
  {
    nombre: 'LED Street Light 150W',
    categoria: 'Iluminación Exterior',
    subcategoria: 'Lámparas LED para Calle',
    tipo: 'Lámpara LED de Calle',
    potencia: '150W',
    temp: '6500K',
    forma: '—',
    aplicacion: 'Exterior',
    image: '',
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
    image: '',
  },
  {
    nombre: 'Bombillo LED de Emergencia',
    categoria: 'Iluminación de Emergencia',
    subcategoria: 'Bombillos LED de Emergencia',
    tipo: 'Bombillo LED de Emergencia',
    potencia: '—',
    temp: '6500K',
    forma: '—',
    aplicacion: 'Emergencia',
    image: '',
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

const shapeOptions = ['Todas', 'Redondo', 'Cuadrado'];
const appOptions = ['Todas', 'Interior', 'Exterior', 'Emergencia', 'Pendiente'];

const catalogState = {
  cat: 'Todos',
  watt: 'Todas',
  shape: 'Todas',
  app: 'Todas',
};

function productPhotoHtml(product) {
  if (product.image) {
    return `<img src="${product.image}" alt="${product.nombre}" loading="lazy">`;
  }
  return '<span>Foto pendiente</span>';
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

function renderChipRow(containerId, options, key) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = options
    .map(
      (o) =>
        `<button type="button" class="chip ${catalogState[key] === o ? 'active' : ''}" data-v="${o}">${o}</button>`
    )
    .join('');
  el.querySelectorAll('.chip').forEach((b) => {
    b.addEventListener('click', () => {
      catalogState[key] = b.dataset.v;
      renderChipRow(containerId, options, key);
      renderProductGrid();
    });
  });
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

  grid.innerHTML = filtered
    .map(
      (p) => `
    <div class="product-card">
      <div class="p-photo">${productPhotoHtml(p)}</div>
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
  `
    )
    .join('');
}

function initCatalog() {
  renderCatalogTabs();
  renderChipRow('wattChips', wattOptions, 'watt');
  renderChipRow('shapeChips', shapeOptions, 'shape');
  renderChipRow('appChips', appOptions, 'app');
  renderProductGrid();
}
