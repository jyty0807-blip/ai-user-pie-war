"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// Company data with comprehensive reports
interface CompanyReport {
  overview: { point: string; detail: string }[];
  users: { point: string; detail: string }[];
  marketing: { point: string; detail: string }[];
  pricing: { point: string; detail: string }[];
  recent: { point: string; detail: string }[];
  outlook: { point: string; detail: string }[];
}

// DialogButton component
interface DialogButtonProps {
  company: { slug: string; name: string; logo: string; color: string };
  report: CompanyReport;
}

export function DialogButton({ company, report }: DialogButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            className={cn(
              "inline-flex items-center gap-2 rounded-sm border px-4 py-2.5 text-sm font-medium transition-all duration-200",
              "hover:shadow-none active:translate-y-0"
            )}
            style={{
              borderColor: company.color + "40",
              backgroundColor: company.color + "08",
            }}
          >
            <span className="text-lg">{company.logo}</span>
            <span>{company.name}</span>
            <span className="text-xs text-muted-foreground">종합 리포트</span>
          </button>
        }
      />
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span>{company.logo}</span>
            {company.name} 종합 리포트
          </DialogTitle>
          <DialogDescription>
            퍼포먼스 마케팅 관점에서 분석한 {company.name}의 유저 확보 전략
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[65vh] overflow-y-auto pr-4">
          <div className="space-y-6">
            {/* Overview */}
            <Section title="📋 개요" items={report.overview} />
            {/* User Metrics */}
            <Section title="👥 유저 현황" items={report.users} />
            {/* Marketing Strategy */}
            <Section title="📢 마케팅 전략" items={report.marketing} />
            {/* Pricing Strategy */}
            <Section title="💰 가격 전략" items={report.pricing} />
            {/* Recent Issues */}
            <Section title="🔥 최근 이슈" items={report.recent} />
            {/* Outlook */}
            <Section title="🔮 전망" items={report.outlook} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Section({ title, items }: { title: string; items: { point: string; detail: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground mb-2">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="rounded-sm bg-muted/50 p-3">
            <p className="text-sm font-medium text-foreground">{item.point}</p>
            <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Company reports data
export const companyReports: Record<string, CompanyReport> = {
  openai: {
    overview: [
      { point: "AI 시장 1위, but 흔들리는 왕좌", detail: "ChatGPT 800M WAU로 압도적 1위지만, 광고 도입 후 25% 유저 이탈. 2026년 2월은 OpenAI의 분기점이 된 달." },
      { point: "비즈니스 모델 전환 중", detail: "구독($20/월) + 광고($60 CPM) 하이브리드 모델. 광고 수익이 구독 수익을 추월하는 중. 2026년 예상 광고 수익 $500M+." },
    ],
    users: [
      { point: "800M WAU — 여전히 압도적 규모", detail: "전 세계 AI 사용자의 45% 점유. 하지만 전년비 -25% 감소 추세. 유료 전환율 6.2%로 업계 최저." },
      { point: "멀티호밍이 문제", detail: "79%의 유료 사용자가 동시에 타사 AI도 사용 중. 충성도가 아닌 습관으로 사용하는 유저 비중 증가." },
      { point: "CAC $45 — 점점 비싸지는 유저 획득", detail: "광고비 2억달러+ 투입에도 유저당 획득 비용 상승 중. 경쟁 과열로 CAC 3배 증가." },
    ],
    marketing: [
      { point: "공격적 퍼포먼스 마케팅", detail: "Google Ads, Meta, Reddit, X 전 채널 공략. ChatGPT Ads 플랫폼으로 크리에이터 유입에도 힘씀." },
      { point: "Brand 인지도는 여전히 최고", detail: "ChatGPT = AI의 대명사. 무료 브랜드 노출 효과 막대. 하지만 '광고하는 AI' 이미지로 프리미엄 유저 이탈." },
      { point: "QuitGPT 운동의 교훈", detail: "700K+ 유저 이탈, 295% 앱 삭제 급증. 유저는 '내 대화가 상품화되는 것'을 거부했다." },
    ],
    pricing: [
      { point: "Tri-tier 전략: Sol/Terra/Luna", detail: "GPT-5.6 Sol ($5/$30), Terra ($2.50/$15), Luna ($1/$6). 모든 가격대 커버가 목표." },
      { point: "가격 다양화로 유저 세그먼트 확장", detail: "Luna ($1/$6)는 DeepSeek V4 Flash ($0.14/$0.28)에 대응. 하지만 여전히 7-178배 비쌈." },
      { point: "Batch API 50% 할인", detail: "비실시간 작업은 50% 할인. 캐싱 90% 할인으로 장기 유저 락인 효과." },
    ],
    recent: [
      { point: "GPT-5.6 GA (2026년 7월 9일)", detail: "Sol/Terra/Luna 3개 티어 출시. Luna의 $1/$6 가격은 중소 개발자 유입 목적." },
      { point: "ChatGPT Ads 전환 추적 도입", detail: "Conversions API + Pixel 지원. CPA 입찰 로드맵 발표. 퍼포먼스 마케터 본격 유입." },
      { point: "700M WAU 보고 — 광고주에게는 호재", detail: "광고 도입 후 유저 감소에도 700M+ 유지. 광고 도달력은 여전히 압도적." },
    ],
    outlook: [
      { point: "광고 회사로의 전환 — 리스크와 기회", detail: "광고 수익이 구독 수익을 넘는 시점에 기업 가치 재평가 불가피. 단기 수익 vs 장기 브랜드의 딜레마." },
      { point: "오픈소스 모델과의 경쟁 심화", detail: "DeepSeek V4 Flash의 1/8 가격에 대응할 수익성 있는 전략 필요. 차별화는 모델이 아닌 생태계에서." },
      { point: "가장 시급한 과제: 유저 신뢰 회복", detail: "QuitGPT 이후 훼손된 신뢰를 어떻게 회복할지가 2026년 하반기의 최대 과제." },
    ],
  },
  anthropic: {
    overview: [
      { point: "2026년 최고의 반전 스토리", detail: "20M→120M WAU 6배 성장, $30B ARR로 OpenAI 추월. $965B IPO 가치 평가. '신뢰'가 비즈니스 가치로 전환된 사례." },
      { point: "무광고 전략의 승리", detail: "광고 없이도 유료 전환율 46% 업계 1위. 유저는 데이터 프라이버시에 더 높은 가격을 지불할 의향이 있음을 증명." },
    ],
    users: [
      { point: "120M WAU — 폭발적 성장 중", detail: "전년비 +600% 성장. 2026년 2월 QuitGPT 여파로 단기간에 45M→65M→85M→120M 급성장." },
      { point: "전환율 46% — 업계 압도적 1위", detail: "유료 전환율이 OpenAI의 7.4배. 유저가 데려오는 유저의 선순환 구조. Enterprise 계약 건수 3배 증가." },
      { point: "CAC $28 — 효율적인 유저 획득", detail: "오가닉 + 컨텐츠 마케팅 중심. 광고비는 OpenAI의 1/4 수준이지만 더 높은 LTV 확보." },
    ],
    marketing: [
      { point: "Zero-Ads가 곧 마케팅", detail: "광고를 하지 않는 것이 가장 강력한 마케팅 메시지. Super Bowl 'Anti-Ads' 캠페인으로 클리오 어워드 수상." },
      { point: "Enterprise 신뢰 마케팅", detail: "기업 고객 대상 '데이터가 훈련에 사용되지 않음' 강조. SOC 2, ISO 27001 인증이 마케팅 도구." },
      { point: "MCP 생태계로 전환 비용 상승", detail: "97M+ MCP 설치로 개발자 락인. 오픈소스 표준 전략으로 생태계 방어선 구축." },
    ],
    pricing: [
      { point: "프리미엄 가격 전략 — Fable 5 $50/MTok", detail: "가장 비싼 모델(Fable 5)로 프리미엄 포지셔닝. 하지만 Sonnet 5 프로모션($2/$10)으로 중간층 공략." },
      { point: "Sonnet 5 프로모션 — 8월 31일까지", detail: "할인 기간 한정으로 유저 유입 후 정가($3/$15) 전환. Freemium의 API 버전." },
      { point: "캐싱 90% 할인 — 장기 고객 유인", detail: "반복되는 시스템 프롬프트에 90% 할인. 개발자에게 Anthropic이 더 저렴할 수 있다는 인식 심어주기." },
    ],
    recent: [
      { point: "IPO 기밀 신청 — $965B 가치 평가", detail: "2026년 6월 기밀 IPO 신청. 가장 가치 있는 AI 기업으로 등극. 무광고 전략의 가치를 시장이 인정." },
      { point: "Claude Sonnet 5 출시", detail: "2026년 6월 30일 출시. $3/$15 정가, 프로모션 $2/$10. SWE-bench 80.8%로 코딩 1위." },
      { point: "MCP 97M+ 설치 — 생태계 확장", detail: "오픈소스 표준으로 자리잡으며 Claude Code의 경쟁력 강화. 개발자 도구 시장 지형 변화." },
    ],
    outlook: [
      { point: "IPO 후 공격적 확장 예상", detail: "IPO 자금으로 Google Ads 등 본격적 퍼포먼스 마케팅 시작 가능성. 2026년 하반기 광고비 3배 증가 전망." },
      { point: "B2B → B2C 확장의 관건", detail: "Enterprise 중심에서 개인 사용자로 확장이 필요. 무광고 전략을 유지하며 스케일업할 수 있을지가 변수." },
      { point: "유지율이 최대 과제", detail: "멀티호밍 시대에 Claude만의 고유 가치를 유저에게 계속 증명해야 함. 생태계 전략이 핵심." },
    ],
  },
  deepseek: {
    overview: [
      { point: "가격 혁명의 아이콘", detail: "V4 Flash $0.14/$0.28로 업계 최저가. 미국 대비 1/8 가격. 80M WAU까지 성장했지만 중국 리스크가 변수." },
      { point: "오픈소스 + MIT 라이선스", detail: "모델 가중치 공개로 글로벌 개발자 커뮤니티 확보. 서방 규제 리스크에도 기술적 영향력 확대 중." },
    ],
    users: [
      { point: "80M WAU — 가격 민감층 중심", detail: "동남아, 인도, 남미 등 신흥 시장에서 강세. 미국 시장 점유율은 7%로 제한적." },
      { point: "전환율 8% — 가격이 유일한 무기", detail: "유료 전환율은 낮지만 CAC $8로 가장 효율적. '써보니까 괜찮네' → 업그레이드 패턴." },
      { point: "개발자 중심 유저 베이스", detail: "API-first 전략으로 개발자 유저 비중 60%+. 기술 블로그와 Reddit이 주요 채널." },
    ],
    marketing: [
      { point: "가격이 곧 마케팅", detail: "$0.28/MTok 출력 가격은 그 자체로 최고의 마케팅. '178배 저렴함'이 바이럴 키워드." },
      { point: "오픈소스 커뮤니티 마케팅", detail: "Hugging Face, GitHub에서 모델 공개. MIT 라이선스로 기업 도입 장벽 제거." },
      { point: "중국 정부 지원 = 간접 마케팅", detail: "화웨이 칩 전환 발표는 중국 기술 자립의 상징. 서방 시장에서는 오히려 리스크로 작용." },
    ],
    pricing: [
      { point: "V4 Flash $0.14/$0.28 — 업계 최저가", detail: "미국 대비 input 35배, output 178배 저렴. 캐시 히트 시 $0.0028/MTok로 사실상 공짜." },
      { point: "V4 Pro $0.44/$0.87 — 중간 티어", detail: "프로모션 가격 유지 중. 정가 대비 75% 할인 상태. 언제든 인상 가능한 리스크." },
      { point: "피크/오프피크 가격제 도입설", detail: "베이징 업무 시간 2배 요금 루머. 서방 고객에게는 신뢰성 문제로 작용." },
    ],
    recent: [
      { point: "V4 Flash 1M 컨텍스트 지원", detail: "2026년 7월, 1M 토큰 컨텍스트 윈도우 지원. 서방 모델과 기능적 격차 해소." },
      { point: "화웨이 승천 칩으로 전환", detail: "모든 V4 추론을 화웨이 칩에서 실행. 중국 기술 자립의 상징이 되었지만 서방 시장 진출에 제약." },
      { point: "레거시 모델명 7월 24일 종료", detail: "deepseek-chat, deepseek-reasoner → V4 Flash/Pro로 마이그레이션. API 안정성에 의문 제기." },
    ],
    outlook: [
      { point: "서방 시장 규제 리스크", detail: "미국 수출 규제, EU AI Act 등 규제 강화 시 성장 둔화 불가피. 데이터 레지던시 문제도 걸림돌." },
      { point: "가격 전쟁의 지속 가능성", detail: "178배 저렴한 가격을 언제까지 유지할 수 있을지. 서방 경쟁사도 가격 인하 중." },
      { point: "최대 강점 = 개방성", detail: "오픈소스 + MIT + 저렴한 가격의 조합은 개발자 커뮤니티에서 강력한 무기. 폐쇄적인 서방 모델과의 차별화 포인트." },
    ],
  },
  "google-ai": {
    overview: [
      { point: "가장 강력한 배포망을 가진 AI 기업", detail: "20억 안드로이드 기기, 10억+ 검색 사용자, 20억+ Chrome 사용자. AI 기능을 번들로 제공할 수 있는 유일한 기업." },
      { point: "AI 모드 광고로 신규 수익 창출", detail: "Conversational Discovery + Highlighted Answer 형식. $60 CPM으로 Search 광고의 진화를 선도." },
    ],
    users: [
      { point: "200M WAU — 번들 효과로 성장 중", detail: "안드로이드 OS + Google 앱에 Gemini 기본 탑재. 유저는 별도 설치 없이 AI 사용. 전년비 +300%." },
      { point: "전환율 15% — 번들의 힘", detail: "Gmail, Docs, Search 등 기존 서비스에서 AI 기능 업셀. 유저는 추가 비용 없이 AI 체험 후 업그레이드." },
      { point: "CAC $12 — 가장 낮은 유저 획득 비용", detail: "기존 유저 베이스에 AI 기능 추가만으로 유저 획득. 별도 마케팅 비용 최소화." },
    ],
    marketing: [
      { point: "Display 광고 969% 증가", detail: "AI Mode 광고 형식 도입으로 Display 예산 폭발. Google Marketing Live에서 AI 광장 제품 라인업 공개." },
      { point: "번들 마케팅 = 독보적 강점", detail: "안드로이드 20억 기기, Gmail 18억 유저, Google 포토 10억 유저. AI는 모든 제품에 스며드는 전략." },
      { point: "Apple과의 검색 계약 리스크", detail: " antitrust 이슈로 Apple 기본 검색 계약 위기. $20B+ 계약 손실 시 AI 투자 여력 감소." },
    ],
    pricing: [
      { point: "가장 다양한 가격대", detail: "Gemini 3.1 Pro ($2/$12), 3.5 Flash ($1.50/$9), 3 Flash ($0.50/$3), Flash-Lite ($0.25/$1.50). 모든 가격대 커버." },
      { point: "200K 토큰 이상 2배 — 주의 필요", detail: "200K 초과 시 입력 2배, 출력 1.5배. 캐싱도 2배. 장문 작업 시 비용 예측 어려움." },
      { point: "TPU 수직 통합 = 비용 경쟁력", detail: "자체 TPU 칩으로 인프라 비용 최적화. DeepSeek만큼 싸지는 않지만 지속적 가격 인하 가능." },
    ],
    recent: [
      { point: "Google Marketing Live 2026", detail: "AI Mode 광고 제품 라인업 공개. Conversational Discovery, AI Overviews 광고 등 신규 광고 형식 발표." },
      { point: "Gemini 3.5 Flash 기본 탑재", detail: "2026년 5월, Gemini 3.5 Flash가 기본 추천 모델로. $1.50/$9로 중간 티어 경쟁력 강화." },
      { point: "안드로이드 AI 기능 20억 기기 도달", detail: "Gemini가 안드로이드 시스템 레이어에 통합. AI 기능이 OS의 일부로 기본 제공되는 시대." },
    ],
    outlook: [
      { point: "2027년 AI 시장 1위 탈환 노림수", detail: "20억 안드로이드 기기 + Gemini 생태계 + 자체 TPU = 가장 강력한 인프라. 실행력이 관건." },
      { point: "광고 수익 969% 증가 — AI 모드가 새로운 캐시카우", detail: "AI Overviews 광고로 검색 광고 시장의 진화 선도. 2026년 AI 광고 수익 $2B+ 예상." },
      { point: "규제 리스크가 최대 변수", detail: "反독점 소송, Apple 검색 계약 위기, EU 규제. 기술적 우위를 규제가 무력화할 가능성." },
    ],
  },
};
