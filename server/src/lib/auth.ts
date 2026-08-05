import { SignJWT, jwtVerify } from "jose";
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
      "JWT_SECRET must be set to a strong random value in production."
    );
  }
}

export interface SessionPayload {
  userId: number;
  username: string;
}

export function hashPasswordSync(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 100_000, 32, "sha256").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPasswordSync(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = pbkdf2Sync(password, salt, 100_000, 32, "sha256").toString("hex");
  return derived === hash;
}

export async function signToken(payload: SessionPayload): Promise<string> {
  assertProductionSecret();
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export function extractBearerToken(header: string | undefined): string | null {
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7);
}
