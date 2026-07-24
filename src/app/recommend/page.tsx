"use client";

import { useState, useMemo } from "react";
import { MODEL_SWOT, KRW_EXCHANGE_RATE } from "@/data/model-swot";
import Link from "next/link";

const QUESTIONS = [
  {
    id: "role", q: "당신의 현재 상황은?", sub: "상황에 맞는 플랜을 추천합니다", multi: false,
    options: [
      { value: "student", label: "중고등학생", emoji: "📚" },
      { value: "college", label: "대학(원)생", emoji: "🎓" },
      { value: "job-seeker", label: "취업준비생", emoji: "💼" },
      { value: "dev-worker", label: "직장인 (개발직)", emoji: "💻" },
      { value: "nondev-worker", label: "직장인 (비개발직)", emoji: "👔" },
      { value: "freelancer", label: "프리랜서", emoji: "🚀" },
      { value: "founder", label: "창업가", emoji: "🏢" },
      { value: "researcher", label: "연구원/교수", emoji: "🔬" },
      { value: "other", label: "기타", emoji: "🤷" },
    ]
  },
  {
    id: "task", q: "주로 어떤 작업을 하시나요?", sub: "중복 선택 가능합니다", multi: true,
    options: [
      { value: "web-dev", label: "웹/앱 개발", emoji: "🌐" },
      { value: "ai-ml", label: "AI/ML 모델 개발", emoji: "🧠" },
      { value: "game-dev", label: "게임 개발", emoji: "🎮" },
      { value: "data", label: "데이터 분석/리서치", emoji: "📊" },
      { value: "writing", label: "문서/보고서 작성", emoji: "✍️" },
      { value: "resume", label: "자소서/이력서/면접", emoji: "📝" },
      { value: "design", label: "디자인/영상 편집", emoji: "🎨" },
      { value: "marketing", label: "마케팅/광고 카피", emoji: "📢" },
      { value: "translate", label: "번역/외국어", emoji: "🌍" },
      { value: "study", label: "교육/학습", emoji: "📖" },
      { value: "chat", label: "일반 채팅/검색", emoji: "💬" },
    ]
  },
  {
    id: "env", q: "AI 도구 사용 환경은?", sub: "주로 사용하는 방식을 선택하세요", multi: false,
    options: [
      { value: "cli", label: "터미널/CLI", emoji: "⌨️", desc: "커맨드라인 중심" },
      { value: "web", label: "웹 채팅", emoji: "🌐", desc: "ChatGPT/Claude.ai" },
      { value: "api", label: "API/코드", emoji: "🔌", desc: "직접 API 호출" },
      { value: "ide", label: "IDE/에디터", emoji: "🖥️", desc: "VSCode/JetBrains" },
      { value: "mobile", label: "모바일", emoji: "📱", desc: "앱 위주" },
    ]
  },
  {
    id: "exp", q: "AI 사용 경험은?", sub: "현재 수준을 선택하세요", multi: false,
    options: [
      { value: "none", label: "처음이에요", emoji: "🌱" },
      { value: "basic", label: "기초 사용자", emoji: "🌿" },
      { value: "intermediate", label: "중급 사용자", emoji: "🌳" },
      { value: "advanced", label: "고급 사용자", emoji: "🏔️" },
      { value: "expert", label: "전문가", emoji: "🗻" },
    ]
  },
  {
    id: "budget", q: "월 예산 범위는?", sub: "AI 도구에 투자할 수 있는 금액", multi: false,
    options: [
      { value: "free", label: "무료", emoji: "🆓", price: "$0" },
      { value: "budget", label: "가성비", emoji: "💰", price: "$10-20/월" },
      { value: "standard", label: "표준", emoji: "💵", price: "$20-50/월" },
      { value: "pro", label: "프로", emoji: "💎", price: "$50-100/월" },
      { value: "unlimited", label: "제한 없음", emoji: "👑", price: "$100+/월" },
    ]
  },
  {
    id: "style", q: "선호하는 AI 스타일은?", sub: "평소 AI 도구를 선택하는 기준", multi: false,
    options: [
      { value: "precise", label: "정확/신뢰", emoji: "🎯", desc: "실수 없는 게 최우선" },
      { value: "fast", label: "빠름/다양", emoji: "⚡", desc: "여러 작업 빠르게" },
      { value: "value", label: "가성비", emoji: "💰", desc: "최소 비용 최대 효과" },
      { value: "context", label: "장문/멀티모달", emoji: "📄", desc: "긴 문서, 이미지/영상" },
      { value: "random", label: "추천해줘", emoji: "🤔", desc: "잘 모르겠어요" },
    ]
  },
];

