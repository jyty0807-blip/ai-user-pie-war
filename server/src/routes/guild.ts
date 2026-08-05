import { Hono } from "hono";
import { db } from "../db";
import { guildSlime, contributions } from "../db/schema";
import { eq, sql } from "drizzle-orm";
import { verifyToken, extractBearerToken } from "../lib/auth";
import { EVOLUTION_TABLE, type EvolutionEntry } from "../lib/evolution";

const EXP_PER_FEED = 10;
const GUILD_TIER_LEVELS = [5, 15, 30];

export const guildRoutes = new Hono();

async function requireAuth(c: any) {
  const token = extractBearerToken(c.req.header("Authorization"));
  if (!token) return null;
  return verifyToken(token);
}

async function ensureGuildSlime(tx?: any) {
  const client = tx || db;
  const [existing] = await client.select().from(guildSlime).limit(1);
  if (!existing) {
    const [created] = await client
      .insert(guildSlime)
      .values({
        slime_type: "basic", level: 1, total_exp: 0, current_phase: 1,
        feed_totals: { fire: 0, water: 0, star: 0 },
      })
      .returning();
    return created;
  }
  return existing;
}

function getExpThreshold(level: number): number {
  return Math.floor(200 * Math.pow(1.5, level - 1));
}

function determineGuildEvolution(feedTotals: Record<string, number>, level: number): EvolutionEntry | null {
  const total = Object.values(feedTotals).reduce((s, v) => s + v, 0);
  if (!total) return null;

  const tier = GUILD_TIER_LEVELS[0] <= level && level < GUILD_TIER_LEVELS[1] ? 1
    : GUILD_TIER_LEVELS[1] <= level ? 2 : 0;

  const feedStats = {
    fire: (feedTotals.fire || 0) / total,
    water: (feedTotals.water || 0) / total,
    star: (feedTotals.star || 0) / total,
  };

  const candidates = EVOLUTION_TABLE.filter((e) => {
    if (e.tier !== tier) return false;
    if (e.condition.type !== "feed_ratio") return false;
    if (e.condition.params.balanced) return true;
    return Object.entries(e.condition.params).every(
      ([k, v]) => (feedStats[k as keyof typeof feedStats] || 0) >= (v as number)
    );
  });

  if (!candidates.length) return null;

  candidates.sort((a, b) => {
    const scoreA = (Object.values(a.condition.params) as number[]).reduce((s, v) => s + v, 0);
    const scoreB = (Object.values(b.condition.params) as number[]).reduce((s, v) => s + v, 0);
    return scoreB - scoreA;
  });

  if (candidates[0].condition.params.balanced && candidates.length > 1) {
    return candidates[1];
  }

  return candidates[0];
}

guildRoutes.get("/", async (c) => {
  try {
    const guild = await ensureGuildSlime();
    const top = await db
      .select({ userId: contributions.user_id, total: sql<number>`sum(${contributions.amount})::int` })
      .from(contributions)
      .where(eq(contributions.action_type, "feed"))
      .groupBy(contributions.user_id)
      .orderBy(sql`sum(${contributions.amount}) desc`)
      .limit(10);

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(contributions)
      .where(eq(contributions.action_type, "feed"));

    return c.json({
      guild: {
        slimeType: guild.slime_type, level: guild.level,
        totalExp: guild.total_exp, expThreshold: getExpThreshold(guild.level),
        currentPhase: guild.current_phase, feedTotals: guild.feed_totals,
      },
      topContributors: top,
      totalContributions: count ?? 0,
    });
  } catch (err) {
    console.error("Guild error:", err);
    return c.json({ error: "길드 조회 중 오류" }, 500);
  }
});

guildRoutes.post("/", async (c) => {
  const session = await requireAuth(c);
  if (!session) return c.json({ error: "로그인이 필요합니다." }, 401);

  try {
    const { feedType } = await c.req.json();
    if (!["fire", "water", "star"].includes(feedType)) {
      return c.json({ error: "올바른 먹이 종류를 선택해주세요." }, 400);
    }

    const result = await db.transaction(async (tx) => {
      const guild = await ensureGuildSlime(tx);
      const feedTotals = guild.feed_totals as Record<string, number>;
      feedTotals[feedType] = (feedTotals[feedType] || 0) + 1;

      const newExp = guild.total_exp + EXP_PER_FEED;
      const threshold = getExpThreshold(guild.level);
      const nextLevel = newExp >= threshold ? guild.level + 1 : guild.level;
      const carryExp = newExp >= threshold ? newExp - threshold : newExp;
      const evoResult = nextLevel !== guild.level
        ? determineGuildEvolution(feedTotals, nextLevel)
        : null;
      const newType = evoResult?.id || guild.slime_type;

      await tx.update(guildSlime).set({
        total_exp: carryExp, level: nextLevel, slime_type: newType, feed_totals: feedTotals,
        ...(newType !== guild.slime_type ? { evolved_at: new Date() } : {}),
      }).where(eq(guildSlime.id, guild.id));

      await tx.insert(contributions).values({
        user_id: session.userId, action_type: "feed", amount: EXP_PER_FEED,
        metadata: { feedType, target: "guild" },
      });

      return {
        slimeType: newType, level: nextLevel, totalExp: carryExp,
        expThreshold: getExpThreshold(nextLevel), feedTotals,
        evolution: newType !== guild.slime_type
          ? { from: guild.slime_type, to: newType, level: nextLevel } : null,
      };
    });

    return c.json(result);
  } catch (err) {
    console.error("Guild feed error:", err);
    return c.json({ error: "길드 기여 중 오류" }, 500);
  }
});
