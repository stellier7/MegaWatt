// Catalog order follows the official MegaWatt PDF:
// bombillos (SMD → alta potencia → industrial) → empotrables (slim → bicolor) → emergencia → alumbrado público.
// `linea`: 'Bombillos' | 'Empotrables' | 'Emergencia' | 'Alumbrado público'
// Set `image` to an assets/images path; empty string keeps “Foto pendiente”.
// Optional `ratio`: '9/16' for tall media, '5/7' for high-power packaging. Default card ratio is 1/1.
const img = (file) => (file ? `assets/images/${file}` : '');

const LINEA = {
  bombillos: 'Bombillos',
  empotrables: 'Empotrables',
  emergencia: 'Emergencia',
  calle: 'Alumbrado público',
};

const catalogSections = [
  {
    id: 'bombillos',
    linea: LINEA.bombillos,
    eyebrow: 'Residencial · comercial · industrial',
    title: 'Bombillos LED',
    intro: 'Tres series según la exigencia: SMD para interiores, alta potencia para bodegas y talleres, e industrial de aluminio fundido.',
    image: img('catalog/bombillo-smd.jpeg'),
    groups: [
      {
        id: 'skba',
        kicker: 'SKBA · 7W a 18W',
        title: 'Bombillo LED SMD · Tipo A',
        blurb: 'Driver DOB integrado, sin parpadeo y opción de chip SAMSUNG. Uso general en interiores.',
      },
      {
        id: 'skbt',
        kicker: 'SKBT · 20W a 60W',
        title: 'Bombillo LED alta potencia · Serie T',
        blurb: 'Cuerpo de plástico térmico + aluminio para mayor disipación. Ideal para bodegas, talleres y áreas amplias.',
      },
      {
        id: 'skbta',
        kicker: 'SKBTA · 70W a 100W',
        title: 'Bombillo LED industrial · aluminio fundido',
        blurb: 'Carcasa die-cast de máxima disipación, con protección contra sobretensión opcional. Para naves industriales.',
      },
    ],
  },
  {
    id: 'empotrables',
    linea: LINEA.empotrables,
    eyebrow: 'Iluminación de techo',
    title: 'Empotrables LED',
    intro: 'Paneles slim y plafones bicolor, en versión redonda y cuadrada, con clips de instalación rápida.',
    image: img('catalog/panel-slim-redondo.jpeg'),
    groups: [
      {
        id: 'skrf205',
        kicker: 'SKRF205 · 3W a 18W',
        title: 'Panel LED empotrable · slim',
        blurb: 'Plafón ultradelgado (< 25 mm) con driver DOB integrado y carcasa PP ignífuga. Redondo (SKRF205R) y cuadrado (SKRF205S).',
      },
      {
        id: 'skrp',
        kicker: 'SKRP24 / 25 · 3+3W a 18+6W',
        title: 'Panel LED de techo · bicolor',
        blurb: 'Luz principal y borde decorativo de color. Redondo (SKRP24) y cuadrado (SKRP25). El segundo wattage es el borde.',
      },
    ],
  },
  {
    id: 'emergencia',
    linea: LINEA.emergencia,
    eyebrow: 'Líneas especiales',
    title: 'Emergencia',
    intro: 'Bombillo recargable con batería interna y gancho integrado. Sigue iluminando durante cortes de energía.',
    image: img('catalog/emergencia.jpeg'),
    groups: [
      {
        id: 'sknm04',
        kicker: 'SKNM04 · 20W a 40W',
        title: 'Bombillo LED de emergencia · recargable',
        blurb: 'Disponible en 20W, 30W y 40W. Luz cálida, neutra o fría. Entrada USB 5V.',
      },
    ],
  },
  {
    id: 'calle',
    linea: LINEA.calle,
    eyebrow: 'Líneas especiales',
    title: 'Alumbrado público',
    intro: 'Luminaria vial de alta eficacia (> 100 lm/W) para calles, avenidas y áreas exteriores.',
    image: img('catalog/street-light.jpeg'),
    groups: [
      {
        id: 'skpl2401',
        kicker: 'SKPL2401 · 150W a 200W',
        title: 'Luminaria LED · alumbrado público',
        blurb: 'Cuerpo de aluminio con disipación optimizada. Factor de potencia > 0.9.',
      },
    ],
  },
];

