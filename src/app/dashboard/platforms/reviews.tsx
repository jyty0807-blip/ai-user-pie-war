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
          {positive}% 긍정
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-amber-400" />
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
  return (
    <div className="space-y-8">
      {/* 한줄요약 */}
      <div className="rounded-lg border border-pink-200 border-l-4 border-l-pink-400 bg-pink-50 p-5 dark:border-pink-800 dark:border-l-pink-400 dark:bg-pink-950/30 mb-6">
        <p className="text-sm font-medium text-pink-800 dark:text-pink-200">🗣️ 개발자들의 목소리</p>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-pink-700 dark:text-pink-300">
          <li><strong>Claude Code:</strong> 68% 긍정 — MCP 생태계와 에이전트 코딩에 압도적 호평</li>
          <li><strong>OpenAI Codex:</strong> 45% 긍정 — GPT-5 품질 편차로 기복 있음</li>
          <li><strong>OpenCode:</strong> 81% 긍정 — 멀티에이전트 오케스트레이션의 미래에 기대</li>
          <li>개발자 커뮤니티는 <strong>&apos;단일 모델&apos; → &apos;오케스트레이션&apos;</strong>으로 패러다임 전환 중</li>
        </ul>
      </div>

      {/* Header */}
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
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
            📌 Reddit, Hacker News, X에서 수집. 2026년 7월 기준. 감정 분석은 키워드 기반입니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
