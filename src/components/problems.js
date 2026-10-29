"use client";
import { useState } from "react";
import Link from "next/link";
import { Solution } from "@/components/ui";
import { labels } from "@/data/labels";
import MathText from "@/components/math-text";
export default function Problems({ problems, topics }) {
  const [difficulty, setDifficulty] = useState("সব");
  const [topic, setTopic] = useState("সব");
  const filtered = problems.filter(
    (p) =>
      (difficulty === "সব" || p.difficulty === difficulty) &&
      (topic === "সব" || p.topicId === topic),
  );
  return (
    <>
      <div className="filters">
        <label>
          কঠিনতার মাত্রা
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            {["সব", "সহজ", "মধ্যম", "চ্যালেঞ্জিং"].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <label>
          ধারণা
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="সব">সব ধারণা</option>
            {topics
              .filter((t) => problems.some((p) => p.topicId === t.id))
              .map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
          </select>
        </label>
      </div>
      {filtered.map((p) => (
        <article className="content-card" id={`problem-${p.id}`} key={p.id}>
          <span className="badge">
            {p.difficulty} ·{" "}
            {p.sourceType === "user-handnote"
              ? "হ্যান্ডনোটভিত্তিক অনুশীলন"
              : "নিজস্ব অনুশীলন"}
          </span>
          <h3 aria-label={p.text}>
            <MathText>{p.text}</MathText>
          </h3>
          <p className="muted-text">
            আগে নিজে চেষ্টা করো। তারপর সমাধানের সঙ্গে মিলিয়ে নাও।
          </p>
          <Solution steps={p.steps} answer={p.answer} />
          {p.sourcePages && <p className="muted-text">উৎস: {p.sourcePages}</p>}
          <div className="related-links">
            <a href={`#topic-${p.topicId}`}>সম্পর্কিত ধারণা</a>
            {p.formulaId && (
              <Link href={`/formulas#formula-${p.formulaId}`}>
                সম্পর্কিত সূত্র
              </Link>
            )}
          </div>
        </article>
      ))}
      {!filtered.length && (
        <p className="empty-state">
          এই বাছাইয়ে সমস্যা নেই। অন্য মাত্রা বা ধারণা বেছে নাও।
        </p>
      )}
    </>
  );
}
