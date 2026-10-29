"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpLeft, BookOpen } from "lucide-react";
import { normalize } from "@/lib/validation";
import { chapterUrl, bn } from "@/lib/education";
import { labels } from "@/data/labels";
export default function ChapterCatalog({ chapters }) {
  const [query, setQuery] = useState("");
  const results = chapters.filter((c) =>
    normalize(c.title).includes(normalize(query)),
  );
  return (
    <>
      <label className="input-wrap">
        <Search size={19} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="অধ্যায়ের নাম লিখে খোঁজো…"
          aria-label="অধ্যায় অনুসন্ধান"
        />
      </label>
      <p className="results-count">
        {bn(results.length)}টি অধ্যায় ·{" "}
        {chapters.every((c) => c.catalogVerified)
          ? "প্রদত্ত বইয়ের সূচি অনুযায়ী"
          : "প্রস্তুত অধ্যায়ের তালিকা"}
      </p>
      <div className="chapter-grid">
        {results.map((c) => (
          <Link key={c.id} href={chapterUrl(c)} className="chapter-card">
            <div className="card-top">
              <span className="chapter-number">
                {c.number ? bn(c.number) : "পাঠ"}
              </span>
              <span className={`badge ${c.ready ? "available" : ""}`}>
                {c.ready ? "পাঠ প্রস্তুত" : labels.preview}
              </span>
            </div>
            <h2>{c.title}</h2>
            <p>{c.description}</p>
            {c.ready && (
              <div className="count-row">
                <span>{bn(c.counts.topics)}টি ধারণা</span>
                <span>{bn(c.counts.formulas)}টি সূত্র ও সম্পর্ক</span>
                <span>{bn(c.counts.questions)}টি প্রশ্ন</span>
              </div>
            )}
            <span className="text-link">
              <BookOpen size={16} />
              {c.ready ? "অধ্যায় পড়ো" : "অধ্যায়ের পরিচিতি"}
              <ArrowUpLeft size={17} />
            </span>
          </Link>
        ))}
      </div>
      {!results.length && <p className="empty-state">{labels.empty}</p>}
    </>
  );
}
