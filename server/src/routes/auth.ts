import { Hono } from "hono";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { hashPasswordSync, verifyPasswordSync, signToken } from "../lib/auth";

export const authRoutes = new Hono();

authRoutes.post("/register", async (c) => {
  try {
    const { username, password } = await c.req.json();

    if (!username || !password) {
      return c.json({ error: "아이디와 비밀번호를 입력해주세요." }, 400);
    }
    if (username.length < 2 || username.length > 20) {
      return c.json({ error: "아이디는 2~20자로 입력해주세요." }, 400);
    }
    if (password.length < 8) {
      return c.json({ error: "비밀번호는 8자 이상 입력해주세요." }, 400);
    }
    if (!/[0-9]/.test(password) || !/[a-zA-Z]/.test(password)) {
      return c.json({ error: "비밀번호는 영문과 숫자를 포함해야 합니다." }, 400);
    }

    const [existing] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (existing) {
      return c.json({ error: "이미 사용 중인 아이디입니다." }, 409);
    }

    const passwordHash = hashPasswordSync(password);
    const [user] = await db
      .insert(users)
      .values({ username, password_hash: passwordHash, display_name: username })
      .returning({ id: users.id, username: users.username });

    const token = await signToken({ userId: user.id, username: user.username });

    return c.json({ id: user.id, username: user.username, token });
  } catch (err) {
    console.error("Register error:", err);
    return c.json({ error: "회원가입 중 오류가 발생했습니다." }, 500);
  }
});

authRoutes.post("/login", async (c) => {
  try {
    const { username, password } = await c.req.json();

    if (!username || !password) {
      return c.json({ error: "아이디와 비밀번호를 입력해주세요." }, 400);
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (!user) {
      return c.json({ error: "아이디 또는 비밀번호가 일치하지 않습니다." }, 401);
    }

    if (!verifyPasswordSync(password, user.password_hash)) {
      return c.json({ error: "아이디 또는 비밀번호가 일치하지 않습니다." }, 401);
    }

    await db
      .update(users)
      .set({ last_login_at: new Date() })
      .where(eq(users.id, user.id));

    const token = await signToken({ userId: user.id, username: user.username });

    return c.json({ id: user.id, username: user.username, token });
  } catch (err) {
    console.error("Login error:", err);
    return c.json({ error: "로그인 중 오류가 발생했습니다." }, 500);
  }
});
