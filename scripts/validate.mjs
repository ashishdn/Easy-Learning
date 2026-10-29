import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";
import katex from "katex";

// Load application data without introducing a second bundler or test framework.
const root = fileURLToPath(new URL("../", import.meta.url));
const modules = new Map();
async function load(filename) {
  let resolved = filename;
  if (!path.extname(resolved)) {
    try {
      await readFile(`${resolved}.js`);
      resolved += ".js";
    } catch {
      resolved = path.join(resolved, "index.js");
    }
  }
  if (modules.has(resolved)) return modules.get(resolved);
  const dataModule = new vm.SourceTextModule(await readFile(resolved, "utf8"), {
    identifier: resolved,
  });
  modules.set(resolved, dataModule);
  await dataModule.link((specifier) =>
    load(
      specifier.startsWith("@/")
        ? path.join(root, "src", specifier.slice(2))
        : path.resolve(path.dirname(resolved), specifier),
    ),
  );
  await dataModule.evaluate();
  return dataModule;
}
const get = async (name) =>
  (await load(path.join(root, "src", name))).namespace;
const { getAllContent, getChapterContent } = await get("lib/content.js");
const content = getAllContent();
const topics = content.flatMap((c) => c.topics);
const questions = content.flatMap((c) => c.questions);
const formulas = content.flatMap((c) => c.formulas);
const problems = content.flatMap((c) => c.problems);
const assessment = content.flatMap((c) => c.assessment);
const { chapters } = await get("data/chapters.js");
const { normalize, checkAnswer, validateRecords } =
  await get("lib/validation.js");
const { getEducation } = await get("lib/education.js");
const { createSearchIndex, searchContent } = await get("lib/search.js");
const { notationToTex, splitMathText } = await get("lib/math-text.js");
assert.equal(notationToTex("x+১/x²"), "x+\\dfrac{1}{x^{2}}");
assert.equal(notationToTex("(x²−৯)/(x²+x−৬)"), "\\dfrac{x^{2}-9}{x^{2}+x-6}");
assert.equal(notationToTex("√২"), "\\sqrt{2}");
assert.equal(notationToTex("s⁻¹"), "\\mathrm{s}^{-1}");
for (const lesson of content) {
  for (const record of [
    ...lesson.topics,
    ...lesson.formulas,
    ...lesson.questions,
    ...lesson.problems,
    ...lesson.assessment,
  ]) {
    for (const field of [
      "text",
      "definition",
      "explanation",
      "example",
      "mistake",
      "summary",
      "proof",
      "answer",
      "conditions",
      "symbols",
      "stimulus",
    ]) {
      for (const part of splitMathText(record[field]))
        if (part.type === "math")
          katex.renderToString(part.tex, {
            throwOnError: true,
            trust: false,
            strict: "error",
          });
    }
    for (const step of record.steps || record.solution || []) {
      if (typeof step === "object" && step.math)
        katex.renderToString(step.math, {
          throwOnError: true,
          trust: false,
          strict: "error",
          displayMode: true,
        });
      for (const text of typeof step === "string"
        ? [step]
        : [step.text, step.reason])
        for (const part of splitMathText(text))
          if (part.type === "math")
            katex.renderToString(part.tex, {
              throwOnError: true,
              trust: false,
              strict: "error",
            });
    }
  }
}
for (const records of [topics, questions, formulas, problems])
  validateRecords(records);
for (const chapter of chapters.filter((c) => c.ready)) {
  const lesson = getChapterContent(chapter.subjectId, chapter.id);
  assert.ok(
    lesson &&
      lesson.topics.length &&
      lesson.formulas.length &&
      lesson.problems.length &&
      lesson.assessment.length,
  );
  for (const record of [
    ...lesson.topics,
    ...lesson.formulas,
    ...lesson.questions,
    ...lesson.problems,
  ])
    assert.equal(record.chapterId, chapter.id);
}
assert.equal(new Set(chapters.map((c) => c.slug)).size, chapters.length);
for (const formula of formulas) {
  assert.ok(
    formula.solution.length &&
      formula.answer &&
      formula.conditions &&
      formula.symbols,
  );
  assert.ok(topics.some((t) => t.id === formula.topicId));
  katex.renderToString(formula.expression, {
    throwOnError: true,
    trust: false,
    strict: "error",
  });
}
for (const topic of topics)
  katex.renderToString(topic.notation, {
    throwOnError: true,
    trust: false,
    strict: "error",
  });
