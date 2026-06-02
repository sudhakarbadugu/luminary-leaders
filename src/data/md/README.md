# Source Biographies (Markdown)

This directory contains the **source-of-truth biography data** for all 288 leaders in the luminary-leaders project.

## Structure

Each `.md` file follows a consistent 8-section format:

1. **THE HOOK** — One-line dramatic opening
2. **ORIGIN** — The "Before" / relatability engine
3. **THE FIRE** — Failures, rock-bottom, turning points
4. **THE GRIND** — The invisible years / method
5. **THE TEST** — The breakthrough moment
6. **THE PHILOSOPHY** — Stealable wisdom (with **bolded quotes**)
7. **THE LEGACY** — The footprint
8. **FINAL MOTIVATION** — Closing line

Some files have a `-2.md` variant (32 entries) which contain the longer, more detailed version of the same person's biography.

The file `luminary-leaders-list.md` is a **meta file** (index of all leaders) and is excluded from the JSON conversion.

## Regenerating JSON

Run from the `json/` directory:

```bash
cd src/data/json
node convert-md-to-json.cjs
```

This reads all `.md` files from `../md/` and writes:
- `leaders.json` (143)
- `traders.json` (73)
- `sports.json` (26)
- `cricket.json` (5)
- `scientists.json` (41)
- `index.json` (metadata + 288-entry summary)

## Data Quality

- ✅ 0 empty bios (all 288 entries have content)
- ⚠️ 171 entries have no `born` date in the MD (inherent in terse one-liner summaries)
- ⚠️ Some milestones are auto-extracted from narrative text (years 19xx-20xx) — may include false positives
- ✅ All 288 entries have image paths assigned

To fill missing dates, a future enhancement could fetch from Wikipedia API.
