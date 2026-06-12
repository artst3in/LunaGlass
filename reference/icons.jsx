import { useState } from "react";

const S = 24; // viewport size
const SW = 1.8; // stroke width

// All icons as SVG path data — hex-angular geometry, no circles
const icons = {
  // Navigation
  chats: {
    label: "Chats",
    paths: [
      // Clean angular chat bubble with hex tail
      { d: "M3,4 L21,4 L21,16 L10,16 L6,21 L6,16 L3,16 Z", fill: false },
    ],
  },
  radar: {
    label: "Radar",
    paths: [
      // Full compass needle — fills viewport
      { d: "M12,3 L17,12 L12,21 L7,12 Z", fill: false },
      // North half filled
      { d: "M12,3 L17,12 L7,12 Z", fill: true },
      // N carved in negative space
      { d: "M10.5,10 L10.5,7 L13.5,10 L13.5,7", fill: false, dark: true },
    ],
  },
  panic: {
    label: "Panic",
    paths: [
      // Flat-top hex
      { d: "M22,12 L17,20.7 L7,20.7 L2,12 L7,3.3 L17,3.3 Z", fill: false },
      // Bold exclamation — wider bar + bigger dot
      { d: "M10.5,5 L13.5,5 L13,14.5 L11,14.5 Z", fill: true },
      { d: "M10.5,16.5 L13.5,16.5 L13.5,19 L10.5,19 Z", fill: true },
    ],
  },
  security: {
    label: "Security",
    paths: [
      // Angular shield shape (pointed bottom, flat top)
      { d: "M4,3 L20,3 L20,13 L12,21 L4,13 Z", fill: false },
      // Checkmark inside
      { d: "M8,11 L11,14 L16,8", fill: false },
    ],
  },
  settings: {
    label: "Settings",
    paths: [
      // Clean symmetric gear — 6 teeth
      { d: "M10,2 L14,2 L14,5 L17,6 L19,3.5 L21.5,6 L19,8 L20,11 L23,11 L23,13 L20,13 L19,16 L21.5,18 L19,20.5 L17,18 L14,19 L14,22 L10,22 L10,19 L7,18 L5,20.5 L2.5,18 L5,16 L4,13 L1,13 L1,11 L4,11 L5,8 L2.5,6 L5,3.5 L7,6 L10,5 Z", fill: false },
      // Center hex
      { d: "M15,12 L13.5,14.6 L10.5,14.6 L9,12 L10.5,9.4 L13.5,9.4 Z", fill: false },
    ],
  },

  // Compose bar
  mic: {
    label: "Mic",
    paths: [
      // Hex-shaped microphone
      { d: "M10,4 L14,4 L15,6 L15,13 L14,15 L10,15 L9,13 L9,6 Z", fill: false },
      { d: "M7,11 L7,14 L10,17 L14,17 L17,14 L17,11", fill: false },
      { d: "M12,17 L12,21", fill: false },
      { d: "M9,21 L15,21", fill: false },
    ],
  },
  send: {
    label: "Send",
    paths: [
      // Arrow/chevron pointing right — angular
      { d: "M5,3 L20,12 L5,21 L8,12 Z", fill: false },
    ],
  },
  plus: {
    label: "Plus",
    paths: [
      { d: "M12,5 L12,19", fill: false },
      { d: "M5,12 L19,12", fill: false },
    ],
  },
  camera: {
    label: "Camera",
    paths: [
      // Hex-shaped camera body
      { d: "M3,8 L7,6 L9,6 L11,4 L13,4 L15,6 L17,6 L21,8 L21,18 L3,18 Z", fill: false },
      // Hex lens
      { d: "M12,9 L15,11 L15,14 L12,16 L9,14 L9,11 Z", fill: false },
    ],
  },
  gallery: {
    label: "Gallery",
    paths: [
      { d: "M3,5 L21,5 L21,19 L3,19 Z", fill: false },
      { d: "M3,16 L8,11 L13,16 L16,13 L21,18", fill: false },
      { d: "M16,8 L17.5,9 L17.5,10.5 L16,11.5 L14.5,10.5 L14.5,9 Z", fill: true },
    ],
  },
  file: {
    label: "File",
    paths: [
      { d: "M6,2 L15,2 L20,7 L20,22 L6,22 Z", fill: false },
      { d: "M15,2 L15,7 L20,7", fill: false },
    ],
  },
  location: {
    label: "Location",
    paths: [
      // Hex pin
      { d: "M12,2 L17,5 L17,11 L12,22 L7,11 L7,5 Z", fill: false },
      { d: "M12,6 L14,7.5 L14,9.5 L12,11 L10,9.5 L10,7.5 Z", fill: true },
    ],
  },

  // Calls
  phone: {
    label: "Phone",
    paths: [
      { d: "M5,3 L9,3 L11,8 L9,10 L9,11 Q12,15 14,14 L15,12 L20,14 L20,19 Q19,22 15,21 Q6,18 3,9 Q2,5 5,3 Z", fill: false },
    ],
  },
  video: {
    label: "Video",
    paths: [
      { d: "M2,7 L15,7 L15,17 L2,17 Z", fill: false },
      { d: "M16,9 L22,6 L22,18 L16,15 Z", fill: false },
    ],
  },

  // Actions
  search: {
    label: "Search",
    paths: [
      // Flat-top hex lens
      { d: "M16,9 L13.5,13.3 L8.5,13.3 L6,9 L8.5,4.7 L13.5,4.7 Z", fill: false },
      // Handle
      { d: "M14,13.5 L20,19.5", fill: false },
    ],
  },
  edit: {
    label: "Edit",
    paths: [
      { d: "M16,3 L21,8 L8,21 L3,21 L3,16 Z", fill: false },
      { d: "M14,5 L19,10", fill: false },
    ],
  },
  trash: {
    label: "Delete",
    paths: [
      { d: "M5,6 L19,6", fill: false },
      { d: "M10,3 L14,3", fill: false },
      { d: "M7,6 L7,20 L17,20 L17,6", fill: false },
      { d: "M10,9 L10,17", fill: false },
      { d: "M14,9 L14,17", fill: false },
    ],
  },
  pin: {
    label: "Pin",
    paths: [
      { d: "M12,2 L14,8 L20,10 L15,14 L16,21 L12,17 L8,21 L9,14 L4,10 L10,8 Z", fill: false },
    ],
  },
  mute: {
    label: "Mute",
    paths: [
      // Speaker with X
      { d: "M3,9 L7,9 L12,4 L12,20 L7,15 L3,15 Z", fill: false },
      { d: "M17,9 L22,14", fill: false },
      { d: "M22,9 L17,14", fill: false },
    ],
  },
  reply: {
    label: "Reply",
    paths: [
      { d: "M10,5 L3,12 L10,19", fill: false },
      { d: "M3,12 L15,12 Q21,12 21,18", fill: false },
    ],
  },
  close: {
    label: "Close",
    paths: [
      { d: "M6,6 L18,18", fill: false },
      { d: "M18,6 L6,18", fill: false },
    ],
  },
  back: {
    label: "Back",
    paths: [
      { d: "M15,4 L7,12 L15,20", fill: false },
    ],
  },

  // Remote commands
  lock: {
    label: "Lock",
    paths: [
      { d: "M6,11 L18,11 L18,21 L6,21 Z", fill: false },
      { d: "M8,11 L8,7 Q12,3 16,7 L16,11", fill: false },
      { d: "M12,14 L12,18", fill: false },
    ],
  },
  siren: {
    label: "Siren",
    paths: [
      // Bell shape angular
      { d: "M7,14 L7,9 L12,4 L17,9 L17,14 L19,17 L5,17 Z", fill: false },
      { d: "M10,17 Q12,21 14,17", fill: false },
      // Sound waves
      { d: "M2,8 L4,10", fill: false },
      { d: "M22,8 L20,10", fill: false },
      { d: "M1,12 L3,12", fill: false },
      { d: "M21,12 L23,12", fill: false },
    ],
  },
  wipe: {
    label: "Wipe",
    paths: [
      // Phone with X
      { d: "M7,2 L17,2 L17,22 L7,22 Z", fill: false },
      { d: "M10,8 L14,14", fill: false },
      { d: "M14,8 L10,14", fill: false },
      { d: "M10,19 L14,19", fill: false },
    ],
  },

  // Status
  burn: {
    label: "Burn",
    paths: [
      // Outer flame — two peaks
      { d: "M9,7 L11,10 L14,2 L18,10 L18,16 L15,21 L9,21 L6,16 L6,12 Z", fill: false },
      // Inner flame — scaled 45%, same shape
      { d: "M10.7,12.8 L11.6,14.2 L12.9,10.6 L14.7,14.2 L14.7,16.9 L13.3,19.1 L10.7,19.1 L9.3,16.9 L9.3,15.1 Z", fill: true },
    ],
  },
  notes: {
    label: "Notes",
    paths: [
      // Angular page
      { d: "M6,2 L15,2 L20,7 L20,22 L6,22 Z", fill: false },
      { d: "M15,2 L15,7 L20,7", fill: false },
      // Small hex lock on the page
      { d: "M10,13 L14,13 L14,18 L10,18 Z", fill: false },
      { d: "M11,13 L11,11.5 Q12,10 13,11.5 L13,13", fill: false },
    ],
  },
  online: {
    label: "Online",
    paths: [
      // Flat-top filled hex
      { d: "M20,12 L16,18.9 L8,18.9 L4,12 L8,5.1 L16,5.1 Z", fill: true },
    ],
  },
  offline: {
    label: "Offline",
    paths: [
      // Flat-top outline hex
      { d: "M20,12 L16,18.9 L8,18.9 L4,12 L8,5.1 L16,5.1 Z", fill: false },
    ],
  },
  battery: {
    label: "Battery",
    paths: [
      { d: "M7,4 L17,4 L17,22 L7,22 Z", fill: false },
      { d: "M10,2 L14,2 L14,4 L10,4 Z", fill: true },
      { d: "M8,14 L16,14 L16,21 L8,21 Z", fill: true },
    ],
  },

  // Hearts — Zelda fill system (TL → BL → BR → TR)
  // 45° upper externals. Four quadrants split at x=12, y=11.
  heart_empty: {
    label: "Heart 0/4",
    paths: [
      { d: "M12,7 L8,3 L4,3 L1,6 L1,11 L12,22 L23,11 L23,6 L20,3 L16,3 Z", fill: false },
    ],
  },
  heart_quarter: {
    label: "Heart 1/4",
    paths: [
      // TL quadrant filled
      { d: "M12,7 L8,3 L4,3 L1,6 L1,11 L12,11 Z", fill: true },
      { d: "M12,7 L8,3 L4,3 L1,6 L1,11 L12,22 L23,11 L23,6 L20,3 L16,3 Z", fill: false },
    ],
  },
  heart_half: {
    label: "Heart 2/4",
    paths: [
      // TL + BL quadrants filled
      { d: "M12,7 L8,3 L4,3 L1,6 L1,11 L12,11 Z", fill: true },
      { d: "M1,11 L12,22 L12,11 Z", fill: true },
      { d: "M12,7 L8,3 L4,3 L1,6 L1,11 L12,22 L23,11 L23,6 L20,3 L16,3 Z", fill: false },
    ],
  },
  heart_three_quarter: {
    label: "Heart 3/4",
    paths: [
      // TL + BL + BR quadrants filled
      { d: "M12,7 L8,3 L4,3 L1,6 L1,11 L12,11 Z", fill: true },
      { d: "M1,11 L12,22 L12,11 Z", fill: true },
      { d: "M23,11 L12,22 L12,11 Z", fill: true },
      { d: "M12,7 L8,3 L4,3 L1,6 L1,11 L12,22 L23,11 L23,6 L20,3 L16,3 Z", fill: false },
    ],
  },
  heart_full: {
    label: "Heart 4/4",
    paths: [
      { d: "M12,7 L8,3 L4,3 L1,6 L1,11 L12,22 L23,11 L23,6 L20,3 L16,3 Z", fill: true },
    ],
  },
};

