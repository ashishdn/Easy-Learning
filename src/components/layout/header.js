"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ArrowUpLeft } from "lucide-react";
import { Brand } from "@/components/ui";
import { labels } from "@/data/labels";
const links = [
  ["/", labels.home],
  ["/classes", labels.classes],
  ["/classes/class-9-10", labels.subjects],
  ["/formulas", labels.formulas],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="main-nav" aria-label="মূল নেভিগেশন">
          {links.map(([href, text]) => (
            <Link
              key={href}
              href={href}
              className={path === href ? "active" : ""}
              aria-current={path === href ? "page" : undefined}
            >
              {text}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/search" className="search-link" aria-label="অনুসন্ধান">
            <Search size={19} />
            <span>কী শিখতে চাও?</span>
            <kbd>⌕</kbd>
          </Link>
          <Link className="header-start" href="/classes">
            পড়া শুরু করো <ArrowUpLeft size={16} />
          </Link>
          <button
            className="menu-button"
            aria-label={open ? "মেনু বন্ধ করো" : "মেনু খোলো"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-nav"
        aria-label="মোবাইল নেভিগেশন"
        className={open ? "mobile-nav" : "mobile-nav hidden"}
      >
        {links.map(([href, text]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>
            {text}
          </Link>
        ))}
      </nav>
    </header>
  );
}
