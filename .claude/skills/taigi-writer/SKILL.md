---
name: taigi-writer
description: Assist with writing and editing Taigi (台語) bird name entries. Provides romanization guidance, name suggestions, and proofreading based on 台文通訊BONG報 corpus conventions.
argument-hint: [command] [species-or-text] — commands: name (suggest names), review (proofread entry), romanize (add Tâi-lô), edit (rewrite in Taigi style)
---

# Taigi Bird Name Writing Assistant

A writing assistant trained on 1,942 articles from 台文通訊BONG報, specialized for the taigibird project.

## Input

```
$ARGUMENTS
```

## Style Guide

Before any operation, read the style guide:

```
.claude/taigi-writing-guide.md
```

This contains the complete reference for:
- Tâi-lô romanization system and tone marks
- 漢羅混寫 rules (which words use romanization vs Han characters)
- Bird name vocabulary (colors, body parts, habitats, sizes)
- Naming conventions and composition patterns
- Entry format template

## Commands

### `name <chinese-bird-name>` — Suggest Taigi Names

1. Read the style guide (`.claude/taigi-writing-guide.md`)
2. Analyze the Chinese name's components (color, body part, habitat, behavior)
3. Look up existing similar entries in `src/content/docs/` for naming patterns
4. Search the corpus at `/Users/alexsu/Workspace/taigi-hanlo-converter/data/corpus/` for any mentions of related birds or relevant Taigi vocabulary
5. Suggest 2-3 candidate Taigi names with Tâi-lô romanization:
   - One direct translation from Chinese components
   - One based on the bird's characteristics or behavior
   - One based on existing Taigi folk names (if found in corpus)
6. For each suggestion, explain the etymology and composition
7. Mark the recommended name with 🎯 and alternatives with ✳️

### `review <file-path-or-species>` — Proofread a Species Entry

1. Read the style guide
2. Read the target entry (file path or search for species in `src/content/docs/`)
3. Check against these criteria:
   - Tâi-lô romanization correctness (tone marks, spelling)
   - Consistent use of Tâi-lô (not mixing with POJ)
   - Name composition follows the [Size/Color/Geographic] + [Feature] + [Category] pattern
   - Entry format matches the template in CLAUDE.md
   - Image alt text matches `##` heading
   - eBird link present and uses correct species code
   - `臺灣` (not `台灣`) in species names
   - `鸕鷀` (not `鸕鶿`), `杓鷸` (not `勺鷸`)
4. Report issues and suggest corrections

### `romanize <taigi-text>` — Add Tâi-lô Romanization

1. Read the style guide
2. For the given Taigi text (Han characters), provide Tâi-lô romanization
3. Follow the 漢羅混寫 rules: function words in romanization, content words in Han characters
4. Use proper tone marks and hyphenation
5. Search the corpus for usage examples if uncertain about pronunciation

### `edit <text-or-instruction>` — Write or Rewrite in Taigi Style

1. Read the style guide
2. Apply 漢羅混寫 conventions from the corpus:
   - Function words (ê, kap, m̄, beh, leh, etc.) in Tâi-lô
   - Content words in Han characters
   - Natural mixing without strict boundaries
3. Search corpus files at `/Users/alexsu/Workspace/taigi-hanlo-converter/data/corpus/` for similar expressions or vocabulary when needed
4. Output the text in proper 漢羅混寫 format with Tâi-lô romanization

### No command — General Taigi Writing Help

If no specific command is given, interpret the user's intent:
- If they provide a bird name → run `name`
- If they provide a file path → run `review`
- If they provide Taigi text → run `edit` or `romanize`
- Otherwise, answer their question using the style guide and corpus as reference

## Corpus Reference

When uncertain about vocabulary, expressions, or romanization:

1. Search `/Users/alexsu/Workspace/taigi-hanlo-converter/data/corpus/` for relevant terms
2. The corpus uses both POJ and Tâi-lô — always convert to Tâi-lô for output
3. The processed training data at `/Users/alexsu/Workspace/taigi-hanlo-converter/data/processed/` has token-level HAN/LO labels that can help identify romanization patterns

## Key Romanization References

Common conversions when reading corpus (POJ → Tâi-lô):
- ch → ts, chh → tsh
- oa → ua, oe → ue
- ek → ik
- iⁿ → inn, oaⁿ → uann

## Output Format

Always output Taigi text with:
- Proper Tâi-lô tone marks (á, à, â, ā, a̍, a̋)
- Hyphens connecting multi-syllable romanized words: `niau-thâu-tsiáu`
- No space between Han characters and adjacent romanization
- Clear marking of 🎯 (recommended) vs ✳️ (alternative) names
