"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { VideoSource } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * A screen recording of a live product.
 *
 * Rules it enforces, in order of importance:
 *
 *   1. It never renders a broken video. A poster layer sits underneath at all
 *      times; if the file 404s, stalls or the codec is unsupported, the video
 *      element is removed and the poster is what remains.
 *   2. It never touches the network until `load` is true, which the parent
 *      only sets once the showcase is near the viewport and motion previews
 *      have been judged appropriate.
 *   3. It is always muted, looped and inline, and it only plays while `active`.
 *   4. It reserves its exact intrinsic aspect ratio, so nothing shifts when
 *      the frame arrives and no part of the recording is ever cropped.
 */
export function PreviewVideo({
  source,
  label,
  load,
  active,
  className,
  videoClassName,
  fallbackTone = "dark",
}: {
  source: VideoSource;
  /** Accessible description, e.g. "PrintPalash desktop walkthrough". */
  label: string;
  load: boolean;
  active: boolean;
  className?: string;
  videoClassName?: string;
  fallbackTone?: "dark" | "light";
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || failed) return;

    if (active) {
      // Autoplay can still be refused (low power mode, for instance). That is
      // a paused recording over a poster, not an error state.
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active, failed, load]);

  const showVideo = load && !failed;

  return (
    <div
      className={cn("relative isolate overflow-hidden bg-navy-950", className)}
      style={{ aspectRatio: `${source.width} / ${source.height}` }}
    >
      {/* Poster layer — always present, always underneath. */}
      {source.poster ? (
        <Image
          src={source.poster}
          alt=""
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-top"
          aria-hidden="true"
        />
      ) : (
        <PosterPlate tone={fallbackTone} />
      )}

      {showVideo ? (
        <video
          ref={ref}
          // `src` is only ever attached once `load` is true.
          src={source.src}
          poster={source.poster}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          aria-label={label}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500",
            ready ? "opacity-100" : "opacity-0",
            videoClassName,
          )}
        />
      ) : null}
    </div>
  );
}

/**
 * Stand-in shown before a poster frame exists for a recording. It is a
 * deliberate brand surface rather than an empty box, so a slow or blocked
 * video still leaves something composed on screen.
 */
function PosterPlate({ tone }: { tone: "dark" | "light" }) {
  return (
    <div
      className={cn(
        "absolute inset-0",
        tone === "dark"
          ? "bg-[linear-gradient(150deg,#02167f_0%,#01072c_55%,#04061a_100%)]"
          : "bg-[linear-gradient(150deg,#f5f7fc_0%,#e3e8f4_100%)]",
      )}
      aria-hidden="true"
    >
      <div className={cn("absolute inset-0", tone === "dark" ? "grid-lines" : "grid-lines-light")} />
      <div className="skeleton-dark absolute inset-x-[8%] top-[14%] h-[8%] rounded-md opacity-40" />
      <div className="skeleton-dark absolute inset-x-[8%] top-[30%] h-[6%] w-[45%] rounded-md opacity-30" />
      <div className="skeleton-dark absolute inset-x-[8%] bottom-[14%] h-[34%] rounded-lg opacity-25" />
    </div>
  );
}
