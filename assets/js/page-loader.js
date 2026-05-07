// page-loader.js — iStore Pro
// Loader de page : apparaît brièvement au chargement, disparaît proprement
// Durée max : 800ms (expérience fluide garantie)

(function() {
  // Créer le loader immédiatement (avant le DOMContentLoaded)
  const loader = document.createElement('div');
  loader.id = 'pageLoader';
  loader.innerHTML = `
    <div class="pl-inner">
      <div class="pl-logo">
        <img src="assets/images/logo-icon.svg" alt="iStore Pro" class="pl-icon" onerror="this.style.display='none'"/>
        <svg class="pl-ring" viewBox="0 0 60 60">
          <circle class="pl-ring-bg" cx="30" cy="30" r="26"/>
          <circle class="pl-ring-spin" cx="30" cy="30" r="26"/>
        </svg>
      </div>
      <p class="pl-name">iStore Pro</p>
      <p class="pl-tagline">Chargement en cours…</p>
    </div>`;

  // Styles injectés directement pour être disponibles immédiatement
  const style = document.createElement('style');
  style.textContent = `
    #pageLoader {
      position: fixed; inset: 0; z-index: 99999;
      display: flex; align-items: center; justify-content: center;
      background: linear-gradient(160deg, #0a0f1e 0%, #0d1a35 50%, #1a1200 100%);
      transition: opacity 0.35s ease, visibility 0.35s ease;
    }
    #pageLoader.pl-hidden {
      opacity: 0; visibility: hidden; pointer-events: none;
    }
    .pl-inner {
      display: flex; flex-direction: column; align-items: center; gap: 16px;
      animation: plFadeIn 0.3s ease;
    }
    @keyframes plFadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
    .pl-logo {
      position: relative; width: 80px; height: 80px;
      display: flex; align-items: center; justify-content: center;
    }
    .pl-icon {
      width: 54px; height: 54px; position: absolute;
      z-index: 2; filter: drop-shadow(0 0 12px rgba(201,168,76,0.5));
    }
    .pl-ring {
      position: absolute; inset: 0; width: 80px; height: 80px;
      transform: rotate(-90deg);
    }
    .pl-ring-bg {
      fill: none; stroke: rgba(255,255,255,0.08); stroke-width: 3;
    }
    .pl-ring-spin {
      fill: none;
      stroke: url(#plGold);
      stroke-width: 3;
      stroke-linecap: round;
      stroke-dasharray: 60 164;
      animation: plSpin 0.9s cubic-bezier(0.4,0,0.2,1) infinite;
    }
    @keyframes plSpin {
      0%   { stroke-dashoffset: 0;   }
      100% { stroke-dashoffset: -224; }
    }
    .pl-name {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
      font-size: 22px; font-weight: 800; letter-spacing: -0.5px;
      background: linear-gradient(135deg, #fff 30%, #C9A84C 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .pl-tagline {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 11px; color: rgba(201,168,76,0.6);
      letter-spacing: 2px; text-transform: uppercase; font-weight: 500;
    }
  `;

  // Injecter le dégradé SVG pour le ring
  const svgDefs = `<svg width="0" height="0" style="position:absolute">
    <defs>
      <linearGradient id="plGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#FFD700"/>
        <stop offset="50%"  stop-color="#C9A84C"/>
        <stop offset="100%" stop-color="#0071E3"/>
      </linearGradient>
    </defs>
  </svg>`;

  // Insérer dans le DOM dès que possible
  document.addEventListener('DOMContentLoaded', function() {
    // Ajuster le chemin selon si on est dans admin/ ou racine
    const isAdmin   = window.location.pathname.includes('/admin/');
    const iconPath  = isAdmin
      ? '../assets/images/logo-icon.svg'
      : 'assets/images/logo-icon.svg';

    const icon = loader.querySelector('.pl-icon');
    if (icon) icon.src = iconPath;
  });

  function hide() {
    loader.classList.add('pl-hidden');
    // Supprimer du DOM après la transition
    setTimeout(() => {
      if (loader.parentNode) loader.parentNode.removeChild(loader);
      if (style.parentNode) style.parentNode.removeChild(style);
    }, 400);
  }

  // Insérer immédiatement
  if (document.head) {
    document.head.appendChild(style);
  } else {
    document.addEventListener('DOMContentLoaded', () => document.head.appendChild(style));
  }

  if (document.body) {
    document.body.appendChild(loader);
    document.body.insertAdjacentHTML('afterbegin', svgDefs);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(loader);
      document.body.insertAdjacentHTML('afterbegin', svgDefs);
    });
  }

  // ── Logique de disparition intelligente ─────────────────────
  // Disparaît dès que la page est prête OU après 800ms max
  const MAX_DURATION = 800;
  const startTime    = Date.now();

  function tryHide() {
    const elapsed = Date.now() - startTime;
    // Durée minimum d'affichage : 350ms (pour ne pas flasher)
    const remaining = Math.max(0, 350 - elapsed);
    setTimeout(hide, remaining);
  }

  // Écouter le chargement de la page
  if (document.readyState === 'complete') {
    tryHide();
  } else {
    window.addEventListener('load', tryHide);
  }

  // Timeout de sécurité absolu : 800ms
  setTimeout(hide, MAX_DURATION);

})();
