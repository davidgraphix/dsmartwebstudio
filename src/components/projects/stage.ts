"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Project preview playback coordinator.
 *
 * Two independent concerns, deliberately separated:
 *
 *   `near`   — the showcase is within a screen or so of the viewport, so its
 *              <video> elements may attach a `src` and start buffering.
 *   `active` — this showcase is the one the visitor is actually looking at,
 *              so its videos may play.
 *
 * Only ONE project is ever active. Every other project's videos are paused,
 * which is what stops eight recordings decoding at once on a long page. The
 * registry lives at module scope because the decision is global — a component
 * cannot know whether some other showcase is more visible than it is.
 */

type Registration = {
  ratio: number;
  notify: (active: boolean) => void;
  active: boolean;
};

const registry = new Map<string, Registration>();

/** Below this share of the element on screen, nothing is worth playing. */
const MIN_RATIO = 0.12;

let suspended = false;

function reconcile() {
  let winner: string | null = null;
  let best = MIN_RATIO;

  if (!suspended) {
    for (const [id, entry] of registry) {
      if (entry.ratio > best) {
        best = entry.ratio;
        winner = id;
      }
    }
  }

  for (const [id, entry] of registry) {
    const next = id === winner;
    if (next !== entry.active) {
      entry.active = next;
      entry.notify(next);
    }
  }
}

/** Background tabs must not keep decoding video. */
function bindVisibility() {
  if (typeof document === "undefined") return;
  // Read the current state too — a page opened in a background tab never
  // receives a change event, and must not start playing behind the visitor.
  suspended = document.visibilityState === "hidden";
  document.addEventListener("visibilitychange", () => {
    suspended = document.visibilityState === "hidden";
    reconcile();
  });
}

let visibilityBound = false;

/**
 * Reports how much of `ref` is on screen and tells the caller whether this
 * showcase won the right to play.
 *
 * The registry key is per-instance rather than per-project, so the same
 * project appearing twice on one page cannot evict its own entry.
 */
export function useProjectStage() {
  const id = useId();
  const ref = useRef<HTMLDivElement | null>(null);
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!visibilityBound) {
      visibilityBound = true;
      bindVisibility();
    }

    // Without IntersectionObserver, show the posters and never autoplay.
    if (typeof IntersectionObserver === "undefined") return;

    // Pre-load window: start fetching before the visitor arrives, then stop
    // observing — `near` is a one-way latch, videos are never unloaded.
    const preload = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          preload.disconnect();
        }
      },
      { rootMargin: "600px 0px 600px 0px" },
    );
    preload.observe(element);

    const registration: Registration = { ratio: 0, notify: setActive, active: false };
    registry.set(id, registration);

    const visibility = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          registration.ratio = entry.isIntersecting ? entry.intersectionRatio : 0;
        }
        reconcile();
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1] },
    );
    visibility.observe(element);

    return () => {
      preload.disconnect();
      visibility.disconnect();
      registry.delete(id);
      reconcile();
    };
  }, [id]);

  return { ref, near, active };
}

/**
 * Whether motion previews are appropriate at all.
 *
 * Returns `false` for reduced-motion, Save-Data and 2G-class connections, in
 * which case the showcase renders its poster and never touches the network for
 * a video. Starts as `null` on the server and on the first client render so
 * markup matches; nothing loads until this has resolved.
 */
export function useMotionAllowed(): boolean | null {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    type SaveDataConnection = { saveData?: boolean; effectiveType?: string };
    const connection = (navigator as Navigator & { connection?: SaveDataConnection }).connection;

    const evaluate = () => {
      const frugal =
        connection?.saveData === true ||
        connection?.effectiveType === "slow-2g" ||
        connection?.effectiveType === "2g";
      setAllowed(!motion.matches && !frugal);
    };

    evaluate();
    motion.addEventListener("change", evaluate);
    return () => motion.removeEventListener("change", evaluate);
  }, []);

  return allowed;
}

/** Mount-safe media query. Renders the small-screen branch until proven wrong. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}
