---
name: add-species
description: Add a new bird species entry given an eBird species code. Fetches Chinese/English names from eBird API, photo from iNaturalist, and inserts a formatted entry into the correct family file.
argument-hint: <ebird-species-code> [taiwanese-name romanization]
---

# Add Species Entry

Given an eBird species code, generate a complete species entry and insert it into the correct family Markdown file.

## Input

- Required: eBird species code (e.g. `eueowl1`)
- Optional: Taiwanese name and romanization (e.g. `鵰鴞 tiau-hiau`)

```
$ARGUMENTS
```

## Steps

### 1. Fetch species data from eBird API

```bash
# English name, scientific name, family, order
curl -s "https://api.ebird.org/v2/ref/taxonomy/ebird?species={CODE}&fmt=json"

# Chinese name
curl -s "https://api.ebird.org/v2/ref/taxonomy/ebird?species={CODE}&fmt=json&locale=zh"
```

Key fields: `comName`, `sciName`, `speciesCode`, `order`, `familyCode`, `familySciName`

### 2. Fetch photo from iNaturalist

```bash
curl -s "https://api.inaturalist.org/v1/taxa?q={SCIENTIFIC_NAME}&rank=species"
```

Use `results[0].default_photo.medium_url` and `attribution`. Prefer Creative Commons licensed photos — flag any "all rights reserved" images.

### 3. Find the target file

Map eBird `order` and `familyCode` to the correct file:
- Order directory: `docs/{order_lowercase}/`
- Family file: look for the `.md` file matching the family (e.g. `familyCode: "strigi1"` → `strigidae.md`)
- If no matching file exists, report it and ask the user

### 4. Look up Japanese name

Search existing entries in the same family file for the Japanese name pattern. If not available, omit it.

### 5. Generate and insert the entry

Format:

```markdown
---

## ChineseName JapaneseName English Name

![ChineseName JapaneseName English Name](photo_url)

(c) credit

**台語名**

◆ **TaiwaneseName romanization**

參考華語鳥類名錄、[eBird 資料](https://ebird.org/species/CODE)
```

- If the user provided a Taiwanese name, use it
- If not, derive one from the Chinese name as a placeholder and note it needs review
- Insert at the end of the target family file (before the final newline)

### 6. Verify

Run `npm run build` to ensure no broken links or formatting issues.
