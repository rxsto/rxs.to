"use client";

import { memo, useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import type { MotionValue, Transition } from "motion/react";
import { ArrowUpRight, Check, Copy, Send, TriangleAlert } from "lucide-react";
import { motionTokens } from "../../lib/motion-tokens";
import { useCopyFeedback } from "../../lib/use-copy-feedback";
import styles from "./scroll-story.module.css";

/** Eases the copy label's width to `target` on a spring with no overshoot. The first measurement lands at once, so the control
 *  starts at its current word's width instead of the widest one. */
function useFitWidth(target: number | undefined, reduced: boolean | null | undefined) {
  const width = useMotionValue<number | "auto">("auto");
  const placed = useRef(false);
  useLayoutEffect(() => {
    if (!target) return;
    if (!placed.current || reduced) { placed.current = true; width.jump(target); return; }
    const controls = animate(width, target, { type: "spring", visualDuration: .22, bounce: 0 });
    return () => controls.stop();
  }, [target, reduced, width]);
  return width;
}

const { spring, duration, ease, blur } = motionTokens;
const enterEase = [...ease.enter] as [number, number, number, number];
const standardEase = [...ease.standard] as [number, number, number, number];
/** Spring tokens restated as stiffness and damping, so a retarget keeps its velocity instead of restarting from rest. */
const physical = ({ visualDuration, bounce }: { visualDuration: number; bounce: number }): Transition => {
  const root = 2 * Math.PI / (visualDuration * 1.2);
  return { type: "spring", stiffness: root * root, damping: 2 * (1 - bounce) * root, mass: 1 };
};
const sortSpring = physical({ visualDuration: .5, bounce: 0 });
const settle = physical(spring.smooth);
const rise = physical({ visualDuration: .46, bounce: 0 });

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

type Step = { id: string; tab: string; title: string; body: string; status: string };
const STEPS: Step[] = [
  { id: "collect", tab: "Collect", title: "Every request in one place", body: "Beacon pulls feedback from email, chat, surveys, and call notes into a single inbox, with the customer and their plan attached to every message.", status: "6 new" },
  { id: "sort", tab: "Sort", title: "Sorted before you read it", body: "Each message is tagged by theme the moment it arrives, so related requests line up next to each other without anyone triaging the queue.", status: "3 themes" },
  { id: "measure", tab: "Measure", title: "See what is growing", body: "Themes turn into trends. Watch a request climb week over week and know when it has quietly become the next thing to build.", status: "Last 8 weeks" },
  { id: "share", tab: "Share", title: "Close the loop", body: "Send a live trend to your team or a channel. Everyone sees the same numbers, and they update as new feedback comes in.", status: "Shared view" },
];

type Theme = "Export" | "Mobile" | "Billing";
type Message = { id: string; name: string; photo: string; source: string; text: string; theme: Theme };
/** Portraits from public/media/people; see public/media/CREDITS.md. Names and messages are sample content. */
const MESSAGES: Message[] = [
  { id: "m1", name: "Jasmine Brooks", photo: "/media/people/jasmine-brooks.svg", source: "Email", text: "Can we export reports to CSV?", theme: "Export" },
  { id: "m2", name: "Tyler Hayes", photo: "/media/people/tyler-hayes.svg", source: "Chat", text: "The iPhone app keeps logging me out", theme: "Mobile" },
  { id: "m3", name: "Hannah Walsh", photo: "/media/people/hannah-walsh.svg", source: "Survey", text: "We need a PDF of each monthly invoice", theme: "Billing" },
  { id: "m4", name: "Andre Williams", photo: "/media/people/andre-williams.svg", source: "Call notes", text: "Scheduled exports to our warehouse?", theme: "Export" },
  { id: "m5", name: "Ava Mitchell", photo: "/media/people/ava-mitchell.svg", source: "Chat", text: "Offline mode for the Android app, please", theme: "Mobile" },
  { id: "m6", name: "Nathan Cole", photo: "/media/people/nathan-cole.svg", source: "Email", text: "Bulk export of every comment thread", theme: "Export" },
];
const THEMES: { theme: Theme; count: number }[] = [{ theme: "Export", count: 42 }, { theme: "Mobile", count: 27 }, { theme: "Billing", count: 12 }];
/** Weekly export requests over the last eight weeks. */
const TREND = [8, 11, 10, 15, 19, 18, 26, 31];
const TEAM = [
  { name: "Olivia Bennett", photo: "/media/people/olivia-bennett.svg", access: "Owner" },
  { name: "Marcus Johnson", photo: "/media/people/marcus-johnson.svg", access: "Can edit" },
  { name: "Chloe Nguyen", photo: "/media/people/chloe-nguyen.svg", access: "Can view" },
];
const LINK = "beacon.example/t/export-requests";

/** Chart geometry in viewBox units. */
const CHART = { w: 300, h: 96, pad: 6 };
const chartPoints = TREND.map((value, i) => ({ x: CHART.pad + i * (CHART.w - CHART.pad * 2) / (TREND.length - 1), y: CHART.h - CHART.pad - value / 34 * (CHART.h - CHART.pad * 2) }));
/** A smooth line through the points (Catmull-Rom as cubic Béziers). */
const chartPath = chartPoints.reduce((d, p, i, all) => {
  if (i === 0) return `M${p.x},${p.y}`;
  const p0 = all[i - 2] ?? all[i - 1], p1 = all[i - 1], p2 = p, p3 = all[i + 1] ?? p;
  const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 }, c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
  return `${d} C${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`;
}, "");
const last = chartPoints[chartPoints.length - 1];

