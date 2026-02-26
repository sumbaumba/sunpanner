"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#technology", label: "기술사양" },
    { href: "#warranty", label: "보증정책" },
    { href: "#projects", label: "납품실적" },
    { href: "#contact", label: "상담신청" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-[#060D18]/95 backdrop-blur-md border-b border-[#1E3F6F]"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <Image
            src="/white-logo.png"
            alt="Golden Solar × 이에프글로벌코리아"
            width={560}
            height={112}
            className="h-50 w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-[#94A9C7] hover:text-white text-sm font-medium transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center justify-center btn-primary px-5 py-2.5 rounded-lg text-sm"
        >
          단가 문의하기
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#94A9C7] hover:text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen ? (
              <path d="M5 5L17 17M5 17L17 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <>
                <path d="M3 6H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 11H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#060D18]/98 backdrop-blur-md border-b border-[#1E3F6F] px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-[#94A9C7] hover:text-white text-sm font-medium py-1 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary px-5 py-3 rounded-lg text-sm text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            단가 문의하기
          </a>
        </div>
      )}
    </nav>
  );
}
