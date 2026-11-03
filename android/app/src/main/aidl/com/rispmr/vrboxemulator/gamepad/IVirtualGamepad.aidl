package com.rispmr.vrboxemulator.gamepad;

// Runs inside the Shizuku process (ADB shell rights) and owns /dev/uhid.
interface IVirtualGamepad {
    // Shizuku calls this transaction when the service is unbound with remove=true.
    void destroy() = 16777114;

    // Creates the virtual HID device. Returns "" on success or an error message.
    String create(String name, int vendor, int product, in byte[] descriptor) = 1;

    // Sends one input report. oneway: never blocks the caller.
    oneway void send(in byte[] report) = 2;

    // Removes the virtual device (games see it disconnect).
    void close() = 3;

    // Linux uid of the service: 2000 = shell (ADB), 0 = root.
    int uid() = 4;
}
