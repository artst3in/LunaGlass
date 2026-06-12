# LunaGlass

The design system for Project Aether.

Dark-first. Hexagonal. Cyan-on-black. Built for interfaces that glow.

---

## Philosophy

LunaGlass was born from a security app that needed to feel alive in the dark. Every decision — the flat-top hexagons, the pure cyan, the Inter font, the trapezoid edges — was derived from first principles, not borrowed from a template.

The hex shape carries the identity. The font gets out of the way. Light means alive. No light means inactive. That's the entire language.

## Quick Start

Three things define a LunaGlass surface:

```
Background:  #050508
Primary:     #00FFFF
Font:        Inter
```

Everything else follows from these.

## Design Tokens

### Colors

| Token | Hex | Use |
|-------|-----|-----|
| `bg` | `#050508` | Page/screen background |
| `surface` | `#001214` | Card/panel background |
| `panel` | `#001A1E` | Frosted glass panels |
| `border` | `rgba(0,255,255,0.20)` | Borders, dividers — faint cyan hairline |
| `primary` | `#00FFFF` | Primary accent, active states |
| `primary-dim` | `#007A7A` | Inactive primary, subtle borders |
| `text` | `#F0F0F0` | Primary text — neutral off-white (R=G=B) |
| `text-dim` | `#999999` | Secondary text, metadata — neutral grey (R=G=B) |
| `danger` | `#FF0000` | SOS, siren — life-safety only |
| `danger-soft` | `#FF5555` | Low battery, offline, transport down — non-life-threatening |
| `success` | `#00FF00` | Online, connected, confirmed |
| `warning` | `#FF9800` | Caution, away, degraded |
| `info` | `#2196F3` | Initialising, connecting, progress — Material blue (not cyan) |
| `accent` | `#FFD700` | Gold — functional only (pinned notes, shield tier). NOT brand |

All primary colors are pure RGB. No muting. No compromise.

**Rule: R channel = 0** for all background/surface/panel tokens. No red in a cyan palette, even near-black.

**Rule: body text is neutral.** Text and text-dim are pure grey (R=G=B). No cyan tint. No teal. The brand colour belongs in accents and borders, not in the text you read for hours.

### Glass Tokens

| Token | Value | Use |
|-------|-------|-----|
| `glow` | `rgba(0,255,255,0.15)` | Active element glow background |
| `glow-soft` | `rgba(0,255,255,0.08)` | Softer glow |
| `glass-fill` | `rgba(0,26,30,0.85)` | Frosted panel fill |
| `glass-border` | `rgba(0,255,255,0.12)` | Frosted panel border |
| `hex-grid-stroke` | `rgba(0,255,255,0.10)` | Global hex-grid backdrop |
| `scan-line` | `rgba(0,255,255,0.20)` | Crawling scan line |
| `data-rain` | `rgba(0,160,176,0.40)` | Drifting hex particles — muted teal |

### Shield Tier Colors

| Tier | Nodes | Hex | Notes |
|------|-------|-----|-------|
| Bronze | 1 | `#CD7F32` | Classic bronze |
| Silver | 2-8 | `#9AA4AD` | Muted silver |
| Gold | 9 | `#FFD700` | Pure gold |
| Cyan | All | `#00FFFF` | Brand colour — maxed every node |

### Typography

**Font:** Inter (sans-serif, OFL license, ~200KB)

Mathematically derived for dark-background readability. Scored against 4 candidates on 6 criteria (x-height ratio, weight, width efficiency, counter openness, screen design pedigree, Unicode coverage).

| Scale | Size | Weight | Use |
|-------|------|--------|-----|
| Display | 22px | 700 | App titles, hero text |
| Header | 16px | 700 | Section headers |
| Label | 14px | 600 | Component labels, names |
| Body | 13px | 400 | Content, descriptions |
| Secondary | 11px | 400 | Metadata, timestamps |
| Caption | 9px | 400 | Section labels (3px tracking, uppercase) |

### Hexagon Specification

**Orientation:** Flat-top. Everywhere. No exceptions.

