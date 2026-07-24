"use client";

import { ExternalLink, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface NewsItem {
  date: string;
  title: string;
  source: string;
  url: string;
  snippet: string;
  category: "product" | "pricing" | "business" | "update";
}

type NewsData = Record<string, NewsItem[]>;

const newsItems: NewsData = {
  openai: [
    {
      date: "2026-07-19",
      title: "GPT-5.6 Luna Now Available — Cheapest GPT Tier Yet",
      source: "OpenAI Blog",
      url: "https://openai.com/blog",
      snippet:
        "OpenAI launches GPT-5.6 Luna at $1/$6 per MTok, the most cost-effective model in the GPT-5 family. Targets high-volume production workloads.",
      category: "product",
    },
    {
      date: "2026-07-15",
      title: "ChatGPT Ads Now Support Conversion Tracking",
      source: "OpenAI Blog",
      url: "https://openai.com/blog",
      snippet:
        "New Conversions API and Pixel support enable advertisers to optimize for sales and sign-ups. CPA bidding on roadmap.",
      category: "product",
    },
    {
      date: "2026-07-01",
      title: "OpenAI Reports 700M Weekly Active Users",
      source: "OpenAI Blog",
      url: "https://openai.com/blog",
      snippet:
        "Despite QuitGPT movement, ChatGPT maintains 700M+ WAUs. Free tier ad revenue crosses $100M annualized.",
      category: "business",
    },
  ],
  anthropic: [
    {
      date: "2026-07-20",
      title: "Claude Sonnet 5 Pricing Extended Through August",
      source: "Anthropic Blog",
      url: "https://anthropic.com/blog",
      snippet:
        "Anthropic extends intro pricing on Sonnet 5 ($2/$10) through August 31. Sonnet 5 now the cheapest Claude model above Haiku.",
      category: "pricing",
    },
    {
      date: "2026-07-15",
      title: "MCP Reaches 97M+ Installs — Open Standard for AI Tools",
      source: "Anthropic Blog",
      url: "https://anthropic.com/blog",
      snippet:
        "Anthropic's open Model Context Protocol reaches nearly 100M installs, creating a defensible ecosystem moat against closed architectures.",
      category: "product",
    },
    {
      date: "2026-06-28",
      title: "Anthropic Files for IPO — $965B Valuation",
      source: "Anthropic Blog",
      url: "https://anthropic.com/blog",
      snippet:
        "Confidential IPO filing positions Anthropic as the most valuable private AI company. Revenue reached $30B ARR in April.",
      category: "business",
    },
  ],
  deepseek: [
    {
      date: "2026-07-18",
      title: "DeepSeek V4 Flash Now Supports 1M Token Context",
      source: "DeepSeek",
      url: "https://api-docs.deepseek.com",
      snippet:
        "V4 Flash extends context window to 1M tokens while maintaining $0.14/$0.28 pricing. Cache hits drop to $0.003/MTok.",
      category: "product",
    },
    {
      date: "2026-07-10",
      title: "Legacy Model Names Retired — Migrate to V4 by July 24",
      source: "DeepSeek",
      url: "https://api-docs.deepseek.com",
      snippet:
        "deepseek-chat and deepseek-reasoner deprecated. All users must migrate to deepseek-v4-flash or deepseek-v4-pro.",
      category: "update",
    },
    {
      date: "2026-06-15",
      title: "DeepSeek V4 Runs on Huawei Ascend Chips",
      source: "DeepSeek",
      url: "https://api-docs.deepseek.com",
      snippet:
        "All V4 inference runs on domestically produced Huawei Ascend hardware at a fraction of Western cloud costs.",
      category: "business",
    },
  ],
  google: [
    {
      date: "2026-07-20",
      title: "Google Marketing Live: AI Mode Ads Go Live",
      source: "Google AI Blog",
      url: "https://blog.google/technology/ai/",
      snippet:
        "Gemini-built Conversational Discovery and Highlighted Answer formats inside AI Mode. 75% of users make faster decisions.",
      category: "product",
    },
    {
      date: "2026-07-01",
      title: "Gemini 3.5 Flash Now Default — Beats GPT-5.6 Terra on Speed",
      source: "Google AI Blog",
      url: "https://blog.google/technology/ai/",
      snippet:
        "Gemini 3.5 Flash at $1.50/$9 becomes Google's default recommendation for production workloads. 1M context.",
      category: "product",
    },
    {
      date: "2026-06-20",
      title: "Android AI Features Reach 2B Devices",
      source: "Google AI Blog",
      url: "https://blog.google/technology/ai/",
      snippet:
        "Google embeds Gemini into Android system layer, reaching 2 billion active devices. Distribution moat widens.",
      category: "business",
    },
  ],
};

const companies = [
  { key: "openai", label: "OpenAI", color: "#10A37F" },
  { key: "anthropic", label: "Anthropic", color: "#D97757" },
  { key: "deepseek", label: "DeepSeek", color: "#3B82F6" },
  { key: "google", label: "Google", color: "#8B5CF6" },
] as const;

type CategoryStyle = {
  label: string;
  className: string;
};

const categoryStyles: Record<string, CategoryStyle> = {
  product: { label: "제품", className: "bg-[#10A37F]/10 text-[#10A37F]" },
  pricing: { label: "가격", className: "bg-yellow-500/10 text-yellow-500" },
  business: {
    label: "비즈니스",
    className: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
  },
  update: { label: "업데이트", className: "bg-amber-500/10 text-amber-500" },
};

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date("2026-07-25");
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function NewsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          AI 업계 뉴스 · 업데이트
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          각사 공식 블로그에서 수집한 최신 소식 (전문 링크, snippet만 표시)
        </p>
      </div>

      <Separator />

      {/* 한줄요약 */}
      <div className="rounded-lg border border-sky-200 bg-sky-50 p-4 dark:border-sky-800 dark:bg-sky-950/30 mb-6">
        <p className="text-sm font-medium text-sky-800 dark:text-sky-200">📰 요즘 AI 업계 소식</p>
        <p className="mt-1 text-sm text-sky-700 dark:text-sky-300">
          OpenAI는 GPT-5.6 Luna($1/$6)로 가격 장벽을 낮추고, Anthropic은 IPO를 준비하며 가치 $965B 인정.
          DeepSeek은 1/8 가격으로 서방을 압박하고, Google은 20억 안드로이드 기기에 AI를 심고 있습니다.
          각 사의 공식 발표만 모았습니다. (자세한 내용은 원문 링크 참조)
        </p>
      </div>

      {/* Source notice */}
      <Card size="sm">
        <CardContent className="flex items-center gap-2 py-3">
          <Info className="size-4 shrink-0 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            📌 출처: 각사 공식 블로그. 저작권을 존중하여 snippet과 링크만 제공합니다.
          </p>
        </CardContent>
      </Card>

      {/* Company Tabs */}
      <Tabs defaultValue="openai">
        <TabsList className="mb-6">
          {companies.map((company) => (
            <TabsTrigger key={company.key} value={company.key}>
              {company.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {companies.map((company) => (
          <TabsContent key={company.key} value={company.key}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {newsItems[company.key].map((item, idx) => (
                <Card key={`${company.key}-${idx}`} size="sm">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeDate(item.date)}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "border-transparent font-medium",
                          categoryStyles[item.category]?.className
                        )}
                      >
                        {categoryStyles[item.category]?.label ??
                          item.category}
                      </Badge>
                    </div>
                    <CardTitle className="mt-1 text-sm leading-snug">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 transition-colors hover:text-primary hover:underline"
                      >
                        {item.title}
                        <ExternalLink className="size-3 shrink-0" />
                      </a>
                    </CardTitle>
                    <CardDescription>{item.snippet}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="text-[10px]">
                      출처: {item.source}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
