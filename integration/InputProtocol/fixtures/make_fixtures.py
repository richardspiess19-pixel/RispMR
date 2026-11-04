#!/usr/bin/env python3
"""Writes the VRBQ v2 reference packets used by the Kotlin, C and Python tests.

The values are computed here independently from the Kotlin encoder, so the Kotlin test
(VrbqProtocolTest) cross-checks the encoder against this specification.
"""
import json
import pathlib
import struct

HERE = pathlib.Path(__file__).resolve().parent

# Button bits per Joy-Con (bit 0 first):
LEFT_NAMES = ["click", "up", "down", "left", "right", "minus", "capture"]
RIGHT_NAMES = ["click", "a", "b", "x", "y", "plus", "home"]

# Reference frame: seq 42, t = 123456789 us, connected, not demo.
# left : stick (0.5, -0.25), ZL 0, L 1, arrow up + minus pressed
# right: stick (-1, 0.75), ZR 0.5, R 0, stick click + B pressed
FLAGS = 0x02  # bit0 demo, bit1 controller connected
LEFT_ON = {"up", "minus"}
RIGHT_ON = {"click", "b"}


def bits(names, on):
    return sum(1 << i for i, n in enumerate(names) if n in on)


header = struct.pack("<4sBBHIq", b"VRBQ", 2, FLAGS, 0, 42, 123456789)
left = struct.pack("<HHffff", bits(LEFT_NAMES, LEFT_ON), 0, 0.5, -0.25, 0.0, 1.0)
right = struct.pack("<HHffff", bits(RIGHT_NAMES, RIGHT_ON), 0, -1.0, 0.75, 0.5, 0.0)
packet = header + left + right
assert len(packet) == 60


def hand(stick, names, on, trigger, grip):
    h = {"stick": stick}
    h.update({n: n in on for n in names})
    h.update({"trigger": trigger, "grip": grip})
    return h


doc = {
    "proto": "vrbq", "v": 2, "seq": 42, "t": 123456789, "demo": False, "connected": True,
    "left": hand([0.5, -0.25], LEFT_NAMES, LEFT_ON, 0, 1),
    "right": hand([-1, 0.75], RIGHT_NAMES, RIGHT_ON, 0.5, 0),
}

(HERE / "sample-v2.bin").write_bytes(packet)
(HERE / "sample-v2.json").write_text(json.dumps(doc, separators=(",", ":")) + "\n")
print("fixtures written")
