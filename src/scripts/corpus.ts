// Explorateur de corpus : sélection d'un parcours anonymisé (une fiche à la fois).
// Sans JS : sélecteur masqué, tous les parcours visibles (fallback honnête).

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

export {};
