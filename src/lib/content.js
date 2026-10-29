import { chapterContent } from "@/data/general-mathematics";
import { chapterContent as physicsContent } from "@/data/physics";
const contentBySubject = {
  "general-mathematics": chapterContent,
  physics: physicsContent,
};
export function getAllContent() {
  return Object.values(contentBySubject).flatMap((subject) =>
    Object.values(subject),
  );
}
export function getChapterContent(subjectId, chapterId) {
  return contentBySubject[subjectId]?.[chapterId];
}
