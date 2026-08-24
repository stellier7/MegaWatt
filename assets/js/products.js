// Catalog finder: seven family dropdowns from the MegaWatt PDF.
// Open a type, pick watts (and shape when needed), then the studio shot + ficha appear.
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
        menuLabel: 'Bombillos SMD',
        finderLabel: 'SMD Tipo A · 7–18W',
        title: 'Bombillo LED SMD · Tipo A',
        blurb: 'Driver DOB integrado, sin parpadeo y opción de chip SAMSUNG. Uso general en interiores.',
      },
      {
        id: 'skbt',
        kicker: 'SKBT · 20W a 60W',
        menuLabel: 'Alta potencia',
        finderLabel: 'Alta potencia · 20–60W',
        title: 'Bombillo LED alta potencia · Serie T',
        blurb: 'Cuerpo de plástico térmico + aluminio para mayor disipación. Ideal para bodegas, talleres y áreas amplias.',
      },
      {
        id: 'skbta',
        kicker: 'SKBTA · 70W a 100W',
        menuLabel: 'Industrial',
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
        menuLabel: 'Empotrable slim',
        finderLabel: 'Slim · 3–18W',
        title: 'Panel LED empotrable · slim',
        blurb: 'Plafón ultradelgado (< 25 mm) con driver DOB integrado y carcasa PP ignífuga. Redondo (SKRF205R) y cuadrado (SKRF205S).',
      },
      {
        id: 'skrp',
        kicker: 'SKRP24 / 25 · 3+3W a 18+6W',
        menuLabel: 'Empotrable bicolor',
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
        menuLabel: 'Emergencia',
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
        menuLabel: 'Alumbrado público',
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

const catalogState = {
  productId: '',
};

const PLACEHOLDER = 'Elegir watts';

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

function finderFamilies() {
  return catalogSections.flatMap((section) =>
    section.groups.map((group) => ({
      ...group,
      linea: section.linea,
    }))
  );
}

function groupMeta(groupId) {
  return finderFamilies().find((group) => group.id === groupId) || null;
}

function productsInGroup(groupId) {
  return products
    .filter((p) => p.group === groupId)
    .sort((a, b) => {
      const watt = wattSortValue(a.potencia) - wattSortValue(b.potencia);
      if (watt !== 0) return watt;
      return String(a.forma).localeCompare(String(b.forma));
    });
}

function skuOptionLabel(product) {
  if (product.forma && product.forma !== '—' && product.forma !== 'Focos') {
    return `${product.potencia} · ${product.forma}`;
  }
  return product.potencia;
}

function selectedProduct() {
  if (!catalogState.productId) return null;
  return products.find((p) => p.id === catalogState.productId) || null;
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
  const group = product ? groupMeta(product.group) : null;

  if (!product) {
    return `
      <div class="finder-empty">
        <div class="finder-empty-kicker">Cómo elegir</div>
        <h3>Abre una categoría y elige los watts</h3>
        <p>Siete tipos, como en el catálogo de fábrica. Cada menú trae solo las potencias de esa línea. La foto de estudio y la ficha salen al elegir el modelo.</p>
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

function familyDropdownHtml(group) {
  const selected = selectedProduct();
  const active = selected && selected.group === group.id;
  const triggerLabel = active ? skuOptionLabel(selected) : PLACEHOLDER;
  const items = productsInGroup(group.id);
  const useGrid = items.length > 4 && items.every((p) => p.forma === 'Focos' || p.forma === '—');
  const options = items
    .map(
      (product) => `
        <li>
          <button
            type="button"
            class="filter-dropdown-option${selected && selected.id === product.id ? ' is-selected' : ''}"
            role="option"
            aria-selected="${Boolean(selected && selected.id === product.id)}"
            data-product-id="${product.id}"
          >${skuOptionLabel(product)}</button>
        </li>`
    )
    .join('');

  return `
    <div class="filter-group finder-family${active ? ' is-active' : ''}" data-group="${group.id}">
      <span class="fg-label">${group.menuLabel}</span>
      <div class="filter-dropdown${useGrid ? ' is-watt-grid' : ''}" data-group="${group.id}"${useGrid ? ' data-layout="grid"' : ''}>
        <button type="button" class="filter-dropdown-trigger" aria-haspopup="listbox" aria-expanded="false">
          <span class="filter-dropdown-value">${triggerLabel}</span>
        </button>
        <div class="filter-dropdown-panel" hidden>
          <ul class="filter-dropdown-list${useGrid ? ' filter-dropdown-list--grid' : ''}" role="listbox">${options}</ul>
        </div>
      </div>
    </div>
  `;
}

function renderFinderDropdowns() {
  const root = document.getElementById('finderFamilies');
  if (!root) return;
  root.innerHTML = finderFamilies().map(familyDropdownHtml).join('');
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
}

function selectFinderProduct(productId) {
  catalogState.productId = productId;
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
  catalogState.productId = '';
  renderFinder();
}

function initFilterDropdowns() {
  const bar = document.getElementById('finderFamilies');
  if (!bar) return;

  bar.addEventListener('click', (e) => {
    const option = e.target.closest('.filter-dropdown-option');
    if (option) {
      e.preventDefault();
      selectFinderProduct(option.dataset.productId);
      return;
    }

    const trigger = e.target.closest('.filter-dropdown-trigger');
    if (!trigger) return;
    const dropdown = trigger.closest('.filter-dropdown');
    if (!dropdown) return;
    if (dropdown.classList.contains('open')) {
      closeAllFilterDropdowns();
    } else {
      openFilterDropdown(dropdown);
    }
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
