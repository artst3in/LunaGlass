import { useState } from "react";

const C = {
  bg: "#050508", surface: "#0a1214", panel: "#0d1a1e", border: "#1a3a40",
  cyan: "#00FFFF", cyanDim: "#007a7a", text: "#e0f0f0", textDim: "#6a8a8a",
  red: "#e53935", green: "#4caf50", orange: "#ff9800",
  cyanAlpha10: "rgba(0,255,255,0.1)", cyanAlpha20: "rgba(0,255,255,0.2)",
};


/* ── LunaGlass Icon Paths ── */
const ICONS = {
  settings: [{ d: "M10,2 L14,2 L14,5 L17,6 L19,3.5 L21.5,6 L19,8 L20,11 L23,11 L23,13 L20,13 L19,16 L21.5,18 L19,20.5 L17,18 L14,19 L14,22 L10,22 L10,19 L7,18 L5,20.5 L2.5,18 L5,16 L4,13 L1,13 L1,11 L4,11 L5,8 L2.5,6 L5,3.5 L7,6 L10,5 Z" },{ d: "M16,12 L13.5,16.3 L8.5,16.3 L6,12 L8.5,7.7 L13.5,7.7 Z" }],
  security: [{ d: "M4,3 L20,3 L20,13 L12,21 L4,13 Z" },{ d: "M8,12 L11,15 L17,8" }],
  panic: [{ d: "M22,12 L17,20.7 L7,20.7 L2,12 L7,3.3 L17,3.3 Z" },{ d: "M12,7 L12,14", w: 2.5 },{ d: "M12,17 L12,17.5", w: 2.5 }],
  comms: [{ d: "M3,6 L21,6 L21,16 L14,16 L10,20 L10,16 L3,16 Z" },{ d: "M7,9.5 L17,9.5" },{ d: "M7,12.5 L14,12.5" }],
  radar: [{ d: "M12,3 L17,12 L12,21 L7,12 Z" },{ d: "M12,3 L17,12 L12,12 L7,12 Z", fill: true }],
  phone: [{ d: "M5,3 L8,3 L10,8 L8,10 Q12,14 14,16 L16,14 L21,16 L21,19 Q21,21 19,21 Q7,21 3,7 Q3,5 5,3 Z" }],
  video: [{ d: "M2,7 L15,7 L15,17 L2,17 Z" },{ d: "M16,9 L22,6 L22,18 L16,15 Z" }],
  search: [{ d: "M16,9 L13.5,13.3 L8.5,13.3 L6,9 L8.5,4.7 L13.5,4.7 Z" },{ d: "M14,13 L19,19" }],
  back: [{ d: "M15,4 L7,12 L15,20" }],
  close: [{ d: "M6,6 L18,18" },{ d: "M18,6 L6,18" }],
  more: [{ d: "M12,6 L12,6.5" },{ d: "M12,11.5 L12,12.5" },{ d: "M12,17.5 L12,18" }],
  burn: [{ d: "M9,7 L11,10 L14,2 L18,10 L18,16 L15,21 L9,21 L6,16 L6,12 Z" },{ d: "M10.7,12.8 L11.6,14.2 L12.9,10.6 L14.7,14.2 L14.7,16.9 L13.3,19.1 L10.7,19.1 L9.3,16.9 L9.3,15.1 Z", fill: true }],
  plus: [{ d: "M12,4 L12,20" },{ d: "M4,12 L20,12" }],
};

const Icon = ({ name, size = 24, color = C.cyan }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {(ICONS[name] || []).map((p, i) => (
      <path key={i} d={p.d} fill={p.fill ? color : "none"} strokeWidth={p.w || 1.8} />
    ))}
  </svg>
);

