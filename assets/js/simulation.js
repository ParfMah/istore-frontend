// simulation.js — iStore Pro
// Taux d'intérêt selon l'état de l'appareil
const RATES = {
  'neuf':    0.03,   // 3%   — Neuf
  'grade-a': 0.015,  // 1.5% — Occasion Grade A (très bon état)
  'grade-b': 0.02,   // 2%   — Occasion Grade B (bon état)
  'grade-c': 0.025   // 2.5% — Occasion Grade C (état correct)
};

const MIN_APPORT_RATIO = 0.40; // Apport minimum 40%

// ── Charger les produits dans le select ──────────────────────
async function loadProducts() {
  let products = [];

  // 1) Tentative API backend
  try {
    const apiProducts = await Promise.race([
      API.get('/products?limit=200'),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000))
    ]);
    if (Array.isArray(apiProducts) && apiProducts.length > 0) {
      products = apiProducts;
    }
  } catch(e) {
    // Pas de backend — on continue avec les données locales
  }

  // 2) Fallback : données intégrées PRODUCTS_DATA
  if (products.length === 0 && typeof PRODUCTS_DATA !== 'undefined') {
    products = PRODUCTS_DATA;
  }

  // 3) Remplir le select
  const select = document.getElementById('simProduct');

  // Vider les options existantes (sauf la première)
  while (select.options.length > 1) select.remove(1);

  if (products.length === 0) {
    const opt = document.createElement('option');
    opt.textContent = 'Aucun produit disponible';
    opt.disabled = true;
    select.appendChild(opt);
    return;
  }

  // Grouper par modèle pour une meilleure lisibilité
  const grouped = {};
  products.forEach(p => {
    const key = p.model || 'Autre';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(p);
  });

  Object.entries(grouped).forEach(([model, items]) => {
    const group = document.createElement('optgroup');
    group.label = `── ${model} ──`;
    items.forEach(p => {
      const cond = p.conditionGrade
        ? `Grade ${p.conditionGrade}`
        : (p.condition === 'neuf' ? 'Neuf' : 'Occasion');
      const opt = document.createElement('option');
      opt.value   = p._id || p.id || '';
      opt.dataset.price = p.priceReduced;
      opt.dataset.condition = p.conditionGrade
        ? `grade-${p.conditionGrade.toLowerCase()}`
        : (p.condition || 'neuf');
      opt.textContent = `${p.name} ${p.storage || ''} · ${p.color || ''} — ${formatPrice(p.priceReduced)} (${cond})`;
      group.appendChild(opt);
    });
    select.appendChild(group);
  });

  // Pré-sélection via URL ?id=
  const id = getParam('id');
  if (id) {
    // Chercher l'option correspondante
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === id) {
        select.selectedIndex = i;
        handleProductSelect();
        break;
      }
    }
  }
}

// ── Sélection produit → sync condition + prix ────────────────
function handleProductSelect() {
  const select   = document.getElementById('simProduct');
  const opt      = select.options[select.selectedIndex];
  const condSel  = document.getElementById('simCondition');
  const manGroup = document.getElementById('manualPriceGroup');

  if (opt && opt.value) {
    manGroup.style.display = 'none';
    condSel.value = opt.dataset.condition || 'neuf';
  } else {
    manGroup.style.display = 'block';
  }
  updateApportHint();
}

// ── Obtenir le prix sélectionné ──────────────────────────────
function getPrice() {
  const select = document.getElementById('simProduct');
  const opt    = select.options[select.selectedIndex];
  if (opt && opt.value && opt.dataset.price) {
    return parseFloat(opt.dataset.price);
  }
  return parseFloat(document.getElementById('simPrice').value) || 0;
}

// ── Mettre à jour l'indicateur d'apport ─────────────────────
function updateApportHint() {
  const price  = getPrice();
  const apport = parseFloat(document.getElementById('simApport').value) || 0;
  const min    = price * MIN_APPORT_RATIO;
  const pct    = price > 0 ? Math.round((apport / price) * 100) : 0;
  const badge  = document.getElementById('apportPct');
  const warn   = document.getElementById('apportWarning');

  if (price > 0) {
    badge.textContent = `${pct}%`;
    badge.className   = 'badge ' + (pct >= 40 ? 'badge--success' : 'badge--error');
  } else {
    badge.textContent = '--';
    badge.className   = 'badge badge--neutral';
  }

  if (price > 0 && apport > 0 && apport < min) {
    warn.style.display = 'block';
    warn.textContent   = `⚠ Apport minimum requis : ${formatPrice(min)} (40% de ${formatPrice(price)})`;
  } else {
    warn.style.display = 'none';
  }
}

// ── Algorithme de calcul ─────────────────────────────────────
function calculate() {
  const price    = getPrice();
  const condKey  = document.getElementById('simCondition').value;
  const apport   = parseFloat(document.getElementById('simApport').value) || 0;
  const duration = parseInt(document.getElementById('simDuration').value);

  // Validations
  if (!price || price <= 0) {
    showToast('Veuillez sélectionner un produit ou saisir un prix.', 'error');
    return;
  }
  const minApport = price * MIN_APPORT_RATIO;
  if (apport < minApport) {
    showToast(`Apport minimum : ${formatPrice(minApport)} (40% de ${formatPrice(price)})`, 'error');
    return;
  }
  if (apport >= price) {
    showToast('L\'apport ne peut pas dépasser le prix total.', 'error');
    return;
  }

  // Calculs
  const rate         = RATES[condKey] || 0.03;
  const montantBase  = price - apport;           // montant à financer
  const interets     = montantBase * rate;        // intérêts totaux (taux × montant)
  const totalCredit  = montantBase + interets;    // total à rembourser (hors apport)
  const mensualite   = totalCredit / duration;    // mensualité
  const coutTotal    = apport + totalCredit;      // coût total de l'achat

  // Affichage des résultats
  document.getElementById('resPrix').textContent           = formatPrice(price);
  document.getElementById('resApport').textContent         = formatPrice(apport);
  document.getElementById('resMontantFinance').textContent  = formatPrice(montantBase);
  document.getElementById('resTaux').textContent           = `${(rate * 100).toFixed(1)}% (annuel)`;
  document.getElementById('resInterets').textContent       = formatPrice(interets);
  document.getElementById('resMensualite').textContent     = formatPrice(mensualite);
  document.getElementById('resDuree').textContent          = `${duration} mois`;
  document.getElementById('resCoutTotal').textContent      = formatPrice(coutTotal);

  const resultCard = document.getElementById('simResult');
  resultCard.style.display = 'block';
  setTimeout(() => resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
}

// ── Événements ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();

  document.getElementById('simProduct')
    .addEventListener('change', handleProductSelect);

  document.getElementById('simApport')
    .addEventListener('input', updateApportHint);

  document.getElementById('simPrice')
    .addEventListener('input', updateApportHint);

  document.getElementById('simulateBtn')
    .addEventListener('click', calculate);
});

// ── Aller à la commande ──────────────────────────────────────
function goToOrder() {
  const select = document.getElementById('simProduct');
  const opt    = select.options[select.selectedIndex];
  const id     = opt && opt.value ? opt.value : '';
  if (id) {
    window.location.href = `commande.html?id=${id}`;
  } else {
    showToast('Veuillez d\'abord sélectionner un produit.', 'error');
  }
}
