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
  "estimatedAdSpend",
  "mau",
  "convRate",
  "cac",
  "marketShare",
];

function parseNumeric(val: string): number {
  const cleaned = val.replace(/[%$+]/g, "");
  const num = parseFloat(cleaned);
  return Number.isNaN(num) ? 0 : num;
}

const columnDefs: { key: SortKey; label: string }[] = [
  { key: "name", label: "Company" },
  { key: "estimatedAdSpend", label: "Ad Spend" },
  { key: "mau", label: "MAU" },
  { key: "convRate", label: "Conv Rate" },
  { key: "cac", label: "CAC" },
  { key: "marketShare", label: "Market Share" },
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
        4사 비교 — Sortable Comparison
      </h2>
      <div className="rounded-xl border border-border">
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
                    {sortKey === col.key && (
                      <span className="text-xs">
                        {sortDir === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </span>
                </TableHead>
              ))}
              <TableHead>Top Channels</TableHead>
              <TableHead>Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((row) => (
              <TableRow
                key={row.slug}
                className={cn("group")}
                style={{ borderLeft: `3px solid ${row.color}` }}
              >
                <TableCell className="font-medium">
                  <span className="inline-flex items-center gap-2">
                    <span className="text-lg" aria-hidden="true">
                      {row.logo}
                    </span>
                    {row.name}
                  </span>
                </TableCell>
                <TableCell>${row.estimatedAdSpend}</TableCell>
                <TableCell>{row.mau}</TableCell>
                <TableCell>{row.convRate}</TableCell>
                <TableCell>{row.cac}</TableCell>
                <TableCell>{row.marketShare}</TableCell>
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
