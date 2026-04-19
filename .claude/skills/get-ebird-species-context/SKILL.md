---
name: get-ebird-species-context
description: Fetch eBird species taxonomy and multilingual naming context for naming-review work. Use when a bird-name decision needs species code validation, Chinese/Japanese/English name comparison, or taxonomy support. This skill does not provide full prose species descriptions by itself.
argument-hint: <ebird-species-code>
---

# Get eBird Species Context

Fetch species-level context from the eBird API to support Taigi bird-name review.

This skill is for:

- species code verification
- Chinese / Japanese / English name comparison
- scientific name lookup
- order / family lookup
- checking whether a candidate naming explanation aligns with taxonomy

This skill is **not** a full bird-description API.

## Input

Required:

- eBird species code, e.g. `norsho`

## Required Local Setup

Use a local API key only. Do not commit the key into the repository.

Recommended shell setup:

```bash
export EBIRD_API_KEY=...
```

Then use it in commands:

```bash
curl -s -H "X-eBirdApiToken: $EBIRD_API_KEY" "https://api.ebird.org/v2/ref/taxonomy/ebird?species={CODE}&fmt=json"
```

## Core Queries

### 1. English taxonomy

```bash
curl -s -H "X-eBirdApiToken: $EBIRD_API_KEY" \
  "https://api.ebird.org/v2/ref/taxonomy/ebird?species={CODE}&fmt=json"
```

Use this for:

- English common name
- scientific name
- species code
- order
- family

### 2. Chinese name

```bash
curl -s -H "X-eBirdApiToken: $EBIRD_API_KEY" \
  "https://api.ebird.org/v2/ref/taxonomy/ebird?species={CODE}&fmt=json&locale=zh"
```

### 3. Japanese name

```bash
curl -s -H "X-eBirdApiToken: $EBIRD_API_KEY" \
  "https://api.ebird.org/v2/ref/taxonomy/ebird?species={CODE}&fmt=json&locale=ja"
```

## What This Skill Can Reliably Provide

- `speciesCode`
- English common name
- Chinese common name
- Japanese common name
- scientific name
- order
- family
- category

## What This Skill Cannot Reliably Provide

The eBird taxonomy endpoint does **not** return:

- a prose species description
- a field-mark paragraph
- a diagnostic-trait summary
- an explanation of why the species got its common name

So this skill should not pretend that the API itself gives a full species description.

## How to Use It for Naming Review

Use the returned data to support naming work in these ways:

1. verify the species code is correct
2. compare English, Chinese, and Japanese naming patterns
3. check whether a candidate Taigi name may be following Japanese-era continuity
4. confirm order and family when deciding whether a suffix like `鴨`, `雁`, or `秋沙` is functioning as a classification label
5. support feature-based notes when the naming logic depends on known species identity rather than just a local folk name

## Important Limitation

If you need actual field-mark or trait prose, the eBird API alone is insufficient.

For trait-based naming notes, combine eBird API output with:

- the existing project file
- curated native-name sources
- `src/data/`
- dictionary evidence
- direct species materials from eBird or other approved bird references when available

## Output Shape

When using this skill, return a compact summary like:

```text
Species code: norsho
English: Northern Shoveler
Chinese: 琵嘴鴨
Japanese: ハシビロガモ
Scientific: Spatula clypeata
Order: Anseriformes
Family: Anatidae
Naming-use note: useful for comparing cross-language naming patterns, but not a substitute for trait prose or native-name evidence
```
