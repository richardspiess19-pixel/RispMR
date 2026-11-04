package com.rispmr.vrboxemulator.gamepad;

// Runs inside the Shizuku process (ADB shell rights): reads the VR Box from /dev/input, runs the
// mapping and drives the virtual gamepad through /dev/uhid.
interface IVirtualGamepad {
    // Shizuku calls this transaction when the service is unbound with remove=true.
    void destroy() = 16777114;

    // Creates the virtual gamepad and remembers the controller + profile (BackgroundConfigCodec).
    // Returns "" on success or an error message.
    String start(String config) = 1;

    // New profile or controller while running.
    void configure(String config) = 2;

    // true: read the VR Box (the app is in the background, a game is open).
    // false: the app is on screen and reads the VR Box itself; the gamepad stays idle.
    void setReading(boolean reading) = 3;

    // Removes the virtual gamepad and releases the VR Box.
    void stop() = 4;

    // JSON: active, reading, grabbed, nodes, events, error.
    String status() = 5;

    // Linux uid of the service: 2000 = shell (ADB), 0 = root.
    int uid() = 6;

    // JSON for "Copiar diagnóstico": what the service can see and open.
    String diagnose() = 7;
}
