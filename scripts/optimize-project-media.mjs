/**
 * Re-encodes the portfolio screen recordings for the web and refreshes their
 * poster frames.
 *
 * The recordings as captured are 17–34 MB each, which is far more than a
 * marketing page should ship. Re-encoding at 1280px wide with no audio track
 * typically brings a desktop recording under 3 MB with no visible loss at the
 * size it is presented — it sits inside a browser frame roughly 700px wide.
 *
 * Requires ffmpeg on PATH. Install it first:
 *   Windows   winget install Gyan.FFmpeg
 *   macOS     brew install ffmpeg
 *   Linux     apt install ffmpeg
 *
 * Usage:
 *   node scripts/optimize-project-media.mjs           # report only
 *   node scripts/optimize-project-media.mjs --write   # re-encode in place
 *
 * Originals are kept alongside as `<name>.original.mp4` so nothing is lost.
 */

import { execFileSync, spawnSync } from "node:child_process";
import { readdirSync, statSync, renameSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "projects");
const WRITE = process.argv.includes("--write");

/** Desktop recordings are presented ~700px wide; 1280 leaves room for retina. */
const TARGET_WIDTH = 1280;
/** Constant Rate Factor. 26–30 is the useful range for screen recordings. */
const CRF = 28;

function ffmpegAvailable() {
  const probe = spawnSync("ffmpeg", ["-version"], { encoding: "utf8" });
  return probe.status === 0;
}

function mb(bytes) {
  return (bytes / 1048576).toFixed(1) + " MB";
}

function videos() {
  const found = [];
  for (const dir of readdirSync(ROOT)) {
    const dirPath = path.join(ROOT, dir);
    if (!statSync(dirPath).isDirectory()) continue;
    for (const file of readdirSync(dirPath)) {
      if (!file.endsWith(".mp4") || file.endsWith(".original.mp4")) continue;
      found.push({ dir, file, full: path.join(dirPath, file) });
    }
  }
  return found;
}

function encode({ full, file }) {
  const original = full.replace(/\.mp4$/, ".original.mp4");
  if (existsSync(original)) {
    console.log(`  skipped ${file} — already optimized`);
    return null;
  }

  const before = statSync(full).size;
  renameSync(full, original);

  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-i", original,
      // Never upscale a mobile recording that is already narrow.
      "-vf", `scale='min(${TARGET_WIDTH},iw)':-2:flags=lanczos`,
      "-c:v", "libx264",
      "-profile:v", "high",
      "-crf", String(CRF),
      "-preset", "slow",
      // Screen recordings have long static stretches; a wider keyframe
      // interval saves a lot without hurting seeking on a looping preview.
      "-g", "150",
      "-pix_fmt", "yuv420p",
      // These previews are always muted, so the audio track is dead weight.
      "-an",
      "-movflags", "+faststart",
      full,
    ],
    { stdio: "pipe" },
  );

  const after = statSync(full).size;
  return { before, after };
}

/** Grabs a poster frame next to the recording, named desktop.webp / mobile.webp. */
function poster({ full }) {
  const isMobile = /mobile|mbile/i.test(path.basename(full));
  const out = path.join(path.dirname(full), isMobile ? "mobile.webp" : "desktop.webp");

  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-ss", "1.2",
      "-i", full,
      "-frames:v", "1",
      "-vf", `scale='min(${TARGET_WIDTH},iw)':-2`,
      "-quality", "72",
      out,
    ],
    { stdio: "pipe" },
  );
  return out;
}

function main() {
  const list = videos();

  if (!WRITE) {
    let total = 0;
    console.log("Project recordings:\n");
    for (const item of list) {
      const size = statSync(item.full).size;
      total += size;
      console.log(`  ${item.dir}/${item.file}`.padEnd(56) + mb(size));
    }
    console.log(`\n  total`.padEnd(58) + mb(total));
    console.log("\nRun with --write to re-encode (requires ffmpeg).");
    return;
  }

  if (!ffmpegAvailable()) {
    console.error("ffmpeg not found on PATH. See the header of this file for install instructions.");
    process.exitCode = 1;
    return;
  }

  let before = 0;
  let after = 0;
  for (const item of list) {
    console.log(`Encoding ${item.dir}/${item.file} ...`);
    const result = encode(item);
    if (result) {
      before += result.before;
      after += result.after;
      console.log(`  ${mb(result.before)} -> ${mb(result.after)}`);
    }
    console.log(`  poster ${path.basename(poster(item))}`);
  }

  if (before) {
    console.log(`\nTotal ${mb(before)} -> ${mb(after)}`);
    console.log("Originals kept as *.original.mp4 — delete them once you are happy.");
  }
}

main();
