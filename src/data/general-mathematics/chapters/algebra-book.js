import { algebraicExpressions } from "./algebraic-expressions";
import { textbook, mathChapterCatalog } from "../textbook";
const catalog = mathChapterCatalog.find(
  (c) => c.id === "algebraic-expressions",
);
export const algebraBook = {
  ...algebraicExpressions,
  sources: [
    {
      title: `${textbook.title} — ${textbook.edition}`,
      pages: textbook.pages,
      fileName: textbook.fileName,
    },
    ...algebraicExpressions.sources,
  ],
  sourceDescription: `প্রদত্ত বইয়ের ${catalog.sourcePages}-এর মূল বিষয় এবং আগের দুটি হ্যান্ডনোট মিলিয়ে সাজানো। হ্যান্ডনোটের সহায়ক অনুশীলনও রাখা হয়েছে; সব প্রশ্ন পাঠ্যবই থেকে হুবহু নেওয়া নয়।`,
  sourceNote:
    "বইয়ের মূল আলোচনা, হ্যান্ডনোট এবং নিজস্ব ব্যাখ্যা মিলিয়ে নির্বাচিত ধারণাপাঠ। প্রতিটি অঙ্কে উত্তর ও ধাপ আছে; এটি বইয়ের প্রত্যেক অনুশীলনীর সম্পূর্ণ সমাধান নয়।",
  topics: [
    {
      id: "alg-expression-basics",
      chapterId: "algebraic-expressions",
      title: "রাশি, পদ, সহগ ও বহুপদীর ঘাত",
      definition:
        "সংখ্যা, চলক ও গাণিতিক প্রক্রিয়ার অর্থবোধক সমাবেশ বীজগাণিতিক রাশি। যোগ-বিয়োগ চিহ্নে আলাদা অংশগুলো পদ।",
      explanation:
        "একই চলকের একই ঘাতবিশিষ্ট পদ সদৃশ, তাই তাদের সহগ যোগ-বিয়োগ করা যায়। বহুপদীর কোনো পদে চলকগুলোর অঋণাত্মক পূর্ণঘাতের যোগ সেই পদের ঘাত; সর্বোচ্চটি বহুপদীর ঘাত। চলক হরে বা ঋণাত্মক/ভগ্নাংশ ঘাতে থাকলে সাধারণ বহুপদীর সংজ্ঞায় পড়ে না।",
      notation: "3x^2-2xy+5",
      example:
        "রাশিটিতে তিনটি পদ; x²-এর সহগ ৩, xy-এর সহগ −২, ধ্রুবপদ ৫ এবং ঘাত ২। ৩x+২x=৫x, কিন্তু ৩x+২y এভাবে যোগ হয় না।",
      summary: "আগে পদ ও সহগ চেনো, তারপর অভেদ বা উৎপাদকের কৌশল বেছে নাও।",
      mistake: "সহগে ঋণচিহ্নও অন্তর্ভুক্ত। xy ও x² সদৃশ পদ নয়।",
      sourceType: "textbook-adaptation",
      sourceTitle: textbook.title,
      sourceYear: 2025,
      sourcePages: catalog.sourcePages,
      verificationStatus: "পর্যালোচনাধীন",
      lastReviewed: "2026-10-29",
    },
    ...algebraicExpressions.topics,
  ],
  reviewNotes: [
    ...algebraicExpressions.reviewNotes,
    "বইয়ের প্রাথমিক রাশি, পদ, সহগ ও ঘাতের পাঠ সামনে যুক্ত করা হয়েছে। গ.সা.গু, ল.সা.গু ও ভগ্নাংশের পুরোনো হ্যান্ডনোটভিত্তিক অংশ সহায়ক পুনরালোচনা হিসেবে রাখা হয়েছে।",
  ],
  studyTips: [
    "প্রথমে রাশির পদ, ঘাত ও সহগ শনাক্ত করো।",
    "অভেদে মান বসানোর আগে কোনো অশূন্য শর্ত আছে কি না লেখো।",
    "উৎপাদক আবার গুণ করে মূল রাশি ফিরে পাওয়া যায় কি না দেখো।",
  ],
};
