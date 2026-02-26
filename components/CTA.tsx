"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const regions = [
  "서울 / 경기",
  "인천 / 강화",
  "강원도",
  "충청북도",
  "충청남도 / 대전",
  "전라북도",
  "전라남도 / 광주",
  "경상북도 / 대구",
  "경상남도 / 부산",
  "제주도",
  "기타",
];

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    region: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.05, stagger: 0.1 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_phone: formData.phone,
          region: formData.region,
          message: formData.message || "상담 내용 없음",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSubmitted(true);
    } catch {
      alert("전송 중 오류가 발생했습니다. 직접 전화(010-5630-8344)로 문의해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "#0D2044" }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #F97316, transparent 70%)" }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316] to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Copy */}
          <div className="cta-content order-2 lg:order-1" style={{ opacity: 0 }}>
            <div className="section-label mb-4">전문 기술 상담</div>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
              귀사의 현장에
              <br />
              <span className="gradient-text">최적화된</span>
              <br />
              솔루션을 제안합니다.
            </h2>
            <p className="text-[#94A9C7] text-lg leading-relaxed mb-8">
              시공 규모, 지역, 시스템 구성에 맞는 상세 데이터 시트와
              파트너십 조건을 확인하세요.
              <br />
              <span className="text-white font-semibold">24시간 이내</span> 전문 기술 담당자가 연락드립니다.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {[
                { icon: "◆", title: "맞춤형 기술 제안서", desc: "현장 조건 분석 및 최적 시스템 구성 제안" },
                { icon: "◆", title: "경쟁력 있는 단가 제공", desc: "물량 및 지역에 따른 최우선 파트너 단가" },
                { icon: "◆", title: "전국 물류 지원", desc: "경기/남부 물류센터를 통한 신속 배송" },
                { icon: "◆", title: "AS 및 사후 관리", desc: "설치 후 30년 출력 보증 서비스 지원" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="text-[#F97316] text-xs mt-1 flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-white font-semibold text-sm">{item.title}</div>
                    <div className="text-[#5A7090] text-xs mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="bg-[#0A1628] border border-[#1E3F6F] rounded-xl p-5">
              <div className="text-[#94A9C7] text-sm font-semibold mb-3">직접 연락</div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="text-[#F97316] text-base">📞</span>
                  <div>
                    <div className="text-white text-sm font-bold">010-5630-8344</div>
                    <div className="text-[#5A7090] text-xs">평일 09:00~18:00</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#F97316] text-base">✉️</span>
                  <span className="text-white text-sm">efglobalkorea@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#F97316] text-base">📍</span>
                  <div>
                    <div className="text-white text-xs">경기도 구리시 건원대로 51, 3105호</div>
                    <div className="text-[#5A7090] text-xs">고양시 덕양구 향동로 217 (서울 사무소)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="cta-content order-1 lg:order-2" style={{ opacity: 0 }}>
            <div className="bg-[#060D18] border border-[#1E3F6F] rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#F97316]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="14" fill="#F97316" opacity="0.2"/>
                      <path d="M10 16L14 20L22 12" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-3">상담 신청 완료</h3>
                  <p className="text-[#94A9C7] text-base leading-relaxed">
                    빠른 시일 내로 전문 기술 담당자가<br />
                    연락드리겠습니다. 감사합니다.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-white font-bold text-xl mb-2">전문 기술 상담 신청</h3>
                  <p className="text-[#5A7090] text-sm mb-6">간단한 정보 입력으로 맞춤 제안을 받으세요.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[#94A9C7] text-sm font-medium mb-1.5">
                        성함 <span className="text-[#F97316]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="홍길동 대표"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-input w-full px-4 py-3 rounded-xl text-sm"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[#94A9C7] text-sm font-medium mb-1.5">
                        연락처 <span className="text-[#F97316]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="010-0000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input w-full px-4 py-3 rounded-xl text-sm"
                      />
                    </div>

                    {/* Region */}
                    <div>
                      <label className="block text-[#94A9C7] text-sm font-medium mb-1.5">
                        지역 <span className="text-[#F97316]">*</span>
                      </label>
                      <select
                        required
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="form-input w-full px-4 py-3 rounded-xl text-sm appearance-none cursor-pointer"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235A7090' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                      >
                        <option value="" disabled>지역 선택</option>
                        {regions.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[#94A9C7] text-sm font-medium mb-1.5">
                        상담 내용 <span className="text-[#5A7090] font-normal">(선택)</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="시공 규모, 예상 MW, 질문 사항 등을 입력해주세요."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full py-4 rounded-xl text-base font-bold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="2" strokeDasharray="22 10"/>
                          </svg>
                          처리 중...
                        </>
                      ) : (
                        "전문 기술 상담 신청하기 →"
                      )}
                    </button>

                    <p className="text-[#5A7090] text-xs text-center">
                      입력하신 정보는 상담 목적으로만 활용됩니다.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
