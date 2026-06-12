//! LunaGlass — Hex Geometry (Rust)
//! Flat-top hexagon with trapezoid edge construction.

use std::f64::consts::PI;

#[derive(Debug, Clone, Copy)]
pub struct Point {
    pub x: f64,
    pub y: f64,
}

/// Flat-top hex vertices. Returns array of 6 points.
pub fn hex_vertices(cx: f64, cy: f64, r: f64) -> [Point; 6] {
    let h = r * (3.0_f64).sqrt() / 2.0;
    [
        Point { x: cx + r,       y: cy },         // 0: right
        Point { x: cx + r / 2.0, y: cy + h },     // 1: lower-right
        Point { x: cx - r / 2.0, y: cy + h },     // 2: lower-left
        Point { x: cx - r,       y: cy },         // 3: left
        Point { x: cx - r / 2.0, y: cy - h },     // 4: upper-left
        Point { x: cx + r / 2.0, y: cy - h },     // 5: upper-right
    ]
}

/// CCW edge order from top flat edge.
pub const EDGES_CCW: [(usize, usize); 6] = [
    (4, 5),  // top
    (3, 4),  // upper-left
    (2, 3),  // lower-left
    (1, 2),  // bottom
    (0, 1),  // lower-right
    (5, 0),  // upper-right
];

/// Trapezoid corners for one hex edge.
pub fn edge_trapezoid(cx: f64, cy: f64, r: f64, w: f64, vert_a: usize, vert_b: usize) -> [Point; 4] {
    let half = w / 2.0;
    let r_out = r + half;
    let r_in = r - half;
    let ang_a = (PI / 180.0) * (60.0 * vert_a as f64);
    let ang_b = (PI / 180.0) * (60.0 * vert_b as f64);
    [
        Point { x: cx + r_out * ang_a.cos(), y: cy + r_out * ang_a.sin() },
        Point { x: cx + r_out * ang_b.cos(), y: cy + r_out * ang_b.sin() },
        Point { x: cx + r_in * ang_b.cos(),  y: cy + r_in * ang_b.sin() },
        Point { x: cx + r_in * ang_a.cos(),  y: cy + r_in * ang_a.sin() },
    ]
}
