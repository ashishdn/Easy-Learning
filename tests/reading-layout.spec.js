import { test, expect } from "@playwright/test";

const algebra = "/classes/class-9-10/general-mathematics/algebraic-expressions";
const waves = "/classes/class-9-10/physics/waves-and-sound";

test("questions and solutions use book-style fractions, roots, and explanatory steps", async ({
  page,
}) => {
  await page.goto(algebra);
  await page.getByRole("button", { name: "খ বিভাগ", exact: true }).click();
  const card = page.locator("#question-alg-q1-b");
  await expect(card.locator("h3 .mfrac")).toHaveCount(1);
  await expect(card.locator(".example .sqrt")).toHaveCount(1);
  await card.locator("summary").click();
  await expect(
    card.getByRole("heading", { name: "উত্তর ও ব্যাখ্যা" }),
  ).toBeVisible();
  await expect(card.locator(".solution-explanation")).toContainText(
    "যুগ্মরাশি",
  );
  expect(await card.locator(".solution-body .mfrac").count()).toBeGreaterThan(
    4,
  );
  await expect(card.locator(".step-reason")).toHaveCount(3);
  await expect(page.locator(".math-text-fallback")).toHaveCount(0);
  await card.screenshot({
    path: "test-results/fraction-explanation-desktop.png",
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await card.screenshot({
    path: "test-results/fraction-explanation-mobile.png",
  });
  const polynomial = page.locator("#question-alg-q2-b");
  await polynomial.locator("summary").click();
  await expect(polynomial.locator(".solution-explanation")).toContainText(
    "ভাগশেষ উপপাদ্য",
  );
  await expect(polynomial.locator(".step-reason")).toHaveCount(3);
});

test("all key pages fit phone, tablet, and desktop widths with disclosures expanded", async ({
  page,
}) => {
  test.setTimeout(180000);
  for (const width of [320, 360, 390, 640, 768, 900, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const url of [
      "/",
      "/classes",
      "/classes/class-9-10",
      algebra,
      waves,
      "/formulas",
      "/search?q=" + encodeURIComponent("প্রতিধ্বনি"),
    ]) {
      await page.goto(url);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await page.evaluate(() => {
        for (const details of document.querySelectorAll("main details"))
          details.open = true;
      });
      const result = await page.evaluate(() => ({
        pageWidth: document.documentElement.scrollWidth,
        viewport: innerWidth,
        offenders: [
          ...document.querySelectorAll(
            "main input, main select, main .content-card, main .subject-card, main .filter-buttons",
          ),
        ]
          .filter((el) => {
            const rect = el.getBoundingClientRect();
            return (
              rect.width && (rect.right > innerWidth + 1 || rect.left < -1)
            );
          })
          .map((el) => el.className || el.tagName),
      }));
      expect(
        result.pageWidth,
        `${width}px ${url}: ${result.offenders.join(",")}`,
      ).toBeLessThanOrEqual(width);
      expect(result.offenders, `${width}px ${url}`).toEqual([]);
      await expect(page.locator(".math-text-fallback")).toHaveCount(0);
    }
  }
});

test("hover states stay in place and selected question filters remain readable", async ({
  page,
}) => {
  await page.goto("/");
  for (const selector of [
    ".hero-buttons .button",
    ".subject-card",
    ".feature-card",
  ]) {
    const target = page.locator(selector).first();
    await target.scrollIntoViewIfNeeded();
    const before = await target.boundingBox();
    await target.hover();
    await page.waitForTimeout(250);
    expect(await target.boundingBox()).toEqual(before);
  }
  await page.goto(algebra);
  const button = page.getByRole("button", { name: "খ বিভাগ", exact: true });
  await button.click();
  await button.hover();
  await expect(button).toHaveAttribute("aria-pressed", "true");
  const color = await button.evaluate((el) => ({
    background: getComputedStyle(el).backgroundColor,
    text: getComputedStyle(el).color,
  }));
  expect(color).toEqual({
    background: "rgb(63, 128, 101)",
    text: "rgb(255, 255, 255)",
  });
});
