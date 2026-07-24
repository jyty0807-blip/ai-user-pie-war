"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface UpdateEvent {
  date: string;
  company: string;
  companySlug: string;
  color: string;
  event: string;
  detail: string;
  link?: string;
  linkLabel?: string;
}

const UPDATE_EVENTS: UpdateEvent[] = [
  { date: "매일 07:00 KST", company: "OpenAI", companySlug: "openai", color: "#10A37F", event: "Blog RSS 수집", detail: "OpenAI 공식 블로그의 최신 포스트를 자동 수집합니다.", link: "/dashboard/news", linkLabel: "뉴스 보기" },
  { date: "매일 07:00 KST", company: "Anthropic", companySlug: "anthropic", color: "#D97757", event: "Blog RSS 수집", detail: "Anthropic 공식 블로그의 최신 포스트를 자동 수집합니다.", link: "/dashboard/news", linkLabel: "뉴스 보기" },
  { date: "매일 07:00 KST", company: "DeepSeek", companySlug: "deepseek", color: "#4F46E5", event: "Blog RSS 수집", detail: "DeepSeek API 공지 및 업데이트를 자동 수집합니다.", link: "/dashboard/news", linkLabel: "뉴스 보기" },
  { date: "매일 07:00 KST", company: "Google", companySlug: "google-ai", color: "#4285F4", event: "Blog RSS 수집", detail: "Google AI Blog의 최신 포스트를 자동 수집합니다.", link: "/dashboard/news", linkLabel: "뉴스 보기" },
  { date: "매주 월 07:00 KST", company: "전체", companySlug: "", color: "#646262", event: "주간 가격 변동 체크", detail: "4사 API 가격 페이지를 스캔하여 변동 사항을 업데이트합니다.", link: "/dashboard", linkLabel: "가격 보기" },
  { date: "매주 금 07:00 KST", company: "전체", companySlug: "", color: "#646262", event: "주간 트렌드 데이터 갱신", detail: "Sensor Tower · SimilarWeb 데이터를 반영하여 MAU/광고비 트렌드를 업데이트합니다.", link: "/dashboard", linkLabel: "트렌드 보기" },
  { date: "2026-07-31", company: "Anthropic", companySlug: "anthropic", color: "#D97757", event: "Sonnet 5 프로모션 종료", detail: "Claude Sonnet 5 프로모션 가격($2/$10)이 종료됩니다. 이후 $3/$15로 인상.", link: "/dashboard", linkLabel: "가격 확인" },
  { date: "2026-08-15", company: "OpenAI", companySlug: "openai", color: "#10A37F", event: "GPT-5.6 Luna 정착 분석", detail: "GPT-5.6 Luna 출시 1개월, 유저 반응 및 시장 점유율 변화 분석 예정.", link: "/dashboard/insights", linkLabel: "인사이트 보기" },
];

function CalendarChip({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        open
          ? "border-[#201d1d] bg-[#201d1d] text-[#fdfcfc] dark:border-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]"
          : "border-[rgba(15,0,0,0.12)] text-[#424245] hover:bg-[#f8f7f7] dark:border-[rgba(255,255,255,0.15)] dark:text-[#a0a0a0] dark:hover:bg-[#222]"
      )}
    >
      <Calendar className="h-3.5 w-3.5" />
      <span>업데이트 일정</span>
      <span className={cn("text-[0.55rem] transition-transform", open && "rotate-180")}>
        ▼
      </span>
    </button>
  );
}

export function UpdateSchedule() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4">
      <CalendarChip open={open} onClick={() => setOpen(!open)} />

      {open && (
        <div className="mt-3 rounded-sm border border-[rgba(15,0,0,0.12)] bg-[#f8f7f7] p-4 dark:border-[rgba(255,255,255,0.1)] dark:bg-[#222]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-[#201d1d] dark:text-[#fdfcfc]">
              <Calendar className="h-3.5 w-3.5" /> 업데이트 캘린더
            </p>
            <p className="text-[0.55rem] text-[#9a9898] dark:text-[#666]">
              한국시간(KST) 기준
            </p>
          </div>

          <div className="space-y-1">
            {UPDATE_EVENTS.map((event, i) => (
              <Tooltip key={i}>
                <TooltipTrigger
                  render={
                    <div
                      className={cn(
                        "flex items-center gap-3 rounded-sm px-2.5 py-1.5 text-xs transition-colors",
                        "hover:bg-[#fdfcfc] dark:hover:bg-[#2a2a2a]",
                        "cursor-default"
                      )}
                    >
                      <span className="shrink-0 w-16 text-[0.55rem] font-medium text-[#646262] dark:text-[#888]">
                        {event.date}
                      </span>
                      <span
                        className="shrink-0 inline-block w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: event.color }}
                      />
                      <span className="shrink-0 font-medium text-[#201d1d] dark:text-[#fdfcfc]">
                        {event.company}
                      </span>
                      <span className="text-[#424245] dark:text-[#a0a0a0]">
                        {event.event}
                      </span>
                    </div>
                  }
                />
                <TooltipContent
                  className="max-w-[220px] p-3 bg-[#fdfcfc] dark:bg-[#1a1a1a] border border-border"
                  side="right"
                  align="start"
                >
                  <p className="text-xs font-semibold text-[#201d1d] dark:text-[#fdfcfc] mb-1">
                    {event.company} — {event.event}
                  </p>
                  <p className="text-[0.6rem] text-[#424245] dark:text-[#a0a0a0] leading-relaxed">
                    {event.detail}
                  </p>
                  {event.link && (
                    <Link
                      href={event.link}
                      className="mt-1.5 inline-block text-[0.55rem] text-[#007aff] hover:underline"
                    >
                      {event.linkLabel} →
                    </Link>
                  )}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          <p className="mt-3 text-[0.55rem] text-[#9a9898] dark:text-[#666]">
            매일 오전 7시(KST) 각사 공식 RSS 피드를 수집합니다. 주간 데이터는 금요일 7시에 갱신됩니다.
          </p>
        </div>
      )}
    </div>
  );
}