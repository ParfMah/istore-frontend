// catalogue.js — iStore Pro
// Utilise les produits intégrés (products.data.js) en priorité
// Si l'API backend répond, elle prend le dessus automatiquement

let allProducts = [];
let currentPage = 1;
const PER_PAGE  = 12;

// ── Chargement produits ───────────────────────────────────────
async function loadCatalogue() {
  try {
    // Tentative API backend avec timeout 3 secondes
    const apiProducts = await Promise.race([
      API.get('/products?limit=200'),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000))
    ]);
    if (Array.isArray(apiProducts) && apiProducts.length > 0) {
      allProducts = apiProducts;
    } else {
      throw new Error('API vide');
    }
  } catch(e) {
    // Fallback : données intégrées dans le frontend
    if (typeof PRODUCTS_DATA !== 'undefined' && PRODUCTS_DATA.length > 0) {
      allProducts = PRODUCTS_DATA;
    } else {
      document.getElementById('productGrid').innerHTML =
        '<p style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);">Impossible de charger les produits.</p>';
      document.getElementById('resultCount').textContent = '';
      return;
    }
  }
  applyFilters();
}

// ── Filtrage + tri ────────────────────────────────────────────
function applyFilters() {
  currentPage = 1;
  const models   = [...document.querySelectorAll('#filterModel input:checked')].map(i => i.value);
  const variants = [...document.querySelectorAll('#filterVariant input:checked')].map(i => i.value);
  const conds    = [...document.querySelectorAll('#filterCondition input:checked')].map(i => i.value);
  const maxPrice = parseInt(document.getElementById('priceRange').value);
  const sortVal  = document.getElementById('sortSelect').value;

  let filtered = allProducts.filter(p => {
    if (models.length   && !models.includes(p.model))     return false;
    if (variants.length && !variants.includes(p.variant)) return false;
    if (p.priceReduced  > maxPrice)                        return false;
    if (conds.length) {
      const pCond = p.conditionGrade
        ? `grade-${p.conditionGrade.toLowerCase()}`
        : p.condition;
      if (!conds.includes(pCond)) return false;
    }
    return true;
  });

  if (sortVal === 'price-asc')  filtered.sort((a,b) => a.priceReduced - b.priceReduced);
  if (sortVal === 'price-desc') filtered.sort((a,b) => b.priceReduced - a.priceReduced);
  if (sortVal === 'newest')     filtered.sort((a,b) => new Date(b.createdAt||0) - new Date(a.createdAt||0));

  renderGrid(filtered);
  renderPagination(filtered.length);
  const n = filtered.length;
  document.getElementById('resultCount').textContent = `${n} produit${n > 1 ? 's' : ''} trouvé${n > 1 ? 's' : ''}`;
}

// ── Rendu grille ──────────────────────────────────────────────
function renderGrid(products) {
  const grid  = document.getElementById('productGrid');
  const start = (currentPage - 1) * PER_PAGE;
  const page  = products.slice(start, start + PER_PAGE);

  if (!page.length) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:5rem 0;color:var(--text-muted);">
        <p style="font-size:3rem;margin-bottom:1rem">🔍</p>
        <p style="font-size:var(--text-md);margin-bottom:.5rem">Aucun produit ne correspond à vos critères.</p>
        <p style="font-size:var(--text-sm);">Essayez de modifier les filtres.</p>
      </div>`;
    return;
  }
  grid.innerHTML = page.map(p => renderProductCard(p)).join('');
}

// ── Pagination ────────────────────────────────────────────────
function renderPagination(total) {
  const pages = Math.ceil(total / PER_PAGE);
  const pag   = document.getElementById('pagination');
  if (pages <= 1) { pag.innerHTML = ''; return; }
  let html = '';
  for (let i = 1; i <= pages; i++) {
    html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
  }
  pag.innerHTML = html;
}

function goToPage(n) {
  currentPage = n;
  applyFilters();
  document.querySelector('.catalogue-main').scrollIntoView({ behavior:'smooth' });
}

// ── Événements ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const range = document.getElementById('priceRange');
  const label = document.getElementById('priceVal');

  range.addEventListener('input', () => {
    label.textContent = `${parseInt(range.value).toLocaleString('fr-FR')} €`;
  });

  document.getElementById('applyFilters').addEventListener('click', applyFilters);
  document.getElementById('resetFilters').addEventListener('click', () => {
    document.querySelectorAll('.filter-checkboxes input').forEach(i => i.checked = false);
    range.value = 2000; label.textContent = '2 000 €';
    document.getElementById('sortSelect').value = 'price-asc';
    applyFilters();
  });
  document.getElementById('sortSelect').addEventListener('change', applyFilters);
  document.getElementById('toggleFilters').addEventListener('click', () => {
    document.getElementById('filtersPanel').classList.toggle('open');
  });

  loadCatalogue();
});