/**
 * A feature section driven by scroll. The copy steps scroll past while a sticky product view assembles and changes with them:
 * messages arrive, sort themselves by theme, fold into a trend that draws as you read, and end in a share sheet.
 * The step tabs double as the progress indicator; click one to scroll to its step. Below 700px the view stacks above the copy and stays pinned.
 */
export function ScrollStory() {
  const reduced = !!useReducedMotion();
  const headingId = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(0), arrivedRef = useRef(3);
  const [active, setActive] = useState(0);
  const [arrived, setArrived] = useState(3);
  const [compact, setCompact] = useState(false);
  const progress = useMotionValue(0);

  /** Reads where the reading line falls: the middle of the viewport, or the middle of what is left under the pinned view when stacked. */
  const measure = useCallback(() => {
    const viewport = viewportRef.current, visual = visualRef.current;
    if (!viewport || !visual) return;
    const vr = viewport.getBoundingClientRect(), pr = visual.getBoundingClientRect();
    const stacked = pr.width > vr.width * .75;
    const line = stacked ? (pr.bottom + vr.bottom) / 2 : vr.top + vr.height / 2;
    let p = 0;
    stepRefs.current.forEach((node, i) => {
      if (!node) return;
      const r = node.getBoundingClientRect();
      if (line >= r.top) p = i + clamp((line - r.top) / r.height, 0, 1);
    });
    progress.set(p);
    const nextActive = Math.min(STEPS.length - 1, Math.floor(p));
    if (nextActive !== activeRef.current) { activeRef.current = nextActive; setActive(nextActive); }
    // Messages keep arriving as you read the first step; by the second they are all in.
    const nextArrived = nextActive >= 1 ? MESSAGES.length : clamp(3 + Math.floor(p * 5), 3, MESSAGES.length);
    if (nextArrived !== arrivedRef.current) { arrivedRef.current = nextArrived; setArrived(nextArrived); }
  }, [progress]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let frame = 0;
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); };
    viewport.addEventListener("scroll", schedule, { passive: true });
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(entries => {
      setCompact(entries[0].contentRect.width < 700);
      schedule();
    });
    observer?.observe(viewport);
    schedule();
    return () => { cancelAnimationFrame(frame); viewport.removeEventListener("scroll", schedule); observer?.disconnect(); };
  }, [measure]);

  const goTo = (index: number) => {
    const viewport = viewportRef.current, visual = visualRef.current, step = stepRefs.current[index];
    if (!viewport || !visual || !step) return;
    const vr = viewport.getBoundingClientRect(), pr = visual.getBoundingClientRect(), r = step.getBoundingClientRect();
    const stacked = pr.width > vr.width * .75;
    const line = stacked ? (pr.bottom + vr.bottom) / 2 : vr.top + vr.height / 2;
    // Land a little past the step's top edge, so its copy sits on the reading line and the view has already turned.
    viewport.scrollBy({ top: r.top + Math.min(r.height * .35, 120) - line, behavior: reduced ? "auto" : "smooth" });
  };

  return <section className={styles.root} aria-labelledby={headingId}>
    <div ref={viewportRef} className={styles.viewport} tabIndex={0} role="region" aria-label="Beacon product story, scroll to advance">
      <div className={styles.track}>
        <div ref={visualRef} className={styles.visualCol}>
          <ProductView active={active} arrived={arrived} progress={progress} compact={compact} reduced={reduced} onStep={goTo} />
        </div>
        <div className={styles.copy}>
          <header className={styles.intro}>
            <h2 id={headingId} className={styles.heading}>From scattered feedback to a clear next step</h2>
            <p className={styles.lede}>Beacon collects what customers ask for and shows you what matters most.</p>
          </header>
          <ol className={styles.steps}>
            {STEPS.map((step, i) => <li key={step.id} ref={node => { stepRefs.current[i] = node; }} className={styles.step} data-active={i === active || undefined} aria-current={i === active ? "step" : undefined}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </li>)}
          </ol>
        </div>
      </div>
    </div>
  </section>;
}