function foco({ watts, group, subcategoria, aplicacion, modelo, flujo, tamano, ratio }) {
  return {
    id: `foco-led-${watts}w`,
    nombre: `Foco LED ${watts}W`,
    categoria: group === 'skba' ? 'Iluminación Interior' : 'Iluminación Industrial',
    subcategoria,
    tipo: 'Foco LED',
    linea: LINEA.bombillos,
    group,
    modelo,
    potencia: watts + 'W',
    flujo,
    tamano,
    temp: '6500K',
    forma: 'Focos',
    base: group === 'skbta' ? 'E27 / E40' : 'E27',
    aplicacion,
    ratio,
    image: img(`foco-${watts}W.jpeg`),
  };
}

function spot({ id, nombre, group, subcategoria, potencia, flujo, tamano, forma, modelo, image, studio }) {
  return {
    id,
    nombre,
    categoria: 'Iluminación Interior',
    subcategoria,
    tipo: 'Spot LED',
    linea: LINEA.empotrables,
    group,
    modelo,
    potencia,
    flujo,
    tamano,
    temp: '6500K',
    forma,
    aplicacion: 'Interior',
    image: img(image),
    studio: Boolean(studio),
  };
}

const products = [
  // --- Bombillos SKBA · SMD Tipo A ---
  foco({ watts: 7, group: 'skba', subcategoria: 'SKBA · SMD Tipo A', aplicacion: 'Interior', modelo: 'SKBA-7', flujo: '630 lm', tamano: 'Ø60 × 108 mm', ratio: '9/16' }),
  foco({ watts: 9, group: 'skba', subcategoria: 'SKBA · SMD Tipo A', aplicacion: 'Interior', modelo: 'SKBA-9', flujo: '810 lm', tamano: 'Ø60 × 108 mm', ratio: '9/16' }),
  foco({ watts: 12, group: 'skba', subcategoria: 'SKBA · SMD Tipo A', aplicacion: 'Interior', modelo: 'SKBA-12', flujo: '1,060 lm', tamano: 'Ø60 × 118 mm', ratio: '9/16' }),
  foco({ watts: 15, group: 'skba', subcategoria: 'SKBA · SMD Tipo A', aplicacion: 'Interior', modelo: 'SKBA-15', flujo: '1,350 lm', tamano: 'Ø60 × 122 mm', ratio: '9/16' }),
  foco({ watts: 18, group: 'skba', subcategoria: 'SKBA · SMD Tipo A', aplicacion: 'Interior', modelo: 'SKB100-18', flujo: '1,600 lm', tamano: 'Ø70 × 132 mm', ratio: '9/16' }),

  // --- Bombillos SKBT · Alta potencia Serie T ---
  foco({ watts: 20, group: 'skbt', subcategoria: 'SKBT · Alta potencia', aplicacion: 'Industrial', modelo: 'SKBT-20', flujo: '1,800 lm', tamano: 'Ø80 × 131 mm', ratio: '5/7' }),
  foco({ watts: 30, group: 'skbt', subcategoria: 'SKBT · Alta potencia', aplicacion: 'Industrial', modelo: 'SKBT-30', flujo: '2,700 lm', tamano: 'Ø100 × 155 mm', ratio: '5/7' }),
  foco({ watts: 40, group: 'skbt', subcategoria: 'SKBT · Alta potencia', aplicacion: 'Industrial', modelo: 'SKBT-40', flujo: '3,600 lm', tamano: 'Ø120 × 185 mm', ratio: '5/7' }),
  foco({ watts: 50, group: 'skbt', subcategoria: 'SKBT · Alta potencia', aplicacion: 'Industrial', modelo: 'SKBT-50', flujo: '4,500 lm', tamano: 'Ø140 × 205 mm', ratio: '5/7' }),
  foco({ watts: 60, group: 'skbt', subcategoria: 'SKBT · Alta potencia', aplicacion: 'Industrial', modelo: 'SKBT-60', flujo: '5,400 lm', tamano: 'Ø160 × 290 mm', ratio: '5/7' }),

  // --- Bombillos SKBTA · Industrial ---
  foco({ watts: 70, group: 'skbta', subcategoria: 'SKBTA · Industrial', aplicacion: 'Industrial', modelo: 'SKBTA-70', flujo: '5,600 lm', tamano: 'Ø140 × 230 mm', ratio: '5/7' }),
  foco({ watts: 80, group: 'skbta', subcategoria: 'SKBTA · Industrial', aplicacion: 'Industrial', modelo: 'SKBTA-80', flujo: '6,400 lm', tamano: 'Ø140 × 230 mm', ratio: '5/7' }),
  foco({ watts: 100, group: 'skbta', subcategoria: 'SKBTA · Industrial', aplicacion: 'Industrial', modelo: 'SKBTA-100', flujo: '8,000 lm', tamano: 'Ø150 × 260 mm', ratio: '5/7' }),

  // --- Empotrables slim SKRF205 ---
  spot({ id: 'spot-redondo-3w', nombre: 'Spot redondo 3W', group: 'skrf205', subcategoria: 'SKRF205R · Slim', potencia: '3W', flujo: '180 lm', tamano: 'Ø98 mm', forma: 'Redondo', modelo: 'SKRF205R-3', image: 'spot-redondo-3W.jpeg' }),
  spot({ id: 'spot-redondo-6w', nombre: 'Spot redondo 6W', group: 'skrf205', subcategoria: 'SKRF205R · Slim', potencia: '6W', flujo: '360 lm', tamano: 'Ø118 mm', forma: 'Redondo', modelo: 'SKRF205R-6', image: 'spot-redondo-6W.jpeg' }),
  spot({ id: 'spot-redondo-12w', nombre: 'Spot redondo 12W', group: 'skrf205', subcategoria: 'SKRF205R · Slim', potencia: '12W', flujo: '720 lm', tamano: 'Ø145 mm', forma: 'Redondo', modelo: 'SKRF205R-12', image: 'spot-redondo-12W.jpeg' }),
  spot({ id: 'spot-redondo-18w', nombre: 'Spot redondo 18W', group: 'skrf205', subcategoria: 'SKRF205R · Slim', potencia: '18W', flujo: '1,260 lm', tamano: 'Ø175 mm', forma: 'Redondo', modelo: 'SKRF205R-18', image: 'catalog/panel-slim-redondo.jpeg', studio: true }),
  spot({ id: 'spot-cuadrado-3w', nombre: 'Spot cuadrado 3W', group: 'skrf205', subcategoria: 'SKRF205S · Slim', potencia: '3W', flujo: '180 lm', tamano: '98×98 mm', forma: 'Cuadrado', modelo: 'SKRF205S-3', image: 'spot-cuadrado-3W.jpeg' }),
  spot({ id: 'spot-cuadrado-6w', nombre: 'Spot cuadrado 6W', group: 'skrf205', subcategoria: 'SKRF205S · Slim', potencia: '6W', flujo: '360 lm', tamano: '118×118 mm', forma: 'Cuadrado', modelo: 'SKRF205S-6', image: 'spot-cuadrado-6W.jpeg' }),
  spot({ id: 'spot-cuadrado-12w', nombre: 'Spot cuadrado 12W', group: 'skrf205', subcategoria: 'SKRF205S · Slim', potencia: '12W', flujo: '720 lm', tamano: '145×145 mm', forma: 'Cuadrado', modelo: 'SKRF205S-12', image: 'spot-cuadrado-12W.jpeg' }),
  spot({ id: 'spot-cuadrado-18w', nombre: 'Spot cuadrado 18W', group: 'skrf205', subcategoria: 'SKRF205S · Slim', potencia: '18W', flujo: '1,260 lm', tamano: '175×175 mm', forma: 'Cuadrado', modelo: 'SKRF205S-18', image: 'spot-cuadrado-18W.jpeg' }),

  // --- Empotrables bicolor SKRP24 / 25 ---
  spot({ id: 'spot-redondo-color-3-3w', nombre: 'Spot redondo color 3+3W', group: 'skrp', subcategoria: 'SKRP24 · Bicolor', potencia: '3+3W', tamano: 'Ø105 mm', forma: 'Redondo', modelo: 'SKRP24-3+3', image: 'catalog/panel-bicolor-redondo.jpeg', studio: true }),
  spot({ id: 'spot-redondo-color-6-3w', nombre: 'Spot redondo color 6+3W', group: 'skrp', subcategoria: 'SKRP24 · Bicolor', potencia: '6+3W', tamano: 'Ø145 mm', forma: 'Redondo', modelo: 'SKRP24-6+3', image: 'spot-redondo-color-6+3W.jpeg' }),
  spot({ id: 'spot-redondo-color-12-4w', nombre: 'Spot redondo color 12+4W', group: 'skrp', subcategoria: 'SKRP24 · Bicolor', potencia: '12+4W', tamano: 'Ø195 mm', forma: 'Redondo', modelo: 'SKRP24-12+4', image: 'spot-redondo-color-12+4W.jpeg' }),
  spot({ id: 'spot-redondo-color-18-6w', nombre: 'Spot redondo color 18+6W', group: 'skrp', subcategoria: 'SKRP24 · Bicolor', potencia: '18+6W', tamano: 'Ø245 mm', forma: 'Redondo', modelo: 'SKRP24-18+6', image: 'catalog/panel-bicolor-redondo.jpeg', studio: true }),
  spot({ id: 'spot-cuadrado-color-3-3w', nombre: 'Spot cuadrado color 3+3W', group: 'skrp', subcategoria: 'SKRP25 · Bicolor', potencia: '3+3W', tamano: '105×105 mm', forma: 'Cuadrado', modelo: 'SKRP25-3+3', image: 'spot-cuadrado-color-3+3W.jpeg' }),
  spot({ id: 'spot-cuadrado-color-6-3w', nombre: 'Spot cuadrado color 6+3W', group: 'skrp', subcategoria: 'SKRP25 · Bicolor', potencia: '6+3W', tamano: '145×145 mm', forma: 'Cuadrado', modelo: 'SKRP25-6+3', image: 'spot-cuadrado-color-6+3W.jpeg' }),
  spot({ id: 'spot-cuadrado-color-12-4w', nombre: 'Spot cuadrado color 12+4W', group: 'skrp', subcategoria: 'SKRP25 · Bicolor', potencia: '12+4W', tamano: '195×195 mm', forma: 'Cuadrado', modelo: 'SKRP25-12+4', image: 'spot-cuadrado-color-12+4W.jpeg' }),
  spot({ id: 'spot-cuadrado-color-18-6w', nombre: 'Spot cuadrado color 18+6W', group: 'skrp', subcategoria: 'SKRP25 · Bicolor', potencia: '18+6W', tamano: '245×245 mm', forma: 'Cuadrado', modelo: 'SKRP25-18+6', image: 'spot-cuadrado-color-18+6W.jpeg' }),

  // --- Emergencia SKNM04 ---
  {
    id: 'bombillo-led-de-emergencia',
    nombre: 'Bombillo de emergencia 20W',
    categoria: 'Iluminación de Emergencia',
    subcategoria: 'SKNM04 · Recargable',
    tipo: 'Bombillo LED de Emergencia',
    linea: LINEA.emergencia,
    group: 'sknm04',
    modelo: 'SKNM04-20W',
    potencia: '20W',
    tamano: 'Ø95 × 165 mm',
    autonomia: '3–4 h',
    temp: '2700K / 4000K / 6000K',
    forma: '—',
    aplicacion: 'Emergencia',
    ratio: '5/7',
    studio: true,
    image: img('catalog/emergencia.jpeg'),
  },
  {
    id: 'bombillo-led-de-emergencia-30w',
    nombre: 'Bombillo de emergencia 30W',
    categoria: 'Iluminación de Emergencia',
    subcategoria: 'SKNM04 · Recargable',
    tipo: 'Bombillo LED de Emergencia',
    linea: LINEA.emergencia,
    group: 'sknm04',
    modelo: 'SKNM04-30W',
    potencia: '30W',
    tamano: 'Ø105 × 170 mm',
    autonomia: '4–6 h',
    temp: '2700K / 4000K / 6000K',
    forma: '—',
    aplicacion: 'Emergencia',
    ratio: '5/7',
    studio: true,
    image: img('catalog/emergencia.jpeg'),
  },
  {
    id: 'bombillo-led-de-emergencia-40w',
    nombre: 'Bombillo de emergencia 40W',
    categoria: 'Iluminación de Emergencia',
    subcategoria: 'SKNM04 · Recargable',
    tipo: 'Bombillo LED de Emergencia',
    linea: LINEA.emergencia,
    group: 'sknm04',
    modelo: 'SKNM04-40W',
    potencia: '40W',
    tamano: 'Ø105 × 170 mm',
    autonomia: '4–6 h',
    temp: '2700K / 4000K / 6000K',
    forma: '—',
    aplicacion: 'Emergencia',
    ratio: '5/7',
    studio: true,
    image: img('catalog/emergencia.jpeg'),
  },

  // --- Alumbrado público SKPL2401 ---
  {
    id: 'led-street-light-150w',
    nombre: 'LED Street Light 150W',
    categoria: 'Iluminación Exterior',
    subcategoria: 'SKPL2401 · Alumbrado público',
    tipo: 'Lámpara LED de Calle',
    linea: LINEA.calle,
    group: 'skpl2401',
    modelo: 'SKPL2401-150W',
    potencia: '150W',
    flujo: '> 100 lm/W',
    tamano: '166.5 × 580.7 × 73.3 mm',
    temp: '6500K',
    forma: '—',
    aplicacion: 'Exterior',
    ratio: '9/16',
    image: img('street-150W.jpeg'),
  },
  {
    id: 'led-street-light-200w',
    nombre: 'LED Street Light 200W',
    categoria: 'Iluminación Exterior',
    subcategoria: 'SKPL2401 · Alumbrado público',
    tipo: 'Lámpara LED de Calle',
    linea: LINEA.calle,
    group: 'skpl2401',
    modelo: 'SKPL2401-200W',
    potencia: '200W',
    flujo: '> 100 lm/W',
    tamano: '196.4 × 655.7 × 73.3 mm',
    temp: '6500K',
    forma: '—',
    aplicacion: 'Exterior',
    ratio: '9/16',
    image: img('street-200W.jpeg'),
  },
];