/* ── Hex (reused from design_system.jsx) ── */
const Hex = ({ size = 40, fill = "transparent", stroke = C.cyan, glow, children, style = {}, onClick }) => {
  const r = size / 2;
  const h = r * 0.8660254;
  const v = [[r+r,r],[r+r/2,r+h],[r-r/2,r+h],[r-r,r],[r-r/2,r-h],[r+r/2,r-h]];
  const ei = [[4,5],[3,4],[2,3],[1,2],[0,1],[5,0]];
  const rO = r + 1.2, rI = r - 1.2;
  return (
    <div onClick={onClick} style={{ position: "relative", width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: onClick ? "pointer" : "default", ...style }}>
      {glow && <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,255,0.2) 0%, transparent 70%)", filter: "blur(6px)" }} />}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: "absolute" }}>
        <defs><radialGradient id={`hg${size}`}><stop offset="0%" stopColor="rgba(0,255,255,0.3)" /><stop offset="100%" stopColor="rgba(0,120,130,0.08)" /></radialGradient></defs>
        <polygon points={v.map(p=>`${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ")} fill={fill === "gradient" ? `url(#hg${size})` : fill} stroke="none" />
        {ei.map(([a,b],i) => {
          const aA=(Math.PI/180)*(60*a), aB=(Math.PI/180)*(60*b);
          const pts = `${(r+rO*Math.cos(aA)).toFixed(1)},${(r+rO*Math.sin(aA)).toFixed(1)} ${(r+rO*Math.cos(aB)).toFixed(1)},${(r+rO*Math.sin(aB)).toFixed(1)} ${(r+rI*Math.cos(aB)).toFixed(1)},${(r+rI*Math.sin(aB)).toFixed(1)} ${(r+rI*Math.cos(aA)).toFixed(1)},${(r+rI*Math.sin(aA)).toFixed(1)}`;
          return <polygon key={i} points={pts} fill={stroke} opacity={0.85} />;
        })}
      </svg>
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.28, color: C.text, fontFamily: "Inter, sans-serif" }}>{children}</div>
    </div>
  );
};

/* ── Section header ── */
const Section = ({ title, children }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ color: C.cyan, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12, borderBottom: `1px solid ${C.border}`, paddingBottom: 4 }}>{title}</div>
    {children}
  </div>
);

const Label = ({ text }) => (
  <div style={{ color: C.textDim, fontSize: 9, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6, marginTop: 12 }}>{text}</div>
);

/* ────────────────────────────────────────────────
   COMPONENT SPECIFICATIONS
   ──────────────────────────────────────────────── */

/* ── Buttons ── */
const GlassButton = ({ label, variant = "primary", disabled, size = "md", danger, icon }) => {
  const isOutline = variant === "outline";
  const isGhost = variant === "ghost";
  const isIcon = variant === "icon";
  const color = danger ? C.red : C.cyan;
  const h = size === "sm" ? 32 : size === "lg" ? 48 : 40;
  const px = isIcon ? 0 : size === "sm" ? 12 : 16;
  const fs = size === "sm" ? 11 : size === "lg" ? 14 : 12;
  const w = isIcon ? h : "auto";

  return (
    <button disabled={disabled} style={{
      height: h, width: w, paddingLeft: px, paddingRight: px,
      background: isOutline || isGhost ? "transparent" : disabled ? C.border : danger ? C.red : C.cyanAlpha10,
      border: isGhost ? "none" : `1px solid ${disabled ? C.border : color}`,
      borderRadius: 8,
      color: disabled ? C.textDim : isOutline || isGhost ? color : danger ? "#fff" : C.text,
      fontSize: fs, fontWeight: 600, fontFamily: "Inter, sans-serif",
      cursor: disabled ? "not-allowed" : "pointer",
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
      opacity: disabled ? 0.4 : 1,
      boxShadow: !disabled && !isGhost && !isOutline ? `0 0 12px ${danger ? "rgba(229,57,53,0.2)" : "rgba(0,255,255,0.15)"}` : "none",
      letterSpacing: 0.5,
    }}>
      {icon && <span style={{ fontSize: fs + 2 }}>{icon}</span>}
      {label}
    </button>
  );
};

/* ── Text Field ── */
const GlassTextField = ({ placeholder, value, focused, error, label }) => (
  <div style={{ marginBottom: 8 }}>
    {label && <div style={{ fontSize: 11, color: C.textDim, marginBottom: 4 }}>{label}</div>}
    <div style={{
      background: C.surface,
      border: `1px solid ${error ? C.red : focused ? C.cyan : C.border}`,
      borderRadius: 10,
      padding: "10px 14px",
      fontSize: 13, color: value ? C.text : C.textDim,
      fontFamily: "Inter, sans-serif",
      boxShadow: focused ? `0 0 8px rgba(0,255,255,0.15)` : "none",
      transition: "all 0.2s",
    }}>
      {value || placeholder}
    </div>
    {error && <div style={{ fontSize: 10, color: C.red, marginTop: 2 }}>{error}</div>}
  </div>
);

