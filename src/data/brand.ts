/**
 * Centralized brand color registry.
 * 모든 컴포넌트는 이 파일을 통해 브랜드 색상을 참조합니다.
 * 색상 변경 시 이 파일만 수정하면 됩니다.
 */

/** 기업별 대표 색상 */
export const BRAND_COLORS = {
  openai: "#10A37F",
  anthropic: "#D97757",
  deepseek: "#4F46E5",
  google: "#4285F4",
  openrouter: "#FF6B35",
  opencode: "#8B5CF6",
} as const satisfies Record<string, string>;

/** 모델별 색상 (provider의 변형色调) */
export const MODEL_COLORS = {
  "fable-5": "#D97757",
  "opus-4-8": "#D97757",
  "sonnet-5": "#E88D67",
  "gpt-5-5": "#10A37F",
  "gpt-5-6-sol": "#10A37F",
  "gemini-3-1": "#4285F4",
  "gemini-3-5-flash": "#5B9CF6",
  "deepseek-v4-pro": "#4F46E5",
  "deepseek-v4-flash": "#6366F1",
} as const satisfies Record<string, string>;

/** 플랫폼별 색상 */
export const PLATFORM_COLORS = {
  "claude-code": BRAND_COLORS.anthropic,
  "openai-codex": BRAND_COLORS.openai,
  openrouter: BRAND_COLORS.openrouter,
  omc: BRAND_COLORS.opencode,
  claude: BRAND_COLORS.anthropic,
  gemini: BRAND_COLORS.google,
} as const satisfies Record<string, string>;

/** 회사별 표시 이름 */
export const COMPANY_LABELS: Record<string, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  deepseek: "DeepSeek",
  google: "Google",
  "google-ai": "Google (Gemini)",
  openrouter: "OpenRouter",
  opencode: "OpenCode",
};

/**
 * slug로 브랜드 색상을 찾는다.
 * PLATFORM_COLORS → BRAND_COLORS → MODEL_COLORS 순으로 lookup.
 */
export function getBrandColor(slug: string): string {
  return PLATFORM_COLORS[slug as keyof typeof PLATFORM_COLORS]
    ?? BRAND_COLORS[slug as keyof typeof BRAND_COLORS]
    ?? MODEL_COLORS[slug as keyof typeof MODEL_COLORS]
    ?? "#646262"; // fallback: muted-foreground
}
