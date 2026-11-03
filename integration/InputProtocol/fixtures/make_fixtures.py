#!/usr/bin/env python3
"""Writes the VRBQ v1 reference packets used by the Kotlin, C and Python tests.

The values are computed here independently from the Kotlin encoder, so the Kotlin test
(VrbqProtocolTest) cross-checks the encoder against this specification.
"""
import json
import pathlib
import struct

HERE = pathlib.Path(__file__).resolve().parent

# Reference frame: seq 42, t = 123456789 us, connected, not demo.
# left : stick (0.5, -0.25), trigger 0, grip 1, X pressed, Menu pressed
# right: stick (-1, 0.75), trigger 0.5, grip 0, stick click pressed, B pressed
FLAGS = 0x02  # bit0 demo, bit1 controller connected
LEFT_BITS = 0x02 | 0x08  # primary (X) + menu
RIGHT_BITS = 0x01 | 0x04  # stick click + secondary (B)

header = struct.pack("<4sBBHIq", b"VRBQ", 1, FLAGS, 0, 42, 123456789)
left = struct.pack("<HHffff", LEFT_BITS, 0, 0.5, -0.25, 0.0, 1.0)
right = struct.pack("<HHffff", RIGHT_BITS, 0, -1.0, 0.75, 0.5, 0.0)
packet = header + left + right
assert len(packet) == 60

doc = {
    "proto": "vrbq", "v": 1, "seq": 42, "t": 123456789, "demo": False, "connected": True,
    "left": {"stick": [0.5, -0.25], "click": False, "x": True, "y": False, "menu": True, "trigger": 0, "grip": 1},
    "right": {"stick": [-1, 0.75], "click": True, "a": False, "b": True, "system": False, "trigger": 0.5, "grip": 0},
}

(HERE / "sample-v1.bin").write_bytes(packet)
(HERE / "sample-v1.json").write_text(json.dumps(doc, separators=(",", ":")) + "\n")
print("fixtures written")
