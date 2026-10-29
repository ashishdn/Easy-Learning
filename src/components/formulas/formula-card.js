import MathExpression from "@/components/math";
import { Solution } from "@/components/ui";
import MathText from "@/components/math-text";
import { ChevronRight } from "lucide-react";
export default function FormulaCard({ formula }) {
  return (
    <article className="content-card formula-card" id={`formula-${formula.id}`}>
      <span className="badge">
        {formula.category} · {formula.verificationStatus}
      </span>
      <h3>
        <MathText>{formula.title}</MathText>
      </h3>
      <MathExpression expression={formula.expression} />
      <p>
        <MathText>{formula.explanation}</MathText>
      </p>
      <details>
        <summary className="formula-disclosure">
          <ChevronRight
            className="formula-disclosure-icon"
            size={16}
            aria-hidden="true"
          />
          <span>সূত্রের বিস্তারিত দেখো</span>
        </summary>
        <div className="detail-content">
          <p>
            <strong>প্রতীকের অর্থ: </strong>
            <MathText>{formula.symbols}</MathText>
          </p>
          <p>
            <strong>প্রযোজ্য শর্ত: </strong>
            <MathText>{formula.conditions}</MathText>
          </p>
          <p>
            <strong>ব্যাখ্যা ও প্রতিপাদন: </strong>
            <MathText>{formula.proof}</MathText>
          </p>
          <h4>উদাহরণ</h4>
          <p>
            <MathText>{formula.example}</MathText>
          </p>
          <Solution steps={formula.solution} answer={formula.answer} />
        </div>
      </details>
    </article>
  );
}
