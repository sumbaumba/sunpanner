"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function SolarPanelSVG() {
  return (
    <svg
      viewBox="0 0 580 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto drop-shadow-2xl"
    >
      <defs>
        {/* Cell pattern: 12 cols × 11 rows = 132 cells */}
        <pattern id="cellPattern" x="0" y="0" width="43.5" height="25" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="40" height="22" rx="1.5" fill="#0D2854" stroke="#1B3D7A" strokeWidth="0.6"/>
          <line x1="10" y1="0" x2="10" y2="22" stroke="#C8D6E8" strokeWidth="0.3" opacity="0.5"/>
          <line x1="20" y1="0" x2="20" y2="22" stroke="#C8D6E8" strokeWidth="0.3" opacity="0.5"/>
          <line x1="30" y1="0" x2="30" y2="22" stroke="#C8D6E8" strokeWidth="0.3" opacity="0.5"/>
          <line x1="0" y1="11" x2="40" y2="11" stroke="#C8D6E8" strokeWidth="0.4" opacity="0.3"/>
        </pattern>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.08"/>
          <stop offset="40%" stopColor="white" stopOpacity="0.02"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="frameGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D0D8E0"/>
          <stop offset="50%" stopColor="#A8B4C0"/>
          <stop offset="100%" stopColor="#8896A4"/>
        </linearGradient>
        <clipPath id="panelClip">
          <rect x="12" y="12" width="556" height="296" rx="4"/>
        </clipPath>
      </defs>
      <rect x="18" y="18" width="556" height="296" rx="8" fill="#000" opacity="0.4"/>
      <rect x="8" y="8" width="564" height="304" rx="8" fill="url(#frameGrad)"/>
      <rect x="12" y="12" width="556" height="296" rx="5" fill="#050E1E"/>
      <rect x="20" y="18" width="540" height="284" fill="url(#cellPattern)" clipPath="url(#panelClip)"/>
      <line x1="20" y1="43" x2="560" y2="43" stroke="#9AAEC4" strokeWidth="1" opacity="0.35"/>
      <line x1="20" y1="68" x2="560" y2="68" stroke="#9AAEC4" strokeWidth="1" opacity="0.35"/>
      <line x1="20" y1="93" x2="560" y2="93" stroke="#9AAEC4" strokeWidth="1" opacity="0.35"/>
      <line x1="20" y1="118" x2="560" y2="118" stroke="#9AAEC4" strokeWidth="1" opacity="0.35"/>
      <line x1="20" y1="143" x2="560" y2="143" stroke="#9AAEC4" strokeWidth="1" opacity="0.35"/>
      <line x1="20" y1="168" x2="560" y2="168" stroke="#9AAEC4" strokeWidth="1" opacity="0.35"/>
      <line x1="20" y1="193" x2="560" y2="193" stroke="#9AAEC4" strokeWidth="1" opacity="0.35"/>
      <line x1="20" y1="218" x2="560" y2="218" stroke="#9AAEC4" strokeWidth="1" opacity="0.35"/>
      <line x1="20" y1="243" x2="560" y2="243" stroke="#9AAEC4" strokeWidth="1" opacity="0.35"/>
      <line x1="20" y1="268" x2="560" y2="268" stroke="#9AAEC4" strokeWidth="1" opacity="0.35"/>
      <line x1="20" y1="293" x2="560" y2="293" stroke="#9AAEC4" strokeWidth="1" opacity="0.35"/>
      <rect x="12" y="12" width="556" height="296" rx="5" fill="url(#glassGrad)"/>
      <rect x="190" y="285" width="45" height="18" rx="3" fill="#1A2A3A" stroke="#2A4A6A" strokeWidth="0.8"/>
      <rect x="267" y="285" width="45" height="18" rx="3" fill="#1A2A3A" stroke="#2A4A6A" strokeWidth="0.8"/>
      <rect x="344" y="285" width="45" height="18" rx="3" fill="#1A2A3A" stroke="#2A4A6A" strokeWidth="0.8"/>
      <rect x="8" y="305" width="564" height="7" rx="0 0 8 8" fill="#F97316" opacity="0.85"/>
      <rect x="440" y="22" width="110" height="34" rx="3" fill="#F97316" opacity="0.9"/>
      <text x="495" y="34" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="Arial">JGDN132-720</text>
      <text x="495" y="48" textAnchor="middle" fill="white" fontSize="11" fontWeight="900" fontFamily="Arial">720W HJT</text>
      <text x="30" y="36" fill="#6A8AAA" fontSize="9" fontWeight="600" fontFamily="Arial" opacity="0.7">EF GLOBAL KOREA</text>
    </svg>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current || !panelRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: 60, rotateY: 15 },
        { opacity: 1, x: 0, rotateY: 0, duration: 1.2, ease: "power3.out", delay: 0.5 }
      );

      // Counter animations
      const counters = [
        { ref: stat1Ref, target: 720, decimals: 0, suffix: "" },
        { ref: stat2Ref, target: 23.18, decimals: 2, suffix: "" },
        { ref: stat3Ref, target: 90.3, decimals: 1, suffix: "" },
      ];

      counters.forEach(({ ref, target, decimals }) => {
        if (!ref.current) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          delay: 1.0,
          ease: "power2.out",
          onUpdate() {
            if (ref.current) {
              ref.current.textContent = obj.val.toFixed(decimals);
            }
          },
        });
      });

      // Floating panel animation
      gsap.to(panelRef.current, {
        y: -12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #060D18 0%, #0A1628 50%, #060D18 100%)" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#F97316 1px, transparent 1px), linear-gradient(90deg, #F97316 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Background glow */}
      <div
        className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #F97316, transparent 70%)", transform: "translate(50%, -50%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text */}
          <div ref={textRef} style={{ opacity: 0 }}>
            {/* Label */}
            <div className="section-label mb-4">
              대한민국 유일 · HJT 기술
            </div>

            {/* Main headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              <span className="text-white">600W 시대를</span>
              <br />
              <span className="text-white">끝내고</span>
              <br />
              <span className="gradient-text">720W 시대를</span>
              <br />
              <span className="gradient-text">엽니다.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-[#94A9C7] text-lg leading-relaxed mb-10 max-w-xl">
              이제는 효율이 시공사의 실력입니다.<br />
              <span className="text-white font-semibold">2025년 KS 인증</span>을 획득한 HJT 720W로
              귀사의 수익률을 극대화하세요.
            </p>

            {/* Hero Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="bg-[#0D2044]/80 border border-[#1E3F6F] rounded-xl p-4 text-center">
                <div className="text-3xl font-black text-[#F97316]">
                  <span ref={stat1Ref}>0</span>
                  <span className="text-lg">W</span>
                </div>
                <div className="text-[#94A9C7] text-xs mt-1 font-medium">최대 출력</div>
              </div>
              <div className="bg-[#0D2044]/80 border border-[#1E3F6F] rounded-xl p-4 text-center">
                <div className="text-3xl font-black text-[#F97316]">
                  <span ref={stat2Ref}>0</span>
                  <span className="text-lg">%</span>
                </div>
                <div className="text-[#94A9C7] text-xs mt-1 font-medium">모듈 효율</div>
              </div>
              <div className="bg-[#0D2044]/80 border border-[#1E3F6F] rounded-xl p-4 text-center">
                <div className="text-3xl font-black text-[#F97316]">
                  <span ref={stat3Ref}>0</span>
                  <span className="text-lg">%</span>
                </div>
                <div className="text-[#94A9C7] text-xs mt-1 font-medium">30년 보장</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="btn-primary px-8 py-4 rounded-xl text-base font-bold text-center"
              >
                전문 기술 상담 신청 →
              </a>
              <a
                href="#technology"
                className="border border-[#1E3F6F] hover:border-[#F97316] text-[#94A9C7] hover:text-white px-8 py-4 rounded-xl text-base font-semibold text-center transition-all duration-200"
              >
                기술 사양 보기
              </a>
            </div>
          </div>

          {/* Right: Panel */}
          <div ref={panelRef} className="relative" style={{ opacity: 0 }}>
            {/* Floating spec badges */}
            <div className="absolute -top-4 -right-2 z-10 bg-[#F97316] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              ✓ 2025 KS 인증
            </div>
            <div className="absolute -bottom-4 -left-2 z-10 bg-[#0D2044] border border-[#F97316] text-white text-xs font-bold px-3 py-2 rounded-lg shadow-lg">
              <span className="text-[#F97316]">TOPCon 대비</span> +4.1% 출력 우위
            </div>

            <SolarPanelSVG />

            {/* Glow under panel */}
            <div
              className="absolute -bottom-8 left-1/2 w-3/4 h-16 opacity-30 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, #F97316, transparent 70%)",
                transform: "translateX(-50%)",
                filter: "blur(12px)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator - PC only */}
      <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-50">
        <span className="text-[#94A9C7] text-xs">스크롤하여 확인</span>
        <div className="w-5 h-8 border border-[#94A9C7] rounded-full flex justify-center pt-1.5">
          <div
            className="w-1 h-2 bg-[#94A9C7] rounded-full"
            style={{ animation: "bounce 1.5s infinite" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
