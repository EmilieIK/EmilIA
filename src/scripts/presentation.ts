// Soutenance : diaporama (slideshow) des diapositives SVG.
// Une diapo à la fois (gating html.deck-ready), navigation flèches/clavier/clic,
// sommaire cliquable, et plein écran (Fullscreen API sur le conteneur du deck).
// Sans JS : toutes les diapos restent empilées et consultables.

const deck = document.getElementById('diapos');
const slides = Array.from(document.querySelectorAll<HTMLElement>('[data-slide]'));

if (deck && slides.length > 0) {
  const total = slides.length;
  const html = document.documentElement;
  const stage = deck.querySelector<HTMLElement>('[data-deck-stage]');
  const live = deck.querySelector<HTMLElement>('[data-deck-live]');
  const counterNow = deck.querySelector<HTMLElement>('[data-deck-now]');
  const prevBtns = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-deck-prev]'));
  const nextBtns = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-deck-next]'));
  const fsBtns = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-deck-fs]'));
  const gotoLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-deck-goto]'));

  let current = 0;

  // Bascule en mode « une diapo à la fois » (sinon, sans JS, tout reste empilé).
  html.classList.add('deck-ready');

  let liveTimer: number | undefined;
  function announce(text: string) {
    if (!live) return;
    window.clearTimeout(liveTimer);
    live.textContent = '';
    liveTimer = window.setTimeout(() => { live.textContent = text; }, 150);
  }

  function show(n: number, focus = false) {
    current = Math.max(0, Math.min(total - 1, n));
    slides.forEach((s, i) => {
      const active = i === current;
      s.classList.toggle('is-current', active);
      s.toggleAttribute('hidden', !active);
      if (active && focus) { s.tabIndex = -1; s.focus({ preventScroll: true }); }
    });
    if (counterNow) counterNow.textContent = String(current + 1);
    prevBtns.forEach((b) => { b.disabled = current === 0; });
    nextBtns.forEach((b) => { b.disabled = current === total - 1; });
    gotoLinks.forEach((a, i) => {
      if (i === current) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    announce(`Diapositive ${current + 1} sur ${total}`);
  }

  function next() {
    if (current >= total - 1) { announce('Dernière diapositive.'); return; }
    show(current + 1, true);
  }
  function prev() {
    if (current <= 0) { announce('Première diapositive.'); return; }
    show(current - 1, true);
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    } else {
      deck!.requestFullscreen?.().catch(() => {});
    }
  }
  document.addEventListener('fullscreenchange', () => {
    const on = document.fullscreenElement === deck;
    html.classList.toggle('deck-fs', on);
    fsBtns.forEach((b) => b.setAttribute('aria-pressed', on ? 'true' : 'false'));
  });

  prevBtns.forEach((b) => b.addEventListener('click', prev));
  nextBtns.forEach((b) => b.addEventListener('click', next));
  fsBtns.forEach((b) => b.addEventListener('click', toggleFullscreen));
  gotoLinks.forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    show(parseInt(a.dataset.deckGoto || '0', 10) || 0, true);
    deck!.scrollIntoView({ block: 'start' });
  }));

  // Clic sur la diapo (hors contrôles/liens) = diapo suivante (confort de présentation).
  stage?.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a, button')) return;
    next();
  });

  // Clavier. ← → et F agissent sur toute la page (comme annoncé sous le diaporama) ;
  // les touches de défilement (Page, Début/Fin, Espace) ne sont captées qu'en mode
  // engagé (plein écran ou focus dans le diaporama) pour ne pas gêner la lecture.
  document.addEventListener('keydown', (e) => {
    const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    const engaged = !!document.fullscreenElement || deck.contains(document.activeElement);
    switch (e.key) {
      case 'ArrowRight': e.preventDefault(); next(); break;
      case 'ArrowLeft': e.preventDefault(); prev(); break;
      case 'f': case 'F': e.preventDefault(); toggleFullscreen(); break;
      case 'PageDown': case ' ': if (engaged) { e.preventDefault(); next(); } break;
      case 'PageUp': if (engaged) { e.preventDefault(); prev(); } break;
      case 'Home': if (engaged) { e.preventDefault(); show(0, true); } break;
      case 'End': if (engaged) { e.preventDefault(); show(total - 1, true); } break;
    }
  });

  // Lien profond : #diapo-N ou ?diapo=N → ouvrir sur la bonne diapo.
  const params = new URLSearchParams(location.search);
  const fromHash = parseInt((location.hash.match(/diapo-(\d+)/) || [])[1] || '', 10);
  const fromParam = parseInt(params.get('diapo') || '', 10);
  const start = (fromParam || fromHash || 1) - 1;
  show(Number.isFinite(start) && start >= 0 && start < total ? start : 0);
}

export {};
