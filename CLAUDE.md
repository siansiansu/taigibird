# taigibird

鳥仔 ê 名：線頂台語鳥仔名冊，使用 Astro Starlight。內容對照鳥種、台語名、eBird 連結、iNaturalist 圖片，以及華語/日語/英語名。

## Commands

```bash
npm start
npm run dev
npm run build
npm run preview
npm run clear
```

Run `npm run build` before finishing changes.

## Layout

- `src/content/docs/`: published site content.
- `src/content/docs/{order}/{family}.md`: family pages with species entries.
- `src/content/docs/references/`: published reference tables.
- `src/data/`: CSV sources for reference tables.
- `docs/ebird-checklists/`: yearly eBird Taiwan checklist CSV snapshots.
- `.claude/skills/ebird-sync/SKILL.md`: annual checklist sync workflow.

## Species Entries

Follow nearby entries in `src/content/docs/`:

```md
## 中文 日文 English [[eBird](https://ebird.org/species/CODE)]
![中文 日文 English](image_url)
credit
**台語名**
- ◆ **建議名 romanization**
- ◇ 其他名 romanization
- △ 通稱 romanization
**號名理路**
```

`號名理路` may be blank during staged review. Example: `墓壙鳥 bōng-khòng-tsiáu` 收錄佇【蕭平治】《還我台灣鳥á名》。

## Workflow Rules

- eBird species code is the stable join key.
- The site is a superset of the Taiwan checklist; off-list species are kept by default.
- Use `臺灣`, `鸕鷀`, and `杓鷸` in bird names.
- When renaming, update heading, image alt text, Taigi name section, and relevant index text.
- Sidebar order lives in `astro.config.mjs`.
