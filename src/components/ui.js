import Link from "next/link";
import {
  ArrowUpLeft,
  ChevronLeft,
  BookOpen,
  Calculator,
  Atom,
  FlaskConical,
  Leaf,
} from "lucide-react";
import { labels } from "@/data/labels";
import { subjectUrl } from "@/lib/education";
import MathText from "@/components/math-text";
import MathExpression from "@/components/math";
export const icons = {
  math: Calculator,
  atom: Atom,
  flask: FlaskConical,
  leaf: Leaf,
};
export function Brand() {
  return (
    <Link href="/" className="brand">
      <span className="brand-icon">
        <BookOpen size={25} strokeWidth={1.7} />
      </span>
      <span className="brand-copy">
        <span className="brand-title">{labels.brand}</span>
        <small>শেখার আনন্দ, সবার জন্য</small>
      </span>
    </Link>
  );
}
export function Button({ href, children, secondary = false, ...props }) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "secondary" : ""}`}
      {...props}
    >
      {children}
      <ArrowUpLeft size={18} />
    </Link>
  );
}
export function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="অবস্থান">
      <Link href="/">হোম</Link>
      {items.map((item, i) => (
        <span key={i}>
          <ChevronLeft size={13} />
          {item.href ? (
            <Link href={item.href}>{item.title}</Link>
          ) : (
            <span aria-current="page">{item.title}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function PageHeading({ eyebrow, title, children }) {
  return (
    <div className="page-heading">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </div>
  );
}
export function SubjectCard({ subject }) {
  const Icon = icons[subject.icon];
  return (
    <Link
      className={`subject-card ${subject.color}`}
      href={subjectUrl(subject.id)}
    >
      <div className="card-top">
        <span className="subject-icon">
          <Icon size={29} strokeWidth={1.6} />
        </span>
        <span className={`badge ${subject.ready ? "available" : ""}`}>
          {subject.ready ? "পড়া শুরু করো" : labels.preview}
        </span>
      </div>
      <h3>{subject.title}</h3>
      <p>{subject.description}</p>
      <div className="card-bottom">
        <span>
          {subject.ready ? "প্রস্তুত অধ্যায়গুলো দেখো" : "নমুনা পরিচিতি দেখো"}
        </span>
        <ArrowUpLeft size={20} />
      </div>
    </Link>
  );
}
export function Solution({ steps, answer, explanation, reasoning = false }) {
  return (
    <details className="solution">
      <summary>
        {labels.solution}
        {reasoning ? " ও ব্যাখ্যা" : ""}
      </summary>
      <div className="solution-body">
        <h4 className="solution-heading">
          {reasoning ? "উত্তর ও ব্যাখ্যা" : "ধাপে ধাপে সমাধান"}
        </h4>
        {explanation && (
          <p className="solution-explanation">
            <MathText>{explanation}</MathText>
          </p>
        )}
        <ol className="worked-steps">
          {steps.map((step, i) => (
            <li key={i}>
              {typeof step === "string" ? (
                <MathText>{step}</MathText>
              ) : (
                <>
                  <p>
                    <MathText>{step.text}</MathText>
                  </p>
                  {step.math && <MathExpression expression={step.math} />}{" "}
                  {step.reason && (
                    <p className="step-reason">
                      <MathText>{step.reason}</MathText>
                    </p>
                  )}
                </>
              )}
            </li>
          ))}
        </ol>
        <p>
          <strong>চূড়ান্ত উত্তর: </strong>
          <MathText>{answer}</MathText>
        </p>
      </div>
    </details>
  );
}
