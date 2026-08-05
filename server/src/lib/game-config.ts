import { db } from "../db";
import { configs } from "../db/schema";
import { eq } from "drizzle-orm";

export interface GameConfig {
  expPerFeed: number;
  expPerFeedVariance: number;
  guildExpPerFeed: number;
  expThresholdBase: number;
  expThresholdMultiplier: number;
  guildExpThresholdBase: number;
  guildExpThresholdMultiplier: number;
  evolutionTierLevels: Record<number, number>;
  commentContributionExp: number;
}

const CONFIG_KEY = "game_balance";

export const DEFAULT_CONFIG: GameConfig = {
  expPerFeed: 10,
  expPerFeedVariance: 6,
  guildExpPerFeed: 10,
  expThresholdBase: 100,
  expThresholdMultiplier: 1.5,
  guildExpThresholdBase: 200,
  guildExpThresholdMultiplier: 1.5,
  evolutionTierLevels: { 1: 10, 2: 25, 3: 50 },
  commentContributionExp: 5,
};

let cachedConfig: GameConfig | null = null;

export async function loadConfig(): Promise<GameConfig> {
  try {
    const [row] = await db
      .select({ value: configs.value })
      .from(configs)
      .where(eq(configs.key, CONFIG_KEY))
      .limit(1);

    if (row) {
      cachedConfig = { ...DEFAULT_CONFIG, ...(row.value as Partial<GameConfig>) };
    } else {
      await db
        .insert(configs)
        .values({ key: CONFIG_KEY, value: DEFAULT_CONFIG as unknown as Record<string, unknown> })
        .onConflictDoNothing();
      cachedConfig = { ...DEFAULT_CONFIG };
    }
    return cachedConfig;
  } catch {
    cachedConfig = { ...DEFAULT_CONFIG };
    return cachedConfig;
  }
}

export function getConfig(): GameConfig {
  return cachedConfig || DEFAULT_CONFIG;
}

export async function updateConfig(patch: Partial<GameConfig>): Promise<GameConfig> {
  const current = await loadConfig();
  const next = { ...current, ...patch };

  await db
    .update(configs)
    .set({
      value: next as unknown as Record<string, unknown>,
      updated_at: new Date(),
    })
    .where(eq(configs.key, CONFIG_KEY));

  cachedConfig = next;
  return next;
}
