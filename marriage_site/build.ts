import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { renderPage } from "./render-page.tsx";

const outDir = resolve(import.meta.dir, "dist");
await mkdir(outDir, { recursive: true });
const build = await Bun.build({
  entrypoints: [resolve(import.meta.dir, "scene.ts")],
  outdir: outDir,
  target: "browser",
  format: "esm",
  minify: true,
  sourcemap: "none",
});

if (!build.success) {
  for (const log of build.logs) {
    console.error(log);
  }

  process.exit(1);
}

await writeFile(resolve(outDir, "index.html"), renderPage());
