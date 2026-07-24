"use client";

import { useState } from "react";
import { BookOpen, DollarSign, BarChart3, Lightbulb, Target, TrendingUp } from "lucide-react";
import { KpiCards } from "./kpi-cards";
import { Trends } from "./trends";
import { Comparison } from "./comparison";
import { Timeline } from "./timeline";
import { Pricing } from "./pricing";
import { DialogButton, companyReports } from "./company-report";
import { MetricTooltip, METRIC_DEFINITIONS } from "@/components/metric-tooltip";
import { EvidenceTooltip, SECTION_EVIDENCE } from "@/components/evidence-tooltip";
import {
  OpenAILogo,
  AnthropicLogo,
  DeepSeekLogo,
  GoogleAILogo,
} from "@/components/company-logos";

export default function DashboardPage() {
  const [dashTab, setDashTab] = useState("kpi");
  const tabs = [
    { value: "kpi", label: "핵심 지표", icon: null as React.ReactNode },
    { value: "comparison", label: "4사 비교표", icon: null as React.ReactNode },
    { value: "timeline", label: "스토리", icon: <BookOpen className="h-3.5 w-3.5" /> },
    { value: "pricing", label: "가격 전쟁", icon: <DollarSign className="h-3.5 w-3.5" /> },
    { value: "trends", label: "시장 트렌드", icon: <BarChart3 className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          2026 AI 유저 파이 전쟁
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          OpenAI · Anthropic · DeepSeek · Google (Gemini)의 유저 확보 경쟁을 한눈에
        </p>
      </div>

      {/* Company quick-report buttons */}
      <div className="mb-6 flex flex-wrap gap-3">
        {[
{ slug: "openai", name: "OpenAI", logo: <OpenAILogo className="h-6 w-6 shrink-0" />, color: "#10A37F" },
  { slug: "anthropic", name: "Anthropic", logo: <AnthropicLogo className="h-6 w-6 shrink-0" />, color: "#D97757" },
  { slug: "deepseek", name: "DeepSeek", logo: <DeepSeekLogo className="h-6 w-6 shrink-0" />, color: "#4F46E5" },
  { slug: "google-ai", name: "Google (Gemini)", logo: <GoogleAILogo className="h-6 w-6 shrink-0" />, color: "#4285F4" },
        ].map((company) => (
          <DialogButton
            key={company.slug}
            company={company}
            report={companyReports[company.slug]}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-1 rounded-full border border-[rgba(15,0,0,0.12)] bg-[#f8f7f7] p-1 w-fit mb-8 dark:border-[rgba(255,255,255,0.1)] dark:bg-[#222]">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setDashTab(tab.value)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
              dashTab === tab.value
                ? "bg-[#201d1d] text-[#fdfcfc] shadow-sm dark:bg-[#fdfcfc] dark:text-[#201d1d]"
                : "text-[#424245] hover:text-[#201d1d] dark:text-[#a0a0a0] dark:hover:text-[#fdfcfc]"
            }`}
          >
            {tab.icon && <span className="inline-flex">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

        {dashTab === "kpi" && (
          <div className="space-y-10">
            {/* 한줄요약 인사이트 */}
            <div className="rounded-sm border border-slate-300/20 bg-slate-50/80 p-6 dark:border-slate-700/20 dark:bg-slate-900/30">
              <div className="mb-2 flex items-center gap-1">
                <p className="inline-flex items-center gap-1.5 rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]">
                  <Lightbulb className="h-3.5 w-3.5" />한줄 요약
                </p>
                <EvidenceTooltip section="핵심 지표 (KPI)" sources={SECTION_EVIDENCE["kpi-cards"].sources} methodology={SECTION_EVIDENCE["kpi-cards"].methodology} className="-mb-0.5" />
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700 dark:text-slate-300">
                <li><strong>OpenAI</strong> — 800M WAU<MetricTooltip term="WAU" definition={METRIC_DEFINITIONS.WAU} /> 유지중 but 광고 도입 후 25% 이탈 가속화, 유료 전환율 6.2%로 최저</li>
                <li><strong>Anthropic</strong> — 120M WAU, 무광고 전략으로 600% 폭발적 성장, 전환율 46% 업계 1위</li>
                <li><strong>DeepSeek</strong> — 80M WAU, $0.28/MTok 극저가로 가격 민감층 흡수 중</li>
                <li><strong>Google (Gemini)</strong> — 200M WAU, 안드로이드 20억 기기 번들이 핵심 유저 획득 채널</li>
              </ul>
            </div>
            <KpiCards />
            <Trends />
          </div>
        )}

        {dashTab === "comparison" && (
          <Comparison />
        )}

        {dashTab === "timeline" && (
          <Timeline />
        )}

        {dashTab === "pricing" && (
          <Pricing />
        )}

        {dashTab === "trends" && (
          <div className="space-y-10">
            {/* Executive Summary */}
            <div className="rounded-sm border border-violet-300/20 bg-violet-50/80 p-6 dark:border-violet-800/20 dark:bg-violet-950/20">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]"><BarChart3 className="h-3.5 w-3.5" />AI 시장 트렌드 요약</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-violet-700 dark:text-violet-300">
                <li><strong>800M vs 120M:</strong> OpenAI가 아직 유저 볼륨 1위지만, 성장률은 Anthropic이 600%로 압도</li>
                <li><strong>멀티호밍 79%:</strong> 대부분 유저가 2개 이상 AI 서비스 동시 사용 — 전환율이 아닌 유지율이 진짜 승부</li>
                <li><strong>QuitGPT 효과:</strong> 광고 도입 후 700K+ 유저 이탈, AI 업계 최초의 &apos;윤리적 소비&apos; 운동</li>
                <li><strong>유저 파이 전쟁의 교훈:</strong> &apos;더 많은 유저&apos;보다 &apos;더 충성도 높은 유저&apos;가 장기적 가치</li>
              </ul>
            </div>

            {/* Key Metrics Comparison */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-sm border border-border bg-card p-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"><DollarSign className="h-3.5 w-3.5 inline -mt-0.5" /> 예산 효율</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-green-500">▲</span>
                    <span><strong>Anthropic:</strong> 광고비 $45M에 $30B ARR = ROAS<MetricTooltip term="ROAS" definition={METRIC_DEFINITIONS.ROAS} /> 666x</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-red-500">▼</span>
                    <span><strong>OpenAI:</strong> 광고비 $200M에 정체된 ARR = 규모의 비효율</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-blue-500">→</span>
                    <span><strong>DeepSeek:</strong> 광고비 $12M, 가격으로 유저 획득 = 최저 CAC<MetricTooltip term="CAC" definition={METRIC_DEFINITIONS.CAC} /></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-slate-500">▲</span>
                    <span><strong>Google (Gemini):</strong> 기존 광고 인프라 + AI로 교차판매 = 시너지 최대</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-sm border border-border bg-card p-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"><Target className="h-3.5 w-3.5 inline -mt-0.5" /> 핵심 전환 지표</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="text-green-500">🥇</span><span><strong>전환율 1위:</strong> Anthropic 46% — 유료전환율 업계 최고</span></li>
                  <li className="flex items-start gap-2"><span className="text-gray-400">🥈</span><span><strong>전환율 2위:</strong> Google (Gemini) 15% — 안드로이드 번들 효과</span></li>
                  <li className="flex items-start gap-2"><span className="text-orange-400">🥉</span><span><strong>전환율 3위:</strong> DeepSeek 8% — 가격 민감층 중심</span></li>
                  <li className="flex items-start gap-2"><span className="text-red-400">4위</span><span><strong>전환율 최저:</strong> OpenAI 6.2% — 광고 도입 후 신규유저 질 하락</span></li>
                </ul>
              </div>
            </div>

            {/* Prediction Card */}
            <div className="rounded-sm border border-slate-300/20 bg-slate-50/80 p-5 dark:border-slate-700/20 dark:bg-slate-900/30">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]"><TrendingUp className="h-3.5 w-3.5" />2026년 하반기 전망</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-slate-700 dark:text-slate-300">
                <li><strong>OpenAI:</strong> 광고 수익이 구독 수익을 추월 — 기업가치 재평가 불가피</li>
                <li><strong>Anthropic:</strong> IPO 후 자금력으로 공격적 UA 확장 — Google 광고 집행 본격화 예상</li>
                <li><strong>DeepSeek:</strong> 서방 시장 규제 리스크 — 미국 진출 제한 시 성장 둔화</li>
                <li><strong>Google (Gemini):</strong> Gemini 3.5 생태계 + 20억 안드로이드 기기 = 2027년 1위 탈환 노림수</li>
              </ul>
            </div>
          </div>
        )}
    </div>
  );
}
