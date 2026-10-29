import { mathChapterCatalog, textbook } from "../textbook";

export const topic = (
  id,
  title,
  definition,
  explanation,
  notation,
  example,
  mistake,
  extra = {},
) => ({
  id,
  title,
  definition,
  explanation,
  notation: notation.replace(/^\$|\$$/g, ""),
  example,
  mistake,
  ...extra,
});
export const formula = (
  id,
  title,
  expression,
  topicId,
  explanation,
  symbols,
  conditions,
  proof,
  example,
  solution,
  answer,
  category = "সূত্র ও সম্পর্ক",
) => ({
  id,
  title,
  expression,
  topicId,
  explanation,
  symbols,
  conditions,
  proof,
  example,
  solution,
  answer,
  category,
});
export const problem = (
  id,
  text,
  difficulty,
  topicId,
  steps,
  answer,
  formulaId,
) => ({ id, text, difficulty, topicId, steps, answer, formulaId });
export const question = (
  id,
  category,
  text,
  steps,
  answer,
  relatedTopics,
  extra = {},
) => ({
  id,
  category,
  text,
  steps,
  answer,
  relatedTopics,
  relatedFormulas: [],
  ...extra,
});
export const quiz = (id, text, options, expected, explanation) => ({
  id,
  text,
  options,
  expected,
  explanation,
});

export function buildChapter(
  id,
  {
    topics,
    formulas,
    problems,
    questions,
    assessment,
    objectives,
    studyTips = [],
    reviewNotes = [],
  },
) {
  const catalog = mathChapterCatalog.find((c) => c.id === id);
  if (!catalog) throw new Error(`Chapter missing from textbook catalog: ${id}`);
  const meta = {
    chapterId: id,
    sourceType: "textbook-adaptation",
    sourceTitle: textbook.title,
    sourceYear: textbook.sourceYear,
    sourcePages: catalog.sourcePages,
    verificationStatus: "পর্যালোচনাধীন",
    lastReviewed: "2026-10-29",
  };
  const records = (items, defaults = {}) =>
    items.map((record) => ({ ...meta, ...defaults, ...record }));
  return {
    objectives,
    studyTips,
    reviewNotes,
    sources: [
      {
        title: `${textbook.title} — ${textbook.edition}`,
        pages: textbook.pages,
        fileName: textbook.fileName,
      },
    ],
    sourceDescription: `অধ্যায়ের নাম ও বিষয়বস্তু প্রদত্ত বইয়ের ${catalog.sourcePages} থেকে মিলিয়ে নেওয়া হয়েছে। ব্যাখ্যা ও নির্বাচিত উদাহরণ নিজস্ব ভাষায় সাজানো; এটি বইয়ের প্রত্যেক অনুশীলনীর পূর্ণ সমাধান নয়।`,
    sourceNote:
      "বইভিত্তিক নির্বাচিত পূর্ণাঙ্গ ধারণাপাঠ। সংজ্ঞা, শর্ত, প্রমাণের যুক্তি ও সমাধানসহ উদাহরণ একসঙ্গে পড়ো; সব অনুশীলনীর বিকল্প হিসেবে নয়।",
    topics: records(topics).map((t) => ({
      ...t,
      summary: t.summary || t.definition,
    })),
    formulas: records(formulas).map((f) => ({
      ...f,
      relatedTopics: [f.topicId],
    })),
    problems: records(problems, {
      sourceType: "original",
      verificationStatus: "অনুশীলনী নমুনা",
    }),
    questions: records(questions, {
      sourceType: "original",
      verificationStatus: "অনুশীলনী নমুনা",
    }),
    assessment: records(assessment, {
      sourceType: "original",
      verificationStatus: "অনুশীলনী নমুনা",
    }),
  };
}
