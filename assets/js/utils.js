// utils.js — iStore Pro

function formatPrice(amount) {
  return new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(amount);
}
function formatDate(dateStr) {
  return new Intl.DateTimeFormat('fr-FR',{day:'2-digit',month:'long',year:'numeric'}).format(new Date(dateStr));
}

function showAlert(el, type, message) {
  el.className = `alert alert--${type}`;
  el.textContent = message;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 6000);
}

function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;display:flex;flex-direction:column;gap:.75rem;';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  const bg = type === 'success' ? '#007a4d' : type === 'error' ? '#991b1b' : '#003d99';
  toast.style.cssText = `background:${bg};color:#fff;padding:1rem 1.25rem;border-radius:12px;font-size:.875rem;font-weight:500;box-shadow:0 8px 24px rgba(0,0,0,.18);min-width:280px;animation:slideIn .3s ease;`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function renderProductCard(p) {
  const image = (p.images && p.images[0]) ? p.images[0] : 'assets/images/placeholder-phone.svg';
  const conditionLabel = { neuf:'Neuf', 'grade-a':'Grade A', 'grade-b':'Grade B', 'grade-c':'Grade C' };
  const cond = p.conditionGrade ? `grade-${p.conditionGrade.toLowerCase()}` : (p.condition || 'neuf');
  const label = conditionLabel[cond] || p.condition || 'Neuf';
  const badgeClass = cond === 'neuf' ? 'badge--new' : cond === 'grade-a' ? 'badge--green' : cond === 'grade-b' ? 'badge--primary' : 'badge--warning';
  const stockOk = typeof p.stock === 'undefined' || p.stock > 3;
  const stockLow = p.stock > 0 && p.stock <= 3;
  const stockOut = p.stock === 0;
  const stockHtml = stockOut
    ? `<span style="font-size:.8rem;font-weight:600;color:var(--error);">✗ Rupture de stock</span>`
    : stockLow
      ? `<span style="font-size:.8rem;font-weight:600;color:var(--warning);">⚠ Plus que ${p.stock} en stock</span>`
      : `<span style="font-size:.8rem;font-weight:600;color:var(--green);">✓ En stock</span>`;
  const href = `produit.html?id=${p._id || p.id || ''}`;
  const simHref = `simulation.html?id=${p._id || p.id || ''}`;

  return `
    <article class="product-card" onclick="window.location.href='${href}'">
      <div class="product-card__image">
        <img src="${image}" alt="${p.name}" loading="lazy"
             onerror="this.src='assets/images/placeholder-phone.svg'"/>
      </div>
      <div class="product-card__body">
        <div class="product-card__badges">
          <span class="badge ${badgeClass}">${label}</span>
          ${p.featured ? '<span class="badge badge--green">⭐ Populaire</span>' : ''}
        </div>
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__sub">${p.storage || ''} · ${p.color || ''}</p>
        <div class="product-card__price">
          <p class="price-original">${formatPrice(p.priceOriginal)}</p>
          <p class="price-reduced">${formatPrice(p.priceReduced)} <span>TTC</span></p>
        </div>
        ${stockHtml}
      </div>
      <div class="product-card__footer">
        <a href="${href}" class="btn btn--gold btn--sm" onclick="event.stopPropagation()">Voir</a>
        <a href="commande.html?id=${p._id || p.id || ''}" class="btn btn--primary btn--sm" onclick="event.stopPropagation()">Commander</a>
      </div>
    </article>`;
}

// ── Hamburger → croix rouge ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const nav       = document.querySelector('.header__nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
    // Fermer le menu si on clique sur un lien
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }
});

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
function debounce(fn, delay = 300) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}
