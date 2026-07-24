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
          <TabsTrigger value="trends">📊 시장 트렌드</TabsTrigger>
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

        <TabsContent value="trends">
          <div className="space-y-6">
            {/* Executive Summary */}
            <div className="rounded-lg border border-violet-200 border-l-4 border-l-violet-400 bg-violet-50 p-5 dark:border-violet-800 dark:border-l-violet-400 dark:bg-violet-950/30">
              <p className="text-sm font-medium text-violet-800 dark:text-violet-200">📊 AI 시장 트렌드 요약</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-violet-700 dark:text-violet-300">
                <li><strong>시장 규모:</strong> 2026년 AI 산업 전체 광고비 지출은 전년비 800% 증가, 경쟁이 과열되면서 CAC(고객획득비용) 3배 상승</li>
                <li><strong>Platform Shift:</strong> Google AI Mode ($60 CPM), Meta (20-30 CPM), ChatGPT Ads ($200K 최소 커밋) — 광고 채널 다양화로 예산 분산</li>
                <li><strong>79%의 유료 사용자가 여러 AI 구독 동시 사용</strong> — 충성도가 아닌 멀티호밍이 지배적 패턴. 전환율이 아닌 유지율이 새로운 핵심 지표</li>
                <li><strong>신뢰 프리미엄:</strong> 광고 없는 AI에 유저는 최대 3배 더 높은 가격을 지불할 의향 (Anthropic 사례). 윤리적 포지셔닝이 실제 비즈니스 가치로 전환되는 중</li>
              </ul>
            </div>

            {/* Key Metrics Comparison */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">💰 예산 효율</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-green-500">▲</span>
                    <span><strong>Anthropic:</strong> 광고비 $45M에 $30B ARR = ROAS 666x</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-500">▼</span>
                    <span><strong>OpenAI:</strong> 광고비 $200M에 정체된 ARR = 규모의 비효율</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-blue-500">→</span>
                    <span><strong>DeepSeek:</strong> 광고비 $12M, 가격으로 유저 획득 = 최저 CAC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-yellow-500">▲</span>
                    <span><strong>Google:</strong> 기존 광고 인프라 + AI로 교차판매 = 시너지 최대</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-border bg-card p-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">🎯 핵심 전환 지표</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="text-green-500">🥇</span><span><strong>전환율 1위:</strong> Anthropic 46% — 유료전환율 업계 최고</span></li>
                  <li className="flex items-start gap-2"><span className="text-gray-400">🥈</span><span><strong>전환율 2위:</strong> Google 15% — 안드로이드 번들 효과</span></li>
                  <li className="flex items-start gap-2"><span className="text-orange-400">🥉</span><span><strong>전환율 3위:</strong> DeepSeek 8% — 가격 민감층 중심</span></li>
                  <li className="flex items-start gap-2"><span className="text-red-400">4위</span><span><strong>전환율 최저:</strong> OpenAI 6.2% — 광고 도입 후 신규유저 질 하락</span></li>
                </ul>
              </div>
            </div>

            {/* Prediction Card */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/30">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">🔮 2026년 하반기 전망</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-amber-700 dark:text-amber-300">
                <li><strong>OpenAI:</strong> 광고 수익이 구독 수익을 추월 — 기업가치 재평가 불가피</li>
                <li><strong>Anthropic:</strong> IPO 후 자금력으로 공격적 UA 확장 — Google 광고 집행 본격화 예상</li>
                <li><strong>DeepSeek:</strong> 서방 시장 규제 리스크 — 미국 진출 제한 시 성장 둔화</li>
                <li><strong>Google:</strong> Gemini 3.5 생태계 + 20억 안드로이드 기기 = 2027년 1위 탈환 노림수</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
