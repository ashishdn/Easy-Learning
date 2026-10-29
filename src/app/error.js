"use client";
export default function ErrorPage({ reset }) {
  return (
    <div className="container page-content">
      <h1>পাতাটি খুলতে সমস্যা হয়েছে</h1>
      <p>আবার চেষ্টা করো। সমস্যা থাকলে কিছুক্ষণ পরে ফিরে এসো।</p>
      <button className="button" onClick={reset}>
        আবার চেষ্টা করো
      </button>
    </div>
  );
}
