import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Loading from "@/app/loading";
import { getEducation, subjectUrl, chapterUrl } from "@/lib/education";
import { getChapterContent } from "@/lib/content";
import { Breadcrumbs, PageHeading, Button } from "@/components/ui";
import ChapterLearning from "@/components/chapters/chapter-learning";
import { chapters } from "@/data/chapters";
export function generateStaticParams() {
  return chapters.map((c) => ({
    classId: c.classId,
    subjectId: c.subjectId,
    chapterSlug: c.slug,
  }));
}
export async function generateMetadata({ params }) {
  const { classId, subjectId, chapterSlug } = await params;
  const { chapter } = getEducation(classId, subjectId, chapterSlug);
  return {
    title: chapter?.title || "অধ্যায় পাওয়া যায়নি",
    description: chapter?.description,
  };
}
export default function ChapterPage({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <ChapterDetails params={params} />
    </Suspense>
  );
}

async function ChapterDetails({ params }) {
  const { classId, subjectId, chapterSlug } = await params;
  const { schoolClass, subject, chapter } = getEducation(
    classId,
    subjectId,
    chapterSlug,
  );
  if (!schoolClass || !subject || !chapter) notFound();
  const content = getChapterContent(subjectId, chapter.id);
  const sequence = chapters.filter(
    (c) => c.classId === classId && c.subjectId === subjectId,
  );
  const position = sequence.findIndex((c) => c.id === chapter.id);
  const previous = sequence[position - 1];
  const next = sequence[position + 1];
  return (
    <div className="container page-content">
      <Breadcrumbs
        items={[
          { title: schoolClass.title, href: `/classes/${classId}` },
          { title: subject.title, href: subjectUrl(subjectId, classId) },
          { title: chapter.title },
        ]}
      />
      <PageHeading
        eyebrow={`${schoolClass.title} · ${subject.title}`}
        title={chapter.title}
      >
        {chapter.description}
      </PageHeading>
      {content ? (
        <ChapterLearning content={content} />
      ) : (
        <div className="content-card upcoming">
          <span className="badge">প্রস্তুতি চলছে</span>
          <h2>পূর্ণাঙ্গ পাঠ এখনো যুক্ত হয়নি</h2>
          <p>
            {chapter.description} এই পরিচিতি শুধু নমুনা কাঠামো। বিস্তারিত ধারণা,
            সমাধান ও অনুশীলন পরবর্তী ধাপে যুক্ত হবে।
          </p>
          <Button href={subjectUrl(subjectId, classId)}>
            অন্য অধ্যায় দেখো
          </Button>
        </div>
      )}
      <nav className="chapter-pagination" aria-label="অধ্যায় পরিবর্তন">
        {previous ? (
          <Link href={chapterUrl(previous)}>
            <span>আগের অধ্যায়</span>
            <strong>{previous.title}</strong>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={chapterUrl(next)}>
            <span>পরের অধ্যায়</span>
            <strong>{next.title}</strong>
          </Link>
        )}
      </nav>
    </div>
  );
}
