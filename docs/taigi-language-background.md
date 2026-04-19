# Taigi Language Background for Review Work

## Purpose

This document gives the Taigi naming review workflow a language background grounded in project-approved materials, while excluding TPS-specific operational content.

It is meant to improve judgment about:

- idiomatic Taigi usage
- Tâi-lô spelling
- Hanji and romanization alignment
- punctuation and hyphenation conventions
- the difference between attested usage and modern constructed forms

## Source Basis

This background is distilled from:

- `docs/knowledge/臺灣台語羅馬字拼音方案使用手冊.pdf`
- `docs/knowledge/台文書寫.pdf`
- the project's own naming logic in `src/content/docs/index.mdx`
- the project's own structured naming helper data in `src/data/`
- `vendor/taigi-converter` as an implementation reference for phonetic-system normalization
- `https://chhoe.taigi.info/`
- `https://sutian.moe.edu.tw/zh-hant/`
- `docs/dictionary-reference/`

## Core Orientation

The review agent should not treat Taigi naming as simple word-for-word translation from Chinese.

The working assumption is:

- correct Taigi usage has its own lexical history, morphology, and writing conventions
- Chinese labels may be useful reference points, but they are not automatic authorities for Taigi naming
- a name that is graphically close to Chinese may still be weak Taigi if the morphology, reading, or usage logic is poor

## Orthography

## Tâi-lô as the default romanization standard

For this project, Tâi-lô should be treated as the default romanization baseline.

Review implications:

- prefer Tâi-lô consistency unless there is an explicit reason to preserve another historical spelling
- do not mix POJ-style and Tâi-lô-style spellings inside the same recommended form without explanation
- verify that the Hanji and Tâi-lô correspond to the same intended reading

## Romanization consistency

The agent should pay attention to patterns that often reveal inconsistency:

- `oo` versus `o`
- `ts / tsh` versus POJ-style `ch / chh`
- `nn` nasalization handling
- tone-mark placement
- mixed conventions in compounds

If a form appears valid only under another system, the review should say so explicitly instead of silently treating it as standard Tâi-lô.

The `taigi-converter` submodule is useful here because it explicitly normalizes several cross-system differences:

- `ch` to `ts`
- `oa` to `ua`
- `oe` to `ue`
- `eng` to `ing`
- `ek` to `ik`
- superscript nasal markers to `nn`

That makes it useful for detecting whether a candidate is merely written in a mixed or non-project system. It does not, by itself, prove that the form is a good bird name.

## Hyphenation

The MOE handbook treats hyphenation as meaningful, not decorative.

For review purposes:

- hyphenation should reflect lexical structure rather than visual preference
- do not add or remove hyphens casually in recommended names
- if a candidate form looks morphologically segmented, check whether the segmentation is actually defensible in Taigi

For bird names in this project, a fully hyphenated Tâi-lô compound is often acceptable, but the agent should still ask whether the compound structure corresponds to real lexical units rather than a raw character-by-character assembly.

## Punctuation and writing hygiene

The writing guide indicates that punctuation spacing and sentence rhythm matter in formal Taigi writing.

For review work, this means:

- explanation notes should be written as proper prose, not just source labels
- use punctuation consistently
- avoid treating the naming rationale as an afterthought

The important point for this project is not literary style alone; it is that a clear explanation note makes the naming logic auditable.

## Lexical judgment

## Prefer attested Taigi over calques

When native or attested Taiwanese Taigi usage exists, prefer that over a modern Chinese-based calque.

For practical review work, `ChhoeTaigi` and `教育部臺灣台語常用詞辭典` should be treated as the first stop for checking whether a lexical component is actually attested in Taigi.
For bird-name review specifically, already-curated native-name sources should be treated as required evidence checks, not optional reading.

The agent should be skeptical of forms that look like:

- direct semantic copying from Chinese
- transliterations chosen only because the Chinese name has a place-name or person-name component
- mechanically descriptive compounds with no evidence of Taigi lexical naturalness

## Dictionary lookup practice

