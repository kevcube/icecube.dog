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
  }

  .shell {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px;
  }

  .panel {
    width: min(100%, 960px);
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
  <body>${renderToStaticMarkup(createElement(IndexPage))}</body>
</html>
`;

const outDir = resolve(import.meta.dir, "dist");
await mkdir(outDir, { recursive: true });
await writeFile(resolve(outDir, "index.html"), html);
