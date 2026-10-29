export function normalize(value) {
  return String(value)
    .replace(/\u2212/g, "-")
    .normalize("NFC")
    .replace(/[\u200b-\u200d\ufeff]/g, "")
    .replace(/[০-৯]/g, (n) => "০১২৩৪৫৬৭৮৯".indexOf(n))
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}
export function checkAnswer(actual, expected) {
  return normalize(actual) === normalize(expected);
}
export function validateRecords(records) {
  const ids = new Set();
  for (const record of records) {
    if (!record.id || ids.has(record.id))
      throw new Error("Invalid or duplicate educational record");
    ids.add(record.id);
    if (record.text && (!record.answer || !record.steps?.length))
      throw new Error(`Missing solution: ${record.id}`);
  }
  return true;
}
