import Link from "next/link";
import {
  ArrowUpLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
  Check,
  Lightbulb,
  Shapes,
  Sigma,
  PenLine,
  ClipboardCheck,
  Sprout,
  ChevronDown,
} from "lucide-react";
import { Button, SubjectCard } from "@/components/ui";
import { subjects } from "@/data/subjects";
import { labels } from "@/data/labels";
import { getChapterContent } from "@/lib/content";
import { bn } from "@/lib/education";
const chapter = "/classes/class-9-10/general-mathematics/real-numbers";
const featureIcons = [Lightbulb, Shapes, Sigma, PenLine, ClipboardCheck];
const steps = [
  "প্রথমে অধ্যায়ের মূল ধারণা বোঝো।",
  "গুরুত্বপূর্ণ সূত্র ও তাদের ব্যবহার শেখো।",
  "সমাধানসহ উদাহরণ অনুশীলন করো।",
  "সৃজনশীল প্রশ্নের উত্তর অনুশীলন করো।",
  "নিজে অনুশীলন করে জ্ঞান যাচাই করো।",
];
export default function Home() {
  const { topics, formulas } = getChapterContent(
    "general-mathematics",
    "real-numbers",
  );
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-label">
              <span /> শেখার পথ হোক আরও সহজ
            </div>
            <h1>
              বোঝার আনন্দে শেখো,
              <br />
              <span>আত্মবিশ্বাসে</span>
              <br />
              এগিয়ে চলো<span className="hero-period">।</span>
            </h1>
            <p>
              গুরুত্বপূর্ণ বিষয়, সূত্র, সৃজনশীল প্রশ্ন ও সমাধান—
              <br className="desktop-break" />
              সবকিছু গুছিয়ে পড়ো এক জায়গায়। নিজের ভাষায়, নিজের গতিতে।
            </p>
            <div className="hero-buttons">
              <Button href="/classes">পড়াশোনা শুরু করো</Button>
              <Button href="/formulas" secondary>
                সূত্রভান্ডার দেখো
              </Button>
            </div>
            <div className="hero-assurances">
              <span>
                <Check size={15} />
                সহজ বাংলায় ব্যাখ্যা
              </span>
              <span>
                <Check size={15} />
                ধাপে ধাপে সমাধান
              </span>
              <span>
                <Check size={15} />
                সবার জন্য উন্মুক্ত
              </span>
            </div>
          </div>
          <div
            className="hero-art"
            aria-label="বাস্তব সংখ্যার পাঠের সংক্ষিপ্ত পরিচয়"
          >
            <span className="art-spark spark-one" aria-hidden="true">
              ✳
            </span>
            <span className="art-spark spark-two" aria-hidden="true">
              ✦
            </span>
            <div className="floating-label">
              <span className="mini-icon">
                <Lightbulb size={18} />
              </span>
              মুখস্থ নয়, বুঝে শেখো <Sparkles size={15} />
            </div>
            <div className="study-sheet">
              <div className="sheet-heading">
                <span className="sheet-book">
                  <BookOpen size={20} />
                </span>
                <div>
                  <small>নবম-দশম শ্রেণি</small>
                  <strong>সাধারণ গণিত</strong>
                </div>
                <span className="sheet-dots">•••</span>
              </div>
              <div className="sheet-rule" />
              <span className="sheet-eyebrow">প্রথম অধ্যায়</span>
              <h2>বাস্তব সংখ্যা</h2>
              <p>সংখ্যার জগৎ চেনার প্রথম ধাপ</p>
              <div className="number-tree">
                <span className="tree-real">
                  বাস্তব সংখ্যা <b>ℝ</b>
                </span>
                <div className="tree-lines" />
                <div className="tree-branches">
                  <span>
                    মূলদ সংখ্যা <b>ℚ</b>
                    <small>½, −৩, ০.৭৫</small>
                  </span>
                  <span>
                    অমূলদ সংখ্যা<small>√২, √৩, π</small>
                  </span>
                </div>
              </div>
              <div className="sheet-example">
                <span>একটু ভেবে দেখো</span>
                <strong>
                  √৯ = ৩ <span>∈</span> ℚ
                </strong>
                <small>সব বর্গমূল কিন্তু অমূলদ নয়!</small>
              </div>
              <Link href={chapter} className="sheet-link">
                চলো, বুঝে নিই <ArrowUpLeft size={17} />
              </Link>
            </div>
            <div className="floating-solved">
              <span className="solved-check">
                <Check size={18} />
              </span>
              <div>
                <strong>একটি ধারণা, পরিষ্কার সমাধান</strong>
                <small>এভাবেই শেখা হয়ে ওঠে সহজ</small>
              </div>
            </div>
            <span className="art-formula" aria-hidden="true">
              a² + b²
            </span>
          </div>
        </div>
      </section>
      <div className="learning-strip">
        <div className="container strip-inner">
          <span>
            <BookOpen size={18} />
            বাংলায় শেখার উন্মুক্ত সঙ্গী
          </span>
          <span>
            <Lightbulb size={18} />
            ধারণা থেকে অনুশীলন
          </span>
          <span>
            <Sprout size={18} />
            ছোট ছোট পদক্ষেপে বড় প্রস্তুতি
          </span>
        </div>
      </div>
      <section className="section container" id="subjects">
        <div className="section-heading">
          <div>
            <span className="eyebrow">তোমার শেখার শুরু এখানেই</span>
            <h2>আজ কী শিখতে চাও?</h2>
            <p>তোমার শ্রেণি ও বিষয় বেছে নিয়ে পড়া শুরু করো।</p>
          </div>
          <Link className="class-pill" href="/classes">
            <span className="status-dot" />
            <span className="class-pill-label">নবম-দশম শ্রেণি</span>
            <ChevronDown
              className="class-pill-arrow"
              size={16}
              aria-hidden="true"
            />
          </Link>
        </div>
        <div className="subjects-grid">
          {subjects.map((s) => (
            <SubjectCard key={s.id} subject={s} />
          ))}
        </div>
        <p className="section-footnote">
          গণিত বইয়ের ১৭টি অধ্যায়ে নির্বাচিত গুরুত্বপূর্ণ পাঠ এবং
          পদার্থবিজ্ঞানে তরঙ্গ ও শব্দের পাঠ প্রস্তুত।
        </p>
      </section>
      <section className="features-section">
        <div className="container section">
          <div className="center-heading">
            <span className="eyebrow">শুধু পড়া নয়, বুঝে শেখা</span>
            <h2>শেখার সব উপকরণ, এক ঠিকানায়</h2>
            <p>
              ধারণা পরিষ্কার করা থেকে নিজের প্রস্তুতি যাচাই—প্রতিটি ধাপে পাশে।
            </p>
          </div>
          <div className="features-grid">
            {labels.sections.map((s, i) => {
              const Icon = featureIcons[i];
              return (
                <Link
                  href={`${chapter}#${s.id}`}
                  className="feature-card"
                  key={s.id}
                >
                  <span className={`feature-icon feature-${i}`}>
                    <Icon size={24} strokeWidth={1.6} />
                  </span>
                  <h3>{s.title}</h3>
                  <p>
                    {
                      [
                        "সহজ ব্যাখ্যা ও উদাহরণে মূল বিষয় বোঝো।",
                        "ক, খ, গ, ঘ—প্রতিটি বিভাগের পূর্ণ উত্তর।",
                        "সূত্রের অর্থ, শর্ত ও ব্যবহার একসঙ্গে।",
                        "প্রতিটি ধাপের যুক্তি বুঝে সমাধান শেখো।",
                        "নিজে উত্তর দাও, প্রস্তুতি যাচাই করো।",
                      ][i]
                    }
                  </p>
                  <span className="text-link">
                    দেখে নাও <ArrowUpLeft size={15} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="chapter-highlight">
          <div className="chapter-highlight-copy">
            <span className="eyebrow">চলো, একটি অধ্যায় দিয়ে শুরু করি</span>
            <h2>
              সংখ্যার জগৎটা
              <br />
              নতুন করে চিনে নিই।
            </h2>
            <p>
              কোনটি মূলদ, কোনটি অমূলদ? বাস্তব সংখ্যার ধারণা
              <br />
              স্পষ্ট হোক সহজ উদাহরণ আর অনুশীলনে।
            </p>
            <Button href={chapter}>বাস্তব সংখ্যা পড়ো</Button>
          </div>
          <div className="chapter-preview">
            <div className="preview-top">
              <span className="subject-icon">
                <BookOpen size={25} />
              </span>
              <span className="badge available">পাঠ প্রস্তুত</span>
            </div>
            <small>সাধারণ গণিত · প্রথম অধ্যায়</small>
            <h3>বাস্তব সংখ্যা</h3>
            <p>সংখ্যার পরিচয় থেকে পারস্পরিক সম্পর্ক</p>
            <div className="preview-stats">
              <span>
                <strong>{bn(topics.length)}</strong>মূল ধারণা
              </span>
              <span>
                <strong>{bn(formulas.length)}</strong>সূত্র ও সম্পর্ক
              </span>
              <span>
                <strong>৪</strong>সৃজনশীল প্রশ্ন
              </span>
            </div>
            <Link href={chapter}>
              অধ্যায়টি খুলে দেখো <ArrowUpLeft size={19} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container how-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">সঠিক পথে, নিজের গতিতে</span>
            <h2>কীভাবে পড়লে ভালো শিখবে?</h2>
            <p>ছোট্ট একটি পরিকল্পনা, শেখায় বড় পার্থক্য।</p>
          </div>
          <span className="how-doodle" aria-hidden="true">
            <Sprout size={45} strokeWidth={1} />
          </span>
        </div>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div className="study-step" key={s}>
              <span>{bn(i + 1).padStart(2, "০")}</span>
              <p>{s}</p>
              {i < 4 && <ArrowRight className="step-arrow" size={17} />}
            </div>
          ))}
        </div>
      </section>
      <section className="container closing-wrap">
        <div className="closing">
          <div>
            <span className="eyebrow">প্রতিদিন একটু, আত্মবিশ্বাস অনেকটা</span>
            <h2>তোমার শেখার গল্প শুরু হোক আজই।</h2>
            <p>কঠিন মনে হওয়া বিষয়ও সহজ হয়, যখন বুঝে পড়া যায়।</p>
          </div>
          <Button href="/classes">চলো, শেখা শুরু করি</Button>
        </div>
      </section>
    </>
  );
}
