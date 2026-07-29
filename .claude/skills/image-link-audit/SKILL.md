---
name: image-link-audit
description: Audit image URLs in this Taigibird site's bird-family Markdown pages for link health and reuse rights. Use when the user asks to check whether bird entry image links still work, whether image licenses are usable for the site, whether iNaturalist/Open Data image attributions are valid, or when reviewing image copyright/link rot in src/content/docs/**/*.md.
---

# Image Link Audit

## Overview

Audit every bird entry image in `src/content/docs/{order}/{family}.md` for two things: the image URL resolves to an image, and the source license permits use on this site. Report problems first; do not edit files unless the user asks for fixes.

## Scope

- Include bird-family pages under `src/content/docs/*/*.md`.
- Exclude `src/content/docs/references/**` unless the user explicitly asks for reference pages too.
- Each species entry has one Markdown image after the `## ... [[eBird](...)]` heading.
- Treat the line immediately after the image as local attribution context, but verify against the source when possible.

## Workflow

1. Extract species heading, file path, line number, image alt text, image URL, and attribution line.
2. Check link health with `curl -L -I` first. If the host rejects HEAD or returns inconclusive metadata, retry with a small ranged GET.
3. Confirm the final response is successful and image-like: HTTP 200 range, `content-type: image/*`, nonzero length when available.
4. Verify licensing from the source of truth:
   - For `inaturalist-open-data.s3.amazonaws.com` URLs, identify the photo from the URL or nearby attribution and query iNaturalist/photo/taxon/observation APIs or source pages when needed.
   - For other image hosts, inspect the source page or metadata. Do not assume a license from the domain alone.
5. Compare verified license/creator with the local attribution line.
6. Report findings grouped by severity.

## License Rules

Accept only licenses already allowed by the site convention in `src/content/docs/index.mdx`:

- `CC0`
- `CC-BY`
- `CC-BY-NC`

Treat these as failures unless the user explicitly changes policy:

- `all rights reserved`
- missing or unknown license
- license mismatch between source and local attribution
- creator/credit mismatch that could make attribution misleading
- hotlinked image where the source page does not grant reuse rights

## Suggested Extraction

Use a script or one-off command; keep output structured enough to trace each issue back to a file and line.

```python
import glob, re
from pathlib import Path

heading_re = re.compile(r"^##\s+(.+?)\s+\[\[eBird\]\(https://ebird\.org/species/([a-z0-9]+)\)\]")
image_re = re.compile(r"^!\[(.*?)\]\((.*?)\)")

for md in sorted(glob.glob("src/content/docs/*/*.md")):
    if "/references/" in md:
        continue
    lines = Path(md).read_text(encoding="utf-8").splitlines()
    current = None
    for i, line in enumerate(lines, 1):
        if m := heading_re.match(line):
            current = {"title": m.group(1), "code": m.group(2), "file": md, "heading_line": i}
        elif current and (m := image_re.match(line)):
            attribution = lines[i].strip() if i < len(lines) else ""
            print(md, i, current["code"], current["title"], m.group(1), m.group(2), attribution, sep="\t")
            current = None
```

## Report Format

Lead with problems:

- **Broken links**: file:line, species, URL, observed HTTP/error.
- **License failures**: file:line, species, URL, source license, local attribution, reason.
- **Needs verification**: cases where source metadata could not be reached or license is ambiguous.
- **Attribution mismatches**: source creator/license differs from Markdown line.
- **OK count**: total checked and total passing.

Keep the report concise. Include enough evidence for each failure, but avoid dumping successful entries unless the user asks for a full inventory.

## Fixing

When the user asks to fix issues, replace failing images with clearly licensed alternatives. Prefer iNaturalist CC photos using `CC0`, `CC-BY`, or `CC-BY-NC`; update image URL, alt text if needed, and attribution together. Re-run the audit for touched files.
