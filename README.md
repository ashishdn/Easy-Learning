# জ্ঞানকোষ

A Bengali educational platform for Bangladesh Class 9–10, built in the existing JavaScript Next.js App Router project. No authentication, database, or paid services.

## Run locally

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production: `npm run build`, then `npm start`.

The first build needs Google Fonts access to download Noto Sans Bengali. Next.js then serves the font locally; students do not make font requests to Google.

## Available features

- Responsive Bengali homepage, class/subject selection, mobile navigation, breadcrumbs, footer.
- Data-driven subject/chapter routes, Bengali metadata, loading/error/invalid-route handling.
- All 17 mathematics chapters follow the supplied NCTB textbook contents: 110 concepts, 81 formula/relationship cards, 108 solved problems, 72 ক/খ/গ/ঘ question parts, and 73 assessment questions. Examples use original explanations and selected problems rather than reproducing every textbook exercise.
- Geometry diagrams, Venn diagram, simultaneous-equation graph, trigonometric and statistical tables, construction steps/proofs, and previous/next chapter navigation.
- Algebraic Expressions retains the earlier handnote material and adds the textbook introduction to expressions, terms, coefficients, and degree.
- Waves and Sound (physics chapter 7 per supplied handnotes): 11 concepts, 8 formula cards, 10 solved problems, 11 question/answer records, 5 assessment questions.
- Native solution disclosures; filters for chapters, formulas, topics, and problem difficulty.
- Unicode-normalized local search across 429 records, with direct learning links. Formula library and catalog counts are derived from all available chapters.
- Server-rendered KaTeX with strict parsing, HTML/MathML, disabled untrusted commands, and bounded macro expansion. Only KaTeX-generated markup is inserted.
- Book-style math also appears in questions, stimuli, solution steps, concepts, assessments, and search results. Fractions are stacked; powers and roots use mathematical typography. Long display equations scroll within their own keyboard-accessible viewport and show a hint only when needed.
- Actual quiz scoring, Bengali numeric input, reset, explanations. Results use component state only; leaving the page or reloading clears them.
- Chemistry and Biology have explicitly labeled previews.

## Content accuracy

The mathematics chapter sequence matches the supplied textbook's 17-chapter contents. Its filename refers to the 2026 academic year; its colophon records the October 2025 revised edition. The lessons cover selected important concepts, not every exercise. Original practice is marked **অনুশীলনী নমুনা** and adapted teaching material **পর্যালোচনাধীন**. No board-exam attribution, teacher approval, or official endorsement is claimed. See [the textbook review and chapter coverage](docs/math-textbook-review.md) for printed/PDF page mapping, provenance and validation limits. The physics catalog remains a selected chapter list.

Algebra and physics also retain material from the four earlier user-supplied handnote PDFs. Handnote content is marked **পর্যালোচনাধীন**, with source filenames/pages and review notes. The incorrect 8.3 m echo-distance result is corrected to 16.6 m under the supplied assumptions; denominator restrictions and other conditions are explicit. See [the handnote review](docs/handnote-review.md). Original PDFs and temporary extraction tools are not bundled with the website.

## Source map and extension

- `src/app/`: home, class/subject/chapter routes, formulas, search, fallbacks.
- `src/components/`: shared layout, learning template, filters, solutions, assessment.
- `src/data/classes.js`, `subjects.js`, `chapters.js`: catalog metadata.
- `src/data/general-mathematics/textbook.js`: edition metadata and all 17 chapter page ranges. `chapters/`: individual lessons assembled by `build.js` and registered in `index.js`; original Real Numbers and algebra records are retained as supporting modules.
- `src/data/general-mathematics/chapters/algebraic-expressions.js`, `src/data/physics/chapters/waves-and-sound.js`: reviewed handnote chapters, assembled through `src/data/content-builders.js`.
- `src/data/labels.js`: shared interface labels and learning-section names.
- `src/lib/content.js`: subject-to-content registry.
- `src/lib/education.js`, `search.js`, `validation.js`: route lookups, search, normalization, answer/data checks.
- `src/app/globals.css`: design tokens, responsive styles, focus indicators, reduced motion.

Add chapters through catalog records and subject content objects. Add subjects through metadata, chapter records, and a content module registered in `src/lib/content.js`. Shared pages render the supplied data. Static paths and search are derived from the catalog/content. Keep record IDs unique and references valid. No page-template duplication is necessary.

### Authoring textbook-style explanations

`MathText` renders the existing bounded plain-text notation (`১/x²`, `√২`, powers, etc.) without evaluating it. Explicit TeX can be enclosed in `$...$` in authored text. Search and answer checking retain the original data strings. Unknown prose remains ordinary text. Both renderers disable trusted KaTeX commands.

Solution steps may be plain strings or `{ text, math, reason }` records. `math` contains validated TeX (use `aligned` for short, readable lines); `reason` explains why the operation is valid. A question's optional `explanation` introduces the method. The খ-section algebra questions demonstrate full rationalization and remainder-theorem explanations. Keep calculations and prose separate when adding detailed solutions.

`src/lib/math-text.js` handles legacy notation; `src/components/math-text.js` renders inline math. `math-viewport.js` measures overflow with ResizeObserver so only long display equations get a scroll hint. Desktop hover effects are limited to a fine pointing device, with stable target positions and separate pressed/keyboard states.

## Checks

```sh
npm run lint
npm run validate
npm run build
npm run test:e2e
```

The validator checks all 18 available chapters, solution completeness, unique IDs, references, KaTeX, search, Bengali numeric answers including Unicode minus, the complete mathematics catalog, representative textbook calculations, polynomial identities, and corrected physical calculations. The Node experimental-VM warning is expected.

Playwright starts a production server on port 3100. It uses installed Microsoft Edge headlessly. On machines without Edge, install Chromium (`npx playwright install chromium`) and remove `channel: 'msedge'` from `playwright.config.mjs`. Run a production build first. Checks cover navigation, category filtering, solution toggles, formula filters, search deep links, correct/incorrect scoring, previews, invalid paths, mobile navigation, and 390px overflow. Screenshots go to ignored `test-results/`.

`tests/reading-layout.spec.js` additionally checks stacked fractions/roots, explanatory solution steps, hover target stability, selected-filter contrast, and seven principal pages with all disclosures expanded at nine widths from 320px to 1440px.

`tests/textbook.spec.js` checks all 17 mathematics routes and sequential navigation, then checks diagrams, tables and expanded lessons at 320, 390, 768 and 1440px.

Runtime additions: `lucide-react`, `katex`. Development additions: `@playwright/test`, `prettier`. Existing Next.js/React/Tailwind, npm, App Router, and cache configuration are preserved. `npm run format` formats source and checks.
