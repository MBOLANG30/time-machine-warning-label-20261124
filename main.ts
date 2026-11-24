// Funniest Time Machine Warning Label — make.fun bounty
// u-eager-stork-81-9647-funniest-time-machine-warning-f8add151
//
// Writes one warning label (max 120 characters) to entry.txt in the
// output directory given by $MAKEFUN_OUTPUT_DIR (fallback /output).
// Deterministic, no network, no dependencies, no reads outside this repo.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The label: a grandfather-paradox hazard turned into the joke, kept in
// deadpan safety-notice voice, with the surprise saved for the last words.
const LABEL =
  "WARNING: Do not hug your grandfather. He has not met you yet, and he will press charges.";

const MAX_CHARS = 120;

function main() {
  // Validate the label before writing anything.
  const chars = [...LABEL];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`label must be 1-${MAX_CHARS} characters, got ${chars.length}`);
  }
  if (LABEL.trim().length === 0) {
    throw new Error("label must not be only whitespace");
  }
  if (LABEL.includes("\n") || LABEL.includes("\r")) {
    throw new Error("label must be a single line");
  }
  if (LABEL !== LABEL.trim()) {
    throw new Error("label must not start or end with whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LABEL, "utf8");
}

main();
