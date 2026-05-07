// produit.js — iStore Pro

async function loadProduct() {
  const id        = getParam('id');
  const container = document.getElementById('productDetail');

  if (!id) {
    container.innerHTML = `
      <div style="text-align:center;padding:4rem;color:var(--text-muted);">
        <p style="font-size:3rem;margin-bottom:1rem">❌</p>
        <p>Produit introuvable. <a href="catalogue.html" style="color:var(--primary);">Retour au catalogue</a></p>
      </div>`;
    return;
  }

  let p = null;

  // 1) Tentative API backend
  try {
    p = await Promise.race([
      API.get(`/products/${id}`),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000))
    ]);
  } catch(e) {
    // Pas de backend — chercher dans PRODUCTS_DATA
  }

  // 2) Fallback données locales
  if (!p && typeof PRODUCTS_DATA !== 'undefined') {
    p = PRODUCTS_DATA.find(x => (x._id || x.id) === id);
  }

  if (!p) {
    container.innerHTML = `
      <div style="text-align:center;padding:4rem;color:var(--text-muted);">
        <p style="font-size:3rem;margin-bottom:1rem">🔍</p>
        <p>Produit non trouvé. <a href="catalogue.html" style="color:var(--primary);">Retour au catalogue</a></p>
      </div>`;
    return;
  }

  document.title = `${p.name} — iStore Pro`;

  const cond = p.conditionGrade ? `grade-${p.conditionGrade.toLowerCase()}` : (p.condition || 'neuf');
  const condLabels = { neuf:'Neuf', 'grade-a':'Grade A', 'grade-b':'Grade B', 'grade-c':'Grade C' };
  const condDesc   = {
    neuf     : 'Appareil neuf, jamais utilisé, livré sous blister avec tous les accessoires d\'origine. Garantie Apple 1 an.',
    'grade-a': 'Très bon état. Légères traces invisibles à l\'usage. Batterie ≥ 85%. Testé et certifié iStore. Garantie 6 mois.',
    'grade-b': 'Bon état. Micro-rayures légères sur la coque, écran parfait. Batterie ≥ 80%. Certifié iStore. Garantie 6 mois.',
    'grade-c': 'État correct. Rayures visibles, écran intact. Batterie ≥ 75%. Idéal petit budget. Certifié iStore. Garantie 3 mois.'
  };

  const images  = (p.images && p.images.length) ? p.images : ['assets/images/placeholder-phone.svg'];
  const mainImg = images[0];
  const pId     = p._id || p.id || '';

  const thumbs = images.map((img, i) => `
    <div class="gallery-thumb ${i===0?'active':''}" onclick="switchImage('${img}', this)">
      <img src="${img}" alt="Vue ${i+1}" onerror="this.src='assets/images/placeholder-phone.svg'"/>
    </div>`).join('');

  const specs = p.specs ? Object.entries(p.specs).map(([k,v]) => `
    <div class="spec-row">
      <span class="spec-row__key">${k.charAt(0).toUpperCase()+k.slice(1)}</span>
      <span class="spec-row__val">${v}</span>
    </div>`).join('') : '';

  const stockClass = p.stock > 3 ? 'ok' : p.stock > 0 ? 'low' : 'out';
  const stockText  = p.stock > 3
    ? '✓ En stock'
    : p.stock > 0
      ? `⚠ Plus que ${p.stock} en stock`
      : '✗ Rupture de stock';

  const badgeClass = cond === 'neuf' ? 'badge--new'
    : cond === 'grade-a' ? 'badge--success'
    : cond === 'grade-b' ? 'badge--primary'
    : 'badge--warning';

  container.innerHTML = `
    <div class="product-detail__breadcrumb">
      <a href="index.html">Accueil</a> ›
      <a href="catalogue.html">Catalogue</a> ›
      <span>${p.name}</span>
    </div>

    <div class="product-detail__layout">

      <!-- GALERIE -->
      <div class="product-gallery">
        <div class="gallery-main">
          <img src="${mainImg}" alt="${p.name}" id="mainImg"
               onerror="this.src='assets/images/placeholder-phone.svg'"/>
        </div>
        <div class="gallery-thumbs">${thumbs}</div>
      </div>

      <!-- INFOS -->
      <div class="product-info">
        <div class="product-info__badges">
          <span class="badge ${badgeClass}">${condLabels[cond] || cond}</span>
          ${p.featured ? '<span class="badge badge--gold">⭐ Populaire</span>' : ''}
          ${p.storage ? `<span class="badge badge--neutral">${p.storage}</span>` : ''}
        </div>

        <h1 class="product-info__name">${p.name}</h1>
        <p class="product-info__sub">${(p.variant||'').toUpperCase()} · ${p.color || ''}</p>

        <div class="product-info__price">
          <p class="price-original">${formatPrice(p.priceOriginal)}</p>
          <p class="price-reduced">${formatPrice(p.priceReduced)} <span>TTC</span></p>
        </div>

        <p class="stock-info ${stockClass}" style="margin-bottom:1.5rem">${stockText}</p>

        <div class="product-info__condition">
          <h4>État : ${condLabels[cond] || cond}</h4>
          <p>${condDesc[cond] || ''}</p>
        </div>

        <div class="product-info__actions">
          ${p.stock !== 0 ? `
            <a href="commande.html?id=${pId}" class="btn btn--gold btn--lg" onclick="event.stopPropagation()">
              🛍️ Commander maintenant
            </a>
            <a href="simulation.html?id=${pId}" class="btn btn--outline btn--lg" onclick="event.stopPropagation()">
              📊 Simuler mon crédit
            </a>` : `
            <button class="btn btn--ghost btn--lg" disabled>✗ Rupture de stock</button>
          `}
        </div>

        <div class="product-info__description">
          <h3>Description</h3>
          <p>${p.description || ''}</p>
        </div>

        ${specs ? `
        <div class="product-specs">
          <h3>Caractéristiques techniques</h3>
          ${specs}
        </div>` : ''}
      </div>

    </div>`;
}

function switchImage(src, el) {
  document.getElementById('mainImg').src = src;
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

document.addEventListener('DOMContentLoaded', loadProduct);
