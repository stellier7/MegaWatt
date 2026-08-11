/** Ferretería El Jordán — contacto central (sin vendedor en la URL). */
const JORDAN_WHATSAPP = '50495002199';

/**
 * Vendedores MegaWatt (tarjetas NFC).
 * URL canónica: /v/{slug} → redirige a /?vendedor={slug}
 */
const SELLERS = {
  ramon: {
    name: 'Ramón Euceda',
    firstName: 'Ramón',
    whatsapp: '50432928908',
  },
  isaac: {
    name: 'Isaac Rodriguez',
    firstName: 'Isaac',
    whatsapp: '50431848938',
  },
  edson: {
    name: 'Edson Nuñez',
    firstName: 'Edson',
    whatsapp: '50432925571',
  },
  yeison: {
    name: 'Yeison Padilla',
    firstName: 'Yeison',
    whatsapp: '50432300141',
  },
  marvin: {
    name: 'Marvin Reyes',
    firstName: 'Marvin',
    whatsapp: '50498366204',
  },
  'jose-carlos': {
    name: 'Jose Carlos Dias',
    firstName: 'José Carlos',
    whatsapp: '50431527927',
  },
  nelson: {
    name: 'Nelson Leiva',
    firstName: 'Nelson',
    whatsapp: '50431548087',
  },
  edwin: {
    name: 'Edwin Ramos',
    firstName: 'Edwin',
    whatsapp: '50497811893',
  },
  ruth: {
    name: 'Ruth Alcerro',
    firstName: 'Ruth',
    whatsapp: '50494378923',
  },
  marwan: {
    name: 'Marwan Khaliliyeh',
    firstName: 'Marwan',
    whatsapp: '50496534139',
  },
};

function normalizeSellerKey(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/** @returns {{ slug: string, name: string, firstName: string, whatsapp: string } | null} */
function resolveSeller(raw) {
  if (!raw) return null;

  const key = normalizeSellerKey(raw);
  if (SELLERS[key]) {
    return { slug: key, ...SELLERS[key] };
  }

  for (const [slug, seller] of Object.entries(SELLERS)) {
    if (normalizeSellerKey(seller.name) === key) {
      return { slug, ...seller };
    }
    if (normalizeSellerKey(seller.firstName) === key) {
      return { slug, ...seller };
    }
  }

  return null;
}
