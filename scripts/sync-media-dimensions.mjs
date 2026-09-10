/**
 * Rewrites the `width` / `height` recorded next to each video in
 * `data/projects.ts` to match the files actually on disk.
 *
 * Those numbers drive the `aspect-ratio` the showcase reserves before a frame
 * arrives, so they have to track the media. Re-encoding at a different width
 * changes them, and a stale pair means a layout shift on first paint.
 *
 * Dimensions are read from the MP4's `avc1` sample entry rather than by
 * shelling out, so this runs with or without ffmpeg installed.
 *
 * Usage:
 *   node scripts/sync-media-dimensions.mjs           # report drift
 *   node scripts/sync-media-dimensions.mjs --write   # correct the data file
 */

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const DATA = path.join(process.cwd(), "src", "data", "projects.ts");
const WRITE = process.argv.includes("--write");

/**
 * Reads the coded width/height out of the H.264 sample entry.
 *
 * "avc1" also appears in the `ftyp` compatible-brands list that ffmpeg writes,
 * so a plain search finds the wrong offset. A real sample entry begins with six
 * zero bytes and a data-reference index of 1, which is what this checks before
 * trusting the width/height that follow.
 */
function dimensions(file) {
  const buf = readFileSync(file);
  const needle = Buffer.from("avc1", "latin1");

  for (let at = buf.indexOf(needle); at >= 0; at = buf.indexOf(needle, at + 1)) {
    if (at + 32 > buf.length) break;
    if (buf.readUIntBE(at + 4, 6) !== 0) continue;
    if (buf.readUInt16BE(at + 10) !== 1) continue;

    const width = buf.readUInt16BE(at + 28);
    const height = buf.readUInt16BE(at + 30);
    if (width >= 16 && height >= 16) return { width, height };
  }

  throw new Error(`no H.264 sample entry in ${file}`);
}

const source = readFileSync(DATA, "utf8");

// Each media entry is `src: "..."` followed by its poster, width and height.
const entry = /src: "(\/projects\/[^"]+\.mp4)",\n(\s*)poster: "([^"]+)",\n\s*width: (\d+),\n\s*height: (\d+),/g;

let changed = 0;
let checked = 0;

const updated = source.replace(entry, (match, src, indent, poster, width, height) => {
  checked++;
  const actual = dimensions(path.join(process.cwd(), "public", src));
  if (actual.width === Number(width) && actual.height === Number(height)) return match;

  changed++;
  console.log(`  ${src}`);
  console.log(`    ${width}x${height} -> ${actual.width}x${actual.height}`);
  return (
    `src: "${src}",\n${indent}poster: "${poster}",\n` +
    `${indent}width: ${actual.width},\n${indent}height: ${actual.height},`
  );
});

console.log(`\n${checked} entries checked, ${changed} out of date.`);

if (changed && WRITE) {
  writeFileSync(DATA, updated);
  console.log("projects.ts updated.");
} else if (changed) {
  console.log("Run with --write to correct them.");
}
