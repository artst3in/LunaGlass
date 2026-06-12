# Hex Button

Interactive hexagonal button with hold-to-execute behavior.

## Spec

| Property | Value |
|----------|-------|
| Shape | Flat-top hexagon |
| Edge | Trapezoid (inner/outer radius) |
| Stroke | 1.5px default, color varies by state |
| Fill | Transparent default, gradient on hover |
| Hold behavior | Edge-heat animation, CCW from top |

## Sizes

| Name | Diameter | Use |
|------|----------|-----|
| xl | 80px | Panic button |
| lg | 56px | Profile avatar |
| md | 44px | Chat avatar |
| sm | 32px | Send, mic, attach |
| xs | 20px | Navigation |

## Hold-to-Execute Animation

When the user holds the button:

1. Top edge heats up uniformly (dim → bright) over 1/6 of hold duration
2. On completion: device vibrates. Next edge (upper-left) begins heating.
3. Continues CCW: lower-left → bottom → lower-right → upper-right
4. All 6 edges lit = action fires

Release before completion = cancelled. All edges reset.

**Timing:**
- Panic button: 6 × 0.5s = 3 seconds
- Send/Call: 6 × configurable (default 500ms total)

## States

| State | Border | Fill | Effect |
|-------|--------|------|--------|
| Default | `#00FFFF` | transparent | none |
| Hover | `#00FFFF` | radial gradient | subtle glow |
| Holding | animated per edge | none | edge heat + vibration |
| Active | `#00FFFF` full | `rgba(0,255,255,0.1)` | breathing glow |
| Danger | `#FF0000` | `rgba(255,0,0,0.1)` | red glow |
| Disabled | `#1A3A40` | transparent | none |
