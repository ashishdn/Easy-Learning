import Link from "next/link";
import { ArrowUpLeft, GraduationCap } from "lucide-react";
import { classes } from "@/data/classes";
import { Breadcrumbs, PageHeading } from "@/components/ui";
export const metadata = { title: "শ্রেণি নির্বাচন" };
export default function ClassesPage() {
  return (
    <div className="container page-content">
      <Breadcrumbs items={[{ title: "শ্রেণি নির্বাচন" }]} />
      <PageHeading eyebrow="নিজের পথ বেছে নাও" title="তুমি কোন শ্রেণিতে পড়ো?">
        তোমার শ্রেণির বিষয় ও পাঠগুলো একসঙ্গে খুঁজে নাও।
      </PageHeading>
      <div className="chapter-grid">
        {classes.map((c) => (
          <Link href={`/classes/${c.id}`} key={c.id} className="chapter-card">
            <GraduationCap size={35} />
            <h2>{c.title}</h2>
            <p>{c.description}</p>
            <span className="text-link">
              বিষয় বেছে নাও <ArrowUpLeft size={18} />
            </span>
          </Link>
        ))}
        <div className="chapter-card muted">
          <span className="badge">ভবিষ্যৎ পরিকল্পনা</span>
          <h2>আরও শ্রেণির পাঠ</h2>
          <p>পরবর্তী ধাপে অন্যান্য শ্রেণির বিষয় যুক্ত করা হবে।</p>
        </div>
      </div>
    </div>
  );
}
