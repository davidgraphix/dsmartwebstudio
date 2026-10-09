import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The official brand lockup.
 *
 * `public/logo.PNG` is the approved transparent asset and is used everywhere.
 * It is never recoloured, redrawn or re-exported — the file is served exactly
 * as supplied and next/image only resizes it.
 *
 * Two things about the source file shape the markup below:
 *
 *   1. The artwork sits inside a 1254x1254 canvas but only occupies a band in
 *      the middle, so roughly 40% of the height is empty. Rendered whole it
 *      would come out about a third of the size the header has room for. The
 *      wrapper therefore reveals just the artwork band. The image is scaled
 *      uniformly, so the lockup's own proportions are untouched.
 *   2. The artwork is navy ink. It reads correctly on white, and disappears on
 *      the dark header, footer and mobile menu — so on those surfaces it sits
 *      on a white panel rather than being recoloured.
 */

/**
 * Opaque bounds of the artwork within the source canvas, measured from the
 * file's alpha channel, plus a few pixels so antialiased edges are not clipped.
 */
const ART = { x: 94, y: 473, width: 1073, height: 392, canvas: 1254 } as const;

const SIZES = {
  sm: "h-[26px] sm:h-[30px]",
  md: "h-[30px] sm:h-[34px]",
  lg: "h-[34px] sm:h-[40px]",
} as const;

export function Logo({
  tone = "light",
  size = "md",
  className,
  href = "/",
  priority = false,
}: {
  /** "light" means a dark background, so the lockup needs its white panel. */
  tone?: "light" | "dark";
  size?: keyof typeof SIZES;
  className?: string;
  href?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex shrink-0 items-center rounded-lg", className)}
      aria-label="DSmart Web Studio — home"
    >
      <span
        className={cn(
          "inline-flex items-center",
          // On dark surfaces the navy artwork needs a light ground to sit on.
          tone === "light" && "rounded-lg bg-white px-2.5 py-[7px]",
        )}
      >
        <span
          className={cn("block overflow-hidden", SIZES[size])}
          style={{ aspectRatio: `${ART.width} / ${ART.height}` }}
        >
          <Image
            src="/logo.PNG"
            alt="DSmart Web Studio"
            width={ART.canvas}
            height={ART.canvas}
            priority={priority}
            sizes="320px"
            className="max-w-none"
            style={{
              // Scale the whole canvas up so the artwork band fills the frame.
              // Both axes use the same factor, so the lockup is not distorted.
              width: `${(ART.canvas / ART.width) * 100}%`,
              height: `${(ART.canvas / ART.height) * 100}%`,
              // Offsets must be a transform, not margins: a percentage margin
              // resolves against the container's WIDTH on both axes, which
              // throws the vertical position out entirely. Transform
              // percentages resolve against the element's own box.
              transform: `translate(${(-ART.x / ART.canvas) * 100}%, ${(-ART.y / ART.canvas) * 100}%)`,
            }}
          />
        </span>
      </span>
    </Link>
  );
}
