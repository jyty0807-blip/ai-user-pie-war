"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import ReviewsPage from "./reviews";

export default function PlatformsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tab, setTab] = useState("comparison");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#201d1d] dark:text-[#fdfcfc]">
          AI 개발 플랫폼 비교
        </h1>
        <p className="mt-1 text-sm text-[#424245] dark:text-[#a0a0a0]">
          Claude Code · OpenAI Codex · OpenCode — 개발자 도구 3종 비교
        </p>
      </div>

      <Separator />

      <div className="flex items-center gap-1 rounded-full border border-[rgba(15,0,0,0.12)] bg-[#f8f7f7] p-1 w-fit dark:border-[rgba(255,255,255,0.1)] dark:bg-[#222]">
        <button
          onClick={() => setTab("comparison")}
          className={cn(
            "rounded-full px-5 py-2 text-xs font-medium transition-all",
            tab === "comparison"
              ? "bg-[#201d1d] text-[#fdfcfc] shadow-sm dark:bg-[#fdfcfc] dark:text-[#201d1d]"
              : "text-[#424245] hover:text-[#201d1d] dark:text-[#a0a0a0] dark:hover:text-[#fdfcfc]"
          )}
        >
          📊 비교
        </button>
        <button
          onClick={() => setTab("reviews")}
          className={cn(
            "rounded-full px-5 py-2 text-xs font-medium transition-all",
            tab === "reviews"
              ? "bg-[#201d1d] text-[#fdfcfc] shadow-sm dark:bg-[#fdfcfc] dark:text-[#201d1d]"
              : "text-[#424245] hover:text-[#201d1d] dark:text-[#a0a0a0] dark:hover:text-[#fdfcfc]"
          )}
        >
          💬 커뮤니티 의견
        </button>
      </div>

      {tab === "comparison" && <div className="mt-6">{children}</div>}
      {tab === "reviews" && <div className="mt-6"><ReviewsPage /></div>}
    </div>
  );
}