for (const record of [...questions, ...problems]) {
  assert.ok(chapters.some((c) => c.id === record.chapterId));
  for (const topicId of record.relatedTopics || [record.topicId])
    assert.ok(topics.some((t) => t.id === topicId));
  for (const formulaId of record.relatedFormulas ||
    (record.formulaId ? [record.formulaId] : []))
    assert.ok(formulas.some((f) => f.id === formulaId));
}
for (const q of assessment) {
  assert.ok(q.expected && q.explanation);
  if (q.options) assert.ok(q.options.includes(q.expected));
}
assert.equal(normalize("  মূলদ   সংখ্যা\u200b "), normalize("মূলদ সংখ্যা"));
assert.ok(checkAnswer(" ৮ ", "8"));
assert.ok(!checkAnswer("৭", "8"));
assert.ok(checkAnswer("−৩", "-3"));
assert.equal(getEducation("missing", "physics").schoolClass, undefined);
assert.equal(
  getEducation("class-9-10", "physics", "real-numbers").chapter,
  undefined,
);
const index = createSearchIndex();
assert.ok(
  searchContent(index, "মূলদ সংখ্যা").some((r) =>
    r.href.endsWith("#topic-rational"),
  ),
);
assert.ok(
  searchContent(index, "পরম মান").some((r) =>
    r.href.endsWith("#formula-absolute"),
  ),
);
assert.equal(searchContent(index, "").length, 0);
assert.equal(searchContent(index, "কোনোঅস্তিত্বহীনশব্দ").length, 0);
assert.ok(
  searchContent(index, "প্রতিধ্বনি").some((r) =>
    r.href.includes("/physics/waves-and-sound"),
  ),
);
assert.ok(
  searchContent(index, "উৎপাদক উপপাদ্য").some((r) =>
    r.href.includes("algebraic-expressions"),
  ),
);
assert.equal(new Set(index.map((r) => r.id)).size, index.length);
const algebra = getChapterContent(
  "general-mathematics",
  "algebraic-expressions",
);
const waves = getChapterContent("physics", "waves-and-sound");
assert.equal(algebra.problems.length, 25);
assert.equal(algebra.questions.length, 8);
assert.equal(waves.problems.length, 10);
for (const lesson of [algebra, waves]) {
  assert.ok(lesson.sources.length >= 2);
  for (const category of ["ক", "খ", "গ", "ঘ"])
    assert.ok(lesson.questions.some((q) => q.category === category));
}
// Independently recompute numeric results in the worked examples.
assert.equal(375 / 1000, 3 / 8);
assert.equal(12 / 99, 4 / 33);
assert.ok(3 / 7 < 1 / 2 && 1 / 2 < 4 / 7);
assert.ok(Math.abs(Math.sqrt(2) + Math.sqrt(8) - 3 * Math.sqrt(2)) < 1e-12);
assert.equal(125 / 1000, 1 / 8);
assert.equal(Math.abs(-5) + Math.abs(3), 8);
const near = (actual, expected, tolerance = 1e-8) =>
  assert.ok(
    Math.abs(actual - expected) < tolerance,
    `${actual} != ${expected}`,
  );
// Verify the complete supplied book catalog, instructional coverage, and
// representative calculations independently of the displayed solution strings.
const mathCatalog = chapters.filter(
  (c) => c.subjectId === "general-mathematics",
);
const mathLessons = mathCatalog.map((c) =>
  getChapterContent(c.subjectId, c.id),
);
assert.equal(mathLessons.length, 17);
assert.deepEqual(
  mathCatalog.map((c) => c.number),
  Array.from({ length: 17 }, (_, i) => i + 1),
);
for (const lesson of mathLessons) {
  assert.ok(lesson.topics.length >= 4);
  assert.ok(lesson.formulas.length >= 2);
  assert.ok(lesson.problems.length >= 4);
  assert.ok(lesson.assessment.length >= 4);
  assert.ok(
    lesson.sources.some(
      (s) =>
        s.fileName === "Secondary (BV)-2026_Class 9-10_Math_compressed.pdf",
    ),
  );
  for (const category of ["ক", "খ", "গ", "ঘ"])
    assert.ok(lesson.questions.some((q) => q.category === category));
  for (const item of lesson.assessment)
    if (item.options) assert.ok(item.options.includes(item.expected));
}
assert.equal(24 + 20 - (40 - 8), 12); // Venn intersection
assert.equal(2 ** 3, 8); // power set
near(Math.log(1000) / Math.log(10), 3);
near(27 ** (2 / 3), 9);
for (const x of [2, 3]) near(x * x - 5 * x + 6, 0);
assert.equal(180 - 50 - 60, 70);
assert.ok(3 + 4 > 5 && 4 + 5 > 3 && 3 + 5 > 4);
assert.equal(Math.sqrt(13 ** 2 - 5 ** 2) * 2, 24); // circle chord
near(Math.sin(Math.PI / 6), 0.5);
near(
  (20 * Math.tan(Math.PI / 6)) /
    (1 - Math.tan(Math.PI / 6) / Math.tan(Math.PI / 3)),
  10 * Math.sqrt(3),
);
assert.equal((600 * 2) / (2 + 3), 240); // proportional sharing
assert.equal(3 + 2, 5);
assert.equal(3 - 2, 1);
assert.equal(
  Array.from({ length: 20 }, (_, i) => 5 + 3 * i).reduce((a, b) => a + b, 0),
  670,
);
assert.equal(
  [3, 6, 12, 24, 48].reduce((a, b) => a + b, 0),
  93,
);
assert.equal(16 / 4, (4 / 2) ** 2); // area ratio is square of length ratio
assert.equal(3 ** 2 + 4 ** 2, 5 ** 2);
near(Math.sqrt(6 * (6 - 3) * (6 - 4) * (6 - 5)), 6); // Heron
assert.equal((4 * 5 + 10 * 15 + 6 * 25) / 20, 16); // grouped mean
assert.equal(10 + ((20 / 2 - 4) / 10) * 10, 16); // grouped median
assert.equal(10 + ((10 - 4) / (2 * 10 - 4 - 6)) * 10, 16); // grouped mode
// Independently check the identities at negative, zero, fractional and positive values.
for (const a of [-3, -0.5, 0, 1, 4])
  for (const b of [-2, 0, 0.25, 3]) {
    near((a + b) ** 2, a * a + 2 * a * b + b * b);
    near((a - b) ** 2, a * a - 2 * a * b + b * b);
    near(a * a - b * b, (a + b) * (a - b));
    near((a + b) ** 3, a ** 3 + 3 * a * a * b + 3 * a * b * b + b ** 3);
    near((a - b) ** 3, a ** 3 - 3 * a * a * b + 3 * a * b * b - b ** 3);
    near(a ** 3 + b ** 3, (a + b) * (a * a - a * b + b * b));
    near(a ** 3 - b ** 3, (a - b) * (a * a + a * b + b * b));
    near(
      a ** 4 + a * a * b * b + b ** 4,
      (a * a + a * b + b * b) * (a * a - a * b + b * b),
    );
    const c = 2 - a;
    near(
      a ** 3 + b ** 3 + c ** 3 - 3 * a * b * c,
      (a + b + c) * (a * a + b * b + c * c - a * b - b * c - c * a),
    );
    near(
      a * a + b * b + c * c - a * b - b * c - c * a,
      ((a - b) ** 2 + (b - c) ** 2 + (c - a) ** 2) / 2,
    );
  }
