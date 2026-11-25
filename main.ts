// meeting-one-line: the single sentence that could have replaced
// an entire pointless meeting. No context, no explanation, just
// the line that kills the meeting.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line: one sentence, one line, at most 200 characters.
// It has to stand alone — no setup, no punchline after it — so the
// joke is the recursion itself: a meeting whose only decision was
// to hold another meeting about the same decision.
const ENTRY_LINE =
  "We just spent an hour scheduling a second meeting to decide what this meeting was supposed to decide.";

// Validate the line against the competition gate before writing it.
function validateEntry(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (line.length < 1 || line.length > 200) {
    throw new Error(
      `entry line must be 1-200 characters, got ${line.length}`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be exactly one line");
  }
}

// Output directory: the grader reads /output/entry.txt by default,
// MAKEFUN_OUTPUT_DIR overrides it for local runs.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

validateEntry(ENTRY_LINE);
mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, ENTRY_LINE, "utf8");
console.log(`Wrote ${outputPath} (${ENTRY_LINE.length} characters)`);
