"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const mainSpecs = [
  {
    value: 23.18,
    decimals: 2,
    unit: "%",
    label: "모듈 효율",
    sub: "BNPI 기준 25.43%",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="12" stroke="#F97316" strokeWidth="1.5"/>
        <path d="M14 6V14L19 19" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="2" fill="#F97316"/>
      </svg>
    ),
  },
  {
    value: 720,
    decimals: 0,
    unit: "W",
    label: "최대 출력",
    sub: "BNPI 기준 790W",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M16 4L8 16H14L12 24L20 12H14L16 4Z" fill="#F97316" opacity="0.9"/>
      </svg>
    ),
  },
  {
    value: 4.1,
    decimals: 1,
    unit: "%",
    label: "TOPCon 대비 우위",
    sub: "전면 출력 기준",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 20L12 12L17 16L22 8" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 8H23V12" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const techSpecs = [
  { label: "최대출력 전압 (Vmp)", value: "42.89 V" },
  { label: "최대출력 전류 (Imp)", value: "16.79 A" },
  { label: "개방회로전압 (Voc)", value: "51.00 V" },
  { label: "단락전류 (Isc)", value: "17.63 A" },
  { label: "양면 계수 (Φ)", value: "90 ± 5%" },
  { label: "온도 계수 (Pmax)", value: "-0.248 %/°C" },
  { label: "최대 시스템 전압", value: "1,500 V" },
  { label: "모듈 크기", value: "2384 × 1303 × 33 mm" },
  { label: "모듈 무게", value: "37.5 kg" },
  { label: "적설 하중", value: "5,400 Pa" },
  { label: "풍 하중", value: "2,400 Pa" },
  { label: "작동 온도", value: "-40 ~ +85 °C" },
];

const certifications = [
  "IEC 61215",
  "IEC 61730",
  "ISO 9001",
  "ISO 14001",
  "ISO 45001",
  "KS (2025)",
  "UL 790",
  "MCS",
];

export default function Technology() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate main stat cards
      gsap.fromTo(
        ".tech-main-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".tech-main-card", start: "top 80%" },
        }
      );

      // Animate spec table rows
      gsap.fromTo(
        ".spec-row",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: ".spec-row", start: "top 85%" },
        }
      );

      // Counter animations
      mainSpecs.forEach((spec, i) => {
        const el = counterRefs.current[i];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: spec.value,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
          onUpdate() {
            if (el) el.textContent = obj.val.toFixed(spec.decimals);
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="py-24 relative"
      style={{ background: "#0A1628" }}
    >
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316] to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mb-3">JGDN132-720 · HJT 양면 모듈</div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            압도적인 기술 스펙
          </h2>
          <p className="text-[#94A9C7] text-lg max-w-2xl mx-auto">
            210mm 웨이퍼 기반 N형 양면 HJT 하프컷 셀.
            <br />
            숫자가 증명하는 대한민국 최고 효율 태양광 모듈.
          </p>
        </div>

        {/* Main 3 Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 mb-12">
          {mainSpecs.map((spec, i) => (
            <div
              key={i}
              className="tech-card tech-main-card bg-[#0D2044] rounded-xl sm:rounded-2xl p-3 sm:p-8 text-center"
              style={{ opacity: 0 }}
            >
              <div className="hidden sm:flex justify-center mb-4">{spec.icon}</div>
              <div className="flex items-end justify-center gap-0.5 mb-1 sm:mb-2">
                <span
                  className="text-3xl sm:text-6xl font-black text-[#F97316] leading-none"
                  ref={(el) => {
                    counterRefs.current[i] = el;
                  }}
                >
                  0
                </span>
                <span className="text-lg sm:text-3xl font-bold text-[#F97316] mb-0.5 sm:mb-1">{spec.unit}</span>
              </div>
              <div className="text-white font-bold text-[11px] sm:text-lg mb-0.5 sm:mb-1 leading-tight">{spec.label}</div>
              <div className="text-[#5A7090] text-[10px] sm:text-sm hidden sm:block">{spec.sub}</div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Feature highlights */}
          <div className="bg-[#0D2044] rounded-2xl p-8 border border-[#1E3F6F]">
            <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#F97316] rounded-full inline-block" />
              핵심 기술 특징
            </h3>
            <div className="space-y-4">
              {[
                { icon: "◆", text: "0BB 얇은 슬라이스 하프컷 기술 — 은도금 구리 적용으로 전도율 극대화" },
                { icon: "◆", text: "Anti-LID · Anti-PID · Anti-LeTID — 장기 출력 손실 원천 차단" },
                { icon: "◆", text: "저온도 계수 -0.248%/°C — 폭염에서도 경쟁 대비 높은 실발전량" },
                { icon: "◆", text: "스텐실 프린팅 공법 — 균일한 셀 품질 및 일관된 출력 보장" },
                { icon: "◆", text: "강화 유리 2.0mm + IP68 접합 상자 — 극한 환경 내구성" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#F97316] text-xs mt-1 flex-shrink-0">{item.icon}</span>
                  <p className="text-[#94A9C7] text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-[#0D2044] rounded-2xl p-8 border border-[#1E3F6F]">
            <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#F97316] rounded-full inline-block" />
              국제 인증 현황
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="bg-[#132847] border border-[#1E3F6F] rounded-lg px-4 py-3 flex items-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" fill="#F97316" opacity="0.2"/>
                    <path d="M4.5 7L6.5 9L9.5 5.5" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-white text-sm font-semibold">{cert}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#F97316]/10 border border-[#F97316]/30 rounded-xl p-4">
              <div className="text-[#F97316] font-bold text-sm mb-1">2025년 KS 인증 신규 취득</div>
              <div className="text-[#94A9C7] text-xs">국내 최고 수준의 품질 검증 완료. 국내 공공사업 입찰 적격 제품.</div>
            </div>
          </div>
        </div>

        {/* Detailed Specs Table */}
        <div className="bg-[#0D2044] rounded-2xl border border-[#1E3F6F] overflow-hidden">
          <div className="px-8 py-5 border-b border-[#1E3F6F] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h3 className="text-white font-bold text-lg">전기적 사양 (STC 기준)</h3>
            <span className="text-[#5A7090] text-xs">일사량 1000W/㎡ · 셀 온도 25°C · AM 1.5</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {techSpecs.map((spec, i) => (
              <div
                key={i}
                className={`spec-row flex items-center justify-between px-8 py-4 border-b border-[#1E3F6F]/50 ${
                  i % 2 === 0 ? "bg-transparent" : "bg-[#0A1628]/40"
                }`}
                style={{ opacity: 0 }}
              >
                <span className="text-[#94A9C7] text-sm">{spec.label}</span>
                <span className="text-white font-bold text-sm">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
