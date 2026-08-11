/** Shared WhatsApp helpers (vendedor activo o Ferretería El Jordán). */

function activeWhatsAppNumber() {
  const seller = typeof getResolvedSeller === 'function' ? getResolvedSeller() : null;
  return seller?.whatsapp || JORDAN_WHATSAPP;
}

function whatsAppUrl(message, phone = activeWhatsAppNumber()) {
  const base = 'https://wa.me/' + phone;
  if (!message) return base;
  return base + '?text=' + encodeURIComponent(message);
}
