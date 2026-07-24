"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ShieldCheck, Database, Newspaper, Scale, FileText, Info, Compass, ScrollText, FolderOpen, Cog, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ethicsPrinciples = [
  {
    icon: <Database className="h-4 w-4" />,
    title: "출처 표시 원칙",
    desc: "모든 데이터는 공개 출처에서 수집하며, 출처를 명시합니다. 내부 데이터나 비공개 정보는 사용하지 않습니다.",
  },
  {
    icon: <Newspaper className="h-4 w-4" />,
    title: "뉴스 콘텐츠 저작권 존중",
    desc: "뉴스는 전문(full-text)을 복사하지 않습니다. 요약(snippet) + 원문 링크만 제공합니다. 공식 RSS 피드만 활용합니다.",
  },
  {
    icon: <Scale className="h-4 w-4" />,
    title: "데이터 추정치 투명성",
    desc: "일부 수치는 공개 데이터 기반 추정치입니다. 추정치임을 명확히 표기하고, 실제 값과 차이가 있을 수 있음을 안내합니다.",
  },
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    title: "커뮤니티 데이터 윤리",
    desc: "Reddit, Hacker News 등 커뮤니티 데이터는 공개 API를 통해서만 수집합니다. 개인 식별 정보는 수집하지 않습니다.",
  },
  {
    icon: <FileText className="h-4 w-4" />,
    title: "면접 포트폴리오 목적 고지",
    desc: "이 대시보드는 포트폴리오/교육 목적입니다. 실제 기업 내부 데이터가 아니며, 투자 결정에 활용해서는 안 됩니다.",
  },
  {
    icon: <Info className="h-4 w-4" />,
    title: "데이터 정확성 책임",
    desc: "데이터는 정기적으로 업데이트되지만, 실시간 정확성을 보장하지 않습니다. 오류 발견 시 수정하고 기록합니다.",
  },
];

const dataSources = [
  {
    category: "시장 데이터",
    items: [
      { name: "SEC Filings", desc: "OpenAI, Anthropic의 공시 자료 및 IPO 공개 문서", url: "https://www.sec.gov" },
      { name: "Sensor Tower", desc: "앱 다운로드, MAU 추정, 앱 스토어 랭킹 데이터", url: "https://sensortower.com" },
      { name: "Similarweb", desc: "웹 트래픽, 방문자 수, 참여도 추정", url: "https://similarweb.com" },
      { name: "FourWeekMBA", desc: "AI 기업 비즈니스 모델 및 시장 분석", url: "https://fourweekmba.com" },
    ],
  },
  {
    category: "API 가격 정보",
    items: [
      { name: "OpenAI Pricing", desc: "GPT-5.x 모델군 공식 가격 페이지", url: "https://developers.openai.com/api/docs/pricing" },
      { name: "Anthropic Pricing", desc: "Claude 모델군 공식 가격 페이지", url: "https://anthropic.com/pricing" },
      { name: "Google AI Pricing", desc: "Gemini 모델군 공식 가격 페이지", url: "https://ai.google.dev/gemini-api/docs/pricing" },
      { name: "DeepSeek Pricing", desc: "DeepSeek V4 공식 가격 페이지", url: "https://api-docs.deepseek.com/quick_start/pricing" },
      { name: "Developers Digest", desc: "AI API 가격 비교 및 분석 (2026년 7월)", url: "https://www.developersdigest.tech/blog/frontier-model-api-pricing-june-2026" },
    ],
  },
  {
    category: "뉴스 · 공식 발표",
    items: [
      { name: "OpenAI Blog", desc: "제품 출시, 연구 발표, 회사 소식", url: "https://openai.com/blog" },
      { name: "Anthropic Blog", desc: "Claude 업데이트, 연구, 회사 발표", url: "https://anthropic.com/blog" },
      { name: "Google AI Blog", desc: "Gemini, AI 연구, 제품 업데이트", url: "https://blog.google/technology/ai/" },
      { name: "DeepSeek API Docs", desc: "모델 업데이트, 가격 변동 공지", url: "https://api-docs.deepseek.com" },
    ],
  },
  {
    category: "커뮤니티 데이터",
    items: [
      { name: "Reddit (r/programming, r/ClaudeAI, r/OpenAI)", desc: "개발자 커뮤니티 반응 및 토론 (공개 API)", url: "https://www.reddit.com/r/programming/" },
      { name: "Hacker News", desc: "AI 업계 뉴스 및 개발자 의견 (공개 API)", url: "https://news.ycombinator.com" },
      { name: "X/Twitter", desc: "AI 업계 관계자 및 전문가 의견 (공개 데이터)", url: "https://x.com" },
    ],
  },
];

