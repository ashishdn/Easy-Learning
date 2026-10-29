// Shared structure for reviewed handnotes. Source claims stay explicit;
// reviewing calculations does not constitute official textbook verification.
export function buildHandnoteChapter({
  chapterId,
  sources,
  topics,
  formulas,
  questions,
  problems,
  assessment,
  objectives,
  reviewNotes,
  references = [],
}) {
  const metadata = {
    chapterId,
    sourceType: "user-handnote",
    sourceTitle: sources.map((source) => source.title).join(" / "),
    sourceYear: null,
    verificationStatus: "পর্যালোচনাধীন",
    lastReviewed: "2026-10-29",
  };
  return {
    sources,
    objectives,
    reviewNotes,
    references,
    sourceNote:
      "প্রদত্ত দুই সংস্করণের হ্যান্ডনোট মিলিয়ে পাঠ ও সমাধান সাজানো হয়েছে। গণনা ও সূত্রের শর্ত পরীক্ষা করা হয়েছে; এগুলো আনুষ্ঠানিক বোর্ড প্রশ্ন বা পাঠ্যবই-যাচাইকৃত উপকরণ হিসেবে দাবি করা হচ্ছে না।",
    topics: topics.map((record) => ({
      ...metadata,
      summary: record.definition,
      ...record,
    })),
    formulas: formulas.map((record) => ({
      ...metadata,
      relatedTopics: [record.topicId],
      ...record,
    })),
    questions: questions.map((record) => ({
      ...metadata,
      relatedTopics: [],
      relatedFormulas: [],
      ...record,
    })),
    problems: problems.map((record) => ({ ...metadata, ...record })),
    assessment: assessment.map((record) => ({ ...metadata, ...record })),
  };
}
