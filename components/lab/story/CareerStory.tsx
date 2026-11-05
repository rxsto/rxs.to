'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { motionTokens } from '@/components/arc/lib/motion-tokens';
import { chapters } from '../content';
import arc from './arc-story.module.css';
import styles from './story.module.css';

const { duration, ease, blur, spring } = motionTokens;
const enterEase = [...ease.enter] as [number, number, number, number];
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const first = Number(chapters[0].year), last = Number(chapters[chapters.length - 1].year);
const positions = chapters.map(chapter => (Number(chapter.year) - first) / (last - first) * 100);

export function CareerStory() {
  const reduced = !!useReducedMotion();
  const headingId = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const progress = useMotionValue(0);

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
    progress.set(Math.min(p, chapters.length - 1));
    const next = Math.min(chapters.length - 1, Math.floor(p));
    if (next !== activeRef.current) { activeRef.current = next; setActive(next); }
  }, [progress]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let frame = 0;
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); };
    viewport.addEventListener('scroll', schedule, { passive: true });
    const observer = new ResizeObserver(schedule);
    observer.observe(viewport);
    schedule();
    return () => { cancelAnimationFrame(frame); viewport.removeEventListener('scroll', schedule); observer.disconnect(); };
  }, [measure]);

  const goTo = (index: number) => {
    const viewport = viewportRef.current, visual = visualRef.current, step = stepRefs.current[index];
    if (!viewport || !visual || !step) return;
    const vr = viewport.getBoundingClientRect(), pr = visual.getBoundingClientRect(), r = step.getBoundingClientRect();
    const line = pr.width > vr.width * .75 ? (pr.bottom + vr.bottom) / 2 : vr.top + vr.height / 2;
    viewport.scrollBy({ top: r.top + Math.min(r.height * .35, 120) - line, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section className={arc.root} aria-labelledby={headingId}>
      <div ref={viewportRef} className={arc.viewport} tabIndex={0} role="region" aria-label="Career story, scroll to advance">
        <div className={arc.track}>
          <div ref={visualRef} className={arc.visualCol}>
            <ChapterView active={active} progress={progress} reduced={reduced} onStep={goTo} />
          </div>
          <div className={arc.copy}>
            <header className={arc.intro}>
              <h2 id={headingId} className={arc.heading}>Eight years of building in public</h2>
              <p className={arc.lede}>From a music bot at 16 to five teams at once.</p>
            </header>
            <ol className={arc.steps}>
              {chapters.map((chapter, i) => (
                <li key={chapter.id} ref={node => { stepRefs.current[i] = node; }} className={arc.step} data-active={i === active || undefined} aria-current={i === active ? 'step' : undefined}>
                  <h3 className={arc.stepTitle}>{chapter.title}</h3>
                  <p className={arc.stepBody}>{chapter.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChapterView({ active, progress, reduced, onStep }: { active: number; progress: MotionValue<number>; reduced: boolean; onStep: (index: number) => void }) {
  const chapter = chapters[active];
  const marker = useTransform(progress, chapters.map((_, i) => i), positions.map(x => `${x}%`));
  const enter = reduced ? { opacity: 0 } : { opacity: 0, y: 18, filter: `blur(${blur.soft}px)` };
  const leave = reduced ? { opacity: 0 } : { opacity: 0, y: -14, filter: `blur(${blur.subtle}px)`, transition: { duration: duration.fast } };
  return (
    <div className={arc.card}>
      <div className={arc.cardHead}>
        <span className={arc.brand}><img src="/avatar.png" alt="" width="20" height="20" className={styles.mark} />Oskar Lang</span>
        <span className={arc.status} aria-live="polite">{chapter.year}</span>
      </div>
      <div className={arc.tabs} style={{ gridTemplateColumns: `repeat(${chapters.length}, minmax(0, 1fr))` }} role="tablist" aria-label="Years" onKeyDown={event => {
        const next = event.key === 'ArrowRight' ? Math.min(chapters.length - 1, active + 1) : event.key === 'ArrowLeft' ? Math.max(0, active - 1) : null;
        if (next === null) return;
        event.preventDefault();
        onStep(next);
        (event.currentTarget.children[next] as HTMLElement | undefined)?.focus();
      }}>
        {chapters.map((c, i) => <Tab key={c.id} index={i} label={c.year} selected={i === active} progress={progress} reduced={reduced} onSelect={() => onStep(i)} />)}
      </div>
      <div className={styles.canvas}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={chapter.id} className={styles.slide} initial={enter} animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }} exit={leave}
            transition={reduced ? { duration: 0 } : { y: spring.smooth, opacity: { duration: duration.standard, ease: enterEase }, filter: { duration: duration.standard, ease: enterEase } }}>
            <span className={styles.metric}>{chapter.metric}</span>
            <span className={styles.metricLabel}>{chapter.metricLabel}</span>
          </motion.div>
        </AnimatePresence>
        <div className={styles.ruler} aria-hidden="true">
          <span className={styles.line} />
          {chapters.map((c, i) => <span key={c.id} className={styles.tick} style={{ left: `${positions[i]}%` }} data-reached={i <= active || undefined}>{(i === 0 || i === chapters.length - 1) && <span>{c.year}</span>}</span>)}
          <motion.span className={styles.marker} style={{ left: marker }} />
        </div>
      </div>
    </div>
  );
}

function Tab({ index, label, selected, progress, reduced, onSelect }: { index: number; label: string; selected: boolean; progress: MotionValue<number>; reduced: boolean; onSelect: () => void }) {
  const fill = useTransform(progress, [index, index + 1], [0, 1]);
  const reached = useTransform(progress, v => (v >= index ? 1 : 0));
  return (
    <button type="button" role="tab" aria-selected={selected} tabIndex={selected ? 0 : -1} className={arc.tab} onClick={onSelect}>
      <span className={arc.tabLabel}>{label}</span>
      <span className={arc.tabTrack} aria-hidden="true"><motion.span className={arc.tabFill} style={{ scaleX: reduced ? reached : fill }} /></span>
    </button>
  );
}
