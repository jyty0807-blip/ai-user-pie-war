"use client";

import { ExternalLink, Info, Calendar, Newspaper, Paperclip, Pin } from "lucide-react";
import { OpenAILogo, AnthropicLogo, DeepSeekLogo, GoogleAILogo } from "@/components/company-logos";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { EvidenceTooltip, SECTION_EVIDENCE } from "@/components/evidence-tooltip";

interface NewsItem {
  date: string;
  title: string;
  titleKo: string;
  source: string;
  url: string;
  snippet: string;
  category: "product" | "pricing" | "business" | "update";
  lastChecked: string;
}

type NewsData = Record<string, NewsItem[]>;

const newsItems: NewsData = {
  openai: [
    {
      date: "2026-07-19",
      title: "GPT-5.6 Luna Now Available — Cheapest GPT Tier Yet",
      titleKo: "GPT-5.6 Luna 출시 — 가장 저렴한 GPT 티어",
      source: "OpenAI Blog",
      url: "https://openai.com/blog",
      snippet:
        "OpenAI launches GPT-5.6 Luna at $1/$6 per MTok, the most cost-effective model in the GPT-5 family. Targets high-volume production workloads.",
      category: "product",
      lastChecked: "2026-07-25 09:00 KST",
    },
    {
      date: "2026-07-15",
      title: "ChatGPT Ads Now Support Conversion Tracking",
      titleKo: "ChatGPT 광고 전환 추적 도입",
      source: "OpenAI Blog",
      url: "https://openai.com/blog",
      snippet:
        "New Conversions API and Pixel support enable advertisers to optimize for sales and sign-ups. CPA bidding on roadmap.",
      category: "product",
      lastChecked: "2026-07-25 09:00 KST",
    },
    {
      date: "2026-07-01",
      title: "OpenAI Reports 700M Weekly Active Users",
      titleKo: "OpenAI 주간 활성 사용자 7억 명 돌파",
      source: "OpenAI Blog",
      url: "https://openai.com/blog",
      snippet:
        "Despite QuitGPT movement, ChatGPT maintains 700M+ WAUs. Free tier ad revenue crosses $100M annualized.",
      category: "business",
      lastChecked: "2026-07-25 09:00 KST",
    },
  ],
  anthropic: [
    {
      date: "2026-07-20",
      title: "Claude Sonnet 5 Pricing Extended Through August",
      titleKo: "Claude Sonnet 5 할인 가격 8월까지 연장",
      source: "Anthropic Blog",
      url: "https://anthropic.com/blog",
      snippet:
        "Anthropic extends intro pricing on Sonnet 5 ($2/$10) through August 31. Sonnet 5 now the cheapest Claude model above Haiku.",
      category: "pricing",
      lastChecked: "2026-07-25 09:00 KST",
    },
    {
      date: "2026-07-15",
      title: "MCP Reaches 97M+ Installs — Open Standard for AI Tools",
      titleKo: "MCP 9,700만 설치 돌파 — AI 도구 오픈 표준",
      source: "Anthropic Blog",
      url: "https://anthropic.com/blog",
      snippet:
        "Anthropic's open Model Context Protocol reaches nearly 100M installs, creating a defensible ecosystem moat against closed architectures.",
      category: "product",
      lastChecked: "2026-07-25 09:00 KST",
    },
    {
      date: "2026-06-28",
      title: "Anthropic Files for IPO — $965B Valuation",
      titleKo: "Anthropic IPO 신청 — 기업 가치 $9,650억 달러",
      source: "Anthropic Blog",
      url: "https://anthropic.com/blog",
      snippet:
        "Confidential IPO filing positions Anthropic as the most valuable private AI company. Revenue reached $30B ARR in April.",
      category: "business",
      lastChecked: "2026-07-25 09:00 KST",
    },
  ],
  deepseek: [
    {
      date: "2026-07-18",
      title: "DeepSeek V4 Flash Now Supports 1M Token Context",
      titleKo: "DeepSeek V4 Flash 1M 토큰 컨텍스트 지원",
      source: "DeepSeek",
      url: "https://api-docs.deepseek.com",
      snippet:
        "V4 Flash extends context window to 1M tokens while maintaining $0.14/$0.28 pricing. Cache hits drop to $0.003/MTok.",
      category: "product",
      lastChecked: "2026-07-25 09:00 KST",
    },
    {
      date: "2026-07-10",
      title: "Legacy Model Names Retired — Migrate to V4 by July 24",
      titleKo: "구 모델명 폐지 — 7월 24일까지 V4로 이전 필요",
      source: "DeepSeek",
      url: "https://api-docs.deepseek.com",
      snippet:
        "deepseek-chat and deepseek-reasoner deprecated. All users must migrate to deepseek-v4-flash or deepseek-v4-pro.",
      category: "update",
      lastChecked: "2026-07-25 09:00 KST",
    },
    {
      date: "2026-06-15",
      title: "DeepSeek V4 Runs on Huawei Ascend Chips",
      titleKo: "DeepSeek V4 화웨이 Ascend 칩에서 구동",
      source: "DeepSeek",
      url: "https://api-docs.deepseek.com",
      snippet:
        "All V4 inference runs on domestically produced Huawei Ascend hardware at a fraction of Western cloud costs.",
      category: "business",
      lastChecked: "2026-07-25 09:00 KST",
    },
  ],
  google: [
    {
      date: "2026-07-20",
      title: "Google Marketing Live: AI Mode Ads Go Live",
      titleKo: "Google Marketing Live: AI 모드 광고 출시",
      source: "Google AI Blog",
      url: "https://blog.google/technology/ai/",
      snippet:
        "Gemini-built Conversational Discovery and Highlighted Answer formats inside AI Mode. 75% of users make faster decisions.",
      category: "product",
      lastChecked: "2026-07-25 09:00 KST",
    },
    {
      date: "2026-07-01",
      title: "Gemini 3.5 Flash Now Default — Beats GPT-5.6 Terra on Speed",
      titleKo: "Gemini 3.5 Flash 기본 모델 승격 — GPT-5.6 Terra 속도 추월",
      source: "Google AI Blog",
      url: "https://blog.google/technology/ai/",
      snippet:
        "Gemini 3.5 Flash at $1.50/$9 becomes Google's default recommendation for production workloads. 1M context.",
      category: "product",
      lastChecked: "2026-07-25 09:00 KST",
    },
    {
      date: "2026-06-20",
      title: "Android AI Features Reach 2B Devices",
      titleKo: "Android AI 기능 20억 기기 도달",
      source: "Google AI Blog",
      url: "https://blog.google/technology/ai/",
      snippet:
        "Google embeds Gemini into Android system layer, reaching 2 billion active devices. Distribution moat widens.",
      category: "business",
      lastChecked: "2026-07-25 09:00 KST",
    },
  ],
};

