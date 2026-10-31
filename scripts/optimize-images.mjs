// Shrinks oversized images in public/images and public/gallery, in place, keeping each file's name and format
// so no content path changes. Runs before `npm run dev` and `npm run build`; safe to run repeatedly.
//
//   npm run images                    optimize everything under public/images and public/gallery
//   npm run images -- --check         report what would change and exit 1 if anything is oversized
//   npm run images -- <dir> [<dir>]   optimize other folders (used by tests)
//
// Rules:
//   - Anything wider than MAX_WIDTH is scaled down (never up).
//   - JPEG and WebP over BYTE_BUDGET are re-encoded once at QUALITY; the result is kept only when it is at least
//     10% smaller, so already-optimized files are left alone instead of degrading on every run.
//   - PNG is never re-encoded lossily (logos, transparency); it is only resized when too wide or recompressed
//     losslessly when that saves at least 10%.
//   - Originals are overwritten. Commit first if you want to compare; git restores them.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { PROJECT_ROOT } from "./lib/content.mjs";

const MAX_WIDTH = 1920;
const BYTE_BUDGET = 400 * 1024;
const QUALITY = 80;
const MIN_SAVING = 0.1;
const DEFAULT_DIRS = ["public/images", "public/gallery"];
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

const args = process.argv.slice(2);
const checkOnly = args.includes("--check");
const dirs = args.filter((arg) => !arg.startsWith("--"));
const roots = (dirs.length ? dirs : DEFAULT_DIRS).map((dir) => path.resolve(PROJECT_ROOT, dir));

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile() && IMAGE_EXT.test(entry.name)) yield full;
  }
}

function encoder(pipeline, ext) {
  if (/^\.jpe?g$/i.test(ext)) return pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
  if (/^\.webp$/i.test(ext)) return pipeline.webp({ quality: QUALITY, effort: 5 });
  // `effort` and `quality` switch sharp to lossy palette quantization, so only pass lossless options here.
  return pipeline.png({ compressionLevel: 9, palette: false });
}

/** Returns the new bytes when the file should be rewritten, otherwise null. */
async function optimize(file) {
  const original = readFileSync(file);
  const ext = path.extname(file);
  const { width, pages } = await sharp(original).metadata();
  if (pages > 1) return null; // animated; leave alone

  const oversized = width > MAX_WIDTH;
  const lossless = /^\.png$/i.test(ext);
  if (!oversized && !lossless && original.length <= BYTE_BUDGET) return null;

  let pipeline = sharp(original).rotate();
  if (oversized) pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const output = await encoder(pipeline, ext).toBuffer();
  if (oversized || output.length <= original.length * (1 - MIN_SAVING)) return output;
  return null;
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;
let before = 0;
let after = 0;
let changed = 0;

for (const root of roots) {
  for (const file of walk(root)) {
    const output = await optimize(file);
    if (!output) continue;
    const size = statSync(file).size;
    before += size;
    after += output.length;
    changed += 1;
    console.log(`${checkOnly ? "would shrink" : "shrunk"} ${path.relative(PROJECT_ROOT, file)}: ${kb(size)} -> ${kb(output.length)}`);
    if (!checkOnly) writeFileSync(file, output);
  }
}

if (!changed) {
  console.log("Images: nothing to optimize.");
} else {
  console.log(`Images: ${changed} file${changed === 1 ? "" : "s"}, ${kb(before)} -> ${kb(after)} (saved ${kb(before - after)}).`);
  if (checkOnly) process.exitCode = 1;
}
