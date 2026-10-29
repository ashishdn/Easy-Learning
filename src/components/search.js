"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpLeft } from "lucide-react";
import { searchContent } from "@/lib/search";
import { bn } from "@/lib/education";
import { labels } from "@/data/labels";
import MathText from "@/components/math-text";
export default function SearchContent({ records, initialQuery }) {
  const [query, setQuery] = useState(initialQuery);
  const results = searchContent(records, query);
  return (
    <>
      <form className="input-wrap global-search" action="/search">
        <Search size={22} />
        <input
          name="q"
          aria-label="কী শিখতে চাও?"
          placeholder="অধ্যায়, ধারণা, সূত্র বা প্রশ্ন লিখে খোঁজো…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">খোঁজো</button>
      </form>
      <div aria-live="polite">
        {query.trim() ? (
          <>
            <p className="results-count">
              {bn(results.length)}টি ফলাফল পাওয়া গেছে
            </p>
            <div className="search-results">
              {results.map((r) => (
                <Link href={r.href} className="search-result" key={r.id}>
                  <div>
                    <span className="badge">{r.category}</span>
                    <h2 aria-label={r.title}>
                      <MathText>{r.title}</MathText>
                    </h2>
                    <p>
                      <MathText>{r.text.slice(0, 150)}</MathText>
                      {r.text.length > 150 ? "…" : ""}
                    </p>
                  </div>
                  <ArrowUpLeft size={20} />
                </Link>
              ))}
            </div>
            {!results.length && <p className="empty-state">{labels.empty}</p>}
          </>
        ) : (
          <div className="empty-state">
            <h2>কী শিখতে চাও?</h2>
            <p>যেমন: মূলদ সংখ্যা, পরম মান বা আবৃত্ত দশমিক।</p>
            <div className="filter-buttons">
              {["মূলদ সংখ্যা", "পরম মান", "দশমিক"].map((q) => (
                <button key={q} onClick={() => setQuery(q)}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
