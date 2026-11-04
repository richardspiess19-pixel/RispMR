package com.rispmr.vrboxemulator.engine

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class InputProcessorTest {
    private lateinit var clock: FakeClock
    private lateinit var log: EventLog
    private lateinit var controllers: VirtualControllerManager
    private lateinit var processor: InputProcessor
    private val virtualEvents = ArrayList<VirtualEvent>()
    private val detections = ArrayList<Detection>()
    private val identified = ArrayList<Pair<String, SourceKind>>()

    @Before
    fun setUp() {
        clock = FakeClock()
        log = EventLog(500)
        controllers = VirtualControllerManager()
        controllers.listener = VirtualEventListener { virtualEvents += it }
        controllers.configure(
            listOf(
                rule("mouse:btn:primary", "right.a"),
                rule("key:BUTTON_4", "right.trigger"),
                rule("axis:HAT_X:+", "left.up"),
                rule("mouse:x", "left.stick.x"),
                rule("mouse:wheel:up", "left.minus"),
            ),
            ButtonConfig(),
            StickConfig(smoothing = 0f, returnSpeed = 0f, x = AxisConfig(deadzone = 0f)),
            StickConfig(),
        )
        processor = InputProcessor(controllers, log, clock)
        processor.detectionListener = { detections += it }
        processor.identifiedListener = { id, kind -> identified += id to kind }
    }

    private fun button(id: String, pressed: Boolean) = RawEvent.Button("dev", id, pressed, clock.now - 5)

    @Test
    fun pressAndReleaseProduceVirtualEventsAndLog() {
        assertTrue(processor.process(button("mouse:btn:primary", true)))
        assertTrue(controllers.right.button("a"))
        assertEquals("Joy-Con direito · botão A pressionado", virtualEvents.last().describe())
        assertFalse("repeated press is ignored", processor.process(button("mouse:btn:primary", true)))
        processor.process(button("mouse:btn:primary", false))
        assertFalse(controllers.right.button("a"))
        assertEquals("Joy-Con direito · botão A solto", virtualEvents.last().describe())
        val texts = log.recent(10).filter { it.category == EventLog.PHYSICAL }.map { it.text }
        assertEquals(listOf("Botão esquerdo do mouse pressionado", "Botão esquerdo do mouse solto"), texts)
    }

    @Test
    fun digitalTriggerIsFullyPressed() {
        processor.process(button("key:BUTTON_4", true))
        assertEquals(1f, controllers.right.trigger, 1e-6f)
        assertEquals("Joy-Con direito · ZR pressionado (1,00)", virtualEvents.last().describe())
    }

    @Test
    fun axisDirectionsUseHysteresis() {
        processor.process(RawEvent.Axis("dev", "axis:HAT_X", 1f, clock.now))
        assertTrue(processor.state.isPressed("axis:HAT_X:+"))
        assertTrue(controllers.left.button("up"))
        processor.process(RawEvent.Axis("dev", "axis:HAT_X", 0.4f, clock.now))
        assertTrue("still pressed above release threshold", processor.state.isPressed("axis:HAT_X:+"))
        processor.process(RawEvent.Axis("dev", "axis:HAT_X", 0f, clock.now))
        assertFalse(processor.state.isPressed("axis:HAT_X:+"))
        assertFalse(controllers.left.button("up"))
        processor.process(RawEvent.Axis("dev", "axis:HAT_X", -1f, clock.now))
        assertTrue(processor.state.isPressed("axis:HAT_X:-"))
    }

    @Test
    fun detectionReportsPressedReleasedAndAlternatives() {
        processor.detecting = true
        processor.process(button("key:BUTTON_A", true))
        processor.process(button("key:BUTTON_A", false))
        assertEquals(listOf("PRESSED", "RELEASED"), detections.map { it.state })
        assertEquals("Botão A (gamepad)", detections[0].label)
        assertEquals("dev", detections[0].deviceKey)

        detections.clear()
        processor.process(RawEvent.Axis("dev", "axis:X", 0.9f, clock.now))
        assertEquals("axis:X:+", detections.single().sourceId)
        assertEquals(listOf("axis:X"), detections.single().alternatives)
    }

    @Test
    fun detectionIsSilentWhenDisabled() {
        processor.process(button("key:BUTTON_A", true))
        assertTrue(detections.isEmpty())
        assertEquals("key:BUTTON_A" to SourceKind.DIGITAL, identified.single())
    }

    @Test
    fun mouseMovementIsDetectedAndDrivesStick() {
        processor.detecting = true
        repeat(5) { processor.process(RawEvent.Motion("dev", 10f, 0f, clock.now)) }
        val d = detections.single()
        assertEquals("mouse:x", d.sourceId)
        assertEquals("MOVED", d.state)
        assertEquals(SourceKind.RELATIVE, d.kind)
        assertTrue(controllers.left.stickX > 0.5f)
        assertTrue(identified.contains("mouse:x" to SourceKind.RELATIVE))
    }

    @Test
    fun wheelPulseIsReleasedOnTick() {
        processor.process(RawEvent.Pulse("dev", "mouse:wheel:up", clock.now))
        assertTrue(controllers.left.button("minus"))
        assertTrue(processor.needsTick())
        clock.advance(InputProcessor.PULSE_MS + 1)
        assertTrue(processor.tick(clock.now))
        assertFalse(controllers.left.button("minus"))
        assertFalse(processor.needsTick())
    }

    @Test
    fun releaseAllClearsEverything() {
        processor.process(button("mouse:btn:primary", true))
        processor.process(button("key:BUTTON_4", true))
        processor.process(RawEvent.Motion("dev", 40f, 0f, clock.now))
        processor.releaseAll("controller disconnected")
        assertFalse(controllers.right.button("a"))
        assertEquals(0f, controllers.right.trigger, 0f)
        assertEquals(0f, controllers.left.stickX, 0f)
        assertTrue(processor.state.pressedIds().isEmpty())
        assertEquals("Todos os botões foram soltos (controller disconnected)", log.recent(1).single().text)
    }

    @Test
    fun statsMeasureRateAndLatency() {
        processor.process(RawEvent.Button("dev", "key:BUTTON_A", true, clock.now - 8))
        processor.process(RawEvent.Motion("dev", 1f, 1f, clock.now - 4, samples = 3))
        clock.advance(1000)
        assertTrue(processor.stats.roll(clock.now))
        val s = processor.stats.last
        assertEquals(2, s.eventsPerSec)
        assertEquals(3, s.motionHz)
        assertEquals(6f, s.latencyAvgMs!!, 1e-4f)
        assertEquals(8L, s.latencyMaxMs)
        assertEquals(2L, s.totalEvents)
    }

    @Test
    fun latencyIsNotReportedForEventsWithoutTimestamp() {
        processor.process(RawEvent.Button("dev", "key:BUTTON_A", true, 0))
        clock.advance(1000)
        processor.stats.roll(clock.now)
        assertNull(processor.stats.last.latencyAvgMs)
    }

    @Test
    fun eventLogIsBounded() {
        val small = EventLog(20)
        repeat(50) { small.add(EventLog.SYSTEM, "e$it", 0) }
        assertEquals(20, small.size)
        assertEquals("e49", small.recent(1).single().text)
        assertEquals(listOf("e48", "e49"), small.since(small.lastSeq - 2).map { it.text })
    }
}
