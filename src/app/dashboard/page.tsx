"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { KpiCards } from "./kpi-cards";
import { Trends } from "./trends";
import { Comparison } from "./comparison";
import { Timeline } from "./timeline";
import { Pricing } from "./pricing";

export default function DashboardPage() {
  const [tab, setTab] = useState("kpi");

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          2026 AI 유저 파이 전쟁
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          OpenAI · Anthropic · DeepSeek · Google의 유저 확보 경쟁을 한눈에
        </p>
      </div>

      {/* Tab navigation */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="kpi">핵심 지표</TabsTrigger>
          <TabsTrigger value="comparison">4사 비교표</TabsTrigger>
          <TabsTrigger value="timeline">📖 스토리</TabsTrigger>
          <TabsTrigger value="pricing">💰 가격 전쟁</TabsTrigger>
        </TabsList>

        <TabsContent value="kpi">
          <div className="space-y-8">
            {/* 한줄요약 인사이트 */}
            <div className="rounded-lg border border-amber-200 border-l-4 border-l-amber-400 bg-amber-50 p-5 dark:border-amber-800 dark:border-l-amber-400 dark:bg-amber-950/30">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                💡 한줄 요약
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-amber-700 dark:text-amber-300">
                <li><strong>OpenAI</strong> — 광고 도입 후 MAU 600M→450M, 25% 하락</li>
                <li><strong>Anthropic</strong> — &apos;무광고&apos; 전략으로 20M→120M, 6배 성장</li>
                <li><strong>DeepSeek</strong> — $0.28/MTok 극저가로 가격 전쟁 주도</li>
                <li><strong>&quot;신뢰&quot; vs &quot;광고&quot;</strong> — AI 시장의 승부처가 모델 성능에서 유저 획득 전략으로 이동</li>
              </ul>
            </div>
            <KpiCards />
            <Trends />
          </div>
        </TabsContent>

        <TabsContent value="comparison">
          <Comparison />
        </TabsContent>

        <TabsContent value="timeline">
          <Timeline />
        </TabsContent>

        <TabsContent value="pricing">
          <Pricing />
        </TabsContent>
      </Tabs>
    </div>
  );
}
