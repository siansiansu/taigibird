# Species Markdown Template

This template defines the standard Markdown structure for species entries in this project. All species documents should follow this format unless there is a strong, documented reason to deviate.

## Goals

- Keep every species entry structurally consistent.
- Make naming evidence easier to review.
- Separate recommended names, alternate names, and generic umbrella terms.
- Make future diffs smaller and easier to inspect.

## Required Structure

Each species entry should use the following section order:

1. Heading
2. Image
3. Image credit
4. `**台語名**`
5. `**命名理由**`
6. `**參考資料**`
7. `**註解**` (optional)
8. Horizontal rule `---`

## Symbol Rules

Use the symbols below consistently.

- `🎯`: Primary recommended name for this species entry. In principle, keep this to one item. If more than one `🎯` is kept, the note must explain why they are coequal.
- `◯`: Accepted alternate name, regional variant, historical form, or secondary candidate that should be preserved but is not the primary recommendation.
- `✳️`: Generic or umbrella term that can refer to more than one species.

Do not use multiple `🎯` items without explanation. If a name is retained for documentation but is not the main recommendation, use `◯` instead.

## Field Rules

### Heading

Use this format:

```md
## 華語名 日語名 English name
```

### Image

Use standard Markdown image syntax:

```md
![華語名 日語名 English name](IMAGE_URL)
```

### Image credit

Place image credit immediately below the image as plain text.

### `**台語名**`

Always use a list. Even if there is only one name, still use a bullet.

Recommended order:

1. `🎯` primary recommended name
2. `◯` alternate names
3. `✳️` umbrella terms

Preferred format:

```md
- 🎯 **Hanji Tâi-lô**
- ◯ **Hanji Tâi-lô**
- ✳️ Hanji Tâi-lô
```

Guidelines:

- Bold the primary recommended name.
- Prefer one `🎯` per entry.
- Use `◯` for forms that are attested but not selected as the primary recommendation.
- Use `✳️` only for names that genuinely apply to multiple species.

### `**命名理由**`

This section is required. Do not leave the evidence implicit.

State briefly:

- whether the name is a native Taiwanese Taigi folk name, a disambiguated generic name, or a constructed modern name
- why this form is preferred over competing candidates
- whether the form is supported by native-name sources, dictionary evidence, or cross-linguistic comparison

Suggested format:

```md
**命名理由**

- Primary basis: native folk name / disambiguated umbrella term / constructed name.
- Selection reason: brief explanation of why `🎯` is preferred.
- Distinction: explain how this avoids confusion with nearby species if relevant.
```

### `**參考資料**`

This section is required. Use a bullet list.

Suggested order:

1. Native-name sources
2. Dictionary sources
3. Bird taxonomy / species references
4. Project-internal helper data when used
5. Other supporting references

Example:

```md
**參考資料**

- [《Hîng guá Tâi-uân Tsiáu-á Miâ（還我台灣鳥á名）》](https://siaulahjih.github.io/TaiOanChiauA/)
- [台灣野鳥鄉土名](https://www.oocities.org/~smewmao/taiwan/twnname.html)
- [教育部臺灣台語常用詞辭典](https://sutian.moe.edu.tw/zh-hant/)
- [ChhoeTaigi](https://chhoe.taigi.info/)
- [eBird](https://ebird.org/home)
- [eBird Taiwan 鳥類名錄 2025.10](https://docs.google.com/spreadsheets/d/1PnZ2V8jMjw9MvGLlXNs05gSz43sigs-tewDdx19YebA/edit?usp=sharing)
- `src/data/colors.csv` / `src/data/anatomy.csv` / other project helper tables when relevant
```

### `**註解**`

Optional, but required when any of the following are true:

- there is more than one `🎯`
- the entry preserves a historical or regional variant
- a form is controversial or weakly attested
- a constructed name competes with an existing generic name
- there is a possible naming collision with another species

Suggested format:

```md
**註解**

- `Hanji Tâi-lô` is retained because ...
- `Hanji Tâi-lô` is marked `◯` because ...
- The generic term `Hanji Tâi-lô` is not promoted to `🎯` because ...
```

## Copy-Paste Template

```md
## 華語名 日語名 English name

![華語名 日語名 English name](IMAGE_URL)

(c) Photographer Name, license text

**台語名**

- 🎯 **Hanji Tâi-lô**
- ◯ Hanji Tâi-lô
- ✳️ Hanji Tâi-lô

**命名理由**

- Primary basis:
- Selection reason:
- Distinction:

**參考資料**

- [Native-name source](URL)
- [Dictionary source](URL)
- [Bird reference](URL)

**註解**

- Optional note.

---
```

## Review Expectations

Before a species entry is treated as complete, it should satisfy the following:

- The entry uses the standard section order.
- `**台語名**` uses list bullets consistently.
- The role of each candidate name is clear.
- `**命名理由**` is present and non-empty.
- `**參考資料**` lists the sources actually used.
- `**註解**` is present when ambiguity remains.

## Family and Genus Documents

If this template is adapted for family-level or genus-level documents, keep the same logic:

- use one primary recommended classification name where possible
- separate alternates from umbrella labels
- explain the naming basis explicitly
- keep references in their own section

The same symbol rules should apply unless a separate taxonomy-level template is later defined.
