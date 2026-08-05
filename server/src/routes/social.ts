import { Hono } from "hono";
import { db } from "../db";
import { contributions, users, comments } from "../db/schema";
import { eq, sql, desc } from "drizzle-orm";
import { verifyToken, extractBearerToken } from "../lib/auth";

export const rankingRoutes = new Hono();
export const commentRoutes = new Hono();

async function requireAuth(c: any) {
  const token = extractBearerToken(c.req.header("Authorization"));
  if (!token) return null;
  return verifyToken(token);
}

rankingRoutes.get("/", async (c) => {
  try {
    const rows = await db
      .select({
        userId: contributions.user_id, username: users.username,
        displayName: users.display_name,
        totalExp: sql<number>`sum(${contributions.amount})::int`,
        feedCount: sql<number>`count(*)::int`,
      })
      .from(contributions)
      .innerJoin(users, eq(contributions.user_id, users.id))
      .groupBy(contributions.user_id, users.username, users.display_name)
      .orderBy(sql`sum(${contributions.amount}) desc`)
      .limit(50);

    return c.json({
      rankings: rows.map((r, i) => ({
        rank: i + 1, userId: r.userId, username: r.username,
        displayName: r.displayName, totalExp: r.totalExp, feedCount: r.feedCount,
      })),
    });
  } catch (err) {
    console.error("Ranking error:", err);
    return c.json({ error: "랭킹 조회 중 오류" }, 500);
  }
});

commentRoutes.get("/", async (c) => {
  try {
    const rows = await db
      .select({
        id: comments.id, content: comments.content, createdAt: comments.created_at,
        userId: users.id, username: users.username, displayName: users.display_name,
      })
      .from(comments)
      .innerJoin(users, eq(comments.user_id, users.id))
      .orderBy(desc(comments.created_at))
      .limit(50);

    return c.json({
      comments: rows.map((r) => ({
        id: r.id, content: r.content, createdAt: r.createdAt,
        user: { id: r.userId, username: r.username, displayName: r.displayName },
      })),
    });
  } catch (err) {
    console.error("Comments error:", err);
    return c.json({ error: "댓글 조회 중 오류" }, 500);
  }
});

commentRoutes.post("/", async (c) => {
  const session = await requireAuth(c);
  if (!session) return c.json({ error: "로그인이 필요합니다." }, 401);

  try {
    const { content } = await c.req.json();
    if (!content || typeof content !== "string" || !content.trim()) {
      return c.json({ error: "내용을 입력해주세요." }, 400);
    }
    if (content.length > 300) {
      return c.json({ error: "300자 이내로 입력해주세요." }, 400);
    }

    const [comment] = await db.insert(comments).values({
      user_id: session.userId, content: content.trim(),
    }).returning();

    await db.insert(contributions).values({
      user_id: session.userId, action_type: "comment", amount: 5,
      metadata: { commentId: comment.id },
    });

    return c.json({
      id: comment.id, content: comment.content, createdAt: comment.created_at,
      user: { id: session.userId, username: session.username },
    });
  } catch (err) {
    console.error("Comment create error:", err);
    return c.json({ error: "댓글 작성 중 오류" }, 500);
  }
});
