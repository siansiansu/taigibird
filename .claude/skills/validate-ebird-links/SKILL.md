---
name: validate-ebird-links
description: Check all eBird species links in docs/ to find broken, stale, or demoted species codes. Use for periodic link auditing without needing an external spreadsheet.
---

# Validate eBird Links

Scan all Markdown files in `docs/` and verify every eBird species link against the eBird API.

## Steps

### 1. Extract all eBird links

```bash
grep -rn "ebird.org/species/" docs/ --include="*.md"
```

Parse out each `(species_code, file_path, line_number)`.

### 2. Batch-verify against eBird API

For each unique species code, query:

```bash
curl -s "https://api.ebird.org/v2/ref/taxonomy/ebird?species={CODE}&fmt=json"
```

Classify the result:

| API Response | Status | Action Needed |
|-------------|--------|--------------|
| `category: "species"` | Valid | None |
| `category: "issf"` with `reportAs` | Demoted | Update code to `reportAs` value |
| `category: "slash"` with `reportAs` | Demoted | Update code to `reportAs` value |
| `category: "form"` with `reportAs` | Demoted | Update code to `reportAs` value |
| Empty `[]` response | Invalid/retired | Investigate — code may have been retired |

### 3. Check for name drift

For each valid species code, also fetch the Chinese name:

```bash
curl -s "https://api.ebird.org/v2/ref/taxonomy/ebird?species={CODE}&fmt=json&locale=zh"
```

Compare the returned `comName` with the Chinese name in the `##` heading. Flag mismatches.

### 4. Output report

```
## eBird Link Validation Report

### Summary
- Total links checked: X
- Valid (species-level): X
- Demoted (issf/slash/form): X
- Invalid/retired: X
- Name mismatches: X

### Issues Found

#### Demoted Codes
| File | Line | Current Code | Category | Replace With |
|------|------|-------------|----------|-------------|
| ... | ... | ... | issf | ... |

#### Invalid Codes
| File | Line | Code | Notes |
|------|------|------|-------|
| ... | ... | ... | Empty API response |

#### Name Mismatches
| File | Line | Code | In File | eBird Says |
|------|------|------|---------|-----------|
| ... | ... | ... | ... | ... |
```

### 5. Optional: Auto-fix

If the user confirms, apply fixes:
- Replace demoted codes with their `reportAs` species-level codes
- Update mismatched Chinese/English names
- Run `npm run build` to verify
