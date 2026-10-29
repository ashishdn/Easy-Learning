import katex from "katex";
import MathViewport from "@/components/math-viewport";
export default function MathExpression({ expression }) {
  let markup;
  try {
    markup = katex.renderToString(expression, {
      throwOnError: true,
      trust: false,
      strict: "error",
      output: "htmlAndMathml",
      maxExpand: 100,
      displayMode: true,
    });
  } catch {
    return (
      <p className="math-fallback">
        গাণিতিক রূপ: <code>{expression}</code>
      </p>
    );
  }
  return (
    <MathViewport>
      <span dangerouslySetInnerHTML={{ __html: markup }} />
    </MathViewport>
  );
}
