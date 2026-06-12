# Input

Text input field with hex action buttons.

## Layout

```
┌───────────────────────────────────────┐
│ ⬡+  │  Message...              │ ⬡→  │
└───────────────────────────────────────┘
```

Three elements. Nothing else.

| Element | Position | Size | Function |
|---------|----------|------|----------|
| Action hex | Left | SM (32px) | Opens action drawer |
| Text field | Center | 80% width | Input, pill shape |
| Submit hex | Right | SM (32px) | Context-sensitive (send/mic/search) |

## Text Field Spec

| Property | Value |
|----------|-------|
| Background | `#050508` |
| Border | 1px `#1A3A40` |
| Border radius | pill (9999px) |
| Padding | 8px 14px |
| Font | Inter 13px/400 |
| Placeholder color | `#6A8A8A` |
| Focus border | `#00FFFF` (40% opacity) |
| Text color | `#E0F0F0` |

## Action Drawer

Opens from the + button. Slides up from bottom. Contains hex icons in a row:

```
  ⬡📷    ⬡🖼    ⬡📎    ⬡📍
 Camera  Gallery  File  Location
```

Tap outside to dismiss.
