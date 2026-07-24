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
  {
    id: "service", q: "주로 몇 개의 AI 서비스를 사용하시나요?", sub: "하나만 집중할지, 여러 개 조합할지 선택하세요", multi: false,
    options: [
      { value: "single", label: "1개만 사용할게요", emoji: "1️⃣" },
      { value: "multi", label: "여러 개 써볼게요", emoji: "2️⃣" },
      { value: "many", label: "가리지 않고 다 써요", emoji: "♾️" },
    ]
  },
];

const COMBO_DATA: Record<string, { title: string; emoji: string; plans: { slug: string; plan: string; price: string; type: "subscription" | "api"; reason: string[] }[]; krwNote: string }[]> = {
  "student": [
    { title: "학생 무료 스타터", emoji: "🎒", plans: [
      { slug: "opencode", plan: "OpenCode (OMC)", price: "무료", type: "subscription", reason: ["완전 무료 오픈소스 — MIT 라이선스", "CLI/터미널 기반, 학습용으로 최적"] },
      { slug: "deepseek-v4-flash", plan: "DeepSeek V4 Flash", price: "약 $3/월", type: "api", reason: ["$0.28/MTok — 기초 코딩 학습에 부담 없는 가격", "1M 컨텍스트로 다양한 실습 가능"] },
    ], krwNote: "약 4,140원/월 (무료 도구 + 소량 API 사용 기준)" },
    { title: "대학생 할인 콤비", emoji: "🎓", plans: [
      { slug: "sonnet-5", plan: "ChatGPT Plus (교육 할인)", price: "$15/월", type: "subscription", reason: ["교육 할인 적용 시 정가 대비 25% 저렴", "과제/리서치에 GPT-5 활용"] },
      { slug: "deepseek-v4-flash", plan: "DeepSeek V4 Flash", price: "약 $5/월", type: "api", reason: ["대량 번역/리서치에 경제적"] },
    ], krwNote: "약 28,460원/월 (교육 할인 적용)" },
  ],
  "college": [
    { title: "대학생 연구 중심", emoji: "🔬", plans: [
      { slug: "sonnet-5", plan: "ChatGPT Plus (교육 할인)", price: "$15/월", type: "subscription", reason: ["할인된 가격으로 프론티어 모델 사용"] },
      { slug: "gemini-3-1", plan: "Gemini Advanced", price: "$22/월", type: "subscription", reason: ["2M 컨텍스트로 논문/리포트 한 번에 처리"] },
    ], krwNote: "약 52,510원/월 (교육 할인 + 구독 2개)" },
  ],
  "job-seeker": [
    { title: "취업준비 필수 패키지", emoji: "💼", plans: [
      { slug: "gpt-5-5", plan: "ChatGPT Plus", price: "$20/월", type: "subscription", reason: ["자소서/면접 준비에 최적화된 UI", "GPT-5.5의 구조적 글쓰기 능력 활용"] },
      { slug: "opus-4-8", plan: "Claude Pro", price: "$20/월", type: "subscription", reason: ["자소서 첨삭 품질 1위", "코딩테스트 준비 병행 가능"] },
    ], krwNote: "약 56,920원/월 (구독 2개)" },
    { title: "개발자 취업 코딩 특화", emoji: "⌨️", plans: [
      { slug: "sonnet-5", plan: "Claude Code Pro", price: "$20/월", type: "subscription", reason: ["코딩테스트 준비에 최적화"] },
      { slug: "deepseek-v4-flash", plan: "DeepSeek V4 Flash", price: "약 $3/월", type: "api", reason: ["코딩 연습 대량 생성에 부담 없음"] },
    ], krwNote: "약 33,810원/월 (구독 1개 + 소량 API)" },
  ],
  "dev-worker": [
    { title: "프로 개발자 필수 구성", emoji: "💻", plans: [
      { slug: "opus-4-8", plan: "Claude Code Pro", price: "$20/월", type: "subscription", reason: ["SWE-bench 88.6%, 실무 코딩 표준"] },
      { slug: "gpt-5-5", plan: "ChatGPT Plus", price: "$20/월", type: "subscription", reason: ["DevOps/터미널 작업 + 문서 생성 병행"] },
      { slug: "deepseek-v4-flash", plan: "DeepSeek V4 Flash", price: "약 $10/월", type: "api", reason: ["코드 리뷰/자동화에 API 소량 활용"] },
    ], krwNote: "약 71,150원/월 (구독 2개 + 소량 API)" },
    { title: "고급 개발자 풀옵션", emoji: "🚀", plans: [
      { slug: "opus-4-8", plan: "Claude Code Pro + API", price: "$20+$30", type: "api", reason: ["메인 코딩 에이전트 + 직접 API 호출"] },
      { slug: "gpt-5-5", plan: "GPT-5.5 API", price: "약 $50/월", type: "api", reason: ["Terminal-Bench 82.7% DevOps 특화"] },
      { slug: "deepseek-v4-flash", plan: "DeepSeek V4 Flash", price: "약 $20/월", type: "api", reason: ["대량 배치 작업 비용 최적화"] },
    ], krwNote: "약 172,500원/월 (API 중간 사용량 기준)" },
  ],
  "nondev-worker": [
    { title: "비개발 직장인 스탠다드", emoji: "👔", plans: [
      { slug: "gpt-5-5", plan: "ChatGPT Plus", price: "$20/월", type: "subscription", reason: ["보고서/이메일/회의록 작성 최적"] },
    ], krwNote: "약 28,460원/월 (단일 구독)" },
    { title: "리서치/분석 강화", emoji: "🔍", plans: [
      { slug: "opus-4-8", plan: "Claude Pro", price: "$20/월", type: "subscription", reason: ["GPQA Diamond 93.6% 정확도 1위"] },
      { slug: "gemini-3-1", plan: "Gemini Advanced", price: "$22/월", type: "subscription", reason: ["2M 컨텍스트로 방대한 문서 처리"] },
    ], krwNote: "약 59,800원/월 (구독 2개)" },
  ],
  "freelancer": [
    { title: "프리랜서 표준 구성", emoji: "🚀", plans: [
      { slug: "opus-4-8", plan: "Claude Code Pro", price: "$20/월", type: "subscription", reason: ["코드 품질 = 수익, 생산성 2배"] },
      { slug: "deepseek-v4-pro", plan: "DeepSeek V4 Pro", price: "약 $15/월", type: "api", reason: ["대량 작업 DeepSeek으로 비용 절감"] },
    ], krwNote: "약 49,710원/월 (구독 + API 소량)" },
    { title: "프리랜서 고효율 구성", emoji: "⚡", plans: [
      { slug: "opus-4-8", plan: "Claude Code Pro + API", price: "$20+$50", type: "api", reason: ["메인 코딩 + API 직접 호출 병행"] },
      { slug: "gpt-5-5", plan: "GPT-5.5 API", price: "약 $30/월", type: "api", reason: ["다양한 작업 빠르게 처리"] },
      { slug: "deepseek-v4-flash", plan: "DeepSeek V4 Flash", price: "약 $30/월", type: "api", reason: ["대량 자동화에 극한 비용 효율"] },
    ], krwNote: "약 186,300원/월 (API 중간 사용량 기준)" },
  ],
  "founder": [
    { title: "스타트업 필수 세트", emoji: "🏢", plans: [
      { slug: "opus-4-8", plan: "Claude Code Pro", price: "$20/월", type: "subscription", reason: ["MVP 개발 속도 극대화"] },
      { slug: "gpt-5-5", plan: "ChatGPT Plus", price: "$20/월", type: "subscription", reason: ["비즈니스 문서/투자자 피치"] },
      { slug: "deepseek-v4-flash", plan: "DeepSeek V4 Flash", price: "약 $20/월", type: "api", reason: ["자동화/배치 작업 비용 최적화"] },
    ], krwNote: "약 85,560원/월 (구독 2개 + 소량 API)" },
  ],
  "researcher": [
    { title: "연구원 리서치 특화", emoji: "🔬", plans: [
      { slug: "gemini-3-1", plan: "Gemini Advanced", price: "$22/월", type: "subscription", reason: ["2M 컨텍스트 — 논문/데이터 한 번에"] },
      { slug: "opus-4-8", plan: "Claude Pro", price: "$20/월", type: "subscription", reason: ["GPQA 93.6%, 정확한 분석 필수"] },
    ], krwNote: "약 59,800원/월 (구독 2개, 논문 분석 최적)" },
    { title: "연구원 데이터 집중", emoji: "📊", plans: [
      { slug: "gemini-3-1", plan: "Gemini Advanced", price: "$22/월", type: "subscription", reason: ["대용량 데이터 처리에 2M 컨텍스트 활용"] },
      { slug: "opus-4-8", plan: "Claude Pro", price: "$20/월", type: "subscription", reason: ["데이터 분석 및 논문 작성"] },
      { slug: "deepseek-v4-flash", plan: "DeepSeek V4 Flash", price: "약 $10/월", type: "api", reason: ["데이터 전처리/배치 분석"] },
    ], krwNote: "약 74,290원/월 (구독 2개 + API)" },
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
  if (n === 0) return "무료";
  const total = n * 1474 * 1.03;
  if (total < 1000) return `${Math.round(total).toLocaleString()}원`;
  return `${Math.round(total / 10) * 10}원`;
}

function getTotalUSD(plans: { price: string; type: string }[]): number {
  let total = 0;
  for (const p of plans) {
    const nums = p.price.match(/[\d.]+/g);
    if (nums) {
      if (p.type === "api") {
        const vals = nums.map(Number);
        if (vals.length === 1) total += vals[0];
        else total += vals[Math.floor(vals.length / 2)];
      } else {
        // Subscription: take the first number
        total += parseFloat(nums[0]);
      }
    }
  }
  return Math.round(total);
}

function getPlans(answers: Record<string, string | string[]>): ComboRecommendation[] {
  const role = answers.role as string;
  const tasks = answers.task as string[];
  const tasksKey = tasks?.[0] || "chat";
  const bestModel = TASK_BEST[tasksKey] || "opus-4-8";
  const combos = COMBO_DATA[role] || COMBO_DATA["student"];
  const primary: ComboRecommendation[] = combos.map(c => ({
    ...c,
    totalUSD: getTotalUSD(c.plans),
    summary: `💰 총 월 $${getTotalUSD(c.plans)} (약 ${getKRW(getTotalUSD(c.plans).toString())})`,
    benchmarkNote: `${MODEL_SWOT.find(m => m.slug === bestModel)?.specs.swebench || ""}`,
  }));
  return primary;
}

interface ComboRecommendation {
  title: string; emoji: string; plans: { slug: string; plan: string; price: string; type: string; reason: string[] }[];
  krwNote: string; summary: string; benchmarkNote: string; totalUSD: number;
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
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [done, setDone] = useState(false);
  const [showLegal, setShowLegal] = useState(false);

  const q = QUESTIONS[step];

  const toggle = (id: string, val: string) => {
    if (QUESTIONS.find(q => q.id === id)?.multi) {
      const arr = (answers[id] || []) as string[];
      setAnswers(a => ({ ...a, [id]: arr.includes(val) ? arr.filter((v: string) => v !== val) : [...arr, val] }));
    } else {
      setAnswers(a => ({ ...a, [id]: val }));
    }
  };

  const next = () => {
    if (step < QUESTIONS.length - 1) setStep(s => s + 1);
    else setDone(true);
  };
  const prev = () => setStep(s => s - 1);

  const results = useMemo(() => done ? getPlans(answers) : [], [done, answers]);

  if (done) {
    const topResults = results.slice(0, 3);
    return (
      <div className="min-h-screen bg-[#fdfcfc] dark:bg-[#1a1a1a]">
        <header className="border-b border-[rgba(15,0,0,0.08)] dark:border-[rgba(255,255,255,0.06)]">
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
        <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <p className="text-xs text-[#9a9898] dark:text-[#666] mb-8">
            {answers.role && `현재 상황 · `}{answers.task && `주요 작업 · `}{answers.exp && `AI 경험 · `}
            {topResults.length}개의 추천 플랜
          </p>

          {topResults.map((r, i) => (
            <div key={i} className="rounded-xl shadow-sm border border-[rgba(15,0,0,0.08)] bg-[#fdfcfc] p-6 mb-6 hover:shadow-md transition-shadow dark:border-[rgba(255,255,255,0.08)] dark:bg-[#1a1a1a]">
              {/* Combo title */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{r.emoji}</span>
                <div>
                  <h1 className="text-2xl font-bold text-[#201d1d] dark:text-[#fdfcfc]">{r.title}</h1>
                  <p className="text-sm text-[#646262] dark:text-[#888] mt-0.5">{r.summary}</p>
                </div>
              </div>

              {/* Plan cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-5">
                {r.plans.map((p, j) => {
                  const sw = MODEL_SWOT.find(m => m.slug === p.slug);
                  return (
                    <div key={j} className="rounded-xl border border-[rgba(15,0,0,0.08)] bg-[#fdfcfc] shadow-sm p-5 dark:border-[rgba(255,255,255,0.08)] dark:bg-[#1a1a1a] flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex rounded-full bg-[#f8f7f7] px-3 py-1 text-xs font-semibold text-[#201d1d] dark:bg-[#333] dark:text-[#fdfcfc]">{p.plan}</span>
                        {sw && <span className="text-[0.65rem] text-[#646262] px-2 py-0.5 rounded-full bg-[#f8f7f7] dark:bg-[#333] dark:text-[#a0a0a0]">{sw.priceIn}/{sw.priceOut}</span>}
                      </div>
                      <p className="text-2xl font-bold text-[#201d1d] dark:text-[#fdfcfc] mb-3">{p.price}</p>
                      <ul className="flex-1 space-y-1.5">
                        {p.reason.map((r2, k) => (
                          <li key={k} className="flex items-start gap-2 text-[0.7rem] text-[#424245] leading-relaxed dark:text-[#a0a0a0]">
                            <span className="mt-0.5 shrink-0 text-[#D97757]">✓</span><span>{r2}</span>
                          </li>
                        ))}
                      </ul>
                      {sw && sw.specs.swebench !== "N/A" && sw.specs.swebench !== "N/A†" && (
                        <p className="mt-3 pt-3 border-t border-[rgba(15,0,0,0.06)] text-[0.6rem] text-[#9a9898] dark:border-[rgba(255,255,255,0.06)] dark:text-[#666]">SWE-bench {sw.specs.swebench} · GPQA {sw.specs.gpqa} · {sw.specs.context}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* KRW Pricing */}
              <div className="rounded-xl shadow-sm border border-[rgba(15,0,0,0.08)] p-5 bg-gradient-to-br from-[#fdfcfc] to-[#f8f7f7] dark:from-[#1a1a1a] dark:to-[#222] dark:border-[rgba(255,255,255,0.08)]">
                <p className="text-xs font-semibold text-[#201d1d] dark:text-[#fdfcfc]">💰 한국 원화 결제 예상</p>
                <p className="mt-1 text-[0.7rem] text-[#424245] leading-relaxed dark:text-[#a0a0a0]">{r.krwNote}</p>
                <p className="mt-1 text-[0.6rem] text-[#9a9898] dark:text-[#666]">※ 환율: 1 USD = {KRW_EXCHANGE_RATE}원 (변동 가능) · 해외 결제 수수료 3% 포함 · 실시간 환율은 매일 갱신</p>
              </div>
            </div>
          ))}

          {/* Fee Saving Tips */}
          <div className="mt-8 border-t border-[rgba(15,0,0,0.08)] pt-8 dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-[#201d1d] dark:text-[#fdfcfc]">💡 해외 결제 수수료 절약 팁</p>
              <button onClick={() => setShowLegal(!showLegal)} className="text-[0.6rem] text-[#9a9898] underline hover:text-[#646262] dark:text-[#666]">법적 고지</button>
            </div>
            {showLegal && (
              <div className="rounded-xl border border-[rgba(15,0,0,0.12)] bg-amber-50/50 p-4 mb-4 dark:border-[rgba(255,255,255,0.1)] dark:bg-amber-950/20">
                <p className="text-[0.6rem] text-[#646262] leading-relaxed dark:text-[#a0a0a0]">
                  ⚖️ 법적 고지: 당사는 아래 링크된 업체로부터 어떠한 금전적 보상도 받지 않습니다.
                  링크는 일반 정보 제공 목적이며, 특정 상품의 가입을 권유하지 않습니다.
                  각 카드사의 약관과 수수료 정책은 변경될 수 있으므로 가입 전 반드시 확인하세요.
                  대한민국 「표시광고법」 및 「전자상거래법」을 준수합니다.
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {FEE_TIPS.map((tip, i) => (
                <a key={i} href={tip.link} target="_blank" rel="noopener noreferrer"
                  className="block rounded-xl shadow-sm border border-[rgba(15,0,0,0.08)] p-4 hover:shadow-md transition-shadow hover:bg-[#fdfcfc] dark:border-[rgba(255,255,255,0.08)] dark:bg-[#1a1a1a] dark:hover:bg-[#222] group">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#201d1d] dark:text-[#fdfcfc]">{tip.name}</p>
                    <span className="text-[0.6rem] text-[#007aff] opacity-0 group-hover:opacity-100 transition-opacity">바로가기 →</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">수수료 {tip.fee}</span>
                    {tip.cashback !== "-" && <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">캐시백 {tip.cashback}</span>}
                  </div>
                  <p className="mt-2 text-[0.6rem] text-[#646262] leading-relaxed dark:text-[#888]">{tip.desc}</p>
                </a>
              ))}
            </div>
            <p className="mt-3 text-[0.55rem] text-[#9a9898] dark:text-[#666]">※ 제휴 마케팅 링크가 아닙니다. 업체로부터 대가를 받지 않습니다. 정보는 참고용입니다.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfcfc] dark:bg-[#1a1a1a] flex flex-col">
      <header className="border-b border-[rgba(15,0,0,0.08)] dark:border-[rgba(255,255,255,0.06)]">
        <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <span className="text-sm font-semibold text-[#201d1d] dark:text-[#fdfcfc]">AI 플랜 추천</span>
          </div>
          <Link href="/dashboard" className="rounded-full border border-[rgba(15,0,0,0.12)] px-3 py-1 text-xs text-[#424245] hover:bg-[#f8f7f7] dark:border-[rgba(255,255,255,0.15)] dark:text-[#a0a0a0] dark:hover:bg-[#222]">📊 연구소</Link>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-2xl px-4 py-10 sm:px-6 w-full flex flex-col">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-[#646262] dark:text-[#888]">질문 {step + 1} / {QUESTIONS.length}</p>
            <p className="text-xs font-medium text-[#201d1d] dark:text-[#fdfcfc]">{q.q}</p>
          </div>
          <div className="h-2 rounded-full bg-[#f1eeee] dark:bg-[#333]">
            <div className="h-2 rounded-full bg-[#201d1d] dark:bg-[#fdfcfc] transition-all duration-300" style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
          </div>
          <p className="mt-2 text-[0.65rem] text-[#9a9898] dark:text-[#666]">{q.sub}</p>
        </div>

        {/* Question — 2-column pill grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-3">
            {q.options.map((opt) => {
              const selected = q.multi ? ((answers[q.id] || []) as string[]).includes(opt.value) : answers[q.id] === opt.value;
              return (
                <button key={opt.value} onClick={() => toggle(q.id, opt.value)}
                  className={`rounded-full w-full flex flex-col items-center justify-center gap-0.5 px-4 py-2.5 text-center transition-all ${
                    selected
                      ? "border-[#201d1d] bg-[#201d1d] text-[#fdfcfc] shadow-sm dark:border-[#fdfcfc] dark:bg-[#fdfcfc] dark:text-[#201d1d]"
                      : "border border-[rgba(15,0,0,0.12)] text-[#424245] hover:bg-[#f8f7f7] hover:border-[rgba(15,0,0,0.2)] dark:border-[rgba(255,255,255,0.12)] dark:text-[#a0a0a0] dark:hover:bg-[#222]"
                  }`}
                >
                  <span className="text-lg">{opt.emoji}</span>
                  <span className="text-xs font-semibold leading-tight">{opt.label}</span>
                  {(opt as any).desc && <span className="text-[0.55rem] opacity-70 leading-tight">{(opt as any).desc}</span>}
                  {(opt as any).price && <span className="text-[0.55rem] opacity-50">{(opt as any).price}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between pt-4">
          <button onClick={prev} disabled={step === 0}
            className="rounded-full border border-[rgba(15,0,0,0.12)] px-5 py-2.5 text-xs text-[#424245] hover:bg-[#f8f7f7] disabled:opacity-30 dark:border-[rgba(255,255,255,0.15)] dark:text-[#a0a0a0] dark:hover:bg-[#222]">
            ← 이전
          </button>
          <button onClick={next}
            disabled={!answers[q.id] || (Array.isArray(answers[q.id]) && (answers[q.id] as string[]).length === 0)}
            className="rounded-full bg-[#201d1d] px-6 py-2.5 text-xs font-medium text-[#fdfcfc] hover:bg-[#0f0000] disabled:opacity-30 dark:bg-[#fdfcfc] dark:text-[#201d1d] dark:hover:bg-[#e8e8e8]">
            {step < QUESTIONS.length - 1 ? "다음 →" : "🎯 추천 받기"}
          </button>
        </div>
      </main>
    </div>
  );
}
