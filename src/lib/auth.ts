import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { pbkdf2Sync, randomBytes } from "crypto";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret-change-in-production"
);

function assertProductionSecret() {
  if (
    process.env.NODE_ENV === "production" &&
    (!process.env.JWT_SECRET || process.env.JWT_SECRET === "dev-secret-change-in-production")
  ) {
    throw new Error(
      "JWT_SECRET must be set to a strong random value in production. Generate one with: openssl rand -hex 32"
    );
  }
}

const COOKIE_NAME = "slime_token";
const JWT_EXPIRY = "7d";

export interface SessionPayload {
  userId: number;
  username: string;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 100_000, 32, "sha256").toString("hex");
  return `${salt}:${hash}`;
}

export async function verifyPassword(
  password: string,
  stored: string
): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;

  const derived = pbkdf2Sync(password, salt, 100_000, 32, "sha256").toString("hex");
  return derived === hash;
}

export async function createSession(payload: SessionPayload): Promise<string> {
  assertProductionSecret();
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRY)
    .sign(JWT_SECRET);
}

export async function getSession(): Promise<SessionPayload | null> {
  assertProductionSecret();
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}
