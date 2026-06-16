// Îlot « cartes-questions » : tirage aléatoire (avec ou sans répétition),
// carte annoncée en aria-live, impression du jeu complet. Le texte des
// questions est lu depuis le DOM (.cq-deck) — source unique de vérité.

const pioche = document.querySelector<HTMLButtonElement>('[data-cq-pioche]');

if (pioche) {
  const reset = document.querySelector<HTMLButtonElement>('[data-cq-reset]');
  const sansRep = document.querySelector<HTMLInputElement>('[data-cq-sansrep]');
  const printBtn = document.querySelector<HTMLButtonElement>('[data-cq-print]');
  const card = document.querySelector<HTMLElement>('[data-cq-card]');
  const numEl = document.querySelector<HTMLElement>('[data-cq-num]');
  const qEl = document.querySelector<HTMLElement>('[data-cq-q]');
  const status = document.querySelector<HTMLElement>('.cq-status');

  const questions = Array.from(document.querySelectorAll<HTMLElement>('.cq-deck .cq-card--static .cq-card__q'))
    .map((el) => (el.textContent || '').replace(/^Carte \d+\s*:\s*/, '').trim());
  const total = questions.length;
  let tirees: number[] = [];

  let announceTimer: number | undefined;
  function announce(text: string) {
    if (!status) return;
    window.clearTimeout(announceTimer);
    status.textContent = '';
    announceTimer = window.setTimeout(() => { status.textContent = text; }, 150);
  }

  function tirer() {
    const sans = !!sansRep?.checked;
    const pool = sans
      ? questions.map((_, i) => i).filter((i) => !tirees.includes(i))
      : questions.map((_, i) => i);
    if (pool.length === 0) {
      announce('Toutes les cartes ont été piochées. Recommencez le jeu pour repiocher.');
      return;
    }
    const idx = pool[Math.floor(Math.random() * pool.length)];
    tirees.push(idx);
    if (numEl) numEl.textContent = String(idx + 1);
    if (qEl) qEl.textContent = questions[idx];
    card?.classList.add('is-flipped');
    announce(`Carte ${idx + 1} sur ${total} : ${questions[idx]} — ${tirees.length} carte(s) piochée(s).`);

    if (sans && tirees.length === total) {
      pioche!.disabled = true;
      if (reset) { reset.hidden = false; reset.focus(); }
    }
  }

  function recommencer() {
    tirees = [];
    pioche!.disabled = false;
    if (reset) reset.hidden = true;
    card?.classList.remove('is-flipped');
    if (qEl) qEl.textContent = '';
    if (numEl) numEl.textContent = '';
    announce(`Jeu réinitialisé. ${total} cartes disponibles.`);
    pioche!.focus();
  }

  pioche.addEventListener('click', tirer);
  reset?.addEventListener('click', recommencer);
  sansRep?.addEventListener('change', () => {
    if (!sansRep.checked && pioche!.disabled) {
      pioche!.disabled = false;
      if (reset) reset.hidden = true;
    }
  });
  printBtn?.addEventListener('click', () => window.print());
}

export {};
