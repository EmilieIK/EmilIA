// Filtres du kit : masquent/réaffichent les étapes (non destructif), annoncent
// le nombre de résultats en aria-live, sans jamais toucher l'état de dépliage.
import { refreshAll } from './disclosure.ts';

const form = document.querySelector<HTMLFormElement>('[data-filtres]');

if (form) {
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.etape'));
  const total = cards.length;
  const counter = form.querySelector<HTMLElement>('.filtres__compteur');
  const resetBtn = form.querySelector<HTMLButtonElement>('[data-filtres-reset]');

  function checkedValues(name: string): string[] {
    return Array.from(form!.querySelectorAll<HTMLInputElement>(`input[name="${name}"]:checked`)).map((i) => i.value);
  }

  function dureeMatch(min: number, ranges: string[]): boolean {
    return ranges.some((r) =>
      (r === 'court' && min <= 20) ||
      (r === 'moyen' && min >= 25 && min <= 30) ||
      (r === 'long' && min >= 40)
    );
  }

  let announceTimer: number | undefined;
  function announce(text: string) {
    if (!counter) return;
    window.clearTimeout(announceTimer);
    announceTimer = window.setTimeout(() => { counter.textContent = text; }, 150);
  }

  function apply() {
    const ia = checkedValues('ia');
    const duree = checkedValues('duree');
    const modalite = checkedValues('modalite');
    const aucunFiltre = ia.length === 0 && duree.length === 0 && modalite.length === 0;

    let visibles = 0;
    cards.forEach((card) => {
      const cIa = card.dataset.ia || '';
      const cDuree = parseInt(card.dataset.duree || '0', 10);
      const cMod = (card.dataset.modalite || '').split(' ').filter(Boolean);
      const iaOk = ia.length === 0 || ia.includes(cIa);
      const dureeOk = duree.length === 0 || dureeMatch(cDuree, duree);
      const modOk = modalite.length === 0 || cMod.some((m) => modalite.includes(m));
      const visible = iaOk && dureeOk && modOk;
      card.hidden = !visible;
      if (visible) visibles += 1;
    });

    if (resetBtn) resetBtn.disabled = aucunFiltre;
    announce(
      visibles === 0
        ? 'Aucune étape ne correspond – réinitialisez les filtres.'
        : `${visibles} étape${visibles > 1 ? 's' : ''} sur ${total} affichée${visibles > 1 ? 's' : ''}.`
    );
    refreshAll();
    document.dispatchEvent(new CustomEvent('kit:filtres-appliques'));
  }

  form.addEventListener('change', apply);
  // 'reset' précède l'effacement des champs → re-appliquer au tick suivant.
  form.addEventListener('reset', () => window.setTimeout(apply, 0));
  // Déclenché par le module Disclosure quand une ancre vise une carte filtrée.
  document.addEventListener('kit:reset-filtres', () => { form.reset(); window.setTimeout(apply, 0); });
}
