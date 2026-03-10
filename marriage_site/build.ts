import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import IndexPage from "./index";

const styles = `
  :root {
    color-scheme: light;
    font-family: Georgia, "Times New Roman", serif;
    background:
      radial-gradient(circle at top, #f7f1e6 0%, #f4ede0 32%, #dfe8f2 72%, #cad9ea 100%);
    color: #1e293b;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background:
      radial-gradient(circle at top, #f8f0df 0%, #f0e4d1 30%, #dce5ec 72%, #c4d6ea 100%);
  }

  .shell {
    min-height: 100vh;
    display: flex;
    align-items: stretch;
    justify-content: center;
    padding: 32px;
  }

  .panel {
    width: min(100%, 1200px);
  }

  .hero {
    display: grid;
    gap: 36px;
    align-items: center;
    grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  }

  .eyebrow {
    margin: 0 0 24px;
    font: 600 12px/1.2 ui-sans-serif, system-ui, sans-serif;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: #475569;
  }

  h1 {
    margin: 0;
    font-size: clamp(3rem, 8vw, 5.5rem);
    line-height: 0.96;
    letter-spacing: -0.04em;
  }

  .lede {
    max-width: 42rem;
    margin: 32px 0 0;
    font: 400 1.15rem/1.8 ui-sans-serif, system-ui, sans-serif;
    color: #334155;
  }

  .copy {
    padding: 24px 0;
  }

  code {
    font-family: "SFMono-Regular", ui-monospace, monospace;
    font-size: 0.95em;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 40px;
  }

  .chips span {
    border: 1px solid rgba(71, 85, 105, 0.24);
    background: rgba(255, 255, 255, 0.62);
    border-radius: 999px;
    padding: 10px 16px;
    font: 500 0.92rem/1.2 ui-sans-serif, system-ui, sans-serif;
    color: #475569;
  }

  .render-card {
    margin: 0;
    padding: 18px;
    border: 1px solid rgba(71, 85, 105, 0.14);
    border-radius: 28px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.38));
    box-shadow:
      0 28px 70px rgba(91, 112, 140, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
  }

  .render-canvas {
    display: block;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 22px;
    background:
      radial-gradient(circle at 50% 18%, rgba(255, 248, 235, 0.95), rgba(216, 228, 241, 0.72) 55%, rgba(163, 181, 204, 0.3) 100%);
  }

  figcaption {
    margin-top: 14px;
    font: 500 0.93rem/1.5 ui-sans-serif, system-ui, sans-serif;
    color: #526174;
  }

  @media (max-width: 900px) {
    .shell {
      padding: 18px;
    }

    .hero {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .copy {
      padding: 8px 0 0;
    }

    .lede {
      font-size: 1.02rem;
      line-height: 1.75;
    }
  }
`;

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>kb.icecube.dog</title>
    <meta
      name="description"
      content="Static publishing endpoint for Kevin's corner of icecube.dog."
    />
    <style>${styles}</style>
  </head>
  <body>
    ${renderToStaticMarkup(createElement(IndexPage))}
    <script type="module" src="./scene.js"></script>
  </body>
</html>
`;

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

await writeFile(resolve(outDir, "index.html"), html);
