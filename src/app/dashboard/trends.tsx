"use client";

import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Label,
} from "recharts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EvidenceTooltip, SECTION_EVIDENCE } from "@/components/evidence-tooltip";
import { UpdateSchedule } from "@/components/update-schedule";

interface TrendPoint {
  month: string;
  openai: number;
  anthropic: number;
  deepseek: number;
  google: number;
  event?: string;
}

const trendData: TrendPoint[] = [
  {
    month: "Feb 2026",
    openai: 800,
    anthropic: 20,
    deepseek: 30,
    google: 100,
    event: "OpenAI announces ads",
  },
  {
    month: "Mar 2026",
    openai: 720,
    anthropic: 45,
    deepseek: 55,
    google: 120,
    event: "QuitGPT peak",
  },
  {
    month: "Apr 2026",
    openai: 680,
    anthropic: 65,
    deepseek: 60,
    google: 140,
    event: "Anthropic overtakes revenue",
  },
  {
    month: "May 2026",
    openai: 650,
    anthropic: 85,
    deepseek: 70,
    google: 160,
    event: "Claude Sonnet 5 launch",
  },
  {
    month: "Jun 2026",
    openai: 620,
    anthropic: 105,
    deepseek: 75,
    google: 180,
    event: "Anthropic IPO filing",
  },
  {
    month: "Jul 2026",
    openai: 580,
    anthropic: 120,
    deepseek: 80,
    google: 200,
    event: "GPT-5.6 GA",
  },
];

const weeklyData: TrendPoint[] = [
  { month: "7/19", openai: 595, anthropic: 112, deepseek: 78, google: 195 },
  { month: "7/20", openai: 590, anthropic: 114, deepseek: 79, google: 196 },
  { month: "7/21", openai: 588, anthropic: 116, deepseek: 79, google: 197 },
  { month: "7/22", openai: 585, anthropic: 117, deepseek: 80, google: 198 },
  { month: "7/23", openai: 583, anthropic: 118, deepseek: 80, google: 199 },
  { month: "7/24", openai: 581, anthropic: 119, deepseek: 80, google: 200 },
  { month: "7/25", openai: 580, anthropic: 120, deepseek: 80, google: 200 },
];

const monthlyData: TrendPoint[] = [
  { month: "7/1", openai: 590, anthropic: 110, deepseek: 78, google: 195 },
  { month: "7/8", openai: 585, anthropic: 114, deepseek: 79, google: 197 },
  { month: "7/15", openai: 582, anthropic: 117, deepseek: 80, google: 199 },
  { month: "7/22", openai: 580, anthropic: 120, deepseek: 80, google: 200 },
];

const companyColors: Record<string, string> = {
  openai: "#10A37F",
  anthropic: "#D97757",
  deepseek: "#4F46E5",
  google: "#4285F4",
};

/** Stroke dash patterns for color-blind accessibility — each company gets a unique pattern */
const companyDashArrays: Record<string, string> = {
  openai: "0",           // solid line
  anthropic: "8 4",      // dashed
  deepseek: "2 4",       // dotted
  google: "12 4 2 4",   // dash-dot
};

const companyLabels: Record<string, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  deepseek: "DeepSeek",
  google: "Google",
};

type RangeKey = "1w" | "1m" | "6m" | "1y" | "all";

const ranges: { label: string; key: RangeKey }[] = [
  { label: "1주일", key: "1w" },
  { label: "1개월", key: "1m" },
  { label: "6개월", key: "6m" },
  { label: "1년", key: "1y" },
  { label: "전체", key: "all" },
];

