export interface ModelSWOT {
  name: string; provider: string; slug: string; color: string;
  priceIn: string; priceOut: string;
  badge: string;
  swot: { strength: string[]; weakness: string[]; opportunity: string[]; threat: string[] };
  bestFor: { task: string; reason: string }[];
  specs: { context: string; swebench: string; gpqa: string; speed: string };
}

export const MODEL_SWOT: ModelSWOT[] = [
  {
    name: "Claude Fable 5", provider: "Anthropic", slug: "fable-5", color: "#D97757",
    priceIn: "$10.00", priceOut: "$50.00", badge: "🏆 최고 성능",
    swot: {
      strength: ["SWE-bench Verified 95% — 업계 최고", "EQ-Bench Longform 2189 Elo — 글쓰기 1위", "OSWorld 85% — 에이전트 최강"],
      weakness: ["출력 $50/MTok — 가장 비싼 모델", "프롬프트 1.25% 거부율", "美 수출 규제 리스크"],
      opportunity: ["프리미엄 AI 시장 선점", "장기 에이전트 수요 증가"],
      threat: ["GPT-5.6 Sol 가격 추격", "DeepSeek 극저가 전략"],
    },
    bestFor: [
      { task: "최고 난이도 코딩", reason: "SWE-bench 95%, 자체 검증으로 버그 최소화" },
      { task: "장편 창작/소설", reason: "EQ-Bench Longform 1위, 1만자 이상 일관성" },
    ],
    specs: { context: "1M", swebench: "95.0%", gpqa: "N/A", speed: "느림" },
  },
  {
    name: "Claude Opus 4.8", provider: "Anthropic", slug: "opus-4-8", color: "#D97757",
    priceIn: "$5.00", priceOut: "$25.00", badge: "👑 코딩 에이전트 표준",
    swot: {
      strength: ["SWE-bench Verified 88.6%", "Tool-use/MCP 정확도 업계 1위", "GPQA Diamond 93.6% — 추론 1위"],
      weakness: ["200K 컨텍스트 (Fable 5는 1M)", "멀티모달 약함", "출력 속도 느림"],
      opportunity: ["기업 코딩 표준", "Claude Code + MCP 생태계 확장"],
      threat: ["GPT-5.6 Sol의 DevOps 특화", "DeepSeek V4 Pro의 7배 저렴"],
    },
    bestFor: [
      { task: "프로덕션 코드 리팩토링", reason: "SWE-bench Pro 69.2% + Tool-use 업계 1위" },
      { task: "복잡한 디버깅/추론", reason: "GPQA Diamond 93.6%로 Hallucination 최소" },
    ],
    specs: { context: "200K", swebench: "88.6%", gpqa: "93.6%", speed: "느림" },
  },
  {
    name: "Claude Sonnet 5", provider: "Anthropic", slug: "sonnet-5", color: "#E88D67",
    priceIn: "$2.00", priceOut: "$10.00", badge: "⭐ 일상 코딩 최적",
    swot: {
      strength: ["SWE-bench 85.2% — 가격 대비 최고", "$2/$10 프로모션 중", "일상 코딩에 Opus 급 성능"],
      weakness: ["Opus 대비 복잡 추론 부족", "8월 31일 프로모션 종료 예정"],
      opportunity: ["차세대 일상 코딩 표준", "가격 경쟁력으로 시장 확대"],
      threat: ["Gemini 3.5 Flash의 속도+가격", "DeepSeek V4 Flash의 극저가"],
    },
    bestFor: [
      { task: "일상 코딩 에이전트", reason: "SWE-bench 85.2%, Opus의 절반 가격" },
      { task: "가벼운 리팩토링/코드리뷰", reason: "일상 작업에 Opus는 오버kill" },
    ],
    specs: { context: "200K", swebench: "85.2%", gpqa: "N/A", speed: "중간" },
  },
  {
    name: "GPT-5.5", provider: "OpenAI", slug: "gpt-5-5", color: "#10A37F",
    priceIn: "$5.00", priceOut: "$30.00", badge: "🔧 전천후 모델",
    swot: {
      strength: ["Terminal-Bench 82.7% — DevOps 최강", "AIME 2025 100% — 수학 완벽", "AAII Index 60 — 종합 1위"],
      weakness: ["SWE-bench Pro 58.6% — 실제 코딩 Claude에 11pt 차이", "$30/MTok 출력 비용", "Hallucination 높음"],
      opportunity: ["Codex + ChatGPT 생태계", "MS Copilot 통합"],
      threat: ["Claude Code MCP 표준화", "OpenCode 무료 전략"],
    },
    bestFor: [
      { task: "DevOps/터미널/CI-CD", reason: "Terminal-Bench 82.7% 최고" },
      { task: "마케팅/구조적 글쓰기", reason: "Mazur Writing 1위, 형식 준수력 최고" },
    ],
    specs: { context: "1M", swebench: "88.7%", gpqa: "93.6%", speed: "중간" },
  },
  {
    name: "GPT-5.6 Sol", provider: "OpenAI", slug: "gpt-5-6-sol", color: "#10A37F",
    priceIn: "$5.00", priceOut: "$30.00", badge: "🚀 최신 플래그십",
    swot: {
      strength: ["BrowseComp 90.4% — 웹 에이전트 1위", "CLI+멀티스텝 코딩 특화", "1.05M 컨텍스트"],
      weakness: ["Limited Preview (2026년 7월)", "높은 출력 가격"],
      opportunity: ["차세대 GPT 생태계 표준", "OpenAI Responses API 발전"],
      threat: ["Claude Fable 5의 SWE-bench 격차", "DeepSeek 가격 혁명"],
    },
    bestFor: [
      { task: "웹 브라우징 에이전트", reason: "BrowseComp 90.4% 최고" },
      { task: "커맨드라인 중심 개발", reason: "CLI 워크플로우에 최적화" },
    ],
    specs: { context: "1.05M", swebench: "N/A†", gpqa: "N/A†", speed: "중간" },
  },
  {
    name: "Gemini 3.1 Pro", provider: "Google", slug: "gemini-3-1", color: "#4285F4",
    priceIn: "$2.00", priceOut: "$12.00", badge: "🔍 2M 컨텍스트",
    swot: {
      strength: ["2M 컨텍스트 — 업계 최대", "GPQA Diamond 94.3%", "가장 저렴한 프론티어 ($2/$12)"],
      weakness: ["200K 초과 시 2배 요금", "Tool-use 정확도 낮음", "글쓰기: 가장 덜 자연스러움"],
      opportunity: ["Google Workspace 30억+ 유저", "안드로이드 AI 기본 탑재"],
      threat: ["Gemini 3.5 Flash가 Pro 잠식", "비용 대비 성능 경쟁 심화"],
    },
    bestFor: [
      { task: "초장문 분석/리서치", reason: "2M 컨텍스트로 전체 문서 한 번에" },
      { task: "멀티모달 (영상/오디오)", reason: "유일한 네이티브 멀티모달 프론티어" },
    ],
    specs: { context: "2M", swebench: "54.2%", gpqa: "94.3%", speed: "빠름" },
  },
  {
    name: "Gemini 3.5 Flash", provider: "Google", slug: "gemini-3-5-flash", color: "#5B9CF6",
    priceIn: "$1.50", priceOut: "$9.00", badge: "⚡ 최고 속도",
    swot: {
      strength: ["ARC-AGI-2 72.1% — 추론 최고", "속도 프론티어 중 4배 빠름", "$1.50/$9 최저 독점"],
      weakness: ["Pro보다 코딩 점수 낮음", "Google 종속성"],
      opportunity: ["실시간 AI 서비스 시장", "Vertex AI 기업 확대"],
      threat: ["Claude Sonnet 5와 직접 경쟁", "DeepSeek V4 Flash 극저가"],
    },
    bestFor: [
      { task: "실시간 추론 서비스", reason: "속도 4배, 가격 1/4" },
      { task: "고볼륨 멀티모달", reason: "속도+멀티모달+가격 트리플" },
    ],
    specs: { context: "1M", swebench: "N/A†", gpqa: "N/A†", speed: "매우 빠름" },
  },
  {
    name: "DeepSeek V4 Pro", provider: "DeepSeek", slug: "deepseek-v4-pro", color: "#4F46E5",
    priceIn: "$0.44", priceOut: "$0.87", badge: "💰 가성비 최고",
    swot: {
      strength: ["LiveCodeBench 93.5 — 알고리즘 1위", "MATH-500 96.1%", "경쟁 대비 7-57배 저렴"],
      weakness: ["SWE-bench Pro 55.4%", "Terminal-Bench 67.9% (GPT 대비 15pt 차이)", "중국 인프라 리스크"],
      opportunity: ["오픈소스 혁신", "셀프호스팅 수요"],
      threat: ["미국 규제", "중국 내 경쟁 심화"],
    },
    bestFor: [
      { task: "알고리즘/경쟁 코딩", reason: "LiveCodeBench 93.5 최고" },
      { task: "대량 API 배치 처리", reason: "경쟁사 1/7 가격으로 운영 가능" },
    ],
    specs: { context: "1M", swebench: "80.6%", gpqa: "90.1%", speed: "중간" },
  },
  {
    name: "DeepSeek V4 Flash", provider: "DeepSeek", slug: "deepseek-v4-flash", color: "#6366F1",
    priceIn: "$0.14", priceOut: "$0.28", badge: "🪄 극강 가성비",
    swot: {
      strength: ["SWE-bench 79% — 가격 대비 충격적", "$0.28/MTok — GPT 대비 107배 저렴", "1M 컨텍스트, MIT 라이선스"],
      weakness: ["다단계 추론 취약", "간단 QA 34.1% (Pro 대비 낮음)", "에이전트 성능 제한"],
      opportunity: ["AI 대중화", "Edge 디바이스 추론"],
      threat: ["중국 규제", "고급 모델 가격 인하로 격차 축소"],
    },
    bestFor: [
      { task: "개발자 개인 프로젝트", reason: "$0.28/MTok — 부담 없이 실험" },
      { task: "대량 문서 처리/분류", reason: "볼륨 작업에서 비용 혁명" },
    ],
    specs: { context: "1M", swebench: "79.0%", gpqa: "N/A", speed: "빠름" },
  },
];
export const KRW_EXCHANGE_RATE = 1474; // approx USD/KRW (updated 2026-07-25 via er-api.com)