type ViewProps = { active: number; arrived: number; progress: MotionValue<number>; compact: boolean; reduced: boolean; onStep: (index: number) => void };

/** The pinned product view. Its tabs are the step list and the progress indicator at once. */
function ProductView({ active, arrived, progress, compact, reduced, onStep }: ViewProps) {
  const step = STEPS[active];
  return <div className={styles.card}>
    <div className={styles.cardHead}>
      <span className={styles.brand}><span className={styles.mark} aria-hidden="true" />Beacon</span>
      <span className={styles.status} aria-live="polite">
        <AnimatePresence initial={false}>
          <motion.span key={step.status} className={styles.statusItem}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6, filter: `blur(${blur.subtle}px)` }} animate={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
            exit={{ opacity: 0, transition: { duration: duration.instant } }} transition={{ duration: duration.standard, ease: enterEase }}>{step.status}</motion.span>
        </AnimatePresence>
      </span>
    </div>
    <div className={styles.tabs} role="tablist" aria-label="Story steps" onKeyDown={e => {
      const next = e.key === "ArrowRight" ? Math.min(STEPS.length - 1, active + 1) : e.key === "ArrowLeft" ? Math.max(0, active - 1)
        : e.key === "Home" ? 0 : e.key === "End" ? STEPS.length - 1 : null;
      if (next === null) return;
      e.preventDefault();
      onStep(next);
      (e.currentTarget.children[next] as HTMLElement | undefined)?.focus();
    }}>
      {STEPS.map((s, i) => <Tab key={s.id} index={i} label={s.tab} selected={i === active} progress={progress} reduced={reduced} onSelect={() => onStep(i)} />)}
    </div>
    <div className={styles.canvas} data-compact={compact || undefined}>
      <Inbox active={active} arrived={arrived} compact={compact} reduced={reduced} />
      <Trend active={active} progress={progress} reduced={reduced} />
      <ShareSheet open={active === 3} reduced={reduced} />
    </div>
  </div>;
}

function Tab({ index, label, selected, progress, reduced, onSelect }: { index: number; label: string; selected: boolean; progress: MotionValue<number>; reduced: boolean; onSelect: () => void }) {
  const fill = useTransform(progress, [index, index + 1], [0, 1]);
  const reached = useTransform(progress, v => (v >= index ? 1 : 0));
  return <button type="button" role="tab" aria-selected={selected} tabIndex={selected ? 0 : -1} className={styles.tab} onClick={onSelect}>
    <span className={styles.tabLabel}>{label}</span>
    <span className={styles.tabTrack} aria-hidden="true">
      <motion.span className={styles.tabFill} style={{ scaleX: reduced ? reached : fill }} />
    </span>
  </button>;
}

