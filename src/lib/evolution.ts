export type FeedType = "fire" | "water" | "star";
export type EvolutionTier = 1 | 2 | 3;

export interface EvolutionCondition {
  type: "feed_ratio" | "time_of_day" | "streak" | "neglect" | "mixed" | "hidden";
  params: Record<string, number | string>;
}

export interface EvolutionEntry {
  id: string;
  name: string;
  nameKr: string;
  tier: EvolutionTier;
  emoji: string;
  face: string;
  description: string;
  condition: EvolutionCondition;
}

export interface EvolutionResult {
  evolved: boolean;
  from: string;
  to: string;
  newSlime: EvolutionEntry | null;
}

export const EVOLUTION_TABLE: EvolutionEntry[] = [
  // ─── Tier 1 (Lv.10) ─── Feed Ratio Based
  {
    id: "magma",
    name: "Magma",
    nameKr: "마그마 슬라임",
    tier: 1,
    emoji: "🔴",
    face: "◉ω◉",
    description: "불젤리를 가장 좋아하는 뜨거운 슬라임",
    condition: { type: "feed_ratio", params: { fire: 0.6 } },
  },
  {
    id: "aqua",
    name: "Aqua",
    nameKr: "아쿠아 슬라임",
    tier: 1,
    emoji: "🔵",
    face: "◕‿◕",
    description: "물방울을 가장 좋아하는 시원한 슬라임",
    condition: { type: "feed_ratio", params: { water: 0.6 } },
  },
  {
    id: "stellar",
    name: "Stellar",
    nameKr: "스텔라 슬라임",
    tier: 1,
    emoji: "🟡",
    face: "✧ω✧",
    description: "별사탕을 가장 좋아하는 반짝이는 슬라임",
    condition: { type: "feed_ratio", params: { star: 0.6 } },
  },
  {
    id: "balanced",
    name: "Balanced",
    nameKr: "균형 슬라임",
    tier: 1,
    emoji: "🟡",
    face: "◕ᴗ◕",
    description: "골고루 먹은 균형 잡힌 슬라임",
    condition: { type: "feed_ratio", params: { balanced: 1 } },
  },
  // ─── Tier 1 (Lv.10) ─── Time Based
  {
    id: "lunar",
    name: "Lunar",
    nameKr: "달빛 슬라임",
    tier: 1,
    emoji: "🌙",
    face: "◕~◕",
    description: "주로 밤에 활동하는 신비로운 슬라임",
    condition: { type: "time_of_day", params: { night_ratio: 0.7 } },
  },
  {
    id: "solar",
    name: "Solar",
    nameKr: "태양 슬라임",
    tier: 1,
    emoji: "☀️",
    face: "◉∇◉",
    description: "주로 낮에 활동하는 활발한 슬라임",
    condition: { type: "time_of_day", params: { day_ratio: 0.7 } },
  },
  // ─── Tier 1 (Lv.10) ─── Streak Based
  {
    id: "rainbow",
    name: "Rainbow",
    nameKr: "무지개 슬라임",
    tier: 1,
    emoji: "🌈",
    face: "✿ω✿",
    description: "7일 연속 출석으로 탄생한 행운의 슬라임",
    condition: { type: "streak", params: { min_days: 7 } },
  },
  // ─── Tier 1 (Lv.10) ─── Mixed
  {
    id: "toxic",
    name: "Toxic",
    nameKr: "독성 슬라임",
    tier: 1,
    emoji: "🟣",
    face: "◉~◉",
    description: "불과 물을 비슷하게 먹은 변종 슬라임",
    condition: { type: "mixed", params: { fire: 0.35, water: 0.35 } },
  },
  {
    id: "plasma",
    name: "Plasma",
    nameKr: "플라즈마 슬라임",
    tier: 1,
    emoji: "⚡",
    face: "◉⚡◉",
    description: "불과 별을 비슷하게 먹은 전격 슬라임",
    condition: { type: "mixed", params: { fire: 0.35, star: 0.35 } },
  },
  {
    id: "crystal",
    name: "Crystal",
    nameKr: "크리스탈 슬라임",
    tier: 1,
    emoji: "💎",
    face: "◈ω◈",
    description: "물과 별을 비슷하게 먹은 보석 슬라임",
    condition: { type: "mixed", params: { water: 0.35, star: 0.35 } },
  },

  // ─── Tier 2 (Lv.25) ─── Feed Ratio
  {
    id: "inferno",
    name: "Inferno",
    nameKr: "인페르노 슬라임",
    tier: 2,
    emoji: "🔥",
    face: "◉皿◉",
    description: "불의 정수를 흡수한 지옥불 슬라임",
    condition: { type: "feed_ratio", params: { fire: 0.65 } },
  },
  {
    id: "tsunami",
    name: "Tsunami",
    nameKr: "쓰나미 슬라임",
    tier: 2,
    emoji: "🌊",
    face: "◕∇◕",
    description: "물의 정수를 흡수한 해일 슬라임",
    condition: { type: "feed_ratio", params: { water: 0.65 } },
  },
  {
    id: "nova",
    name: "Nova",
    nameKr: "노바 슬라임",
    tier: 2,
    emoji: "💫",
    face: "✧∇✧",
    description: "별의 정수를 흡수한 초신성 슬라임",
    condition: { type: "feed_ratio", params: { star: 0.65 } },
  },
  {
    id: "king",
    name: "King",
    nameKr: "킹 슬라임",
    tier: 2,
    emoji: "🟣",
    face: "▼ω▼",
    description: "균형 잡힌 식단으로 성장한 슬라임 왕",
    condition: { type: "feed_ratio", params: { balanced: 1 } },
  },
  // ─── Tier 2 (Lv.25) ─── Time Based
  {
    id: "eclipse",
    name: "Eclipse",
    nameKr: "이클립스 슬라임",
    tier: 2,
    emoji: "🌑",
    face: "◉‸◉",
    description: "밤에만 활동하는 어둠의 슬라임",
    condition: { type: "time_of_day", params: { night_ratio: 0.8 } },
  },
  {
    id: "aurora",
    name: "Aurora",
    nameKr: "오로라 슬라임",
    tier: 2,
    emoji: "🌌",
    face: "◈∇◈",
    description: "낮에만 활동하는 빛의 슬라임",
    condition: { type: "time_of_day", params: { day_ratio: 0.8 } },
  },
  // ─── Tier 2 (Lv.25) ─── Streak Based
  {
    id: "diamond",
    name: "Diamond",
    nameKr: "다이아몬드 슬라임",
    tier: 2,
    emoji: "💎",
    face: "◆ω◆",
    description: "30일 연속 출석으로 탄생한 보석 슬라임",
    condition: { type: "streak", params: { min_days: 30 } },
  },
  // ─── Tier 2 (Lv.25) ─── Neglect
  {
    id: "zombie",
    name: "Zombie",
    nameKr: "좀비 슬라임",
    tier: 2,
    emoji: "🧟",
    face: "×‸×",
    description: "3일 이상 방치되었다 돌아온 좀비 슬라임",
    condition: { type: "neglect", params: { min_days: 3 } },
  },

  // ─── Tier 3 (Lv.50) ─── Feed Ratio
  {
    id: "phoenix",
    name: "Phoenix",
    nameKr: "피닉스 슬라임",
    tier: 3,
    emoji: "🐦‍🔥",
    face: "◉🔥◉",
    description: "불의 궁극체, 죽어도 다시 태어나는 불사조",
    condition: { type: "feed_ratio", params: { fire: 0.7 } },
  },
  {
    id: "leviathan",
    name: "Leviathan",
    nameKr: "리바이어던 슬라임",
    tier: 3,
    emoji: "🐋",
    face: "◕🌊◕",
    description: "물의 궁극체, 심해를 지배하는 전설",
    condition: { type: "feed_ratio", params: { water: 0.7 } },
  },
  {
    id: "cosmic",
    name: "Cosmic",
    nameKr: "코스믹 슬라임",
    tier: 3,
    emoji: "🪐",
    face: "✧🌌✧",
    description: "별의 궁극체, 우주를 유영하는 존재",
    condition: { type: "feed_ratio", params: { star: 0.7 } },
  },
  {
    id: "emperor",
    name: "Emperor",
    nameKr: "엠페러 슬라임",
    tier: 3,
    emoji: "👑",
    face: "▼▽▼",
    description: "완벽한 균형으로 모든 속성을 지배한 황제",
    condition: { type: "feed_ratio", params: { balanced: 1 } },
  },
  // ─── Tier 3 (Lv.50) ─── Hidden
  {
    id: "ancient",
    name: "Ancient",
    nameKr: "에인션트 슬라임",
    tier: 3,
    emoji: "🗿",
    face: "◈‸◈",
    description: "태초부터 존재했다는 전설의 슬라임 (1% 확률)",
    condition: { type: "hidden", params: { probability: 0.01 } },
  },
  {
    id: "void",
    name: "Void",
    nameKr: "보이드 슬라임",
    tier: 3,
    emoji: "🕳️",
    face: "◉◡◉",
    description: "모든 것을 삼키는 공허의 슬라임 (0.5% 확률)",
    condition: { type: "hidden", params: { probability: 0.005 } },
  },
  {
    id: "angel",
    name: "Angel",
    nameKr: "천사 슬라임",
    tier: 3,
    emoji: "👼",
    face: "◕‿◕",
    description: "모든 먹이를 정확히 33%씩 먹은 기적의 슬라임",
    condition: { type: "mixed", params: { fire: 0.33, water: 0.33, star: 0.33 } },
  },
];

