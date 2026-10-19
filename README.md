# flash

A mobile-friendly, Portuguese-language flashcard website for concurso preparation. Content lives in the repository; personal review progress lives in the browser. No accounts, database, or backend.

## Run

Requires Node.js 22.6+ (Node 24 recommended).

```sh
npm install
npm run dev
```

Open the URL printed by Vite. The dev server binds to all interfaces, so you can also visit it from a phone on the same network using your computer's IP address.

```sh
npm run build
npm run preview
npm test
```

Deploy `dist/` to a static host. The default base path is `/`; set `VITE_BASE_PATH=/flash/` when building for a subdirectory. HTTPS (or localhost) is required for the service worker. Production builds cache the app and its bundled content for offline use after an initial successful visit. System fonts work offline without third-party font requests. Development does not register a service worker.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` tests, builds, and deploys on pushes to `main`. It derives the base path from GitHub Pages, so both project URLs and custom domains work without hardcoding a repository name.

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Commit and push these project files to `main` (including the workflow and `package-lock.json`, not `dist/` or `node_modules/`).
4. Open **Actions → Deploy flash to GitHub Pages** and wait for the build and deployment jobs to succeed. You can also use **Run workflow** to deploy manually.
5. Visit **https://ricardostange.github.io/flash/**. The deployment URL also appears in the workflow and Pages settings.

To preview the project-path build locally on Linux/macOS:

```sh
VITE_BASE_PATH=/flash/ npm run build
VITE_BASE_PATH=/flash/ npm run preview
```

Open the printed server URL with `/flash/` appended. The manifest, icons, bundles, service worker, and offline cache all respect this path.

Localhost progress does not automatically transfer to the deployed site because browser storage is origin-specific. Export a backup locally and import it on the live site if needed.

## Appearance and mobile layout

Use **Configurações → Aparência** to choose **Claro**, **Escuro**, or **Sistema** (the default). The preference is saved locally under `memoria-theme`, separately from study progress. System mode follows device changes automatically; the initial theme is applied before rendering to avoid a light flash. If browser storage is blocked, the choice still works for the current visit.

The home screen prioritizes reviewing and choosing subjects; statistics remain under **Meu progresso**. During training the sidebar disappears. On mobile, reveal/rating controls stay at the bottom with safe-area spacing; the explanation remains scrollable. Low-height landscape layouts use sticky controls instead to avoid covering the content. Selecting a subject scopes the main review button to that subject.

### Browser checks

```sh
npx playwright install --with-deps chromium
npm run test:ui
```

These checks cover theme persistence and system changes, mobile navigation focus, keyboard training, progress saving, and narrow-screen layouts. Mobile tests emulate a phone in Chromium, not a physical iOS device.

## Add your content

Edit **`src/content.ts`**:

- `subjects`: nested subject tree. IDs must be unique and stable. Create as many levels as you need.
- `explanations`: reusable main content with title, paragraphs, and source.
- `cards`: question, direct answer, leaf `subjectId`, and shared `explanationId`.

Multiple cards can point to the same explanation. Updating that explanation updates the content shown with every related card. Card IDs are used to persist scheduling: keep them stable when editing questions. The app includes a separate deck of 100 Desenho Técnico Mecânico cards, 50 CGU 2026 cards on Estado e política, and the original 12 demonstration cards. These are study material, not official exam questions or a complete course.

The CGU deck lives in `src/decks/cgu-estado-politica.ts` and is registered in `src/content.ts`. Its subject hierarchy follows CGU 2026 → Conhecimentos básicos → Estado e política → the nine syllabus topics. Each card references a shared explanation whose source points to the corresponding Markdown lesson and references.

```ts
// Leaf inside subjects:
{ id: 'my-topic', title: 'Meu tópico' }

// Inside explanations:
{
  id: 'my-explanation',
  title: 'Entenda o conceito',
  paragraphs: ['Explicação principal.', 'Exemplo ou dica de memorização.'],
  source: 'Referência do conteúdo',
}

// Inside cards:
{
  id: 'my-card',
  subjectId: 'my-topic',
  question: 'Qual é a pergunta?',
  answer: 'Resposta direta.',
  explanationId: 'my-explanation',
  type: 'Pergunta e resposta', // or 'Certo ou errado'
  tag: 'Tema',
}
```

## Reviews

The independent **Desenho Técnico Mecânico** subject contains 100 cards: 80 direct questions and 20 true/false items, organized into ten topics. Its IDs use the `dtm-` prefix. The [deck guide and references](conteudos/desenho-tecnico-mecanico/README.md) document its scope, conventions, and original numerical exercises.

Select a whole subject branch or a specific leaf. Search/filter cards and use **Estudar seleção**, or start due reviews from the dashboard. Clicking a card opens its answer and explanation without changing progress.

During a session, try recalling the answer before revealing it, then choose:

- **De novo**: return the card to the session queue; schedule it in one minute if you leave.
- **Difícil**: interval × 1.2, rounded, minimum one day.
- **Bom**: interval × 2.5, rounded, minimum one day.
- **Fácil**: interval × 3.5, rounded, minimum four days.

This is a deliberately simple spaced-repetition scheduler, not Anki's algorithm. Practicing a card early also updates its schedule. Daily counts include repeated attempts. Keyboard users can tab through all controls; Space reveals an answer (or activates the focused button), and 1–4 rate it. Shortcuts are disabled in dialogs and text fields. Dialogs trap focus and close with Escape.

## Local data and backups

The internal `memoria-*` storage keys are retained for compatibility, so the rename to **flash** preserves existing progress, appearance preferences, and backups.

Progress is saved after every rating in `localStorage` under `memoria-progress-v1`. Clearing browser data removes it. Different browsers, origins, and devices have independent progress; there is no automatic synchronization. Avoid simultaneous study in multiple tabs, as the last save wins.

Use **Configurações → Exportar backup** regularly. Importing a validated backup replaces local progress after confirmation. Resetting progress does not delete project-defined cards. The app warns when browser storage is unavailable.

## Project structure

- `src/content.ts` — subject tree, cards, shared explanations
- `src/decks/cgu-estado-politica.ts` — 50 CGU cards and their subject tree and shared explanations
- `src/decks/desenho-tecnico-mecanico.ts` — 100 mechanical drawing cards in a separate subject tree
- `src/scheduler.ts` — scheduling, date keys, backup validation
- `src/main.tsx` — React UI, sessions, local persistence
- `src/styles.css` — theme tokens, responsive design and reduced-motion support
- `src/theme.ts` — persisted appearance preference and system-theme updates
- `public/sw.js` — production offline caching
- `tests/scheduler.test.mjs` — scheduling, backups, content integrity tests
- `tests/browser/refinements.spec.ts` — desktop/mobile browser checks


## Conteúdos de estudo em Markdown

A base de explicações curadas começa em [conteudos/README.md](conteudos/README.md).
O primeiro módulo é [CGU 2026 — Estado e política](conteudos/cgu-2026/conhecimentos-basicos/01-estado-e-politica/README.md), organizado pelos nove tópicos da disciplina, com aulas, exemplos, mapa de cobertura e fontes.

O módulo Estado e política já está integrado ao aplicativo com 50 cartões: 30 de pergunta e resposta e 20 de certo ou errado, com explicações de apoio. Os 20 itens de julgamento se dividem em 10 certos e 10 errados. Os IDs dos cartões são estáveis para preservar o histórico de revisão.

