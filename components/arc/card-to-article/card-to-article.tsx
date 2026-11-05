"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import type { Transition } from "motion/react";
import { X } from "lucide-react";
import { motionTokens } from "../lib/motion-tokens";
import styles from "./card-to-article.module.css";

export interface ArticleItem {
  id: string;
  title: string;
  /** A short label on the card, such as a category. */
  tag?: string;
  /** Small print under the title, such as "4 min read". */
  meta?: string;
  image: string;
  imageAlt: string;
  /** The article body shown under the hero once the card opens. */
  body: ReactNode;
}

export interface CardToArticleProps {
  items: ArticleItem[];
  /** Id of the open article, or null. Leave it out for uncontrolled use. */
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (id: string | null) => void;
  /** Width to height ratio of the card and the article hero. They match, so the morph is a pure scale. */
  aspectRatio?: number;
  /** Accessible name of the close button. */
  closeLabel?: string;
  className?: string;
}

/** The open and close morph. A touch of bounce on open, none on close so the card lands flush in its slot. */
const expand: Transition = { type: "spring", visualDuration: .52, bounce: 0 };
const collapse: Transition = { type: "spring", visualDuration: .44, bounce: 0 };
const instant: Transition = { duration: 0 };
const { ease } = motionTokens;
const PULL_CLOSE = 120;

const subscribe = () => () => {};
function useHydrated() { return useSyncExternalStore(subscribe, () => true, () => false); }

interface Box { top: number; left: number; width: number; height: number }
interface Sheet { id: string; box: Box; open: boolean }

function Hero({ item, titleId, onPointerDown }: { item: ArticleItem; titleId?: string; onPointerDown?: (event: ReactPointerEvent<HTMLDivElement>) => void }) {
  const Title = titleId ? "h2" : "span";
  return (
    <div className={styles.hero} onPointerDown={onPointerDown}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.image} src={item.image} alt={titleId ? item.imageAlt : ""} draggable={false} />
      <span className={styles.scrim} aria-hidden="true" />
      {item.tag && <span className={styles.tag}>{item.tag}</span>}
      <span className={styles.caption}>
        <Title id={titleId} className={styles.title}>{item.title}</Title>
        {item.meta && <span className={styles.meta}>{item.meta}</span>}
      </span>
    </div>
  );
}

/**
 * A grid of story cards that open into full articles. The card itself becomes the article: image, title, and surface morph as one
 * piece, the body rises in underneath, and it scrolls. Drag it down, pull past the top, press Escape, or use the close button and it
 * shrinks back into its exact slot in the grid.
 */
