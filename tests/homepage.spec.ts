import { test, expect } from "@playwright/test";

test('Homepage says "Hello World" and contains link to project on GitHub', async ({
  page,
}) => {
  await page.goto("http://localhost:3000");
  await expect(page.locator("h1")).toHaveText("Hello World");
  await expect(page.locator("a.srcLink")).toHaveAttribute(
    "href",
    "https://github.com/kevcube/icecube.dog"
  );
});
