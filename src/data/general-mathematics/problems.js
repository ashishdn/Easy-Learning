export const problems = [
  {
    id: "p-one",
    text: "০.৩৭৫-কে সরল ভগ্নাংশে প্রকাশ করো।",
    difficulty: "সহজ",
    topicId: "rational",
    formulaId: "rational-form",
    steps: [
      "তিন ঘর দশমিক থাকায় ০.৩৭৫ = ৩৭৫/১০০০।",
      "লব ও হরের গ.সা.গু ১২৫। উভয়কে ১২৫ দিয়ে ভাগ করলে ৩/৮ পাই।",
    ],
    answer: "৩/৮",
  },
  {
    id: "p-two",
    text: "০.১২১২১২…-কে ভগ্নাংশে প্রকাশ করো।",
    difficulty: "মধ্যম",
    topicId: "rational",
    steps: [
      "x = ০.১২১২১২… ধরি। দুটি অঙ্ক পুনরাবৃত্ত, তাই ১০০x = ১২.১২১২১২…।",
      "বিয়োগ করে ৯৯x = ১২। তাই x = ১২/৯৯ = ৪/৩৩।",
    ],
    answer: "৪/৩৩",
  },
  {
    id: "p-three",
    text: "৩/৭ ও ৪/৭-এর মধ্যে একটি মূলদ সংখ্যা নির্ণয় করো।",
    difficulty: "মধ্যম",
    topicId: "rational",
    steps: [
      "দুটি সংখ্যার গড় নিলে তাদের মাঝখানে একটি সংখ্যা পাওয়া যায়।",
      "(৩/৭ + ৪/৭)/২ = ১/২।",
      "৩/৭ = ৬/১৪, ১/২ = ৭/১৪ ও ৪/৭ = ৮/১৪; ফলে ক্রমটি সঠিক।",
    ],
    answer: "১/২",
  },
  {
    id: "p-four",
    text: "√২ + √৮ সংখ্যাটি মূলদ না অমূলদ? যুক্তি দাও।",
    difficulty: "চ্যালেঞ্জিং",
    topicId: "irrational",
    steps: [
      "√৮ = √(৪ × ২) = ২√২, কারণ সব রাশি অঋণাত্মক।",
      "অতএব √২ + √৮ = ৩√২।",
      "৩√২ মূলদ হলে ৩ দিয়ে ভাগ করে √২-ও মূলদ হতো। কিন্তু √২ অমূলদ। তাই যোগফল অমূলদ।",
    ],
    answer: "৩√২; অমূলদ সংখ্যা।",
  },
].map((p) => ({
  ...p,
  chapterId: "real-numbers",
  sourceType: "original",
  sourceTitle: null,
  sourceYear: null,
  verificationStatus: "অনুশীলনী নমুনা",
  lastReviewed: null,
}));
