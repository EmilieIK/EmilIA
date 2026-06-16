// Helper de liens internes : tient compte de `base` (ex. "/EmilIA") pour
// que tous les liens et assets fonctionnent sur GitHub Pages (site de projet).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Construit une URL interne préfixée par `base`. url('/') -> base racine. */
export function url(path = '/'): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}` || '/';
}

/** Indique si `current` correspond à `path` (pour aria-current). */
export function isCurrent(currentPathname: string, path: string): boolean {
  const target = url(path).replace(/\/$/, '') || '/';
  const here = currentPathname.replace(/\/$/, '') || '/';
  if (target === (base || '/')) return here === (base || '/');
  return here === target || here.startsWith(`${target}/`);
}
