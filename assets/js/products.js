// Catalog finder follows the official MegaWatt PDF:
// pick línea → serie / forma if needed → potencia, then reveal one SKU.
// Photos are studio crops from the PDF (one shot per series, not packaging).
const img = (file) => (file ? `assets/images/${file}` : '');

const LINEA = {
  bombillos: 'Bombillos',
  empotrables: 'Empotrables',
  emergencia: 'Emergencia',
  calle: 'Alumbrado público',
};

const GROUP_STUDIO = {
  skba: 'catalog/bombillo-smd.jpeg',
  skbt: 'catalog/bombillo-alta-potencia.jpeg',
  skbta: 'catalog/bombillo-industrial.jpeg',
  sknm04: 'catalog/emergencia.jpeg',
  skpl2401: 'catalog/street-light.jpeg',
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
        finderLabel: 'SMD Tipo A · 7–18W',
        title: 'Bombillo LED SMD · Tipo A',
        blurb: 'Driver DOB integrado, sin parpadeo y opción de chip SAMSUNG. Uso general en interiores.',
      },
      {
        id: 'skbt',
        kicker: 'SKBT · 20W a 60W',
        finderLabel: 'Alta potencia · 20–60W',
        title: 'Bombillo LED alta potencia · Serie T',
        blurb: 'Cuerpo de plástico térmico + aluminio para mayor disipación. Ideal para bodegas, talleres y áreas amplias.',
      },
      {
        id: 'skbta',
        kicker: 'SKBTA · 70W a 100W',
        finderLabel: 'Industrial · 70–100W',
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
        finderLabel: 'Slim · 3–18W',
        title: 'Panel LED empotrable · slim',
        blurb: 'Plafón ultradelgado (< 25 mm) con driver DOB integrado y carcasa PP ignífuga. Redondo (SKRF205R) y cuadrado (SKRF205S).',
      },
      {
        id: 'skrp',
        kicker: 'SKRP24 / 25 · 3+3W a 18+6W',
        finderLabel: 'Bicolor · 3+3 a 18+6W',
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
        finderLabel: 'Recargable · 20–40W',
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
        finderLabel: 'Vial · 150–200W',
        title: 'Luminaria LED · alumbrado público',
        blurb: 'Cuerpo de aluminio con disipación optimizada. Factor de potencia > 0.9.',
      },
    ],
  },
];

function studioForSpot(group, forma) {
  if (group === 'skrf205') {
    return forma === 'Redondo' ? 'catalog/panel-slim-redondo.jpeg' : 'catalog/panel-slim-cuadrado.jpeg';
  }
  return forma === 'Redondo' ? 'catalog/panel-bicolor-redondo.jpeg' : 'catalog/panel-bicolor-cuadrado.jpeg';
}

function foco({ watts, group, subcategoria, aplicacion, modelo, flujo, tamano }) {
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
    voltaje: '100–265V AC',
    temp: '6500K',
    forma: 'Focos',
    base: group === 'skbta' ? 'E27 / E40' : 'E27',
    aplicacion,
    studio: true,
    image: img(GROUP_STUDIO[group]),
  };
}

function spot({ id, nombre, group, subcategoria, potencia, flujo, tamano, forma, modelo, perforacion }) {
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
    perforacion,
    voltaje: '100–265V AC',
    temp: '6500K',
    forma,
    aplicacion: 'Interior',
    studio: true,
    image: img(studioForSpot(group, forma)),
  };
}

