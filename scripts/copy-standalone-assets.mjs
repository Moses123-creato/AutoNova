// `output: "standalone"` does not copy the static assets or `public/` into the
// standalone folder, and `next start` refuses to run against that output.
// This copies both so `node .next/standalone/server.js` serves a complete site.
import { cp, mkdir, access } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");

const exists = async (path) => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

if (!(await exists(standalone))) {
  console.log("[copy-standalone] no .next/standalone — nothing to do");
  process.exit(0);
}

const copy = async (from, to) => {
  if (!(await exists(from))) {
    console.log(`[copy-standalone] skip ${from} (missing)`);
    return;
  }
  await mkdir(to, { recursive: true });
  await cp(from, to, { recursive: true });
  console.log(`[copy-standalone] ${from} -> ${to}`);
};

await copy(join(root, ".next", "static"), join(standalone, ".next", "static"));
await copy(join(root, "public"), join(standalone, "public"));

console.log("[copy-standalone] done");
