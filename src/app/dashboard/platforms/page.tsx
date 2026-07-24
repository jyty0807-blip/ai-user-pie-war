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
    metric: "Monthly Price (Pro)",
    claude: "$20 (Claude Pro)",
    codex: "$20 (ChatGPT Plus)",
    omc: "Free (OSS)",
  },
  {
    metric: "SWE-bench Score",
    claude: "80.8% (SOTA)",
    codex: "72.4%",
    omc: "N/A (orchestration)",
  },
  {
    metric: "API Pricing (Flagship)",
    claude: "$10/$50 per MTok",
    codex: "$5/$30 per MTok",
    omc: "$0.14/$0.28 (DeepSeek)",
  },
  {
    metric: "Context Window",
    claude: "1M tokens",
    codex: "1.05M tokens",
    omc: "1M tokens (model-dependent)",
  },
  {
    metric: "Agent Modes",
    claude: "Claude Code, MCP tools",
    codex: "Codex CLI, GPT Actions",
    omc: "Explore, Librarian, Oracle, Sisyphus",
  },
  {
    metric: "MCP Support",
    claude: "✅ Native (97M+ installs)",
    codex: "❌ Not supported",
    omc: "✅ Plugin system",
  },
  {
    metric: "Community",
    claude: "~2M developers",
    codex: "~10M+ (ChatGPT base)",
    omc: "~50K (growing)",
  },
  {
    metric: "Best For",
    claude: "Complex agentic coding",
    codex: "General-purpose AI dev",
    omc: "Multi-agent orchestration",
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
          <CardTitle>Full Feature Comparison</CardTitle>
          <CardDescription>
            Side-by-side breakdown of key development platform metrics (Q3
            2026)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Metric</TableHead>
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
            Our Stack
          </CardTitle>
          <CardDescription>
            This dashboard was built with{" "}
            <strong>OpenCode (OMC) + DeepSeek V4 Flash</strong>. Zero API costs,
            multi-agent orchestration, 1M token context. Open-source through and
            through.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
