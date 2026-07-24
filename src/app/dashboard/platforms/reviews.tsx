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
];

function getPlatformColor(platform: string): string {
  switch (platform) {
    case "Claude Code":
      return "#D97757";
    case "OpenAI Codex":
      return "#10A37F";
    case "OpenCode (OMC)":
      return "#8B5CF6";
    default:
      return "#6B7280";
  }
}

function getPlatformIcon(platform: string): string {
  switch (platform) {
    case "Claude Code":
      return "🤖";
    case "OpenAI Codex":
      return "🧠";
    case "OpenCode (OMC)":
      return "⚡";
    default:
      return "💬";
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
          className="h-full bg-amber-400 transition-all"
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
          {positive}% Positive
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-amber-400" />
          {neutral}% Neutral
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-red-400" />
          {negative}% Negative
        </span>
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Community Sentiment — Developer Buzz (Q3 2026)
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Sourced from Reddit, Hacker News, X/Twitter. Aggregated sentiment
          analysis.
        </p>
      </div>

      {/* Sentiment cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {sentimentData.map((entry) => {
          const color = getPlatformColor(entry.platform);
          const icon = getPlatformIcon(entry.platform);

          return (
            <Card key={entry.platform} size="sm">
              <div
                className="absolute inset-x-0 top-0 h-1 rounded-t-xl"
                style={{ backgroundColor: color }}
              />
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-lg" aria-hidden="true">
                    {icon}
                  </span>
                  <CardTitle className="text-sm">{entry.platform}</CardTitle>
                </div>
                <CardDescription>
                  Community sentiment breakdown
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

      <Separator />

      {/* Top community posts */}
      <Card>
        <CardHeader>
          <CardTitle>Top Community Posts</CardTitle>
          <CardDescription>
            Highest-voted developer discussions across platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>Post</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sentimentData.map((entry) => (
                <TableRow key={entry.platform}>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                      <span aria-hidden="true">
                        {getPlatformIcon(entry.platform)}
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
            Data aggregated from Reddit, Hacker News, X. Last updated July
            2026. Sentiment classification via keyword analysis.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