const ROW = { wide: 40, compact: 36 }, HEADER = 24, GAP = 4;

/** Six messages. In arrival order they stack as they come in; sorted, they regroup under their themes on a spring, one after another. */
/** Where each row and group header sits, in arrival order or grouped by theme. `order` is a row's place in the sorted list, which staggers the regroup. */
function inboxLayout(sorted: boolean, compact: boolean) {
  const row = compact ? ROW.compact : ROW.wide;
  const positions = new Map<string, { y: number; order: number }>(), headers: { theme: Theme; y: number; count: number }[] = [];
  if (!sorted) MESSAGES.forEach((m, i) => positions.set(m.id, { y: i * (row + GAP), order: i }));
  else {
    let y = 0;
    for (const { theme } of THEMES) {
      const members = MESSAGES.filter(m => m.theme === theme);
      if (!compact) { headers.push({ theme, y, count: members.length }); y += HEADER; }
      for (const m of members) { positions.set(m.id, { y, order: positions.size }); y += row + GAP; }
    }
  }
  return { row, positions, headers };
}

/** Memoized: it only changes when the step, the arrival count, or the layout width changes, not on every scroll frame. */
const Inbox = memo(function Inbox({ active, arrived, compact, reduced }: { active: number; arrived: number; compact: boolean; reduced: boolean }) {
  const sorted = active >= 1;
  const gone = active >= 2;
  const { row, positions, headers } = useMemo(() => inboxLayout(sorted, compact), [sorted, compact]);
  return <div className={styles.inbox} aria-hidden={gone || undefined}>
    <p className={styles.srOnly}>{sorted ? "Inbox sorted by theme: Export has 3 messages, Mobile 2, Billing 1." : `Inbox with ${arrived} new messages.`}</p>
    {/* Headers start at their own slot, so they fade in place instead of sliding down from the top, and fade out when the inbox unsorts. */}
    <AnimatePresence initial={false}>
      {headers.map(h => <motion.p key={h.theme} className={styles.group} aria-hidden="true"
        initial={reduced ? { opacity: 0, y: h.y } : { opacity: 0, x: -6, y: h.y }} animate={{ opacity: gone ? 0 : 1, x: 0, y: h.y }}
        exit={{ opacity: 0, transition: { duration: reduced ? 0 : duration.fast, ease: standardEase } }}
        transition={reduced ? { duration: duration.fast } : { opacity: { duration: duration.standard, delay: gone ? 0 : .18 }, x: settle, y: sortSpring }}>
        {h.theme}<span className={styles.groupCount}>{h.count}</span>
      </motion.p>)}
    </AnimatePresence>
    {MESSAGES.map((m, i) => {
      const shown = !gone && (sorted || i < arrived);
      const { y, order } = positions.get(m.id) ?? { y: 0, order: i };
      return <motion.div key={m.id} className={styles.row} style={{ height: row }} aria-hidden="true"
        initial={false}
        animate={{ y: y + (shown || reduced ? 0 : gone ? -10 : 10), opacity: shown ? 1 : 0, scale: shown || reduced ? 1 : .98 }}
        transition={reduced ? { duration: duration.fast } : {
          y: { ...sortSpring, delay: gone ? i * .025 : sorted ? order * .035 : 0 },
          scale: settle,
          opacity: { duration: duration.standard, ease: shown ? enterEase : standardEase, delay: gone ? i * .025 : 0 },
        }}>
        <Image src={m.photo} alt="" width={28} height={28} className={styles.avatar} />
        <span className={styles.rowText}>
          <span className={styles.rowTop}><span className={styles.rowName}>{m.name}</span><span className={styles.rowSource}>{m.source}</span></span>
          <span className={styles.rowMessage}>{m.text}</span>
        </span>
        <motion.span className={styles.tag} initial={false}
          animate={{ opacity: sorted ? 1 : 0, scale: sorted || reduced ? 1 : .9 }}
          transition={reduced ? { duration: duration.fast } : { ...settle, opacity: { duration: duration.fast, delay: sorted ? .1 + order * .035 : 0 } }}>{m.theme}</motion.span>
      </motion.div>;
    })}
  </div>;
});

