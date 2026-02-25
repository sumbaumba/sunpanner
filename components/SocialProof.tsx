"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const timeline = [
  {
    year: "2018",
    event: "미국 캘리포니아 발전소",
    detail: "태양광 모듈 20MW 공급계약 체결",
    highlight: "20 MW",
    color: "#F97316",
  },
  {
    year: "2020",
    event: "법인 설립 · 수출탑 수상",
    detail: "주식회사 이에프글로벌코리아 설립 · 수출 100만불 탑 수상",
    highlight: "$1M",
    color: "#FB923C",
  },
  {
    year: "2023",
    event: "전라도 정읍 태양광발전소",
    detail: "태양광 모듈 6.5MW 공급계약 체결",
    highlight: "6.5 MW",
    color: "#F97316",
  },
  {
    year: "2024",
    event: "Golden Solar 공식 수입사 체결",
    detail: "한국 단독 공식 수입사 지위 획득. 삼성반도체 1차 Vendor 원익QnC 계약 체결",
    highlight: "독점",
    color: "#FB923C",
  },
  {
    year: "2025",
    event: "KS 인증 취득",
    detail: "Golden Solar HJT 모듈 국내 KS 제품 인증 취득 — 공공사업 입찰 적격",
    highlight: "KS",
    color: "#F97316",
  },
];

const projectStats = [
  { value: "20 MW", label: "미국 캘리포니아", sub: "단일 현장 공급", flag: "🇺🇸" },
  { value: "6.5 MW", label: "전라도 정읍", sub: "국내 대형 발전소", flag: "🇰🇷" },
  { value: "350 MW+", label: "글로벌 누적 공급", sub: "Golden Solar 전세계", flag: "🌏" },
  { value: "15+", label: "글로벌 진출 국가", sub: "독일, 영국, 중국 등", flag: "🌐" },
];

