/**
 * LunaGlass — Hex Geometry Helpers
 * Flat-top hexagon with trapezoid edge construction.
 */

/** Flat-top hex vertices. Returns array of 6 {x, y} points. */
export function hexVertices(cx, cy, r) {
  const h = r * Math.sqrt(3) / 2;
  return [
    { x: cx + r,       y: cy },         // 0: right
    { x: cx + r / 2,   y: cy + h },     // 1: lower-right
    { x: cx - r / 2,   y: cy + h },     // 2: lower-left
    { x: cx - r,       y: cy },         // 3: left
    { x: cx - r / 2,   y: cy - h },     // 4: upper-left
    { x: cx + r / 2,   y: cy - h },     // 5: upper-right
  ];
}

/** CCW edge order from top flat edge. Each entry = [vertexA, vertexB]. */
export const EDGES_CCW = [
  [4, 5],  // top
  [3, 4],  // upper-left
  [2, 3],  // lower-left
  [1, 2],  // bottom
  [0, 1],  // lower-right
  [5, 0],  // upper-right
];

/**
 * Build a trapezoid for one hex edge.
 * @param {number} cx - center x
 * @param {number} cy - center y
 * @param {number} r - hex radius
 * @param {number} w - edge width (stroke thickness)
 * @param {number} vertA - vertex index A
 * @param {number} vertB - vertex index B
 * @returns {Array<{x,y}>} Four corners of the trapezoid [outerA, outerB, innerB, innerA]
 */
export function edgeTrapezoid(cx, cy, r, w, vertA, vertB) {
  const half = w / 2;
  const rOut = r + half;
  const rIn = r - half;
  const angA = (Math.PI / 180) * (60 * vertA);
  const angB = (Math.PI / 180) * (60 * vertB);
  return [
    { x: cx + rOut * Math.cos(angA), y: cy + rOut * Math.sin(angA) },
    { x: cx + rOut * Math.cos(angB), y: cy + rOut * Math.sin(angB) },
    { x: cx + rIn * Math.cos(angB),  y: cy + rIn * Math.sin(angB) },
    { x: cx + rIn * Math.cos(angA),  y: cy + rIn * Math.sin(angA) },
  ];
}

/** SVG polygon points string for a flat-top hex. */
export function hexSvgPoints(cx, cy, r) {
  return hexVertices(cx, cy, r)
    .map(v => `${v.x.toFixed(1)},${v.y.toFixed(1)}`)
    .join(' ');
}

/** SVG polygon points string for one trapezoid edge. */
export function edgeSvgPoints(cx, cy, r, w, vertA, vertB) {
  return edgeTrapezoid(cx, cy, r, w, vertA, vertB)
    .map(v => `${v.x.toFixed(1)},${v.y.toFixed(1)}`)
    .join(' ');
}
