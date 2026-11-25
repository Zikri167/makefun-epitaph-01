// Famous Last Words: The Funniest Epitaph
// Winner: "Tell the kids I hid $50,000 in the house. I didn't. Enjoy the renovation."
// Why it won (25/25 in candidates.md): it is first-person dying speech
// ("Tell the kids..."), a genuine joke with a victim and a consequence,
// and the twist lands twice on the final words — "I didn't" cancels the
// $50,000 setup in two words, then "Enjoy the renovation" reveals the
// kids will tear the house apart for money that was never there. The
// concrete $50,000 beats every vague rival; carved-stone plain, quotable
// in one breath, no explanation needed. It beat the 214,000-mile
// check-engine runner-up because its punch is a consequence, not a shrug.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "Tell the kids I hid $50,000 in the house. I didn't. Enjoy the renovation.";
const OUT_PATH = "/output/entry.txt";

function validate(text: string): void {
  const points = [...text];
  if (points.length < 1 || points.length > 150) {
    throw new Error(`entry must be 1-150 characters, got ${points.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  for (const ch of text) {
    if (ch.charCodeAt(0) < 0x20 || ch.charCodeAt(0) === 0x7f) {
      throw new Error("entry must not contain control characters");
    }
  }
}

validate(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, ENTRY, "utf8");
const back = readFileSync(OUT_PATH);
if (!back.equals(Buffer.from(ENTRY, "utf8"))) {
  throw new Error("read-back mismatch: file is not byte-identical to entry");
}
console.log(`wrote ${OUT_PATH} (${[...ENTRY].length} chars)`);
