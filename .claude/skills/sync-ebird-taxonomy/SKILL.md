---
name: sync-ebird-taxonomy
description: Compare a Google Sheets spreadsheet against the bird data in docs/ to find discrepancies in eBird codes, Chinese names, English names, and scientific names. Use when eBird taxonomy is updated or bird name data needs auditing.
argument-hint: [spreadsheet-url]
effort: max
---

# Sync eBird Taxonomy Data

Compare bird species data from a Google Sheets spreadsheet with the Markdown files in `docs/` and fix discrepancies.

## Input

The user provides a Google Sheets URL: `$ARGUMENTS`

## Steps

### 1. Download Spreadsheet Data

Export via CSV format:

```bash
curl -sL "https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv" -o /tmp/taigibird_sheet.csv
```

Column mapping:
- `[0]` eBird Chinese name
- `[1]` eBird English name
- `[2]` eBird scientific name
- `[3]` Taiwan checklist Chinese name
- `[4]` Taiwan checklist scientific name
- `[8]` eBird species code

### 2. Parse Codebase Bird Data

Extract species info from all Markdown files in `docs/`:

- **Species heading**: `## ChineseName JapaneseName English Name`
- **Image alt text**: matches heading — `![ChineseName JapaneseName English Name](url)`
- **eBird link**: `[eBird 資料](https://ebird.org/species/{CODE})`
- **Taiwanese name section**: `🎯 **TaiwaneseName romanization**`

Use a Python script to extract:
- Chinese name (first CJK character group from `##` heading)
- English name (last Latin character group from heading)
- eBird species code (from eBird link URL)
- File path and line number

### 3. Verify with eBird API

For all species with discrepancies, verify against the eBird API:

```bash
# Get English name and taxonomy
curl -s "https://api.ebird.org/v2/ref/taxonomy/ebird?species={CODE}&fmt=json"

# Get Chinese name
curl -s "https://api.ebird.org/v2/ref/taxonomy/ebird?species={CODE}&fmt=json&locale=zh"
```

Key API response fields:
- `comName`: English name (or Chinese with locale=zh)
- `sciName`: scientific name
- `speciesCode`: species code
- `category`: `species` / `issf` (subspecies group) / `slash` / `form`
- `reportAs`: if not species-level, points to the correct species code

### 4. Classify Discrepancies

Produce a report with these categories:

#### A. eBird Link/Code Errors
- Link points to wrong species (e.g. Graylag Goose using Bar-headed Goose's code)
- Old code demoted to issf/slash/form, needs upgrade to new species code
- Species split/reclassification causing code changes

#### B. Chinese Name Discrepancies
- Typos (wrong characters)
- Character standardization (e.g. variant characters)
- 台灣 → 臺灣 consistency
- Other name changes

#### C. English Name Discrepancies
- English name changes linked to code updates
- Standalone English name corrections

#### D. Missing Species
- In spreadsheet but missing from codebase
- In codebase but missing from spreadsheet (note for review, keep by default)

### 5. Fix Workflow

After confirming eBird as the authoritative source, fix in this order:

1. **Create new branch**: `fix/update-ebird-{year}-taxonomy`
2. **Fix eBird codes** (highest priority — affects data link correctness)
3. **Fix Chinese names** (typos, character standardization, 台→臺)
4. **Fix English names**
5. **Add missing species**

Each step gets its own commit.

### 6. New Species Entry Format

```markdown
---

## ChineseName JapaneseName English Name

![ChineseName JapaneseName English Name](iNaturalist_photo_url)

(c) credit

**台語名**

🎯 **TaiwaneseName romanization**

參考華語鳥類名錄、[eBird 資料](https://ebird.org/species/CODE)
```

Get photos from iNaturalist API:
```bash
curl -s "https://api.inaturalist.org/v1/taxa?q={SCIENTIFIC_NAME}&rank=species"
```
Use `results[0].default_photo.medium_url` and `attribution`.

### 7. Verification

After all fixes:

```bash
# Confirm old codes/names are gone
grep -r "old_code_or_name" docs/

# Confirm eBird links resolve
curl -sI "https://ebird.org/species/{CODE}"  # should return 302

# Also check index.md, intro.md and other reference files for stale names

# Build test
npx docusaurus build
```

## Key Principles

- **eBird is the authority**: Chinese names, English names, and species codes all follow eBird
- **All changes must be verified via eBird API**: do not rely solely on the spreadsheet
- **Use `replace_all`**: bird names appear in headings, image alt text, and Taiwanese name sections — update all occurrences
- **Check related files**: `index.md`, `intro.md`, etc. may also reference bird names
- **Photo licensing**: prefer Creative Commons licensed photos; flag any "all rights reserved" images
