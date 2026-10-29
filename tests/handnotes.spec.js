import { test, expect } from "@playwright/test";

const algebra = "/classes/class-9-10/general-mathematics/algebraic-expressions";
const waves = "/classes/class-9-10/physics/waves-and-sound";

test("reviewed handnote chapters have complete content and correct chapter counts", async ({
  page,
}) => {
  for (const [
    subject,
    chapter,
    title,
    number,
    topicCount,
    formulaCount,
    problemCount,
    questionCount,
  ] of [
    [
      "/classes/class-9-10/general-mathematics",
      algebra,
      "বীজগাণিতিক রাশি",
      "৩",
      10,
      21,
      25,
      8,
    ],
    ["/classes/class-9-10/physics", waves, "তরঙ্গ ও শব্দ", "৭", 11, 8, 10, 11],
  ]) {
    await page.goto(subject);
    const card = page.locator(`a.chapter-card[href="${chapter}"]`);
    await expect(card.locator(".chapter-number")).toHaveText(number);
    await expect(card.locator(".count-row")).toContainText(
      `${new Intl.NumberFormat("bn-BD").format(topicCount)}টি ধারণা`,
    );
    await card.click();
    await expect(
      page.getByRole("heading", { level: 1, name: title, exact: true }),
    ).toBeVisible();
    await expect(page.locator("#concepts article")).toHaveCount(topicCount);
    await expect(page.locator("#formulas article")).toHaveCount(formulaCount);
    await expect(page.locator("#problems article")).toHaveCount(problemCount);
    await expect(page.locator("#questions article")).toHaveCount(questionCount);
    await expect(page.locator(".math-fallback")).toHaveCount(0);
    await page.getByText("উৎস ও পর্যালোচনার তথ্য", { exact: true }).click();
    await expect(page.locator(".source-review")).toHaveAttribute("open", "");
    for (const category of ["ক", "খ", "গ", "ঘ"]) {
      await page
        .getByRole("button", { name: `${category} বিভাগ`, exact: true })
        .click();
      const question = page.locator("#questions article").first();
      await question.locator("summary").click();
      await expect(question.locator(".solution-body")).toBeVisible();
    }
  }
});

test("new formulas and search results point to the correct subject and chapter", async ({
  page,
}) => {
  await page.goto("/formulas");
  await page.getByRole("combobox").first().selectOption("waves-and-sound");
  await expect(page.locator(".formula-card")).toHaveCount(8);
  await page.getByLabel("সূত্র খোঁজো").fill("আলাদা প্রতিধ্বনি");
  await expect(page.locator(".formula-card")).toHaveCount(1);
  await page.getByText("সূত্রের বিস্তারিত দেখো", { exact: true }).click();
  await expect(page.locator(".solution-body")).not.toBeVisible();
  await page.getByText("সমাধান দেখো", { exact: true }).click();
  await expect(page.locator(".solution-body")).toContainText("16.6");
  await page.goto("/search?q=" + encodeURIComponent("উৎপাদক উপপাদ্য"));
  await page
    .locator(`.search-result[href="${algebra}#topic-alg-remainder"]`)
    .click();
  await expect(page.locator("#topic-alg-remainder")).toBeVisible();
  await page.goto("/search?q=" + encodeURIComponent("প্রতিধ্বনি"));
  await page
    .locator(`.search-result[href="${waves}#topic-sound-echo"]`)
    .click();
  await expect(page.locator("#topic-sound-echo")).toBeVisible();
});

test("new assessments score Bengali input and chapter pages fit small screens", async ({
  page,
}) => {
  await page.goto(algebra);
  await page.getByLabel("a²+২ab+b²", { exact: true }).check();
  await page.getByRole("textbox", { name: "তোমার উত্তর" }).nth(0).fill("৭");
  await page.getByLabel("x=২", { exact: true }).check();
  await page.getByLabel("−৩ ও ২", { exact: true }).check();
  await page.getByRole("textbox", { name: "তোমার উত্তর" }).nth(1).fill("−৩");
  await page.getByRole("button", { name: "উত্তর জমা দাও" }).click();
  await expect(
    page.getByRole("heading", { name: "তোমার ফলাফল: ৫ / ৫" }),
  ).toBeVisible();
  await page.goto(waves);
  await page.getByLabel("অনুদৈর্ঘ্য যান্ত্রিক", { exact: true }).check();
  await page.getByRole("textbox", { name: "তোমার উত্তর" }).nth(0).fill("২০");
  await page.getByLabel("০.৬৮ m", { exact: true }).check();
  await page.getByLabel("১৬.৬ m", { exact: true }).check();
  await page.getByRole("textbox", { name: "তোমার উত্তর" }).nth(1).fill("৩৫০");
  await page.getByRole("button", { name: "উত্তর জমা দাও" }).click();
  await expect(
    page.getByRole("heading", { name: "তোমার ফলাফল: ৫ / ৫" }),
  ).toBeVisible();
  await page.setViewportSize({ width: 360, height: 800 });
  for (const url of [algebra, waves, "/formulas"]) {
    await page.goto(url);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
  }
  await page.goto(waves);
  await page.screenshot({ path: "test-results/waves-mobile.png" });
});
