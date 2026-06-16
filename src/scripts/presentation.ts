// Mode présentation de la soutenance (approche « in situ », source DOM unique).
// Les 7 sections .diapo restent consultables en flux ; le mode présentation les
// transforme en overlay plein écran (classe html.is-presenting), une diapo à la
// fois, navigation clavier, focus contenu par inertage du reste de la page.

const wrap = document.getElementById('diapos');
const slides = Array.from(document.querySelectorAll<HTMLElement>('[data-slide]'));

if (wrap && slides.length > 0) {
  const total = slides.length;
  const openBtn = document.querySelector<HTMLButtonElement>('[data-present-open]');
  const live = wrap.querySelector<HTMLElement>('[data-present-live]');
  const progress = wrap.querySelector<HTMLElement>('[data-present-progress]');
  const fsBtn = wrap.querySelector<HTMLButtonElement>('[data-present-fs]');
  // Éléments « chrome » à inerter pendant la présentation.
  const chrome = [
    document.querySelector('.site-header'),
    document.querySelector('.site-footer'),
    document.getElementById('intro-soutenance'),
  ].filter(Boolean) as HTMLElement[];

  let current = 0;
  let presenting = false;
  let lastTrigger: HTMLElement | null = null;

  let liveTimer: number | undefined;
  function announce(text: string) {
    if (!live) return;
    window.clearTimeout(liveTimer);
    live.textContent = '';
    liveTimer = window.setTimeout(() => { live.textContent = text; }, 150);
  }

  function show(i: number) {
    current = Math.max(0, Math.min(total - 1, i));
    slides.forEach((s, idx) => {
      const active = idx === current;
      s.hidden = !active;
      s.classList.toggle('is-current', active);
      if (active) { s.tabIndex = -1; s.focus(); }
    });
    if (progress) progress.textContent = `${current + 1} / ${total}`;
    // Position seule : le titre est déjà porté par la section focalisée
    // (aria-labelledby vers son <h2>) — éviter de l'énoncer deux fois.
    announce(`Diapositive ${current + 1} sur ${total}`);
  }

  function enter(start = 0) {
    if (presenting) return;
    lastTrigger = document.activeElement as HTMLElement;
    presenting = true;
    document.documentElement.classList.add('is-presenting');
    // inert masque le chrome (focus + arbre d'accessibilité) ; aria-hidden est
    // un repli volontaire pour les rares navigateurs sans support de `inert`.
    chrome.forEach((el) => { el.setAttribute('inert', ''); el.setAttribute('aria-hidden', 'true'); });
    show(start);
  }

  function exit() {
    if (!presenting) return;
    presenting = false;
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    document.documentElement.classList.remove('is-presenting');
    chrome.forEach((el) => { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); });
    slides.forEach((s) => { s.hidden = false; s.classList.remove('is-current'); });
    // Focus rendu au bouton déclencheur (toujours présent) ; repli sur le dernier élément actif.
    (openBtn || lastTrigger)?.focus();
  }

  function next() {
    if (current >= total - 1) { announce('Dernière diapositive.'); return; }
    show(current + 1);
  }
  function prev() {
    if (current <= 0) { announce('Première diapositive.'); return; }
    show(current - 1);
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    } else {
      wrap!.requestFullscreen?.().catch(() => {});
    }
  }
  document.addEventListener('fullscreenchange', () => {
    if (fsBtn) fsBtn.textContent = document.fullscreenElement ? 'Quitter le plein écran (F)' : 'Plein écran (F)';
  });

  openBtn?.addEventListener('click', () => enter(0));
  wrap.querySelector('[data-present-next]')?.addEventListener('click', next);
  wrap.querySelector('[data-present-prev]')?.addEventListener('click', prev);
  wrap.querySelector('[data-present-quit]')?.addEventListener('click', exit);
  fsBtn?.addEventListener('click', toggleFullscreen);

  document.addEventListener('keydown', (e) => {
    if (!presenting) return;
    switch (e.key) {
      case 'ArrowRight': case 'PageDown': e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'PageUp': e.preventDefault(); prev(); break;
      case 'Home': e.preventDefault(); show(0); break;
      case 'End': e.preventDefault(); show(total - 1); break;
      case 'Escape': e.preventDefault(); exit(); break;
      case 'f': case 'F': e.preventDefault(); toggleFullscreen(); break;
    }
  });

  // Lien profond : ?present, ?present=N ou #diapo-N → ouvrir sur la bonne diapo.
  const params = new URLSearchParams(location.search);
  if (params.has('present')) {
    const fromParam = parseInt(params.get('present') || '', 10);
    const fromHash = parseInt((location.hash.match(/diapo-(\d+)/) || [])[1] || '', 10);
    const n = (fromParam || fromHash || 1) - 1;
    enter(Number.isFinite(n) && n >= 0 && n < total ? n : 0);
  }
}

export {};
