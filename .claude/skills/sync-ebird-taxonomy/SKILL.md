---
name: sync-ebird-taxonomy
description: Sync the site's bird species against a yearly eBird Taiwan checklist CSV. Diffs species by eBird code, reconciles site-only entries by scientific name via the eBird API, scaffolds add/remove changes, and audits Tâi-lô romanization against the project dictionaries to catch hanji↔reading mismatches. Use when a new annual eBird Taiwan 名錄 drops or bird species data needs auditing.
argument-hint: [csv-path]
effort: max
---

# Sync eBird Taxonomy Data

Annual workflow. Each year eBird Taiwan publishes an updated 鳥類名錄. The user downloads it, renames it, and commits the CSV as a yearly record. This skill diffs that checklist against the site's species entries and scaffolds the changes — one round, one PR.

**This is a scaffold-and-STOP skill, not a fully-autonomous one.** The mechanical parts (diff, API reconcile, photo/name fetch, insertion, build, commit) are automated. The judgment parts (whether to delete off-list species, final Taigi naming, push/PR) are user-gated. Stop at each gate and report.

## Core principle: site is a SUPERSET, not a mirror

The site intentionally covers species beyond the official checklist — escaped exotics, cage-bird trade species, unaccepted vagrants. **Off-list species are kept by default** (user decision, 2026-06-17). The checklist drives ADDITIONS and code/name corrections; it does NOT mandate deletions. Only remove when the user explicitly says so for that round.

## Input

CSV at `docs/ebird-checklists/ebird-taiwan-checklist-YYYY.M.csv` (user places it there; `$ARGUMENTS` may give the path). The CSV is committed as a yearly record (NOT gitignored).

CSV columns (17 total; row order = taxonomic order):

- `[0]` eBird 中文俗名
- `[1]` eBird English name
- `[2]` eBird scientific name
- `[3]` 現行臺灣鳥類名錄中文名
- `[4]` 現行臺灣鳥類名錄學名
- `[8]` eBird species code (the URL code — the join key)
- `[9]` taxonomic sort number
- `[14]` PhotoLink (usually empty → use iNaturalist), `[15]` Credit

## Site data layout

Species live in `src/content/docs/{order}/{family}.md` (Astro Starlight content collections, NOT `docs/`). Each entry:

```markdown
## 中文 日文 English [[eBird](https://ebird.org/species/CODE)]

![中文 日文 English](iNaturalist_photo_url)

(c) credit

**台語名**

- ◆ **建議名 romanization**
- ◇ 其他名 romanization
- △ 通稱 romanization

**號名理路**

- ...
```

- Image alt text must match the `##` heading exactly.
- Entries separated by `\n\n---\n\n`. **The last entry in a file has NO trailing `---`.**
- Sidebar order is `autogenerate` per directory in `astro.config.mjs` — adding/removing a family file updates the sidebar automatically, no config edit needed.

## Step 1 — Parse CSV + site, diff by code

```python
import csv, re, glob
from collections import Counter

CSV = 'docs/ebird-checklists/ebird-taiwan-checklist-YYYY.M.csv'  # set actual path
csv_by_code = {}
for row in list(csv.reader(open(CSV, encoding='utf-8')))[1:]:
    if len(row) > 8 and row[8].strip():
        csv_by_code[row[8].strip()] = {'zh': row[0].strip(), 'en': row[1].strip(),
                                       'sci': row[2].strip(), 'sort_row': None}

hr = re.compile(r'^##\s+(.+?)\s+\[\[eBird\]\(https://ebird\.org/species/([a-z0-9]+)\)\]')
site = {}
for md in glob.glob('src/content/docs/**/*.md', recursive=True):
    for ln, line in enumerate(open(md, encoding='utf-8'), 1):
        m = hr.match(line)
        if m:
            site[m.group(2)] = {'title': m.group(1), 'file': md, 'line': ln}

csv_codes, site_codes = set(csv_by_code), set(site)
add = csv_codes - site_codes      # in checklist, not on site -> ADD candidates
off = site_codes - csv_codes      # on site, not in checklist  -> KEEP by default
dups = [c for c, n in Counter(site).items() if n > 1]
```

