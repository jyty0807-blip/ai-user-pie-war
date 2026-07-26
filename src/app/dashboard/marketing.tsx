"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getBrandColor } from "@/data/brand";
import {
  OpenAILogo,
  AnthropicLogo,
  DeepSeekLogo,
  GoogleAILogo,
} from "@/components/company-logos";
import { Rocket, Target, Zap, Globe, Gift, GraduationCap, Building2, Megaphone, DollarSign, Percent, BarChart3, Lightbulb } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────

interface PromoEntry {
  company: string;
  slug: string;
  items: { label: string; value: string }[];
}

const promoData: PromoEntry[] = [
  {
    company: "OpenAI",
    slug: "openai",
    items: [
      { label: "무료 티어", value: "GPT-5.5 무료 + 광고 (Feb 2026 도입), 900M+ WAU" },
      { label: "Go 요금제", value: "ChatGPT Go $8/월 — 저가형, 광고 포함, 인도/신흥시장" },
      { label: "Plus 요금제", value: "ChatGPT Plus $20/월 — GPT-5.5, Codex, Sora" },
      { label: "Pro 요금제", value: "ChatGPT Pro $100~200/월 — 5x~20x 사용량" },
      { label: "팀/Business", value: "Business $20~25/인/월 — 관리콘솔, SSO" },
      { label: "엔터프라이즈", value: "Custom (~$60/인/월) — HIPAA, 150석 최소" },
      { label: "비영리 할인", value: "Goodstack 파트너십 — 최대 75% 할인" },
    ],
  },
  {
    company: "Anthropic",
    slug: "anthropic",
    items: [
      { label: "무료 티어", value: "Sonnet 무료 (일일 제한), Claude Code 미포함" },
      { label: "Pro 요금제", value: "Claude Pro $20/월 ($17/월 연간) — 전 모델" },
      { label: "Max 5x", value: "Claude Max 5x $100/월 — 5배 사용량, 500K 컨텍스트" },
      { label: "Max 20x", value: "Claude Max 20x $200/월 — 20배, 최고 티어" },
      { label: "팀 요금제", value: "Team Standard $25/석/월 — Opus 미포함" },
      { label: "팀 Premium", value: "Team Premium $125/석/월 — Opus + Codex" },
      { label: "엔터프라이즈", value: "$20/석 + API 사용량 — HIPAA, SSO/SCIM" },
    ],
  },
  {
    company: "DeepSeek",
    slug: "deepseek",
    items: [
      { label: "무료 티어", value: "V4 Flash/V4 Pro 완전 무료 — 구독 자체 없음" },
      { label: "V4 Flash (API)", value: "$0.14/$0.28 — GPT-5.5 대비 1/7 가격" },
      { label: "V4 Pro (API)", value: "$0.435/$0.87 — 1.6T 파라미터, 최고 성능" },
      { label: "캐시 히트 할인", value: "98% 할인 ($0.0028/$0.0036) — 캐시 적중 시" },
      { label: "무료 API 크레딧", value: "5M 토큰 무료 (신규 가입, 카드 불필요)" },
      { label: "오픈소스", value: "MIT 라이선스 — 자체 호스팅, 상업 사용 무제한" },
      { label: "기업 채널", value: "화웨이 Ascend 칩 파트너십 (16,000개)" },
    ],
  },
  {
    company: "Google (Gemini)",
    slug: "google",
    items: [
      { label: "무료 티어", value: "Gemini 3.1 Pro + 15GB Google One 무료" },
      { label: "AI Plus", value: "Gemini AI Plus $7.99/월 — 2배 사용량, 400GB" },
      { label: "AI Pro", value: "Gemini AI Pro $19.99/월 — 1M 컨텍스트, 5TB, YouTube Lite" },
      { label: "Ultra 5x", value: "Gemini Ultra $99.99/월 — 5배, 20TB, YouTube Premium" },
      { label: "Ultra 20x", value: "Gemini Ultra $199.99/월 — 20배, Deep Think, 30TB" },
      { label: "Workspace 번들", value: "비즈니스 $7~22/인/월 — Gemini 내장됨" },
      { label: "엔터프라이즈", value: "Gemini Enterprise $21~60/석 — 에이전트 플랫폼" },
    ],
  },
];

// ── Sub-tabs ───────────────────────────────────────────────────

const SUB_TABS = [
  { value: "promotions", label: "프로모션 전략" },
  { value: "ads", label: "광고 채널" },
  { value: "efficiency", label: "비용 효율" },
];

