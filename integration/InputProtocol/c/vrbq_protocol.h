/*
 * VRBQ input protocol v1 — reference decoder (C99, header only, no dependencies).
 *
 * Packets are sent by the "VR BOX TO META QUEST EMULATOR" Android app over UDP
 * (default port 47900) while emulation is running. See ../PROTOCOL.md.
 *
 * Binary layout (60 bytes, little endian):
 *   0  char[4] magic "VRBQ"
 *   4  u8      version (1)
 *   5  u8      flags   (bit0 demo/simulated input, bit1 controller connected)
 *   6  u16     reserved
 *   8  u32     sequence number
 *  12  i64     timestamp, microseconds (sender monotonic clock)
 *  20  hand    left
 *  40  hand    right
 * hand (20 bytes):
 *   0  u16 buttons (bit0 stick click, bit1 X/A, bit2 Y/B, bit3 Menu/System)
 *   2  u16 reserved
 *   4  f32 stick x (-1..1, +right)
 *   8  f32 stick y (-1..1, +up)
 *  12  f32 trigger (0..1)
 *  16  f32 grip    (0..1)
 */
#ifndef VRBQ_PROTOCOL_H
#define VRBQ_PROTOCOL_H

#include <stdint.h>
#include <string.h>

#define VRBQ_VERSION 1
#define VRBQ_PACKET_SIZE 60
#define VRBQ_DEFAULT_PORT 47900

#define VRBQ_FLAG_DEMO 0x01
#define VRBQ_FLAG_CONNECTED 0x02

#define VRBQ_BTN_STICK_CLICK 0x01
#define VRBQ_BTN_PRIMARY 0x02   /* X (left) / A (right) */
#define VRBQ_BTN_SECONDARY 0x04 /* Y (left) / B (right) */
#define VRBQ_BTN_MENU 0x08      /* Menu (left) / System (right) */

typedef struct {
    uint16_t buttons;
    float stick_x;
    float stick_y;
    float trigger;
    float grip;
} vrbq_hand;

typedef struct {
    uint8_t version;
    uint8_t flags;
    uint32_t seq;
    int64_t timestamp_us;
    vrbq_hand left;
    vrbq_hand right;
} vrbq_frame;

static inline uint16_t vrbq__u16(const uint8_t *p) { return (uint16_t)(p[0] | (p[1] << 8)); }
static inline uint32_t vrbq__u32(const uint8_t *p) {
    return (uint32_t)p[0] | ((uint32_t)p[1] << 8) | ((uint32_t)p[2] << 16) | ((uint32_t)p[3] << 24);
}
static inline float vrbq__f32(const uint8_t *p) {
    uint32_t bits = vrbq__u32(p);
    float f;
    memcpy(&f, &bits, sizeof f);
    return f;
}

static inline void vrbq__hand(const uint8_t *p, vrbq_hand *h) {
    h->buttons = vrbq__u16(p);
    h->stick_x = vrbq__f32(p + 4);
    h->stick_y = vrbq__f32(p + 8);
    h->trigger = vrbq__f32(p + 12);
    h->grip = vrbq__f32(p + 16);
}

/** Decodes a binary packet. Returns 0 on success, -1 on a malformed packet. */
static inline int vrbq_decode(const uint8_t *data, size_t len, vrbq_frame *out) {
    if (len < VRBQ_PACKET_SIZE || memcmp(data, "VRBQ", 4) != 0 || data[4] != VRBQ_VERSION) return -1;
    out->version = data[4];
    out->flags = data[5];
    out->seq = vrbq__u32(data + 8);
    out->timestamp_us = (int64_t)((uint64_t)vrbq__u32(data + 12) | ((uint64_t)vrbq__u32(data + 16) << 32));
    vrbq__hand(data + 20, &out->left);
    vrbq__hand(data + 40, &out->right);
    return 0;
}

#endif /* VRBQ_PROTOCOL_H */