When a name component is doubtful, the agent should search:

- `ChhoeTaigi` for broader lexical recall and variant forms
- `教育部臺灣台語常用詞辭典` for MOE-backed forms, readings, and usage

This is especially important for:

- body-part words used in descriptive compounds
- color words
- habitat or behavior words
- place-name based modifiers
- candidate Hanji forms with more than one plausible reading

If the evidence question is source-sensitive, online lookup is required rather than optional.

## Local dictionary corpus

The local corpus in `docs/dictionary-reference/` contains raw and semi-processed dictionary materials copied from the taigikeyboard dictionary project.

It is useful for:

- broad lexical triangulation
- variant hunting
- checking whether a component is isolated to one source or repeated across several
- locating older lexicographic support that may not surface immediately through the websites

It should be treated as supporting evidence, not automatic endorsement. A corpus hit helps establish that a form exists somewhere; it does not by itself establish that the form is the best recommendation for a bird name.

## Project naming helper tables

The structured files under `src/data/` are also project reference material. They are self-curated tables for naming support rather than external authority.

These files are especially useful for:

- body-part vocabulary
- color vocabulary
- appearance descriptors
- ecology and life-stage terminology
- person-name transliteration support
- place-name modifiers
- sound-symbolic or vocalization wording

Treat them as internal supporting reference tables that help keep naming components consistent across entries.

They are useful for:

- checking whether a modifier already has a preferred project form
- keeping repeated descriptive components internally consistent
- reducing ad hoc variation across entries
- tracing why two similar species names use the same body-part or color term

They should not, by themselves, override stronger evidence from native-name sources, dictionaries, or cited primary bird-name sources.

## Bird-name source priority

For bird names, the review should distinguish between:

- general lexical evidence
- native bird-name evidence

If a curated native bird-name source exists, it outranks a merely plausible constructed form. In practice, this means sources such as `Hîng guá Tâi-uân Tsiáu-á Miâ` and `台灣野鳥鄉土名` should be checked whenever the review turns on whether a form is genuinely inherited, locally attested, or only modernly constructed.

Local copies and extracted corpora are useful for navigation and triangulation, but they do not replace checking the online primary source when that source is available and the distinction matters.

## Constructed forms are allowed, but must be marked by stronger reasoning

A constructed form is acceptable only when:

- no better attested native alternative is available
- the modifier is semantically clear
- the construction follows established naming logic in the project
- the file explains why this form was chosen

Constructed forms should not be treated as equally strong as attested native names unless the evidence is explicit.

## Register and usage

The writing guide warns against overly Sinicized or awkward constructions.

For naming review, the agent should therefore watch for:

- forms that read like translated labels rather than Taigi expressions
- compounds that are technically interpretable but lexically stiff
- names that may be understandable in writing but are unlikely to function as a living species label

This does not mean all literary or technical forms are invalid. It means the burden of justification is higher when a form feels constructed rather than inherited.

## Hanji and reading

Hanji are not self-validating. A visually plausible Hanji string may still be weak if:

- the reading does not match the intended Tâi-lô
- the chosen characters force an unnatural interpretation
- the form is only graphically elegant but not linguistically grounded

The agent should review Hanji and Tâi-lô together, not separately.

## What the review agent should now assume

After incorporating this background, the review agent should assume:

- correct Taigi usage is evidence-based and system-sensitive
- Tâi-lô consistency matters
- lexical naturalness matters
- explanation notes are part of the reviewable evidence
- multiple recommended names need categorization, not just listing
- system-level parseability is useful evidence, but not sufficient evidence

## Practical effect on bird-name review

This background should make the agent more conservative in the following cases:

- a Chinese-looking form is recommended without a note
- multiple `◆` names are listed without clarifying status
- a place-name or nationality label is used as a species name with only weak support
- the Tâi-lô looks internally inconsistent
- the entry gives references but no reasoning

In those cases, the default outcome should move toward:

- `Accept with revisions`, or
- `Needs stronger evidence`

rather than unconditional acceptance.