/* ── Switch / Toggle ── */
const GlassSwitch = ({ on, label }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0" }}>
    <span style={{ fontSize: 13, color: C.text }}>{label}</span>
    <div style={{
      width: 44, height: 24, borderRadius: 12,
      background: on ? C.cyanAlpha20 : C.surface,
      border: `1px solid ${on ? C.cyan : C.border}`,
      position: "relative", cursor: "pointer",
      boxShadow: on ? "0 0 8px rgba(0,255,255,0.2)" : "none",
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: 9,
        background: on ? C.cyan : C.textDim,
        position: "absolute", top: 2,
        left: on ? 22 : 2,
        transition: "left 0.2s",
        boxShadow: on ? "0 0 6px rgba(0,255,255,0.4)" : "none",
      }} />
    </div>
  </div>
);

/* ── Contact List Item ── */
const ContactRow = ({ name, lastMsg, time, unread, online }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
    borderBottom: `1px solid ${C.border}`,
    background: unread ? "rgba(0,255,255,0.03)" : "transparent",
  }}>
    <div style={{ position: "relative" }}>
      <Hex size={44} fill="gradient" stroke={C.cyanDim}>
        <span style={{ fontWeight: 700, fontSize: 14 }}>{name[0]}</span>
      </Hex>
      {online && <div style={{ position: "absolute", bottom: 2, right: 2, width: 10, height: 10, borderRadius: 5, background: C.green, border: `2px solid ${C.bg}` }} />}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 14, fontWeight: unread ? 700 : 400, color: C.text }}>{name}</span>
        <span style={{ fontSize: 10, color: C.textDim, flexShrink: 0 }}>{time}</span>
      </div>
      <div style={{ fontSize: 12, color: unread ? C.text : C.textDim, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lastMsg}</div>
    </div>
    <div style={{ display: "flex", gap: 6 }}>
      <Hex size={28} stroke={C.cyanDim}><Icon name="phone" size={14} color={C.cyanDim} /></Hex>
      <Hex size={28} stroke={C.cyanDim}><Icon name="video" size={14} color={C.cyanDim} /></Hex>
    </div>
    {unread && <div style={{ minWidth: 20, height: 20, borderRadius: 10, background: C.cyan, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: C.bg }}>{unread}</div>}
  </div>
);

/* ── Message Bubble ── */
const MessageBubble = ({ text, sent, time, status, burn }) => (
  <div style={{ display: "flex", justifyContent: sent ? "flex-end" : "flex-start", marginBottom: 4, padding: "0 14px" }}>
    <div style={{
      maxWidth: "75%",
      background: sent ? C.cyanAlpha10 : C.panel,
      border: `1px solid ${sent ? "rgba(0,255,255,0.2)" : C.border}`,
      borderRadius: sent ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
      padding: "8px 12px",
      position: "relative",
    }}>
      {burn && <div style={{ fontSize: 9, color: C.orange, marginBottom: 2 }}>🔥 Burn after reading</div>}
      <div style={{ fontSize: 13, color: C.text, lineHeight: 1.4 }}>{text}</div>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 4, marginTop: 2 }}>
        <span style={{ fontSize: 9, color: C.textDim }}>{time}</span>
        {sent && <span style={{ fontSize: 9, color: status === "read" ? C.cyan : C.textDim }}>
          {status === "sent" ? "✓" : status === "delivered" ? "✓✓" : "✓✓"}
        </span>}
      </div>
    </div>
  </div>
);

/* ── Glass Card ── */
const GlassCard = ({ title, children, accent }) => (
  <div style={{
    background: C.panel,
    border: `1px solid ${accent || C.border}`,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    boxShadow: accent ? `0 0 12px ${accent}33` : "0 0 20px rgba(0,255,255,0.04)",
  }}>
    {title && <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>{title}</div>}
    {children}
  </div>
);

/* ── Chip ── */
const GlassChip = ({ label, active, color }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", height: 28,
    padding: "0 12px", borderRadius: 14,
    background: active ? (color || C.cyanAlpha10) : "transparent",
    border: `1px solid ${active ? (color || C.cyan) : C.border}`,
    fontSize: 11, fontWeight: 500,
    color: active ? C.text : C.textDim,
  }}>{label}</span>
);

