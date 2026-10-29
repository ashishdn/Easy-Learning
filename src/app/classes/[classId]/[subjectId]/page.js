import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { getEducation } from "@/lib/education";
import { chapters } from "@/data/chapters";
import { getChapterContent } from "@/lib/content";
import { Breadcrumbs, PageHeading, Button } from "@/components/ui";
import ChapterCatalog from "@/components/catalog";
import { classes } from "@/data/classes";
import { subjects } from "@/data/subjects";
export function generateStaticParams() {
  return classes.flatMap((c) =>
    subjects.map((s) => ({ classId: c.id, subjectId: s.id })),
  );
}
export async function generateMetadata({ params }) {
  const { classId, subjectId } = await params;
  const { subject } = getEducation(classId, subjectId);
  return {
    title: subject?.title || "বিষয়",
    description: subject?.description,
  };
}
export default function SubjectPage({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <SubjectDetails params={params} />
    </Suspense>
  );
}

async function SubjectDetails({ params }) {
  const { classId, subjectId } = await params;
  const { schoolClass, subject } = getEducation(classId, subjectId);
  if (!schoolClass || !subject) notFound();
  return (
    <div className="container page-content">
      <Breadcrumbs
        items={[
          { title: schoolClass.title, href: `/classes/${classId}` },
          { title: subject.title },
        ]}
      />
      <PageHeading eyebrow={schoolClass.title} title={subject.title}>
        {subject.description}
      </PageHeading>
      {subject.ready ? (
        <>
          <p className="notice">
            {subjectId === "general-mathematics"
              ? "প্রদত্ত ২০২৬ শিক্ষাবর্ষের গণিত বইয়ের সূচি অনুযায়ী ১৭টি অধ্যায় সাজানো হয়েছে। প্রতিটিতে নির্বাচিত গুরুত্বপূর্ণ ধারণা, সূত্র, উদাহরণ, ধাপে ধাপে সমাধান ও অনুশীলন আছে। এটি বইয়ের সব অনুশীলনীর হুবহু সমাধান নয়; মূল বইয়ের সঙ্গে মিলিয়ে পড়ো।"
              : "এই বিষয়ে বর্তমানে নিচের নির্বাচিত অধ্যায়ের পাঠ প্রস্তুত। এটি বিষয়টির সম্পূর্ণ অধ্যায়তালিকা নয়; উৎস ও পর্যালোচনার তথ্য সংশ্লিষ্ট পাঠে দেখো।"}
          </p>
          <ChapterCatalog
            chapters={chapters
              .filter((c) => c.subjectId === subjectId && c.classId === classId)
              .map((c) => {
                const content = getChapterContent(subjectId, c.id);
                return {
                  ...c,
                  counts: {
                    topics: content?.topics.length || 0,
                    formulas: content?.formulas.length || 0,
                    questions: content?.questions.length || 0,
                  },
                };
              })}
          />
        </>
      ) : (
        <section className="content-card upcoming">
          <span className="badge">প্রস্তুতি চলছে</span>
          <h2>এই বিষয়টি যত্ন নিয়ে তৈরি হচ্ছে</h2>
          <p>
            পূর্ণাঙ্গ অধ্যায়, সূত্র ও অনুশীলন এখনো যুক্ত হয়নি। নিচের অংশটি
            শুধু একটি ধারণার নমুনা; সম্পূর্ণ পাঠ নয়।
          </p>
          <div className="example">
            <h3>নমুনা পরিচিতি · অনুশীলনী নমুনা</h3>
            <p>{subject.preview}</p>
          </div>
          <Button href={`/classes/${classId}`}>অন্য বিষয় দেখো</Button>
        </section>
      )}
    </div>
  );
}
