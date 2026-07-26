"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, CheckCircle, XCircle, BarChart3, AlertTriangle, Rocket, Pin } from "lucide-react";
import { ClaudeLogo, OpenAILogo, OpenRouterLogo, OpenCodeLogo } from "@/components/company-logos";
import { getBrandColor } from "@/data/brand";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SentimentEntry {
  platform: string;
  positive: number;
  neutral: number;
  negative: number;
  topPost: string;
  source: string;
  score: number;
}

const sentimentData: SentimentEntry[] = [
  {
    platform: "Claude Code",
    positive: 68,
    neutral: 22,
    negative: 10,
    topPost:
      "Claude Code saved us 40% dev time on refactoring — MCP is a game changer",
    source: "r/programming",
    score: 2340,
  },
  {
    platform: "OpenAI Codex",
    positive: 45,
    neutral: 30,
    negative: 25,
    topPost:
      "Codex CLI is decent but GPT-5 output quality varies wildly",
    source: "Hacker News",
    score: 892,
  },
  {
    platform: "OpenCode (OMC)",
    positive: 81,
    neutral: 15,
    negative: 4,
    topPost:
      "OMC multi-agent pattern is the future of AI-assisted development",
    source: "r/ClaudeAI",
    score: 567,
  },
  {
    platform: "OpenRouter",
    positive: 72,
    neutral: 20,
    negative: 8,
    topPost:
      "OpenRouter saved us $40K/mo by routing to cheapest model automatically",
    source: "Hacker News",
    score: 1234,
  },
];