/** The export theme as a trend. The line draws with the reader's scroll through the step; the count and bars follow once it is on screen. */
const Trend = memo(function Trend({ active, progress, reduced }: { active: number; progress: MotionValue<number>; reduced: boolean }) {
  const on = active >= 2, behind = active === 3;
  const draw = useTransform(progress, [2.02, 2.7], [0, 1]);
  const dot = useTransform(draw, [.94, 1], [0, 1]);
  const count = useMotionValue(0);
  const shown = useTransform(count, v => Math.round(v).toString());

  useLayoutEffect(() => {
    const target = on ? TREND[TREND.length - 1] : 0;
    if (reduced) { count.jump(target); return; }
    const controls = animate(count, target, { duration: on ? .9 : .2, ease: enterEase });
    return () => controls.stop();
  }, [on, reduced, count]);

  return <motion.div className={styles.trend} aria-hidden={!on || undefined} initial={false}
    animate={{ opacity: on ? (behind ? .45 : 1) : 0, y: on || reduced ? 0 : 12, scale: behind && !reduced ? .96 : 1 }}
    transition={reduced ? { duration: duration.fast } : { opacity: { duration: duration.standard, delay: on && !behind ? .18 : 0 }, y: settle, scale: settle }}>
    <div className={styles.trendHead}>
      <div>
        <p className={styles.trendLabel}>Export requests per week</p>
        <p className={styles.trendValue}><motion.span className={styles.num}>{shown}</motion.span><span className={styles.srOnly}>{TREND[TREND.length - 1]} this week</span><span className={styles.trendUnit} aria-hidden="true">this week</span></p>
      </div>
      <p className={styles.delta}><ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />288%<span className={styles.deltaNote}>since July</span></p>
    </div>
    <div className={styles.chartBox}>
    <svg className={styles.chart} viewBox={`0 0 ${CHART.w} ${CHART.h}`} preserveAspectRatio="none" aria-hidden="true">
      {[.25, .5, .75].map(t => <line key={t} x1={0} x2={CHART.w} y1={CHART.h * t} y2={CHART.h * t} className={styles.gridLine} />)}
      <motion.path d={chartPath} className={styles.line} style={{ pathLength: reduced ? 1 : draw }} />
    </svg>
    <div className={styles.chartDotLayer} aria-hidden="true">
      <motion.span className={styles.chartDot} style={{ left: `${last.x / CHART.w * 100}%`, top: `${last.y / CHART.h * 100}%`, opacity: reduced ? (on ? 1 : 0) : dot }} />
    </div>
    </div>
    <ul className={styles.bars}>
      {THEMES.map((t, i) => <li key={t.theme} className={styles.bar}>
        <span className={styles.barLabel}>{t.theme}</span>
        <span className={styles.barTrack} aria-hidden="true">
          <motion.span className={styles.barFill} initial={false} animate={{ scaleX: on ? t.count / THEMES[0].count : 0 }}
            transition={reduced ? { duration: 0 } : { ...settle, delay: on ? .3 + i * .06 : 0 }} />
        </span>
        <span className={styles.barValue}>{t.count}</span>
      </li>)}
    </ul>
  </motion.div>;
});

/** Copy link faces crossfade centered in one cell that eases to the shown face's measured width with no overshoot, so "Copied"
 *  never sits in space held for "Not copied" and nothing jumps. */
