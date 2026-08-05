import { Hono } from "hono";
import { db } from "../db";
import { slimeStates, contributions } from "../db/schema";
import { eq, sql } from "drizzle-orm";
import { verifyToken, extractBearerToken } from "../lib/auth";
import { determineEvolution, getExpThreshold } from "../lib/evolution";
import { getConfig } from "../lib/game-config";

const FEED_TYPES = ["fire", "water", "star"] as const;

export const slimeRoutes = new Hono();

async function requireAuth(c: any) {
  const token = extractBearerToken(c.req.header("Authorization"));
  if (!token) return null;
  return verifyToken(token);
}

slimeRoutes.get("/", async (c) => {
  const session = await requireAuth(c);

  try {
    const [state] = session
      ? await db
          .select()
          .from(slimeStates)
          .where(eq(slimeStates.user_id, session.userId))
          .limit(1)
      : [];

    return c.json({
      authenticated: !!session,
      user: session ? { id: session.userId, username: session.username } : null,
      slime: state
        ? {
            slimeType: state.slime_type,
            level: state.level,
            exp: state.exp,
            feedLog: state.feed_log,
            evolvedAt: state.evolved_at,
          }
        : null,
    });
  } catch (err) {
    console.error("Slime state error:", err);
    return c.json({ error: "상태 조회 중 오류가 발생했습니다." }, 500);
  }
});

slimeRoutes.post("/feed", async (c) => {
  const session = await requireAuth(c);
  if (!session) return c.json({ error: "로그인이 필요합니다." }, 401);

  try {
    const { feedType } = await c.req.json();
    if (!FEED_TYPES.includes(feedType)) {
      return c.json({ error: "올바른 먹이 종류를 선택해주세요." }, 400);
    }

    const [state] = await db
      .select()
      .from(slimeStates)
      .where(eq(slimeStates.user_id, session.userId))
      .limit(1);

    let currentState = state;
    if (!currentState) {
      const [newState] = await db
        .insert(slimeStates)
        .values({
          user_id: session.userId,
          slime_type: "basic",
          level: 1,
          exp: 0,
          feed_log: { fire: 0, water: 0, star: 0 },
        })
        .returning();
      currentState = newState;
    }

    const config = getConfig();
    const feedLog = currentState.feed_log as Record<string, number>;
    const expGain = config.expPerFeed + Math.floor(Math.random() * config.expPerFeedVariance);
    feedLog[feedType] = (feedLog[feedType] || 0) + 1;

    const newExp = currentState.exp + expGain;
    const threshold = getExpThreshold(currentState.level);
    const leveledUp = newExp >= threshold;
    const nextLevel = leveledUp ? currentState.level + 1 : currentState.level;
    const carryExp = leveledUp ? newExp - threshold : newExp;

    const streakResult = await db.execute(
      `SELECT COUNT(DISTINCT DATE(created_at)) as streak
       FROM contributions
       WHERE user_id = ${session.userId}
         AND created_at >= CURRENT_DATE - INTERVAL '30 days'`
    );
    const streakDays = Number(streakResult.rows[0]?.streak) || 0;

    let evolution = null;
    let newType = currentState.slime_type;

    if (leveledUp) {
      const result = determineEvolution(feedLog, nextLevel, currentState.last_fed_at, streakDays, currentState.slime_type);
      if (result.evolved && result.newSlime) {
        newType = result.newSlime.id;
        evolution = {
          from: currentState.slime_type,
          to: result.newSlime.id,
          name: result.newSlime.nameKr,
          emoji: result.newSlime.emoji,
          level: nextLevel,
        };
      }
    }

    await db
      .update(slimeStates)
      .set({
        exp: carryExp,
        level: nextLevel,
        slime_type: newType,
        feed_log: feedLog,
        last_fed_at: new Date(),
        ...(evolution ? { evolved_at: new Date() } : {}),
      })
      .where(eq(slimeStates.id, currentState.id));

    await db.insert(contributions).values({
      user_id: session.userId,
      action_type: "feed",
      amount: expGain,
      metadata: { feedType, slimeType: currentState.slime_type },
    });

    return c.json({
      slimeType: newType,
      level: nextLevel,
      exp: carryExp,
      expThreshold: getExpThreshold(nextLevel),
      feedLog,
      streakDays,
      evolution,
    });
  } catch (err) {
    console.error("Feed error:", err);
    return c.json({ error: "먹이 주기 중 오류가 발생했습니다." }, 500);
  }
});