**Edge construction:** Each edge is a trapezoid between an inner hex (radius − w/2) and an outer hex (radius + w/2). Corners sit on radial lines from center to vertex. Outer side longer, inner side shorter. No round caps. 120° miter joints at vertices.

| Size | Radius | Use |
|------|--------|-----|
| XL | 80px | Panic button, hero elements |
| LG | 56px | Profile avatars |
| MD | 44px | Chat avatars, status indicators |
| SM | 32px | Action buttons (send, mic, attach) |
| XS | 20px | Navigation icons, inline indicators |

### Components

**Faceted Bubble** — Octagonal chat slab. 45° corner cuts (14dp). Consecutive same-sender messages collapse into one faceted column (run-grouping). Translucent glass fill so the starfield bleeds through. Speech tail mirrors the Comms icon. See `components/faceted-bubble.md`.

**Shield Tier Frame** — Coloured hex frame around avatars. Five tiers: Bronze → Silver → Gold → Cyan. See `components/shield-tier.md`.


**Glass Panel** — `backdrop-blur(12px)`, `border-radius: 12px`, 1px border `glass-border`, fill `glass-fill`. Active panels get cyan glow.

**Status Indicator** — Hex with colored border. Glow = alive. No glow = inactive. Colors: cyan (active), green (online), orange (away), red (danger), border-color (offline).

**Input** — Hex "+" button (left) → text field (center, 80% width, pill shape) → hex action button (right, context-sensitive). Focus state: border turns cyan.

**Navigation** — Row of XS hex icons. Active = cyan fill + glow. Inactive = dim, 40% opacity.

### Visual Effects

| Effect | Priority | Description |
|--------|----------|-------------|
| Breathing Glow | P1 | 3s ease-in-out infinite pulse on active elements |
| Frosted Glass | P1 | backdrop-blur(12px) on panels (Android 12+ / modern browsers) |
| Hex Gradient | P2 | Radial gradient per hex: bright center → dark edge |
| Double Ring | P2 | Inner hex + 3px gap + outer ring. Gap glows when active |
| Edge Heat | P3 | Hold-to-execute: all edges heat simultaneously over 1s, energy-wave burst on complete |
| Hex Grid BG | P3 | Faint 40px hex tessellation behind content |
| Edge Lighting | P4 | Fresnel grazing-angle model: cyan rim from accelerometer tilt. Zero cost when disabled |
| Scan Line | P4 | 1px line sweeps down every 30s, barely visible |
| Hex Assembly | P4 | Elements build from center outward on tab transitions |
| Glass Sheen | P4 | Tilt-reactive highlight sliding across glass surfaces. Accelerometer, reference-counted |
| 3D Perspective | P5 | Pane tilt giving depth impression. Experimental. Behind toggle |
| Data Rain | P5 | 4px hex particles drifting down. Optional. Default off |

## Rules

**DO:**
- Flat-top hexagons everywhere
- Inter font for all text
- Dark backgrounds, cyan accents
- Glow = alive, no glow = inactive
- Trapezoid edges with radial vertex cuts
- Express state through light and color, not shape changes

**DON'T:**
- No circles for interactive controls
- No pointy-top hexagons
- No Material Design or system icons
- No light mode
- No rounded avatars
- No round-capped hex edges

## Reference

- `reference/design_system.jsx` — Interactive React reference card
- `reference/design_system.jpg` — Static render (1200×2200)
- `reference/edge_heat.jsx` — Edge heat animation demo
- `reference/screens.jpg` — Example app screens

## Used By

- **[LunaOS](https://github.com/artst3in/LunaOS)** — Brain
- **[Aegis](https://github.com/artst3in/Aegis)** — Shield

## License

Apache 2.0. Use it anywhere. No restrictions on your project's license.

## Credits

Designed by Aurora under the direction of Artur Tokarczyk.
Part of [Project Aether](https://github.com/artst3in).

Font derivation: mathematically scored Inter as optimal for dark-background mobile UI.
Edge geometry: trapezoid construction from inner/outer hex radii with radial vertex cuts.

---

*dε/dt ≤ 0*
