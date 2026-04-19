# Taigibird Writing Guide Pointer

This file is a thin pointer for Claude-facing workflows.

Canonical project writing and naming standards live in:

- `docs/taigi-language-background.md`
- `docs/species-markdown-template.md`
- `docs/taigi-bird-name-review-agent-spec.md`

Use those files as the primary source of truth.

## Why this file exists

- `.claude/` is where Claude-specific skills look for local guidance.
- `docs/` is tracked and should hold the actual shared standards.
- This avoids maintaining two divergent copies of the same rules.

## Read Order

1. `docs/taigi-language-background.md`
2. `docs/species-markdown-template.md`
3. `docs/taigi-bird-name-review-agent-spec.md`

## Local Reminder

If a Claude skill or note in `.claude/` conflicts with the files above, update the `.claude/` reference and follow the `docs/` version.