The CSV's regex for the heading uses `[一-鿿]` only for the leading CJK run — note rare characters like `䳭` (U+4CAD) and `䴉` (U+4D29) are in CJK Ext A and fall OUTSIDE that range, so do name-discrepancy comparison on the full title string, not a narrow CJK class, to avoid false positives.

## Step 2 — Reconcile site-only by scientific name (eBird API)

`off` species are NOT automatically deletions. Some may be code-changes (split/rename) where the species is still on the list under a new code. Query the API and check:

```bash
curl -s "https://api.ebird.org/v2/ref/taxonomy/ebird?species=CODE1,CODE2,...&fmt=json"
```

Fields: `category` (`species` / `issf` / `slash` / `form`), `reportAs` (points to the real species code if demoted), `sciName`.

- If a site-only code's `sciName` reappears in the CSV under a DIFFERENT code → **code-change**: update the eBird link, don't delete.
- If `category != species` or `reportAs` is set → demoted; upgrade to the new code.
- If still `category=species`, `reportAs=-`, and `sciName` not in CSV → **genuinely off the official list** (escapee/vagrant). KEEP by default.

## Step 3 — Classify + REPORT (STOP gate 1)

Produce a report:

- **ADD** — codes in checklist, missing from site (target family file each).
- **CODE-CHANGE / DEMOTION** — site codes needing link updates (fix these; they're corrections, not deletions).
- **NAME DISCREPANCY** — matched codes where site 中文/English differs from CSV (corrections).
- **OFF-LIST (keep by default)** — list with eBird category evidence. **Do NOT delete. Ask the user** whether to keep/remove this round.

**Stop. Present the report. Wait for the user's removal decision before deleting anything.**

## Step 4 — ADD new species

For each ADD, gather:

1. **Japanese name** — `curl -s "https://api.ebird.org/v2/ref/taxonomy/ebird?species=CODE&fmt=json&locale=ja"`. If it returns the English name (no ja), fall back to iNaturalist: `https://api.inaturalist.org/v1/taxa?q=SCI_NAME&locale=ja` → `preferred_common_name`.
2. **CC photo** — `https://api.inaturalist.org/v1/taxa?q=SCI_NAME&rank=species` → `results[0].default_photo`. If `attribution` says "all rights reserved", swap for a CC one via observations:
   `https://api.inaturalist.org/v1/observations?taxon_name=SCI_NAME&photo_license=cc-by,cc-by-nc,cc0&quality_grade=research&order_by=votes&per_page=4` → use a photo URL (replace `square` with `medium`). **Check the photo isn't already used by a sibling entry** (iNat default photos can collide across split species).
3. **Taxonomic insertion anchor** — find the prev/next species (by CSV row order) that already exist in the target family file; insert between them. TOP if no prev exists; append if no next.

```python
order = [row[8].strip() for row in list(csv.reader(open(CSV, encoding='utf-8')))[1:]
         if len(row) > 8 and row[8].strip()]
pos = {c: i for i, c in enumerate(order)}
# family_codes = codes in the target family file, in file order
prev = max([c for c in family_codes if pos.get(c, 1e9) < pos[new]], key=lambda c: pos[c], default=None)
nxt  = min([c for c in family_codes if pos.get(c, -1) > pos[new]], key=lambda c: pos[c], default=None)
```

Insert with the Edit tool: replace the `nxt` heading line with `[new entry block]\n\n---\n\n[nxt heading line]`. **When you do this, re-append the anchor heading in the new_string** — forgetting it deletes the anchor entry (this bug happened in the 2026.5 round). Verify counts after every insert.

### Taigi naming — follow the family's pattern (provisional, source-sensitive)

Read 2-3 existing siblings in the target family FIRST and mirror their structure. General shape:

- **◆ recommended** — a Taigi-structured name: the family base term + a descriptive prefix derived from the trait in the 中文/English name (e.g. boobies use `海雞母 hái-ke-bó` base + 紅跤/白腹/青面/殕頭 prefix; bee-eaters use `食蜂鳥 tsia̍h-phang-tsiáu` + 青喉/青尾; swallows use `燕仔 ìnn-á`).
- **◇ alternate** — the Mandarin checklist name transliterated to Tâi-lô.
- **△ generic** — the umbrella term shared across the family.
- For a SPLIT, reuse the parent species' name + a distinguishing prefix (e.g. Hudsonian Whimbrel = 中杓鷸's `中土礱鉤仔` + `美洲` prefix).

