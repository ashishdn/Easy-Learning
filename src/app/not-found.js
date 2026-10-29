import { Button } from "@/components/ui";
export default function NotFound() {
  return (
    <div className="container page-content not-found">
      <span className="eyebrow">৪০৪ · পথটি খুঁজে পাওয়া যায়নি</span>
      <h1>এই পাতাটি এখানে নেই</h1>
      <p>ঠিকানাটি সঠিক কি না দেখে নাও, অথবা শ্রেণি বেছে নিয়ে আবার শুরু করো।</p>
      <Button href="/classes">শ্রেণি নির্বাচন করো</Button>
    </div>
  );
}
