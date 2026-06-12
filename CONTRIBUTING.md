# Contributing to LunaGlass

LunaGlass is the design system for Project Aether. Contributions that extend it to new platforms, improve existing specs, or add implementation examples are welcome.

## What to contribute

- **Platform implementations** — SwiftUI, Flutter, Vue, Angular, Svelte adaptations
- **Component specs** — New components following the existing format
- **Geometry helpers** — Additional language ports (Python, Go, C, etc.)
- **Accessibility improvements** — Color contrast analysis, screen reader guidance
- **Bug fixes** — Incorrect values, rendering issues

## What NOT to contribute

- Light mode variants (LunaGlass is dark-only by design)
- Rounded/circle controls (hexagonal is the identity)
- Pointy-top hexagon variants
- Alternative color palettes (the palette is final)

## Format

- Component specs go in `components/` as Markdown with code examples
- Design tokens go in `tokens/` as JSON
- Geometry helpers go in `geometry/` with the language extension
- Reference implementations go in `reference/`

## License

By contributing, you agree your code is released under Apache 2.0.
