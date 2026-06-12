/**
 * LunaGlass — Hex Geometry (Kotlin / Compose)
 * Flat-top hexagon with trapezoid edge construction.
 */
package lunaglass.geometry

import androidx.compose.ui.geometry.Offset
import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.sin
import kotlin.math.sqrt

/** Flat-top hex vertices. Returns list of 6 Offsets. */
fun hexVertices(cx: Float, cy: Float, r: Float): List<Offset> {
    val h = r * sqrt(3f) / 2f
    return listOf(
        Offset(cx + r,       cy),         // 0: right
        Offset(cx + r / 2f,  cy + h),     // 1: lower-right
        Offset(cx - r / 2f,  cy + h),     // 2: lower-left
        Offset(cx - r,       cy),         // 3: left
        Offset(cx - r / 2f,  cy - h),     // 4: upper-left
        Offset(cx + r / 2f,  cy - h),     // 5: upper-right
    )
}

/** CCW edge order from top flat edge. */
val EDGES_CCW: Array<Pair<Int, Int>> = arrayOf(
    4 to 5,  // top
    3 to 4,  // upper-left
    2 to 3,  // lower-left
    1 to 2,  // bottom
    0 to 1,  // lower-right
    5 to 0,  // upper-right
)

/** Trapezoid corners for one hex edge. */
fun edgeTrapezoid(cx: Float, cy: Float, r: Float, w: Float, vertA: Int, vertB: Int): List<Offset> {
    val half = w / 2f
    val rOut = r + half
    val rIn = r - half
    val angA = (PI / 180.0) * (60.0 * vertA)
    val angB = (PI / 180.0) * (60.0 * vertB)
    return listOf(
        Offset((cx + rOut * cos(angA)).toFloat(), (cy + rOut * sin(angA)).toFloat()),
        Offset((cx + rOut * cos(angB)).toFloat(), (cy + rOut * sin(angB)).toFloat()),
        Offset((cx + rIn * cos(angB)).toFloat(),  (cy + rIn * sin(angB)).toFloat()),
        Offset((cx + rIn * cos(angA)).toFloat(),  (cy + rIn * sin(angA)).toFloat()),
    )
}
