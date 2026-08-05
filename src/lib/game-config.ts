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

export const DEFAULT_CONFIG: GameConfig = {
  expPerFeed: 10,
  expPerFeedVariance: 6,
  guildExpPerFeed: 10,
  expThresholdBase: 100,
  expThresholdMultiplier: 1.5,
  guildExpThresholdBase: 200,
  guildExpThresholdMultiplier: 1.5,
  evolutionTierLevels: {
    1: 10,
    2: 25,
    3: 50,
  },
  commentContributionExp: 5,
};

let currentConfig: GameConfig = { ...DEFAULT_CONFIG };

export function getConfig(): GameConfig {
  return currentConfig;
}

export function updateConfig(patch: Partial<GameConfig>): GameConfig {
  currentConfig = { ...currentConfig, ...patch };
  return currentConfig;
}

export function resetConfig(): GameConfig {
  currentConfig = { ...DEFAULT_CONFIG };
  return currentConfig;
}