export const TIER_LEVELS: Record<EvolutionTier, number> = {
  1: 10,
  2: 25,
  3: 50,
};

export function getExpThreshold(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function getHourBucket(hour: number): "day" | "night" {
  return hour >= 6 && hour < 22 ? "day" : "night";
}

export function determineEvolution(
  feedLog: Record<string, number>,
  level: number,
  lastFedAt: Date | null,
  streakDays: number,
  currentType = "basic"
): EvolutionResult {
  const total = Object.values(feedLog).reduce((sum, v) => sum + v, 0);
  if (total === 0) {
    return { evolved: false, from: currentType, to: currentType, newSlime: null };
  }

  const feedStats = {
    fire: (feedLog.fire || 0) / total,
    water: (feedLog.water || 0) / total,
    star: (feedLog.star || 0) / total,
  };

  const now = new Date();
  const hourBucket = getHourBucket(now.getHours());

  const neglectDays = lastFedAt
    ? Math.floor((now.getTime() - new Date(lastFedAt).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const tier = (
    level >= TIER_LEVELS[3] ? 3 :
    level >= TIER_LEVELS[2] ? 2 :
    level >= TIER_LEVELS[1] ? 1 :
    null
  ) as EvolutionTier | null;

  if (!tier) {
    return { evolved: false, from: currentType, to: currentType, newSlime: null };
  }

  const candidates = EVOLUTION_TABLE.filter((e) => e.tier <= tier);

  // Priority: neglect > streak > feed_ratio > mixed > time_of_day > hidden
  const scored = candidates
    .map((entry) => {
      let score = 0;
      const { type, params } = entry.condition;

      switch (type) {
        case "neglect": {
          const minDays = params.min_days as number;
          if (neglectDays >= minDays) score = 100 + neglectDays;
          break;
        }
        case "streak": {
          const minDays = params.min_days as number;
          if (streakDays >= minDays) score = 90 + streakDays;
          break;
        }
        case "feed_ratio": {
          if (params.balanced) {
            const max = Math.max(feedStats.fire, feedStats.water, feedStats.star);
            const min = Math.min(feedStats.fire, feedStats.water, feedStats.star);
            score = 80 - (max - min) * 10;
            break;
          }
          for (const [key, threshold] of Object.entries(params)) {
            const val = feedStats[key as FeedType] || 0;
            if (val >= (threshold as number)) {
              score = 80 + val * 20;
            } else {
              score = 0;
              break;
            }
          }
          break;
        }
        case "mixed": {
          let match = true;
          let diff = 0;
          for (const [key, target] of Object.entries(params)) {
            const val = feedStats[key as FeedType] || 0;
            const margin = 0.1;
            if (val < (target as number) - margin || val > (target as number) + margin) {
              match = false;
            }
            diff += Math.abs(val - (target as number));
          }
          score = match ? 85 - diff * 10 : 0;
          break;
        }
        case "time_of_day": {
          const nightRatio = params.night_ratio as number | undefined;
          const dayRatio = params.day_ratio as number | undefined;
          if (nightRatio !== undefined && hourBucket === "night") score = 70;
          else if (dayRatio !== undefined && hourBucket === "day") score = 70;
          break;
        }
        case "hidden": {
          const prob = params.probability as number;
          score = Math.random() < prob ? 60 : 0;
          break;
        }
      }

      return { entry, score };
    })
    .filter((s) => s.score > 0);

  if (scored.length === 0) {
    return { evolved: false, from: currentType, to: currentType, newSlime: null };
  }

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];

  return {
    evolved: true,
    from: currentType,
    to: best.entry.id,
    newSlime: best.entry,
  };
}
