# Anatidae Review

Target file: `src/content/docs/anseriformes/anatidae.md`

Review basis:

- `docs/taigi-bird-name-review-agent-spec.md`
- `docs/taigi-language-background.md`
- `docs/species-markdown-template.md`
- `https://siaulahjih.github.io/TaiOanChiauA/`
- `https://www.oocities.org/~smewmao/taiwan/twnname.html`
- `https://sutian.moe.edu.tw/zh-hant/`
- `https://chhoe.taigi.info/`
- `https://docs.google.com/spreadsheets/d/1PnZ2V8jMjw9MvGLlXNs05gSz43sigs-tewDdx19YebA/edit?usp=sharing`
- local helper data in `src/data/`

## File-Level Findings

### 1. High: `Philippine Duck` likely collides with an existing folk-name usage

Entry:

- `呂宋鴨 アカノドカルガモ Philippine Duck`

Current recommendation includes:

- `🎯 菲律賓鴨 hui-lu̍t-pin-ah`
- `🎯 呂宋鴨 lū-sòng-ah`

Risk:

- `菲律賓鴨` appears to already be used in `台灣野鳥鄉土名` for another taxonomic target associated with `白眉鴨`, creating a likely naming collision if reused here without explanation.

Recommended action:

- do not keep `菲律賓鴨` as an unexplained `🎯`
- clarify whether `呂宋鴨` is the intended primary recommendation
- add a note explaining the collision risk and source basis

### 2. Medium-High: several entries replace native `-á` style forms with more Sinicized `鴨` forms

Examples:

- `尖尾鴨 tsiam-bué-ah`
- `金翅鴨 kim-tshì-ah`
- `水薸鴨 tsuí-phiô-ah`

Risk:

- curated native-name sources and local reference materials suggest that some entries may already have established `-á`-type folk forms
- promoting the `鴨` forms without explanation weakens the project's stated preference for native names when available

Recommended action:

- check whether each `鴨` form is meant as a modern standardization or a replacement
- if a native `-á` form is retained, distinguish it clearly from secondary normalized forms

### 3. Medium: multiple `🎯` recommendations lack role separation

Affected pattern:

- several entries list two or three `🎯` names with no explanation of whether they are coequal, regional, historical, or fallback forms

Risk:

- readers cannot tell which form is primary
- review evidence becomes opaque
- future diffs become harder to interpret

Recommended action:

- keep one `🎯` where possible
- move preserved alternates to `◯`
- require a `註解` block whenever more than one `🎯` is retained

### 4. Medium: some constructed names are recommended with weak evidence

Example:

- `American Wigeon` currently recommends `美國鴨 bí-kok-ah`

Risk:

- the current note basis is too thin to justify a strong recommendation
- this looks more like a plausible modern construction than an attested native form

Recommended action:

- either strengthen the evidence note
- or downgrade the recommendation status until stronger support is available

### 5. Low: entry formatting is inconsistent and reduces reviewability

Observed issues:

- some entries use list bullets under `台語名`, others do not
- some entries contain only source labels and no real reasoning
- some entries lack an explicit `命名理由` section

Recommended action:

- normalize the whole file to `docs/species-markdown-template.md`

## Entry Notes

### `American Wigeon`

Current concern:

- `美國鴨` is weakly justified and should not be treated as strongly supported without a fuller rationale

### `Philippine Duck`

Current concern:

- `菲律賓鴨` needs collision checking against curated folk-name sources
- `呂宋鴨` may be safer as the primary project label if the evidence is clearer

### `Northern Pintail`

Current concern:

- verify whether the project should foreground `尖尾仔`-type evidence before recommending `尖尾鴨`

### `Green-winged Teal`

Current concern:

- `金翅鴨` and `水薸鴨` should be checked against native `金翅仔` / `水薸á` style evidence and then categorized properly

## Consistency Issues

- the file still follows an older entry pattern rather than the new canonical template
- naming evidence is often implicit rather than explicit
- recommendation strength and evidence strength are not aligned consistently

## Priority Fixes

1. resolve the `Philippine Duck` collision risk
2. separate `🎯` from `◯` consistently
3. add `命名理由` to entries that currently show sources only
4. normalize formatting to the canonical template

## Scope Note

This review was intentionally recorded as a standalone document so that the review outcome can be discussed without automatically rewriting `src/content/docs/anseriformes/anatidae.md`, which currently has existing uncommitted local changes.
