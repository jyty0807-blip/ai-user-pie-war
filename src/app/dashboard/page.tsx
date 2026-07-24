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
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                💡 한줄 요약
              </p>
              <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                OpenAI는 광고 도입 후 MAU 600M→450M으로 25% 하락. 반면 Anthropic은 &apos;무광고&apos; 전략으로 20M→120M 6배 성장. 
                AI 시장은 &apos;누가 더 똑똑한 모델을 만드느냐&apos;에서 &apos;누가 유저의 신뢰를 얻느냐&apos;로 전쟁터가 바뀌었습니다.
                가장 비싼 모델(Fable 5, $50/MTok)과 가장 싼 모델(DeepSeek V4 Flash, $0.28/MTok)의 가격 차이는 178배입니다.
              </p>
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
