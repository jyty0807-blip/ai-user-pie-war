"use client";

import { Globe, Cpu, Network, Layers, Calendar, Newspaper, Pin } from "lucide-react";
import { EvidenceTooltip, SECTION_EVIDENCE } from "@/components/evidence-tooltip";

interface CompanyInfo {
  name: string;
  slug: string;
  desc: string;
  news: string[];
  url?: string;
}

interface InsightCategory {
  category: string;
  color: string;
  icon: React.ReactNode;
  companies: CompanyInfo[];
}

function categoryIcon(cat: string): React.ReactNode {
  const map: Record<string, React.ReactNode> = {
    "중국 AI 모델": <Globe className="h-4 w-4" />,
    "NVIDIA AI": <Cpu className="h-4 w-4" />,
    "OpenRouter": <Network className="h-4 w-4" />,
    "글로벌 AI": <Layers className="h-4 w-4" />,
  };
  return map[cat] || <Globe className="h-4 w-4" />;
}

const insightsData: InsightCategory[] = [
  {
    category: "중국 AI 모델",
    color: "#E53935",
    icon: <Globe className="h-4 w-4" />,
    companies: [
      {
        name: "GLM (Zhipu AI)",
        slug: "glm",
        desc: "중국 대표 AI. GLM-5 출시. MIT 라이선스. 1M 컨텍스트. $0.20/MTok.",
        news: [
          "2026년 7월 Codex-0902 추론 모델 출시, SWE-bench 70.2% 달성",
          "2026년 6월 MIT 라이선스 전환 — 글로벌 개발자 대상 확대",
          "2026년 5월 기업용 GLM-5 API $0.15/MTok로 인하",
        ],
        url: "https://www.zhipu.ai",
      },
      {
        name: "Qwen (Alibaba)",
        slug: "qwen",
        desc: "알리바바 AI. Qwen3.5 공개. 72B 파라미터. Apache 2.0 라이선스.",
        news: [
          "2026년 6월 Qwen3.5-72B 출시, 오픈소스 커뮤니티서 호평",
          "2026년 5월 알리바바 클라우드 AI 매출 45% YoY 성장 발표",
          "2026년 4일 Qwen 에이전트 SDK 공개 — MCP 호환",
        ],
        url: "https://qwen.alibaba.com",
      },
      {
        name: "Yi (01.AI)",
        slug: "yi",
        desc: "카이푸 리의 AI. Yi-Lightning 추론 특화. 가격 대비 성능 우수.",
        news: [
          "2026년 5월 Yi-Lightning 출시, GPT-4o 대비 40% 저렴",
          "2026년 4월 시리즈 B $5억 유치, 기업가치 $35B",
        ],
        url: "https://01.ai",
      },
    ],
  },
  {
    category: "NVIDIA AI",
    color: "#76B900",
    icon: <Cpu className="h-4 w-4" />,
    companies: [
      {
        name: "NVIDIA GPU",
        slug: "nvidia",
        desc: "AI 반도체 절대 강자. B200/GB200 양산. H100→B200 4세대.",
        news: [
          "2026년 7월 Rubin GPU 로드맵 발표, 2027년 양산 목표",
          "2026년 6월 AI 반도체 시장 점유율 88% 기록",
          "2026년 5일 데이터센터 매출 $40B 돌파 (Q1 FY2027)",
        ],
      },
      {
        name: "CUDA 생태계",
        slug: "cuda",
        desc: "AI 개발 표준 플랫폼. 500만+ 개발자. MCP와 경쟁.",
        news: [
          "2026년 6월 CUDA 13.0 발표, AI 에이전트 SDK 포함",
          "2026년 4월 CUDA 개발자 500만 명 돌파 — AI 에이전트 교육 과정 신설",
        ],
      },
      {
        name: "AI Enterprise",
        slug: "nvidia-enterprise",
        desc: "기업용 AI 플랫폼. NIM 마이크로서비스. 100+ 사전학습 모델.",
        news: [
          "2026년 7월 NIM v2 출시, 추론 속도 2.5배 개선",
          "2026년 6월 AWS·Azure·GCP에서 NIM 원클릭 배포 지원",
        ],
      },
    ],
  },
  {
    category: "OpenRouter",
    color: "#FF6B35",
    icon: <Network className="h-4 w-4" />,
    companies: [
      {
        name: "OpenRouter",
        slug: "openrouter",
        desc: "멀티모델 라우팅 플랫폼. 200+ 모델. 단일 API로 모든 모델 접근.",
        news: [
          "2026년 7월 모델 라우팅 최적화 기능 출시, 자동 지연 시간 최소화",
          "2026년 6월 200개 모델 돌파 — SOC 2 규정 준수 인증",
        ],
      },
      {
        name: "Router Pricing",
        slug: "router-pricing",
        desc: "모델별 실시간 가격 비교. 캐싱 90% 할인. 마크업 5-15%",
        news: [
          "2026년 7월 DeepSeek V4 Flash $0.14/$0.28로 최저가 유지",
          "2026년 5월 무료 티어 제공 시작 (비율 제한)",
        ],
      },
    ],
  },
  {
    category: "글로벌 AI",
    color: "#8B5CF6",
    icon: <Layers className="h-4 w-4" />,
    companies: [
      {
        name: "Mistral AI",
        slug: "mistral",
        desc: "프랑스 AI. Mistral Large 3.1. 유럽 AI 대표 주자.",
        news: [
          "2026년 7월 Mistral Large 3.1 출시, GPT-4o 대비 30% 저렴",
          "2026년 5월 유럽연합 AI Act 규제 대응 'Le Chat' 기업용 출시",
          "2026년 4월 시리즈 D $6억 유치, 기업가치 $10B+",
        ],
      },
      {
        name: "xAI (Grok)",
        slug: "xai",
        desc: "일론 머스크 AI. Grok 4. X/Twitter 통합. 가격 인하 경쟁.",
        news: [
          "2026년 6월 Grok 4 출시, X Premium 가입자에 무료 제공",
          "2026년 5일 X/Twitter에 Grok 실시간 검색 탑재",
        ],
      },
      {
        name: "Meta Llama",
        slug: "meta",
        desc: "오픈소스 AI 선두. Llama 5 출시. Apache 2.0. 1M 컨텍스트.",
        news: [
          "2026년 7월 Llama 5 출시, 405B 파라미터, Apache 2.0 라이선스",
          "2026년 6일 Llama 5 추론 속도 2배 개선 — vLLM 네이티브 지원",
        ],
      },
    ],
  },
];

