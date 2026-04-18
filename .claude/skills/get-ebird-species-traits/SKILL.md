---
name: get-ebird-species-traits
description: Read an eBird species page and extract the Identification traits that can support Taigi naming explanations. Use when a naming note depends on visible field marks, sex differences, habitat cues, or other trait prose not available from the taxonomy API.
argument-hint: <ebird-species-code>
---

# Get eBird Species Traits

Use the eBird species page to extract trait-oriented prose that can support a naming explanation.

This skill complements `get-ebird-species-context`. It does not replace native-name evidence.

## Input

Required:

- eBird species code, e.g. `baitea`

## Source Pattern

Open:

```text
https://ebird.org/species/{CODE}
```

Then find the `Identification` section.

## What This Skill Is For

Use this skill when you need to explain why a feature-based Taigi name is plausible, for example:

- a color-based name
- a body-part based name
- a facial-pattern name
- a sex-specific naming decision
- a species distinction based on a visible field mark

## What To Extract

Extract only short, high-signal trait points relevant to naming, such as:

- face pattern
- bill shape
- head color
- breast or flank pattern
- distinctive white spots or eye marks
- sex differences
- obvious habitat cues if the name depends on them

Do not copy long passages.

## Output Format

Return a compact summary like:

```text
Species code: baitea
Species page: https://ebird.org/species/baitea
Trait notes:
- Male has distinctive green-and-yellow facial pattern.
- Male has spotted pinkish breast.
- Female shows a white spot near the bill base.
Naming-use note:
- useful for explaining a face-pattern or spotted-breast based name
- not evidence for native Taigi usage by itself
```

## Rules

- Treat this as trait support, not native-name authority.
- Use only the parts needed to explain the naming logic.
- Prefer paraphrase over quotation.
- Keep the extracted notes short and review-oriented.
