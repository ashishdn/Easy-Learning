import { classes } from "@/data/classes";
import { subjects } from "@/data/subjects";
import { chapters } from "@/data/chapters";
export const bn = (value) => Number(value).toLocaleString("bn-BD");
export const subjectUrl = (id, classId = "class-9-10") =>
  `/classes/${classId}/${id}`;
export const chapterUrl = (chapter) =>
  `${subjectUrl(chapter.subjectId, chapter.classId)}/${chapter.slug}`;
export function getEducation(classId, subjectId, slug) {
  const schoolClass = classes.find((c) => c.id === classId);
  const subject = subjects.find((s) => s.id === subjectId);
  const chapter = chapters.find(
    (c) =>
      c.classId === classId && c.subjectId === subjectId && c.slug === slug,
  );
  return { schoolClass, subject, chapter };
}