export default function InsightsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
      {/* Title */}
      <div className="mb-6">
        <div className="flex items-center gap-1">
          <h1 className="inline-flex rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]">
            AI 업계 인사이트 · 아카이브
          </h1>
          <EvidenceTooltip section="AI 업계 인사이트" sources={SECTION_EVIDENCE.insights.sources} methodology={SECTION_EVIDENCE.insights.methodology} className="-mb-0.5" />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          4사 비교를 넘어 — 글로벌 AI 업계의 모든 중요한 소식
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 inline -mt-0.5" /> 수동 업데이트 (최종: 2026년 7월 25일)
        </p>
      </div>

      {/* Category Cards */}
      <div className="space-y-6">
        {insightsData.map((category) => (
          <div
            key={category.category}
            className="rounded-sm border p-5"
            style={{
              borderColor: category.color + "30",
              backgroundColor: category.color + "06",
            }}
          >
            {/* Category Header */}
            <div
              className="mb-4 flex items-center gap-2 border-b pb-2"
              style={{ borderBottomColor: category.color + "40" }}
            >
              <span className="text-muted-foreground">{category.icon}</span>
              <h2 className="inline-flex rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]">
                {category.category}
              </h2>
              <span className="text-[0.65rem] text-muted-foreground">
                ({category.companies.length}개 주시)
              </span>
            </div>

            {/* Company Cards Grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {category.companies.map((company) => {
                const Wrapper = company.url ? "a" : "div";
                const wrapperProps = company.url
                  ? { href: company.url, target: "_blank", rel: "noopener noreferrer" as const }
                  : {};
                return (
                  <Wrapper
                    key={company.slug}
                    {...wrapperProps}
                    className="flex flex-col rounded-sm border border-border bg-background p-4 transition-colors hover:border-muted-foreground/20 hover:bg-[#f8f7f7] dark:hover:bg-[#222]"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-foreground">{company.name}</h3>
                      {company.url && <span className="text-[0.55rem] text-[#646262]">바로가기 →</span>}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{company.desc}</p>
                    <div className="mt-3 rounded-sm border-l-2 bg-muted/40 p-2"
                      style={{ borderLeftColor: category.color }}
                    >
                      <p className="text-xs font-medium text-foreground"><Newspaper className="h-3 w-3 inline -mt-0.5" /> 최근 소식</p>
                      {company.news.map((n, i) => (
                        <p key={i} className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{n}</p>
                      ))}
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Source Notice */}
      <div className="mt-8 rounded-sm bg-muted p-3 text-center">
        <p className="flex items-center justify-center gap-1 text-[0.65rem] text-muted-foreground">
          <Pin className="h-3 w-3 inline -mt-0.5" /> 출처: 각사 공식 블로그 및 보도자료. 저작권을 존중하여 요약만 제공합니다.
        </p>
      </div>
    </div>
  );
}
