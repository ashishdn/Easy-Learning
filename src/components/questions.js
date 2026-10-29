"use client";
import { useState } from "react";
import Link from "next/link";
import { Solution } from "@/components/ui";
import { labels } from "@/data/labels";
import MathText from "@/components/math-text";
export default function Questions({ questions }) {
  const [category, setCategory] = useState("সব");
  const filtered = questions.filter(
    (q) => category === "সব" || q.category === category,
  );
  return (
    <>
      <div className="filter-buttons" role="group" aria-label="প্রশ্নের বিভাগ">
        {["সব", "ক", "খ", "গ", "ঘ"].map((c) => (
          <button
            key={c}
            className={c === category ? "selected" : ""}
            onClick={() => setCategory(c)}
            aria-pressed={c === category}
          >
            {c === "সব" ? "সব বিভাগ" : `${c} বিভাগ`}
          </button>
        ))}
      </div>
      {filtered.map((q) => (
        <article
          className="content-card question-card"
          id={`question-${q.id}`}
          key={q.id}
        >
          <span className="badge">
            {q.category} বিভাগ · {q.verificationStatus} ·{" "}
            {q.sourceType === "user-handnote"
              ? "হ্যান্ডনোটভিত্তিক অনুশীলন"
              : "নিজস্ব প্রশ্ন"}
          </span>
          {q.stimulus && (
            <p className="example">
              <strong>উদ্দীপক: </strong>
              <MathText>{q.stimulus}</MathText>
            </p>
          )}
          <h3 aria-label={q.text}>
            <MathText>{q.text}</MathText>
          </h3>
          <Solution
            steps={q.steps}
            answer={q.answer}
            explanation={q.explanation}
            reasoning={q.category === "খ"}
          />
          {q.sourcePages && <p className="muted-text">উৎস: {q.sourcePages}</p>}
          <div className="related-links">
            {q.relatedTopics.map((id) => (
              <a href={`#topic-${id}`} key={id}>
                সম্পর্কিত ধারণা
              </a>
            ))}
            {q.relatedFormulas.map((id) => (
              <Link href={`/formulas#formula-${id}`} key={id}>
                সম্পর্কিত সূত্র
              </Link>
            ))}
          </div>
        </article>
      ))}
      {!filtered.length && <p className="empty-state">{labels.empty}</p>}
    </>
  );
}
