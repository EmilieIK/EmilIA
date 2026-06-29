// Soutenance : diaporama plein écran (consultation) + mode présentation (overlay).
// Source DOM unique : les sections .diapo servent les deux modes.
// - Consultation : chaque diapo occupe l'écran (scroll-snap CSS) ; les flèches font
//   défiler vers la diapo voisine, le compteur et la diapo courante sont suivis par
//   IntersectionObserver.
// - Présentation : overlay plein écran (html.is-presenting), une diapo à la fois,
//   navigation clavier, reste de la page inerté (focus + arbre d'accessibilité).

const wrap = document.getElementById('diapos');
const slides = Array.from(document.querySelectorAll<HTMLElement>('[data-slide]'));

if (wrap && slides.length > 0) {
  const total = slides.length;
  const html = document.documentElement;
  const openBtn = document.querySelector<HTMLButtonElement>('[data-present-open]');
  const live = wrap.querySelector<HTMLElement>('[data-present-live]');
  const progress = wrap.querySelector<HTMLElement>('[data-present-progress]');
  const counterNow = wrap.querySelector<HTMLElement>('[data-deck-now]');
  const fsBtn = wrap.querySelector<HTMLButtonElement>('[data-present-fs]');
  const prevBtns = Array.from(wrap.querySelectorAll<HTMLButtonElement>('[data-present-prev]'));
  const nextBtns = Array.from(wrap.querySelectorAll<HTMLButtonElement>('[data-present-next]'));
  const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.quicknav__link'));
  // Éléments « chrome » à inerter pendant la présentation.
  const chrome = [
    document.querySelector('.site-header'),
    document.querySelector('.site-footer'),
    document.getElementById('intro-soutenance'),
  ].filter(Boolean) as HTMLElement[];

  let current = 0; // diapo affichée en mode présentation
  let deckCurrent = 0; // diapo courante en consultation (position de défilement)
  let presenting = false;
  let lastTrigger: HTMLElement | null = null;

  let liveTimer: number | undefined;
  function announce(text: string) {
    if (!live) return;
    window.clearTimeout(liveTimer);
    live.textContent = '';
    liveTimer = window.setTimeout(() => { live.textContent = text; }, 150);
  }

  function updateArrows(index: number) {
    prevBtns.forEach((b) => { b.disabled = index === 0; });
    nextBtns.forEach((b) => { b.disabled = index === total - 1; });
  }

  // Position courante en consultation (compteur, flèches, repère dans le sommaire).
  function setDeckCurrent(i: number) {
    deckCurrent = i;
    if (counterNow) counterNow.textContent = String(i + 1);
    navLinks.forEach((a, idx) => {
      if (idx === i) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    if (!presenting) updateArrows(i);
  }

  // Affichage d'une diapo en mode présentation.
  function show(i: number) {
    current = Math.max(0, Math.min(total - 1, i));
    slides.forEach((s, idx) => {
      const active = idx === current;
      s.hidden = !active;
      s.classList.toggle('is-current', active);
      if (active) { s.tabIndex = -1; s.focus(); }
    });
    if (progress) progress.textContent = `${current + 1} / ${total}`;
    updateArrows(current);
    // Position seule : le titre est déjà porté par la section focalisée
    // (aria-labelledby vers son <h2>) – éviter de l'énoncer deux fois.
    announce(`Diapositive ${current + 1} sur ${total}`);
  }

  function next() {
    if (current >= total - 1) { announce('Dernière diapositive.'); return; }
    show(current + 1);
  }
  function prev() {
    if (current <= 0) { announce('Première diapositive.'); return; }
    show(current - 1);
  }

  // Flèches : navigation diapo à diapo (présentation) ou défilement (consultation).
  function go(delta: number) {
    if (presenting) { delta > 0 ? next() : prev(); return; }
    const target = Math.max(0, Math.min(total - 1, deckCurrent + delta));
    if (target === deckCurrent) return;
    slides[target].scrollIntoView({ block: 'start' });
  }

  function enter(start = deckCurrent) {
    if (presenting) return;
    lastTrigger = document.activeElement as HTMLElement;
    presenting = true;
    html.classList.add('is-presenting');
    // inert masque le chrome (focus + arbre d'accessibilité) ; aria-hidden est
    // un repli volontaire pour les rares navigateurs sans support de `inert`.
    chrome.forEach((el) => { el.setAttribute('inert', ''); el.setAttribute('aria-hidden', 'true'); });
    show(start);
  }

  function exit() {
    if (!presenting) return;
    presenting = false;
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    html.classList.remove('is-presenting');
    chrome.forEach((el) => { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); });
    slides.forEach((s) => { s.hidden = false; s.classList.remove('is-current'); });
    // Retour à la diapo où l'on présentait, en consultation (focus sur la section).
    setDeckCurrent(current);
    const target = slides[current];
    target.scrollIntoView({ block: 'start' });
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
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

  openBtn?.addEventListener('click', () => enter(deckCurrent));
  prevBtns.forEach((b) => b.addEventListener('click', () => go(-1)));
  nextBtns.forEach((b) => b.addEventListener('click', () => go(1)));
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

  // Suivi de la diapo courante en consultation + affichage des contrôles dans le deck.
  const ratios = new Array<number>(total).fill(0);
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const i = slides.indexOf(e.target as HTMLElement);
      if (i >= 0) ratios[i] = e.isIntersecting ? e.intersectionRatio : 0;
    }
    html.classList.toggle('deck-active', ratios.some((r) => r > 0.05));
    if (presenting) return;
    let max = 0;
    let idx = deckCurrent;
    for (let i = 0; i < total; i++) {
      if (ratios[i] > max) { max = ratios[i]; idx = i; }
    }
    if (idx !== deckCurrent) setDeckCurrent(idx);
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
  slides.forEach((s) => io.observe(s));

  setDeckCurrent(0);

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
