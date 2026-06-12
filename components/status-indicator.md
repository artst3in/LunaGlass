# Status Indicator

Hex-shaped status badge showing entity state.

## Spec

| Status | Border Color | Glow | Label |
|--------|-------------|------|-------|
| Active | `#00FFFF` | yes (breathing, 3s) | "Active" |
| Online/Success | `#00FF00` | yes (breathing, 3s) | "Online" |
| Away/Warning | `#FF9800` | no | "Away" |
| Offline/Inactive | `#1A3A40` | no | "Offline" |
| Danger/Panic | `#FF0000` | yes (fast pulse, 1s) | "Panic" |

## Double Ring Variant

For avatars and profile indicators:

```
Outer ring (1px) → 3px gap → Inner hex (avatar)
```

The 3px gap between inner and outer rings GLOWS when the entity is active/online. Gap is transparent when inactive.

## React

```jsx
const StatusHex = ({ status, size = 36 }) => {
  const colors = {
    active: "#00FFFF",
    online: "#00FF00",
    away: "#FF9800",
    offline: "#1A3A40",
    danger: "#FF0000",
  };
  const glows = ["active", "online", "danger"];
  const color = colors[status];
  const glow = glows.includes(status);

  return (
    <Hex
      size={size}
      stroke={color}
      fill="#0A1214"
      glow={glow}
    />
  );
};
```