const COMBO_DATA: Record<string, { title: string; emoji: string; plans: { slug: string; plan: string; price: string; reason: string[] }[]; krwNote: string }[]> = {
  "student": [
    { title: "학생 무료 코딩 스타터", emoji: "🎒", plans: [
      { slug: "opencode", plan: "무료 (OpenCode)", price: "$0", reason: ["완전 무료 오픈소스 — MIT 라이선스", "멀티에이전트 오케스트레이션 학습 가능", "CLI/IDE 모두 지원"] },
      { slug: "deepseek-v4-flash", plan: "DeepSeek V4 Flash API", price: "~$2/월", reason: ["$0.28/MTok — 부담 없는 실습 비용", "SWE-bench 79%로 학습에 충분"] },
    ], krwNote: "약 2,760원/월 (환율 1,380원 + 해외결제 수수료 3% 포함)" },
    { title: "대학생 리서치 콤비", emoji: "🎓", plans: [
      { slug: "sonnet-5", plan: "Claude Sonnet 5 ($2/$10)", price: "~$10/월", reason: ["SWE-bench 85.2%로 과제/코딩에 최적", "Claude Pro $20보다 경제적인 선택"] },
      { slug: "deepseek-v4-flash", plan: "DeepSeek V4 Flash API", price: "~$5/월", reason: ["대량 번역/리서치에 부담 없는 가격"] },
    ], krwNote: "약 21,390원/월 (수수료 포함)" },
  ],
  "job-seeker": [
    { title: "취업준비 종합 패키지", emoji: "💼", plans: [
      { slug: "gpt-5-5", plan: "ChatGPT Plus ($20/월)", price: "$20/월", reason: ["자소서/면접 준비에 최적화된 채팅 UI", "GPT-5.5의 구조적 글쓰기 능력"] },
      { slug: "opus-4-8", plan: "Claude Pro ($20/월)", price: "$20/월", reason: ["자소서 첨삭 품질 1위", "코딩테스트 준비에도 활용 가능"] },
    ], krwNote: "약 56,920원/월 (수수료 포함)" },
    { title: "개발자 취업 코딩 특화", emoji: "⌨️", plans: [
      { slug: "sonnet-5", plan: "Claude Code Pro ($20/월)", price: "$20/월", reason: ["코딩테스트 준비에 최적화", "CLI 기반 알고리즘 풀이"] },
      { slug: "deepseek-v4-flash", plan: "DeepSeek V4 Flash", price: "~$3/월", reason: ["코딩 연습 대량 생성에 부담 없음"] },
    ], krwNote: "약 33,810원/월 (수수료 포함)" },
  ],
  "dev-worker": [
    { title: "프로 개발자 풀세트", emoji: "💻", plans: [
      { slug: "opus-4-8", plan: "Claude Code Pro ($20/월) + API", price: "$20+$10", reason: ["SWE-bench 88.6% 코딩 표준", "실무 리팩토링/디버깅 최고"] },
      { slug: "gpt-5-5", plan: "GPT-5.5 API ($5/$30)", price: "~$20/월", reason: ["DevOps/터미널 작업 최강", "CI-CD 자동화에 특화"] },
      { slug: "deepseek-v4-flash", plan: "DeepSeek V4 Flash", price: "~$5/월", reason: ["대량 코드 리뷰/자동화에 비용 효율"] },
    ], krwNote: "약 82,800원/월 (수수료 포함)" },
    { title: "DevOps/터미널 특화", emoji: "⌨️", plans: [
      { slug: "gpt-5-5", plan: "GPT-5.5 Pro ($30/$180)", price: "~$50/월", reason: ["Terminal-Bench 82.7% 최고", "셸 스크립트/CI-CD 최적화"] },
      { slug: "opus-4-8", plan: "Claude Code Pro", price: "$20/월", reason: ["코드 리뷰/아키텍처 검토"] },
    ], krwNote: "약 103,500원/월 (수수료 포함)" },
  ],
  "nondev-worker": [
    { title: "비개발 직장인 문서 특화", emoji: "👔", plans: [
      { slug: "gpt-5-5", plan: "ChatGPT Plus ($20/월)", price: "$20/월", reason: ["보고서/이메일/회의록 작성 최적"] },
    ], krwNote: "약 28,460원/월 (수수료 포함)" },
    { title: "리서치/분석 중심", emoji: "🔍", plans: [
      { slug: "opus-4-8", plan: "Claude Pro ($20/월)", price: "$20/월", reason: ["GPQA Diamond 93.6% — 분석력 1위"] },
      { slug: "gemini-3-1", plan: "Gemini 3.1 Pro ($2/$12)", price: "~$10/월", reason: ["2M 컨텍스트로 대량 문서 처리"] },
    ], krwNote: "약 42,690원/월 (수수료 포함)" },
  ],
  "freelancer": [
    { title: "프리랜서 가성비 콤비", emoji: "🚀", plans: [
      { slug: "opus-4-8", plan: "Claude Code Pro ($20/월)", price: "$20/월", reason: ["코드 품질 = 수익, 에이전트로 생산성 2배"] },
      { slug: "deepseek-v4-pro", plan: "DeepSeek V4 Pro ($0.44/$0.87)", price: "~$10/월", reason: ["대량 작업은 DeepSeek으로 비용 절감"] },
    ], krwNote: "약 42,690원/월 (수수료 포함)" },
  ],
  "founder": [
    { title: "창업가 풀세트", emoji: "🏢", plans: [
      { slug: "opus-4-8", plan: "Claude Code Pro ($20/월)", price: "$20/월", reason: ["MVP 개발 속도 극대화"] },
      { slug: "gpt-5-5", plan: "ChatGPT Plus ($20/월)", price: "$20/월", reason: ["비즈니스 문서/투자자 피치"] },
      { slug: "deepseek-v4-flash", plan: "DeepSeek V4 Flash", price: "~$10/월", reason: ["대량 자동화에 비용 효율"] },
    ], krwNote: "약 71,150원/월 (수수료 포함)" },
  ],
  "researcher": [
    { title: "연구원 리서치 특화", emoji: "🔬", plans: [
      { slug: "gemini-3-1", plan: "Gemini 3.1 Pro ($2/$12)", price: "~$15/월", reason: ["2M 컨텍스트 — 논문/데이터 한 번에"] },
      { slug: "opus-4-8", plan: "Claude Pro ($20/월)", price: "$20/월", reason: ["GPQA 93.6% — 정확한 분석"] },
    ], krwNote: "약 49,710원/월 (수수료 포함)" },
  ],
};