function wattSortValue(value) {
  const nums = String(value).match(/\d+/g);
  if (!nums) return 0;
  return Number(nums[0]) + (nums[1] ? Number(nums[1]) / 100 : 0);
}

const wattOptions = [
  'Todas',
  ...Array.from(new Set(products.map((p) => p.potencia)))
    .filter((p) => p !== '—')
    .sort((a, b) => wattSortValue(a) - wattSortValue(b)),
];

const shapeOptions = ['Todas', 'Redondo', 'Cuadrado', 'Focos'];
const lineaOptions = ['Todas', LINEA.bombillos, LINEA.empotrables, LINEA.emergencia, LINEA.calle];

const catalogState = {
  watt: 'Todas',
  shape: 'Todas',
  linea: 'Todas',
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
  const ratio = product.ratio === '9/16' ? ' ratio-9-16' : product.ratio === '5/7' ? ' ratio-5-7' : '';
  const studio = product.studio ? ' is-studio' : '';
  return `p-photo${ratio}${studio}`;
}

function specChipsHtml(p) {
  const chips = [];
  if (p.temp) chips.push(p.temp);
  if (p.flujo) chips.push(p.flujo);
  if (p.autonomia) chips.push(p.autonomia);
  if (p.forma && p.forma !== '—' && p.forma !== 'Focos') chips.push(p.forma);
  if (p.base) chips.push(p.base);
  return chips.map((chip) => `<span>${chip}</span>`).join('');
}

