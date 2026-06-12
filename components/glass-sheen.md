# Glass Sheen

Tilt-reactive highlight that slides across glass surfaces as the phone moves — like light on a frosted window.

## Sensor

Accelerometer (gravity vector). Normalised to [-1, 1] per axis, low-pass smoothed at factor 0.28 (tracks hand without jitter). Sample rate: SENSOR_DELAY_UI (~16 Hz).

## Reference Counting

The sensor is only registered while at least one glass surface is on screen AND the effect is enabled. Torn down the moment the last surface leaves. A disabled or off-screen effect costs **zero battery**.

## Performance

Deadband of 0.0025: sub-perceptible tilt deltas are suppressed. Without this, the accelerometer's asymptotic smoothing was redrawing the entire chat at sensor rate even with the phone sitting still.

## Layers

Three glass effects, each behind its own experimental toggle:

| Effect | Description | Cost |
|--------|-------------|------|
| **Sheen** | Radial highlight following tilt position | Low (one gradient redraw per tilt emit) |
| **Edge-light** | Fresnel-model cyan rim — intensifies at grazing angles | Low (path measure cached, only brush recomputed) |
| **3D Perspective** | Pane tilt giving depth impression | Medium (full recompose on tilt change) |

All sensor-gated — zero battery when disabled.
