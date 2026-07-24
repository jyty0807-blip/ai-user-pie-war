"use client";

import { useState } from "react";
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

interface TrendPoint {
  month: string;
  openai: number;
  anthropic: number;
  deepseek: number;
  google: number;
  event: string;
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

const companyColors: Record<string, string> = {
  openai: "#10A37F",
  anthropic: "#D97757",
  deepseek: "#4F46E5",
  google: "#4285F4",
};

const companyLabels: Record<string, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  deepseek: "DeepSeek",
  google: "Google",
};

const ranges = [
  { label: "6개월", months: 6 },
  { label: "1년", months: 12 },
  { label: "전체", months: 18 },
];

export function Trends() {
  const [range, setRange] = useState(6);
  const data = trendData.slice(-range);
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

  return (
    <div className="space-y-8">
      {/* Date range selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          월간 활성 유저 추이 (백만명)
        </h2>
        <div className="flex gap-1">
          {ranges.map((r) => (
            <Button
              key={r.label}
              variant={range === r.months ? "default" : "ghost"}
              size="xs"
              onClick={() => setRange(r.months)}
            >
              {r.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Summary banner */}
      <div className="rounded-lg border border-amber-300/50 bg-amber-50/80 p-4 shadow-sm dark:border-amber-800/50 dark:bg-amber-950/20">
        <p className="text-xs font-semibold text-amber-800 dark:text-amber-200">
          💡 핵심 인사이트
        </p>
        <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-xs text-amber-700 dark:text-amber-300">
          <li>2026년 2월 OpenAI 광고 도입으로 유저 이탈 가속화 — 6개월간 800M→580M, 27.5% 감소</li>
          <li>Anthropic은 무광고 전략으로 20M→120M 폭발적 성장, 유저 충성도 압도적 1위</li>
        </ul>
      </div>

      {/* MAU Line Chart */}
      <div className="rounded-xl border border-border bg-card p-4">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="month"
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              tickFormatter={(v: number) => `${v}M`}
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
                dot={{ r: 4, fill: color }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 한줄요약 인사이트 */}
      <div className="rounded-lg border border-amber-300/50 bg-amber-50/80 p-4 shadow-sm dark:border-amber-800/50 dark:bg-amber-950/20">
        <p className="text-xs font-semibold text-amber-800 dark:text-amber-200">
          💡 한줄 요약
        </p>
        <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-xs text-amber-700 dark:text-amber-300">
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
        <div className="rounded-xl border border-border bg-card p-4">
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