const featuredProductNames = [
  'Foco LED 9W',
  'Foco LED 40W',
  'Foco LED 80W',
  'Spot redondo 12W',
  'Spot cuadrado color 6+3W',
  'Bombillo de emergencia 20W',
  'LED Street Light 150W',
  'LED Street Light 200W',
];

function getFeaturedProducts() {
  return featuredProductNames
    .map((name) => products.find((p) => p.nombre === name))
    .filter(Boolean);
}

function cartQtyForProduct(id) {
  if (typeof getCartQty !== 'function') return 0;
  return getCartQty(id);
}

function addToCartButtonHtml(p) {
  const qty = cartQtyForProduct(p.id);
  const inCart = qty > 0;
  return `
    <button
      type="button"
      class="add-to-cart-btn${inCart ? ' is-in-cart' : ''}"
      data-product-id="${p.id}"
      aria-label="${inCart ? `Agregar otra unidad de ${p.nombre}` : `Agregar ${p.nombre} al carrito`}"
    >${inCart ? `En el carrito · ${qty}` : 'Agregar'}</button>
  `;
}

function productCardHtml(p) {
  return `
    <div class="product-card" data-product-id="${p.id}">
      <div class="${photoClass(p)}">${productPhotoHtml(p)}</div>
      <div class="p-body">
        <div class="p-cat">${p.subcategoria}</div>
        <h4>${p.nombre}</h4>
        <div class="p-specs">
          ${specChipsHtml(p)}
        </div>
        ${addToCartButtonHtml(p)}
      </div>
    </div>
  `;
}

