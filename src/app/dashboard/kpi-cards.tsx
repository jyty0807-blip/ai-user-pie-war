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
        "relative overflow-hidden border-l-[3px]",
        "hover:shadow-md transition-shadow duration-200"
      )}
      style={{ borderLeftColor: company.color }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            {company.logo}
          </span>
          <CardTitle className="text-sm font-semibold">{company.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Primary metric */}
        <div>
          <p className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
            Est. Monthly Ad Spend
          </p>
          <p className="text-lg font-bold text-foreground">
            ${company.estimatedAdSpend}
          </p>
        </div>

        {/* Secondary metrics grid */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
          <Metric label="MAU" value={company.mau} />
          <Metric label="Conv Rate" value={company.convRate} />
          <Metric label="Est. CAC" value={company.cac} />
          <Metric label="Market Share" value={company.marketShare} />
        </div>

        {/* Channels */}
        <div className="flex flex-wrap gap-1 pt-1">
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
      <p className="text-[0.65rem] text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
