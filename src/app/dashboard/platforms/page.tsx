"use client";

import {
  Card,
  CardContent,
  CardDescription,
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
import { EvidenceTooltip, SECTION_EVIDENCE } from "@/components/evidence-tooltip";
import { MetricTooltip } from "@/components/metric-tooltip";
import { Wrench } from "lucide-react";
import { OpenAILogo, AnthropicLogo, DeepSeekLogo, GoogleAILogo, OpenRouterLogo, ClaudeLogo, GeminiLogo, OpenCodeLogo } from "@/components/company-logos";
import { getBrandColor } from "@/data/brand";

function PlatformIcon({ slug }: { slug: string }) {
  const cls = "h-7 w-7 shrink-0";
  switch (slug) {
    case "claude-code": return <ClaudeLogo className={cls} />;
    case "openai-codex": return <OpenAILogo className={cls} />;
    case "openrouter": return <OpenRouterLogo className={cls} />;
    case "omc": return <OpenCodeLogo className={cls} />;
    case "claude": return <ClaudeLogo className={cls} />;
    case "gemini": return <GeminiLogo className={cls} />;
    default: return <DeepSeekLogo className={cls} />;
  }
}

interface PlatformData {
  name: string;
  slug: string;
  company: string;
  color: string;
  tagline: string;
}

const platforms: PlatformData[] = [
  {
    name: "Claude Code",
    slug: "claude-code",
    company: "Anthropic",
    color: getBrandColor("claude-code"),
    tagline: "에이전트 코딩 (MCP · SWE-bench SOTA)",
  },
  {
    name: "OpenAI Codex",
    slug: "openai-codex",
    company: "OpenAI",
    color: getBrandColor("openai-codex"),
    tagline: "GPT-5.6 CLI — 최대 커뮤니티 · Copilot 통합",
  },
  {
    name: "OpenRouter",
    slug: "openrouter",
    company: "OpenRouter",
    color: getBrandColor("openrouter"),
    tagline: "멀티모델 라우팅 — 200+ 모델 단일 API",
  },
  {
    name: "OMC (OpenCode)",
    slug: "omc",
    company: "OpenCode",
    color: getBrandColor("omc"),
    tagline: "무료 오픈소스 오케스트레이션 · 10K+ GitHub Stars",
  },
];

interface ComparisonRow {
  metric: string;
  claude: string;
  codex: string;
  router: string;
  omc: string;
}

const comparisonMetrics: ComparisonRow[] = [
  {
    metric: "월 구독료 (Pro)",
    claude: "$20 (Claude Pro)",
    codex: "$20 (ChatGPT Plus)",
    router: "무료 (기본)",
    omc: "무료 (MIT 라이선스)",
  },
  {
    metric: "SWE-bench 점수",
    claude: "80.8% (SOTA)",
    codex: "72.4%",
    router: "N/A (라우팅)",
    omc: "N/A (오케스트레이터)",
  },
  {
    metric: "컨텍스트 창",
    claude: "1M tokens",
    codex: "1.05M tokens",
    router: "1M tokens (model-dependent)",
    omc: "모델 의존 (OpenRouter 연동)",
  },
  {
    metric: "에이전트 모드",
    claude: "Claude Code, MCP tools",
    codex: "Codex CLI, GPT Actions",
    router: "모델별 상이 (범용 API)",
    omc: "Sisyphus 에이전트, Plan-Delegate-Verify",
  },
  {
    metric: "MCP 지원",
    claude: "Native (97M+ installs)",
    codex: "Not supported",
    router: "Not supported",
    omc: "Not native (OpenRouter 라우팅)",
  },
  {
    metric: "커뮤니티 규모",
    claude: "~2M developers",
    codex: "~10M+ (ChatGPT base)",
    router: "~200K (growing)",
    omc: "~10K+ GitHub Stars",
  },
  {
    metric: "추천 용도",
    claude: "복잡한 에이전트 코딩",
    codex: "범용 AI 개발",
    router: "멀티모델 유연한 API 라우팅",
    omc: "멀티에이전트 오케스트레이션",
  },
];

const PLATFORM_METRIC_DEFINITIONS: Record<string, string> = {
  "월 구독료 (Pro)": "각 플랫폼의 프로(Pro) 등급 월간 구독 요금입니다. Claude Pro는 $20, ChatGPT Plus도 $20으로 동일합니다. OpenRouter는 기본적으로 무료이며, 사용한 모델에 따라 종량제 과금됩니다.",
  "SWE-bench 점수": "SWE-bench는 소프트웨어 엔지니어링 벤치마크로, 실제 GitHub 이슈를 해결하는 능력을 측정합니다. 높을수록 복잡한 코드 문제를 스스로 해결할 수 있는 능력이 뛰어납니다.",
  "컨텍스트 창": "AI가 한 번에 처리할 수 있는 최대 텍스트 양(토큰 단위)입니다. 1M 토큰은 약 소설 3권 분량으로, 큰 창일수록 방대한 코드베이스를 한 번에 이해할 수 있습니다.",
  "에이전트 모드": "AI가 도구를 사용하고, 파일을 읽고 쓰며, 명령어를 실행하는 자율 작업 모드입니다. 에이전트 모드가 강력할수록 복잡한 개발 작업을 자동화할 수 있습니다.",
  "MCP 지원": "Model Context Protocol 지원 여부 — AI 모델이 외부 도구와 데이터 소스에 연결되는 표준 프로토콜입니다. 네이티브 지원은 100개 이상의 도구를 바로 사용할 수 있음을 의미합니다.",
  "커뮤니티 규모": "해당 플랫폼을 사용하는 개발자 수 추정치입니다. 커뮤니티가 클수록 플러그인, 템플릿, 문제 해결 자료가 풍부합니다.",
  "추천 용도": "각 플랫폼의 강점에 기반한 최적의 사용 시나리오입니다. 어떤 작업에 어떤 도구가 가장 적합한지 판단하는 기준이 됩니다.",
};

interface PlatformCardProps {
  platform: PlatformData;
  index: number;
}

function PlatformCard({ platform, index }: PlatformCardProps) {
  const keyStats = [
    comparisonMetrics[0],
    comparisonMetrics[1],
    comparisonMetrics[6],
  ];

  return (
    <Card size="sm" className="relative overflow-hidden">
      {/* Color accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-0.5"
        style={{ backgroundColor: platform.color }}
      />
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            <PlatformIcon slug={platform.slug} />
          </span>
          <div>
            <CardTitle className="text-base">{platform.name}</CardTitle>
            <CardDescription>
              {platform.company} • {platform.tagline}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {keyStats.map((stat, statIdx) => (
            <div
              key={`stats-${index}-${statIdx}`}
              className="flex items-center justify-between text-xs"
            >
              <span className="text-muted-foreground">{stat.metric}</span>
              <span
                className="font-medium text-foreground"
                style={{ color: platform.color }}
              >
                  {index === 0
                    ? stat.claude
                    : index === 1
                      ? stat.codex
                      : index === 2
                        ? stat.router
                        : stat.omc}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function PlatformsPage() {
  return (
    <div className="space-y-10">
      {/* 한줄요약 */}
      <div className="rounded-sm border border-indigo-300/20 bg-indigo-50/80 p-5 dark:border-indigo-800/20 dark:bg-indigo-950/20">
        <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-200"><Wrench className="h-4 w-4 inline -mt-0.5" /> 개발자 도구 비교
          <EvidenceTooltip section="개발자 도구 비교" sources={SECTION_EVIDENCE.platforms.sources} methodology={SECTION_EVIDENCE.platforms.methodology} className="ml-1 -mb-0.5" />
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-indigo-700 dark:text-indigo-300">
          <li><strong>Claude Code:</strong> SWE-bench 80.8% 1위, MCP 97M+ 설치 — 에이전트 코딩 최강</li>
          <li><strong>OpenAI Codex:</strong> 10M+ 개발자 최대 커뮤니티, GPT-5.6 생태계</li>
          <li><strong>OMC (OpenCode):</strong> 무료 오픈소스, Sisyphus 멀티에이전트 오케스트레이션</li>
          <li>개발자 도구 선택 = <strong>작업 유형에 맞는 전략적 결정</strong></li>
        </ul>
      </div>

      {/* Top: Platform cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {platforms.map((platform, index) => (
          <PlatformCard key={platform.slug} platform={platform} index={index} />
        ))}
      </div>

      <Separator />

      {/* Full comparison table */}
      <Card>
        <CardHeader>
          <CardTitle>전체 기능 비교</CardTitle>
          <CardDescription>
            주요 개발 플랫폼 지표 비교 (2026년 3분기)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] py-3">항목</TableHead>
                <TableHead className="py-3">
                  <span className="inline-flex items-center gap-1.5" style={{ color: platforms[0].color }}>
                    <PlatformIcon slug={platforms[0].slug} /> Claude Code
                  </span>
                </TableHead>
                <TableHead>
                  <span className="inline-flex items-center gap-1.5" style={{ color: platforms[1].color }}>
                    <PlatformIcon slug={platforms[1].slug} /> OpenAI Codex
                  </span>
                </TableHead>
                <TableHead>
                  <span className="inline-flex items-center gap-1.5" style={{ color: platforms[2].color }}>
                    <PlatformIcon slug={platforms[2].slug} /> OpenRouter
                  </span>
                </TableHead>
                <TableHead>
                  <span className="inline-flex items-center gap-1.5" style={{ color: platforms[3].color }}>
                    <PlatformIcon slug={platforms[3].slug} /> OMC
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonMetrics.map((row) => (
                <TableRow key={row.metric}>
                  <TableCell className="py-3 font-medium text-muted-foreground">
                    <span className="inline-flex items-center gap-0.5">
                      {row.metric}
                      <MetricTooltip
                        term={row.metric}
                        definition={PLATFORM_METRIC_DEFINITIONS[row.metric] ?? ""}
                      />
                    </span>
                  </TableCell>
                  <TableCell className="py-3">{row.claude}</TableCell>
                  <TableCell className="py-3">{row.codex}</TableCell>
                  <TableCell className="py-3">{row.router}</TableCell>
                  <TableCell className="py-3">{row.omc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Callout */}
      <div className="rounded-sm border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/50">
        <div className="flex items-start gap-3">
          <span className="shrink-0 text-amber-500 text-lg">🚀</span>
          <div>
            <p className="inline-flex rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]">
              이 대시보드는 이렇게 만들어졌습니다
            </p>
            <p className="mt-1 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              OpenAI · Anthropic · DeepSeek · Google의 유저 확보 경쟁을 추적하는 이 대시보드는
              Next.js 16 + Tailwind v4 + shadcn/ui로 3개의 병렬 AI 에이전트(Claude Code, OpenAI Codex, OMC)와
              오케스트레이터(Sisyphus)가 단기간에 구축했습니다.
              모든 데이터는 공개 출처 기반이며, 포트폴리오 목적의 프로젝트입니다.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