// ── Ad Channel Data ────────────────────────────────────────────

interface ChannelEntry {
  channel: string;
  openai: string;
  anthropic: string;
  deepseek: string;
  google: string;
}

const channelData: ChannelEntry[] = [
  { channel: "Google Ads", openai: "✅ 집중 ($120M)", anthropic: "✅ 신규 ($10M)", deepseek: "❌ 미사용", google: "✅ 자체 플랫폼" },
  { channel: "Meta (FB/IG)", openai: "✅ 주요 ($40M)", anthropic: "✅ 운영 ($15M)", deepseek: "❌ 미사용", google: "✅ 운영 ($20M)" },
  { channel: "Reddit", openai: "✅ 집중 ($20M)", anthropic: "✅ 커뮤니티", deepseek: "✅ 개발자", google: "✅ 일반" },
  { channel: "TikTok", openai: "✅ 실험 ($10M)", anthropic: "❌ 미사용", deepseek: "❌ 미사용", google: "✅ 실험 ($5M)" },
  { channel: "X/Twitter", openai: "✅ 브랜딩", anthropic: "✅ CEO 브랜딩", deepseek: "✅ 개발자", google: "✅ 공식" },
  { channel: "LinkedIn", openai: "✅ B2B ($5M)", anthropic: "✅ B2B ($3M)", deepseek: "❌ 미사용", google: "✅ B2B ($10M)" },
  { channel: "TV/OOH", openai: "✅ Super Bowl ($7M)", anthropic: "❌ 미사용", deepseek: "❌ 미사용", google: "✅ 브랜드 ($30M)" },
  { channel: "Podcast", openai: "✅ 스폰서 ($5M)", anthropic: "✅ CEO 출연", deepseek: "❌ 미사용", google: "✅ 스폰서 ($8M)" },
];

// ── Efficiency Data ────────────────────────────────────────────

interface EfficiencyEntry {
  metric: string;
  openai: string;
  anthropic: string;
  deepseek: string;
  google: string;
}

const efficiencyData: EfficiencyEntry[] = [
  { metric: "TV 광고비 (Jan-Apr)", openai: "$64.9M", anthropic: "$21.1M", deepseek: "~$0", google: "$81.7M" },
  { metric: "연간 마케팅비", openai: "$5.73B (2025)", anthropic: "미공개", deepseek: "최소", google: "$30.4B (2025)" },
  { metric: "MAU", openai: "900M+", anthropic: "120M", deepseek: "130M+", google: "200M" },
  { metric: "CAC (추정)", openai: "$35~45", anthropic: "$30~38", deepseek: "~$8", google: "$20~25" },
  { metric: "유료 전환율", openai: "6.2%", anthropic: "46% (1위)", deepseek: "4~8%", google: "15%" },
  { metric: "기업 고객", openai: "92% Fortune 500", anthropic: "1/4 기업 도입", deepseek: "89% 중국 시장", google: "350M+ 유료가입" },
  { metric: "마케팅 철학", openai: "공격적 멀티채널", anthropic: "반(反)마케팅 전략", deepseek: "오픈소스 바이럴", google: "번들 + 자체 플랫폼" },
];

// ── Promotion Detail Cards ─────────────────────────────────────

interface PromoHighlight {
  company: string;
  slug: string;
  bestDeal: string;
  strategy: string;
}

const promoHighlights: PromoHighlight[] = [
  { company: "OpenAI", slug: "openai", bestDeal: "Go $8/월 (초저가 진입)", strategy: "광고 수익화 + 900M WAU 중 96% 무료유저 전환 시도" },
  { company: "Anthropic", slug: "anthropic", bestDeal: "Pro $20/월 (무광고)", strategy: "무광고 프리미엄 + '안전한 AI' 브랜딩으로 전환율 46%" },
  { company: "DeepSeek", slug: "deepseek", bestDeal: "V4 Flash $0.14/MTok", strategy: "가격 파괴 + 오픈소스 + AGI 내러티브 = 제로 광고 성장" },
  { company: "Google (Gemini)", slug: "google", bestDeal: "AI Plus $7.99/월", strategy: "Workspace/Android 번들 + 350M+ 기존 구독자 활용" },
];

// ── Components ─────────────────────────────────────────────────

