import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { classes } from "@/data/classes";
import { subjects } from "@/data/subjects";
import { Breadcrumbs, PageHeading, SubjectCard } from "@/components/ui";
export function generateStaticParams() {
  return classes.map((c) => ({ classId: c.id }));
}
export async function generateMetadata({ params }) {
  const { classId } = await params;
  const c = classes.find((c) => c.id === classId);
  return { title: c?.title || "শ্রেণি" };
}
export default function ClassPage({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <ClassDetails params={params} />
    </Suspense>
  );
}

async function ClassDetails({ params }) {
  const { classId } = await params;
  const c = classes.find((c) => c.id === classId);
  if (!c) notFound();
  return (
    <div className="container page-content">
      <Breadcrumbs
        items={[{ title: "শ্রেণি", href: "/classes" }, { title: c.title }]}
      />
      <PageHeading eyebrow="বিষয় নির্বাচন" title={c.title}>
        {c.description}
      </PageHeading>
      <div className="subjects-grid">
        {subjects.map((s) => (
          <SubjectCard subject={s} key={s.id} />
        ))}
      </div>
      <p className="notice">
        সাধারণ গণিতের ১৭টি অধ্যায়ে নির্বাচিত গুরুত্বপূর্ণ পাঠ এবং
        পদার্থবিজ্ঞানের তরঙ্গ ও শব্দ অধ্যায়ের হ্যান্ডনোট প্রস্তুত। রসায়ন ও
        জীববিজ্ঞানে নমুনা পরিচিতি রয়েছে।
      </p>
    </div>
  );
}
