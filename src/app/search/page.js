import { Breadcrumbs, PageHeading } from "@/components/ui";
import SearchContent from "@/components/search";
import { createSearchIndex } from "@/lib/search";
import { Suspense } from "react";
export const metadata = { title: "অনুসন্ধান" };
export default function SearchPage({ searchParams }) {
  return (
    <div className="container page-content">
      <Breadcrumbs items={[{ title: "অনুসন্ধান" }]} />
      <PageHeading eyebrow="শেখার উত্তর খুঁজে নাও" title="কী জানতে চাও?">
        অধ্যায়, ধারণা, সূত্র ও প্রশ্ন—সব পাঠের মধ্যে খুঁজে দেখো।
      </PageHeading>
      <Suspense fallback={<p role="status">অনুসন্ধান প্রস্তুত হচ্ছে…</p>}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
async function SearchResults({ searchParams }) {
  const params = await searchParams;
  return (
    <SearchContent
      records={createSearchIndex()}
      initialQuery={typeof params.q === "string" ? params.q : ""}
    />
  );
}