const companies = [
  { slug: "openai", name: "OpenAI", logo: <OpenAILogo className="h-6 w-6" />, color: "#10A37F", description: "ChatGPT · GPT-5 · 광고 수익화" },
  { slug: "anthropic", name: "Anthropic", logo: <AnthropicLogo className="h-6 w-6" />, color: "#D97757", description: "Claude · MCP · IPO 준비" },
  { slug: "deepseek", name: "DeepSeek", logo: <DeepSeekLogo className="h-6 w-6" />, color: "#4F46E5", description: "V4 Flash · 화웨이 · 오픈소스" },
  { slug: "google", name: "Google", logo: <GoogleAILogo className="h-6 w-6" />, color: "#4285F4", description: "Gemini · Android · AI Mode" },
];

function companyLabel(slug: string): string {
  const labels: Record<string, string> = {
    openai: "OpenAI",
    anthropic: "Anthropic",
    deepseek: "DeepSeek",
    google: "Google",
  };
  return labels[slug] || slug;
}

function categoryLabel(cat: string): string {
  const labels: Record<string, string> = {
    product: "제품",
    pricing: "가격",
    business: "비즈니스",
    update: "업데이트",
  };
  return labels[cat] || cat;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="mb-6">
        <div className="flex items-center gap-1">
          <h1 className="inline-flex rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]">
            AI 업계 뉴스 · 업데이트
          </h1>
          <EvidenceTooltip section="AI 업계 뉴스" sources={SECTION_EVIDENCE.news.sources} methodology={SECTION_EVIDENCE.news.methodology} className="-mb-0.5" />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          각사 공식 블로그 — snippet만 제공, 전체 내용은 원문 링크
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 inline -mt-0.5" /> 매일 오전 9시 (KST) 업데이트
        </p>
      </div>

      {/* SECTION 1: 종합 의견 (Summary + Accordion Links) */}
      <div className="mb-6 rounded-sm border border-sky-300/20 bg-sky-50/80 p-5 dark:border-sky-800/20 dark:bg-sky-950/20">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]">
          <Newspaper className="h-3.5 w-3.5" />이번 주 AI 업계 종합
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-sky-700 dark:text-sky-300">
          <li><strong>유저 파이 재편:</strong> OpenAI 800M→580M, Anthropic 20M→120M — 6개월 만에 6배 격차 해소</li>
          <li><strong>가격이 유저를 움직인다:</strong> DeepSeek V4 Flash $0.28/MTok으로 가격 민감 유저 흡수, 80M까지 성장</li>
          <li><strong>생태계 락인:</strong> Google 200M 유저는 안드로이드 기본 탑재 효과 — AI가 번들의 일부가 되어야 한다</li>
          <li><strong>신뢰 프리미엄:</strong> 광고 없는 Claude의 유료 전환율 46% — 유저는 데이터 프라이버시에 돈을 낸다</li>
        </ul>

        {/* Accordion Links — collapsible */}
        <Accordion className="mt-4">
          <AccordionItem value="links" className="border-none">
            <AccordionTrigger className="py-2 text-xs font-medium text-sky-700 hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-200 hover:no-underline">
              <span className="inline-flex items-center gap-1">
                <Paperclip className="h-3 w-3" /> 전체 뉴스 링크 보기 ({Object.values(newsItems).flat().length}개)
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-2 space-y-1">
                {Object.entries(newsItems).map(([slug, items]) => (
                  <div key={slug}>
                    <p className="mt-2 text-xs font-semibold text-foreground first:mt-0">
                      {companyLabel(slug)}
                    </p>
                    {items.map((item, i) => (
                      <a
                        key={i}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 py-0.5 pl-3 text-xs text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-200"
                      >
                        <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                        <span>{item.titleKo}</span>
                        <span className="text-[0.6rem] text-muted-foreground">({item.title})</span>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* SECTION 2: 4사 Rounded Rectangle Navigation Cards */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {companies.map((company) => (
          <a
            key={company.slug}
            href={`#section-${company.slug}`}
            className={cn(
              "flex flex-col items-center gap-2 rounded-full border p-4 text-center transition-all duration-200",
              "hover:shadow-none",
            )}
            style={{
              borderColor: company.color + "30",
              backgroundColor: company.color + "08",
            }}
          >
            {company.logo}
            <span className="text-sm font-semibold text-foreground">
              {company.name}
            </span>
            <span className="text-[0.65rem] text-muted-foreground">
              뉴스 {newsItems[company.slug]?.length || 0}개
            </span>
          </a>
        ))}
      </div>

      {/* SECTION 3: Company News Sections */}
      <div className="space-y-8">
        {companies.map((company) => (
          <div key={company.slug} id={`section-${company.slug}`}>
            {/* Company Section Header */}
            <div
              className={cn("mb-4 flex items-center gap-3 border-b pb-2")}
              style={{ borderBottomColor: company.color }}
            >
              <span className="text-xl">{company.logo}</span>
              <div>
                <h2 className="inline-flex rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]">
                  {company.name}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {company.description}
                </p>
              </div>
            </div>

            {/* News Items */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {newsItems[company.slug]?.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <Card className="h-full rounded-sm transition-all duration-200">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className="px-1.5 py-0 text-[0.6rem]"
                        >
                          {categoryLabel(item.category)}
                        </Badge>
                        <span className="text-[0.6rem] text-muted-foreground">
                          {formatDate(item.date)}
                        </span>
                      </div>
                      <CardTitle className="mt-1.5 text-sm font-medium leading-snug group-hover:underline">
                        {item.titleKo}
                      </CardTitle>
                      <CardDescription className="text-[0.65rem] text-muted-foreground">
                        {item.title}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {item.snippet}
                      </p>
                      <div className="mt-2 flex items-center gap-1 text-[0.6rem] text-muted-foreground">
                        <ExternalLink className="h-2.5 w-2.5" />
                        {item.source}
                        <span className="mx-1 opacity-30">·</span>
                        <span>마지막 확인: {item.lastChecked}</span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Source Notice */}
      <div className="mt-8 rounded-sm bg-muted p-3 text-center">
        <p className="flex items-center justify-center gap-1 text-[0.65rem] text-muted-foreground">
          <Pin className="h-3 w-3" /> 출처: 각사 공식 블로그. 저작권을 존중하여 snippet과 링크만 제공합니다.
        </p>
      </div>
    </div>
  );
}
