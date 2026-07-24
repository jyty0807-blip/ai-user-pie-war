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

interface PlatformData {
  name: string;
  slug: string;
  company: string;
  color: string;
  icon: string;
  tagline: string;
}

const platforms: PlatformData[] = [
  {
    name: "Claude Code",
    slug: "claude-code",
    company: "Anthropic",
    color: "#D97757",
    icon: "🤖",
    tagline: "Agentic coding with MCP ecosystem",
  },
  {
    name: "OpenAI Codex",
    slug: "openai-codex",
    company: "OpenAI",
    color: "#10A37F",
    icon: "🧠",
    tagline: "GPT-powered CLI coding agent",
  },
  {
    name: "OpenCode (OMC)",
    slug: "opencode",
    company: "OhMyOpenCode",
    color: "#8B5CF6",
    icon: "⚡",
    tagline: "Multi-agent orchestration framework",
  },
];

interface ComparisonRow {
  metric: string;
  claude: string;
  codex: string;
  omc: string;
}

const comparisonMetrics: ComparisonRow[] = [
  {
    metric: "월 구독료 (Pro)",
    claude: "$20 (Claude Pro)",
    codex: "$20 (ChatGPT Plus)",
    omc: "Free (OSS)",
  },
  {
    metric: "SWE-bench 점수",
    claude: "80.8% (SOTA)",
    codex: "72.4%",
    omc: "N/A (orchestration)",
  },
  {
    metric: "API 가격 (플래그십)",
    claude: "$10/$50 per MTok",
    codex: "$5/$30 per MTok",
    omc: "$0.14/$0.28 (DeepSeek)",
  },
  {
    metric: "컨텍스트 창",
    claude: "1M tokens",
    codex: "1.05M tokens",
    omc: "1M tokens (model-dependent)",
  },
  {
    metric: "에이전트 모드",
    claude: "Claude Code, MCP tools",
    codex: "Codex CLI, GPT Actions",
    omc: "Explore, Librarian, Oracle, Sisyphus",
  },
  {
    metric: "MCP 지원",
    claude: "✅ Native (97M+ installs)",
    codex: "❌ Not supported",
    omc: "✅ Plugin system",
  },
  {
    metric: "커뮤니티 규모",
    claude: "~2M developers",
    codex: "~10M+ (ChatGPT base)",
    omc: "~50K (growing)",
  },
  {
    metric: "추천 용도",
    claude: "복잡한 에이전트 코딩",
    codex: "범용 AI 개발",
    omc: "멀티 에이전트 오케스트레이션",
  },
];

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
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: platform.color }}
      />
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            {platform.icon}
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
    <div className="space-y-8">
      {/* 한줄요약 */}
      <div className="rounded-lg border border-indigo-200 border-l-4 border-l-indigo-400 bg-indigo-50 p-5 dark:border-indigo-800 dark:border-l-indigo-400 dark:bg-indigo-950/30 mb-6">
        <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">🔧 개발자 도구 비교</p>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-indigo-700 dark:text-indigo-300">
          <li><strong>Claude Code:</strong> SWE-bench 80.8% 1위, MCP 97M+ 설치 — 에이전트 코딩 최강</li>
          <li><strong>OpenAI Codex:</strong> 10M+ 개발자 최대 커뮤니티, GPT-5.6 생태계</li>
          <li><strong>OpenCode (OMC):</strong> 무료 오픈소스, 멀티에이전트 오케스트레이션 — 이 대시보드 제작 도구</li>
          <li>개발자 도구 선택 = <strong>작업 유형에 맞는 전략적 결정</strong></li>
        </ul>
      </div>

      {/* Top: Platform cards */}
      <div className="grid gap-4 md:grid-cols-3">
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
                <TableHead className="w-[200px]">항목</TableHead>
                <TableHead>
                  <span style={{ color: platforms[0].color }}>
                    {platforms[0].icon} Claude Code
                  </span>
                </TableHead>
                <TableHead>
                  <span style={{ color: platforms[1].color }}>
                    {platforms[1].icon} OpenAI Codex
                  </span>
                </TableHead>
                <TableHead>
                  <span style={{ color: platforms[2].color }}>
                    {platforms[2].icon} OpenCode (OMC)
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonMetrics.map((row) => (
                <TableRow key={row.metric}>
                  <TableCell className="font-medium text-muted-foreground">
                    {row.metric}
                  </TableCell>
                  <TableCell>{row.claude}</TableCell>
                  <TableCell>{row.codex}</TableCell>
                  <TableCell>{row.omc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bottom: Our Stack callout */}
      <Card
        size="sm"
        className="border-l-4 bg-gradient-to-r from-[#8B5CF6]/5 to-transparent"
        style={{ borderLeftColor: "#8B5CF6" }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <span aria-hidden="true">⚡</span>
            🚀 이 대시보드는 이렇게 만들어졌습니다
          </CardTitle>
          <CardDescription>
            이 대시보드는 OpenCode(OMC) + DeepSeek V4 Flash로 제작되었습니다.
            Sisyphus 오케스트레이터가 3개 병렬 에이전트를 관리하여 2시간 이내에
            전체 프로젝트를 완료했습니다.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
