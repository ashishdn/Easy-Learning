import katex from "katex";
import { splitMathText } from "@/lib/math-text";

export default function MathText({ children }) {
  return (
    <>
      {splitMathText(children).map((part, index) => {
        if (part.type === "text") return part.text;
        try {
          const html = katex.renderToString(part.tex, {
            throwOnError: true,
            trust: false,
            strict: "error",
            output: "htmlAndMathml",
            maxExpand: 100,
          });
          return (
            <span
              key={index}
              className="math-inline"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return (
            <span key={index} className="math-text-fallback">
              {part.raw}
            </span>
          );
        }
      })}
    </>
  );
}
