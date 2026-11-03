#!/usr/bin/env python3
"""VRBQ reference receiver: prints the virtual Quest controller state sent by the app.

Usage:
    python3 vrbq_receiver.py [--port 47900] [--bind 0.0.0.0]

Runs anywhere Python 3 runs (a PC, a Raspberry Pi, Termux on the same phone...). In the
app, open VR INTEGRATION, enable UDP output with this machine's IP (or 127.0.0.1 when
running on the phone itself) and start emulation.
"""
import argparse
import json
import socket
import struct

HEADER = struct.Struct("<4sBBHIq")
HAND = struct.Struct("<HHffff")
PACKET_SIZE = HEADER.size + 2 * HAND.size  # 60


def _hand(raw, names):
    bits, _r, sx, sy, trigger, grip = raw
    return {
        "stick": [sx, sy],
        "click": bool(bits & 1),
        names[0]: bool(bits & 2),
        names[1]: bool(bits & 4),
        names[2]: bool(bits & 8),
        "trigger": trigger,
        "grip": grip,
    }


def decode(data: bytes) -> dict:
    """Decodes a JSON or binary VRBQ v1 packet into the JSON shape."""
    if data[:1] == b"{":
        msg = json.loads(data.decode("utf-8"))
        if msg.get("proto") != "vrbq" or msg.get("v") != 1:
            raise ValueError("not a VRBQ v1 JSON packet")
        return msg
    if len(data) < PACKET_SIZE:
        raise ValueError("packet too short")
    magic, version, flags, _r, seq, t = HEADER.unpack_from(data, 0)
    if magic != b"VRBQ" or version != 1:
        raise ValueError("not a VRBQ v1 binary packet")
    return {
        "proto": "vrbq",
        "v": 1,
        "seq": seq,
        "t": t,
        "demo": bool(flags & 1),
        "connected": bool(flags & 2),
        "left": _hand(HAND.unpack_from(data, HEADER.size), ("x", "y", "menu")),
        "right": _hand(HAND.unpack_from(data, HEADER.size + HAND.size), ("a", "b", "system")),
    }


def describe(msg: dict) -> str:
    def hand(h, names):
        pressed = [n.upper() for n in names if h.get(n)] + (["CLICK"] if h.get("click") else [])
        return "stick({:+.2f},{:+.2f}) trig {:.2f} grip {:.2f} [{}]".format(
            h["stick"][0], h["stick"][1], h["trigger"], h["grip"], " ".join(pressed) or "-")
    tag = " DEMO" if msg.get("demo") else ""
    return "#{:<7} L {} | R {}{}".format(msg["seq"], hand(msg["left"], ("x", "y", "menu")), hand(msg["right"], ("a", "b", "system")), tag)


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--port", type=int, default=47900)
    ap.add_argument("--bind", default="0.0.0.0")
    args = ap.parse_args()
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind((args.bind, args.port))
    print("Listening for VRBQ packets on {}:{} …".format(args.bind, args.port))
    while True:
        data, addr = sock.recvfrom(2048)
        try:
            print("{} {}".format(addr[0], describe(decode(data))))
        except ValueError as e:
            print("ignored packet from {}: {}".format(addr[0], e))


if __name__ == "__main__":
    main()
