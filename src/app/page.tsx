import Link from "next/link";
import { BarChart3, BookOpen, DollarSign, Newspaper, Wrench, Globe, Compass, Target, FileText, Brain, Rocket, LayoutGrid, AlertTriangle, Clock } from "lucide-react";

const sections = [
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "핵심 지표",
    href: "/dashboard",
    desc: "4사 KPI 카드 · MAU/광고비 트렌드 · 4사 비교표",
    detail: "OpenAI, Anthropic, DeepSeek, Google의 유저 현황, 전환율, CAC, 시장 점유율을 한눈에",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "스토리",
    href: "/dashboard",
    desc: "타임라인 · 2026 AI 유저 파이 전쟁 연대기",
    detail: "QuitGPT 운동부터 Anthropic IPO까지 — AI 업계의 가장 극적인 순간들",
  },
  {
    icon: <DollarSign className="h-5 w-5" />,
    title: "API 가격 전쟁",
    href: "/dashboard",
    desc: "4사 18개 모델 토큰 가격 비교",
    detail: "DeepSeek $0.28 vs Claude $50 — 178배 가격 차이의 의미",
  },
  {
    icon: <Newspaper className="h-5 w-5" />,
    title: "뉴스",
    href: "/dashboard/news",
    desc: "4사 공식 블로그 피드 · 가격 변동 알림",
    detail: "최신 AI 업계 소식을 한국어로. 매일 오전 9시 업데이트",
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    title: "플랫폼 비교",
    href: "/dashboard/platforms",
    desc: "Claude Code · OpenAI Codex · OpenCode",
    detail: "AI 개발 도구 3종 성능·가격·커뮤니티 비교 + SWOT 분석",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "AI 인사이트",
    href: "/dashboard/insights",
    desc: "중국 모델 · NVIDIA · OpenRouter · 글로벌 AI",
    detail: "4사를 넘어 GLM, Qwen, Mistral, Grok, Llama까지 업계 전망",
  },
  {
    icon: <Compass className="h-5 w-5" />,
    title: "데이터 윤리 · 출처",
    href: "/dashboard/onboarding",
    desc: "데이터 윤리 6원칙 · 14개 출처 · 방법론",
    detail: "모든 데이터의 출처와 수집 방법론을 투명하게 공개합니다",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fdfcfc] dark:bg-[#1a1a1a]">
      {/* Header */}
      <header className="border-b border-[rgba(15,0,0,0.12)] dark:border-[rgba(255,255,255,0.08)]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="text-lg"><Globe className="h-5 w-5" /></span>
            <span className="text-sm font-semibold text-[#201d1d] dark:text-[#fdfcfc]">
              AI 유저 파이 전쟁
            </span>
          </div>
          <Link
            href="/dashboard"
            className="rounded-full border border-[rgba(15,0,0,0.12)] bg-[#201d1d] px-3 py-1.5 text-xs font-medium text-[#fdfcfc] transition-colors hover:bg-[#0f0000] dark:border-[rgba(255,255,255,0.2)] dark:bg-[#fdfcfc] dark:text-[#201d1d] dark:hover:bg-[#e8e8e8]"
          >
            대시보드 입장
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-[rgba(15,0,0,0.08)] dark:border-[rgba(255,255,255,0.06)]">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#201d1d] dark:text-[#fdfcfc] sm:text-4xl">
              AI 플랜 추천 — 당신에게 딱 맞는 AI 조합을 찾아드립니다
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[#424245] dark:text-[#a0a0a0] sm:text-lg">
              OpenAI, Anthropic, DeepSeek, Google —{' '}
              <strong className="text-[#201d1d] dark:text-[#fdfcfc]">20개+ AI 플랜</strong>
              중 당신의 상황 · 작업 · 예산에 가장 적합한 콤비네이션을{' '}
              <strong className="text-[#201d1d] dark:text-[#fdfcfc]">실제 벤치마크 데이터</strong>
              기반으로 추천합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/recommend"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#201d1d] px-5 py-2.5 text-sm font-medium text-[#fdfcfc] transition-colors hover:bg-[#0f0000] dark:bg-[#fdfcfc] dark:text-[#201d1d] dark:hover:bg-[#e8e8e8]"
              >
                <Target className="h-4 w-4" /> 추천 받기
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(15,0,0,0.12)] px-5 py-2.5 text-sm font-medium text-[#424245] transition-colors hover:bg-[#f8f7f7] dark:border-[rgba(255,255,255,0.15)] dark:text-[#a0a0a0] dark:hover:bg-[#2a2a2a]"
              >
                <BarChart3 className="h-4 w-4" /> 데이터 연구소
              </Link>
            </div>
            {/* How it works */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { step: "1", icon: <FileText className="h-6 w-6" />, title: "설문", desc: "6가지 질문에 답하면 당신의 상황을 파악합니다" },
                { step: "2", icon: <Brain className="h-6 w-6" />, title: "추천", desc: "벤치마크 기반 엔진이 최적의 조합을 찾습니다" },
                { step: "3", icon: <Rocket className="h-6 w-6" />, title: "적용", desc: "원화 결제 예상가와 수수료 절약 팁까지 제공" },
              ].map((item) => (
                <div key={item.step} className="rounded-sm border border-[rgba(15,0,0,0.08)] bg-[#f8f7f7] p-4 text-center dark:border-[rgba(255,255,255,0.06)] dark:bg-[#222]">
                  <span className="inline-flex justify-center text-muted-foreground">{item.icon}</span>
                  <p className="mt-1 text-sm font-semibold text-[#201d1d] dark:text-[#fdfcfc]">{item.step}. {item.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#646262] dark:text-[#888]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insights Preview */}
        <section className="border-b border-[rgba(15,0,0,0.08)] dark:border-[rgba(255,255,255,0.06)]">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              {[
                { value: "20+", label: "추천 플랜 조합" },
                { value: "9개", label: "AI 모델 SWOT 분석" },
                { value: "₩", label: "원화 결제 예상" },
                { value: "95%", label: "SWE-bench 최고 점수" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-sm border border-[rgba(15,0,0,0.08)] bg-[#f8f7f7] p-4 text-center dark:border-[rgba(255,255,255,0.06)] dark:bg-[#222]">
                  <p className="text-2xl font-bold text-[#201d1d] dark:text-[#fdfcfc]">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-[#646262] dark:text-[#888]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section>
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
            <h2 className="text-lg font-semibold text-[#201d1d] dark:text-[#fdfcfc]">
              <LayoutGrid className="h-5 w-5 inline -mt-0.5" /> 대시보드 목차
            </h2>
            <p className="mt-1 text-sm text-[#646262] dark:text-[#888]">
              각 탭에서 AI 업계의 다양한 데이터를 확인하세요
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {sections.map((section) => (
                <Link
                  key={section.title}
                  href={section.href}
                  className="group rounded-sm border border-[rgba(15,0,0,0.12)] p-4 transition-colors hover:bg-[#f8f7f7] dark:border-[rgba(255,255,255,0.1)] dark:hover:bg-[#222]"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex shrink-0 text-muted-foreground">{section.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-sm font-semibold text-[#201d1d] dark:text-[#fdfcfc]">
                          {section.title}
                        </h3>
                        <span className="shrink-0 text-xs text-[#9a9898] dark:text-[#666] transition-colors group-hover:text-[#201d1d] dark:group-hover:text-[#fdfcfc]">
                          바로가기 →
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-[#646262] dark:text-[#888]">
                        {section.desc}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[#9a9898] dark:text-[#666]">
                        {section.detail}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Data note */}
        <section className="border-t border-[rgba(15,0,0,0.08)] dark:border-[rgba(255,255,255,0.06)]">
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
            <div className="rounded-sm bg-[#f8f7f7] p-4 dark:bg-[#222]">
              <p className="text-xs font-medium text-[#201d1d] dark:text-[#fdfcfc]">
                <AlertTriangle className="h-4 w-4 inline -mt-0.5" /> 데이터 안내
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#646262] dark:text-[#888]">
                이 대시보드는 퍼포먼스 마케팅 분석 포트폴리오 프로젝트입니다. 모든 데이터는 공개 뉴스 · SEC filings · API 가격 페이지 · 업계 보고서 기반입니다.
                실제 기업 내부 데이터가 아닙니다. 각 데이터의 출처와 방법론은{' '}
                <Link href="/dashboard/onboarding" className="underline hover:text-[#201d1d] dark:hover:text-[#fdfcfc]">
                  온보딩 페이지
                </Link>
                에서 확인하세요.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[rgba(15,0,0,0.08)] dark:border-[rgba(255,255,255,0.06)]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <p className="text-xs text-[#9a9898] dark:text-[#666]">
            데이터 출처: SEC filings · Sensor Tower · SimilarWeb · 각사 공식 발표
          </p>
          <p className="text-xs text-[#9a9898] dark:text-[#666]">
            <Clock className="h-3.5 w-3.5 inline -mt-0.5" /> 2026년 7월 25일 기준
          </p>
        </div>
      </footer>
    </div>
  );
}