function IconCard({ id, icon, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: selected ? "#0D1A1E" : "#0A1214",
        border: `1px solid ${selected ? "#00FFFF" : "#1A3A40"}`,
        borderRadius: 10,
        padding: 8,
        cursor: "pointer",
        textAlign: "center",
        transition: "all 0.15s",
      }}
    >
      <svg width={40} height={40} viewBox={`0 0 ${S} ${S}`}>
        {icon.paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill={p.fill ? (p.dark ? "#050508" : "#00FFFF") : "none"}
            stroke={p.fill ? "none" : (p.dark ? "#050508" : "#00FFFF")}
            strokeWidth={p.dark ? SW * 0.8 : SW}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <div style={{ fontSize: 9, color: "#6A8A8A", marginTop: 2 }}>
        {icon.label}
      </div>
    </div>
  );
}

export default function LunaGlassIcons() {
  const [selected, setSelected] = useState(null);

  const categories = {
    "Navigation": ["chats", "radar", "panic", "security", "settings"],
    "Compose": ["plus", "send", "mic", "camera", "gallery", "file", "location"],
    "Calls": ["phone", "video"],
    "Actions": ["search", "edit", "trash", "pin", "mute", "reply", "close", "back", "notes", "burn"],
    "Remote": ["lock", "siren", "wipe"],
    "Status": ["online", "offline", "battery"],
    "Hearts": ["heart_empty", "heart_quarter", "heart_half", "heart_three_quarter", "heart_full"],
  };

  return (
    <div style={{
      background: "#050508",
      minHeight: "100vh",
      padding: 16,
      fontFamily: "'Inter', sans-serif",
      color: "#E0F0F0",
    }}>
      <h2 style={{ color: "#00FFFF", fontSize: 16, marginBottom: 4 }}>
        LunaGlass Icon Set
      </h2>
      <p style={{ color: "#6A8A8A", fontSize: 11, marginBottom: 16 }}>
        Angular geometry. No circles. Hex-inspired shapes. {Object.keys(icons).length} icons.
      </p>

      {Object.entries(categories).map(([cat, ids]) => (
        <div key={cat} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 9, color: "#6A8A8A", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
            {cat}
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 8,
          }}>
            {ids.map(id => (
              <IconCard
                key={id}
                id={id}
                icon={icons[id]}
                selected={selected === id}
                onClick={() => setSelected(id)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Large preview */}
      {selected && (
        <div style={{
          background: "#0A1214",
          border: "1px solid #1A3A40",
          borderRadius: 12,
          padding: 20,
          marginTop: 16,
          textAlign: "center",
        }}>
          <svg width={120} height={120} viewBox={`0 0 ${S} ${S}`}>
            {icons[selected].paths.map((p, i) => (
              <path
                key={i}
                d={p.d}
                fill={p.fill ? (p.dark ? "#050508" : "#00FFFF") : "none"}
                stroke={p.fill ? "none" : (p.dark ? "#050508" : "#00FFFF")}
                strokeWidth={p.dark ? SW * 0.5 : SW * 0.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </svg>
          <div style={{ color: "#00FFFF", fontSize: 14, marginTop: 8 }}>
            {icons[selected].label}
          </div>
        </div>
      )}
    </div>
  );
}
