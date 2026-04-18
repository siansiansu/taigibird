# Taigibird Agent Operating Model

This document consolidates the useful operational logic from `.claude/skills/` into one shared model for agents working on this repository.

It is not the primary naming authority. Instead, it defines how an agent should work.

For normative rules, always defer to:

- `docs/species-markdown-template.md`
- `docs/taigi-bird-name-review-agent-spec.md`
- `docs/taigi-language-background.md`

## Purpose

Use this document to keep Claude-facing skills, Codex workflows, and future automation aligned on:

- how to review species entries
- how to suggest or revise Taigi names
- how to validate eBird data
- how to add new species entries
- how to avoid stale or duplicated logic across tools

## Source Mapping

This operating model was distilled from the following local skills:

- `.claude/skills/taigi-writer/SKILL.md`
- `.claude/skills/validate-ebird-links/SKILL.md`
- `.claude/skills/sync-ebird-taxonomy/SKILL.md`
- `.claude/skills/add-species/SKILL.md`
- `.claude/skills/sync-sheets/SKILL.md`

The skills remain useful workflow prompts, but this file should be treated as the cleaner shared abstraction.

## Core Agent Modes

An agent working on this repository should operate in one of these modes.

### 1. Review Mode

Use when checking an existing entry or family document.

Primary checks:

- entry structure matches `docs/species-markdown-template.md`
- `台語名` section clearly distinguishes `◆`, `◇`, and `△`
- `號名理路` is present and explicit
- every species entry should try to include a naming explanation rather than only a source label
- species-specific eBird links are kept in the heading as `[[eBird](...)]`
- `註解` exists when ambiguity or source sensitivity remains
- Tâi-lô is internally consistent
- no POJ/Tâi-lô mixing unless explicitly justified
- image alt text matches the species heading
- eBird species code is present and valid

When review is source-sensitive, the agent must consult the required online sources described in `docs/taigi-bird-name-review-agent-spec.md`.

Default action:

- if the user is asking for review within an active branch / PR workflow, the agent should normally edit the target file directly rather than writing a separate standalone review document
- create a separate review note only when the user explicitly asks for review-only output or when direct editing would be unsafe

### 2. Name Suggestion Mode

Use when proposing a Taigi name for a species that lacks a settled project entry.

Suggested workflow:

1. Read the canonical specs in `docs/`
2. Check whether a native Taiwanese Taigi folk name already exists
3. Check whether the apparent candidate is only a generic umbrella term
4. If no stable native form exists, check Japanese naming continuity first, then compare Chinese, English, Japanese, morphology, and existing project naming patterns
5. Produce one primary recommendation and, if needed, clearly separated alternates

When the candidate may reflect Japanese-era naming continuity, check that path before reducing it to a Chinese-based explanation.

Expected output shape:

- `◆` for the primary recommendation
- `◇` for accepted alternates
- `△` for generic labels

Do not promote a weakly supported constructed name to `◆` without an explicit rationale.
When the final name depends on visible bird traits, explain those traits directly in the naming note.

### 3. Romanization / Language Check Mode

Use when verifying Tâi-lô, Hanji choices, mixed-script usage, or spelling-system consistency.

Primary checks:

- tone marks are valid
- syllable segmentation and hyphenation are defensible
- spelling matches Tâi-lô rather than POJ when the project requires Tâi-lô
- Hanji and Tâi-lô correspond to the same lexical reading
- mixed-script text follows the project language baseline

Use these as supporting tools:

- `docs/taigi-language-background.md`
- `docs/dictionary-reference/`
- `src/data/`
- `vendor/taigi-converter`
- `https://chhoe.taigi.info/`
- `https://sutian.moe.edu.tw/zh-hant/`

`vendor/taigi-converter` is a technical aid for spelling-system consistency, not a naming authority.

### 4. eBird Validation Mode

Use when checking taxonomic drift, stale codes, or broken species links.

Primary checks:

- every `ebird.org/species/{CODE}` link resolves to a valid species-level record or a demoted record with a `reportAs` replacement
- the file heading matches the currently authoritative eBird Chinese and English names when the project intends to follow eBird for those fields
- code changes are separated from Taigi naming judgments where practical

Required taxonomy references for this mode:

- eBird
- `eBird Taiwan 鳥類名錄 2025.10`
  `https://docs.google.com/spreadsheets/d/1PnZ2V8jMjw9MvGLlXNs05gSz43sigs-tewDdx19YebA/edit?usp=sharing`

Recommended classification buckets:

