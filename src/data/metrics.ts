export interface MonthlyMetric {
  company_slug: string;
  year: number;
  month: number;
  estimated_ad_spend: number;
  estimated_users_mau: number;
  paid_conversion_rate: number;
  avg_revenue_per_user: number;
  cac_estimate: number;
  market_share_pct: number;
}

function m(
  company_slug: string,
  year: number,
  month: number,
  adSpend: number,
  mau: number,
  convRate: number,
  arpu: number,
  cac: number,
  share: number,
): MonthlyMetric {
  return {
    company_slug,
    year,
    month,
    estimated_ad_spend: adSpend,
    estimated_users_mau: mau,
    paid_conversion_rate: convRate,
    avg_revenue_per_user: arpu,
    cac_estimate: cac,
    market_share_pct: share,
  };
}

/**
 * Returns 18 months (Jan 2025 – Jul 2026) of mock metrics for 4 AI companies.
 * The data tells a story of competitive dynamics:
 * - Feb 2026: OpenAI launches ChatGPT ads → QuitGPT movement
 * - Mar-Apr 2026: Anthropic exploits the trust gap, MAU explodes
 * - Mid 2026: DeepSeek & Google gain ground
 */
export function getMonthlyMetrics(): MonthlyMetric[] {
  return [
    // ─── 2025 ──────────────────────────────────────────────────────────────
    // Jan 2025 – baseline, pre-anything
    m("openai", 2025, 1, 48, 600, 3.2, 8.5, 12.4, 60.0),
    m("anthropic", 2025, 1, 8, 5, 4.8, 18.0, 21.5, 3.0),
    m("deepseek", 2025, 1, 2, 10, 1.5, 3.2, 6.8, 2.0),
    m("google-ai", 2025, 1, 35, 50, 2.8, 7.0, 9.2, 10.0),

    // Feb 2025
    m("openai", 2025, 2, 50, 610, 3.2, 8.5, 12.5, 59.5),
    m("anthropic", 2025, 2, 9, 7, 4.8, 18.0, 21.0, 3.2),
    m("deepseek", 2025, 2, 2, 12, 1.6, 3.3, 6.5, 2.2),
    m("google-ai", 2025, 2, 36, 52, 2.8, 7.0, 9.3, 10.2),

    // Mar 2025
    m("openai", 2025, 3, 52, 620, 3.3, 8.6, 12.6, 59.0),
    m("anthropic", 2025, 3, 10, 9, 5.0, 18.2, 20.5, 3.5),
    m("deepseek", 2025, 3, 2, 14, 1.8, 3.4, 6.2, 2.3),
    m("google-ai", 2025, 3, 37, 54, 2.9, 7.1, 9.4, 10.5),

    // Apr 2025
    m("openai", 2025, 4, 54, 630, 3.3, 8.6, 12.7, 58.5),
    m("anthropic", 2025, 4, 11, 11, 5.1, 18.3, 20.0, 3.8),
    m("deepseek", 2025, 4, 3, 16, 2.0, 3.5, 5.9, 2.5),
    m("google-ai", 2025, 4, 38, 56, 2.9, 7.2, 9.5, 10.8),

    // May 2025
    m("openai", 2025, 5, 56, 640, 3.3, 8.7, 12.8, 58.0),
    m("anthropic", 2025, 5, 12, 13, 5.2, 18.5, 19.5, 4.0),
    m("deepseek", 2025, 5, 3, 18, 2.2, 3.6, 5.6, 2.8),
    m("google-ai", 2025, 5, 39, 58, 3.0, 7.2, 9.6, 11.0),

    // Jun 2025 – Claude 4 Sonnet launch
    m("openai", 2025, 6, 58, 645, 3.3, 8.7, 12.9, 57.0),
    m("anthropic", 2025, 6, 15, 18, 5.3, 18.8, 18.5, 5.0),
    m("deepseek", 2025, 6, 3, 20, 2.3, 3.7, 5.4, 3.0),
    m("google-ai", 2025, 6, 40, 60, 3.0, 7.3, 9.7, 11.2),

    // Jul 2025
    m("openai", 2025, 7, 60, 650, 3.3, 8.7, 13.0, 56.5),
    m("anthropic", 2025, 7, 16, 22, 5.4, 19.0, 18.0, 5.5),
    m("deepseek", 2025, 7, 3, 22, 2.4, 3.8, 5.2, 3.2),
    m("google-ai", 2025, 7, 41, 62, 3.0, 7.4, 9.8, 11.5),

    // Aug 2025
    m("openai", 2025, 8, 62, 655, 3.2, 8.6, 13.2, 56.0),
    m("anthropic", 2025, 8, 17, 26, 5.5, 19.2, 17.8, 6.0),
    m("deepseek", 2025, 8, 4, 24, 2.5, 3.9, 5.0, 3.3),
    m("google-ai", 2025, 8, 42, 65, 3.1, 7.4, 9.9, 11.8),

    // Sep 2025 – DeepSeek V3 gains traction
    m("openai", 2025, 9, 64, 660, 3.2, 8.6, 13.4, 55.5),
    m("anthropic", 2025, 9, 18, 30, 5.6, 19.5, 17.5, 6.5),
    m("deepseek", 2025, 9, 6, 30, 2.8, 4.0, 4.8, 4.0),
    m("google-ai", 2025, 9, 43, 68, 3.1, 7.5, 10.0, 12.0),

    // Oct 2025
    m("openai", 2025, 10, 66, 665, 3.1, 8.5, 13.6, 55.0),
    m("anthropic", 2025, 10, 19, 34, 5.7, 19.8, 17.2, 7.0),
    m("deepseek", 2025, 10, 7, 34, 2.9, 4.1, 4.6, 4.5),
    m("google-ai", 2025, 10, 44, 72, 3.1, 7.5, 10.1, 12.2),

    // Nov 2025 – GPT-5 preview announced
    m("openai", 2025, 11, 68, 670, 3.1, 8.5, 13.8, 54.5),
    m("anthropic", 2025, 11, 20, 38, 5.8, 20.0, 17.0, 7.5),
    m("deepseek", 2025, 11, 8, 40, 3.0, 4.2, 4.4, 5.0),
    m("google-ai", 2025, 11, 45, 76, 3.2, 7.6, 10.2, 12.5),

    // Dec 2025
    m("openai", 2025, 12, 70, 675, 3.0, 8.4, 14.0, 54.0),
    m("anthropic", 2025, 12, 21, 42, 5.9, 20.2, 16.8, 8.0),
    m("deepseek", 2025, 12, 8, 45, 3.1, 4.3, 4.2, 5.2),
    m("google-ai", 2025, 12, 46, 80, 3.2, 7.7, 10.3, 12.8),

    // ─── 2026 ──────────────────────────────────────────────────────────────
    // Jan 2026 – Claude Opus 4.7 launch, momentum builds
    m("openai", 2026, 1, 72, 680, 2.9, 8.3, 14.2, 53.0),
    m("anthropic", 2026, 1, 24, 50, 6.0, 20.5, 16.5, 9.0),
    m("deepseek", 2026, 1, 10, 52, 3.2, 4.4, 4.0, 5.5),
    m("google-ai", 2026, 1, 48, 88, 3.3, 7.8, 10.5, 13.0),

    // Feb 2026 – THE QUITGPT EVENT: OpenAI ads launch, Anthropic Super Bowl anti-ads
    m("openai", 2026, 2, 120, 700, 2.2, 7.8, 16.0, 50.0),
    m("anthropic", 2026, 2, 30, 72, 6.5, 22.0, 15.5, 12.0),
    m("deepseek", 2026, 2, 12, 60, 3.3, 4.5, 3.8, 6.0),
    m("google-ai", 2026, 2, 55, 95, 3.4, 8.0, 10.6, 13.5),

    // Mar 2026 – QuitGPT full swing, ChatGPT uninstalls spike 295%, Claude #1 App Store
    m("openai", 2026, 3, 140, 660, 1.8, 7.2, 18.0, 46.0),
    m("anthropic", 2026, 3, 28, 95, 7.0, 24.0, 14.8, 15.0),
    m("deepseek", 2026, 3, 14, 68, 3.4, 4.6, 3.6, 6.5),
    m("google-ai", 2026, 3, 60, 105, 3.5, 8.2, 10.8, 14.0),

    // Apr 2026 – Anthropic overtakes OpenAI in revenue ($30B ARR)
    m("openai", 2026, 4, 150, 640, 1.6, 6.8, 19.0, 45.0),
    m("anthropic", 2026, 4, 26, 110, 7.2, 25.0, 14.5, 17.0),
    m("deepseek", 2026, 4, 14, 72, 3.5, 4.7, 3.5, 6.8),
    m("google-ai", 2026, 4, 62, 115, 3.6, 8.4, 10.9, 14.5),

    // May 2026 – Claude Sonnet 5 launch
    m("openai", 2026, 5, 160, 650, 1.5, 6.5, 19.5, 44.0),
    m("anthropic", 2026, 5, 25, 120, 7.5, 26.0, 14.2, 18.0),
    m("deepseek", 2026, 5, 14, 75, 3.5, 4.8, 3.4, 7.0),
    m("google-ai", 2026, 5, 65, 130, 3.7, 8.5, 11.0, 15.0),

    // Jun 2026 – Anthropic files for IPO confidentially
    m("openai", 2026, 6, 170, 700, 1.5, 6.6, 19.8, 45.0),
    m("anthropic", 2026, 6, 24, 115, 7.4, 25.5, 14.5, 17.5),
    m("deepseek", 2026, 6, 13, 78, 3.5, 4.8, 3.5, 7.0),
    m("google-ai", 2026, 6, 66, 145, 3.7, 8.5, 11.1, 15.0),

    // Jul 2026 – GPT-5.6 GA + DeepSeek V4 Flash launch
    m("openai", 2026, 7, 200, 800, 1.8, 7.0, 18.5, 45.0),
    m("anthropic", 2026, 7, 25, 120, 7.0, 24.5, 15.0, 18.0),
    m("deepseek", 2026, 7, 15, 80, 3.6, 5.0, 3.5, 7.0),
    m("google-ai", 2026, 7, 68, 200, 3.8, 8.6, 11.2, 15.0),
  ];
}
