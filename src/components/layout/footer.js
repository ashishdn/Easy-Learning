import Link from "next/link";
import { Brand } from "@/components/ui";
import { subjects } from "@/data/subjects";
import { subjectUrl, bn } from "@/lib/education";
export default async function Footer() {
  "use cache";
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Brand />
          <p>
            সহজে শেখো, আত্মবিশ্বাসে এগিয়ে চলো।
            <br />
            বোঝার আনন্দে শেখার একটি উন্মুক্ত ঠিকানা।
          </p>
          <span className="development-note">
            <i />
            ধাপে ধাপে সমৃদ্ধ হচ্ছে জ্ঞানকোষ
          </span>
        </div>
        <div>
          <h3>ঘুরে দেখো</h3>
          <Link href="/">হোম</Link>
          <Link href="/classes">শ্রেণি নির্বাচন</Link>
          <Link href="/formulas">সূত্রভান্ডার</Link>
          <Link href="/search">অনুসন্ধান</Link>
        </div>
        <div>
          <h3>বিষয়সমূহ</h3>
          {subjects.map((s) => (
            <Link key={s.id} href={subjectUrl(s.id)}>
              {s.title}
            </Link>
          ))}
        </div>
        <div>
          <h3>শেখার ছোট্ট কথা</h3>
          <p>
            মুখস্থের আগে বোঝো।
            <br />
            ভুল থেকে শেখো।
            <br />
            প্রতিদিন একটু করে এগিয়ে চলো।
          </p>
          <span className="footer-flower" aria-hidden="true">
            ✳
          </span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          ©{" "}
          {bn(
            Number(
              new Intl.DateTimeFormat("en", {
                year: "numeric",
                timeZone: "Asia/Dhaka",
              }).format(new Date()),
            ),
          )}{" "}
          জ্ঞানকোষ। শেখার আনন্দ, সবার জন্য।
        </span>
        <span>বাংলায় শিখি, নিজের মতো এগিয়ে যাই।</span>
      </div>
    </footer>
  );
}