export function CardToArticle({ items, value, defaultValue = null, onValueChange, aspectRatio = 4 / 3, closeLabel = "Close article", className }: CardToArticleProps) {
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const hydrated = useHydrated();
  const reduced = !!useReducedMotion() && hydrated;
  const controlled = value !== undefined;
  const [inner, setInner] = useState<string | null>(defaultValue);
  const selected = controlled ? value : inner;

  const [sheet, setSheet] = useState<Sheet | null>(null);
  const slotRefs = useRef(new Map<string, HTMLElement>());
  const cardRefs = useRef(new Map<string, HTMLButtonElement>());
  const scrollerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // The pull gesture: scale and drop the whole sheet a little, like lifting a page off a stack.
  const pull = useMotionValue(0);
  const scale = useTransform(pull, value => 1 - Math.min(value, 480) / 1500);
  const drop = useTransform(pull, value => Math.min(value, 480) * .3);
  const progress = useMotionValue(0);
  function onScroll() {
    const node = scrollerRef.current;
    if (!node) return;
    const range = node.scrollHeight - node.clientHeight;
    progress.set(range > 0 ? node.scrollTop / range : 0);
  }

  /** The card's box as drawn (pressed scale included) when opening, its resting slot when closing. */
  function boxOf(id: string, drawn = false): Box | null {
    const node = drawn ? cardRefs.current.get(id) : slotRefs.current.get(id);
    if (!node) return null;
    const rect = node.getBoundingClientRect();
    return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
  }

  function select(id: string | null) {
    if (!controlled) setInner(id);
    onValueChange?.(id);
  }

  // Selection drives the sheet: open measures the card's slot; close measures it again, since the page may have moved.
  const [seen, setSeen] = useState<string | null>(null);
  if (selected !== seen) {
    setSeen(selected);
    if (selected) setSheet({ id: selected, box: { top: 0, left: 0, width: 0, height: 0 }, open: false });
    else if (sheet) setSheet({ ...sheet, open: false });
  }

  // First frame: sit exactly on the card. Next frame: open, and motion's layout animation carries the card to the sheet.
  useLayoutEffect(() => {
    if (!sheet || sheet.open || !selected || sheet.id !== selected) return;
    if (sheet.box.width === 0) {
      const box = boxOf(sheet.id, true);
      if (box) setSheet({ ...sheet, box }); // eslint-disable-line react-hooks/set-state-in-effect -- measure the card, then place the sheet on it before paint
      return;
    }
    const frame = requestAnimationFrame(() => setSheet(current => current && current.id === selected ? { ...current, open: true } : current));
    return () => cancelAnimationFrame(frame);
  }, [selected, sheet]);

  // Closing re-aims at the slot. Its box is read once per close.
  useLayoutEffect(() => {
    if (!sheet || sheet.open || selected) return;
    const box = boxOf(sheet.id);
    if (box && (box.top !== sheet.box.top || box.left !== sheet.box.left || box.width !== sheet.box.width)) setSheet({ ...sheet, box }); // eslint-disable-line react-hooks/set-state-in-effect -- the slot is re-measured once per close
  }, [selected, sheet]);

  // Lock page scroll while an article is up, keeping the scrollbar's space so the grid does not shift under the card.
  const active = !!sheet;
  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    const gap = window.innerWidth - root.clientWidth;
    const prev = { overflow: root.style.overflow, padding: root.style.paddingRight };
    root.style.overflow = "hidden";
    if (gap > 0) root.style.paddingRight = `${gap}px`;
    return () => { root.style.overflow = prev.overflow; root.style.paddingRight = prev.padding; };
  }, [active]);

  // Focus moves into the article and returns to its card.
  const openId = sheet?.open ? sheet.id : null;
  useEffect(() => {
    if (openId) closeRef.current?.focus({ preventScroll: true });
  }, [openId]);

  function close() {
    if (!selected) return;
    const scroller = scrollerRef.current;
    // Back to the top first, so the hero is where the card will take it from.
    if (scroller) scroller.scrollTop = 0;
    animate(pull, 0, reduced ? instant : collapse);
    select(null);
  }

  function onLayoutDone() {
    if (!sheet || sheet.open || selected) return;
    finish(sheet.id);
  }
  function finish(id: string) {
    const card = cardRefs.current.get(id);
    progress.set(0);
    setSheet(current => current && !current.open && current.id === id ? null : current);
    requestAnimationFrame(() => card?.focus({ preventScroll: true }));
  }

  // A safety net for when no layout animation runs, such as with reduced motion or an unchanged box.
  const closingId = sheet && !sheet.open && !selected ? sheet.id : null;
  useEffect(() => {
    if (!closingId) return;
    const timer = window.setTimeout(() => finish(closingId), reduced ? 0 : 1100);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closingId, reduced]);

  function onKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") { event.stopPropagation(); close(); return; }
    if (event.key !== "Tab") return;
    const focusable = sheetRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex='-1'])");
    if (!focusable?.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  // Pull to dismiss, from touch, a trackpad pulling past the top, or a mouse dragging the hero.
  const gesture = useRef<{ y: number; at: number; lastY: number; lastAt: number; pulling: boolean } | null>(null);
  function release(velocity: number) {
    const amount = pull.get();
    if (amount > PULL_CLOSE || (amount > 24 && velocity > .6)) close();
    else animate(pull, 0, { type: "spring", visualDuration: .38, bounce: 0, velocity: -velocity * 1000 });
  }
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !openId) return;
    let wheelTimer = 0;
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      const y = event.touches[0].clientY;
      gesture.current = { y, at: event.timeStamp, lastY: y, lastAt: event.timeStamp, pulling: false };
    };
    const onTouchMove = (event: TouchEvent) => {
      const state = gesture.current;
      if (!state || event.touches.length !== 1) return;
      const y = event.touches[0].clientY, dy = y - state.y;
      if (!state.pulling && scroller.scrollTop <= 0 && dy > 4) { state.pulling = true; state.y = y; }
      if (!state.pulling) return;
      event.preventDefault();
      state.lastAt = event.timeStamp; state.lastY = y;
      pull.set(Math.max(0, y - state.y));
    };
    const onTouchEnd = (event: TouchEvent) => {
      const state = gesture.current;
      gesture.current = null;
      if (!state?.pulling) return;
      const velocity = (state.lastY - state.y) / Math.max(1, state.lastAt - state.at);
      release(Math.max(0, (pull.get() > 0 ? velocity : 0)) * (event.type === "touchcancel" ? 0 : 1));
    };
    const onWheel = (event: WheelEvent) => {
      if (scroller.scrollTop > 0 || (event.deltaY >= 0 && pull.get() === 0)) return;
      event.preventDefault();
      pull.set(Math.max(0, pull.get() - event.deltaY * .6));
      window.clearTimeout(wheelTimer);
      if (pull.get() > PULL_CLOSE) { close(); return; }
      wheelTimer = window.setTimeout(() => release(0), 140);
    };
    scroller.addEventListener("touchstart", onTouchStart, { passive: true });
    scroller.addEventListener("touchmove", onTouchMove, { passive: false });
    scroller.addEventListener("touchend", onTouchEnd);
    scroller.addEventListener("touchcancel", onTouchEnd);
    scroller.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.clearTimeout(wheelTimer);
      scroller.removeEventListener("touchstart", onTouchStart);
      scroller.removeEventListener("touchmove", onTouchMove);
      scroller.removeEventListener("touchend", onTouchEnd);
      scroller.removeEventListener("touchcancel", onTouchEnd);
      scroller.removeEventListener("wheel", onWheel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId]);

  function onHeroDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const start = event.clientY, target = event.currentTarget;
    let last = { y: start, at: event.timeStamp }, prev = last;
    target.setPointerCapture(event.pointerId);
    const move = (e: PointerEvent) => { prev = last; last = { y: e.clientY, at: e.timeStamp }; pull.set(Math.max(0, e.clientY - start)); };
    const up = () => {
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", up);
      target.removeEventListener("pointercancel", up);
      release(Math.max(0, (last.y - prev.y) / Math.max(1, last.at - prev.at)));
    };
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerup", up);
    target.addEventListener("pointercancel", up);
  }

  const current = sheet ? items.find(item => item.id === sheet.id) : null;
  const open = !!sheet?.open;
  const boxStyle: CSSProperties = sheet && !open ? { top: sheet.box.top, left: sheet.box.left, width: sheet.box.width, height: sheet.box.height } : {};
  const layout = reduced ? instant : open ? expand : collapse;

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")} style={{ "--ratio": aspectRatio } as CSSProperties}>
      <ul className={styles.grid}>
        {items.map(item => (
          <li key={item.id} ref={node => { if (node) slotRefs.current.set(item.id, node); else slotRefs.current.delete(item.id); }} className={styles.slot}>
            <button type="button" ref={node => { if (node) cardRefs.current.set(item.id, node); else cardRefs.current.delete(item.id); }}
              className={styles.card} data-away={sheet?.id === item.id || undefined} aria-haspopup="dialog" aria-expanded={selected === item.id}
              onClick={() => select(item.id)}>
              <Hero item={item} />
            </button>
          </li>
        ))}
      </ul>

      {hydrated && sheet && current && sheet.box.width > 0 && createPortal(
        <div className={styles.layer} style={{ "--ratio": aspectRatio } as CSSProperties}>
          <motion.div className={styles.backdrop} aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: open ? 1 : 0 }}
            transition={reduced ? { duration: motionTokens.duration.instant } : { duration: open ? .32 : .26, ease: [...ease.standard] }} onClick={close} />
          <motion.div className={styles.lift} style={{ scale, y: drop }}>
            <motion.div ref={sheetRef} layout transition={{ layout }} onLayoutAnimationComplete={onLayoutDone}
              className={styles.sheet} data-open={open || undefined} style={{ ...boxStyle, borderRadius: open ? 32 : 26 }}
              role="dialog" aria-modal="true" aria-labelledby={`${uid}-title`} onKeyDown={onKeyDown}>
              <motion.span className={styles.progress} style={{ scaleX: progress }} aria-hidden="true" />
              <div ref={scrollerRef} className={styles.scroller} onScroll={onScroll}>
                <motion.div layout transition={{ layout }} className={styles.heroWrap}>
                  <Hero item={current} titleId={`${uid}-title`} onPointerDown={onHeroDown} />
                </motion.div>
                {/* Position-only layout keeps the body at its own size while the sheet scales, so its text never stretches mid-morph. */}
                <motion.div className={styles.body} layout="position" initial={false} animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 16 }}
                  transition={open ? { layout, delay: reduced ? 0 : .14, duration: .36, ease: [...ease.standard] } : { layout, duration: motionTokens.duration.instant }}>
                  {current.body}
                </motion.div>
              </div>
              <motion.button ref={closeRef} type="button" className={styles.close} aria-label={closeLabel} onClick={close}
                layout="position" initial={false} animate={open ? { opacity: 1, scale: 1 } : { opacity: 0, scale: .8 }}
                transition={open ? { layout, delay: reduced ? 0 : .18, type: "spring", visualDuration: .3, bounce: 0 } : { layout, duration: .1 }}>
                <X size={18} strokeWidth={1.75} aria-hidden="true" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>,
        document.body,
      )}
    </div>
  );
}
