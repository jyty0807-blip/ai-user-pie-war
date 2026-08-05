import { Hono } from "hono";
import { db } from "../db";
import { users, slimeStates, contributions, comments } from "../db/schema";
import { sql, count, desc } from "drizzle-orm";
import { getConfig } from "../lib/game-config";

export const statsRoutes = new Hono();

statsRoutes.get("/", async (c) => {
  try {
    const config = getConfig();
    const [userCount] = await db.select({ total: count() }).from(users);
    const [activeToday] = await db
      .select({ total: count() })
      .from(contributions)
      .where(sql`${contributions.created_at} >= CURRENT_DATE`);

    const evoDist = await db
      .select({ slimeType: slimeStates.slime_type, count: count() })
      .from(slimeStates)
      .groupBy(slimeStates.slime_type)
      .orderBy(desc(count()));

    const [avgLevel] = await db
      .select({ avg: sql<number>`ROUND(AVG(${slimeStates.level}), 1)` })
      .from(slimeStates);

    const [todayFeeds] = await db
      .select({ total: count() })
      .from(contributions)
      .where(sql`${contributions.created_at} >= CURRENT_DATE AND ${contributions.action_type} = 'feed'`);

    const [commentCount] = await db.select({ total: count() }).from(comments);

    const evoMap: Record<string, number> = {};
    for (const row of evoDist) evoMap[row.slimeType] = row.count;

    const counts = Object.values(evoMap);
    const mean = counts.reduce((a, b) => a + b, 0) / (counts.length || 1);
    const variance = counts.reduce((s, c) => s + Math.pow(c - mean, 2), 0) / (counts.length || 1);
    const balanceScore = Math.max(0, Math.min(100, Math.round(100 - Math.sqrt(variance) * 5)));
    const engagementRate = userCount.total > 0
      ? Math.round((activeToday.total / userCount.total) * 100) : 0;

    return c.json({
      config,
      metrics: {
        totalUsers: userCount.total, activeToday: activeToday.total,
        avgLevel: avgLevel.avg || 0, todayFeeds: todayFeeds.total,
        totalComments: commentCount.total, engagementRate, balanceScore,
      },
      evolutionDistribution: evoMap,
    });
  } catch (err) {
    console.error("Stats error:", err);
    return c.json({ error: "통계 조회 중 오류" }, 500);
  }
});
