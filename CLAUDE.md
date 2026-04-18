# taigibird

Taiwanese (Taigi/台語) bird name reference site — maps 750+ bird species to their Taigi names with eBird links, iNaturalist photos, and cross-language references (Chinese, Japanese, English).

Built with **Astro Starlight**. Requires **Node.js 22+** (managed via mise).

## Commands

```bash
npm start          # Local dev server (alias for npm run dev)
npm run dev        # Local dev server
npm run build      # Production build
npm run preview    # Serve production build locally
npm run clear      # Clear generated files
```

**Always run `npm run build` before committing** to catch any build errors.

## Content Architecture

```
src/content/docs/
├── index.md                          # Landing page (root /)
├── {order}/                          # Bird order directory (e.g. passeriformes/)
│   ├── index.md                      # Order overview with family links
│   └── {family}.md                   # Family file containing species entries
└── references/                       # Taigi linguistic references (gitignored)
```

- Content lives in `src/content/docs/` (Astro content collections)
- Static assets live in `public/` (fonts, images, manifest)
- Sidebar ordering is defined in `astro.config.mjs` (not filesystem-based)
- `trailingSlash: 'always'` — all URLs end with `/`
- Custom components: `src/components/Header.astro` (navbar links), `src/components/Footer.astro` (social links + copyright)
- Custom CSS: `src/styles/custom.css` (grayscale Apple theme, `--sl-*` variables)

## Canonical Specs

Use `docs/` as the single source of truth for project standards.

- `docs/species-markdown-template.md` — canonical species entry template
- `docs/taigi-bird-name-review-agent-spec.md` — naming review workflow and evidence rules
- `docs/taigi-language-background.md` — Taigi language baseline and lookup guidance
- `docs/taigibird-agent-operating-model.md` — shared agent workflow distilled from `.claude/skills/`

If a summary in `CLAUDE.md` or `.claude/` differs from these files, follow the `docs/` version.

## Species Entry Format

Every bird species should follow the canonical template in `docs/species-markdown-template.md`.

Minimum structure:

```markdown
## ChineseName JapaneseName English Name

![ChineseName JapaneseName English Name](iNaturalist_photo_url)

(c) credit

**台語名**

- ◆ **RecommendedTaigiName romanization**
- ◇ AlternateName romanization
- ✳ GenericName romanization

**號名理由**

- Primary basis:
- Selection reason:

**參考資料**

- [eBird 資料](https://ebird.org/species/CODE)
```

- `◆` = primary recommended name for this species
- `◇` = accepted alternate / regional / historical / secondary candidate
- `✳` = generic/umbrella term shared across species
- Image alt text must match the `##` heading exactly
- eBird link is required for every species
- `**號名理由**` and `**參考資料**` are required
- Use `**註解**` when the entry keeps multiple `◆` items or remains source-sensitive

## Naming Rules

From `src/content/docs/index.md` — priority order for Taigi bird names:

1. Use existing native Taigi names when available
2. If the Taigi name is a generic term covering multiple species, add a descriptive prefix to distinguish
3. If no native Taigi name exists, reference Chinese/English/Japanese names and bird characteristics
4. Taxonomic group names use native Taigi nomenclature
5. Romanization uses Tâi-lô (台羅 / 教育部臺灣閩南語羅馬字拼音方案)

## Data Sources

- **eBird is the authority** for species codes, Chinese names, and English names
- **iNaturalist** for species photos (prefer Creative Commons licensed)
- **eBird API**: `https://api.ebird.org/v2/ref/taxonomy/ebird?species={CODE}&fmt=json` (add `&locale=zh` for Chinese names)
- **iNaturalist API**: `https://api.inaturalist.org/v1/taxa?q={SCIENTIFIC_NAME}&rank=species`

## Deployment

- Hosted on **Cloudflare Pages** (`taigichiau.pages.dev`)
- Algolia DocSearch enabled (app ID: `VI6SD4P5S4`)
- Google Analytics: `G-CSVZ230KDP`

## Gotchas

- `.claude/` is gitignored — use `git add -f` for skills that should be shared
- `references/` directory is gitignored (not deployed)
- When renaming birds, update ALL occurrences: `##` heading, `![]()` image alt text, Taigi name section, and check `index.md`
- Use `臺灣` (not `台灣`) in bird species names per eBird standard
- Species entries use `鸕鷀` (not `鸕鶿`), `杓鷸` (not `勺鷸`) per eBird standard
- Sidebar order is hardcoded in `astro.config.mjs` — add new orders there
- Frontmatter must include `title` and `description`; `keywords` is optional (extended schema in `src/content.config.ts`)
