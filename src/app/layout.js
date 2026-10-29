import { Noto_Sans_Bengali } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "katex/dist/katex.min.css";
import "./globals.css";
const bengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali", "latin"],
  display: "swap",
});
export const metadata = {
  title: { default: "জ্ঞানকোষ — বোঝার আনন্দে শেখো", template: "%s | জ্ঞানকোষ" },
  description:
    "নবম-দশম শ্রেণির গণিতের ধারণা, সূত্র, সৃজনশীল প্রশ্ন ও ধাপে ধাপে সমাধান। সহজে শেখো, আত্মবিশ্বাসে এগিয়ে চলো।",
  openGraph: {
    title: "জ্ঞানকোষ — বোঝার আনন্দে শেখো",
    description: "বাংলায় গণিত শেখার একটি উন্মুক্ত ঠিকানা।",
    locale: "bn_BD",
    type: "website",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={bengali.variable} data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          মূল বিষয়ে যাও
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
