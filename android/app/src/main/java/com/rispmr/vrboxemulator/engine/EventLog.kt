package com.rispmr.vrboxemulator.engine

/** Bounded ring buffer of human readable events (physical, virtual and system). */
class EventLog(capacity: Int = 200) {

    data class Entry(val seq: Long, val wallMs: Long, val category: String, val text: String)

    private val entries = ArrayDeque<Entry>()
    private var nextSeq = 1L

    var capacity: Int = capacity.coerceIn(MIN_CAPACITY, MAX_CAPACITY)
        set(value) {
            field = value.coerceIn(MIN_CAPACITY, MAX_CAPACITY)
            trim()
        }

    val lastSeq: Long get() = nextSeq - 1

    fun add(category: String, text: String, wallMs: Long): Entry {
        val e = Entry(nextSeq++, wallMs, category, text)
        entries.addLast(e)
        trim()
        return e
    }

    /** Entries with seq > [seq], oldest first. */
    fun since(seq: Long): List<Entry> = entries.filter { it.seq > seq }

    fun recent(n: Int): List<Entry> = entries.toList().takeLast(n)

    fun clear() = entries.clear()

    val size: Int get() = entries.size

    private fun trim() {
        while (entries.size > capacity) entries.removeFirst()
    }

    companion object {
        const val PHYSICAL = "physical"
        const val VIRTUAL = "virtual"
        const val SYSTEM = "system"
        const val MIN_CAPACITY = 20
        const val MAX_CAPACITY = 2000
    }
}

/**
 * Rolling one-second statistics: event rate, mouse report rate and input latency.
 *
 * Latency = engine processing time - Android event timestamp. It covers the Android input
 * pipeline and the app, not the Bluetooth radio link (which Android does not expose).
 */
class InputStats {
    data class Snapshot(
        val eventsPerSec: Int,
        val motionHz: Int,
        val latencyAvgMs: Float?,
        val latencyMaxMs: Long?,
        val totalEvents: Long,
    )

    private var windowStartMs = Long.MIN_VALUE
    private var events = 0
    private var motionSamples = 0
    private var latencySum = 0L
    private var latencyCount = 0
    private var latencyMax = 0L
    private var total = 0L

    var last = Snapshot(0, 0, null, null, 0)
        private set

    fun record(eventTimeMs: Long, nowMs: Long, motionSamples: Int) {
        roll(nowMs)
        events++
        total++
        this.motionSamples += motionSamples
        if (eventTimeMs in 1..nowMs) {
            val l = nowMs - eventTimeMs
            if (l < MAX_PLAUSIBLE_LATENCY_MS) {
                latencySum += l
                latencyCount++
                if (l > latencyMax) latencyMax = l
            }
        }
    }

    /** Closes the window if one second has passed. Returns true when [last] changed. */
    fun roll(nowMs: Long): Boolean {
        if (windowStartMs == Long.MIN_VALUE) {
            windowStartMs = nowMs
            return false
        }
        val elapsed = nowMs - windowStartMs
        if (elapsed < 1000) return false
        val scale = 1000f / elapsed
        last = Snapshot(
            eventsPerSec = (events * scale).toInt(),
            motionHz = (motionSamples * scale).toInt(),
            latencyAvgMs = if (latencyCount > 0) latencySum.toFloat() / latencyCount else null,
            latencyMaxMs = if (latencyCount > 0) latencyMax else null,
            totalEvents = total,
        )
        windowStartMs = nowMs
        events = 0
        motionSamples = 0
        latencySum = 0
        latencyCount = 0
        latencyMax = 0
        return true
    }

    fun reset() {
        windowStartMs = Long.MIN_VALUE
        events = 0
        motionSamples = 0
        latencySum = 0
        latencyCount = 0
        latencyMax = 0
        total = 0
        last = Snapshot(0, 0, null, null, 0)
    }

    companion object {
        const val MAX_PLAUSIBLE_LATENCY_MS = 5_000L
    }
}
