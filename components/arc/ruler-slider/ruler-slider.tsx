"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform, type AnimationPlaybackControls } from "motion/react";
import { motionTokens } from "../lib/motion-tokens";
import styles from "./ruler-slider.module.css";

export interface RulerSliderProps {
  /** Visible label; it also names the control. */
  label: string;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  /** Runs once the tape comes to rest after a drag, a flick, a tap, or a key. */
  onValueCommit?: (value: number) => void;
  min?: number;
  max?: number;
  /** The value of one small tick. The tape always rests on a tick. */
  step?: number;
  /** PageUp, PageDown, and Shift with an arrow move this far. Defaults to one labelled tick. */
  largeStep?: number;
  /** Small ticks between labelled ticks. */
  majorEvery?: number;
  /** Pixels between small ticks. Wider spacing gives finer control. */
  spacing?: number;
  /** Formats the readout, the tick labels, and the spoken value. */
  format?: (value: number) => string;
  /** Unit shown after the readout and spoken with the value, such as "cm". */
  unit?: string;
  /** Submits the value with a form. */
  name?: string;
  disabled?: boolean;
  className?: string;
}

type Drag = { pointer: number; x: number; from: number; moved: boolean; samples: { t: number; v: number }[] };

const { spring } = motionTokens;
/** Motion drops velocity on time-defined springs, so a key or tap that retargets mid flight runs the same spring as stiffness and damping. */
const physical = ({ visualDuration, bounce }: { visualDuration: number; bounce: number }) => { const root = (2 * Math.PI) / (visualDuration * 1.2); return { type: "spring" as const, stiffness: root * root, damping: 2 * (1 - bounce) * root }; };
const glideSpring = physical(spring.snappy);
/** Pixels the tape may be pulled past either end, and how far a tap may wander before it counts as a drag. */
const STRETCH = 44, TAP_SLOP = 4;
/** Flick momentum: a scroll-like throw (Apple's .998 deceleration projects about half a second of travel) that eases onto a tick. */
const POWER = .42, TIME_CONSTANT = 260;
const rubber = (distance: number, limit = STRETCH) => Math.sign(distance) * (1 - 1 / (Math.abs(distance) * .55 / limit + 1)) * limit;
const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value));
const decimalsOf = (value: number) => (String(value).split(".")[1] ?? "").length;
const isDigit = (char: string) => char >= "0" && char <= "9";
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/** Digits keyed by place value from the right, so a column keeps its identity as the number grows and each one rolls on its own. A column
 * that appears or leaves (99.5 to 100.0) opens or closes its width on a spring, so the centered readout never jumps a digit in one frame. */
