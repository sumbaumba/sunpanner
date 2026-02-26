"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Chart coordinates
// ViewBox: 0 0 600 280, chart area x:60-560 (500px wide), y:20-240 (220px tall)
// Y range: 80-100% → 11px per %
// X range: 0-30 years → 500/30 px per year

const chartX = (year: number) => 60 + (year * 500) / 30;
const chartY = (pct: number) => 240 - (pct - 80) * 11;

// HJT line data (Year 1: 99%, Year 30: 90.3%, ~0.30%/yr after yr1)
const hjtPoints = [
  [0, 100], [1, 99], [5, 97.8], [10, 96.3],
  [15, 94.8], [20, 93.3], [25, 91.8], [30, 90.3],
];

// Standard N-type data (Year 1: 98%, ~0.45%/yr after yr1 → ~84.95% at yr30)
const stdPoints = [
  [0, 100], [1, 98], [5, 96.2], [10, 93.95],
  [15, 91.7], [20, 89.45], [25, 87.2], [30, 84.95],
];

function toPath(points: number[][]) {
  return points.map(([yr, pct], i) =>
    `${i === 0 ? "M" : "L"} ${chartX(yr).toFixed(1)},${chartY(pct).toFixed(1)}`
  ).join(" ");
}

function toAreaPath(points: number[][]) {
  const linePart = toPath(points);
  const lastX = chartX(points[points.length - 1][0]);
  const firstX = chartX(points[0][0]);
  return `${linePart} L ${lastX.toFixed(1)},240 L ${firstX.toFixed(1)},240 Z`;
}

