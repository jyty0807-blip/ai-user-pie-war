"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import Link from "next/link";

interface MetricTooltipProps {
  term: string;
  definition: string;
}

export function MetricTooltip({ term, definition }: MetricTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button className="inline-flex items-center justify-center align-middle ml-0.5">
            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground/60 hover:text-muted-foreground transition-colors" />
          </button>
        }
      />
      <TooltipContent className="max-w-[240px] p-3">
        <p className="text-xs font-semibold text-foreground mb-1">{term}</p>
        <p className="text-[0.65rem] text-muted-foreground leading-relaxed">{definition}</p>
        <Link
          href="/dashboard/onboarding"
          className="mt-1.5 inline-block text-[0.6rem] text-primary hover:underline"
        >
          자세히 보기 →
        </Link>
      </TooltipContent>
    </Tooltip>
  );
}

// Common metric definitions
export const METRIC_DEFINITIONS: Record<string, string> = {
  WAU: "Weekly Active Users — 주간 활성 유저. 일주일 동안 서비스를 한 번이라도 사용한 유저 수. 서비스의 일간 사용률을 보여줍니다.",
  MAU: "Monthly Active Users — 월간 활성 유저. 한 달 동안 서비스를 사용한 유저 수. 서비스의 전체 규모를 측정하는 핵심 지표입니다.",
  CAC: "Customer Acquisition Cost — 고객 획득 비용. 새 유저 한 명을 데려오는 데 드는 평균 비용. 광고비 + 마케팅 비용 ÷ 신규 유저 수로 계산합니다.",
  전환율: "Conversion Rate — 유료 전환율. 전체 유저 중 유료 구독으로 전환된 비율. 높을수록 비즈니스 효율이 좋습니다.",
  ROAS: "Return on Ad Spend — 광고 투자 수익률. 광고비 1원당 얼마의 수익을 냈는지 측정. 100%면 본전, 200%면 두 배 수익입니다.",
  CPM: "Cost Per Mille — 1,000회 노출당 비용. 광고가 1,000번 노출될 때 드는 비용. AI 업계는 $60 CPM으로 전통 디지털 광고보다 높은 편입니다.",
  "시장 점유율": "Market Share — 전체 AI 시장에서 특정 기업이 차지하는 비율. 45%면 AI 사용자 100명 중 45명이 그 서비스를 쓴다는 의미입니다.",
  "유료 전환율": "전체 무료 사용자 중 유료 구독자로 전환된 비율. 업계 평균 10-15%에서 Anthropic이 46%로 1위입니다.",
  ARPU: "Average Revenue Per User — 사용자당 평균 수익. 전체 매출을 전체 유저 수로 나눈 값. 서비스의 수익성을 측정합니다.",
  "광고 채널": "Ad Channels — 광고를 집행하는 플랫폼. Google Ads, Meta, Reddit, TikTok 등이 주요 AI 광고 채널입니다.",
  MTok: "Million Tokens — 백만 토큰. AI 모델이 텍스트를 처리하는 기본 단위. 가격 표시의 기준 ($/MTok)으로, 1MTok은 약 소설 3권 분량입니다.",
};