function featuredCardHtml(p) {
  return `
    <div class="product-card featured-card" data-product-id="${p.id}">
      <div class="p-photo featured-photo${p.studio ? ' is-studio' : ''}">${productPhotoHtml(p)}</div>
      <div class="p-body">
        <div class="p-cat">${p.subcategoria}</div>
        <h4>${p.nombre}</h4>
        <div class="p-specs">
          ${specChipsHtml(p)}
        </div>
        ${addToCartButtonHtml(p)}
      </div>
    </div>
  `;
}

function refreshProductCardButtons() {
  document.querySelectorAll('.add-to-cart-btn[data-product-id]').forEach((btn) => {
    const id = btn.dataset.productId;
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const qty = cartQtyForProduct(id);
    const inCart = qty > 0;
    btn.classList.toggle('is-in-cart', inCart);
    btn.textContent = inCart ? `En el carrito · ${qty}` : 'Agregar';
    btn.setAttribute(
      'aria-label',
      inCart ? `Agregar otra unidad de ${product.nombre}` : `Agregar ${product.nombre} al carrito`
    );
  });
}

function updateFilterDropdownTrigger(dropdown) {
  const key = dropdown.dataset.filterKey;
  const valueEl = dropdown.querySelector('.filter-dropdown-value');
  if (valueEl && key) valueEl.textContent = catalogState[key];
}