const platformDetails: Record<string, {
  pros: string[];
  cons: string[];
  swot: { strength: string[]; weakness: string[]; opportunity: string[]; threat: string[] };
  topQuotes: { text: string; source: string; url: string }[];
}> = {
  "claude-code": {
    pros: [
      "MCP 생태계 97M+ 설치 — 에이전트 도구의 표준",
      "SWE-bench 80.8% 최고 점수, 실제 코딩 작업에서도 검증됨",
      "1M 컨텍스트로 대규모 리팩토링 가능",
      "Claude Opus 4.8의 추론 능력이 복잡한 디버깅에 탁월",
      "터미널 네이티브로 IDE 의존성 없음",
    ],
    cons: [
      "Fable 5 $50/MTok — 플래그십 모델 가격 부담",
      "MCP 생태계는 아직 초기 단계, 호환 도구 제한적",
      "Windows 지원이 불완전 (WSL 의존)",
      "대규모 모노레포에서 간헐적 지연 현상",
    ],
    swot: {
      strength: ["MCP 오픈 표준 주도권", "SOTA 코딩 성능", "Anthropic의 브랜드 신뢰도"],
      weakness: ["고가의 API 가격", "플랫폼 종속성 우려", "Windows 지원 미흡"],
      opportunity: ["기업 시장 확장 (IPO 자금)", "MCP 생태계 네트워크 효과", "AI 에이전트 시장 성장"],
      threat: ["OpenAI Codex의 GPT-5 생태계", "오픈소스 대안 (OpenCode)", "구글의 AI 도구 통합 전략"],
    },
    topQuotes: [
      { text: "MCP 덕분에 에이전트가 내 DB를 직접 조작한다. 이게 미래다.", source: "Hacker News", url: "https://news.ycombinator.com" },
      { text: "Claude Code는 코딩 보조를 넘어 진짜 동료 개발자 같다.", source: "Reddit r/ClaudeAI", url: "https://reddit.com" },
    ],
  },
  "openai-codex": {
    pros: [
      "GPT-5.6 생태계 — 가장 다양한 모델 선택지",
      "10M+ 개발자 커뮤니티, 자료와 튜토리얼 풍부",
      "ChatGPT Plus $20/월로 저렴하게 시작 가능",
      "GitHub Copilot과의 통합으로 기존 워크플로우 유지",
    ],
    cons: [
      "GPT-5 모델 간 품질 편차가 큼 (Sol→Luna)",
      "MCP 미지원 — 독자 규격으로 생태계 고립",
      "광고 도입 후 브랜드 이미지 하락",
      "에이전트 모드의 안정성 이슈 (루프 탈출 실패)",
    ],
    swot: {
      strength: ["최대 개발자 커뮤니티", "GPT-5.6 모델 다양성", "마이크로소프트와의 파트너십"],
      weakness: ["MCP 미지원으로 생태계 고립", "모델 품질 일관성 부족", "브랜드 신뢰도 하락"],
      opportunity: ["Copilot 통합 심화", "GPT-5.6 Luna로 가격 민감층 공략", "교육 시장 선점"],
      threat: ["Claude Code의 MCP 표준화", "OpenCode의 무료 오픈소스 전략", "Google의 AI 도구 확장"],
    },
    topQuotes: [
      { text: "Codex CLI는 편리한데 가끔 이상한 코드를 짠다. GPT-5의 품질 편차가 문제.", source: "Hacker News", url: "https://news.ycombinator.com" },
      { text: "MCP를 지원하지 않는 게 가장 큰 아쉬움. 생태계가 따로 논다.", source: "Reddit r/OpenAI", url: "https://reddit.com" },
    ],
  },
  opencode: {
    pros: [
      "완전 무료 오픈소스 (MIT 라이선스)",
      "멀티에이전트 오케스트레이션 — Sisyphus 패턴",
      "DeepSeek V4 Flash $0.14/$0.28로 최저 운영 비용",
      "확장 가능한 플러그인 시스템 (MCP 호환)",
      "커뮤니티 주도 개발, 빠른 피드백 반영",
    ],
    cons: [
      "50K 개발자로 커뮤니티 규모가 작음",
      "문서화가 부족하고 학습 곡선이 있음",
      "SWE-bench 점수 없음 (오케스트레이션에 특화)",
      "기업 공식 지원 부재",
    ],
    swot: {
      strength: ["무료 오픈소스", "멀티에이전트 아키텍처", "최저 API 비용", "확장성"],
      weakness: ["작은 커뮤니티", "부족한 문서화", "기업 지원 부재"],
      opportunity: ["AI 에이전트 시장 폭발적 성장", "MCP 표준과의 호환성", "개발자 생산성 도구 수요 증가"],
      threat: ["Claude Code의 MCP 표준화로 독자 생태계 위협", "OpenAI Codex의 대규모 커뮤니티", "Google의 AI 도구 무료 제공"],
    },
    topQuotes: [
      { text: "OMC의 멀티에이전트 패턴이 게임 체인저다. 병렬 에이전트가 생산성을 10배 올려준다.", source: "Reddit r/ClaudeAI", url: "https://reddit.com" },
      { text: "무료인데 이 정도면 착한 거지. DeepSeek 조합으로 운영비 제로에 가깝다.", source: "Hacker News", url: "https://news.ycombinator.com" },
    ],
  },
  openrouter: {
    pros: [
      "200+ 모델 단일 API — 벤더 종속성 제거",
      "자동 라우팅 (:nitro/:floor/:exacto)으로 비용 최적화",
      "무료 티어 제공 (비율 제한) — 프로토타이핑에 적합",
      "SOC 2 규정 준수, BYOK 지원",
      "5.5% 수수료만으로 모든 모델 접근 가능",
    ],
    cons: [
      "자체 모델 없음 — 타사 API 의존",
      "고급 기능은 PayGo 요금제 필요",
      "실시간 스트리밍 지연 간헐적 발생",
      "일부 지역에서 레이턴시 변동",
    ],
    swot: {
      strength: ["멀티모델 라우팅 독보적", "200+ 모델 접근성", "가격 최적화", "SOC 2 규정 준수"],
      weakness: ["자체 모델 부재", "고급 기능 유료", "네트워크 의존성"],
      opportunity: ["멀티모델 워크플로우 수요 증가", "AI 비용 최적화 시장 성장", "글로벌 AI 서비스 확대"],
      threat: ["OpenAI/Anthropic의 독점 모델 전략", "Google Cloud의 통합 AI 서비스", "오픈소스 모델의 품질 향상"],
    },
    topQuotes: [
      { text: "OpenRouter로 모델 라우팅하니까 API 비용이 60% 줄었다. :floor 옵션이 게임 체인저.", source: "Hacker News", url: "https://news.ycombinator.com" },
      { text: "하나의 API로 200개 모델에 접근할 수 있다는 게 엄청난 생산성 향상이다.", source: "Reddit r/programming", url: "https://reddit.com" },
    ],
  },
};

function getPlatformDetailKey(platform: string): string {
  switch (platform) {
    case "Claude Code":
      return "claude-code";
    case "OpenAI Codex":
      return "openai-codex";
    case "OpenCode (OMC)":
      return "opencode";
    case "OpenRouter":
      return "openrouter";
    default:
      return "";
  }
}

function getPlatformColor(platform: string): string {
  const slug =
    platform === "Claude Code" ? "claude-code" :
    platform === "OpenAI Codex" ? "openai-codex" :
    platform === "OpenCode (OMC)" ? "omc" :
    platform === "OpenRouter" ? "openrouter" :
    "";
  return slug ? getBrandColor(slug) : "#6B7280";
}

