import { labels } from "@/data/labels";
import { bn } from "@/lib/education";
import MathExpression from "@/components/math";
import FormulaCard from "@/components/formulas/formula-card";
import Questions from "@/components/questions";
import Problems from "@/components/problems";
import Assessment from "@/components/assessment";
import MathText from "@/components/math-text";
import StudyFigure from "@/components/lessons/study-figure";
export default function ChapterLearning({ content }) {
  return (
    <>
      <div className="learning-intro content-card">
        <span className="eyebrow">এই অধ্যায় শেষে</span>
        <h2>কী কী শিখবে?</h2>
        <ul>
          {content.objectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <p className="muted-text">
          {content.sourceNote ||
            "পাঠ ও প্রশ্নগুলো নিজস্ব শিক্ষণ-সহায়িকা ও অনুশীলনী নমুনা। এগুলো আনুষ্ঠানিক বোর্ড প্রশ্ন বা যাচাইকৃত পাঠ্যবইয়ের অনুলিপি নয়।"}
        </p>
        {content.sources && (
          <details className="source-review">
            <summary>উৎস ও পর্যালোচনার তথ্য</summary>
            <ul>
              {content.sources.map((source) => (
                <li key={source.title}>
                  {source.title} · {bn(source.pages)} পৃষ্ঠা
                </li>
              ))}
            </ul>
            <p>
              {content.sourceDescription ||
                "প্রদত্ত হ্যান্ডনোট থেকে বিষয়গুলো মিলিয়ে নিজস্ব ভাষায় সাজানো হয়েছে। অধ্যায় নম্বর হ্যান্ডনোট অনুসারে; নির্দিষ্ট পাঠ্যবইয়ের সংস্করণের সঙ্গে আনুষ্ঠানিক যাচাই বাকি।"}
            </p>
            {content.reviewNotes?.map((note) => (
              <p key={note}>{note}</p>
            ))}
            {content.references?.length > 0 && (
              <>
                <h3>ব্যাখ্যা মিলিয়ে দেখার সহায়ক সূত্র</h3>
                <ul>
                  {content.references.map((reference) => (
                    <li key={reference.href}>
                      <a
                        href={reference.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {reference.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </details>
        )}
      </div>
      <div className="learning-layout">
        <aside className="chapter-sidebar">
          <strong>এই অধ্যায়ে</strong>
          <nav aria-label="অধ্যায়ের বিভাগ">
            {labels.sections.map((s, i) => (
              <a key={s.id} href={`#${s.id}`}>
                <span>{bn(i + 1)}</span>
                {s.short}
              </a>
            ))}
          </nav>
          <div className="sidebar-note">
            প্রথমে বোঝো।
            <br />
            তারপর নিজে চেষ্টা করো।
          </div>
        </aside>
        <div className="lesson-content">
          <section id="concepts" className="lesson-section">
            <div className="lesson-section-title">
              <span>০১</span>
              <h2>{labels.sections[0].title}</h2>
            </div>
            {content.topics.map((t) => (
              <article
                className="content-card topic-card"
                key={t.id}
                id={`topic-${t.id}`}
              >
                <span className="badge">{t.verificationStatus}</span>
                <h3>{t.title}</h3>
                <p>
                  <strong>সংজ্ঞা: </strong>
                  <MathText>{t.definition}</MathText>
                </p>
                <p>
                  <strong>ব্যাখ্যা ও বৈশিষ্ট্য: </strong>
                  <MathText>{t.explanation}</MathText>
                </p>
                <MathExpression expression={t.notation} />
                {t.figure && <StudyFigure figure={t.figure} />}
                {t.table && (
                  <div
                    className="lesson-table-scroll"
                    role="region"
                    aria-label={t.table.caption}
                    tabIndex={0}
                  >
                    <table className="lesson-table">
                      <caption>{t.table.caption}</caption>
                      <thead>
                        <tr>
                          {t.table.headers.map((header) => (
                            <th scope="col" key={header}>
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {t.table.rows.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td key={j}>
                                <MathText>{cell}</MathText>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="example">
                  <h4>উদাহরণ ও ব্যাখ্যা</h4>
                  <p>
                    <MathText>{t.example}</MathText>
                  </p>
                </div>
                <p className="mistake">
                  <strong>সাধারণ ভুল এড়াও: </strong>
                  <MathText>{t.mistake}</MathText>
                </p>
                <p>
                  <strong>মনে রাখো: </strong>
                  <MathText>{t.summary}</MathText>
                </p>
                {t.sourcePages && (
                  <p className="muted-text">উৎস: {t.sourcePages}</p>
                )}
              </article>
            ))}
          </section>
          <section id="questions" className="lesson-section">
            <div className="lesson-section-title">
              <span>০২</span>
              <h2>{labels.sections[1].title}</h2>
            </div>
            <p>
              সমাধানসহ অনুশীলনী প্রশ্ন। বিভাগ বেছে নিয়ে আগে নিজে উত্তর দেওয়ার
              চেষ্টা করো।
            </p>
            <Questions questions={content.questions} />
          </section>
          <section id="formulas" className="lesson-section">
            <div className="lesson-section-title">
              <span>০৩</span>
              <h2>{labels.sections[2].title}</h2>
            </div>
            {content.formulas.map((f) => (
              <FormulaCard formula={f} key={f.id} />
            ))}
          </section>
          <section id="problems" className="lesson-section">
            <div className="lesson-section-title">
              <span>০৪</span>
              <h2>{labels.sections[3].title}</h2>
            </div>
            <Problems problems={content.problems} topics={content.topics} />
          </section>
          <section id="practice" className="lesson-section">
            <div className="lesson-section-title">
              <span>০৫</span>
              <h2>{labels.sections[4].title}</h2>
            </div>
            <Assessment questions={content.assessment} />
            {content.studyTips?.length > 0 && (
              <div className="content-card revision-checklist">
                <h3>পুনরালোচনার ছোট চেকলিস্ট</h3>
                <ul>
                  {content.studyTips.map((tip) => (
                    <li key={tip}>
                      <MathText>{tip}</MathText>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