/* ── Slider ── */
const GlassSlider = ({ value = 60, label }) => (
  <div>
    {label && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
      <span style={{ fontSize: 11, color: C.textDim }}>{label}</span>
      <span style={{ fontSize: 11, color: C.cyan }}>{value}%</span>
    </div>}
    <div style={{ height: 4, background: C.surface, borderRadius: 2, border: `1px solid ${C.border}`, position: "relative" }}>
      <div style={{ height: "100%", width: `${value}%`, background: `linear-gradient(90deg, ${C.cyanDim}, ${C.cyan})`, borderRadius: 2 }} />
      <div style={{ position: "absolute", top: -6, left: `${value}%`, transform: "translateX(-50%)", width: 16, height: 16, borderRadius: 8, background: C.cyan, border: `2px solid ${C.bg}`, boxShadow: `0 0 8px rgba(0,255,255,0.4)` }} />
    </div>
  </div>
);

/* ── Divider ── */
const GlassDivider = ({ label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "12px 0" }}>
    <div style={{ flex: 1, height: 1, background: C.border }} />
    {label && <span style={{ fontSize: 9, color: C.textDim, letterSpacing: 2, textTransform: "uppercase" }}>{label}</span>}
    {label && <div style={{ flex: 1, height: 1, background: C.border }} />}
  </div>
);

/* ── Dialog ── */
const GlassDialog = ({ title, message, actions }) => (
  <div style={{
    background: C.panel,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    padding: 20,
    maxWidth: 300,
    boxShadow: "0 0 40px rgba(0,0,0,0.6), 0 0 20px rgba(0,255,255,0.08)",
  }}>
    <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 8 }}>{title}</div>
    <div style={{ fontSize: 13, color: C.textDim, lineHeight: 1.5, marginBottom: 16 }}>{message}</div>
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
      {actions}
    </div>
  </div>
);

/* ── Tab Bar (5-tab Aegis nav) ── */
const TabBar = ({ tabs, activeIndex }) => (
  <div style={{
    display: "flex", justifyContent: "space-around", alignItems: "center",
    background: C.surface, borderTop: `1px solid ${C.border}`,
    padding: "6px 0",
  }}>
    {tabs.map((tab, i) => {
      const active = i === activeIndex;
      const isPanic = tab.label === "PANIC";
      return (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <Hex
            size={isPanic ? 44 : 28}
            stroke={isPanic ? C.red : active ? C.cyan : C.textDim}
            fill={isPanic ? "rgba(229,57,53,0.15)" : active ? C.cyanAlpha10 : "transparent"}
            glow={isPanic || active}
          >
            <Icon name={tab.icon} size={isPanic ? 22 : 16} color={isPanic ? C.red : active ? C.cyan : C.textDim} />
          </Hex>
          <span style={{ fontSize: 8, color: isPanic ? C.red : active ? C.cyan : C.textDim, fontWeight: active ? 700 : 400 }}>{tab.label}</span>
        </div>
      );
    })}
  </div>
);

/* ── FAB (Floating Action Button) ── */
const GlassFAB = ({ icon = "+" }) => (
  <div style={{ position: "relative", display: "inline-block" }}>
    <Hex size={56} fill={C.cyanAlpha20} stroke={C.cyan} glow>
      <Icon name="plus" size={24} />
    </Hex>
  </div>
);

/* ── Top App Bar ── */
const TopBar = ({ title, backArrow, actions }) => (
  <div style={{
    display: "flex", alignItems: "center", height: 56,
    padding: "0 12px", background: C.surface,
    borderBottom: `1px solid ${C.border}`,
  }}>
    {backArrow && <Hex size={28} stroke={C.cyanDim} style={{ marginRight: 8 }}><Icon name="back" size={14} color={C.cyanDim} /></Hex>}
    <div style={{ flex: 1, fontSize: 16, fontWeight: 700, color: C.text }}>{title}</div>
    <div style={{ display: "flex", gap: 4 }}>{actions}</div>
  </div>
);

/* ════════════════════════════════════════════════
   RENDER: Full Component Reference Sheet
   ════════════════════════════════════════════════ */
