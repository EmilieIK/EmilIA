// Îlot « Aiguiser son regard » : on choisit une catégorie (radios), puis on
// classe les mots suspects (boutons). Statut juste/à revoir en TEXTE, score,
// bingo, révélation du corrigé, minuteur optionnel (désactivé par défaut).

const root = document.querySelector<HTMLElement>('[data-ar]');

if (root) {
  const tokens = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-ar-token]'));
  const statut = document.getElementById('ar-statut');
  const scoreEl = root.querySelector<HTMLElement>('[data-ar-score]');
  const bingo = root.querySelector<HTMLElement>('[data-ar-bingo]');
  const fallback = document.querySelector<HTMLElement>('.ar-fallback');
  const total = tokens.length;
  let revealed = false;

  function currentCat(): string {
    const r = root!.querySelector<HTMLInputElement>('input[name="ar-cat"]:checked');
    return r ? r.value : 'accord';
  }

  let announceTimer: number | undefined;
  function announce(text: string) {
    if (!statut) return;
    window.clearTimeout(announceTimer);
    statut.textContent = '';
    announceTimer = window.setTimeout(() => { statut.textContent = text; }, 150);
  }

  function updateScore() {
    const justes = tokens.filter((t) => t.dataset.state === 'juste').length;
    if (scoreEl) scoreEl.textContent = `Score : ${justes} bon(s) classement(s) sur ${total} mots à examiner.`;
  }

  function updateBingo() {
    bingo?.querySelectorAll<HTMLElement>('[data-bingo]').forEach((li) => {
      const cat = li.getAttribute('data-bingo');
      const found = tokens.some((t) => t.dataset.answer === cat && t.dataset.state === 'juste');
      const st = li.querySelector('[data-bingo-state]');
      if (st) st.textContent = found ? 'trouvée ✓' : 'pas encore';
      li.dataset.found = found ? 'true' : 'false';
    });
  }

  tokens.forEach((tok) => {
    tok.addEventListener('click', () => {
      if (revealed) return;
      const cat = currentCat();
      const juste = cat === tok.dataset.answer;
      tok.dataset.applied = cat;
      tok.dataset.state = juste ? 'juste' : 'rate';
      tok.setAttribute('aria-pressed', 'true');
      const catLabel = cat === 'correct' ? 'mot correct' : cat;
      tok.setAttribute('aria-label', `${tok.textContent}, classé en ${catLabel}, ${juste ? 'juste' : 'à revoir'}`);
      announce(
        juste
          ? `Juste : « ${tok.textContent} » classé en ${catLabel}.`
          : `À revoir : « ${tok.textContent} » classé en ${catLabel}. Réessayez ou révélez les réponses.`
      );
      updateScore();
      updateBingo();
    });
  });

  root.querySelector('[data-ar-reveal]')?.addEventListener('click', () => {
    revealed = true;
    tokens.forEach((tok) => {
      tok.setAttribute('aria-disabled', 'true');
      tok.dataset.revealed = 'true';
    });
    const justes = tokens.filter((t) => t.dataset.state === 'juste').length;
    announce(`Réponses révélées. Score final : ${justes} sur ${total}. Le corrigé détaillé est affiché ci-dessous.`);
    fallback?.classList.add('is-revealed');
  });

  root.querySelector('[data-ar-restart]')?.addEventListener('click', () => {
    revealed = false;
    tokens.forEach((tok) => {
      delete tok.dataset.state;
      delete tok.dataset.applied;
      delete tok.dataset.revealed;
      tok.setAttribute('aria-pressed', 'false');
      tok.removeAttribute('aria-disabled');
      tok.setAttribute('aria-label', `${tok.textContent}, classer dans la catégorie choisie`);
    });
    fallback?.classList.remove('is-revealed');
    updateScore();
    updateBingo();
    announce('Exercice réinitialisé.');
    tokens[0]?.focus();
  });

  // ----- Minuteur (désactivé par défaut) -----
  const dureeSel = root.querySelector<HTMLSelectElement>('[data-ar-duree]');
  const chrono = root.querySelector<HTMLElement>('[data-ar-chrono]');
  const startBtn = root.querySelector<HTMLButtonElement>('[data-ar-start]');
  const pauseBtn = root.querySelector<HTMLButtonElement>('[data-ar-pause]');
  const tresetBtn = root.querySelector<HTMLButtonElement>('[data-ar-treset]');
  let timerId: number | undefined;
  let remaining = 0;
  let running = false;
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  function stopTimer() {
    running = false;
    if (timerId) window.clearInterval(timerId);
    if (pauseBtn) pauseBtn.hidden = true;
    if (startBtn) startBtn.hidden = false;
  }
  function tick() {
    remaining -= 1;
    if (chrono) chrono.textContent = fmt(Math.max(0, remaining));
    if (remaining <= 0) {
      stopTimer();
      announce('Temps écoulé — vous pouvez continuer.');
    }
  }
  startBtn?.addEventListener('click', () => {
    const d = parseInt(dureeSel?.value || '0', 10);
    if (!d) { announce('Choisissez une durée pour activer le minuteur.'); return; }
    if (running) return;
    if (remaining <= 0) remaining = d;
    running = true;
    timerId = window.setInterval(tick, 1000);
    if (chrono) chrono.textContent = fmt(remaining);
    if (startBtn) startBtn.hidden = true;
    if (pauseBtn) { pauseBtn.hidden = false; pauseBtn.focus(); }
    announce('Minuteur démarré.');
  });
  pauseBtn?.addEventListener('click', () => {
    stopTimer();
    startBtn?.focus();
    announce('Minuteur en pause.');
  });
  tresetBtn?.addEventListener('click', () => {
    stopTimer();
    remaining = 0;
    if (chrono) chrono.textContent = '--:--';
    announce('Minuteur réinitialisé.');
  });
}

export {};
