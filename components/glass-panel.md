# Glass Panel

The primary container in LunaGlass. A frosted, translucent surface that floats above the background.

## Spec

| Property | Value |
|----------|-------|
| Background | `#0D1A1E` (85% opacity with blur) |
| Border | 1px `#1A3A40` |
| Border radius | 12px |
| Padding | 14px |
| Backdrop blur | 12px (Android 12+ / CSS `backdrop-filter`) |
| Box shadow | `0 0 20px rgba(0,255,255,0.08)` |
| Active shadow | `0 0 20px rgba(0,255,255,0.15)` + `inset 0 1px 0 rgba(0,255,255,0.06)` |

## States

| State | Border | Shadow |
|-------|--------|--------|
| Default | `#1A3A40` | `0 0 20px rgba(0,255,255,0.08)` |
| Active/Focus | `#00FFFF` (40% opacity) | Stronger glow |
| Danger | `#FF0000` (40% opacity) | Red glow |
| Disabled | `#1A3A40` (50% opacity) | None |

## React

```jsx
<div style={{
  background: "rgba(13, 26, 30, 0.85)",
  border: "1px solid #1A3A40",
  borderRadius: 12,
  padding: 14,
  backdropFilter: "blur(12px)",
  boxShadow: "0 0 20px rgba(0,255,255,0.08), inset 0 1px 0 rgba(0,255,255,0.06)",
}}>
  {children}
</div>
```

## Compose (Android)

```kotlin
Surface(
    modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 16.dp),
    shape = RoundedCornerShape(12.dp),
    color = Color(0xD90D1A1E),
    border = BorderStroke(1.dp, Color(0xFF1A3A40)),
    shadowElevation = 0.dp,
) {
    Box(modifier = Modifier.padding(14.dp)) {
        content()
    }
}
```

## CSS

```css
.glass-panel {
  background: rgba(13, 26, 30, 0.85);
  border: 1px solid #1A3A40;
  border-radius: 12px;
  padding: 14px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.08),
              inset 0 1px 0 rgba(0, 255, 255, 0.06);
}
```
