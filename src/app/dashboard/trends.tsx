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
    openai: 600,
    anthropic: 20,
    deepseek: 30,
    google: 100,
    event: "OpenAI announces ads",
  },
  {
    month: "Mar 2026",
    openai: 520,
    anthropic: 45,
    deepseek: 55,
    google: 120,
    event: "QuitGPT peak",
  },
  {
    month: "Apr 2026",
    openai: 490,
    anthropic: 65,
    deepseek: 60,
    google: 140,
    event: "Anthropic overtakes revenue",
  },
  {
    month: "May 2026",
    openai: 470,
    anthropic: 85,
    deepseek: 70,
    google: 160,
    event: "Claude Sonnet 5 launch",
  },
  {
    month: "Jun 2026",
    openai: 460,
    anthropic: 105,
    deepseek: 75,
    google: 180,
    event: "Anthropic IPO filing",
  },
  {
    month: "Jul 2026",
    openai: 450,
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
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/30">
        <p className="text-xs font-medium text-amber-800 dark:text-amber-200">
          💡 핵심 인사이트
        </p>
        <p className="mt-0.5 text-xs text-amber-700 dark:text-amber-300">
          2026년 2월 OpenAI의 광고 도입은 업계 분수령이었습니다.
          ChatGPT 광고 도입 후 295% 급증한 앱 삭제로 700K+ 유저가 Claude로 이탈했습니다.
        </p>
      </div>

      {/* MAU Line Chart */}
      <div className="rounded-xl border border-border bg-card p-4">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 10%)" />
            <XAxis
              dataKey="month"
              stroke="oklch(0.708 0 0)"
              tick={{ fill: "oklch(0.708 0 0)", fontSize: 12 }}
            />
            <YAxis
              stroke="oklch(0.708 0 0)"
              tick={{ fill: "oklch(0.708 0 0)", fontSize: 12 }}
              tickFormatter={(v: number) => `${v}M`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.205 0 0)",
                border: "1px solid oklch(1 0 0 / 10%)",
                borderRadius: "8px",
                color: "oklch(0.985 0 0)",
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
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/30">
        <p className="text-xs font-medium text-amber-800 dark:text-amber-200">
          💡 핵심 인사이트
        </p>
        <p className="mt-0.5 text-xs text-amber-700 dark:text-amber-300">
          2026년 2월 OpenAI의 광고 도입은 업계 분수령이었습니다.
          ChatGPT 광고 도입 후 295% 급증한 앱 삭제로 700K+ 유저가 Claude로 이탈했습니다.
        </p>
      </div>

      {/* Monthly Ad Spend Bar Chart */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Est. 월간 광고비 추이 (백만$)
        </h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 10%)" />
              <XAxis
                dataKey="month"
                stroke="oklch(0.708 0 0)"
                tick={{ fill: "oklch(0.708 0 0)", fontSize: 12 }}
              />
              <YAxis
                stroke="oklch(0.708 0 0)"
                tick={{ fill: "oklch(0.708 0 0)", fontSize: 12 }}
                tickFormatter={(v: number) => `$${v}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.205 0 0)",
                  border: "1px solid oklch(1 0 0 / 10%)",
                  borderRadius: "8px",
                  color: "oklch(0.985 0 0)",
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
                stroke="oklch(0.704 0.191 22.216)"
                strokeDasharray="6 3"
              >
                <Label
                  value="QuitGPT 이탈 정점"
                  position="insideTopRight"
                  fill="oklch(0.704 0.191 22.216)"
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
