"use client";
import { useState } from "react";
import { normalize } from "@/lib/validation";
import { bn } from "@/lib/education";
import { labels } from "@/data/labels";
export default function FormulaLibrary({
  formulas,
  topics,
  chapters,
  children,
}) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("সব");
  const [chapter, setChapter] = useState("সব");
  const visible = formulas
    .map((f, i) => ({ f, i }))
    .filter(
      ({ f }) =>
        normalize(`${f.title} ${f.explanation}`).includes(normalize(query)) &&
        (topic === "সব" || f.topicId === topic) &&
        (chapter === "সব" || f.chapterId === chapter),
    );
  return (
    <>
      <div className="filters library-filters">
        <label className="search-filter">
          সূত্র খোঁজো
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="সূত্র বা ধারণার নাম…"
          />
        </label>
        <label>
          অধ্যায়
          <select value={chapter} onChange={(e) => setChapter(e.target.value)}>
            <option value="সব">সব অধ্যায়</option>
            {chapters
              .filter((c) => formulas.some((f) => f.chapterId === c.id))
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
          </select>
        </label>
        <label>
          ধারণা
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="সব">সব ধারণা</option>
            {topics
              .filter((t) => formulas.some((f) => f.topicId === t.id))
              .map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
          </select>
        </label>
      </div>
      <p className="results-count" aria-live="polite">
        {bn(visible.length)}টি সূত্র, সংজ্ঞা ও সম্পর্ক
      </p>
      <div className="formula-grid">
        {visible.map(({ f, i }) => (
          <div key={f.id}>{children[i]}</div>
        ))}
      </div>
      {!visible.length && <p className="empty-state">{labels.empty}</p>}
    </>
  );
}
