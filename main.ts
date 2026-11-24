import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The Intern Finds It: one funny fortune cookie message for an AI agent, at most 140 characters.
const LINE =
  "Your next bug will be found by the intern, the fix will take one line, and the meeting about it will take two hours.";
const MAX_CHARS = 140;

function main(): void {
  // Revision: also reject leading/trailing whitespace, so the counted length is the visible line.
  if (LINE.includes("\n") || LINE.trim().length === 0 || LINE.trim() !== LINE) {
    throw new Error("entry must be a single non-empty line without surrounding whitespace");
  }
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`entry is ${LINE.length} characters, outside 1-${MAX_CHARS}`);
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

main();
