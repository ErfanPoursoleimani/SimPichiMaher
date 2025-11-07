import { useCallback, useEffect, useRef, useState } from "react";

type Direction = "vertical" | "horizontal";

export interface AutoScrollOptions {
  direction?: Direction;          // "vertical" | "horizontal"
  speed?: number;                 // px per second (not per frame). default 40
  reverse?: boolean;              // scroll backwards
  loop?: boolean;                 // wrap around when hitting edges (default true)
  autostart?: boolean;            // start on mount (default true)
  pauseOnHover?: boolean;         // pause while hovered (default true)
  pauseOnInteractionMs?: number;  // pause after user wheel/touch, then resume (default 1200ms)
  respectReducedMotion?: boolean; // pause if user prefers-reduced-motion (default true)
  onLoop?: (cycle: number) => void; // called each wrap
  onStop?: (reason: "boundary" | "manual") => void;
}

export interface AutoScrollApi<T extends HTMLElement> {
  ref: React.RefObject<T>;
  isRunning: boolean;
  isPaused: boolean;
  setSpeed: (pxPerSec: number) => void;
  setDirection: (dir: Direction) => void;
  setReverse: (rev: boolean) => void;
  start: () => void;
  stop: () => void;     // manual stop (won't auto-resume)
  pause: () => void;    // temporary pause (e.g., for UX)
  resume: () => void;   // resume from pause
}