function FitStack({ shown, reduced, children }: { shown: number; reduced: boolean; children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [widths, setWidths] = useState<number[]>([]);
  useLayoutEffect(() => {
    const faces = Array.from(ref.current?.children ?? []) as HTMLElement[];
    const read = () => setWidths(faces.map(face => face.offsetWidth));
    read();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(read);
    faces.forEach(face => observer.observe(face));
    return () => observer.disconnect();
  }, []);
  const fitWidth = useFitWidth(widths[shown], reduced);
  return <motion.span ref={ref} className={styles.copyLayers} style={{ width: fitWidth }}>{children}</motion.span>;
}

/** The success tick draws in one short stroke when it turns on. */
function DrawnCheck({ on, reduced }: { on: boolean; reduced: boolean }) {
  return <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <motion.path d="M4 12l5 5L20 6" initial={false} animate={{ pathLength: on || reduced ? 1 : 0 }} transition={on ? { duration: .22, ease: standardEase, delay: .04 } : { duration: 0, delay: .12 }} />
  </svg>;
}

/** The share sheet rises over the trend. Copy link and Send both act, and answer in place without changing width. */
const ShareSheet = memo(function ShareSheet({ open, reduced }: { open: boolean; reduced: boolean }) {
  const { state, copy } = useCopyFeedback();
  const [sent, setSent] = useState<"idle" | "sending" | "sent">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const send = () => {
    if (timer.current) clearTimeout(timer.current);
    if (sent !== "idle") { setSent("idle"); return; }
    setSent("sending");
    timer.current = setTimeout(() => setSent("sent"), 700);
  };
  return <motion.div className={styles.sheet} role="group" aria-label="Share the export trend" aria-hidden={!open || undefined} inert={!open}
    initial={false} animate={{ y: open || reduced ? 0 : "108%", opacity: open ? 1 : reduced ? 0 : 1 }}
    transition={reduced ? { duration: duration.fast } : { y: open ? rise : settle, opacity: { duration: duration.fast } }}>
    <p className={styles.sheetTitle}>Share “Export requests”</p>
    <ul className={styles.team}>
      {TEAM.map(p => <li key={p.name} className={styles.member}>
        <Image src={p.photo} alt="" width={28} height={28} className={styles.avatar} />
        <span className={styles.memberName}>{p.name}</span>
        <span className={styles.memberAccess}>{p.access}</span>
      </li>)}
    </ul>
    <div className={styles.linkRow}>
      <span className={styles.link}>{LINK}</span>
      <button type="button" className={styles.ghostButton} onClick={() => copy(`https://${LINK}`, "link")} data-state={state}>
        <FitStack shown={state === "copied" ? 1 : state === "error" ? 2 : 0} reduced={reduced}>
          <span className={styles.copyLayer} data-on={state === "idle" || undefined}><Copy size={14} strokeWidth={1.75} aria-hidden="true" />Copy link</span>
          <span className={styles.copyLayer} data-on={state === "copied" || undefined}><DrawnCheck on={state === "copied"} reduced={reduced} />Copied</span>
          <span className={styles.copyLayer} data-on={state === "error" || undefined}><TriangleAlert size={14} strokeWidth={1.75} aria-hidden="true" />Not copied</span>
        </FitStack>
        <span className={styles.srOnly} aria-live="polite">{state === "copied" ? "Link copied" : state === "error" ? "Could not copy the link" : ""}</span>
      </button>
    </div>
    <button type="button" className={styles.sendButton} onClick={send} data-state={sent}>
      <span className={styles.layers}>
        <span className={styles.layer} data-on={sent === "idle" || undefined}><Send size={14} strokeWidth={1.75} aria-hidden="true" />Send to #product-feedback</span>
        <span className={styles.layer} data-on={sent === "sending" || undefined}><span className={styles.spinner} aria-hidden="true" />Sending</span>
        <span className={styles.layer} data-on={sent === "sent" || undefined}><Check size={14} strokeWidth={1.75} aria-hidden="true" />Sent</span>
      </span>
      <span className={styles.srOnly} aria-live="polite">{sent === "sent" ? "Sent to product feedback" : ""}</span>
    </button>
  </motion.div>;
});

export default ScrollStory;
