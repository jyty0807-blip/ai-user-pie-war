"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MetricTooltip, METRIC_DEFINITIONS } from "@/components/metric-tooltip";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

interface PricingRow {
  company: string;
  model: string;
  inputPrice: string;
  outputPrice: string;
  cached: string;
  context: string;
  note: string;
}

const pricingData: PricingRow[] = [
  {
    company: "OpenAI",
    model: "GPT-5.6 Sol",
    inputPrice: "$5.00",
    outputPrice: "$30.00",
    cached: "$0.50",
    context: "1M",
    note: "Flagship reasoning",
  },
  {
    company: "OpenAI",
    model: "GPT-5.6 Terra",
    inputPrice: "$2.50",
    outputPrice: "$15.00",
    cached: "$0.25",
    context: "1M",
    note: "Mid-tier workhorse",
  },
  {
    company: "OpenAI",
    model: "GPT-5.6 Luna",
    inputPrice: "$1.00",
    outputPrice: "$6.00",
    cached: "$0.10",
    context: "1M",
    note: "Cost-optimized NEW",
  },
  {
    company: "Anthropic",
    model: "Claude Fable 5",
    inputPrice: "$10.00",
    outputPrice: "$50.00",
    cached: "$1.00",
    context: "1M",
    note: "Frontier class",
  },
  {
    company: "Anthropic",
    model: "Claude Opus 4.8",
    inputPrice: "$5.00",
    outputPrice: "$25.00",
    cached: "$0.50",
    context: "1M",
    note: "Best agent reliability",
  },
  {
    company: "Anthropic",
    model: "Claude Sonnet 5",
    inputPrice: "$3.00 → $2.00*",
    outputPrice: "$15.00 → $10.00*",
    cached: "$0.30 → $0.20*",
    context: "1M",
    note: "*Promo until Aug 31",
  },
  {
    company: "Anthropic",
    model: "Claude Haiku 4.5",
    inputPrice: "$1.00",
    outputPrice: "$5.00",
    cached: "$0.10",
    context: "200K",
    note: "Cheapest US-lab",
  },
  {
    company: "Google",
    model: "Gemini 3.1 Pro",
    inputPrice: "$2.00",
    outputPrice: "$12.00",
    cached: "$0.20",
    context: "1M",
    note: "Tiers at 200K",
  },
  {
    company: "Google",
    model: "Gemini 3.5 Flash",
    inputPrice: "$1.50",
    outputPrice: "$9.00",
    cached: "$0.15",
    context: "1M",
    note: "Default recommendation",
  },
  {
    company: "DeepSeek",
    model: "V4 Flash",
    inputPrice: "$0.14",
    outputPrice: "$0.28",
    cached: "$0.003",
    context: "1M",
    note: "Cheapest frontier! ⚡",
  },
  {
    company: "DeepSeek",
    model: "V4 Pro",
    inputPrice: "$0.44",
    outputPrice: "$0.87",
    cached: "$0.004",
    context: "1M",
    note: "Hard reasoning at fraction",
  },
];

const companyColors: Record<string, string> = {
  OpenAI: "#10A37F",
  Anthropic: "#D97757",
  Google: "#4285F4",
  DeepSeek: "#4F46E5",
};

function parsePrice(val: string): number {
  // Extract the first price number (handle "→" arrow cases)
  const first = val.split("→")[0] ?? val;
  const cleaned = first.replace(/[$,*]/g, "");
  return parseFloat(cleaned) || 0;
}

export function Pricing() {
  // Prepare bar chart data — output prices by model
  const chartData = pricingData.map((row) => ({
    name: row.model,
    company: row.company,
    outputPrice: parsePrice(row.outputPrice),
    color: companyColors[row.company] ?? "#888",
  }));

  return (
    <div className="space-y-8">
      {/* 가격 전쟁 핵심 인사이트 */}
      <div className="rounded-sm border border-green-300/20 bg-green-50/80 p-5 dark:border-green-800/20 dark:bg-green-950/20 mb-6">
        <p className="text-sm font-semibold text-green-800 dark:text-green-200">
          💰 가격 전쟁 핵심
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-green-700 dark:text-green-300">
          <li><strong>DeepSeek V4 Flash</strong> $0.28/MTok vs <strong>Claude Fable 5</strong> $50/MTok — 178배 차이가 유저 획득 전략 차이로 이어짐</li>
          <li>저가 모델 = <strong>볼륨 유저 유치</strong>, 고가 모델 = <strong>충성 유저 확보</strong> — 가격 전략이 유저 세그먼트를 결정</li>
          <li><strong>Sonnet 5 프로모션($2/$10)</strong>은 유료 전환율 46%의 Anthropic이 더 많은 유저를 파이프라인 상단으로 끌어들이기 위한 전략</li>
          <li>AI 가격 전쟁의 승자는 <strong>가장 싼 모델이 아니라, 가장 많은 유저를 유치한 모델</strong></li>
        </ul>
      </div>

      {/* Pricing table */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          AI 모델 가격 전쟁 (2026년 7월)
          <MetricTooltip term="MTok" definition={METRIC_DEFINITIONS.MTok} />
        </h2>
        <div className="rounded-sm border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>기업</TableHead>
                <TableHead>모델</TableHead>
                <TableHead>입력($/MTok)</TableHead>
                <TableHead>출력($/MTok)</TableHead>
                <TableHead>캐싱 할인</TableHead>
                <TableHead>컨텍스트</TableHead>
                <TableHead>비고</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingData.map((row) => {
                const isCheapest =
                  row.model === "V4 Flash";
                const hasPriceChange = row.inputPrice.includes("→");
                return (
                  <TableRow
                    key={row.model}
                    className={cn(
                      isCheapest && "bg-emerald-500/5"
                    )}
                    style={{
                      borderLeft: `1px solid ${companyColors[row.company] ?? "#888"}`,
                    }}
                  >
                    <TableCell className="font-medium">
                      <Badge
                        variant="outline"
                        style={{
                          borderColor: companyColors[row.company],
                          color: companyColors[row.company],
                        }}
                      >
                        {row.company}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {row.model}
                    </TableCell>
                    <TableCell
                      className={cn(
                        hasPriceChange && "text-emerald-400"
                      )}
                    >
                      {row.inputPrice}
                    </TableCell>
                    <TableCell
                      className={cn(
                        isCheapest && "font-bold text-emerald-400",
                        hasPriceChange && "text-emerald-400"
                      )}
                    >
                      {row.outputPrice}
                    </TableCell>
                    <TableCell
                      className={cn(
                        hasPriceChange && "text-emerald-400"
                      )}
                    >
                      {row.cached}
                    </TableCell>
                    <TableCell>{row.context}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {row.note}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Output price comparison bar chart */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          출력 토큰 가격 비교 (낮을수록 좋음)
        </h2>
        <div className="rounded-sm border border-border bg-card p-4">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                type="number"
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                tickFormatter={(v: number) => `$${v}`}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                width={110}
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
              <Bar dataKey="outputPrice" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Source note */}
      <p className="text-xs text-muted-foreground">
        2026년 7월 기준. 출처: 각사 공식 가격 페이지
      </p>
    </div>
  );
}
