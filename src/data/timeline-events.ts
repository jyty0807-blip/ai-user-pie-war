export interface TimelineEvent {
  company_slug: string;
  title: string;
  description: string;
  event_date: string;
  event_type: "product_launch" | "marketing" | "pricing" | "business";
  impact_metric: string;
  impact_value: string;
  url: string;
}

/**
 * Key timeline events charting the AI user acquisition war.
 */
export const timelineEvents: TimelineEvent[] = [
  {
    company_slug: "openai",
    title: "ChatGPT Reaches 500M Weekly Users",
    description:
      "ChatGPT hits the milestone of 500 million weekly active users, cementing OpenAI's mass-market leadership position. Growth acceleration driven by GPT-4o multimodal capabilities and expanded free-tier access.",
    event_date: "2025-01-15",
    event_type: "business",
    impact_metric: "Weekly Users",
    impact_value: "500M",
    url: "https://openai.com/blog",
  },
  {
    company_slug: "anthropic",
    title: "Claude 4 Sonnet Launch",
    description:
      "Anthropic launches Claude 4 Sonnet, delivering a significant quality jump at the same $3/$15 per MTok pricing. Sets the stage for Anthropic's premium positioning and trust-first strategy.",
    event_date: "2025-06-15",
    event_type: "product_launch",
    impact_metric: "SWE-bench Score",
    impact_value: "+8 points vs previous",
    url: "https://anthropic.com",
  },
  {
    company_slug: "deepseek",
    title: "DeepSeek V3 Gains Traction",
    description:
      "DeepSeek V3 sees a surge in developer adoption with its MIT-licensed open weights and 1/8th US rival pricing. Developer community starts migrating production workloads.",
    event_date: "2025-09-01",
    event_type: "product_launch",
    impact_metric: "MAU",
    impact_value: "30M (from 22M)",
    url: "https://deepseek.com",
  },
  {
    company_slug: "openai",
    title: "GPT-5 Preview Announced",
    description:
      "OpenAI announces GPT-5 research preview with limited access. New reasoning architecture, but limited availability frustrates developers. Pricing at $5/$25 MTok raises eyebrows.",
    event_date: "2025-11-15",
    event_type: "product_launch",
    impact_metric: "API Price",
    impact_value: "$5/$25 per MTok",
    url: "https://openai.com/blog",
  },
  {
    company_slug: "anthropic",
    title: "Claude Opus 4.7 Launch",
    description:
      "Anthropic launches Claude Opus 4.7, an ultra-premium tier for deep research and complex reasoning. Priced at $10/$50 per MTok, signals Anthropic's move upmarket.",
    event_date: "2026-01-15",
    event_type: "product_launch",
    impact_metric: "API Price",
    impact_value: "$10/$50 per MTok",
    url: "https://anthropic.com",
  },
  {
    company_slug: "openai",
    title: "OpenAI Launches Ads in ChatGPT — QuitGPT Starts",
    description:
      "OpenAI introduces advertising in ChatGPT free tier. The move triggers the 'QuitGPT' movement with 2.5M participants pledging to leave the platform. ChatGPT uninstalls spike 295% in the following weeks.",
    event_date: "2026-02-09",
    event_type: "marketing",
    impact_metric: "QuitGPT Participants",
    impact_value: "2.5M",
    url: "https://openai.com/blog",
  },
  {
    company_slug: "anthropic",
    title: "Anthropic Super Bowl Anti-Ads Campaign",
    description:
      "Anthropic airs an 'anti-ads' Super Bowl campaign on the same day OpenAI launches ChatGPT ads. The ad highlights Claude's zero-ads policy and privacy focus. Brand perception scores soar.",
    event_date: "2026-02-09",
    event_type: "marketing",
    impact_metric: "Super Bowl Viewers",
    impact_value: "120M+",
    url: "https://anthropic.com",
  },
  {
    company_slug: "openai",
    title: "ChatGPT Uninstalls Spike 295%",
    description:
      "Following the ads launch and QuitGPT movement, ChatGPT sees a 295% spike in uninstalls across iOS and Android. The App Store and Google Play rankings drop significantly.",
    event_date: "2026-02-20",
    event_type: "business",
    impact_metric: "Uninstall Spike",
    impact_value: "295%",
    url: "https://openai.com",
  },
  {
    company_slug: "anthropic",
    title: "Claude Hits #1 App Store",
    description:
      "Claude app reaches #1 in the App Store's productivity category for the first time, overtaking ChatGPT. Driven by QuitGPT migration and the Super Bowl halo effect.",
    event_date: "2026-02-28",
    event_type: "business",
    impact_metric: "App Store Rank",
    impact_value: "#1 Productivity",
    url: "https://anthropic.com",
  },
  {
    company_slug: "anthropic",
    title: "Anthropic Overtakes OpenAI in Revenue",
    description:
      "Anthropic reaches $30B ARR, overtaking OpenAI's ~$25B for the first time. The milestone caps a 6-month surge driven by enterprise trust, zero-ads positioning, and Claude Sonnet adoption.",
    event_date: "2026-04-01",
    event_type: "business",
    impact_metric: "Annual Revenue",
    impact_value: "$30B ARR",
    url: "https://anthropic.com",
  },
  {
    company_slug: "anthropic",
    title: "Claude Sonnet 5 Launch",
    description:
      "Claude Sonnet 5 launches at $3/$15 per MTok with a promotional $2/$10 rate until August 31, 2026. Sets new SWE-bench records and solidifies Anthropic's developer mindshare.",
    event_date: "2026-05-01",
    event_type: "product_launch",
    impact_metric: "Promo Price",
    impact_value: "$2/$10 per MTok",
    url: "https://anthropic.com",
  },
  {
    company_slug: "anthropic",
    title: "Anthropic Files for IPO Confidentially",
    description:
      "Anthropic files confidentially for an IPO with a reported valuation target of $965B. The filing follows sustained revenue growth and market leadership in the premium AI segment.",
    event_date: "2026-06-15",
    event_type: "business",
    impact_metric: "Valuation",
    impact_value: "$965B",
    url: "https://anthropic.com",
  },
  {
    company_slug: "openai",
    title: "GPT-5.6 Family GA (Sol/Terra/Luna)",
    description:
      "OpenAI launches GPT-5.6 family: Sol ($5/$30, premium reasoning), Terra ($2.50/$15, mid-tier), Luna ($0.50/$3, budget). Aims to reclaim market share with tiered pricing.",
    event_date: "2026-07-01",
    event_type: "product_launch",
    impact_metric: "Budget Tier Price",
    impact_value: "$0.50/$3 per MTok",
    url: "https://openai.com/blog",
  },
  {
    company_slug: "deepseek",
    title: "DeepSeek V4 Flash with 1M Context",
    description:
      "DeepSeek launches V4 Flash with a 1M token context window at the same $0.14/$0.28 pricing. Maintains cost leadership while matching premium-tier capabilities.",
    event_date: "2026-07-15",
    event_type: "product_launch",
    impact_metric: "Context Window",
    impact_value: "1M tokens",
    url: "https://deepseek.com",
  },
];
