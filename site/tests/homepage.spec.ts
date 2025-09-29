import { beforeEach, describe, expect, it } from "bun:test";

describe("Homepage", () => {
  beforeEach(() => {
    if (!globalThis.document)
      throw new Error("No DOM. Run with bun test --dom");
  });

  it("says 'Hello World' and contains link to project on GitHub", () => {
    const h1 = document.querySelector("h1");
    expect(h1?.textContent).toBe("Hello World");

    const link = document.querySelector<HTMLAnchorElement>("a.srcLink");
    expect(link?.getAttribute("href")).toBe(
      "https://github.com/kevcube/icecube.dog",
    );
  });
});
