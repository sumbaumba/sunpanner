import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-[#1E3F6F]" style={{ background: "#060D18" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 items-start">
          {/* Brand */}
          <div className="lg:col-span-2">
            {/* 이미지 여백 크롭: 컨테이너로 위아래 여백 제거 */}
            <div className="mb-3 overflow-hidden" style={{ height: "52px" }}>
              <Image
                src="/white-logo.png"
                alt="Golden Solar × 이에프글로벌코리아"
                width={800}
                height={816}
                className="w-auto object-left-top object-contain"
                style={{ height: "220px", marginTop: "-82px" }}
              />
            </div>
            <p className="text-[#5A7090] text-sm leading-relaxed mb-4 max-w-sm">
              대한민국 유일의 HJT 720W 공급사.
              23.18% 효율과 30년 90.3% 출력 보증으로
              시공사의 수익률을 극대화합니다.
            </p>
            <div className="text-[#5A7090] text-xs leading-relaxed space-y-1">
              <div>📍 서울 사무소: 경기도 고양시 덕양구 향동로 217</div>
              <div>📍 구리 본사: 경기도 구리시 건원대로 51, 3105호</div>
              <div>📞 010-5630-8344</div>
              <div>✉️ efglobalkorea@gmail.com</div>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-white font-semibold text-sm mb-4">제품 정보</div>
            <div className="space-y-3">
              {[
                { href: "#technology", label: "기술 사양" },
                { href: "#warranty", label: "보증 정책" },
                { href: "#projects", label: "납품 실적" },
              ].map(({ href, label }) => (
                <a key={href} href={href} className="block text-[#5A7090] hover:text-[#F97316] text-sm transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-white font-semibold text-sm mb-4">문의</div>
            <div className="space-y-3">
              <a href="#contact" className="block text-[#5A7090] hover:text-[#F97316] text-sm transition-colors">
                기술 상담 신청
              </a>
              <a href="#contact" className="block text-[#5A7090] hover:text-[#F97316] text-sm transition-colors">
                단가 문의
              </a>
              <a href="#contact" className="block text-[#5A7090] hover:text-[#F97316] text-sm transition-colors">
                파트너십 제안
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1E3F6F] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[#5A7090] text-xs">
            © 2025 주식회사 이에프글로벌코리아. All rights reserved.
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
            <span className="text-[#5A7090] text-xs">사업자등록번호: 630-88-00643</span>
            <span className="text-[#1E3F6F]">·</span>
            <span className="text-[#F97316] text-xs font-semibold">Golden Solar 공식 수입사</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