export function useAutoScroll<T extends HTMLElement>({
  direction = "vertical",
  speed = 40,
  reverse = false,
  loop = true,
  autostart = true,
  pauseOnHover = true,
  pauseOnInteractionMs = 1200,
  respectReducedMotion = true,
  onLoop,
  onStop,
}: AutoScrollOptions = {}): AutoScrollApi<T> {
  const containerRef = useRef<T>(null!);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const cycleRef = useRef(0);

  const speedRef = useRef(speed);
  const dirRef = useRef<Direction>(direction);
  const reverseRef = useRef(reverse);
  const loopRef = useRef(loop);

  const manualStoppedRef = useRef(false);
  const pausedRef = useRef(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const interactionTimer = useRef<number | null>(null);

  // helpers to read/write scroll axis
  const getMaxScroll = useCallback((el: HTMLElement) => {
    return dirRef.current === "vertical"
      ? el.scrollHeight - el.clientHeight
      : el.scrollWidth - el.clientWidth;
  }, []);

  const getPos = (el: HTMLElement) =>
    dirRef.current === "vertical" ? el.scrollTop : el.scrollLeft;

  const setPos = (el: HTMLElement, v: number) => {
    if (dirRef.current === "vertical") {
      el.scrollTop = v;
    } else {
      el.scrollLeft = v;
    }
  };

  const step = useCallback((ts: number) => {
    const el = containerRef.current;
    if (!el) {
      rafRef.current = requestAnimationFrame(step);
      return;
    }

    // paused or manually stopped? don't schedule movement
    if (manualStoppedRef.current || pausedRef.current) {
      setIsRunning(false);
      rafRef.current = null;
      lastTsRef.current = null;
      return;
    }

    // compute dt
    const last = lastTsRef.current ?? ts;
    const dt = Math.min(64, ts - last); // cap large jumps for throttled tabs
    lastTsRef.current = ts;

    const max = getMaxScroll(el);
    if (max <= 0 || speedRef.current <= 0) {
      // nothing to scroll
      rafRef.current = requestAnimationFrame(step);
      return;
    }

    const dir = reverseRef.current ? -1 : 1;
    const delta = (speedRef.current * dt) / 1000 * dir;

    let next = getPos(el) + delta;

    if (loopRef.current) {
      // wrap-around math that *preserves overflow past the edge*
      if (next > max) {
        next = next - max; // carry remainder from overshoot
        setPos(el, next);
        cycleRef.current += 1;
        onLoop?.(cycleRef.current);
      } else if (next < 0) {
        next = max + next; // negative remainder from top
        setPos(el, next);
        cycleRef.current += 1;
        onLoop?.(cycleRef.current);
      } else {
        setPos(el, next);
      }
    } else {
      // clamp to boundaries and stop
      if (next >= max) {
        setPos(el, max);
        manualStoppedRef.current = true;
        setIsRunning(false);
        onStop?.("boundary");
        rafRef.current = null;
        lastTsRef.current = null;
        return;
      } else if (next <= 0) {
        setPos(el, 0);
        manualStoppedRef.current = true;
        setIsRunning(false);
        onStop?.("boundary");
        rafRef.current = null;
        lastTsRef.current = null;
        return;
      } else {
        setPos(el, next);
      }
    }

    rafRef.current = requestAnimationFrame(step);
  }, [getMaxScroll, onLoop, onStop]);

  const start = useCallback(() => {
    if (rafRef.current != null) return;
    if (respectReducedMotion && typeof window !== "undefined") {
      const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
      if (mq?.matches) {
        // honor user setting by not autostarting
        return;
      }
    }
    manualStoppedRef.current = false;
    pausedRef.current = false;
    setIsPaused(false);
    setIsRunning(true);
    lastTsRef.current = null;
    rafRef.current = requestAnimationFrame(step);
  }, [respectReducedMotion, step]);

  const stop = useCallback(() => {
    manualStoppedRef.current = true;
    setIsRunning(false);
    setIsPaused(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    lastTsRef.current = null;
    onStop?.("manual");
  }, [onStop]);

  const pause = useCallback(() => {
    if (manualStoppedRef.current) return;
    pausedRef.current = true;
    setIsPaused(true);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    lastTsRef.current = null;
  }, []);

  const resume = useCallback(() => {
    if (manualStoppedRef.current) return;
    pausedRef.current = false;
    setIsPaused(false);
    start();
  }, [start]);

  // external setters
  const setSpeed = useCallback((pxPerSec: number) => {
    speedRef.current = Math.max(0, pxPerSec || 0);
  }, []);

  const setDirection = useCallback((d: Direction) => {
    dirRef.current = d;
  }, []);

  const setReverse = useCallback((rev: boolean) => {
    reverseRef.current = !!rev;
  }, []);

  // update refs on option changes (no restart needed)
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { dirRef.current = direction; }, [direction]);
  useEffect(() => { reverseRef.current = reverse; }, [reverse]);
  useEffect(() => { loopRef.current = loop; }, [loop]);

  // autostart
  useEffect(() => {
    if (autostart) start();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [autostart, start]);

  // hover pause
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !pauseOnHover) return;

    const enter = () => pause();
    const leave = () => resume();

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, [pauseOnHover, pause, resume]);

  // wheel/touch interaction pause with auto-resume
  useEffect(() => {
    const el = containerRef.current;
    if (!el || pauseOnInteractionMs <= 0) return;

    const nudgePause = () => {
      if (manualStoppedRef.current) return;
      pause();
      if (interactionTimer.current) window.clearTimeout(interactionTimer.current);
      interactionTimer.current = window.setTimeout(() => {
        interactionTimer.current = null;
        resume();
      }, pauseOnInteractionMs);
    };

    const wheel = (e: WheelEvent) => {
      if (!e.ctrlKey) nudgePause();
    };
    const touch = () => nudgePause();

    el.addEventListener("wheel", wheel, { passive: true });
    el.addEventListener("touchmove", touch, { passive: true });
    return () => {
      el.removeEventListener("wheel", wheel);
      el.removeEventListener("touchmove", touch);
      if (interactionTimer.current) window.clearTimeout(interactionTimer.current);
    };
  }, [pauseOnInteractionMs, pause, resume]);

  // keep maxScroll fresh on resize/content changes
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let ro: ResizeObserver | null = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(() => {
        // If currently at/over max after shrink, wrap to valid range.
        const max = getMaxScroll(el);
        const pos = getPos(el);
        if (pos > max) setPos(el, loopRef.current ? (pos - max) : max);
      });
      ro.observe(el);
      // also observe immediate children (content size changes)
      Array.from(el.children).forEach((c) => ro!.observe(c as Element));
    }
    return () => {
      ro?.disconnect();
    };
  }, [getMaxScroll]);

  return {
    ref: containerRef,
    isRunning,
    isPaused,
    setSpeed,
    setDirection,
    setReverse,
    start,
    stop,
    pause,
    resume,
  };
}
