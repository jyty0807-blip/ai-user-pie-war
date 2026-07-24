"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CompanyKpi {
  name: string;
  slug: string;
  color: string;
  logo: string;
  estimatedAdSpend: string;
  mau: string;
  yoyGrowth: string;
  yoyColor: string;
  convRate: string;
  cac: string;
  marketShare: string;
  channels: string[];
}

const mockKPIs: CompanyKpi[] = [
  {
    name: "OpenAI",
    slug: "openai",
    color: "#10A37F",
    logo: "🧠",
    estimatedAdSpend: "200M",
    mau: "800M",
    yoyGrowth: "전년비 -25%",
    yoyColor: "#EF4444",
    convRate: "6.2%",
    cac: "$45",
    marketShare: "45%",
    channels: ["Google Ads", "Meta", "Reddit", "X"],
  },
  {
    name: "Anthropic",
    slug: "anthropic",
    color: "#D97757",
    logo: "🔬",
    estimatedAdSpend: "45M",
    mau: "120M",
    yoyGrowth: "전년비 +600%",
    yoyColor: "#22C55E",
    convRate: "46%",
    cac: "$28",
    marketShare: "18%",
    channels: ["Google Ads", "LinkedIn", "Content"],
  },
  {
    name: "DeepSeek",
    slug: "deepseek",
    color: "#4F46E5",
    logo: "🐋",
    estimatedAdSpend: "12M",
    mau: "80M",
    yoyGrowth: "전년비 +700%",
    yoyColor: "#22C55E",
    convRate: "8%",
    cac: "$8",
    marketShare: "7%",
    channels: ["Reddit", "X", "Technical blogs"],
  },
  {
    name: "Google",
    slug: "google-ai",
    color: "#4285F4",
    logo: "🔍",
    estimatedAdSpend: "500M+",
    mau: "200M",
    yoyGrowth: "전년비 +300%",
    yoyColor: "#22C55E",
    convRate: "15%",
    cac: "$12",
    marketShare: "15%",
    channels: ["Display", "Search", "YouTube", "Android"],
  },
];

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {mockKPIs.map((company) => (
        <KpiCard key={company.slug} company={company} />
      ))}
    </div>
  );
}

function KpiCard({ company }: { company: CompanyKpi }) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden",
        "hover:shadow-lg transition-shadow duration-200"
      )}
    >
      {/* Brand color accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-0.5"
        style={{ backgroundColor: company.color }}
      />
      <CardHeader className="pb-1">
        <div className="flex items-center gap-2.5">
          <span className="text-xl" aria-hidden="true">
            {company.logo}
          </span>
          <CardTitle className="text-sm font-semibold">{company.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3.5">
        {/* Primary metric — MAU */}
        <div>
          <p className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
            월간 활성 유저 (WAU)
          </p>
          <p className="mt-1 text-lg font-bold tabular-nums text-foreground">
            {company.mau}
          </p>
          <p
            className="mt-0.5 text-xs font-semibold"
            style={{ color: company.yoyColor }}
          >
            {company.yoyGrowth}
          </p>
        </div>

        {/* Secondary metrics grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
          <Metric label="유료 전환율" value={company.convRate} />
          <Metric label="시장 점유율" value={company.marketShare} />
          <Metric label="월간 광고비 (추정)" value={`$${company.estimatedAdSpend}`} />
          <Metric label="고객 획득 비용" value={company.cac} />
        </div>

        {/* Channels */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {company.channels.map((ch) => (
            <Badge key={ch} variant="outline">
              {ch}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.65rem] font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">{value}</p>
    </div>
  );
}