Romanization is Tâi-lô (台羅). Verify each syllable against existing site usage (`grep -rho "syllable" src/content/docs`) before committing. **Flag low-confidence coinages** (pure place-name transliterations, first-of-kind with no sibling) in the report for user review — do NOT silently finalize them. Every entry's 號名理路 boilerplate already states the name is provisional and will be refined with better native sources.

## Step 5 — Removal (only if user approved in Step 3)

If and only if the user said delete:

- Remove the entry block cleanly. Easiest robust method: rebuild the file — split on `## ...[[eBird]...]` headings, drop the targeted codes, rejoin kept bodies with `\n\n---\n\n` + trailing newline. This avoids the dangling-`---` problem when deleting the last entry.
- If a family file ends up with **zero species**, delete the whole file. The order survives as long as another family file remains; the sidebar autogenerates. No `astro.config.mjs` edit needed.

## Step 6 — Format / link audit

- Headings wrapped in an extra markdown link (`## [中文 ... English](url) [[eBird](url)]`) are malformed → strip the wrapping link, keep `## 中文 ... English [[eBird](url)]`.
- Image alt text must equal the heading.
- Use `臺灣` (not `台灣`) in species names; `鸕鷀`/`杓鷸` per eBird standard.

## Step 7 — Build + verify

```bash
npm run build   # Astro, NOT docusaurus. Always pass before committing.
```

Verify with a script: no duplicate codes, all ADD codes present, `site_codes ⊇ csv_codes` (superset — every checklist species is on the site; extras are the kept off-list ones).

## Step 7b — Tâi-lô romanization audit

Catch hanji↔romanization mismatches — where a name's Tâi-lô syllable does not correspond to its hanji character (e.g. `烏色 tê-sik`: 烏 reads `oo`/`u`, not `tê` — `tê` is a reading of 茶, copy-paste residue). Runs over ALL entries (new + pre-existing), so it doubles as a site-wide audit.

Build a per-character reading map from the project's dictionary data and compare each `◆/◇/△` name's syllables against it:

```python
import csv, re, glob, unicodedata as ud
from collections import Counter
def norm(s): return ud.normalize('NFC', s).strip()
def detone(s): return ''.join(c for c in ud.normalize('NFD', s.lower()) if ud.category(c) != 'Mn')

tone, notone = {}, {}
def add(ch, roma):
    ch = norm(ch); r = norm(roma).lower().lstrip('-')
    if len(ch) == 1 and r and re.fullmatch(r'[a-zà-ÿ̀-ͯ]+', r):
        tone.setdefault(ch, set()).add(r); notone.setdefault(ch, set()).add(detone(r))

DREF = 'docs/dictionary-reference/'
# primary: 教育部 per-char correspondence (col0=漢字, col1=羅馬字)
for row in list(csv.reader(open(DREF + '1_教育部臺灣台語常用詞辭典/data/02_extracted/漢字羅馬字對應.csv', encoding='utf-8')))[1:]:
    if len(row) >= 2: add(row[0], row[1])
# coverage boost: single-char rows from other dicts (col0=tl, col1=hanzi)
for src in ['1_教育部臺灣台語常用詞辭典/data/12_source/kautian.csv', '6_台日大辭典/data/10_source/taijit.csv',
            '3_iTaigi華台對照典/data/10_source/itaigi.csv', '5_台華線頂對照典/data/10_source/taihoa.csv']:
    for row in list(csv.reader(open(DREF + src, encoding='utf-8')))[1:]:
        if len(row) >= 2 and len(norm(row[1])) == 1: add(row[1], row[0])

nameline = re.compile(r'^-\s*[◆◇△]\s*\*{0,2}([^\s*]+)\s+(.+?)\*{0,2}\s*$')
kata = re.compile(r'[゠-ヿ]')
reading, tonew = [], []
for md in glob.glob('src/content/docs/**/*.md', recursive=True):
    for ln, line in enumerate(open(md, encoding='utf-8'), 1):
        m = nameline.match(line.rstrip())
        if not m: continue
        hanji = norm(m.group(1)); roma = norm(m.group(2)).lower()
        if kata.search(hanji) or not re.fullmatch(r'[㐀-鿿㐀-䶿]+', hanji): continue   # skip katakana / mixed-latin names
        if not re.fullmatch(r"[a-zà-ÿ̀-ͯ\-]+", roma): continue
        chars = list(hanji); syl = [s for s in roma.split('-') if s]
        if len(syl) != len(chars): continue   # 合音 / borrowing -> skip (count mismatch is not a reading error)
        for ch, s in zip(chars, syl):
            if ch not in tone or s in tone[ch]: continue
            (tonew if detone(s) in notone[ch] else reading).append((md.replace('src/content/docs/',''), ln, ch, s, hanji, roma, sorted(tone[ch])[:4]))

freq = Counter((r[2], r[3]) for r in reading)
high = [r for r in reading if freq[(r[2], r[3])] <= 2]   # rare reading mismatch = likely a real error
print(f"READING mismatches {len(reading)} (HIGH/rare {len(high)}) | TONE-mark nits {len(tonew)}")
for r in high: print(f"  HIGH {r[0]}:{r[1]}  {r[4]} {r[5]}  「{r[2]}」='{r[3]}' dict={r[6]}")
for r in tonew: print(f"  TONE {r[0]}:{r[1]}  {r[4]} {r[5]}  「{r[2]}」='{r[3]}' dict={r[6]}")
```

