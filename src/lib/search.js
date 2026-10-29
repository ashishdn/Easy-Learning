import { chapters } from "@/data/chapters";
import { getChapterContent } from "@/lib/content";
import { chapterUrl } from "@/lib/education";
import { normalize } from "@/lib/validation";
export function createSearchIndex() {
  return chapters.flatMap((c) => {
    const base = chapterUrl(c);
    const content = getChapterContent(c.subjectId, c.id);
    const chapter = {
      id: c.id,
      title: c.title,
      text: c.description,
      category: "অধ্যায়",
      href: base,
    };
    if (!content) return [chapter];
    return [
      chapter,
      ...content.topics.map((t) => ({
        id: `t-${t.id}`,
        title: t.title,
        text: `${t.definition} ${t.explanation} ${t.mistake}`,
        category: "ধারণা",
        href: `${base}#topic-${t.id}`,
      })),
      ...content.formulas.map((f) => ({
        id: `f-${f.id}`,
        title: f.title,
        text: f.explanation,
        category: "সূত্র ও সম্পর্ক",
        href: `/formulas#formula-${f.id}`,
      })),
      ...content.questions.map((q) => ({
        id: q.id,
        title: q.text,
        text: q.answer,
        category: "সৃজনশীল প্রশ্ন",
        href: `${base}#question-${q.id}`,
      })),
      ...content.problems.map((p) => ({
        id: p.id,
        title: p.text,
        text: p.answer,
        category: "গাণিতিক সমস্যা",
        href: `${base}#problem-${p.id}`,
      })),
    ];
  });
}
export function searchContent(records, query) {
  const terms = normalize(query).split(" ").filter(Boolean);
  if (!terms.length) return [];
  return records.filter((r) =>
    terms.every((term) => normalize(`${r.title} ${r.text}`).includes(term)),
  );
}
