/* Decodes the shared fixture: cc -std=c99 -Wall -Wextra -o test_vrbq test_vrbq.c && ./test_vrbq ../fixtures/sample-v1.bin */
#include <stdio.h>
#include "vrbq_protocol.h"

#define CHECK(c) do { if (!(c)) { fprintf(stderr, "FAIL: %s (line %d)\n", #c, __LINE__); return 1; } } while (0)

int main(int argc, char **argv) {
    const char *path = argc > 1 ? argv[1] : "../fixtures/sample-v1.bin";
    uint8_t buf[128];
    FILE *f = fopen(path, "rb");
    if (!f) { perror(path); return 1; }
    size_t n = fread(buf, 1, sizeof buf, f);
    fclose(f);
    vrbq_frame fr;
    CHECK(n == VRBQ_PACKET_SIZE);
    CHECK(vrbq_decode(buf, n, &fr) == 0);
    CHECK(fr.seq == 42 && fr.timestamp_us == 123456789);
    CHECK(fr.flags == VRBQ_FLAG_CONNECTED);
    CHECK(fr.left.buttons == (VRBQ_BTN_PRIMARY | VRBQ_BTN_MENU));
    CHECK(fr.left.stick_x == 0.5f && fr.left.stick_y == -0.25f && fr.left.grip == 1.0f);
    CHECK(fr.right.buttons == (VRBQ_BTN_STICK_CLICK | VRBQ_BTN_SECONDARY));
    CHECK(fr.right.stick_x == -1.0f && fr.right.stick_y == 0.75f && fr.right.trigger == 0.5f);
    buf[0] = 'X';
    CHECK(vrbq_decode(buf, n, &fr) == -1);
    CHECK(vrbq_decode(buf, 10, &fr) == -1);
    puts("C decoder OK");
    return 0;
}