function Rolling({ text, reduced }: { text: string; reduced: boolean }) {
  const chars = [...text];
  let place = chars.filter(isDigit).length, run = 0;
  const transition = reduced ? { duration: 0 } : spring.morph;
  return <span className={styles.rolling}><AnimatePresence initial={false}>{chars.map(char => {
    const digit = isDigit(char);
    const key = digit ? `d${--place}` : `s${place}-${run++}`;
    if (digit) run = 0;
    return <motion.span key={key} className={digit ? styles.column : styles.symbol} initial={{ width: 0, opacity: 0 }} animate={{ width: "auto", opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={transition}>
      {digit ? <><span className={styles.sizer}>0</span><span className={styles.strip} style={{ "--digit": Number(char) } as CSSProperties}>{DIGITS.map(value => <span key={value}>{value}</span>)}</span></> : char}
    </motion.span>;
  })}</AnimatePresence></span>;
}

/**
 * A precise value input shaped like a tape measure. A ruler of ticks slides under a fixed needle: drag it 1:1, flick it and it coasts
 * with momentum onto a tick, pull it past either end and it rubber-bands back, or tap a spot to glide it there. The readout rolls each
 * digit as the tape passes. Arrows step one tick, Shift+arrows and PageUp or PageDown move one labelled tick, Home and End go to the ends,
 * and horizontal trackpad scrolling moves the tape.
 */
export function RulerSlider({ label, value, defaultValue, onValueChange, onValueCommit, min = 0, max = 100, step: stepProp = 1, largeStep, majorEvery = 10, spacing = 10, format, unit, name, disabled, className }: RulerSliderProps) {
  const reduced = useReducedMotion() ?? false;
  const labelId = useId();
  const step = stepProp > 0 ? stepProp : 1;
  const decimals = Math.max(decimalsOf(step), decimalsOf(min));
  const perUnit = spacing / step;
  const snap = (input: number) => clamp(Number((min + Math.round((input - min) / step) * step).toFixed(decimals)), min, max);
  const [internal, setInternal] = useState(() => snap(defaultValue ?? min));
  const current = value === undefined ? internal : snap(value);
  const formatValue = format ?? ((input: number) => input.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }));
  const large = largeStep ?? step * majorEvery;

  const viewportRef = useRef<HTMLDivElement>(null);
  const latest = useRef(current);
  const drag = useRef<Drag | null>(null);
  const flight = useRef<AnimationPlaybackControls | null>(null);
  const coasting = useRef(false);
  const wheelTimer = useRef<number | undefined>(undefined);
  const [dragging, setDragging] = useState(false);
  // `pos` is the value under the needle as a float; the tape is drawn from it, and whole ticks are committed as they pass the needle.
  const pos = useMotionValue(current);
  const x = useTransform(pos, at => -(at - min) * perUnit);

  const emit = (next: number) => {
    if (latest.current === next) return;
    latest.current = next;
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };
  const stop = () => { flight.current?.stop(); flight.current = null; coasting.current = false; };
  /** Lands the tape on a value. Keys and taps glide on a spring that keeps any speed already in the tape. */
  function glideTo(next: number, commit = true) {
    stop();
    emit(next);
    if (reduced) pos.jump(next);
    else flight.current = animate(pos, next, { ...glideSpring, velocity: pos.getVelocity(), restDelta: step / 200, restSpeed: step / 20 });
    if (commit) onValueCommit?.(next);
  }

  // A value from outside (a reset, a linked field) moves the tape there. Values this component emitted are already under the needle.
  useLayoutEffect(() => {
    if (current === latest.current) return;
    latest.current = current;
    stop();
    if (reduced) pos.jump(current); else flight.current = animate(pos, current, glideSpring);
  });
  // While the tape coasts after a flick, every tick it lands under the needle is the new value, so the readout rolls with it.
  useEffect(() => pos.on("change", at => { if (coasting.current && !drag.current) emit(snap(at)); }));
  useEffect(() => () => { stop(); window.clearTimeout(wheelTimer.current); }, []);

  // Horizontal trackpad scrolling moves the tape; vertical scrolling is left to the page.
  useEffect(() => {
    const node = viewportRef.current;
    if (!node || disabled) return;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      stop();
      const next = clamp(pos.get() + event.deltaX / perUnit, min, max);
      pos.set(next);
      emit(snap(next));
      window.clearTimeout(wheelTimer.current);
      wheelTimer.current = window.setTimeout(() => glideTo(snap(pos.get())), 120);
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  });

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (disabled || event.button !== 0 || !event.isPrimary) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.focus({ preventScroll: true });
    // Grabbing a coasting tape catches it where it is, like a finger on a spinning wheel.
    stop();
    drag.current = { pointer: event.pointerId, x: event.clientX, from: pos.get(), moved: false, samples: [{ t: event.timeStamp, v: pos.get() }] };
  }
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    if (!state || state.pointer !== event.pointerId) return;
    const dx = event.clientX - state.x;
    if (!state.moved) { if (Math.abs(dx) < TAP_SLOP) return; state.moved = true; setDragging(true); }
    const raw = state.from - dx / perUnit;
    const edge = clamp(raw, min, max);
    const placed = reduced ? edge : edge + rubber((raw - edge) * perUnit) / perUnit;
    pos.set(placed);
    state.samples.push({ t: event.timeStamp, v: placed });
    if (state.samples.length > 6) state.samples.shift();
    emit(snap(edge));
  }
  function onPointerEnd(event: PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    if (!state || state.pointer !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
    if (!state.moved) {
      // A tap glides the tape so the tapped tick comes to the needle.
      if (event.type !== "pointerup") return;
      const rect = viewportRef.current?.getBoundingClientRect();
      if (rect) glideTo(snap(pos.get() + (event.clientX - (rect.left + rect.width / 2)) / perUnit));
      return;
    }
    const samples = state.samples, first = samples[0]!, last = samples[samples.length - 1]!;
    const elapsed = (last.t - first.t) / 1000;
    const velocity = event.type === "pointerup" && elapsed > .008 && event.timeStamp - last.t < 60 ? (last.v - first.v) / elapsed : 0;
    if (reduced) { const next = snap(pos.get()); pos.jump(next); emit(next); onValueCommit?.(next); return; }
    const release = pos.get();
    const done = () => { flight.current = null; coasting.current = false; const next = snap(pos.get()); emit(next); onValueCommit?.(next); };
    coasting.current = true;
    if (release < min || release > max) {
      // Past an end the band pulls the tape home with the speed it was thrown at.
      flight.current = animate(pos, clamp(release, min, max), { ...physical({ visualDuration: .5, bounce: .1 }), velocity, onComplete: done });
      return;
    }
    // The target is where the throw lands; Motion skips an animation whose target equals where it starts.
    flight.current = animate(pos, snap(release + POWER * velocity), { type: "inertia", velocity, power: POWER, timeConstant: TIME_CONSTANT, modifyTarget: target => snap(target), min, max, bounceStiffness: 420, bounceDamping: 36, restDelta: step / 200, onComplete: done });
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;
    const now = latest.current;
    const moves: Record<string, number> = { ArrowRight: step, ArrowUp: step, ArrowLeft: -step, ArrowDown: -step, PageUp: large, PageDown: -large };
    let wanted: number;
    if (event.key === "Home") wanted = min;
    else if (event.key === "End") wanted = max;
    else if (event.key in moves) wanted = now + (event.shiftKey && event.key.startsWith("Arrow") ? Math.sign(moves[event.key]!) * large : moves[event.key]!);
    else return;
    event.preventDefault();
    const next = snap(wanted);
    if (next === now) return;
    glideTo(next);
  }

  const text = formatValue(current);
  const majorStep = step * majorEvery;
  // Tick labels only carry the decimals their own spacing needs, so a half-kilo scale reads 30, 35, 40.
  const labelFormat = format ?? ((input: number) => input.toLocaleString("en-US", { maximumFractionDigits: decimalsOf(Number(majorStep.toFixed(decimals))) }));
  const majors = Array.from({ length: Math.floor((max - min) / majorStep + 1e-9) + 1 }, (_, index) => Number((min + index * majorStep).toFixed(decimals)));
  const tapeStyle = { "--spacing": `${spacing}px`, "--major": `${spacing * majorEvery}px`, "--half": majorEvery % 2 === 0 ? `${(spacing * majorEvery) / 2}px` : "0px", width: (max - min) * perUnit + 1 } as CSSProperties;

  return <div className={[styles.root, className].filter(Boolean).join(" ")} data-disabled={disabled || undefined} data-dragging={dragging || undefined}>
    <span id={labelId} className={styles.label}>{label}</span>
    <div className={styles.readout} aria-hidden="true"><Rolling text={text} reduced={reduced} />{unit && <span className={styles.unit}>{unit}</span>}</div>
    <div ref={viewportRef} className={styles.viewport} role="slider" tabIndex={disabled ? -1 : 0} aria-labelledby={labelId} aria-valuemin={min} aria-valuemax={max} aria-valuenow={current} aria-valuetext={unit ? `${text} ${unit}` : text} aria-orientation="horizontal" aria-disabled={disabled || undefined}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd} onLostPointerCapture={onPointerEnd} onKeyDown={onKeyDown}>
      <div className={styles.fade}>
        <motion.div className={styles.tape} style={{ ...tapeStyle, x }}>
          <span className={styles.ticks} />
          {majors.map((mark, index) => <span key={mark} className={styles.tickLabel} style={{ left: index * spacing * majorEvery }}>{labelFormat(mark)}</span>)}
        </motion.div>
      </div>
      <span className={styles.needle} aria-hidden="true" />
    </div>
    {name && <input type="hidden" name={name} value={current} disabled={disabled} />}
  </div>;
}

export default RulerSlider;
