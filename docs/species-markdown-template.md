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
4. Intro paragraph
5. `**台語名**`
6. `**號名理路**`
7. `**註解**` (optional)
8. Horizontal rule `---`

## Symbol Rules

Use the symbols below consistently.

- `◆`: Primary recommended name for this species entry. In principle, keep this to one item. If more than one `◆` is kept, the note must explain why they are coequal.
- `◇`: Accepted alternate name, regional variant, historical form, or secondary candidate that should be preserved but is not the primary recommendation.
- △: Generic or umbrella term that can refer to more than one species.

Do not use multiple `◆` items without explanation. If a name is retained for documentation but is not the main recommendation, use `◇` instead.

## Intro Paragraph

Every document should begin with one short intro paragraph near the top of the file.

This paragraph should do two jobs at once:

- state what this page covers
- briefly explain the symbol system when useful

Recommended pattern:

```md
這頁收錄這个分類或物種 ê 台語號名，並列對照相關語言資料做命名討論參考。`◆` 表示建議號名，`◇` 表示其他號名，△ 表示通稱。
```

Keep this paragraph short. Avoid splitting content scope and symbol explanation into two separate introductory notes unless there is a strong reason.

## Field Rules

### Heading

Use this format:

```md
## 華語名 日語名 English name [[eBird](E_BIRD_URL)]
```

### Image

Use standard Markdown image syntax:

```md
![華語名 日語名 English name](IMAGE_URL)
```

### Image credit

Place image credit immediately below the image as plain text.

### Intro paragraph

Place one short intro paragraph after the frontmatter and before the first species or subsection.

Guidelines:

- explain what material the page collects
- mention symbol usage once if the page uses `◆` / `◇` / △
- avoid repeating the same idea in multiple paragraphs
- keep it shorter than a normal section body

### `**台語名**`

Always use a list. Even if there is only one name, still use a bullet.

Recommended order:

1. `◆` primary recommended name
2. `◇` alternate names
3. △ umbrella terms

Preferred format:

```md
- ◆ **Hanji Tâi-lô**
- ◇ **Hanji Tâi-lô**
- △ Hanji Tâi-lô
```

Guidelines:

- Bold the primary recommended name.
- Prefer one `◆` per entry.
- Use `◇` for forms that are attested but not selected as the primary recommendation.
- Use △ only for names that genuinely apply to multiple species.

### `**號名理路**`

This section is required. Do not leave the evidence implicit.
As a project rule, every species entry should try to include a naming explanation, not just a bare source list.

State briefly:

- whether the name is a native Taiwanese Taigi folk name, a disambiguated generic name, or a constructed modern name
- why this form is preferred over competing candidates
- whether the form is supported by native-name sources, dictionary evidence, or cross-linguistic comparison
- how the form is morphologically built when that structure matters to the naming decision
- which visible or taxonomically relevant feature supports the name when the form is feature-based

Suggested format:

```md
**號名理路**

- Primary basis: native folk name / disambiguated umbrella term / constructed name.
- Selection reason: brief explanation of why `◆` is preferred.
- Distinction: explain how this avoids confusion with nearby species if relevant.
- Component breakdown: explain how the name is built if it includes an added classification label or descriptive compound.
- Feature basis: explain which trait, field mark, or species-level distinction supports the name when relevant.
```

### eBird link

Every species heading should include its species-specific eBird link.

Example:

```md
## 華語名 日語名 English name [[eBird](https://ebird.org/species/example)]
```

Do not add a separate `**參考資料**` section just to repeat `eBird`.

Project-wide shared references belong in `index.mdx`. Put source-specific evidence in `**號名理路**` or `**註解**` when needed.

### `**註解**`

Optional, but required when any of the following are true:

- there is more than one `◆`
- the entry preserves a historical or regional variant
- a form is controversial or weakly attested
- a constructed name competes with an existing generic name
- there is a possible naming collision with another species

Suggested format:

```md
**註解**

- `Hanji Tâi-lô` is retained because ...
- `Hanji Tâi-lô` is marked `◇` because ...
- The generic term `Hanji Tâi-lô` is not promoted to `◆` because ...
```

## Copy-Paste Template

```md
這頁收錄這个分類或物種 ê 台語號名，並列對照相關語言資料做命名討論參考。`◆` 表示建議號名，`◇` 表示其他號名，△ 表示通稱。

## 華語名 日語名 English name [[eBird](E_BIRD_URL)]

![華語名 日語名 English name](IMAGE_URL)

(c) Photographer Name, license text

**台語名**

- ◆ **Hanji Tâi-lô**
- ◇ Hanji Tâi-lô
- △ Hanji Tâi-lô

**號名理路**

- Primary basis:
- Selection reason:
- Distinction:

**註解**

- Optional note.

---
```

## Review Expectations

Before a species entry is treated as complete, it should satisfy the following:

- The entry uses the standard section order.
- `**台語名**` uses list bullets consistently.
- The role of each candidate name is clear.
- `**號名理路**` is present and non-empty.
- `**註解**` is present when ambiguity remains.

## Family and Genus Documents

If this template is adapted for family-level or genus-level documents, keep the same logic:

- use one primary recommended classification name where possible
- separate alternates from umbrella labels
- explain the naming basis explicitly
- keep references in their own section

The same symbol rules should apply unless a separate taxonomy-level template is later defined.