function filterOptionsForKey(key) {
  if (key === 'watt') return wattOptions;
  if (key === 'shape') return shapeOptions;
  if (key === 'linea') return lineaOptions;
  return [];
}

function renderFilterDropdownOptions(dropdown) {
  const key = dropdown.dataset.filterKey;
  const list = dropdown.querySelector('.filter-dropdown-list');
  if (!list || !key) return;

  const options = filterOptionsForKey(key);

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

function matchesFilters(p) {
  return (
    (catalogState.watt === 'Todas' || p.potencia === catalogState.watt) &&
    (catalogState.shape === 'Todas' || p.forma === catalogState.shape) &&
    (catalogState.linea === 'Todas' || p.linea === catalogState.linea)
  );
}

function catalogGroupHtml(group, items) {
  if (!items.length) return '';
  return `
    <div class="catalog-group" id="serie-${group.id}">
      <div class="catalog-group-head">
        <div class="catalog-group-kicker">${group.kicker}</div>
        <h4>${group.title}</h4>
        <p>${group.blurb}</p>
      </div>
      <div class="grid">${items.map(productCardHtml).join('')}</div>
    </div>
  `;
}

function catalogSectionHtml(section, filtered) {
  const groupsHtml = section.groups
    .map((group) => catalogGroupHtml(group, filtered.filter((p) => p.group === group.id)))
    .join('');

  if (!groupsHtml.trim()) return '';

  return `
    <section class="catalog-section" id="linea-${section.id}" aria-labelledby="linea-${section.id}-title">
      <div class="catalog-section-head">
        <div class="catalog-section-visual">
          <img src="${section.image}" alt="">
        </div>
        <div class="catalog-section-copy">
          <div class="eyebrow">${section.eyebrow}</div>
          <h3 id="linea-${section.id}-title">${section.title}</h3>
          <p>${section.intro}</p>
        </div>
      </div>
      ${groupsHtml}
    </section>
  `;
}

function renderProductGrid() {
  const root = document.getElementById('productCatalog');
  const emptyNote = document.getElementById('emptyNote');
  if (!root) return;

  const filtered = products.filter(matchesFilters);

  if (emptyNote) {
    emptyNote.style.display = filtered.length ? 'none' : 'block';
  }

  root.innerHTML = catalogSections.map((section) => catalogSectionHtml(section, filtered)).join('');
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
