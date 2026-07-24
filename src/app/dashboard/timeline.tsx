"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  date: string;
  title: string;
  desc: string;
  type: "product_launch" | "marketing" | "business";
  icon: string;
}

const events: TimelineEvent[] = [
  {
    date: "2026년 2월 9일",
    title: "OpenAI, ChatGPT 광고 전격 도입",
    desc: "OpenAI가 ChatGPT 내 광고를 시작합니다. CPM $60, 최소 구매액 $200K. 6주 만에 600개 이상 광고주 가입. 시장 점유율 하락 시작.",
    type: "product_launch",
    icon: "📢",
  },
  {
    date: "2026년 2월 9일",
    title: "Anthropic, 슈퍼볼 맞불 광고",
    desc: "Anthropic이 블랙코미디풍 반격 광고 4편을 방영. '광고가 적합한 자리는 따로 있습니다. 당신의 대화는 그 자리가 아닙니다.' 클리오 광고상 수상. Claude 앱스토어 1위 등극.",
    type: "marketing",
    icon: "🎯",
  },
  {
    date: "2026년 2월 10-16일",
    title: "QuitGPT 운동 폭발",
    desc: "참여자 250만 명. ChatGPT 삭제율 하루 295% 급증. 70만 명이 Claude로 이주. OpenAI 시장점유율 60% → 45% 추락.",
    type: "marketing",
    icon: "🔥",
  },
  {
    date: "2026년 4월",
    title: "Anthropic, OpenAI 매출 추월",
    desc: "Anthropic 연매출 $300억 도달 (16개월 만에 30배 성장). 기업 고객은 광고 없는 AI에 프리미엄 지불. OpenAI 매출은 광고에도 불구하고 정체.",
    type: "business",
    icon: "💎",
  },
  {
    date: "2026년 6월",
    title: "Anthropic IPO 신청",
    desc: "비공개 IPO 서류 제출. 기업가치 $9,650억. 가장 가치 있는 AI 기업이 광고 수익 대신 신뢰를 선택하다.",
    type: "business",
    icon: "📈",
  },
  {
    date: "2026년 7월",
    title: "GPT-5.6 3단계 전략 출시",
    desc: "OpenAI, Sol($5/$30)·Terra($2.50/$15)·Luna($1/$6) 3종 출시. 유연한 가격으로 시장 재탈환 시도. DeepSeek V4 Flash는 $0.14/$0.28로 맞불.",
    type: "product_launch",
    icon: "🚀",
  },
];

const typeStyles: Record<string, string> = {
  product_launch:
    "bg-blue-500/10 text-blue-400 border-blue-500/20",
  marketing:
    "bg-amber-500/10 text-amber-400 border-amber-500/20",
  business:
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  pricing:
    "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const typeLabels: Record<string, string> = {
  product_launch: "출시",
  marketing: "마케팅",
  business: "비즈니스",
  pricing: "가격",
};

export function Timeline() {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-8 text-lg font-semibold text-foreground">
        2026 AI 유저 파이 전쟁 — 스토리
      </h2>

      {/* 이야기 요약 */}
      <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/30 mb-6">
        <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
          📖 이야기 요약
        </p>
        <p className="mt-1 text-sm text-purple-700 dark:text-purple-300">
          2026년 2월, OpenAI가 ChatGPT에 광고를 도입한 순간 AI 업계의 판도가 바뀌었습니다.
          &lsquo;퀴트GPT(QuitGPT)&rsquo; 운동으로 70만명이 Claude로 이주했고, 4개월 만에 Anthropic이 매출 1위를 탈환했습니다.
          AI 유저 파이 전쟁의 교훈: &lsquo;신뢰는 쌓이고, 광고는 잠식된다.&rsquo;
        </p>
      </div>

      {/* Vertical timeline */}
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />

        <div className="space-y-0">
          {events.map((event, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={`${event.date}-${event.title}`}
                className={cn(
                  "relative flex items-start pb-10",
                  "md:flex-row",
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-border bg-card md:left-1/2">
                  <span className="text-sm" aria-hidden="true">
                    {event.icon}
                  </span>
                </div>

                {/* Card */}
                <div
                  className={cn(
                    "ml-12 w-full rounded-xl border border-border bg-card p-4 md:w-[calc(50%-2rem)]",
                    isLeft ? "md:mr-auto md:ml-0" : "md:ml-auto"
                  )}
                >
                  {/* Date badge */}
                  <div className="mb-2 inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {event.date}
                  </div>

                  {/* Event type badge */}
                  <Badge
                    variant="outline"
                    className={cn("mb-2 ml-2", typeStyles[event.type])}
                  >
                    {typeLabels[event.type]}
                  </Badge>

                  {/* Title */}
                  <h3 className="mt-1 text-base font-semibold text-foreground">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {event.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Separator className="my-8" />

      {/* Key insight callout */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
        <h3 className="text-sm font-semibold text-amber-400">
          🔑 마케팅 인사이트
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          2026년 AI 유저 파이 전쟁이 보여주는 교훈은 분명합니다: AI 업계에서는{' '}
          <strong className="text-foreground">신뢰와 브랜드 정직성</strong>이
          막대한 광고 예산을 능가할 수 있다는 것입니다. Anthropic은 월
          광고비 약 $4,500만으로 — OpenAI의 $2억+, Google의 $5억+에 비해
          극히 일부에 불과한 비용으로 — OpenAI의 광고 전략을 역이용해
          전략적 브랜드 반격에 성공했습니다. QuitGPT 운동은 6개월도 안
          되어 시장점유율을 60:40에서 45:18로 재편한 촉매제가 되었습니다.
          교훈: 경쟁자가 유저의 주목을 상품화할 때, 신뢰와 프리미엄 경험으로
          차별화할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