const TASK_BEST: Record<string, string> = {
  "web-dev": "opus-4-8", "ai-ml": "opus-4-8", "game-dev": "opus-4-8",
  "data": "gemini-3-1", "writing": "fable-5", "resume": "opus-4-8",
  "design": "gpt-5-5", "marketing": "gpt-5-5", "translate": "deepseek-v4-flash",
  "study": "sonnet-5", "chat": "gpt-5-5",
};

function getKRW(usd: string): string {
  const n = parseFloat(usd.replace(/[^0-9.]/g, "")) || 0;
  const total = n * KRW_EXCHANGE_RATE * 1.03; // +3% foreign fee
  return Math.round(total).toLocaleString();
}

function getPlans(answers: Record<string, any>): ComboRecommendation[] {
  const role = answers.role as string;
  const tasks = answers.task as string[];
  const tasksKey = tasks?.[0] || "chat";
  const bestModel = TASK_BEST[tasksKey] || "opus-4-8";
  const combos = COMBO_DATA[role] || COMBO_DATA["student"];
  const primary: ComboRecommendation[] = combos.map(c => ({
    ...c,
    summary: `💰 총 월 $${c.plans.reduce((s, p) => s + (parseFloat(p.price.replace(/[^0-9.]/g, "")) || 0), 0).toFixed(0)} (약 ${getKRW(c.plans.reduce((s, p) => s + (parseFloat(p.price.replace(/[^0-9.]/g, "")) || 0), 0).toString())}원)`,
    benchmarkNote: `${MODEL_SWOT.find(m => m.slug === bestModel)?.specs.swebench || ""}`,
  }));
  return primary;
}

