"use client";
import { useEffect, useRef, useState } from "react";

export default function MathViewport({ children }) {
  const viewport = useRef(null);
  const [overflow, setOverflow] = useState(false);
  useEffect(() => {
    const element = viewport.current;
    let mounted = true;
    const measure = () => {
      if (mounted)
        setOverflow(
          element.clientWidth > 0 &&
            element.scrollWidth > element.clientWidth + 1,
        );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    document.fonts.ready.then(measure);
    return () => {
      mounted = false;
      observer.disconnect();
    };
  }, [children]);
  return (
    <figure className="math-block">
      <div
        ref={viewport}
        className="math-expression"
        role="group"
        aria-label="গাণিতিক রাশি"
        tabIndex={overflow ? 0 : undefined}
      >
        {children}
      </div>
      {overflow && (
        <figcaption className="math-scroll-hint">
          বড় রাশি — ডানে-বাঁয়ে সরিয়ে পড়ো।
        </figcaption>
      )}
    </figure>
  );
}
