// Module « copier » (fabrique à prompts ; réutilisable sur d'autres pages).
// Délégation sur [data-copier] ; annonce dans une région live unique par page
// ([data-copie-live]) ; bascule du libellé « Copier » → « Copié » ~2 s.
// Auto-init à l'import ; no-op si aucun [data-copier] sur la page.

const live = document.querySelector<HTMLElement>('[data-copie-live]');
let announceTimer: number | undefined;
function announce(text: string) {
  if (!live) return;
  window.clearTimeout(announceTimer);
  live.textContent = '';
  announceTimer = window.setTimeout(() => { live.textContent = text; }, 150);
}

const resetTimers = new WeakMap<HTMLElement, number>();
function flashCopied(btn: HTMLElement) {
  const labelEl = btn.querySelector<HTMLElement>('[data-copier-libelle]');
  btn.dataset.etat = 'ok';
  if (labelEl) labelEl.textContent = 'Copié';
  const prev = resetTimers.get(btn);
  if (prev) window.clearTimeout(prev);
  resetTimers.set(btn, window.setTimeout(() => {
    delete btn.dataset.etat;
    if (labelEl) labelEl.textContent = 'Copier';
  }, 2000));
}

document.addEventListener('click', async (e) => {
  const t = e.target;
  const btn = t instanceof Element ? t.closest<HTMLElement>('[data-copier]') : null;
  if (!btn) return;
  const cibleId = btn.getAttribute('data-copier-cible');
  const cible = cibleId ? document.getElementById(cibleId) : null;
  const text = (cible?.textContent || '').trim();
  if (!text) return;
  const etiquette = btn.getAttribute('data-copier-etiquette') || '';
  const noun = btn.getAttribute('data-copier-kind') === 'question' ? 'Question copiée' : 'Prompt copié';
  try {
    await navigator.clipboard.writeText(text);
    flashCopied(btn);
    announce(`${noun} : ${etiquette}.`);
  } catch {
    if (cible) {
      const range = document.createRange();
      range.selectNodeContents(cible);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
    announce('Appuyez sur Ctrl ou Cmd + C pour copier le texte sélectionné.');
  }
});

export {};
