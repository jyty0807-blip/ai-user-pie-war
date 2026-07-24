export interface CompanySeed {
  name: string;
  slug: string;
  logo_url: string;
  color: string;
  category: "ai_company";
  positioning: string;
  description: string;
  ad_channels: string[];
}

export const companies: CompanySeed[] = [
  {
    name: "OpenAI",
    slug: "openai",
    logo_url: "/logos/openai.svg",
    color: "#10A37F",
    category: "ai_company",
    positioning: "Mass Market Leader",
    description:
      "Mass market AI leader with ChatGPT. Pivoted to ads in Feb 2026. ~800M weekly users. ~$25B ARR.",
    ad_channels: [
      "google_ads",
      "meta_ads",
      "youtube",
      "reddit",
      "x_twitter",
      "linkedin",
      "quora",
      "tiktok",
    ],
  },
  {
    name: "Anthropic",
    slug: "anthropic",
    logo_url: "/logos/anthropic.svg",
    color: "#D97757",
    category: "ai_company",
    positioning: "Premium & Trust-First",
    description:
      "Premium AI lab. Zero-ads policy. Overtook OpenAI in revenue Apr 2026. $965B valuation. ~$30B ARR.",
    ad_channels: [
      "google_ads",
      "youtube",
      "linkedin",
      "x_twitter",
      "reddit",
    ],
  },
  {
    name: "DeepSeek",
    slug: "deepseek",
    logo_url: "/logos/deepseek.svg",
    color: "#4F46E5",
    category: "ai_company",
    positioning: "Cost Disruptor",
    description:
      "Chinese AI disruptor. 1/8th the API cost of US rivals. MIT open weights. V4 Flash at $0.28/MTok output.",
    ad_channels: [
      "reddit",
      "x_twitter",
      "youtube",
      "tiktok",
    ],
  },
  {
    name: "Google AI",
    slug: "google-ai",
    logo_url: "/logos/google-ai.svg",
    color: "#4285F4",
    category: "ai_company",
    positioning: "Distribution Giant",
    description:
      "AI via Gemini + DeepMind. $400B+ annual revenue. Owns TPU, Android, Search distribution. Display ads up 969%.",
    ad_channels: [
      "google_ads",
      "youtube",
      "meta_ads",
      "linkedin",
      "x_twitter",
      "reddit",
      "tiktok",
    ],
  },
];

export function getCompanyBySlug(slug: string): CompanySeed | undefined {
  return companies.find((c) => c.slug === slug);
}
