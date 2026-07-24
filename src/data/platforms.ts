export interface PlatformSeed {
  name: string;
  slug: string;
  logo_url: string;
  color: string;
  category: "coding_platform";
  description: string;
}

export interface PlatformMetricSeed {
  platform_slug: string;
  metric_name: string;
  metric_value: number;
  metric_unit: string;
  data_source: string;
}

export const platforms: PlatformSeed[] = [
  {
    name: "Claude Code (Anthropic)",
    slug: "claude-code",
    logo_url: "/logos/claude-code.svg",
    color: "#D97757",
    category: "coding_platform",
    description:
      "Agentic coding by Anthropic. SWE-bench leader. MCP ecosystem 97M+ installs. $10/$50 per MTok (Fable 5).",
  },
  {
    name: "OpenAI Codex",
    slug: "openai-codex",
    logo_url: "/logos/openai-codex.svg",
    color: "#10A37F",
    category: "coding_platform",
    description:
      "OpenAI CLI coding agent. GPT-5.6 Sol $5/$30 per MTok. Codex specific $1.75/$14. Largest user base.",
  },
  {
    name: "OpenCode (OMC)",
    slug: "opencode",
    logo_url: "/logos/opencode.svg",
    color: "#8B5CF6",
    category: "coding_platform",
    description:
      "OhMyOpenCode multi-agent orchestration. Open source. DeepSeek V4 Flash $0.14/$0.28 per MTok. Sisyphus orchestrator pattern.",
  },
];

export const platformMetrics: PlatformMetricSeed[] = [
  // Claude Code
  {
    platform_slug: "claude-code",
    metric_name: "monthly_price",
    metric_value: 10,
    metric_unit: "USD",
    data_source: "Anthropic Console",
  },
  {
    platform_slug: "claude-code",
    metric_name: "swe_bench_score",
    metric_value: 76.3,
    metric_unit: "%",
    data_source: "SWE-bench Verified",
  },
  {
    platform_slug: "claude-code",
    metric_name: "context_window",
    metric_value: 200000,
    metric_unit: "tokens",
    data_source: "Anthropic Docs",
  },
  {
    platform_slug: "claude-code",
    metric_name: "mcp_support",
    metric_value: 1,
    metric_unit: "yes_no",
    data_source: "MCP Registry",
  },
  {
    platform_slug: "claude-code",
    metric_name: "agent_modes",
    metric_value: 5,
    metric_unit: "modes",
    data_source: "Claude Code Docs",
  },
  {
    platform_slug: "claude-code",
    metric_name: "community_size",
    metric_value: 500000,
    metric_unit: "users",
    data_source: "GitHub Stars",
  },
  // OpenAI Codex
  {
    platform_slug: "openai-codex",
    metric_name: "monthly_price",
    metric_value: 20,
    metric_unit: "USD",
    data_source: "OpenAI Platform",
  },
  {
    platform_slug: "openai-codex",
    metric_name: "swe_bench_score",
    metric_value: 72.1,
    metric_unit: "%",
    data_source: "SWE-bench Verified",
  },
  {
    platform_slug: "openai-codex",
    metric_name: "context_window",
    metric_value: 200000,
    metric_unit: "tokens",
    data_source: "OpenAI Docs",
  },
  {
    platform_slug: "openai-codex",
    metric_name: "mcp_support",
    metric_value: 1,
    metric_unit: "yes_no",
    data_source: "MCP Registry",
  },
  {
    platform_slug: "openai-codex",
    metric_name: "agent_modes",
    metric_value: 4,
    metric_unit: "modes",
    data_source: "Codex CLi Docs",
  },
  {
    platform_slug: "openai-codex",
    metric_name: "community_size",
    metric_value: 750000,
    metric_unit: "users",
    data_source: "GitHub Stars",
  },
  // OpenCode
  {
    platform_slug: "opencode",
    metric_name: "monthly_price",
    metric_value: 0,
    metric_unit: "USD",
    data_source: "GitHub README",
  },
  {
    platform_slug: "opencode",
    metric_name: "swe_bench_score",
    metric_value: 68.5,
    metric_unit: "%",
    data_source: "SWE-bench Verified",
  },
  {
    platform_slug: "opencode",
    metric_name: "context_window",
    metric_value: 1000000,
    metric_unit: "tokens",
    data_source: "DeepSeek Docs",
  },
  {
    platform_slug: "opencode",
    metric_name: "mcp_support",
    metric_value: 1,
    metric_unit: "yes_no",
    data_source: "MCP Registry",
  },
  {
    platform_slug: "opencode",
    metric_name: "agent_modes",
    metric_value: 8,
    metric_unit: "modes",
    data_source: "OMC Docs",
  },
  {
    platform_slug: "opencode",
    metric_name: "community_size",
    metric_value: 250000,
    metric_unit: "users",
    data_source: "GitHub Stars",
  },
];
