"use client";
import { useState } from "react";
import { checkAnswer } from "@/lib/validation";
import { bn } from "@/lib/education";
import MathText from "@/components/math-text";
export default function Assessment({ questions }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = questions.filter((q) =>
    checkAnswer(answers[q.id] || "", q.expected),
  ).length;
  function reset() {
    setAnswers({});
    setSubmitted(false);
  }
  return (
    <div className="assessment">
      <p className="notice">
        ফলাফল কেবল এই খোলা পাঠের জন্য। পৃষ্ঠা রিফ্রেশ করলে বা অন্য পৃষ্ঠায় গেলে
        উত্তর ও ফলাফল মুছে যাবে।
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        {questions.map((q, i) => (
          <fieldset className="content-card" key={q.id} disabled={submitted}>
            <legend>
              {bn(i + 1)}. <MathText>{q.text}</MathText>
            </legend>
            {q.options ? (
              q.options.map((o) => (
                <label className="radio-option" key={o}>
                  <input
                    type="radio"
                    name={q.id}
                    value={o}
                    checked={answers[q.id] === o}
                    onChange={(e) =>
                      setAnswers({ ...answers, [q.id]: e.target.value })
                    }
                    required
                    aria-label={o}
                  />
                  <span>
                    <MathText>{o}</MathText>
                  </span>
                </label>
              ))
            ) : (
              <label>
                তোমার উত্তর
                <input
                  className="answer-input"
                  required
                  value={answers[q.id] || ""}
                  onChange={(e) =>
                    setAnswers({ ...answers, [q.id]: e.target.value })
                  }
                  inputMode="numeric"
                />
              </label>
            )}
            {submitted && (
              <p
                className={`feedback ${checkAnswer(answers[q.id], q.expected) ? "correct" : "incorrect"}`}
              >
                <MathText>
                  {checkAnswer(answers[q.id], q.expected)
                    ? "সঠিক উত্তর।"
                    : `সঠিক উত্তর: ${q.expected}।`}
                </MathText>{" "}
                <MathText>{q.explanation}</MathText>
              </p>
            )}
          </fieldset>
        ))}
        {!submitted ? (
          <button className="button" type="submit">
            উত্তর জমা দাও
          </button>
        ) : (
          <div role="status" className="score-panel">
            <h3>
              তোমার ফলাফল: {bn(score)} / {bn(questions.length)}
            </h3>
            <p>ব্যাখ্যাগুলো পড়ে ধারণা আরও পরিষ্কার করে নাও।</p>
            <button type="button" className="button secondary" onClick={reset}>
              আবার চেষ্টা করো
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
