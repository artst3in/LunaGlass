# Faceted Bubble

The LunaGlass chat message slab.

## Shape

Octagon — a rectangle with 45° corner facets. Not pills, not hexagons. The symmetric cut rhymes with hex avatars/buttons without pretending to be a hexagon (a tall text block can't be one).

**Why 45° and not 60°:** A shallower (hex-parallel 60°) facet reads as a rounded corner — the eye can't distinguish a near-vertical facet from a fillet, making the block look barrel-bloated.

| Token | Value | Notes |
|-------|-------|-------|
| `facet-cut` | 14dp | Corner cut size (both x and y — symmetric) |
| `tail-height` | 13dp | Speech tail protrusion depth |
| `tail-width` | 16dp | Speech tail base width |
| `tail-inset` | 22dp | Inset from nearest corner (must exceed facet-cut) |

## Run Grouping

Consecutive messages from the same sender collapse into one faceted column:

- **First** of run: top facets, no bottom facets, no tail
- **Middle** of run: plain rectangle, seamless butt joint (1px border overlap = hairline divider)
- **Last** of run: bottom facets + speech tail
- **Standalone**: all four facets + tail

A run of N messages reads as a single slab capped by one tail, not N separate bubbles.

## Fill

Translucent glass — the starfield bleeds through. Uses `glass-fill` (85% opacity #001A1E).

## Tail Side

- Outgoing (your messages): bottom-right
- Incoming: bottom-left

Mirrors the Comms tab icon's tail.