export default function OnboardingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-10 text-center">
        <h1 className="inline-flex items-center gap-1.5 rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]">
          <Compass className="h-3.5 w-3.5" />데이터 윤리 · 출처 안내
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
          이 대시보드는 신뢰할 수 있는 데이터와 윤리적인 정보 수집을 원칙으로 합니다.
          모든 데이터의 출처와 수집 방법론을 투명하게 공개합니다.
        </p>
      </div>

      {/* Data Ethics Principles */}
      <div className="mb-10">
        <h2 className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]"><ScrollText className="h-3.5 w-3.5" />데이터 윤리 지침</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ethicsPrinciples.map((principle, idx) => (
            <Card key={idx} className="border-l" style={{ borderLeftColor: "var(--primary)" }}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-primary">{principle.icon}</span>
                  <CardTitle className="text-sm font-semibold">{principle.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">{principle.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Data Sources */}
      <div className="mb-10">
        <h2 className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]"><FolderOpen className="h-3.5 w-3.5" />데이터 출처</h2>
        <Accordion className="space-y-2">
          {dataSources.map((group) => (
            <AccordionItem
              key={group.category}
              value={group.category}
              className="rounded-sm border border-border bg-card px-4"
            >
              <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-3">
                {group.category}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pb-3">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-start justify-between rounded-md bg-muted p-2.5"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
                        <p className="text-[0.65rem] text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 shrink-0 inline-flex items-center gap-1 rounded-full bg-background px-2 py-1 text-[0.6rem] text-muted-foreground hover:text-foreground transition-colors border border-border"
                      >
                        방문
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Methodology */}
      <div className="mb-10">
        <h2 className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]"><Cog className="h-3.5 w-3.5" />데이터 수집 방법론</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-foreground">1. 광고비 및 시장 점유율</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                SEC filings, IPO 공개 자료, 시장 조사 기관(Sensor Tower, Similarweb)의 보고서를 기반으로 추정.
                각 기업의 분기별 실적 발표와 업계 보고서를 교차 검증하여 신뢰도를 높였습니다.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-foreground">2. API 가격 정보</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                각사 공식 API 가격 페이지에서 직접 수집. 2026년 7월 기준으로 검증 완료.
                가격 변동 시 업데이트하며, 프로모션 가격과 정규 가격을 구분하여 표시합니다.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-foreground">3. 뉴스 콘텐츠</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                각사 공식 블로그 RSS 피드 및 보도자료에서 수집. 저작권을 존중하여 전문(full-text)을
                복사하지 않고 요약(snippet)과 원문 링크만 제공합니다. AI가 요약을 생성하며,
                중요한 맥락은 원문에서 직접 확인하도록 안내합니다.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-foreground">4. 커뮤니티 감정 분석</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Reddit, Hacker News, X/Twitter의 공개 API를 통해 수집된 게시물의 키워드 기반 감정 분석.
                개인 식별 정보는 수집하지 않으며, 집계된 통계만 제공합니다.
                감정 분류는 자동화된 키워드 분석으로 ±10%의 오차가 있을 수 있습니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Disclaimer */}
      <div className="rounded-sm border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/50">
        <div className="flex items-start gap-3">
          <span className="shrink-0 text-amber-500"><AlertTriangle className="h-5 w-5" /></span>
          <div>
            <p className="inline-flex rounded-full bg-[#201d1d] px-4 py-1.5 text-xs font-bold text-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]">
              면접 포트폴리오 목적 고지
            </p>
            <p className="mt-1 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              이 대시보드는 퍼포먼스 마케팅 역량을 평가받기 위한 포트폴리오 프로젝트입니다.
              모든 데이터는 공개 출처 기반 추정치이며, 실제 기업 내부 데이터가 아닙니다.
              투자, 채용, 비즈니스 의사결정에 이 데이터를 활용해서는 안 됩니다.
              데이터 오류나 누락에 대해 책임지지 않습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-[0.6rem] text-muted-foreground">
        <p>데이터 윤리 문의: 이 프로젝트는 오픈소스입니다. 이슈나 PR로 데이터 오류를 제보해 주세요.</p>
        <p className="mt-1">Last updated: 2026년 7월 25일</p>
      </div>
    </div>
  );
}