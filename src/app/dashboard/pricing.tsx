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
      {/* Pricing table */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          API Pricing Comparison — July 2026
        </h2>
        <div className="rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Input ($/MTok)</TableHead>
                <TableHead>Output ($/MTok)</TableHead>
                <TableHead>Cached Input</TableHead>
                <TableHead>Context</TableHead>
                <TableHead>Notes</TableHead>
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
                      borderLeft: `3px solid ${companyColors[row.company] ?? "#888"}`,
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
          Output Price Comparison ($/M Tokens)
        </h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 10%)" />
              <XAxis
                type="number"
                stroke="oklch(0.708 0 0)"
                tick={{ fill: "oklch(0.708 0 0)", fontSize: 11 }}
                tickFormatter={(v: number) => `$${v}`}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="oklch(0.708 0 0)"
                tick={{ fill: "oklch(0.708 0 0)", fontSize: 11 }}
                width={110}
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
        Prices verified July 2026. Source: Official API pricing pages.
      </p>
    </div>
  );
}
