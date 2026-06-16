// Comportement Disclosure partagé (plan du mémoire, cartes du kit).
// Délégation au niveau document : un seul module pilote toutes les
// instances .disclosure__btn / .disclosure__panel de la page.
// S'auto-initialise à l'import. Astro le bundle une seule fois.

function panelOf(btn: Element): HTMLElement | null {
  const id = btn.getAttribute('aria-controls');
  return id ? document.getElementById(id) : null;
}

function setOpen(btn: Element, open: boolean) {
  const panel = panelOf(btn);
  btn.setAttribute('aria-expanded', String(open));
  if (panel) panel.classList.toggle('is-open', open);
}

const allBtn = document.querySelector('[data-disclosure-all]');

// Un bouton est « hors-jeu » si un ancêtre est masqué (filtre du kit).
function isHidden(el: Element | null): boolean {
  return !!(el && el.closest('[hidden]'));
}
function visibleBtns(): Element[] {
  return Array.from(document.querySelectorAll('.disclosure__btn')).filter((b) => !isHidden(b));
}

function syncAll() {
  if (!allBtn) return;
  const btns = visibleBtns();
  const everyOpen = btns.length > 0 && btns.every((b) => b.getAttribute('aria-expanded') === 'true');
  allBtn.setAttribute('aria-pressed', String(everyOpen));
  allBtn.textContent = everyOpen ? 'Tout replier' : 'Tout déplier';
}

// Permet aux filtres du kit de re-synchroniser le bouton « Tout déplier ».
export function refreshAll() {
  syncAll();
}

// Ouvre un panneau et tous ses panneaux parents (Disclosure imbriquées).
function openWithAncestors(el: HTMLElement | null) {
  let node: HTMLElement | null = el;
  while (node) {
    if (node.classList && node.classList.contains('disclosure__panel')) {
      const controller = document.querySelector(`[aria-controls="${node.id}"]`);
      if (controller) setOpen(controller, true);
    }
    node = node.parentElement;
  }
}

// Boot : pose l'état replié honnête (aria-expanded=false ; le repli visuel
// vient du CSS html.js). Sans JS, ce module ne s'exécute pas → panneaux visibles.
document.querySelectorAll('.disclosure__btn').forEach((b) => b.setAttribute('aria-expanded', 'false'));
syncAll();

document.addEventListener('click', (e) => {
  const t = e.target;
  const btn = t instanceof Element ? t.closest('.disclosure__btn') : null;
  if (!btn) return;
  setOpen(btn, btn.getAttribute('aria-expanded') !== 'true');
  syncAll();
});

if (allBtn) {
  allBtn.addEventListener('click', () => {
    const expand = allBtn.getAttribute('aria-pressed') !== 'true';
    visibleBtns().forEach((b) => setOpen(b, expand));
    allBtn.setAttribute('aria-pressed', String(expand));
    allBtn.textContent = expand ? 'Tout replier' : 'Tout déplier';
  });
}

function revealHash() {
  const hash = location.hash;
  if (!hash || hash.length < 2) return;
  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!target) return;
  // Si la cible est masquée par un filtre du kit, réinitialiser d'abord.
  if (isHidden(target)) document.dispatchEvent(new CustomEvent('kit:reset-filtres'));
  const ownBtn = target.querySelector<HTMLElement>('.disclosure__btn');
  openWithAncestors(target.closest('.disclosure__panel'));
  if (ownBtn) {
    setOpen(ownBtn, true);
    ownBtn.focus();
  }
  syncAll();
}
window.addEventListener('hashchange', revealHash);
window.addEventListener('load', revealHash);

export {};