interface ComboRecommendation {
  title: string; emoji: string; plans: { slug: string; plan: string; price: string; reason: string[] }[];
  krwNote: string; summary: string; benchmarkNote: string;
}

const FEE_TIPS = [
  { name: "네이버페이 머니", fee: "0%", cashback: "최대 3%", link: "https://pay.naver.com", desc: "해외 결제 수수료 면제 + 네이버페이 포인트 적립" },
  { name: "토스뱅크 카드", fee: "0%", cashback: "최대 2%", link: "https://tossbank.com", desc: "해외 이용 수수료 무료 + 토스 포인트 적립" },
  { name: "KB국민 트래블러스 체크", fee: "0%", cashback: "최대 1.5%", link: "https://www.kbcard.com", desc: "해외 결제 수수료 면제 전용 카드" },
  { name: "신한 SOL 트래블 체크", fee: "0%", cashback: "최대 2%", link: "https://www.shinhancard.com", desc: "해외 가맹점 수수료 면제 + 여행 혜택" },
  { name: "현대카드 M (더블랙)", fee: "1%", cashback: "최대 3%", link: "https://www.hyundaicard.com", desc: "낮은 해외 수수료 + 마일리지 적립" },
  { name: "PayPal USD 결제", fee: "2.5%", cashback: "-", link: "https://www.paypal.com", desc: "미국 달러 결제 시 PayPal 환율 우대" },
];

