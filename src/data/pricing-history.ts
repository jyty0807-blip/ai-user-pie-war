export interface PricingRecord {
  company_slug: string;
  model_name: string;
  input_price_per_mtok: number;
  output_price_per_mtok: number;
  effective_date: string;
  notes: string;
}

/**
 * Pricing history showing API pricing changes from 2025 to 2026
 * across the 4 companies. Based on real market data.
 */
export const pricingHistory: PricingRecord[] = [
  // ── OpenAI ──────────────────────────────────────────────────
  {
    company_slug: "openai",
    model_name: "GPT-4o",
    input_price_per_mtok: 2.5,
    output_price_per_mtok: 10.0,
    effective_date: "2025-01-15",
    notes: "GPT-4o launch pricing",
  },
  {
    company_slug: "openai",
    model_name: "GPT-4o",
    input_price_per_mtok: 2.5,
    output_price_per_mtok: 10.0,
    effective_date: "2025-07-01",
    notes: "50% price cut via batch API",
  },
  {
    company_slug: "openai",
    model_name: "GPT-5 Preview",
    input_price_per_mtok: 5.0,
    output_price_per_mtok: 25.0,
    effective_date: "2025-11-15",
    notes: "Research preview, limited access",
  },
  {
    company_slug: "openai",
    model_name: "GPT-5.6 Sol",
    input_price_per_mtok: 5.0,
    output_price_per_mtok: 30.0,
    effective_date: "2026-07-01",
    notes: "GPT-5.6 family GA. Sol: premium reasoning tier.",
  },
  {
    company_slug: "openai",
    model_name: "GPT-5.6 Terra",
    input_price_per_mtok: 2.5,
    output_price_per_mtok: 15.0,
    effective_date: "2026-07-01",
    notes: "Mid-tier. Best price/perf ratio in 5.6 family.",
  },
  {
    company_slug: "openai",
    model_name: "GPT-5.6 Luna",
    input_price_per_mtok: 0.5,
    output_price_per_mtok: 3.0,
    effective_date: "2026-07-01",
    notes: "Budget tier, optimized for simple tasks.",
  },
  {
    company_slug: "openai",
    model_name: "Codex-specific (GPT-5.6)",
    input_price_per_mtok: 1.75,
    output_price_per_mtok: 14.0,
    effective_date: "2026-07-01",
    notes: "Codex-tuned pricing under GPT-5.6.",
  },

  // ── Anthropic ───────────────────────────────────────────────
  {
    company_slug: "anthropic",
    model_name: "Claude 3.5 Sonnet",
    input_price_per_mtok: 3.0,
    output_price_per_mtok: 15.0,
    effective_date: "2025-01-01",
    notes: "Pre-Sonnet-5 era pricing.",
  },
  {
    company_slug: "anthropic",
    model_name: "Claude 4 Sonnet",
    input_price_per_mtok: 3.0,
    output_price_per_mtok: 15.0,
    effective_date: "2025-06-01",
    notes: "Quality jump at same price. Strategic move.",
  },
  {
    company_slug: "anthropic",
    model_name: "Claude Opus 4.7",
    input_price_per_mtok: 10.0,
    output_price_per_mtok: 50.0,
    effective_date: "2026-01-15",
    notes: "Ultra-premium tier for deep research.",
  },
  {
    company_slug: "anthropic",
    model_name: "Claude Sonnet 5",
    input_price_per_mtok: 3.0,
    output_price_per_mtok: 15.0,
    effective_date: "2026-05-01",
    notes: "Standard pricing. Promo $2/$10 until Aug 31 2026.",
  },
  {
    company_slug: "anthropic",
    model_name: "Claude Sonnet 5 (promo)",
    input_price_per_mtok: 2.0,
    output_price_per_mtok: 10.0,
    effective_date: "2026-05-01",
    notes: "Promotional pricing valid until Aug 31 2026.",
  },
  {
    company_slug: "anthropic",
    model_name: "Claude Fable 5",
    input_price_per_mtok: 10.0,
    output_price_per_mtok: 50.0,
    effective_date: "2026-06-01",
    notes: "Top-tier agentic coding model. SWE-bench leader.",
  },

  // ── DeepSeek ────────────────────────────────────────────────
  {
    company_slug: "deepseek",
    model_name: "DeepSeek V2.5",
    input_price_per_mtok: 0.14,
    output_price_per_mtok: 0.28,
    effective_date: "2025-01-01",
    notes: "Extreme cost advantage from day one.",
  },
  {
    company_slug: "deepseek",
    model_name: "DeepSeek V3",
    input_price_per_mtok: 0.14,
    output_price_per_mtok: 0.28,
    effective_date: "2025-09-01",
    notes: "Quality jump, same ultra-low pricing.",
  },
  {
    company_slug: "deepseek",
    model_name: "DeepSeek R1",
    input_price_per_mtok: 0.55,
    output_price_per_mtok: 2.19,
    effective_date: "2025-12-01",
    notes: "Reasoning model. Still 5x cheaper than GPT-4o.",
  },
  {
    company_slug: "deepseek",
    model_name: "DeepSeek V4 Flash",
    input_price_per_mtok: 0.14,
    output_price_per_mtok: 0.28,
    effective_date: "2026-07-01",
    notes: "1M context window. Still $0.28/MTok output.",
  },

  // ── Google AI ───────────────────────────────────────────────
  {
    company_slug: "google-ai",
    model_name: "Gemini 1.5 Pro",
    input_price_per_mtok: 1.25,
    output_price_per_mtok: 5.0,
    effective_date: "2025-01-01",
    notes: "Standard Gemini pricing in early 2025.",
  },
  {
    company_slug: "google-ai",
    model_name: "Gemini 1.5 Flash",
    input_price_per_mtok: 0.075,
    output_price_per_mtok: 0.3,
    effective_date: "2025-01-01",
    notes: "Budget tier. Undercuts everyone except DeepSeek.",
  },
  {
    company_slug: "google-ai",
    model_name: "Gemini 2.5 Pro",
    input_price_per_mtok: 1.5,
    output_price_per_mtok: 9.0,
    effective_date: "2025-09-01",
    notes: "Major quality upgrade. Competitive pricing.",
  },
  {
    company_slug: "google-ai",
    model_name: "Gemini 3.0 Pro",
    input_price_per_mtok: 1.5,
    output_price_per_mtok: 9.0,
    effective_date: "2026-03-01",
    notes: "2M context, native multimodal, same price.",
  },
  {
    company_slug: "google-ai",
    model_name: "Gemini 3.5 Flash",
    input_price_per_mtok: 1.5,
    output_price_per_mtok: 9.0,
    effective_date: "2026-07-01",
    notes: "Flash variant. Speed optimized, value pricing.",
  },
];
