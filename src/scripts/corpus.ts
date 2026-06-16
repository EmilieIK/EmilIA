// Explorateur de corpus : sélection d'un parcours anonymisé + bascule
// avant/après. Sans JS : sélecteur masqué, tous les parcours visibles en vue
// « changements » (fallback honnête).

const live = document.querySelector<HTMLElement>('[data-cas-live]');
let liveTimer: number | undefined;
function announce(text: string) {
  if (!live) return;
  window.clearTimeout(liveTimer);
  live.textContent = '';
  liveTimer = window.setTimeout(() => { live.textContent = text; }, 150);
}

const select = document.querySelector<HTMLSelectElement>('[data-cas-select]');
const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-cas-panel]'));

if (select && panels.length > 0) {
  const panelFor = (id: string) => panels.find((p) => p.dataset.casId === id);

  function showPanel(id: string, focusHeading: boolean) {
    panels.forEach((p) => { p.classList.toggle('is-active', p.dataset.casId === id); });
    const p = panelFor(id);
    if (p && focusHeading) p.querySelector<HTMLElement>('h2')?.focus();
    const niveau = p?.querySelector('.cas-niveau')?.textContent?.trim() || '';
    announce(`Parcours ${id} affiché, ${niveau}.`);
  }

  const wanted = new URLSearchParams(location.search).get('etudiant');
  const initial = wanted && panelFor(wanted) ? wanted : panels[0].dataset.casId!;
  select.value = initial;
  panels.forEach((p) => { p.classList.toggle('is-active', p.dataset.casId === initial); });
  select.addEventListener('change', () => showPanel(select.value, true));
}

// Bascule avant/après (délégation ; agit sur la vue de la section concernée).
document.addEventListener('click', (e) => {
  const t = e.target;
  const btn = t instanceof Element ? t.closest<HTMLElement>('[data-vue-btn]') : null;
  if (!btn) return;
  const group = btn.closest('.diff-toggle');
  const section = btn.closest('section');
  const diff = section?.querySelector<HTMLElement>('[data-corpus-diff]');
  if (!diff || !group) return;
  const vue = btn.getAttribute('data-vue-btn') || 'diff';
  diff.setAttribute('data-vue', vue);
  group.querySelectorAll<HTMLElement>('[data-vue-btn]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
  const label = vue === 'jet' ? 'premier jet' : vue === 'final' ? 'version finale' : 'changements mis en évidence';
  announce(`Vue : ${label}.`);
});

export {};