function CompanyIcon({ slug, className }: { slug: string; className?: string }) {
  const cls = cn("h-5 w-5 shrink-0", className);
  switch (slug) {
    case "openai": return <OpenAILogo className={cls} />;
    case "anthropic": return <AnthropicLogo className={cls} />;
    case "deepseek": return <DeepSeekLogo className={cls} />;
    case "google": return <GoogleAILogo className={cls} />;
    default: return null;
  }
}

function PromoCard({ data }: { data: PromoHighlight }) {
  return (
    <Card className="overflow-hidden">
      <div className="h-1 w-full" style={{ backgroundColor: getBrandColor(data.slug) }} />
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <CompanyIcon slug={data.slug} />
          <CardTitle className="text-sm">{data.company}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <p className="text-[0.6rem] font-semibold text-muted-foreground uppercase tracking-wide">최저가</p>
          <p className="text-xs font-medium text-foreground">{data.bestDeal}</p>
        </div>
        <div>
          <p className="text-[0.6rem] font-semibold text-muted-foreground uppercase tracking-wide">전략</p>
          <p className="text-xs leading-relaxed text-muted-foreground">{data.strategy}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Main Component ─────────────────────────────────────────────

export function MarketingStrategy() {
  const [subTab, setSubTab] = useState("promotions");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="inline-flex rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]">
          AI 기업 마케팅 전략 분석
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          OpenAI · Anthropic · DeepSeek · Google의 요금제·프로모션·광고 효율 비교
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center gap-1 rounded-full border border-[rgba(15,0,0,0.12)] bg-[#f8f7f7] p-1 w-fit dark:border-[rgba(255,255,255,0.1)] dark:bg-[#222]">
        {SUB_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSubTab(tab.value)}
            className={cn(
              "rounded-full px-5 py-2 text-xs font-medium transition-all",
              subTab === tab.value
                ? "bg-[#201d1d] text-[#fdfcfc] shadow-sm dark:bg-[#fdfcfc] dark:text-[#201d1d]"
                : "text-[#424245] hover:text-[#201d1d] dark:text-[#a0a0a0] dark:hover:text-[#fdfcfc]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── 프 로 모 션  전 략 ── */}
      {subTab === "promotions" && (
        <div className="space-y-6">
          {/* Summary cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {promoHighlights.map((p) => (
              <PromoCard key={p.slug} data={p} />
            ))}
          </div>

          {/* Detail table */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="inline-flex items-center gap-1.5 text-sm font-semibold">
                <Gift className="h-4 w-4 text-muted-foreground" />
                기업별 요금제 · 프로모션 상세
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-28">항목</TableHead>
                      {promoData.map((c) => (
                        <TableHead key={c.slug} className="min-w-[160px]">
                          <div className="flex items-center gap-1.5">
                            <CompanyIcon slug={c.slug} />
                            {c.company}
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {promoData[0].items.map((_, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium text-xs">{promoData[0].items[i].label}</TableCell>
                        {promoData.map((c) => (
                          <TableCell key={c.slug} className="text-xs text-muted-foreground">
                            {c.items[i]?.value || "-"}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Insight callout */}
          <div className="rounded-sm border border-sky-300/20 bg-sky-50/80 p-5 dark:border-sky-800/20 dark:bg-sky-950/20">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]">
              <Lightbulb className="h-3.5 w-3.5" />프로모션 인사이트
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-sky-700 dark:text-sky-300">
              <li><strong>OpenAI:</strong> $5.73B 마케팅비 중 96% 무료유저 → 광고 수익화로 $2.5B (2026), $11B (2027) 목표</li>
              <li><strong>Anthropic:</strong> TV 광고비 OpenAI의 1/3 ($21.1M)이지만 Super Bowl '반(反)광고'로 가장 큰 문화적 영향</li>
              <li><strong>DeepSeek:</strong> 전통 광고비 $0, MIT 오픈소스 + 가격 파괴로 130M+ 유저 — 업계 가장 효율적 성장</li>
              <li><strong>Google:</strong> Gemini를 Workspace/One/Android에 번들 + 자체 광고 플랫폼 운영 = AI를 인프라로 만드는 전략</li>
            </ul>
          </div>
        </div>
      )}

      {/* ── 광 고  채 널 ── */}
      {subTab === "ads" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="inline-flex items-center gap-1.5 text-sm font-semibold">
                <Megaphone className="h-4 w-4 text-muted-foreground" />
                AI 기업 광고 채널 매트릭스
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">채널</TableHead>
                      <TableHead className="min-w-[140px]"><div className="flex items-center gap-1"><OpenAILogo className="h-4 w-4" /> OpenAI</div></TableHead>
                      <TableHead className="min-w-[140px]"><div className="flex items-center gap-1"><AnthropicLogo className="h-4 w-4" /> Anthropic</div></TableHead>
                      <TableHead className="min-w-[140px]"><div className="flex items-center gap-1"><DeepSeekLogo className="h-4 w-4" /> DeepSeek</div></TableHead>
                      <TableHead className="min-w-[140px]"><div className="flex items-center gap-1"><GoogleAILogo className="h-4 w-4" /> Google</div></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {channelData.map((row) => (
                      <TableRow key={row.channel}>
                        <TableCell className="font-medium text-xs">{row.channel}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{row.openai}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{row.anthropic}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{row.deepseek}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{row.google}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-sm border border-amber-300/20 bg-amber-50/80 p-5 dark:border-amber-800/20 dark:bg-amber-950/20">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]">
              <Lightbulb className="h-3.5 w-3.5" />채널 인사이트
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-amber-700 dark:text-amber-300">
              <li><strong>OpenAI:</strong> 모든 채널 공격적 사용 — Super Bowl 광고($7M)까지. 디지털 $200M+ 연간 집행</li>
              <li><strong>Anthropic:</strong> CEO 시각적 브랜딩 + Reddit/커뮤니티 중심. TV/오프라인은 0</li>
              <li><strong>DeepSeek:</strong> 전통 광고 0 — 오픈소스+가격으로 개발자 바이럴. CAC $8 업계 최저</li>
              <li><strong>Google:</strong> 기존 광고 인프라(GA/Google Ads) 활용 + AI Mode로 검색 광고 진화</li>
            </ul>
          </div>
        </div>
      )}

      {/* ── 비 용  효 율 ── */}
      {subTab === "efficiency" && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="inline-flex items-center gap-1.5 text-sm font-semibold">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                마케팅 비용 효율 비교
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">지표</TableHead>
                      <TableHead className="min-w-[120px]"><div className="flex items-center gap-1"><OpenAILogo className="h-4 w-4" /> OpenAI</div></TableHead>
                      <TableHead className="min-w-[120px]"><div className="flex items-center gap-1"><AnthropicLogo className="h-4 w-4" /> Anthropic</div></TableHead>
                      <TableHead className="min-w-[120px]"><div className="flex items-center gap-1"><DeepSeekLogo className="h-4 w-4" /> DeepSeek</div></TableHead>
                      <TableHead className="min-w-[120px]"><div className="flex items-center gap-1"><GoogleAILogo className="h-4 w-4" /> Google</div></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {efficiencyData.map((row) => (
                      <TableRow key={row.metric}>
                        <TableCell className="font-medium text-xs">{row.metric}</TableCell>
                        <TableCell className={cn("text-xs", row.openai.includes("최저") ? "text-green-600 font-medium" : "text-muted-foreground")}>{row.openai}</TableCell>
                        <TableCell className={cn("text-xs", row.anthropic.includes("1위") || row.anthropic.includes("666x") ? "text-green-600 font-medium" : "text-muted-foreground")}>{row.anthropic}</TableCell>
                        <TableCell className={cn("text-xs", row.deepseek.includes("최저") || row.deepseek.includes("6.7M") ? "text-green-600 font-medium" : "text-muted-foreground")}>{row.deepseek}</TableCell>
                        <TableCell className={cn("text-xs", row.google.includes("최저") ? "text-red-600" : "text-muted-foreground")}>{row.google}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Key takeaways */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { emoji: "💰", title: "최저 CAC", value: "DeepSeek $8", desc: "전통 광고 0 · 오픈소스 바이럴" },
              { emoji: "🎯", title: "최고 전환율", value: "Anthropic 46%", desc: "무광고 프리미엄 = 충성도 1위" },
              { emoji: "📈", title: "최대 규모", value: "OpenAI 800M MAU", desc: "광고로 유입 but 유지율 하락" },
              { emoji: "🔗", title: "최고 번들", value: "Google 200M MAU", desc: "Android 번들 = AI 인프라화" },
            ].map((item, i) => (
              <div key={i} className="rounded-sm border border-border bg-card p-4 text-center">
                <p className="text-lg">{item.emoji}</p>
                <p className="mt-1 text-[0.6rem] font-semibold text-muted-foreground uppercase">{item.title}</p>
                <p className="mt-0.5 text-sm font-bold text-foreground">{item.value}</p>
                <p className="mt-0.5 text-[0.6rem] text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
