export const questions = [
  {
    id: "q-a",
    category: "ক",
    text: "মূলদ সংখ্যা কাকে বলে?",
    steps: [
      "p ও q দুটি পূর্ণসংখ্যা এবং q ≠ 0 হলে p/q আকারে প্রকাশযোগ্য সংখ্যাকে মূলদ সংখ্যা বলে।",
      "যেমন ৫ = ৫/১; সুতরাং ৫ মূলদ সংখ্যা।",
    ],
    answer:
      "পূর্ণসংখ্যার অনুপাত হিসেবে প্রকাশযোগ্য সংখ্যা, যেখানে হর শূন্য নয়।",
    relatedTopics: ["rational"],
  },
  {
    id: "q-b",
    category: "খ",
    text: "০.৩৩৩… কেন মূলদ সংখ্যা? যুক্তি দাও।",
    steps: [
      "x = ০.৩৩৩… ধরি। তাহলে ১০x = ৩.৩৩৩…।",
      "দুটি সমীকরণ বিয়োগে ৯x = ৩। তাই x = ১/৩।",
      "১ ও ৩ পূর্ণসংখ্যা এবং ৩ ≠ ০, তাই সংখ্যাটি মূলদ।",
    ],
    answer: "০.৩৩৩… = ১/৩, তাই মূলদ।",
    relatedTopics: ["rational"],
    relatedFormulas: ["recurring"],
  },
  {
    id: "q-c",
    category: "গ",
    stimulus: "A = {−৩, ০, ১/২, √২, √৯}।",
    text: "A সেটের মূলদ সংখ্যাগুলো নির্ণয় করো।",
    steps: [
      "−৩ = −৩/১ এবং ০ = ০/১; উভয়ই মূলদ।",
      "১/২ মূলদ এবং √৯ = ৩ = ৩/১ মূলদ।",
      "√২ অমূলদ, তাই মূলদ সংখ্যার তালিকায় থাকবে না।",
    ],
    answer: "{−৩, ০, ১/২, √৯}",
    relatedTopics: ["rational", "irrational"],
  },
  {
    id: "q-d",
    category: "ঘ",
    text: "প্রমাণ করো, √২ একটি অমূলদ সংখ্যা।",
    steps: [
      "বিপরীতটি ধরে নিই: √২ = p/q, যেখানে p, q পরস্পর সহমৌলিক পূর্ণসংখ্যা এবং q ≠ ০।",
      "বর্গ করে p² = ২q² পাই। তাই p² জোড়, অর্থাৎ p জোড়। p = ২k ধরি।",
      "তাহলে ৪k² = ২q², অর্থাৎ q² = ২k²। তাই q-ও জোড়।",
      "p ও q উভয়ই জোড় হলে তারা সহমৌলিক হতে পারে না। এটি অনুমানের বিরোধী। তাই √২ অমূলদ।",
    ],
    answer: "√২ অমূলদ।",
    relatedTopics: ["irrational"],
  },
].map((q) => ({
  ...q,
  chapterId: "real-numbers",
  relatedFormulas: q.relatedFormulas || [],
  sourceType: "original",
  sourceTitle: null,
  sourceYear: null,
  verificationStatus: "অনুশীলনী নমুনা",
  lastReviewed: null,
}));