const products = [
  foco({ watts: 7, group: 'skba', subcategoria: 'SKBA · SMD Tipo A', aplicacion: 'Interior', modelo: 'SKBA-7', flujo: '630 lm', tamano: 'Ø60 × 108 mm' }),
  foco({ watts: 9, group: 'skba', subcategoria: 'SKBA · SMD Tipo A', aplicacion: 'Interior', modelo: 'SKBA-9', flujo: '810 lm', tamano: 'Ø60 × 108 mm' }),
  foco({ watts: 12, group: 'skba', subcategoria: 'SKBA · SMD Tipo A', aplicacion: 'Interior', modelo: 'SKBA-12', flujo: '1,060 lm', tamano: 'Ø60 × 118 mm' }),
  foco({ watts: 15, group: 'skba', subcategoria: 'SKBA · SMD Tipo A', aplicacion: 'Interior', modelo: 'SKBA-15', flujo: '1,350 lm', tamano: 'Ø60 × 122 mm' }),
  foco({ watts: 18, group: 'skba', subcategoria: 'SKBA · SMD Tipo A', aplicacion: 'Interior', modelo: 'SKB100-18', flujo: '1,600 lm', tamano: 'Ø70 × 132 mm' }),

  foco({ watts: 20, group: 'skbt', subcategoria: 'SKBT · Alta potencia', aplicacion: 'Industrial', modelo: 'SKBT-20', flujo: '1,800 lm', tamano: 'Ø80 × 131 mm' }),
  foco({ watts: 30, group: 'skbt', subcategoria: 'SKBT · Alta potencia', aplicacion: 'Industrial', modelo: 'SKBT-30', flujo: '2,700 lm', tamano: 'Ø100 × 155 mm' }),
  foco({ watts: 40, group: 'skbt', subcategoria: 'SKBT · Alta potencia', aplicacion: 'Industrial', modelo: 'SKBT-40', flujo: '3,600 lm', tamano: 'Ø120 × 185 mm' }),
  foco({ watts: 50, group: 'skbt', subcategoria: 'SKBT · Alta potencia', aplicacion: 'Industrial', modelo: 'SKBT-50', flujo: '4,500 lm', tamano: 'Ø140 × 205 mm' }),
  foco({ watts: 60, group: 'skbt', subcategoria: 'SKBT · Alta potencia', aplicacion: 'Industrial', modelo: 'SKBT-60', flujo: '5,400 lm', tamano: 'Ø160 × 290 mm' }),

  foco({ watts: 70, group: 'skbta', subcategoria: 'SKBTA · Industrial', aplicacion: 'Industrial', modelo: 'SKBTA-70', flujo: '5,600 lm', tamano: 'Ø140 × 230 mm' }),
  foco({ watts: 80, group: 'skbta', subcategoria: 'SKBTA · Industrial', aplicacion: 'Industrial', modelo: 'SKBTA-80', flujo: '6,400 lm', tamano: 'Ø140 × 230 mm' }),
  foco({ watts: 100, group: 'skbta', subcategoria: 'SKBTA · Industrial', aplicacion: 'Industrial', modelo: 'SKBTA-100', flujo: '8,000 lm', tamano: 'Ø150 × 260 mm' }),

  spot({ id: 'spot-redondo-3w', nombre: 'Spot redondo 3W', group: 'skrf205', subcategoria: 'SKRF205R · Slim', potencia: '3W', flujo: '180 lm', tamano: 'Ø98 mm', perforacion: 'Ø77–82 mm', forma: 'Redondo', modelo: 'SKRF205R-3' }),
  spot({ id: 'spot-redondo-6w', nombre: 'Spot redondo 6W', group: 'skrf205', subcategoria: 'SKRF205R · Slim', potencia: '6W', flujo: '360 lm', tamano: 'Ø118 mm', perforacion: 'Ø95–100 mm', forma: 'Redondo', modelo: 'SKRF205R-6' }),
  spot({ id: 'spot-redondo-12w', nombre: 'Spot redondo 12W', group: 'skrf205', subcategoria: 'SKRF205R · Slim', potencia: '12W', flujo: '720 lm', tamano: 'Ø145 mm', perforacion: 'Ø118–128 mm', forma: 'Redondo', modelo: 'SKRF205R-12' }),
  spot({ id: 'spot-redondo-18w', nombre: 'Spot redondo 18W', group: 'skrf205', subcategoria: 'SKRF205R · Slim', potencia: '18W', flujo: '1,260 lm', tamano: 'Ø175 mm', perforacion: 'Ø145–155 mm', forma: 'Redondo', modelo: 'SKRF205R-18' }),
  spot({ id: 'spot-cuadrado-3w', nombre: 'Spot cuadrado 3W', group: 'skrf205', subcategoria: 'SKRF205S · Slim', potencia: '3W', flujo: '180 lm', tamano: '98×98 mm', perforacion: 'Ø77–82 mm', forma: 'Cuadrado', modelo: 'SKRF205S-3' }),
  spot({ id: 'spot-cuadrado-6w', nombre: 'Spot cuadrado 6W', group: 'skrf205', subcategoria: 'SKRF205S · Slim', potencia: '6W', flujo: '360 lm', tamano: '118×118 mm', perforacion: 'Ø95–100 mm', forma: 'Cuadrado', modelo: 'SKRF205S-6' }),
  spot({ id: 'spot-cuadrado-12w', nombre: 'Spot cuadrado 12W', group: 'skrf205', subcategoria: 'SKRF205S · Slim', potencia: '12W', flujo: '720 lm', tamano: '145×145 mm', perforacion: 'Ø118–128 mm', forma: 'Cuadrado', modelo: 'SKRF205S-12' }),
  spot({ id: 'spot-cuadrado-18w', nombre: 'Spot cuadrado 18W', group: 'skrf205', subcategoria: 'SKRF205S · Slim', potencia: '18W', flujo: '1,260 lm', tamano: '175×175 mm', perforacion: 'Ø145–155 mm', forma: 'Cuadrado', modelo: 'SKRF205S-18' }),

  spot({ id: 'spot-redondo-color-3-3w', nombre: 'Spot redondo color 3+3W', group: 'skrp', subcategoria: 'SKRP24 · Bicolor', potencia: '3+3W', tamano: 'Ø105 mm', perforacion: 'Ø75 mm', forma: 'Redondo', modelo: 'SKRP24-3+3' }),
  spot({ id: 'spot-redondo-color-6-3w', nombre: 'Spot redondo color 6+3W', group: 'skrp', subcategoria: 'SKRP24 · Bicolor', potencia: '6+3W', tamano: 'Ø145 mm', perforacion: 'Ø105 mm', forma: 'Redondo', modelo: 'SKRP24-6+3' }),
  spot({ id: 'spot-redondo-color-12-4w', nombre: 'Spot redondo color 12+4W', group: 'skrp', subcategoria: 'SKRP24 · Bicolor', potencia: '12+4W', tamano: 'Ø195 mm', perforacion: 'Ø155 mm', forma: 'Redondo', modelo: 'SKRP24-12+4' }),
  spot({ id: 'spot-redondo-color-18-6w', nombre: 'Spot redondo color 18+6W', group: 'skrp', subcategoria: 'SKRP24 · Bicolor', potencia: '18+6W', tamano: 'Ø245 mm', perforacion: 'Ø210 mm', forma: 'Redondo', modelo: 'SKRP24-18+6' }),
  spot({ id: 'spot-cuadrado-color-3-3w', nombre: 'Spot cuadrado color 3+3W', group: 'skrp', subcategoria: 'SKRP25 · Bicolor', potencia: '3+3W', tamano: '105×105 mm', perforacion: 'Ø75 mm', forma: 'Cuadrado', modelo: 'SKRP25-3+3' }),
  spot({ id: 'spot-cuadrado-color-6-3w', nombre: 'Spot cuadrado color 6+3W', group: 'skrp', subcategoria: 'SKRP25 · Bicolor', potencia: '6+3W', tamano: '145×145 mm', perforacion: 'Ø105 mm', forma: 'Cuadrado', modelo: 'SKRP25-6+3' }),
  spot({ id: 'spot-cuadrado-color-12-4w', nombre: 'Spot cuadrado color 12+4W', group: 'skrp', subcategoria: 'SKRP25 · Bicolor', potencia: '12+4W', tamano: '195×195 mm', perforacion: 'Ø155 mm', forma: 'Cuadrado', modelo: 'SKRP25-12+4' }),
  spot({ id: 'spot-cuadrado-color-18-6w', nombre: 'Spot cuadrado color 18+6W', group: 'skrp', subcategoria: 'SKRP25 · Bicolor', potencia: '18+6W', tamano: '245×245 mm', perforacion: 'Ø210 mm', forma: 'Cuadrado', modelo: 'SKRP25-18+6' }),

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
    voltaje: 'DC 5V (USB)',
    temp: '2700K / 4000K / 6000K',
    forma: '—',
    aplicacion: 'Emergencia',
    studio: true,
    image: img(GROUP_STUDIO.sknm04),
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
    voltaje: 'DC 5V (USB)',
    temp: '2700K / 4000K / 6000K',
    forma: '—',
    aplicacion: 'Emergencia',
    studio: true,
    image: img(GROUP_STUDIO.sknm04),
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
    voltaje: 'DC 5V (USB)',
    temp: '2700K / 4000K / 6000K',
    forma: '—',
    aplicacion: 'Emergencia',
    studio: true,
    image: img(GROUP_STUDIO.sknm04),
  },

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
    voltaje: '100–265V AC',
    temp: '6500K',
    forma: '—',
    aplicacion: 'Exterior',
    studio: true,
    image: img(GROUP_STUDIO.skpl2401),
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
    voltaje: '100–265V AC',
    temp: '6500K',
    forma: '—',
    aplicacion: 'Exterior',
    studio: true,
    image: img(GROUP_STUDIO.skpl2401),
  },
];

