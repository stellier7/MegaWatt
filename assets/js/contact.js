const MEGAWATT_WHATSAPP = '50495002199';

function whatsAppUrl(message) {
  const base = 'https://wa.me/' + MEGAWATT_WHATSAPP;
  if (!message) return base;
  return base + '?text=' + encodeURIComponent(message);
}

function buildDistributorLeadMessage() {
  const name = document.getElementById('lead-name')?.value.trim() || '';
  const business = document.getElementById('lead-business')?.value.trim() || '';
  const phone = document.getElementById('lead-phone')?.value.trim() || '';
  const city = document.getElementById('lead-city')?.value.trim() || '';
  const seller = getSellerFromUrl();

  const lines = ['Hola, quiero ser distribuidor MegaWatt.', ''];
  if (name) lines.push('Nombre: ' + name);
  if (business) lines.push('Negocio: ' + business);
  if (phone) lines.push('Teléfono: ' + phone);
  if (city) lines.push('Ciudad: ' + city);
  if (seller) lines.push('Referido por: ' + seller);

  return lines.join('\n').trim();
}

function submitDistributorLead() {
  const name = document.getElementById('lead-name')?.value.trim();
  const phone = document.getElementById('lead-phone')?.value.trim();

  if (!name || !phone) {
    alert('Por favor ingresa al menos tu nombre y teléfono.');
    return;
  }

  window.open(whatsAppUrl(buildDistributorLeadMessage()), '_blank', 'noopener');
}

function initContact() {
  const waLink = document.querySelector('.wa-link');
  if (waLink) {
    waLink.href = whatsAppUrl('Hola, me interesa ser distribuidor MegaWatt.');
    waLink.removeAttribute('onclick');
  }

  const submitBtn = document.querySelector('.lead-form .submit-btn');
  if (submitBtn) {
    submitBtn.onclick = submitDistributorLead;
  }
}