- valid species code
- demoted code with replacement
- invalid or retired code
- heading/name drift

Practical note:

- the eBird taxonomy API is useful for multilingual names, taxonomy, and species-code validation
- it is not by itself a full species-description API
- if the naming note needs actual trait prose, use eBird API output only as one supporting layer
- the species page `https://ebird.org/species/{speciesCode}`, especially its `Identification` section, can be used as a supporting source for field-mark based naming explanations

### 5. Add Species Mode

Use when creating a new species entry.

Required workflow:

1. Gather species metadata from eBird
2. Gather image candidate and attribution data from iNaturalist
3. Identify the correct target family file
4. Draft the entry using `docs/species-markdown-template.md`
5. Mark any provisional Taigi naming decision clearly rather than presenting it as settled
6. Run build validation before closing the task

Important constraint:

- a newly created entry should not imply that a placeholder Taigi name is already authoritative

### 6. Structured Content Sync Mode

Use when transforming structured data into Markdown.

Primary rules:

- preserve frontmatter exactly
- preserve explanatory prose outside the transformed block
- regenerate only the structured section that is meant to be synchronized
- avoid unintended rewrites of narrative content

This logic is mostly relevant to reference tables rather than species naming, but it remains part of the shared operating model.

## Shared Execution Rules

Regardless of mode, the agent should follow these rules.

### Read Canonical Docs First

Before making naming or formatting decisions, read the relevant `docs/` files first.

If the task depends on project-standard descriptive vocabulary, also check `src/data/`.

### Prefer One Source of Truth

If a local skill, shortcut note, or older summary conflicts with `docs/`, follow `docs/`.

### Separate Decision Types

Do not casually mix these into one change unless the task truly requires it:

- taxonomy corrections
- Taigi naming decisions
- formatting cleanup
- content sync / table regeneration

This keeps diffs reviewable.

### Treat Native-Name Sources as High Priority

When judging whether a name is genuinely native, attested, generic, or modernly constructed, prioritize the project-cited native-name sources and search them directly when needed.

### Check Japanese Naming Continuity

Because many Taiwan bird names passed through the Japanese era, a name that looks non-native is not automatically a modern Chinese-side construction.

When relevant, the agent should check:

- the Japanese bird name shown in the entry
- whether the Taigi form may preserve a Japanese naming layer or Japanese-derived pronunciation
- whether the candidate is better explained through Japanese continuity than through Chinese normalization

### Make Evidence Explicit

Do not leave the naming basis implied. If a recommendation depends on an inference, say so.
If a descriptive component comes from project-curated helper data in `src/data/`, say that it is using project-internal reference support rather than external attestation.
If a name is being kept as a species-level classification name, say that explicitly rather than dismissing it as merely "Chinese-style" or "Sinicized".
If a name is being kept because it preserves Japanese-era naming continuity, say that explicitly too.
If a form is morphologically built from a folk name plus an added classification label, explain that structure explicitly instead of using only broad summary wording.
If a feature-based name depends on visible field marks, explain which field marks support it. eBird API metadata or other eBird species materials may be used as supporting references when available.

### Preserve Reviewability

Prefer small, isolated edits over broad reformats. This is especially important for family-name and genus-name changes, which should remain easy to review as separate decisions.

When edits are already happening on a branch intended for PR review, prefer keeping the reasoning in the edited file through `號名理路` and `註解` rather than creating an additional review artifact.

## What Was Rejected from the Original Skills

Not all skill content should be carried forward unchanged.

The following patterns are intentionally not adopted as authoritative:

- outdated entry formats that omit `號名理路` or put per-species eBird links in repeated `參考資料` sections
- references to the wrong content path when the repository now uses `src/content/docs/`
- build instructions that assume Docusaurus instead of Astro/Starlight
- workflows that treat placeholder Taigi names as if they were already validated recommendations
- workflows that default to standalone review documents when direct file edits are the clearer PR workflow

## Maintenance Rule

When `.claude/skills/` and this operating model drift apart:

1. update the operating model if the workflow change is genuinely project-wide
2. otherwise keep the workflow detail local to the specific skill
3. never let a skill silently redefine the canonical naming or formatting rules

## Minimal Agent Checklist

Before closing a task, the agent should be able to answer:

- Did I follow the canonical `docs/` rules?
- Did I distinguish primary names, alternates, and umbrella terms correctly?
- Did I verify online sources when the decision was source-sensitive?
- Did I keep taxonomy fixes separate from naming judgments where possible?
- Did I preserve a clean diff?
