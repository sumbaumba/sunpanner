"use client";

import { useState, useEffect } from "react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <a
        href="#contact"
        className="flex items-center justify-center gap-2 btn-primary px-6 py-3.5 rounded-full text-sm font-bold shadow-2xl whitespace-nowrap"
        style={{ boxShadow: "0 8px 32px rgba(249, 115, 22, 0.5)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 4.5C2 3.67 2.67 3 3.5 3h9C13.33 3 14 3.67 14 4.5v7c0 .83-.67 1.5-1.5 1.5h-9C2.67 13 2 12.33 2 11.5v-7z" stroke="white" strokeWidth="1.5"/>
          <path d="M2 5l6 4 6-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        무료 기술 상담 신청하기
      </a>
    </div>
  );
}
