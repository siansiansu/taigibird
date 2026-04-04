---
name: sync-sheets
description: Sync reference tables from CSV files in src/data/ to markdown files in references/. Converts CSV data to properly formatted markdown tables.
argument-hint: [filename(s) without extension, e.g. "anatomy colors" or blank for all]
---

# Sync Sheets — CSV to Markdown Table

Convert CSV files in `src/data/` to markdown tables in `src/content/docs/references/`.

## Input

Optional: `$ARGUMENTS` — space-separated file names (without extension) to sync. If empty, sync all CSV files found in `src/data/`.

## CSV → Markdown Mapping

| CSV File          | Target Markdown                                  |
|-------------------|--------------------------------------------------|
| `anatomy.csv`     | `src/content/docs/references/anatomy.md`         |
| `appearance.csv`  | `src/content/docs/references/appearance.md`      |
| `colors.csv`      | `src/content/docs/references/colors.md`          |
| `ecology.csv`     | `src/content/docs/references/ecology.md`         |
| `sounds.csv`      | `src/content/docs/references/sounds.md`          |
| `names.csv`       | `src/content/docs/references/names-and-places.md`|
| `places.csv`      | `src/content/docs/references/names-and-places.md`|

**Special case:** `names.csv` and `places.csv` both target `names-and-places.md`. They produce two separate tables under `## 人名` and `## 地名` headings respectively.

## Steps

### 1. Determine Which Files to Sync

- If `$ARGUMENTS` is provided, sync only those (e.g. `anatomy colors` → process `anatomy.csv` and `colors.csv`)
- If empty, glob `src/data/*.csv` and process all found files

### 2. Process Each CSV File

For each CSV file (except `names.csv` and `places.csv` — see Step 3):

#### 2a. Read the CSV

- Read `src/data/{name}.csv` using the Read tool
- CSV is UTF-8 encoded
- First row is the header row
- Handle quoted fields (fields containing commas are wrapped in double quotes)
- Preserve empty cells — they become empty table cells

#### 2b. Read the Existing Markdown File

- Read `src/content/docs/references/{name}.md`
- **Extract and preserve everything before the first table** (the first line starting with `|`):
  - YAML frontmatter (between `---` markers)
  - Intro paragraph(s)
  - Any extra content (e.g. `ecology.md` has email/Instagram links before the table)
- This preserved content will be reused as-is

#### 2c. Generate the Markdown Table

- Use the CSV header row as the markdown table header
- Generate a separator row (`|---|---|...`) matching the number of columns
- Generate data rows from the remaining CSV rows
- Use `|` delimiters with a single space padding on each side: `| value |`
- Empty cells render as `| |`

#### 2d. Write the Updated File

Write the file with:
```
{preserved frontmatter + intro content}
{markdown table}
```

Ensure there is exactly one blank line between the intro content and the table header.
Ensure the file ends with a single newline.

### 3. Special Case: names-and-places.md

If processing `names.csv` and/or `places.csv`:

1. Read the existing `src/content/docs/references/names-and-places.md`
2. Preserve only the frontmatter and the first intro paragraph (everything before `## 人名`)
3. Build the file as:

```
{frontmatter}

{intro paragraph}

## 人名

{table from names.csv}

## 地名

{table from places.csv}
```

- If only one of `names.csv`/`places.csv` exists, keep the other table from the existing file unchanged
- If both exist, regenerate both tables

### 4. Verify

Run `npm run build` to confirm no rendering issues.

## Key Principles

- **Preserve frontmatter and intro text exactly** — never modify the YAML frontmatter or introductory paragraphs
- **CSV headers become table headers** — use them directly, no renaming or reordering
- **Handle romanization carefully** — Tâi-lô characters (oo, nn, i̍k, etc.) must pass through unchanged
- **Empty cells are valid** — some rows intentionally have empty columns (especially in ecology.md)
- **No trailing whitespace** in table cells