export default function LunaGlassComponents() {
  const [switchState, setSwitchState] = useState({ a: true, b: false, c: true });

  return (
    <div style={{ background: C.bg, minHeight: "100vh", padding: 20, fontFamily: "Inter, sans-serif", color: C.text, maxWidth: 480, margin: "0 auto" }}>

      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ color: C.cyan, fontSize: 22, fontWeight: 700, letterSpacing: 6, textShadow: "0 0 20px rgba(0,255,255,0.3)" }}>LUNAGLASS</div>
        <div style={{ color: C.textDim, fontSize: 10, letterSpacing: 3, marginTop: 2 }}>COMPONENT LIBRARY</div>
        <div style={{ color: C.textDim, fontSize: 9, marginTop: 2 }}>Project Aether · v2026.05.25</div>
      </div>

      {/* ── BUTTONS ── */}
      <Section title="Buttons">
        <Label text="Primary" />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <GlassButton label="Confirm" />
          <GlassButton label="Danger" danger />
          <GlassButton label="Disabled" disabled />
        </div>
        <Label text="Outline" />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <GlassButton label="Settings" variant="outline" />
          <GlassButton label="Cancel" variant="outline" danger />
        </div>
        <Label text="Ghost" />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <GlassButton label="Skip" variant="ghost" />
          <GlassButton label="Learn more" variant="ghost" />
        </div>
        <Label text="Sizes" />
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <GlassButton label="Small" size="sm" />
          <GlassButton label="Medium" size="md" />
          <GlassButton label="Large" size="lg" />
        </div>
        <Label text="Icon Button" />
        <div style={{ display: "flex", gap: 8 }}>
          <Hex size={36} stroke={C.cyan} fill={C.cyanAlpha10}><Icon name="settings" size={18} /></Hex>
          <Hex size={36} stroke={C.cyan} fill={C.cyanAlpha10}><Icon name="search" size={18} /></Hex>
          <Hex size={36} stroke={C.red} fill="rgba(229,57,53,0.1)"><Icon name="close" size={18} color={C.red} /></Hex>
        </div>
        <Label text="FAB (Floating Action Button)" />
        <GlassFAB />
        <div style={{ fontSize: 10, color: C.textDim, marginTop: 4 }}>56px hex · cyan glow · positioned above nav bar</div>
      </Section>

      {/* ── TEXT FIELDS ── */}
      <Section title="Text Fields">
        <GlassTextField placeholder="Type a message..." label="Default" />
        <GlassTextField value="Hello, this is a message" focused label="Focused" />
        <GlassTextField value="" placeholder="Enter PIN" error="PIN must be 4-8 digits" label="Error state" />
        <Label text="Search" />
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 20, padding: "8px 14px",
        }}>
          <Icon name="search" size={16} color={C.textDim} />
          <span style={{ fontSize: 12, color: C.textDim }}>Search messages...</span>
        </div>
      </Section>

      {/* ── SWITCHES ── */}
      <Section title="Switches & Toggles">
        <GlassSwitch on={switchState.a} label="Geofence alerts" />
        <GlassSwitch on={switchState.b} label="SIM swap detection" />
        <GlassSwitch on={switchState.c} label="Mugshot on failed PIN" />
        <div style={{ fontSize: 10, color: C.textDim, marginTop: 4 }}>Track: 44×24 · Thumb: 18px circle · On: cyan glow · Off: dim</div>
      </Section>

      {/* ── CONTACT LIST ── */}
      <Section title="Contact List">
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
          <ContactRow name="Alex" lastMsg="See you at 7pm 💚" time="07:55" unread={2} online />
          <ContactRow name="Jordan" lastMsg="Call me when you can" time="Yesterday" online />
          <ContactRow name="Sam" lastMsg="Project files updated" time="Thu" />
        </div>
        <div style={{ fontSize: 10, color: C.textDim, marginTop: 4 }}>Hex avatar (44px) · Name + preview · Timestamp · Call/video hex buttons (28px) · Unread badge</div>
      </Section>

      {/* ── MESSAGE BUBBLES ── */}
      <Section title="Message Bubbles">
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 0", background: C.surface }}>
          <MessageBubble text="Hey, are you on your way?" time="20:14" sent={false} />
          <MessageBubble text="Yes, running 5 min late. Almost there." time="20:15" sent status="read" />
          <MessageBubble text="This message will self-destruct" time="20:16" sent status="delivered" burn />
        </div>
        <div style={{ fontSize: 10, color: C.textDim, marginTop: 4 }}>Sent: cyan-tinted · Received: panel · Radius: 14px, 4px tail corner · Ticks: ✓ sent ✓✓ delivered (cyan = read)</div>
      </Section>

      {/* ── CARDS ── */}
      <Section title="Glass Cards">
        <GlassCard title="Protection Status">
          <div style={{ fontSize: 12, color: C.textDim }}>All systems active. Device Owner enabled.</div>
        </GlassCard>
        <GlassCard title="⚠ SIM Change Detected" accent={C.orange}>
          <div style={{ fontSize: 12, color: C.textDim }}>SIM card was replaced 2 minutes ago. Contacts have been notified.</div>
        </GlassCard>
        <GlassCard title="🔴 Panic Active" accent={C.red}>
          <div style={{ fontSize: 12, color: C.textDim }}>Broadcasting location to all contacts.</div>
        </GlassCard>
      </Section>

      {/* ── CHIPS ── */}
      <Section title="Chips">
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <GlassChip label="All" active />
          <GlassChip label="Unread" />
          <GlassChip label="Groups" />
          <GlassChip label="🔥 Burn" active color="rgba(255,152,0,0.2)" />
          <GlassChip label="📌 Pinned" />
        </div>
      </Section>

      {/* ── SLIDER ── */}
      <Section title="Sliders">
        <GlassSlider value={75} label="Canary timer (hours)" />
        <div style={{ height: 16 }} />
        <GlassSlider value={30} label="Quiet hours volume" />
        <div style={{ fontSize: 10, color: C.textDim, marginTop: 8 }}>Track: 4px · Thumb: 16px cyan circle with glow · Fill gradient: cyanDim → cyan</div>
      </Section>

      {/* ── DIVIDERS ── */}
      <Section title="Dividers">
        <GlassDivider />
        <GlassDivider label="or" />
        <GlassDivider label="today" />
        <div style={{ fontSize: 10, color: C.textDim, marginTop: 4 }}>1px border color · Optional centered label in uppercase</div>
      </Section>

      {/* ── DIALOG ── */}
      <Section title="Dialog">
        <GlassDialog
          title="Remote Wipe"
          message="This will permanently erase all data on the target device. This action cannot be undone."
          actions={<>
            <GlassButton label="Cancel" variant="ghost" />
            <GlassButton label="Wipe" danger />
          </>}
        />
        <div style={{ fontSize: 10, color: C.textDim, marginTop: 8 }}>Panel background · 16px radius · 40px shadow · Actions right-aligned</div>
      </Section>

      {/* ── TOP BAR ── */}
      <Section title="Top App Bar">
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
          <TopBar title="Comms" actions={
            <><Hex size={28} stroke={C.cyanDim}><Icon name="search" size={14} color={C.cyanDim} /></Hex>
            <Hex size={28} stroke={C.cyanDim}><Icon name="more" size={14} color={C.cyanDim} /></Hex></>
          } />
          <TopBar title="Alex" backArrow actions={
            <><Hex size={28} stroke={C.cyanDim}><Icon name="phone" size={14} color={C.cyanDim} /></Hex>
            <Hex size={28} stroke={C.cyanDim}><Icon name="video" size={14} color={C.cyanDim} /></Hex></>
          } />
        </div>
        <div style={{ fontSize: 10, color: C.textDim, marginTop: 4 }}>56px height · Surface bg · Border bottom · Hex icon buttons (28px)</div>
      </Section>

      {/* ── TAB BAR ── */}
      <Section title="Tab Bar (5-Tab Navigation)">
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
          <TabBar
            activeIndex={3}
            tabs={[
              { icon: "settings", label: "Settings" },
              { icon: "security", label: "Security" },
              { icon: "panic", label: "PANIC" },
              { icon: "comms", label: "Comms" },
              { icon: "radar", label: "Radar" },
            ]}
          />
        </div>
        <div style={{ fontSize: 10, color: C.textDim, marginTop: 4 }}>
          Settings | Security | PANIC | Comms | Radar<br />
          Panic: centered, 44px hex, red, always locked at index 2<br />
          Active tab: cyan fill + glow · Inactive: textDim<br />
          Icons: 28px hex (panic 44px) · Labels: 8px
        </div>
      </Section>

      <div style={{ textAlign: "center", color: C.textDim, fontSize: 9, marginTop: 32, paddingBottom: 20 }}>
        Project Aether · LunaGlass Component Library · 2026
      </div>
    </div>
  );
}