export default function Warranty() {
  const sectionRef = useRef<HTMLElement>(null);
  const chartRef = useRef<SVGSVGElement>(null);
  const hjtLineRef = useRef<SVGPathElement>(null);
  const stdLineRef = useRef<SVGPathElement>(null);
  const yr1Ref = useRef<HTMLSpanElement>(null);
  const yr30Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate lines drawing
      [hjtLineRef, stdLineRef].forEach((ref) => {
        if (!ref.current) return;
        const len = ref.current.getTotalLength();
        gsap.set(ref.current, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(ref.current, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });
      });

      // Animate stat counters
      if (yr1Ref.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 99,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: yr1Ref.current, start: "top 80%", once: true },
          onUpdate() { if (yr1Ref.current) yr1Ref.current.textContent = obj.val.toFixed(0); },
        });
      }
      if (yr30Ref.current) {
        const obj = { val: 80 };
        gsap.to(obj, {
          val: 90.3,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: { trigger: yr30Ref.current, start: "top 80%", once: true },
          onUpdate() { if (yr30Ref.current) yr30Ref.current.textContent = obj.val.toFixed(1); },
        });
      }

      // Fade in section
      gsap.fromTo(
        ".warranty-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ".warranty-card", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const hjtPath = toPath(hjtPoints);
  const hjtArea = toAreaPath(hjtPoints);
  const stdPath = toPath(stdPoints);

  // Y-axis labels
  const yLabels = [100, 95, 90, 85, 80];
  // X-axis labels
  const xLabels = [0, 5, 10, 15, 20, 25, 30];

  return (
    <section
      id="warranty"
      ref={sectionRef}
      className="py-24 relative"
      style={{ background: "#060D18" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E3F6F] to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mb-3">출력 보증 30년</div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            30년이 증명하는 신뢰
          </h2>
          <p className="text-[#94A9C7] text-lg max-w-2xl mx-auto">
            경쟁사 대비 약 3% 더 높은 출력 유지율.
            <br />
            시공사가 건축주에게 제시할 수 있는 가장 강력한 수익 보장 근거입니다.
          </p>
        </div>

        {/* Warranty Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { label: "1년차 출력 보장", value: <><span ref={yr1Ref} className="text-[#F97316]">0</span><span className="text-[#F97316]">%</span></>, sub: "타사 98% vs HJT 99%" },
            { label: "30년차 출력 보장", value: <><span ref={yr30Ref} className="text-[#F97316]">80.0</span><span className="text-[#F97316]">%</span></>, sub: "경쟁 기술 대비 +3%" },
            { label: "제품 보증기간", value: <span className="text-white">15<span className="text-2xl">년</span></span>, sub: "제품 품질 무상 보증" },
            { label: "출력 보증기간", value: <span className="text-white">30<span className="text-2xl">년</span></span>, sub: "장기 수익 안정 보장" },
          ].map((item, i) => (
            <div
              key={i}
              className="warranty-card bg-[#0D2044] border border-[#1E3F6F] rounded-2xl p-6 text-center"
              style={{ opacity: 0 }}
            >
              <div className="text-4xl font-black mb-2 leading-tight">{item.value}</div>
              <div className="text-white font-semibold text-sm mb-1">{item.label}</div>
              <div className="text-[#5A7090] text-xs">{item.sub}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-[#0D2044] rounded-2xl border border-[#1E3F6F] p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h3 className="text-white font-bold text-xl">30년 출력 유지율 비교</h3>
              <p className="text-[#5A7090] text-sm mt-1">STC 기준 · 연간 출력 보증 곡선</p>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-[#F97316]" />
                <span className="text-[#94A9C7] text-sm">HJT 720W (JGDN132)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 border-t-2 border-dashed border-[#4A6080]" />
                <span className="text-[#94A9C7] text-sm">타사 N-type 모듈</span>
              </div>
            </div>
          </div>

          <div>
            <svg
              ref={chartRef}
              viewBox="0 0 620 270"
              className="w-full"
              style={{ overflow: "visible" }}
            >
              <defs>
                <linearGradient id="hjtGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#F97316" stopOpacity="0.02"/>
                </linearGradient>
              </defs>

              {/* Grid lines (horizontal) */}
              {yLabels.map((pct) => (
                <g key={pct}>
                  <line
                    x1="60" y1={chartY(pct)} x2="560" y2={chartY(pct)}
                    stroke="#1E3F6F" strokeWidth="1" strokeDasharray="4 4"
                  />
                  <text x="52" y={chartY(pct) + 4} textAnchor="end"
                    fill="#5A7090" fontSize="11" fontFamily="Arial">
                    {pct}%
                  </text>
                </g>
              ))}

              {/* Grid lines (vertical) */}
              {xLabels.map((yr) => (
                <g key={yr}>
                  <line
                    x1={chartX(yr)} y1="20" x2={chartX(yr)} y2="240"
                    stroke="#1E3F6F" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"
                  />
                  <text x={chartX(yr)} y="258" textAnchor="middle"
                    fill="#5A7090" fontSize="11" fontFamily="Arial">
                    {yr}년
                  </text>
                </g>
              ))}

              {/* Axes */}
              <line x1="60" y1="240" x2="560" y2="240" stroke="#2A4A6A" strokeWidth="1.5"/>
              <line x1="60" y1="20" x2="60" y2="240" stroke="#2A4A6A" strokeWidth="1.5"/>

              {/* Standard area fill */}
              <path d={toAreaPath(stdPoints)} fill="#4A6080" opacity="0.05"/>

              {/* HJT area fill */}
              <path d={hjtArea} fill="url(#hjtGrad)"/>

              {/* Standard dashed line */}
              <path
                ref={stdLineRef}
                d={stdPath}
                fill="none"
                stroke="#4A6080"
                strokeWidth="2"
                strokeDasharray="6 4"
              />

              {/* HJT solid line */}
              <path
                ref={hjtLineRef}
                d={hjtPath}
                fill="none"
                stroke="#F97316"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Key data points on HJT */}
              {[[1, 99], [30, 90.3]].map(([yr, pct]) => (
                <g key={yr}>
                  <circle cx={chartX(yr)} cy={chartY(pct)} r="5" fill="#F97316" stroke="#060D18" strokeWidth="2"/>
                  <text
                    x={chartX(yr) + (yr === 30 ? -8 : 8)}
                    y={chartY(pct) - 10}
                    fill="#F97316"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="Arial"
                    textAnchor={yr === 30 ? "end" : "start"}
                  >
                    {pct}%
                  </text>
                </g>
              ))}

              {/* Standard endpoint */}
              <circle cx={chartX(30)} cy={chartY(84.95)} r="4" fill="#4A6080" stroke="#060D18" strokeWidth="2"/>
              <text x={chartX(30) - 8} y={chartY(84.95) + 16} fill="#4A6080" fontSize="10" fontFamily="Arial" textAnchor="end">
                약 85%
              </text>

              {/* Gap annotation at year 30 */}
              <line
                x1={chartX(30) + 15} y1={chartY(84.95)}
                x2={chartX(30) + 15} y2={chartY(90.3)}
                stroke="#F97316" strokeWidth="1.5" strokeDasharray="3 2"
              />
              <text x={chartX(30) + 20} y={(chartY(84.95) + chartY(90.3)) / 2 + 4}
                fill="#F97316" fontSize="10" fontWeight="bold" fontFamily="Arial">
                +5.35%p
              </text>
            </svg>
          </div>

          <div className="mt-6 bg-[#F97316]/10 border border-[#F97316]/30 rounded-xl p-4 flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
              <circle cx="10" cy="10" r="9" stroke="#F97316" strokeWidth="1.5"/>
              <path d="M10 6V10.5L13 13" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p className="text-[#94A9C7] text-sm leading-relaxed">
              <span className="text-white font-semibold">30년 후 차이 = 현금의 차이입니다.</span>{" "}
              1MW 규모 발전소 기준, HJT 720W의 30년차 추가 발전량은 경쟁 제품 대비{" "}
              <span className="text-[#F97316] font-bold">수천만 원의 추가 수익</span>으로 환산됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