How to read the output (this is a REVIEW aid, not auto-fix — STOP gate, present to user):

- **HIGH (rare reading mismatch, ≤2 occurrences)** — most likely real errors. e.g. `烏='tê'`, `烏='pe̍h'`, `色='sin'`, `鳥='tsiá'` (missing the `u` in `tsiáu`). Eyeball each.
- **TONE — same letters, different tone mark** — often a missing/wrong tone diacritic (`荻 tik` vs dict `ti̍k`). Medium priority.
- **LOW (a `(char, syllable)` mismatch repeating many times, e.g. `鴝 kî`×16)** — almost always a bird-specific colloquial reading the dictionary lacks, used consistently across the site. NOT an error; ignore or note for the dictionary.
- **Expected non-matches**: place-name borrowings (`勘察加` Kamchatka, `納茲卡` Nazca), 訓讀, and文白 variants the 教育部 set omits (`綠 le̍k` is valid colloquial though dict lists `lio̍k/li̍k`). Do not "correct" these blindly — verify against the actual character reading first.

Never auto-edit on a flag. Confirm the correct reading (check the dictionary CSVs or the canonical name source) before changing any romanization, since the dictionary map has real coverage gaps.

## Step 8 — Commit (English, caveman-lite)

Check identity first: `git config user.email`. If `minsiansu@gmail.com` (personal) → add `Co-Authored-By: Claude Code <noreply@anthropic.com>`; any company email → omit it.

- Branch `fix/update-ebird-YYYY.M-taxonomy`.
- Logical commits: (1) `chore(data): add eBird Taiwan YYYY.M checklist` (CSV), (2) corrections/removals if any, (3) `content: add N species ...`. Conventional Commits subject.

## STOP gates (never auto-do these)

1. **Deleting off-list species** — keep by default; ask.
2. **Finalizing Taigi names** — scaffold + flag low-confidence; user reviews.
3. **Fixing romanization flags** — Step 7b is a review aid; the dictionary has coverage gaps. Present HIGH/TONE flags, confirm the correct reading, then ask before editing.
4. **`git push` + `gh pr create`** — outward actions, user-gated. Stop after commit + clean build; report and wait.

## Key principles

- **eBird is the authority** for species codes, Chinese names, English names; verify every change via the eBird API, not the CSV alone.
- **iNaturalist** for photos; prefer Creative Commons, flag/replace all-rights-reserved.
- Use `replace_all` carefully — names appear in heading, image alt text, and 台語名 section; update all occurrences when renaming.
- No codex review needed for this task (user direction).