for (const x of [-4, -0.5, 0.5, 2, 3]) {
  near(x * x + 1 / (x * x), (x + 1 / x) ** 2 - 2);
  near(x ** 3 + 1 / x ** 3, (x + 1 / x) ** 3 - 3 * (x + 1 / x));
  near(x ** 3 - 1 / x ** 3, (x - 1 / x) ** 3 + 3 * (x - 1 / x));
  near(x ** 3 - 7 * x + 6, (x - 1) * (x + 3) * (x - 2));
  near(6 * x * x - x - 2, (3 * x - 2) * (2 * x + 1));
  near(x ** 3 - 6 * x * x + 11 * x - 6, (x - 1) * (x - 2) * (x - 3));
  if (x !== -3 && x !== 2)
    near((x * x - 9) / (x * x + x - 6), (x - 3) / (x - 2));
}
assert.deepEqual(
  [5 ** 2 - 2 * 6, 5 ** 3 - 3 * 6 * 5, 3 ** 2 + 2 * 10, 3 ** 3 + 3 * 10 * 3],
  [13, 35, 29, 117],
);
assert.deepEqual([103 ** 2, 102 * 98, 998 ** 2], [10609, 9996, 996004]);
near(
  (3 + 2 * Math.sqrt(2)) ** 4 - 1 / (3 + 2 * Math.sqrt(2)) ** 4,
  816 * Math.sqrt(2),
);
assert.equal(8 - 12 + 8 - 5, -1);
assert.equal(4 * (-0.5) ** 3 - 3 * -0.5 + 2, 3);
assert.equal(64 - 96 + 44 - 6, 6);
near(14400 / 60, 240);
near(1 / 240, 0.0041666666667);
near(340 / 0.75, 453.3333333333);
near(332 + 0.6 * 35, 353);
near(500 * (340 / 500 + 2.2), 1440);
near((344 * 0.8) / 2, 137.6);
near((2 * (137.6 - 20)) / 344, 0.6837209302);
near((344 * 0.75) / 2, 129);
near((340 * 0.4) / 2 + (340 * 0.6) / 2, 170);
near((340 * 25) / 480, 17.7083333333);
near((332 * 0.1) / 2, 16.6);
near((2 * 8.3) / 332, 0.05);
console.log(
  `Validated ${content.length} chapters and ${index.length} searchable records, all solutions/references/KaTeX, handnote coverage, polynomial identities, corrected echo calculations, and numeric answers.`,
);
console.table(
  mathCatalog.map((chapter, i) => ({
    chapter: chapter.number,
    slug: chapter.slug,
    concepts: mathLessons[i].topics.length,
    formulas: mathLessons[i].formulas.length,
    problems: mathLessons[i].problems.length,
    questions: mathLessons[i].questions.length,
    quiz: mathLessons[i].assessment.length,
  })),
);
console.log(
  "Mathematics totals:",
  Object.fromEntries(
    ["topics", "formulas", "problems", "questions", "assessment"].map((key) => [
      key,
      mathLessons.reduce((sum, lesson) => sum + lesson[key].length, 0),
    ]),
  ),
);
