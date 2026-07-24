"use client";

import { useState, useMemo } from "react";
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
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react";
import { MetricTooltip, METRIC_DEFINITIONS } from "@/components/metric-tooltip";

interface CompanyRow {
  name: string;
  slug: string;
  color: string;
  logo: string;
  estimatedAdSpend: string;
  mau: string;
  convRate: string;
  cac: string;
  marketShare: string;
  channels: string[];
  trend: "up" | "down" | "stable";
}

const comparisonData: CompanyRow[] = [
  {
    name: "OpenAI",
    slug: "openai",
    color: "#10A37F",
    logo: "🧠",
    estimatedAdSpend: "200M",
    mau: "800M",
    convRate: "6.2%",
    cac: "$45",
    marketShare: "45%",
    channels: ["Google Ads", "Meta", "Reddit", "X"],
    trend: "down",
  },
  {
    name: "Anthropic",
    slug: "anthropic",
    color: "#D97757",
    logo: "🔬",
    estimatedAdSpend: "45M",
    mau: "120M",
    convRate: "46%",
    cac: "$28",
    marketShare: "18%",
    channels: ["Google Ads", "LinkedIn", "Content"],
    trend: "up",
  },
  {
    name: "DeepSeek",
    slug: "deepseek",
    color: "#4F46E5",
    logo: "🐋",
    estimatedAdSpend: "12M",
    mau: "80M",
    convRate: "8%",
    cac: "$8",
    marketShare: "7%",
    channels: ["Reddit", "X", "Technical blogs"],
    trend: "up",
  },
  {
    name: "Google",
    slug: "google-ai",
    color: "#4285F4",
    logo: "🔍",
    estimatedAdSpend: "500M+",
    mau: "200M",
    convRate: "15%",
    cac: "$12",
    marketShare: "15%",
    channels: ["Display", "Search", "YouTube", "Android"],
    trend: "up",
  },
];

type SortKey = keyof CompanyRow;

const numericSortKeys: SortKey[] = [
  "mau",
  "marketShare",
  "convRate",
  "cac",
  "estimatedAdSpend",
];

function parseNumeric(val: string): number {
  const cleaned = val.replace(/[%$+]/g, "");
  const num = parseFloat(cleaned);
  return Number.isNaN(num) ? 0 : num;
}

const columnDefs: { key: SortKey; label: string; tooltipTerm?: string; tooltipDef?: string }[] = [
  { key: "name", label: "기업" },
  { key: "mau", label: "활성 유저", tooltipTerm: "MAU", tooltipDef: METRIC_DEFINITIONS.MAU },
  { key: "marketShare", label: "시장점유율", tooltipTerm: "시장 점유율", tooltipDef: METRIC_DEFINITIONS["시장 점유율"] },
  { key: "convRate", label: "전환율", tooltipTerm: "전환율", tooltipDef: METRIC_DEFINITIONS.전환율 },
  { key: "cac", label: "고객 획득비용", tooltipTerm: "CAC", tooltipDef: METRIC_DEFINITIONS.CAC },
  { key: "estimatedAdSpend", label: "광고비", tooltipTerm: "광고 채널", tooltipDef: METRIC_DEFINITIONS["광고 채널"] },
];

export function Comparison() {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = useMemo(() => {
    const dir = sortDir === "asc" ? 1 : -1;
    const k = sortKey;
    return [...comparisonData].sort((a, b) => {
      if (k === "name") {
        return dir * a.name.localeCompare(b.name);
      }
      return dir * (parseNumeric(String(a[k])) - parseNumeric(String(b[k])));
    });
  }, [sortKey, sortDir]);

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        4사 비교 — 정렬 가능 비교표
      </h2>

      {/* 한눈에 비교 인사이트 */}
      <div className="rounded-sm border border-blue-300/20 bg-blue-50/80 p-5 dark:border-blue-800/20 dark:bg-blue-950/20 mb-6">
        <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
          💡 한눈에 비교
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-blue-700 dark:text-blue-300">
          <li><strong>OpenAI:</strong> 유저 800M로 압도적 1위지만, 전년비 -25% 감소 중 — 광고 도입 후 이탈 가속화</li>
          <li><strong>Anthropic:</strong> 120M으로 3위지만 성장률 +600% & 전환율 46% — 유저 질(quality) 1위</li>
          <li><strong>DeepSeek:</strong> 80M 유저, CAC $8로 가장 효율적 — 가격이 유저 획득의 무기</li>
          <li><strong>Google:</strong> 200M 유저, 안드로이드 번들이라는 독보적 배포망 보유</li>
        </ul>
      </div>
      <div className="rounded-sm border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              {columnDefs.map((col) => (
                <TableHead
                  key={col.key}
                  className="cursor-pointer select-none hover:text-foreground"
                  onClick={() => handleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.tooltipTerm && col.tooltipDef && (
                      <MetricTooltip term={col.tooltipTerm} definition={col.tooltipDef} />
                    )}
                    {sortKey === col.key && (
                      <span className="text-xs">
                        {sortDir === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </span>
                </TableHead>
              ))}
              <TableHead>주요 채널</TableHead>
              <TableHead>추세</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((row) => (
              <TableRow
                key={row.slug}
                className={cn("group")}
                style={{ borderLeft: `1px solid ${row.color}` }}
              >
                <TableCell className="font-medium">
                  <span className="inline-flex items-center gap-2">
                    <span className="text-lg" aria-hidden="true">
                      {row.logo}
                    </span>
                    {row.name}
                  </span>
                </TableCell>
                <TableCell>{row.mau}</TableCell>
                <TableCell>{row.marketShare}</TableCell>
                <TableCell>{row.convRate}</TableCell>
                <TableCell>{row.cac}</TableCell>
                <TableCell>${row.estimatedAdSpend}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {row.channels.map((ch) => (
                      <Badge key={ch} variant="outline">
                        {ch}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <TrendIcon trend={row.trend} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function TrendIcon({ trend }: { trend: "up" | "down" | "stable" }) {
  if (trend === "up") {
    return <ArrowUpIcon className="size-4 text-green-500" />;
  }
  if (trend === "down") {
    return <ArrowDownIcon className="size-4 text-red-500" />;
  }
  return <MinusIcon className="size-4 text-muted-foreground" />;
}
