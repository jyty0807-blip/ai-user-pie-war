"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { EvidenceTooltip, SECTION_EVIDENCE } from "@/components/evidence-tooltip";
import { Rocket, Target, Zap, Crown, TrendingUp, BookOpen, Lightbulb, type LucideIcon } from "lucide-react";
import { timelineEvents, type TimelineEvent as DataEvent } from "@/data/timeline-events";

interface MappedTimelineEvent {
  date: string;
  title: string;
  desc: string;
  type: string;
  Icon: LucideIcon;
}

const companyIcons: Record<string, LucideIcon> = {
  openai: Rocket,
  anthropic: Target,
  deepseek: Zap,
};

function formatDate(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
  }
  return dateStr;
}

const events: MappedTimelineEvent[] = timelineEvents.map((event) => ({
  date: formatDate(event.event_date),
  title: event.title,
  desc: event.description,
  type: event.event_type,
  Icon: companyIcons[event.company_slug] || Rocket,
}));

const typeStyles: Record<string, string> = {
  product_launch:
    "bg-blue-500/10 text-blue-400 border-blue-500/20",
  marketing:
    "bg-slate-500/10 text-slate-400 border-slate-500/20",
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
      <div className="mb-8 flex items-center gap-1">
        <h2 className="inline-flex rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]">
          2026 AI 유저 파이 전쟁 — 스토리
        </h2>
        <EvidenceTooltip section="타임라인 스토리" sources={SECTION_EVIDENCE.timeline.sources} methodology={SECTION_EVIDENCE.timeline.methodology} className="-mb-0.5" />
      </div>

      {/* 이야기 요약 */}
      <div className="rounded-sm border border-purple-300/20 bg-purple-50/80 p-5 dark:border-purple-800/20 dark:bg-purple-950/20 mb-6">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]">
          <BookOpen className="h-3.5 w-3.5" />이야기 요약
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-purple-700 dark:text-purple-300">
          <li>2026년 2월, <strong>OpenAI의 ChatGPT 광고 도입</strong>이 업계 분수령</li>
          <li><strong>QuitGPT 운동</strong>으로 70만명이 Claude로 이주, 295% 앱 삭제 급증</li>
          <li><strong>Anthropic, 4개월 만에 매출 1위 탈환</strong> ($30B ARR)</li>
          <li>교훈: <strong>&quot;신뢰는 쌓이고, 광고는 잠식된다&quot;</strong></li>
        </ul>
      </div>

      {/* Vertical timeline */}
      <div className="relative">
        {/* Center line — hidden on mobile, visible on md+ */}
        <div className="absolute left-4 top-0 hidden h-full w-px bg-border md:left-1/2 md:block md:-translate-x-px" />

        <div className="space-y-8">
          {events.map((event, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={`${event.date}-${event.title}`}
                className={cn(
                  "relative flex items-start md:flex-row",
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card md:left-1/2">
                  <event.Icon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                </div>

                {/* Card */}
                <div
                  className={cn(
                    "ml-12 w-full rounded-sm border border-border bg-card p-5 md:w-[calc(50%-2rem)]",
                    isLeft ? "md:mr-auto md:ml-0" : "md:ml-auto"
                  )}
                >
                  {/* Header row: date + type badge */}
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {event.date}
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(typeStyles[event.type])}
                    >
                      {typeLabels[event.type]}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-foreground">
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
      <div className="rounded-sm border border-slate-300/20 bg-slate-50/80 p-6 dark:border-slate-700/20 dark:bg-slate-900/30">
        <h3 className="inline-flex items-center gap-1.5 rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]">
          <Lightbulb className="h-3.5 w-3.5" />마케팅 인사이트
        </h3>
        <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground">
          <li>
            AI 업계에서는{' '}
            <strong className="text-foreground">신뢰와 브랜드 정직성</strong>이
            막대한 광고 예산을 능가할 수 있음
          </li>
          <li>
            Anthropic은 월 광고비 약 $4,500만으로 — OpenAI의 $2억+, Google의
            $5억+에 비해 극히 일부에 불과한 비용으로 — 전략적 브랜드 반격에
            성공
          </li>
          <li>
            QuitGPT 운동은 6개월도 안 되어 시장점유율을 60:40에서 45:18로
            재편한 촉매제
          </li>
          <li>
            교훈: 경쟁자가 유저의 주목을 상품화할 때, 신뢰와 프리미엄 경험으로
            차별화할 수 있음
          </li>
        </ul>
      </div>
    </div>
  );
}
