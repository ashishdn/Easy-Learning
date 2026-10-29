import { test, expect } from "@playwright/test";

const subject = "/classes/class-9-10/general-mathematics";
const slugs = [
  "real-numbers",
  "sets-functions",
  "algebraic-expressions",
  "exponents-logarithms",
  "equations",
  "geometry",
  "practical-geometry",
  "circle",
  "trigonometric-ratios",
  "distance-elevation",
  "algebraic-ratio-proportion",
  "simultaneous-equations",
  "finite-series",
  "ratio-similarity-symmetry",
  "area-theorems-constructions",
  "mensuration",
  "statistics",
];

test("all 17 textbook chapters have usable lessons and linked navigation", async ({
  page,
}) => {
  test.setTimeout(180000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(subject);
  await expect(page.locator("a.chapter-card")).toHaveCount(17);
  for (let i = 0; i < slugs.length; i++) {
    await page.goto(`${subject}/${slugs[i]}`);
    await expect(page.locator("#concepts article").first()).toBeVisible();
    expect(
      await page.locator("#problems article").count(),
    ).toBeGreaterThanOrEqual(4);
    await expect(page.locator(".math-fallback")).toHaveCount(0);
    if (i < 16)
      await expect(
        page.locator(
          `.chapter-pagination a[href="${subject}/${slugs[i + 1]}"]`,
        ),
      ).toBeAttached();
    if (i > 0)
      await expect(
        page.locator(
          `.chapter-pagination a[href="${subject}/${slugs[i - 1]}"]`,
        ),
      ).toBeAttached();
  }
  expect(errors).toEqual([]);
});

test("textbook diagrams, tables and expanded solutions stay inside mobile viewport", async ({
  page,
}) => {
  test.setTimeout(180000);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const slug of [
      "sets-functions",
      "practical-geometry",
      "trigonometric-ratios",
      "simultaneous-equations",
      "statistics",
      "mensuration",
    ]) {
      await page.goto(`${subject}/${slug}`);
      await expect(page.locator("#concepts article").first()).toBeVisible();
      await page.evaluate(() =>
        document.querySelectorAll("details").forEach((d) => (d.open = true)),
      );
      await expect(page.locator(".math-fallback")).toHaveCount(0);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${slug} at ${width}`,
      ).toBe(true);
      for (const diagram of await page.locator(".study-figure svg").all()) {
        const box = await diagram.boundingBox();
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
      }
    }
  }
  await page.goto(`${subject}/statistics`);
  await expect(page.locator(".lesson-table tbody tr")).toHaveCount(3);
  await page.screenshot({
    path: "test-results/statistics-desktop.png",
    fullPage: true,
  });
});
