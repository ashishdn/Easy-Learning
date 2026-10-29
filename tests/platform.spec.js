import { test, expect } from "@playwright/test";

const subject = "/classes/class-9-10/general-mathematics";
const chapter = `${subject}/real-numbers`;

test("class selection, subject catalog, and chapter learning", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "bn");
  await page.getByRole("link", { name: "পড়াশোনা শুরু করো" }).click();
  await expect(page).toHaveURL("/classes");
  await page
    .locator("main")
    .getByRole("link", { name: /নবম-দশম শ্রেণি/ })
    .click();
  await page
    .locator("main")
    .getByRole("link", { name: /সাধারণ গণিত/ })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "সাধারণ গণিত",
  );
  const search = page.getByRole("textbox", { name: "অধ্যায় অনুসন্ধান" });
  await search.fill("অসম্ভবশব্দ");
  await expect(
    page.getByText("কোনো ফলাফল পাওয়া যায়নি। অন্য শব্দ দিয়ে খুঁজে দেখো।"),
  ).toBeVisible();
  await search.fill("বাস্তব");
  await page.locator(`a.chapter-card[href="${chapter}"]`).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "বাস্তব সংখ্যা",
  );
  await expect(page.locator("#topic-rational")).toBeAttached();
  await expect(page.locator(".math-fallback")).toHaveCount(0);
  await page
    .locator(".chapter-sidebar")
    .getByRole("link", { name: /সৃজনশীল প্রশ্ন/ })
    .click();
  await page.getByRole("button", { name: "ঘ বিভাগ", exact: true }).click();
  const solution = page.locator("#question-q-d details");
  await solution.locator("summary").click();
  await expect(solution).toHaveAttribute("open", "");
  await expect(solution.getByText("চূড়ান্ত উত্তর:")).toBeVisible();
  await solution.locator("summary").click();
  await expect(solution).not.toHaveAttribute("open", "");
});

test("desktop and mobile visual review", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "test-results/home-mobile.png",
    fullPage: true,
  });
  await page.goto(chapter);
  await page.screenshot({
    path: "test-results/chapter-mobile.png",
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test("formula filters, detail, and search deep links", async ({ page }) => {
  await page.goto("/formulas");
  await page.getByLabel("সূত্র খোঁজো").fill("পরম মান");
  await expect(page.locator(".formula-card")).toHaveCount(1);
  await page.getByText("সূত্রের বিস্তারিত দেখো", { exact: true }).click();
  await expect(page.getByText("প্রতীকের অর্থ:")).toBeVisible();
  await page.getByLabel("সূত্র খোঁজো").fill("");
  await page.getByRole("combobox").last().selectOption("rational");
  await expect(page.locator(".formula-card")).toHaveCount(2);
  await page.goto("/search?q=" + encodeURIComponent("কেন মূলদ"));
  await page.locator(".search-result").first().click();
  await expect(page).toHaveURL(`${chapter}#question-q-b`);
  await expect(page.locator("#question-q-b")).toBeVisible();
  await page.goto("/search");
  await page
    .getByRole("textbox", { name: "কী শিখতে চাও?" })
    .fill("কোনোঅস্তিত্বহীনশব্দ");
  await expect(
    page.getByText("কোনো ফলাফল পাওয়া যায়নি। অন্য শব্দ দিয়ে খুঁজে দেখো।"),
  ).toBeVisible();
});

test("problem filters and real assessment scoring", async ({ page }) => {
  await page.goto(chapter);
  await page.getByLabel("কঠিনতার মাত্রা").selectOption("চ্যালেঞ্জিং");
  await expect(page.locator("#problems article")).toHaveCount(1);
  await expect(page.locator("#problem-p-four")).toBeVisible();
  await page.getByLabel("√৭", { exact: true }).check();
  await page.getByLabel("পূর্ণসংখ্যা ও মূলদ সংখ্যা", { exact: true }).check();
  await page.getByRole("textbox", { name: "তোমার উত্তর" }).fill("৮");
  await page.getByLabel("০.১২৫", { exact: true }).check();
  await page.getByLabel("২ ও ৫", { exact: true }).check();
  await page.getByLabel("৩.১৪২", { exact: true }).check();
  await page.getByRole("button", { name: "উত্তর জমা দাও" }).click();
  await expect(
    page.getByRole("heading", { name: "তোমার ফলাফল: ৬ / ৬" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "আবার চেষ্টা করো" }).click();
  await page.getByLabel("√১৬", { exact: true }).check();
  await page.getByLabel("অমূলদ সংখ্যা", { exact: true }).check();
  await page.getByRole("textbox", { name: "তোমার উত্তর" }).fill("৭");
  await page.getByLabel("০.৮", { exact: true }).check();
  await page.getByLabel("৩ ও ৭", { exact: true }).check();
  await page.getByLabel("৩.১৪১", { exact: true }).check();
  await page.getByRole("button", { name: "উত্তর জমা দাও" }).click();
  await expect(
    page.getByRole("heading", { name: "তোমার ফলাফল: ০ / ৬" }),
  ).toBeVisible();
});

test("unfinished content, invalid routes, and mobile navigation", async ({
  page,
}) => {
  await page.goto("/classes/class-9-10/chemistry");
  await expect(
    page.getByRole("heading", { name: "এই বিষয়টি যত্ন নিয়ে তৈরি হচ্ছে" }),
  ).toBeVisible();
  await page.goto(`${subject}/sets-functions`);
  await expect(
    page.getByRole("heading", { level: 1, name: "সেট ও ফাংশন" }),
  ).toBeVisible();
  for (const url of [
    `${subject}/invalid`,
    "/classes/invalid",
    "/classes/class-9-10/invalid",
  ]) {
    await page.goto(url);
    await expect(
      page.getByRole("heading", { name: "এই পাতাটি এখানে নেই" }),
    ).toBeVisible();
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "মেনু খোলো" }).click();
  await page
    .locator("#mobile-nav")
    .getByRole("link", { name: "সূত্রভান্ডার" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "সূত্রভান্ডার",
  );
  for (const url of [
    "/",
    "/classes",
    subject,
    chapter,
    "/formulas",
    "/search",
  ]) {
    await page.goto(url);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow, `horizontal page overflow: ${url}`).toBe(false);
  }
});