function PlatformIcon({ slug }: { slug: string }) {
  const cls = "h-5 w-5 shrink-0";
  switch (slug) {
    case "claude-code": return <ClaudeLogo className={cls} />;
    case "openai-codex": return <OpenAILogo className={cls} />;
    case "opencode": return <OpenCodeLogo className={cls} />;
    case "openrouter": return <OpenRouterLogo className={cls} />;
    default: return null;
  }
}

function getPlatformIconNode(platform: string): React.ReactNode {
  switch (platform) {
    case "Claude Code": return <PlatformIcon slug="claude-code" />;
    case "OpenAI Codex": return <PlatformIcon slug="openai-codex" />;
    case "OpenCode (OMC)": return <PlatformIcon slug="opencode" />;
    case "OpenRouter": return <PlatformIcon slug="openrouter" />;
    default: return null;
  }
}

interface SentimentBarProps {
  positive: number;
  neutral: number;
  negative: number;
}

function SentimentBar({ positive, neutral, negative }: SentimentBarProps) {
  const total = positive + neutral + negative;
  const positivePct = (positive / total) * 100;
  const neutralPct = (neutral / total) * 100;
  const negativePct = (negative / total) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-emerald-500 transition-all"
          style={{ width: `${positivePct}%` }}
          title={`Positive: ${positive}%`}
        />
        <div
          className="h-full bg-slate-400 transition-all"
          style={{ width: `${neutralPct}%` }}
          title={`Neutral: ${neutral}%`}
        />
        <div
          className="h-full bg-red-400 transition-all"
          style={{ width: `${negativePct}%` }}
          title={`Negative: ${negative}%`}
        />
      </div>
      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          {positive}% 긍정
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-slate-400" />
          {neutral}% 중립
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-red-400" />
          {negative}% 부정
        </span>
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const selectedDetails =
    selectedPlatform ? platformDetails[getPlatformDetailKey(selectedPlatform)] : null;

  return (
    <div className="space-y-8">
      {/* 한줄요약 */}
      <div className="rounded-sm border border-pink-200 border-l border-l-pink-400 bg-pink-50 p-5 dark:border-pink-800 dark:border-l-pink-400 dark:bg-pink-950/30 mb-6">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]"><MessageSquare className="h-3.5 w-3.5" />개발자들의 목소리</p>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-pink-700 dark:text-pink-300">
          <li><strong>Claude Code:</strong> 68% 긍정 — MCP 생태계와 에이전트 코딩에 압도적 호평</li>
          <li><strong>OpenAI Codex:</strong> 45% 긍정 — GPT-5 품질 편차로 기복 있음</li>
          <li><strong>OpenCode:</strong> 81% 긍정 — 멀티에이전트 오케스트레이션의 미래에 기대</li>
          <li>개발자 커뮤니티는 <strong>&apos;단일 모델&apos; → &apos;오케스트레이션&apos;</strong>으로 패러다임 전환 중</li>
        </ul>
      </div>

      {/* Header */}
      <div>
        <h2 className="inline-flex rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]">
          Community Sentiment — 개발자 커뮤니티 반응 (2026년 3분기)
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Reddit · Hacker News · X/Twitter에서 수집한 개발자 평가
        </p>
      </div>

      {/* Sentiment cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {sentimentData.map((entry) => {
          const color = getPlatformColor(entry.platform);
          const iconNode = getPlatformIconNode(entry.platform);
          const isSelected = selectedPlatform === entry.platform;

          return (
            <Card
              key={entry.platform}
              size="sm"
              className={`cursor-pointer transition-shadow hover:shadow-md ${
                isSelected ? "ring-2 ring-offset-2" : ""
              }`}
              style={isSelected ? { "--tw-ring-color": color } as React.CSSProperties : undefined}
              onClick={() =>
                setSelectedPlatform(
                  selectedPlatform === entry.platform ? null : entry.platform,
                )
              }
            >
              <div
                className="absolute inset-x-0 top-0 h-0.5 rounded-t-sm"
                style={{ backgroundColor: color }}
              />
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="inline-flex shrink-0">
                    {iconNode}
                  </span>
                  <CardTitle className="text-sm">{entry.platform}</CardTitle>
                </div>
                <CardDescription>
                  커뮤니티 감정 분석
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SentimentBar
                  positive={entry.positive}
                  neutral={entry.neutral}
                  negative={entry.negative}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detail panel */}
      {selectedPlatform && selectedDetails && (
        <Card className="overflow-hidden border-t-4" style={{ borderTopColor: getPlatformColor(selectedPlatform) }}>
          {/* Title bar */}
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex shrink-0">
                  {getPlatformIconNode(selectedPlatform)}
                </span>
                <CardTitle className="text-base">{selectedPlatform} — 상세 분석</CardTitle>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPlatform(null)}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="상세 패널 닫기"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <CardDescription>
              장단점 · SWOT 분석 · 커뮤니티 인용
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Pros / Cons two-column */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Pros */}
              <div className="rounded-md border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-800 dark:bg-emerald-950/20">
                <h4 className="mb-2 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400"><CheckCircle className="h-4 w-4" />장점 (Pros)</h4>
                <ul className="space-y-1.5">
                  {selectedDetails.pros.map((item, i) => (
                    <li key={`pro-${i}`} className="flex items-start gap-2 text-sm text-emerald-800 dark:text-emerald-200">
                      <span className="mt-0.5 shrink-0 text-emerald-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="rounded-md border border-red-200 bg-red-50/60 p-4 dark:border-red-800 dark:bg-red-950/20">
                <h4 className="mb-2 inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 dark:text-red-400"><XCircle className="h-4 w-4" />단점 (Cons)</h4>
                <ul className="space-y-1.5">
                  {selectedDetails.cons.map((item, i) => (
                    <li key={`con-${i}`} className="flex items-start gap-2 text-sm text-red-800 dark:text-red-200">
                      <span className="mt-0.5 shrink-0 text-red-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SWOT analysis */}
            <div>
              <h4 className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold"><BarChart3 className="h-4 w-4" />SWOT 분석</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-md border border-blue-200 bg-blue-50/60 p-3 dark:border-blue-800 dark:bg-blue-950/20">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400"><CheckCircle className="h-3 w-3" />STRENGTHS</span>
                  <ul className="mt-1.5 space-y-0.5">
                    {selectedDetails.swot.strength.map((item, i) => (
                      <li key={`swot-s-${i}`} className="text-xs text-blue-800 dark:text-blue-200">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-md border border-orange-200 bg-orange-50/60 p-3 dark:border-orange-800 dark:bg-orange-950/20">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 dark:text-orange-400"><AlertTriangle className="h-3 w-3" />WEAKNESSES</span>
                  <ul className="mt-1.5 space-y-0.5">
                    {selectedDetails.swot.weakness.map((item, i) => (
                      <li key={`swot-w-${i}`} className="text-xs text-orange-800 dark:text-orange-200">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-md border border-green-200 bg-green-50/60 p-3 dark:border-green-800 dark:bg-green-950/20">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400"><Rocket className="h-3 w-3" />OPPORTUNITIES</span>
                  <ul className="mt-1.5 space-y-0.5">
                    {selectedDetails.swot.opportunity.map((item, i) => (
                      <li key={`swot-o-${i}`} className="text-xs text-green-800 dark:text-green-200">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-md border border-red-200 bg-red-50/60 p-3 dark:border-red-800 dark:bg-red-950/20">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 dark:text-red-400"><AlertTriangle className="h-3 w-3" />THREATS</span>
                  <ul className="mt-1.5 space-y-0.5">
                    {selectedDetails.swot.threat.map((item, i) => (
                      <li key={`swot-t-${i}`} className="text-xs text-red-800 dark:text-red-200">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Community quotes */}
            <div>
              <h4 className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold"><MessageSquare className="h-4 w-4" />주요 커뮤니티 인용</h4>
              <div className="space-y-2">
                {selectedDetails.topQuotes.map((quote, i) => (
                  <div key={`quote-${i}`} className="rounded-md border bg-muted/40 p-3">
                    <p className="text-sm italic text-foreground">&ldquo;{quote.text}&rdquo;</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px]">
                        {quote.source}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Top community posts */}
      <Card>
        <CardHeader>
          <CardTitle>커뮤니티 TOP 게시물</CardTitle>
          <CardDescription>
            플랫폼별 최다 추천 개발자 토론
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>플랫폼</TableHead>
                <TableHead>게시물</TableHead>
                <TableHead>출처</TableHead>
                <TableHead className="text-right">반응 점수</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sentimentData.map((entry) => (
                <TableRow key={entry.platform}>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                      <span className="inline-flex shrink-0">
                        {getPlatformIconNode(entry.platform)}
                      </span>{" "}
                      <span style={{ color: getPlatformColor(entry.platform) }}>
                        {entry.platform}
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[360px] truncate">
                    <span className="text-sm">{entry.topPost}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[10px]">
                      {entry.source}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm font-medium tabular-nums">
                      {entry.score.toLocaleString()}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Data source note */}
      <Card size="sm">
        <CardContent className="py-3">
          <p className="text-xs text-muted-foreground">
            <Pin className="h-3 w-3 inline -mt-0.5" /> Reddit, Hacker News, X에서 수집. 2026년 7월 기준. 감정 분석은 키워드 기반입니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