export function Trends() {
  const [range, setRange] = useState<RangeKey>("6m");
  const dataMap: Record<RangeKey, TrendPoint[]> = {
    "1w": weeklyData,
    "1m": monthlyData,
    "6m": trendData.slice(-6),
    "1y": trendData.slice(-12),
    "all": trendData,
  };
  const data = dataMap[range];
  const marketShareData = data.map((point) => {
    const total = point.openai + point.anthropic + point.deepseek + point.google;
    return {
      month: point.month,
      openai: Math.round((point.openai / total) * 100),
      anthropic: Math.round((point.anthropic / total) * 100),
      deepseek: Math.round((point.deepseek / total) * 100),
      google: Math.round((point.google / total) * 100),
    };
  });

  const [viewMode, setViewMode] = useState<"absolute" | "growth">("absolute");

  const growthData = useMemo(() => {
    if (data.length === 0) return [];
    const baseline = data[0];
    return data.map((point) => ({
      month: point.month,
      openai: ((point.openai - baseline.openai) / baseline.openai) * 100,
      anthropic: ((point.anthropic - baseline.anthropic) / baseline.anthropic) * 100,
      deepseek: ((point.deepseek - baseline.deepseek) / baseline.deepseek) * 100,
      google: ((point.google - baseline.google) / baseline.google) * 100,
      event: point.event,
    }));
  }, [data]);

  const chartData = viewMode === "growth" ? growthData : data;

  return (
    <div className="space-y-8">
      {/* Update schedule calendar */}
      <UpdateSchedule />

      {/* Date range selector + view mode toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          {viewMode === "growth"
            ? "월간 유저 성장률 추이 (%)"
            : "월간 활성 유저 추이 (백만명)"}
          <EvidenceTooltip section="시장 트렌드" sources={SECTION_EVIDENCE.trends.sources} methodology={SECTION_EVIDENCE.trends.methodology} className="ml-1 -mb-0.5" />
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-border bg-muted p-0.5">
            <button
              onClick={() => setViewMode("absolute")}
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                viewMode === "absolute"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              절대값
            </button>
            <button
              onClick={() => setViewMode("growth")}
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                viewMode === "growth"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              성장률
            </button>
          </div>
          <div className="flex gap-1">
            {ranges.map((r) => (
              <Button
                key={r.key}
                variant={range === r.key ? "default" : "ghost"}
                size="xs"
                onClick={() => setRange(r.key)}
              >
                {r.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary banner */}
      <div className="rounded-sm border border-slate-300/20 bg-slate-50/80 p-4 dark:border-slate-700/20 dark:bg-slate-900/30">
        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          💡 핵심 인사이트
        </p>
        <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-xs text-slate-700 dark:text-slate-300">
          <li>2026년 2월 OpenAI 광고 도입으로 유저 이탈 가속화 — 6개월간 800M→580M, 27.5% 감소</li>
          <li>Anthropic은 무광고 전략으로 20M→120M 폭발적 성장, 유저 충성도 압도적 1위</li>
        </ul>
      </div>

      {/* MAU Line Chart */}
      <div className="rounded-sm border border-border bg-card p-4">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            {viewMode === "growth" && (
              <ReferenceLine y={0} stroke="var(--border)" strokeDasharray="3 3" />
            )}
            <XAxis
              dataKey="month"
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              tickFormatter={
                viewMode === "growth"
                  ? (v: number) => `${v > 0 ? "+" : ""}${v}%`
                  : (v: number) => `${v}M`
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--card-foreground)",
                fontSize: "13px",
              }}
            />
            <Legend
              formatter={(value: string) => companyLabels[value] ?? value}
            />
            {Object.entries(companyColors).map(([k, color]) => (
              <Line
                key={k}
                type="monotone"
                dataKey={k}
                stroke={color}
                strokeWidth={2}
                strokeDasharray={companyDashArrays[k]}
                dot={{ r: 4, fill: color }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Growth rate insight */}
      {viewMode === "growth" && (
        <div className="rounded-sm border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/50">
          <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
            💡 성장률 기준으로 보면 이야기가 완전히 달라집니다
          </p>
          <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-xs text-slate-700 dark:text-slate-300">
            <li>
              <strong>Anthropic</strong> +600% — 절대값 3위지만 성장률 1위, 폭발적 상승 중
            </li>
            <li>
              <strong>DeepSeek</strong> +167% — 가격 경쟁력으로 꾸준한 성장
            </li>
            <li>
              <strong>Google</strong> +100% — 번들 효과로 안정적 상승
            </li>
            <li>
              <strong>OpenAI</strong> -27.5% — 광고 도입 후 유저 이탈 지속
            </li>
          </ul>
        </div>
      )}

      {/* 한줄요약 인사이트 */}
      <div className="rounded-sm border border-slate-300/20 bg-slate-50/80 p-4 dark:border-slate-700/20 dark:bg-slate-900/30">
        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          💡 한줄 요약
        </p>
        <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-xs text-slate-700 dark:text-slate-300">
          <li>OpenAI: 800M→580M, 유저 이탈 지속 — 광고 도입이 역효과</li>
          <li>Anthropic: 20M→120M, 6배 성장 — 유저 신뢰가 최고의 획득 채널</li>
          <li>DeepSeek &amp; Google: 각각 80M/200M, 가격과 생태계로 유저 확보</li>
        </ul>
      </div>

      {/* Market Share Bar Chart */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          4사 유저 점유율 추이 (%)
        </h2>
        <div className="rounded-sm border border-border bg-card p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={marketShareData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="month"
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--card-foreground)",
                  fontSize: "13px",
                }}
              />
              <Legend
                formatter={(value: string) => companyLabels[value] ?? value}
              />
              {Object.entries(companyColors).map(([k, color]) => (
                <Bar key={k} dataKey={k} fill={color} radius={[4, 4, 0, 0]} />
              ))}
              {/* Reference line for QuitGPT peak */}
              <ReferenceLine
                x="Mar 2026"
                stroke="var(--destructive)"
                strokeDasharray="6 3"
              >
                <Label
                  value="QuitGPT 이탈 정점"
                  position="insideTopRight"
                  fill="var(--destructive)"
                  fontSize={11}
                />
              </ReferenceLine>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