const offices = [
  { name: "서울 사무소", desc: "국내 영업 총괄", top: "38%", left: "46%" },
  { name: "구리 지사", desc: "경기도 구리시 (본사)", top: "34%", left: "50%" },
  { name: "경기 물류센터", desc: "수도권 물류 허브", top: "30%", left: "44%" },
  { name: "남부 물류센터", desc: "남부 권역 물류 허브", top: "68%", left: "42%" },
];

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proof-stat",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".proof-stat", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".timeline-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ".timeline-item", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 relative"
      style={{ background: "#0A1628" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316] to-transparent opacity-20" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mb-3">검증된 레퍼런스</div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            글로벌이 인정한 공급 실적
          </h2>
          <p className="text-[#94A9C7] text-lg max-w-2xl mx-auto">
            미국에서 국내까지. 대형 현장에서 검증된 제품력.
            <br />
            한국 공식 독점 수입사로서 안정적인 공급망을 보장합니다.
          </p>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {projectStats.map((stat, i) => (
            <div
              key={i}
              className="proof-stat tech-card bg-[#0D2044] rounded-2xl p-6 text-center"
              style={{ opacity: 0 }}
            >
              <div className="text-3xl mb-3">{stat.flag}</div>
              <div className="text-3xl font-black text-[#F97316] mb-1">{stat.value}</div>
              <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
              <div className="text-[#5A7090] text-xs">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Company Timeline */}
          <div className="bg-[#0D2044] rounded-2xl border border-[#1E3F6F] p-8">
            <h3 className="text-white font-bold text-xl mb-8 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#F97316] rounded-full inline-block" />
              주요 연혁
            </h3>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#F97316] to-[#1E3F6F]" />

              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <div
                    key={i}
                    className="timeline-item flex items-start gap-6"
                    style={{ opacity: 0 }}
                  >
                    {/* Year dot */}
                    <div className="relative flex-shrink-0 flex flex-col items-center" style={{ width: "64px" }}>
                      <div
                        className="w-4 h-4 rounded-full border-2 z-10"
                        style={{ background: item.color, borderColor: item.color, boxShadow: `0 0 8px ${item.color}60` }}
                      />
                      <div
                        className="text-xs font-bold mt-1"
                        style={{ color: item.color }}
                      >
                        {item.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold text-sm">{item.event}</span>
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ background: `${item.color}20`, color: item.color }}
                        >
                          {item.highlight}
                        </span>
                      </div>
                      <p className="text-[#5A7090] text-xs leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Korea Infrastructure Map */}
          <div className="bg-[#0D2044] rounded-2xl border border-[#1E3F6F] p-8">
            <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#F97316] rounded-full inline-block" />
              전국 인프라 네트워크
            </h3>
            <p className="text-[#5A7090] text-sm mb-6">서울 · 구리 사무소 + 경기/남부 물류센터 운영</p>

            {/* Korea Map SVG */}
            <div className="relative bg-[#0A1628] rounded-xl p-4 mb-6">
              <svg viewBox="0 0 200 300" className="w-full max-w-[200px] mx-auto" fill="none">
                {/* Simplified Korea outline */}
                <path
                  d="M 90,20 L 110,18 L 130,25 L 150,40 L 155,60 L 150,80 L 160,100 L 155,120
                     L 145,140 L 150,160 L 140,180 L 130,195 L 120,210 L 110,220 L 105,235
                     L 95,240 L 85,235 L 75,220 L 65,205 L 55,190 L 45,170 L 40,150
                     L 45,130 L 40,110 L 45,90 L 50,70 L 45,50 L 55,35 L 70,25 Z"
                  fill="#132847"
                  stroke="#1E3F6F"
                  strokeWidth="1.5"
                />
                {/* Jeju island */}
                <ellipse cx="80" cy="268" rx="18" ry="10" fill="#132847" stroke="#1E3F6F" strokeWidth="1.5"/>

                {/* Office/logistics dots */}
                {/* Seoul */}
                <circle cx="90" cy="105" r="5" fill="#F97316" opacity="0.9">
                  <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="90" cy="105" r="10" fill="#F97316" opacity="0.15"/>

                {/* Guri */}
                <circle cx="98" cy="100" r="4" fill="#FB923C" opacity="0.9">
                  <animate attributeName="r" values="4;6;4" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="98" cy="100" r="8" fill="#FB923C" opacity="0.15"/>

                {/* Gyeonggi Logistics */}
                <circle cx="82" cy="95" r="3.5" fill="#FBBF24" opacity="0.85"/>
                <circle cx="82" cy="95" r="7" fill="#FBBF24" opacity="0.1"/>

                {/* Southern Logistics */}
                <circle cx="75" cy="190" r="3.5" fill="#FBBF24" opacity="0.85"/>
                <circle cx="75" cy="190" r="7" fill="#FBBF24" opacity="0.1"/>

                {/* Labels */}
                <text x="102" y="109" fill="#F97316" fontSize="7" fontWeight="bold">서울</text>
                <text x="101" y="97" fill="#FB923C" fontSize="7" fontWeight="bold">구리</text>
                <text x="60" y="93" fill="#FBBF24" fontSize="6.5">경기 물류</text>
                <text x="58" y="195" fill="#FBBF24" fontSize="6.5">남부 물류</text>
              </svg>
            </div>

            {/* Office list */}
            <div className="space-y-3">
              {[
                { dot: "#F97316", name: "서울 사무소", desc: "고양시 덕양구 향동로 217" },
                { dot: "#FB923C", name: "구리 본사", desc: "구리시 건원대로 51, 3105호" },
                { dot: "#FBBF24", name: "경기 물류센터", desc: "경기도 남양주시" },
                { dot: "#FBBF24", name: "남부 물류센터", desc: "경남 거제시" },
              ].map((office, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: office.dot }} />
                  <div>
                    <span className="text-white text-sm font-semibold">{office.name}</span>
                    <span className="text-[#5A7090] text-xs ml-2">{office.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Global presence note */}
            <div className="mt-6 pt-5 border-t border-[#1E3F6F]">
              <div className="section-label mb-2 text-left">글로벌 파트너 네트워크</div>
              <div className="flex flex-wrap gap-2">
                {["🇩🇪 독일", "🇬🇧 영국", "🇨🇳 중국 (본사)", "🇺🇸 미국", "🇮🇳 인도"].map((c) => (
                  <span key={c} className="bg-[#132847] border border-[#1E3F6F] text-[#94A9C7] text-xs px-3 py-1.5 rounded-lg">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