function wattSortValue(value) {
  const nums = String(value).match(/\d+/g);
  if (!nums) return 0;
  return Number(nums[0]) + (nums[1] ? Number(nums[1]) / 100 : 0);
}

const lineaOptions = [LINEA.bombillos, LINEA.empotrables, LINEA.emergencia, LINEA.calle];

const catalogState = {
  linea: '',
  group: '',
  shape: '',
  watt: '',
};

const PLACEHOLDER = 'Elegir';

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

function featuredCardHtml(p) {
  return `
    <div class="product-card featured-card" data-product-id="${p.id}">
      <div class="p-photo featured-photo is-studio">${productPhotoHtml(p)}</div>
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

function sectionForLinea(linea) {
  return catalogSections.find((section) => section.linea === linea) || null;
}

function groupMeta(groupId) {
  for (const section of catalogSections) {
    const group = section.groups.find((entry) => entry.id === groupId);
    if (group) return group;
  }
  return null;
}

function matchingProducts({ linea, group, shape, watt } = catalogState) {
  return products.filter((p) => {
    if (linea && p.linea !== linea) return false;
    if (group && p.group !== group) return false;
    if (shape && p.forma !== shape) return false;
    if (watt && p.potencia !== watt) return false;
    return true;
  });
}

function uniqueSorted(values, sortFn) {
  const unique = Array.from(new Set(values.filter(Boolean)));
  return sortFn ? unique.sort(sortFn) : unique;
}

function groupsForLinea(linea) {
  const section = sectionForLinea(linea);
  return section ? section.groups : [];
}

function needsGroupStep() {
  return groupsForLinea(catalogState.linea).length > 1;
}

function availableShapes() {
  return uniqueSorted(
    matchingProducts({
      linea: catalogState.linea,
      group: catalogState.group,
      shape: '',
      watt: '',
    })
      .map((p) => p.forma)
      .filter((forma) => forma && forma !== '—' && forma !== 'Focos')
  );
}

function needsShapeStep() {
  if (!catalogState.group) return false;
  return availableShapes().length > 1;
}

function wattReady() {
  if (!catalogState.linea) return false;
  if (needsGroupStep() && !catalogState.group) return false;
  if (needsShapeStep() && !catalogState.shape) return false;
  return true;
}

function availableWatts() {
  if (!wattReady()) return [];
  return uniqueSorted(
    matchingProducts({
      linea: catalogState.linea,
      group: catalogState.group,
      shape: catalogState.shape,
      watt: '',
    }).map((p) => p.potencia),
    (a, b) => wattSortValue(a) - wattSortValue(b)
  );
}

function selectedProduct() {
  if (!wattReady() || !catalogState.watt) return null;
  const matches = matchingProducts(catalogState);
  return matches.length === 1 ? matches[0] : null;
}

function previewImage() {
  const product = selectedProduct();
  if (product) return product.image;

  if (catalogState.group && catalogState.shape) {
    return img(studioForSpot(catalogState.group, catalogState.shape));
  }
  if (catalogState.group && GROUP_STUDIO[catalogState.group]) {
    return img(GROUP_STUDIO[catalogState.group]);
  }
  const section = sectionForLinea(catalogState.linea);
  return section ? section.image : '';
}

function specRows(product) {
  const rows = [
    ['Modelo', product.modelo],
    ['Potencia', product.potencia],
    ['Flujo luminoso', product.flujo],
    ['Voltaje', product.voltaje],
    ['Temp. color', product.temp],
    ['Base', product.base],
    ['Forma', product.forma && product.forma !== '—' && product.forma !== 'Focos' ? product.forma : ''],
    ['Tamaño', product.tamano],
    ['Perforación', product.perforacion],
    ['Autonomía', product.autonomia],
  ];
  return rows.filter(([, value]) => value);
}

function finderStageHtml() {
  const product = selectedProduct();
  const photo = previewImage();
  const group = groupMeta(catalogState.group);
  const section = sectionForLinea(catalogState.linea);

  if (!catalogState.linea) {
    return `
      <div class="finder-empty">
        <div class="finder-empty-kicker">Cómo elegir</div>
        <h3>Elige la línea, luego la potencia</h3>
        <p>Igual que el catálogo de fábrica: primero el tipo de luminaria, después el wattage. La foto y la ficha aparecen cuando el modelo queda definido.</p>
      </div>
    `;
  }

  if (!product) {
    const hint = !wattReady()
      ? needsGroupStep() && !catalogState.group
        ? 'Sigue con la serie para acotar el wattage.'
        : 'Elige la forma para ver las potencias de ese plafón.'
      : 'Ahora sí: elige los watts y sale el modelo exacto.';
    return `
      <div class="finder-result is-pending">
        <div class="finder-photo">${photo ? `<img src="${photo}" alt="">` : ''}</div>
        <div class="finder-copy">
          <div class="p-cat">${group ? group.kicker : section.eyebrow}</div>
          <h3>${group ? group.title : section.title}</h3>
          <p>${group ? group.blurb : section.intro}</p>
          <p class="finder-hint">${hint}</p>
        </div>
      </div>
    `;
  }

  const rows = specRows(product)
    .map(([label, value]) => `<tr><th>${label}</th><td>${value}</td></tr>`)
    .join('');

  return `
    <div class="finder-result">
      <div class="finder-photo">${productPhotoHtml(product)}</div>
      <div class="finder-copy">
        <div class="p-cat">${product.subcategoria}</div>
        <h3>${product.nombre}</h3>
        <p>${group ? group.blurb : ''}</p>
        <table class="finder-specs">
          <tbody>${rows}</tbody>
        </table>
        ${addToCartButtonHtml(product)}
      </div>
    </div>
  `;
}

function optionListHtml(options, selected, emptyLabel) {
  if (!options.length) {
    return `<li><span class="filter-dropdown-empty">${emptyLabel}</span></li>`;
  }
  return options
    .map(
      (option) => `
      <li>
        <button
          type="button"
          class="filter-dropdown-option${selected === option.value ? ' is-selected' : ''}"
          role="option"
          aria-selected="${selected === option.value}"
          data-value="${option.value}"
        >${option.label}</button>
      </li>`
    )
    .join('');
}

function setDropdownEnabled(dropdown, enabled, valueText) {
  const trigger = dropdown.querySelector('.filter-dropdown-trigger');
  const valueEl = dropdown.querySelector('.filter-dropdown-value');
  dropdown.classList.toggle('is-disabled', !enabled);
  if (trigger) {
    trigger.disabled = !enabled;
    trigger.setAttribute('aria-disabled', String(!enabled));
  }
  if (valueEl) valueEl.textContent = valueText;
}

function renderFinderDropdowns() {
  const lineaDrop = document.getElementById('lineaFilter');
  const groupDrop = document.getElementById('groupFilter');
  const shapeDrop = document.getElementById('shapeFilter');
  const wattDrop = document.getElementById('wattFilter');
  const groupStep = document.getElementById('groupStep');
  const shapeStep = document.getElementById('shapeStep');
  if (!lineaDrop || !wattDrop) return;

  const lineaList = lineaDrop.querySelector('.filter-dropdown-list');
  lineaList.innerHTML = optionListHtml(
    lineaOptions.map((linea) => ({ value: linea, label: linea })),
    catalogState.linea
  );
  setDropdownEnabled(lineaDrop, true, catalogState.linea || PLACEHOLDER);

  const showGroup = needsGroupStep();
  if (groupStep) groupStep.hidden = !showGroup;
  if (groupDrop) {
    const groups = groupsForLinea(catalogState.linea);
    const list = groupDrop.querySelector('.filter-dropdown-list');
    if (list) {
      list.innerHTML = optionListHtml(
        groups.map((group) => ({ value: group.id, label: group.finderLabel })),
        catalogState.group,
        'Elige primero la línea'
      );
    }
    const selectedGroup = groupMeta(catalogState.group);
    setDropdownEnabled(
      groupDrop,
      Boolean(catalogState.linea && showGroup),
      selectedGroup ? selectedGroup.finderLabel : PLACEHOLDER
    );
  }

  const showShape = Boolean(catalogState.linea) && needsShapeStep();
  if (shapeStep) shapeStep.hidden = !showShape;
  if (shapeDrop) {
    const list = shapeDrop.querySelector('.filter-dropdown-list');
    const shapes = availableShapes();
    if (list) {
      list.innerHTML = optionListHtml(
        shapes.map((shape) => ({ value: shape, label: shape })),
        catalogState.shape,
        'Elige primero la serie'
      );
    }
    setDropdownEnabled(shapeDrop, showShape, catalogState.shape || PLACEHOLDER);
  }

  const watts = availableWatts();
  const wattList = wattDrop.querySelector('.filter-dropdown-list');
  wattDrop.dataset.layout = watts.length > 4 ? 'grid' : '';
  wattList.classList.toggle('filter-dropdown-list--grid', watts.length > 4);
  wattList.innerHTML = optionListHtml(
    watts.map((watt) => ({ value: watt, label: watt })),
    catalogState.watt,
    'Completa los pasos anteriores'
  );
  setDropdownEnabled(wattDrop, wattReady(), catalogState.watt || PLACEHOLDER);
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
  if (dropdown.classList.contains('is-disabled')) return;
  closeAllFilterDropdowns();
  const trigger = dropdown.querySelector('.filter-dropdown-trigger');
  const panel = dropdown.querySelector('.filter-dropdown-panel');
  dropdown.classList.add('open');
  if (trigger) trigger.setAttribute('aria-expanded', 'true');
  if (panel) panel.hidden = false;
}

function setFinderValue(key, value) {
  catalogState[key] = value;
  if (key === 'linea') {
    catalogState.group = '';
    catalogState.shape = '';
    catalogState.watt = '';
    const groups = groupsForLinea(value);
    if (groups.length === 1) catalogState.group = groups[0].id;
  }
  if (key === 'group') {
    catalogState.shape = '';
    catalogState.watt = '';
  }
  if (key === 'shape') {
    catalogState.watt = '';
  }
  renderFinder();
}

function renderFinder() {
  const stage = document.getElementById('productStage');
  renderFinderDropdowns();
  if (stage) stage.innerHTML = finderStageHtml();
  if (typeof refreshProductCardButtons === 'function') {
    refreshProductCardButtons();
  }
}

function resetFinder() {
  catalogState.linea = '';
  catalogState.group = '';
  catalogState.shape = '';
  catalogState.watt = '';
  renderFinder();
}

function initFilterDropdowns() {
  const dropdowns = document.querySelectorAll('.filter-dropdown');
  if (!dropdowns.length) return;

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('.filter-dropdown-trigger');
    const list = dropdown.querySelector('.filter-dropdown-list');
    if (!trigger || !list) return;

    trigger.addEventListener('click', () => {
      if (dropdown.classList.contains('is-disabled')) return;
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
      setFinderValue(key, option.dataset.value);
      closeAllFilterDropdowns();
      trigger.focus();
    });
  });

  document.getElementById('finderReset')?.addEventListener('click', resetFinder);

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
  renderFinder();
}
