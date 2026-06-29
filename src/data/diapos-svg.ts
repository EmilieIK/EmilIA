// Diapositives de la soutenance, design graphique (SVG) – source : diaporama d'Émilie Icyk.
// Chaque SVG est purement visuel ; l'alternative textuelle accessible est portée à
// côté (données de src/data/soutenance.json), le SVG étant masqué aux lecteurs d'écran.
export const diaposSvg: string[] = [
  `<svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diapo 1, titre">
<rect x="4" y="4" width="672" height="392" rx="14" fill="#0F2E33" stroke="#2C4D51"/>
<text x="340" y="116" text-anchor="middle" font-family="Georgia,serif" font-size="29" fill="#EFF5F3">Production écrite en FLE</text>
<text x="340" y="154" text-anchor="middle" font-family="Georgia,serif" font-size="29" fill="#EFF5F3">et intelligence artificielle</text>
<text x="340" y="192" text-anchor="middle" font-family="Georgia,serif" font-size="17" font-style="italic" fill="#8FD3C2">un scénario pour une autonomie assistée</text>
<line x1="305" y1="214" x2="375" y2="214" stroke="#1D9E75" stroke-width="2"/>
<text x="340" y="270" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" font-weight="500" fill="#E6F0EE">Émilie Icyk</text>
<text x="340" y="293" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#94ACA9">M2 Didactique des langues – parcours FLES · Université Grenoble Alpes</text>
<text x="340" y="312" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#94ACA9">Sous la direction de Thierry Soubrié</text>
<text x="340" y="331" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#94ACA9">Soutenance – 8 juillet 2026</text>
<text x="340" y="372" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12.5" letter-spacing="1.5" fill="#79C3B0">Révélateur · Instrument secondaire · Autonomie à construire</text>
</svg>`,
  `<svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diapo 2, trois attentes">
<rect x="4" y="4" width="672" height="392" rx="14" fill="#F6F4EE" stroke="#DAD5C8"/>
<text x="44" y="64" font-family="Georgia,serif" font-size="25" fill="#1B1B1A">Trois attentes de départ</text>
<circle cx="64" cy="128" r="17" fill="#1F5C63"/><text x="64" y="134" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" font-weight="600" fill="#F6F4EE">1</text>
<text x="96" y="134" font-family="system-ui,sans-serif" font-size="18" fill="#262624">Que l'IA fasse progresser les écrits</text>
<circle cx="64" cy="188" r="17" fill="#1F5C63"/><text x="64" y="194" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" font-weight="600" fill="#F6F4EE">2</text>
<text x="96" y="194" font-family="system-ui,sans-serif" font-size="18" fill="#262624">Qu'un scénario suffise à rendre autonome</text>
<circle cx="64" cy="248" r="17" fill="#1F5C63"/><text x="64" y="254" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" font-weight="600" fill="#F6F4EE">3</text>
<text x="96" y="254" font-family="system-ui,sans-serif" font-size="18" fill="#262624">Que se développe une littératie de l'IA</text>
<text x="96" y="302" font-family="Georgia,serif" font-size="16" font-style="italic" fill="#5A7A78">… et trois démentis</text>
<line x1="44" y1="344" x2="636" y2="344" stroke="#E4DFD2"/>
<text x="340" y="372" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12.5" letter-spacing="0.6" fill="#6E6E68">littératie de l'IA · agentivité · médiation · interlangue · texte lissé</text>
</svg>`,
  `<svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diapo 3, problématique et hypothèses">
<rect x="4" y="4" width="672" height="392" rx="14" fill="#F6F4EE" stroke="#DAD5C8"/>
<text x="44" y="46" font-family="system-ui,sans-serif" font-size="13" letter-spacing="0.5" fill="#1F5C63">Problématique</text>
<rect x="40" y="58" width="600" height="104" rx="10" fill="#ECE7DB"/>
<text x="58" y="90" font-family="Georgia,serif" font-size="16" fill="#232321">Comment les outils d'intelligence artificielle peuvent-ils être</text>
<text x="58" y="116" font-family="Georgia,serif" font-size="16" fill="#232321">mobilisés sans se substituer au travail d'écriture des apprenant·es,</text>
<text x="58" y="142" font-family="Georgia,serif" font-size="16" fill="#232321">tout en participant au développement d'une littératie de l'IA ?</text>
<text x="44" y="198" font-family="system-ui,sans-serif" font-size="14" font-weight="600" fill="#1F5C63">Hypothèses</text>
<rect x="44" y="212" width="40" height="24" rx="6" fill="#1F5C63"/><text x="64" y="229" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#F6F4EE">H1</text>
<text x="96" y="229" font-family="system-ui,sans-serif" font-size="15" fill="#262624">l'usage de l'IA s'apprend : fonctions, limites, conditions d'usage</text>
<rect x="44" y="252" width="40" height="24" rx="6" fill="#1F5C63"/><text x="64" y="269" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#F6F4EE">H2</text>
<text x="96" y="269" font-family="system-ui,sans-serif" font-size="15" fill="#262624">un scénario structuré est une condition nécessaire</text>
<rect x="44" y="292" width="40" height="24" rx="6" fill="#1F5C63"/><text x="64" y="309" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#F6F4EE">H3</text>
<text x="96" y="309" font-family="system-ui,sans-serif" font-size="15" fill="#262624">l'IA peut faire évoluer les compétences scripturales</text>
</svg>`,
  `<svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diapo 4, scénario en huit étapes">
<rect x="4" y="4" width="672" height="392" rx="14" fill="#F6F4EE" stroke="#DAD5C8"/>
<text x="44" y="52" font-family="Georgia,serif" font-size="24" fill="#1B1B1A">Un scénario en 8 étapes</text>
<text x="146" y="104" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#5A7A78">sans IA</text>
<text x="412" y="104" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#1F5C63">avec IA</text>
<text x="602" y="104" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#5A7A78">sans IA</text>
<line x1="56" y1="112" x2="236" y2="112" stroke="#BFD8D1"/><line x1="284" y1="112" x2="540" y2="112" stroke="#BFD8D1"/><line x1="586" y1="112" x2="618" y2="112" stroke="#BFD8D1"/>
<line x1="70" y1="150" x2="602" y2="150" stroke="#CFC9BB" stroke-width="2"/>
<circle cx="70" cy="150" r="15" fill="#F6F4EE" stroke="#1F5C63" stroke-width="1.5"/><text x="70" y="155" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#1F5C63">1</text>
<text x="70" y="180" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3A37">Tempête</text><text x="70" y="193" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3A37">d'idées</text>
<circle cx="146" cy="150" r="15" fill="#F6F4EE" stroke="#1F5C63" stroke-width="1.5"/><text x="146" y="155" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#1F5C63">2</text>
<text x="146" y="180" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3A37">Premier</text><text x="146" y="193" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3A37">jet</text>
<circle cx="222" cy="150" r="15" fill="#F6F4EE" stroke="#1F5C63" stroke-width="1.5"/><text x="222" y="155" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#1F5C63">3</text>
<text x="222" y="180" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3A37">Regards</text><text x="222" y="193" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3A37">croisés</text>
<circle cx="298" cy="150" r="15" fill="#1F5C63"/><text x="298" y="155" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#F6F4EE">4</text>
<text x="298" y="180" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3A37">Boîte à</text><text x="298" y="193" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3A37">outils IA</text>
<circle cx="374" cy="150" r="15" fill="#1F5C63"/><text x="374" y="155" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#F6F4EE">5</text>
<text x="374" y="180" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3A37">Réécriture</text><text x="374" y="193" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3A37">autonome</text>
<circle cx="450" cy="150" r="15" fill="#1F5C63"/><text x="450" y="155" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#F6F4EE">6</text>
<text x="450" y="180" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3A37">Regard</text><text x="450" y="193" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3A37">critique IA</text>
<circle cx="526" cy="150" r="15" fill="#1F5C63"/><text x="526" y="155" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#F6F4EE">7</text>
<text x="526" y="180" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3A37">Le dernier</text><text x="526" y="193" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3A37">mot</text>
<circle cx="602" cy="150" r="15" fill="#F6F4EE" stroke="#1F5C63" stroke-width="1.5"/><text x="602" y="155" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#1F5C63">8</text>
<text x="602" y="180" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3A37">Cap sur</text><text x="602" y="193" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3A37">le bilan</text>
<line x1="44" y1="224" x2="636" y2="224" stroke="#E4DFD2"/>
<text x="340" y="252" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#45453F">Méthode – recherche-action · 15 parcours · triangulation (traces · questionnaire · entretien) · codage inductif</text>
<text x="340" y="288" text-anchor="middle" font-family="Georgia,serif" font-size="12.5" font-style="italic" fill="#6E6E68">Recherche-action : un scénario ajusté en cours de route (code d'annotation des erreurs · travail préparatoire renforcé)</text>
</svg>`,
  `<svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diapo 5, démentis un et deux">
<rect x="4" y="4" width="672" height="392" rx="14" fill="#F6F4EE" stroke="#DAD5C8"/>
<line x1="340" y1="40" x2="340" y2="304" stroke="#DAD5C8"/>
<text x="40" y="44" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#1F5C63">Démenti 1 · Révélateur</text>
<text x="40" y="72" font-family="Georgia,serif" font-size="15" fill="#1B1B1A">L'effet de l'IA n'est pas</text>
<text x="40" y="91" font-family="Georgia,serif" font-size="15" fill="#1B1B1A">isolable du cadrage</text>
<circle cx="44" cy="116" r="2.5" fill="#1F5C63"/><text x="54" y="120" font-family="system-ui,sans-serif" font-size="12" fill="#333330">même outil, même scénario → usages opposés</text>
<circle cx="44" cy="144" r="2.5" fill="#1F5C63"/><text x="54" y="148" font-family="system-ui,sans-serif" font-size="12" fill="#333330">B1, erreurs signalées → corriger</text>
<circle cx="44" cy="172" r="2.5" fill="#1F5C63"/><text x="54" y="176" font-family="system-ui,sans-serif" font-size="12" fill="#333330">B2, diagnostic confié → formuler la demande</text>
<text x="40" y="210" font-family="Georgia,serif" font-size="11.5" font-style="italic" fill="#5A7A78">ce que le cadrage met en avant décide de l'usage</text>
<text x="40" y="250" font-family="Georgia,serif" font-size="11.5" font-style="italic" fill="#8A8A82">(Albero)</text>
<text x="358" y="44" font-family="system-ui,sans-serif" font-size="12" font-weight="600" fill="#1F5C63">Démenti 2 · Autonomie à construire</text>
<text x="358" y="72" font-family="Georgia,serif" font-size="15" fill="#1B1B1A">L'autonomie : une compétence</text>
<text x="358" y="91" font-family="Georgia,serif" font-size="15" fill="#1B1B1A">à construire, pas un état</text>
<text x="358" y="124" font-family="system-ui,sans-serif" font-size="12.5" fill="#333330">correction <tspan font-weight="600" fill="#1F5C63">15/15</tspan> · organisation <tspan font-weight="600" fill="#1F5C63">2/15</tspan></text>
<text x="358" y="152" font-family="system-ui,sans-serif" font-size="12.5" fill="#333330"><tspan font-weight="600" fill="#1F5C63">10/15</tspan> reprise directe</text>
<text x="358" y="170" font-family="system-ui,sans-serif" font-size="12.5" fill="#333330"><tspan font-weight="600" fill="#1F5C63">11/15</tspan> acceptation peu critique</text>
<text x="358" y="188" font-family="system-ui,sans-serif" font-size="12.5" fill="#333330"><tspan font-weight="600" fill="#1F5C63">0/15</tspan> rejet dans les traces</text>
<text x="358" y="218" font-family="system-ui,sans-serif" font-size="12.5" fill="#333330">Bélen tient sa nuance · Miriam s'efface</text>
<text x="358" y="250" font-family="Georgia,serif" font-size="11.5" font-style="italic" fill="#8A8A82">(Holec · Bucheton)</text>
</svg>`,
  `<svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diapo 6, un plafond dans les usages observés">
<rect x="4" y="4" width="672" height="392" rx="14" fill="#F6F4EE" stroke="#DAD5C8"/>
<text x="340" y="50" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="#1B1B1A">Un plafond dans les usages observés</text>
<text x="340" y="86" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#1F5C63">ce qu'on observe</text>
<text x="340" y="116" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" fill="#262624">correction <tspan font-weight="600" fill="#1F5C63">15/15</tspan>   ·   reformulation <tspan font-weight="600" fill="#1F5C63">14/15</tspan></text>
<line x1="120" y1="152" x2="296" y2="152" stroke="#1F5C63" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="384" y1="152" x2="560" y2="152" stroke="#1F5C63" stroke-width="1.5" stroke-dasharray="5 4"/>
<text x="340" y="156" text-anchor="middle" font-family="Georgia,serif" font-size="12" font-style="italic" fill="#1F5C63">plafond</text>
<text x="340" y="190" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#9A988F">ce qui n'apparaît pas</text>
<text x="340" y="218" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" fill="#9A988F">réécriture   ·   réorganisation   ·   rejet</text>
<text x="340" y="258" text-anchor="middle" font-family="Georgia,serif" font-size="15" font-style="italic" fill="#1B1B1A">on corrige et on reformule, on ne réécrit pas encore</text>
<text x="340" y="286" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#1F5C63">→ littératie en construction : l'IA reste secondaire, la médiation reste décisive</text>
<line x1="44" y1="312" x2="636" y2="312" stroke="#E4DFD2"/>
<text x="340" y="344" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" fill="#262624">H1 <tspan font-weight="600" fill="#1F5C63">✓</tspan>   ·   H2 <tspan font-weight="600" fill="#1F5C63">✓</tspan>   ·   H3 partiellement</text>
</svg>`,
  `<svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diapo 7, recul, limites et prolongements">
<rect x="4" y="4" width="672" height="392" rx="14" fill="#F6F4EE" stroke="#DAD5C8"/>
<text x="40" y="44" font-family="Georgia,serif" font-size="17" fill="#1B1B1A">Recul, limites &amp; « si c'était à refaire »</text>
<line x1="238" y1="62" x2="238" y2="322" stroke="#E4DFD2"/><line x1="446" y1="62" x2="446" y2="322" stroke="#E4DFD2"/>
<text x="40" y="84" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#1F5C63">Apports</text>
<text x="40" y="98" font-family="system-ui,sans-serif" font-size="10.5" font-style="italic" fill="#8A8A82">au regard de la commande</text>
<circle cx="42" cy="120" r="2" fill="#1F5C63"/><text x="50" y="124" font-family="system-ui,sans-serif" font-size="11" fill="#333330">un scénario opérationnel</text>
<text x="50" y="137" font-family="system-ui,sans-serif" font-size="11" fill="#333330">&amp; transférable</text>
<circle cx="42" cy="159" r="2" fill="#1F5C63"/><text x="50" y="163" font-family="system-ui,sans-serif" font-size="11" fill="#333330">le passage de l'enseignement</text>
<text x="50" y="176" font-family="system-ui,sans-serif" font-size="11" fill="#333330">à la conception</text>
<circle cx="42" cy="198" r="2" fill="#1F5C63"/><text x="50" y="202" font-family="system-ui,sans-serif" font-size="11" fill="#333330">la mise au jour des impensés</text>
<text x="50" y="215" font-family="system-ui,sans-serif" font-size="11" fill="#333330">de ce scénario</text>
<text x="50" y="228" font-family="system-ui,sans-serif" font-size="10" font-style="italic" fill="#9A988F">(voix, registre, réécriture)</text>
<text x="250" y="84" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#1F5C63">Limites</text>
<circle cx="252" cy="110" r="2" fill="#1F5C63"/><text x="260" y="114" font-family="system-ui,sans-serif" font-size="11" fill="#333330">étude qualitative &amp; située</text>
<circle cx="252" cy="132" r="2" fill="#1F5C63"/><text x="260" y="136" font-family="system-ui,sans-serif" font-size="11" fill="#333330">effet non isolable du cadrage</text>
<circle cx="252" cy="154" r="2" fill="#1F5C63"/><text x="260" y="158" font-family="system-ui,sans-serif" font-size="11" fill="#333330">une mesure à un seul moment</text>
<circle cx="252" cy="176" r="2" fill="#1F5C63"/><text x="260" y="180" font-family="system-ui,sans-serif" font-size="11" fill="#333330">des modèles qui évoluent vite</text>
<circle cx="252" cy="198" r="2" fill="#1F5C63"/><text x="260" y="202" font-family="system-ui,sans-serif" font-size="11" fill="#333330">empreinte écologique des modèles</text>
<text x="458" y="84" font-family="system-ui,sans-serif" font-size="13" font-weight="600" fill="#1F5C63">Si c'était à refaire</text>
<circle cx="460" cy="104" r="2" fill="#1F5C63"/><text x="468" y="108" font-family="system-ui,sans-serif" font-size="11" fill="#333330">interroger les apprenant·es</text>
<text x="468" y="121" font-family="system-ui,sans-serif" font-size="11" fill="#333330">à plusieurs étapes</text>
<circle cx="460" cy="141" r="2" fill="#1F5C63"/><text x="468" y="145" font-family="system-ui,sans-serif" font-size="11" fill="#333330">entraîner au prompting</text>
<text x="468" y="158" font-family="system-ui,sans-serif" font-size="11" fill="#333330">&amp; à l'évaluation</text>
<circle cx="460" cy="178" r="2" fill="#1F5C63"/><text x="468" y="182" font-family="system-ui,sans-serif" font-size="11" fill="#333330">générer une remédiation validée</text>
<circle cx="460" cy="200" r="2" fill="#1F5C63"/><text x="468" y="204" font-family="system-ui,sans-serif" font-size="11" fill="#333330">déplacer l'IA de la correction</text>
<text x="468" y="217" font-family="system-ui,sans-serif" font-size="11" fill="#333330">vers le discours</text>
<circle cx="460" cy="237" r="2" fill="#1F5C63"/><text x="468" y="241" font-family="system-ui,sans-serif" font-size="11" fill="#333330">former les enseignant·es</text>
<text x="468" y="254" font-family="system-ui,sans-serif" font-size="11" fill="#333330">à concevoir des outils</text>
<circle cx="460" cy="274" r="2" fill="#1F5C63"/><text x="468" y="278" font-family="system-ui,sans-serif" font-size="11" fill="#333330">susciter l'adhésion au projet</text>
<text x="468" y="291" font-family="system-ui,sans-serif" font-size="11" fill="#333330">d'écriture</text>
<line x1="40" y1="344" x2="640" y2="344" stroke="#E4DFD2"/>
<text x="340" y="370" text-anchor="middle" font-family="Georgia,serif" font-size="12" font-style="italic" fill="#5A7A78">Moins une démonstration qu'une enquête à poursuivre – ailleurs, sur d'autres niveaux et d'autres langues.</text>
</svg>`,
  `<svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diapo 8, conclusion, les trois concepts">
<rect x="4" y="4" width="672" height="392" rx="14" fill="#0F2E33" stroke="#2C4D51"/>
<text x="340" y="98" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" letter-spacing="1.5" fill="#79C3B0">RÉVÉLATEUR</text>
<text x="340" y="122" text-anchor="middle" font-family="Georgia,serif" font-size="17" fill="#EFF5F3">l'IA ne crée rien : elle révèle nos angles morts</text>
<text x="340" y="170" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" letter-spacing="1.5" fill="#79C3B0">INSTRUMENT SECONDAIRE</text>
<text x="340" y="194" text-anchor="middle" font-family="Georgia,serif" font-size="17" fill="#EFF5F3">l'IA propose, l'enseignant·e accompagne, l'apprenant·e décide</text>
<text x="340" y="242" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" letter-spacing="1.5" fill="#79C3B0">AUTONOMIE À CONSTRUIRE</text>
<text x="340" y="266" text-anchor="middle" font-family="Georgia,serif" font-size="17" fill="#EFF5F3">non un état, mais une compétence</text>
<line x1="250" y1="306" x2="430" y2="306" stroke="#2C4D51"/>
<text x="340" y="338" text-anchor="middle" font-family="Georgia,serif" font-size="15" font-style="italic" fill="#9FD9C9">rester auteur·rice d'un texte que plusieurs voix produisent</text>
</svg>`,
];
