// A small, non-evaluating notation reader for the existing plain-text lessons.
// New authored expressions can use $TeX$ explicitly. Legacy /, √ and Unicode
// powers are converted structurally; no HTML, JavaScript or TeX is trusted.
const superscripts = {
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
  "⁻": "-",
  "⁺": "+",
};
const symbols = {
  "×": "\\times ",
  "·": "\\cdot ",
  "÷": "\\div ",
  "−": "-",
  "≠": "\\ne ",
  "≤": "\\le ",
  "≥": "\\ge ",
  "≈": "\\approx ",
  "±": "\\pm ",
  "∈": "\\in ",
  "∉": "\\notin ",
  "⊂": "\\subset ",
  π: "\\pi ",
  λ: "\\lambda ",
  θ: "\\theta ",
  ρ: "\\rho ",
  γ: "\\gamma ",
  ℝ: "\\mathbb{R}",
  ℚ: "\\mathbb{Q}",
  ℕ: "\\mathbb{N}",
  ℤ: "\\mathbb{Z}",
  "…": "\\ldots ",
  "°": "{}^{\\circ}",
};
const units = new Set(["Hz", "kHz", "s", "ms", "m", "min", "K"]);

export function notationToTex(value) {
  const source = String(value)
    .replace(/[০-৯]/g, (n) => "০১২৩৪৫৬৭৮৯".indexOf(n))
    .trim();
  const tokens = source.match(/\d+(?:\.\d+)?|[A-Za-z]+|[^\s]/gu) || [];
  let index = 0;
  function atom() {
    const token = tokens[index++];
    if (token === undefined) throw new Error("Incomplete expression");
    let tex, fractionBody;
    if (token === "(" || token === "{") {
      const end = token === "(" ? ")" : "}";
      const body = sequence(end);
      if (tokens[index++] !== end) throw new Error("Unbalanced expression");
      tex =
        token === "(" ? `\\left(${body}\\right)` : `\\left\\{${body}\\right\\}`;
      fractionBody = body;
    } else if (token === "√") {
      const radicand = atom();
      tex = `\\sqrt{${radicand.fractionBody ?? radicand.tex}}`;
    } else if (/^[A-Za-z]+$/.test(token)) {
      if (token.length > 3 && !units.has(token))
        throw new Error("Text is not math");
      tex = units.has(token) ? `\\mathrm{${token}}` : token;
    } else if (/^\d+(?:\.\d+)?$/.test(token)) tex = token;
    else if (symbols[token]) tex = symbols[token];
    else throw new Error("Unsupported math token");
    let power = "";
    while (superscripts[tokens[index]]) power += superscripts[tokens[index++]];
    if (power) {
      tex += `^{${power}}`;
      fractionBody = undefined;
    }
    if (tokens[index] === "^" || tokens[index] === "_") {
      const operation = tokens[index++];
      let sign = "";
      if (tokens[index] === "-" || tokens[index] === "−") {
        sign = "-";
        index++;
      }
      const exponent = atom();
      tex += `${operation}{${sign}${exponent.fractionBody ?? exponent.tex}}`;
      fractionBody = undefined;
    }
    return { tex, fractionBody };
  }
  function sequence(end) {
    const result = [];
    while (index < tokens.length && tokens[index] !== end) {
      const token = tokens[index];
      if ("+-=<>×·÷−≠≤≥≈±∈∉⊂,:;".includes(token)) {
        result.push({ tex: symbols[token] || token, operator: true });
        index++;
        continue;
      }
      if (token === "/") {
        index++;
        const numerator = result.pop();
        if (!numerator || numerator.operator)
          throw new Error("Missing numerator");
        let sign = "";
        if (tokens[index] === "-" || tokens[index] === "−") {
          sign = "-";
          index++;
        }
        const denominator = atom();
        result.push({
          tex: `\\dfrac{${numerator.fractionBody ?? numerator.tex}}{${sign}${denominator.fractionBody ?? denominator.tex}}`,
        });
      } else result.push(atom());
    }
    return result.map((item) => item.tex).join("");
  }
  return sequence();
}

export function splitMathText(value) {
  const text = String(value ?? "");
  const parts = [];
  // Delimited TeX is explicit; everything else uses the bounded legacy grammar.
  for (const [i, chunk] of text.split(/(\$[^$\n]+\$)/g).entries()) {
    if (chunk.startsWith("$") && chunk.endsWith("$")) {
      parts.push({
        type: "math",
        tex: chunk.slice(1, -1),
        raw: chunk.slice(1, -1),
      });
      continue;
    }
    let cursor = 0;
    const runs =
      /[A-Za-z0-9০-৯√πλθρℝℚℕℤγ(][A-Za-z0-9০-৯\s(){}.+\-−×·÷/=<>≠≤≥≈±∈∉⊂,:;√πλθργℝℚℕℤ⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺^_°…]*/gu;
    for (const match of chunk.matchAll(runs)) {
      const raw = match[0].replace(/[\s+\-−=,:;]+$/gu, "");
      if (!raw) continue;
      let tex;
      try {
        tex = notationToTex(raw);
      } catch {
        continue;
      }
      if (match.index > cursor)
        parts.push({ type: "text", text: chunk.slice(cursor, match.index) });
      parts.push({ type: "math", tex, raw });
      cursor = match.index + raw.length;
    }
    if (cursor < chunk.length)
      parts.push({ type: "text", text: chunk.slice(cursor) });
    if (!chunk && i === 0) continue;
  }
  return parts;
}