export default function RecommendPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [done, setDone] = useState(false);
  const [showLegal, setShowLegal] = useState(false);

  const q = QUESTIONS[step];

  const toggle = (id: string, val: string) => {
    if (QUESTIONS.find(q => q.id === id)?.multi) {
      const arr = answers[id] || [];
      setAnswers(a => ({ ...a, [id]: arr.includes(val) ? arr.filter((v: string) => v !== val) : [...arr, val] }));
    } else {
      setAnswers(a => ({ ...a, [id]: val }));
    }
  };

  const next = () => {
    if (step < 5) setStep(s => s + 1);
    else setDone(true);
  };
  const prev = () => setStep(s => s - 1);

  const results = useMemo(() => done ? getPlans(answers) : [], [done, answers]);

  if (done) {
    return (
      <div className="min-h-screen bg-[#fdfcfc] dark:bg-[#1a1a1a]">
        <header className="border-b border-[rgba(15,0,0,0.12)] dark:border-[rgba(255,255,255,0.08)]">
          <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎯</span>
                <span className="text-sm font-semibold text-[#201d1d] dark:text-[#fdfcfc]">AI 플랜 추천</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setDone(false); setStep(0); setAnswers({}); }} className="rounded-full border border-[rgba(15,0,0,0.12)] px-3 py-1 text-xs text-[#424245] hover:bg-[#f8f7f7] dark:border-[rgba(255,255,255,0.15)] dark:text-[#a0a0a0] dark:hover:bg-[#222]">다시 설문하기</button>
                <Link href="/dashboard" className="rounded-full border border-[rgba(15,0,0,0.12)] px-3 py-1 text-xs text-[#424245] hover:bg-[#f8f7f7] dark:border-[rgba(255,255,255,0.15)] dark:text-[#a0a0a0] dark:hover:bg-[#222]">📊 데이터 연구소</Link>
              </div>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          {results.map((r, i) => (
            <div key={i} className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{r.emoji}</span>
                <div>
                  <h1 className="text-2xl font-bold text-[#201d1d] dark:text-[#fdfcfc]">{r.title}</h1>
                  <p className="text-sm text-[#646262] dark:text-[#888]">{r.summary}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {r.plans.map((p, j) => {
                  const sw = MODEL_SWOT.find(m => m.slug === p.slug);
                  return (
                    <div key={j} className="rounded-sm border border-[rgba(15,0,0,0.12)] bg-[#f8f7f7] p-4 dark:border-[rgba(255,255,255,0.1)] dark:bg-[#222]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-[#201d1d] dark:text-[#fdfcfc]">{p.plan}</span>
                        {sw && <span className="text-[0.55rem] text-[#646262] px-1.5 py-0.5 rounded-full bg-[#fdfcfc] dark:bg-[#333]">{sw.priceIn}/{sw.priceOut}</span>}
                      </div>
                      <p className="text-lg font-bold text-[#201d1d] dark:text-[#fdfcfc]">{p.price}</p>
                      <ul className="mt-3 space-y-1">
                        {p.reason.map((r2, k) => (
                          <li key={k} className="flex items-start gap-1.5 text-[0.6rem] text-[#424245] dark:text-[#a0a0a0]">
                            <span className="mt-0.5 shrink-0">✓</span><span>{r2}</span>
                          </li>
                        ))}
                      </ul>
                      {sw && sw.specs.swebench !== "N/A" && sw.specs.swebench !== "N/A†" && (
                        <p className="mt-2 text-[0.5rem] text-[#9a9898] dark:text-[#666]">Benchmark: SWE-bench {sw.specs.swebench} · GPQA {sw.specs.gpqa}</p>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* KRW Pricing */}
              <div className="rounded-sm border border-[rgba(15,0,0,0.12)] bg-[#fdfcfc] p-4 dark:border-[rgba(255,255,255,0.1)] dark:bg-[#1a1a1a]">
                <p className="text-xs font-semibold text-[#201d1d] dark:text-[#fdfcfc]">💰 한국 원화 결제 예상</p>
                <p className="mt-1 text-[0.6rem] text-[#424245] dark:text-[#a0a0a0]">{r.krwNote}</p>
                <p className="mt-1 text-[0.55rem] text-[#9a9898] dark:text-[#666]">※ 환율: 1 USD = {KRW_EXCHANGE_RATE}원 (변동 가능) · 해외 결제 수수료 3% 포함 · 실시간 환율은 매일 갱신</p>
              </div>
            </div>
          ))}
          {/* Fee Saving Tips */}
          <div className="mt-8 border-t border-[rgba(15,0,0,0.08)] pt-6 dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-[#201d1d] dark:text-[#fdfcfc]">💡 해외 결제 수수료 절약 팁</p>
              <button onClick={() => setShowLegal(!showLegal)} className="text-[0.55rem] text-[#9a9898] underline hover:text-[#646262]">법적 고지</button>
            </div>
            {showLegal && (
              <div className="rounded-sm border border-[rgba(15,0,0,0.12)] bg-amber-50/50 p-3 mb-3 dark:border-[rgba(255,255,255,0.1)] dark:bg-amber-950/20">
                <p className="text-[0.55rem] text-[#646262] leading-relaxed">
                  ⚖️ 법적 고지: 당사는 아래 링크된 업체로부터 어떠한 금전적 보상도 받지 않습니다. 
                  링크는 일반 정보 제공 목적이며, 특정 상품의 가입을 권유하지 않습니다. 
                  각 카드사의 약관과 수수료 정책은 변경될 수 있으므로 가입 전 반드시 확인하세요. 
                  대한민국 「표시광고법」 및 「전자상거래법」을 준수합니다.
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {FEE_TIPS.map((tip, i) => (
                <a key={i} href={tip.link} target="_blank" rel="noopener noreferrer"
                  className="block rounded-sm border border-[rgba(15,0,0,0.12)] p-3 hover:bg-[#f8f7f7] dark:border-[rgba(255,255,255,0.1)] dark:hover:bg-[#222] group">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#201d1d] dark:text-[#fdfcfc]">{tip.name}</p>
                    <span className="text-[0.55rem] text-[#007aff] opacity-0 group-hover:opacity-100 transition-opacity">바로가기 →</span>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[0.55rem] px-1.5 py-0.5 rounded-full bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">수수료 {tip.fee}</span>
                    {tip.cashback !== "-" && <span className="text-[0.55rem] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">캐시백 {tip.cashback}</span>}
                  </div>
                  <p className="mt-1.5 text-[0.55rem] text-[#646262] dark:text-[#888]">{tip.desc}</p>
                </a>
              ))}
            </div>
            <p className="mt-2 text-[0.5rem] text-[#9a9898] dark:text-[#666]">※ 제휴 마케팅 링크가 아닙니다. 업체로부터 대가를 받지 않습니다. 정보는 참고용입니다.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfcfc] dark:bg-[#1a1a1a] flex flex-col">
      <header className="border-b border-[rgba(15,0,0,0.12)] dark:border-[rgba(255,255,255,0.08)]">
        <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <span className="text-sm font-semibold text-[#201d1d] dark:text-[#fdfcfc]">AI 플랜 추천</span>
          </div>
          <Link href="/dashboard" className="rounded-full border border-[rgba(15,0,0,0.12)] px-3 py-1 text-xs text-[#424245] hover:bg-[#f8f7f7] dark:border-[rgba(255,255,255,0.15)] dark:text-[#a0a0a0] dark:hover:bg-[#222]">📊 연구소</Link>
        </div>
      </header>
      <main className="flex-1 mx-auto max-w-2xl px-4 py-12 sm:px-6 w-full">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-[#646262] dark:text-[#888]">질문 {step + 1} / {QUESTIONS.length}</p>
            <p className="text-xs font-medium text-[#201d1d] dark:text-[#fdfcfc]">{q.q}</p>
          </div>
          <div className="h-1.5 rounded-full bg-[#f1eeee] dark:bg-[#333]">
            <div className="h-1.5 rounded-full bg-[#201d1d] dark:bg-[#fdfcfc] transition-all duration-300" style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
          </div>
          <p className="mt-1 text-[0.6rem] text-[#9a9898] dark:text-[#666]">{q.sub}</p>
        </div>
        {/* Question */}
        <div className="space-y-3">
          {q.options.map((opt: any) => {
            const selected = q.multi ? (answers[q.id] || []).includes(opt.value) : answers[q.id] === opt.value;
            return (
              <button key={opt.value} onClick={() => toggle(q.id, opt.value)}
                className={`w-full flex items-center gap-3 rounded-full border px-4 py-3 text-left text-sm transition-all ${
                  selected
                    ? "border-[#201d1d] bg-[#201d1d] text-[#fdfcfc] dark:border-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]"
                    : "border-[rgba(15,0,0,0.12)] text-[#424245] hover:bg-[#f8f7f7] dark:border-[rgba(255,255,255,0.15)] dark:text-[#a0a0a0] dark:hover:bg-[#222]"
                }`}
              >
                <span className="text-lg">{opt.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold">{opt.label}</p>
                  {opt.desc && <p className="text-[0.6rem] text-inherit opacity-70">{opt.desc}</p>}
                  {opt.price && <p className="text-[0.55rem] text-inherit opacity-50">{opt.price}</p>}
                </div>
                {selected && <span className="text-sm">✓</span>}
              </button>
            );
          })}
        </div>
        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button onClick={prev} disabled={step === 0}
            className="rounded-full border border-[rgba(15,0,0,0.12)] px-4 py-2 text-xs text-[#424245] hover:bg-[#f8f7f7] disabled:opacity-30 dark:border-[rgba(255,255,255,0.15)] dark:text-[#a0a0a0] dark:hover:bg-[#222]">
            ← 이전
          </button>
          <button onClick={next}
            className="rounded-full bg-[#201d1d] px-6 py-2 text-xs font-medium text-[#fdfcfc] hover:bg-[#0f0000] dark:bg-[#fdfcfc] dark:text-[#201d1d] dark:hover:bg-[#e8e8e8]">
            {step < 5 ? "다음 →" : "🎯 추천 받기"}
          </button>
        </div>
      </main>
    </div>
  );
}