"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface EvidenceTooltipProps {
  section: string;
  sources: string[];
  methodology?: string;
  className?: string;
}

export function EvidenceTooltip({ section, sources, methodology, className }: EvidenceTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            className={cn(
              "inline-flex items-center justify-center",
              "h-5 w-5 rounded-full",
              "text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted/50",
              "transition-colors",
              className
            )}
            aria-label={`${section} 데이터 출처 정보`}
          >
            <HelpCircle className="h-3.5 w-3.5" />
          </button>
        }
      />
      <TooltipContent
        className="max-w-[280px] p-3.5 bg-[#fdfcfc] dark:bg-[#1a1a1a] border border-border"
        side="left"
        align="start"
      >
        <p className="text-xs font-semibold text-[#201d1d] dark:text-[#fdfcfc] mb-2">
          📋 {section} — 데이터 근거
        </p>
        <ul className="space-y-1">
          {sources.map((source, i) => (
            <li key={i} className="flex items-start gap-1.5 text-[0.6rem] leading-relaxed text-[#424245] dark:text-[#a0a0a0]">
              <span className="mt-0.5 shrink-0">•</span>
              <span>{source}</span>
            </li>
          ))}
        </ul>
        {methodology && (
          <div className="mt-2 pt-2 border-t border-border">
            <p className="text-[0.55rem] font-medium text-[#646262] dark:text-[#888] mb-0.5">방법론</p>
            <p className="text-[0.55rem] leading-relaxed text-[#646262] dark:text-[#888]">{methodology}</p>
          </div>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

// Predefined evidence data for each section
export const SECTION_EVIDENCE: Record<string, {
  sources: string[];
  methodology?: string;
}> = {
  "kpi-cards": {
    sources: [
      "MAU/WAU: Sensor Tower · Similarweb · 각사 IR 자료 (2026년 7월)",
      "시장 점유율: FourWeekMBA · SEC filings · 업계 보고서 종합",
      "광고비: SEC filings · Sensor Tower 광고 추정 · 언론 보도",
      "CAC: 광고비 ÷ 신규 유저 수 추정. 공개 데이터 기반 계산",
      "유료 전환율: 각사 공시 · 앱 스토어 구독 데이터 · 업계 추정",
    ],
    methodology: "모든 수치는 공개 데이터 출처의 교차 검증을 통해 추정. ±10% 오차 범위 내. 실제 기업 내부 데이터가 아님을 주의.",
  },
  trends: {
    sources: [
      "MAU 트렌드: Sensor Tower · SimilarWeb 월간 보고서 (2025.01-2026.07)",
      "광고비 트렌드: SEC filings · Kantar 광고 추정 · 경쟁사 보고서",
      "이벤트 마커: 각사 공식 발표 · 보도자료 · 테크크런치 · 블룸버그",
      "QuitGPT 데이터: 앱 스토어 랭킹 · Sensor Tower 앱 삭제 추정",
    ],
    methodology: "시계열 데이터는 월간 스냅샷 기준. 성장률은 기준월(2026.02) 대비 변화율. 이벤트 날짜는 공식 발표 기준.",
  },
  comparison: {
    sources: [
      "4사 비교 데이터: Sensor Tower · SimilarWeb · 각사 IR · SEC filings",
      "광고 채널: 각사 광고 계정 분석 · Pathmatics · Adbeat 추정",
      "시장 점유율: FourWeekMBA · CB Insights · 업계 분석 보고서",
    ],
    methodology: "비교 데이터는 동일 기간(2026년 7월 기준)으로 통일. 채널 분석은 공개 광고 데이터 기반.",
  },
  timeline: {
    sources: [
      "타임라인 이벤트: 각사 공식 블로그 · 보도자료 · 테크크런치 · 블룸버그 · 로이터",
      "IPO 데이터: SEC EDGAR 공시 · 언론 보도",
      "QuitGPT: Reddit r/QuitGPT · Sensor Tower 앱 데이터 · X/Twitter 공개 데이터",
    ],
    methodology: "모든 이벤트는 최소 2개 이상의 독립 출처 교차 검증. 날짜는 UTC 기준. 마케팅 인사이트는 Stephen Van Tran · FourWeekMBA · Advertising Week 분석 인용.",
  },
  pricing: {
    sources: [
      "OpenAI: developers.openai.com/api/docs/pricing (2026.07 기준)",
      "Anthropic: anthropic.com/pricing (2026.07 기준)",
      "Google: ai.google.dev/gemini-api/docs/pricing (2026.07 기준)",
      "DeepSeek: api-docs.deepseek.com/quick_start/pricing (2026.07 기준)",
      "비교 분석: Developers Digest (2026.07)"
    ],
    methodology: "가격은 2026년 7월 25일 기준 각사 공식 API 가격 페이지에서 직접 수집. 프로모션 가격과 정규 가격 별도 표기. USD 기준.",
  },
  news: {
    sources: [
      "OpenAI: openai.com/blog RSS 피드",
      "Anthropic: anthropic.com/blog RSS 피드",
      "DeepSeek: api-docs.deepseek.com 공지 RSS",
      "Google: blog.google/technology/ai/ RSS",
    ],
    methodology: "각사 공식 RSS 피드에서 수집, snippet만 표시. 전체 내용은 원문 링크 참조. 매일 오전 9시 (KST) 업데이트.",
  },
  platforms: {
    sources: [
      "SWE-bench: swe-bench.github.io (2026년 7월 리더보드)",
      "MCP 설치량: anthropic.com 공식 블로그 (2026.07)",
      "가격: 각사 공식 API 가격 페이지 (2026.07)",
      "커뮤니티 규모: GitHub Stars · 각사 공시 · 업계 추정",
    ],
    methodology: "플랫폼 데이터는 공식 문서 및 공개 벤치마크 기준. 만족도는 키워드 기반 감정 분석. ±10% 오차 가능.",
  },
  insights: {
    sources: [
      "중국 모델: 각사 공식 발표 · Papers With Code · Hugging Face",
      "NVIDIA: nvidia.com 공식 발표 · GTC 컨퍼런스",
      "OpenRouter: openrouter.ai 공식 문서 · 블로그",
      "글로벌 AI: 각사 공식 발표 · 테크크런치 · 블룸버그",
    ],
    methodology: "인사이트 데이터는 공식 발표 및 업계 분석 종합. 중국 모델 정보는 현지 매체 교차 검증.",
  },
};