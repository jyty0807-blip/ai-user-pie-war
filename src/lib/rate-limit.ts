const buckets = new Map<string, { tokens: number; lastRefill: number }>();

const WINDOW_MS = 60_000;
const MAX_TOKENS = 30;

function getBucketKey(ip: string, route: string): string {
  return `${ip}:${route}`;
}

export function checkRateLimit(ip: string, route: string): boolean {
  const key = getBucketKey(ip, route);
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket) {
    buckets.set(key, { tokens: MAX_TOKENS - 1, lastRefill: now });
    return true;
  }

  const elapsed = now - bucket.lastRefill;
  const refill = Math.floor(elapsed / WINDOW_MS) * MAX_TOKENS;
  bucket.tokens = Math.min(MAX_TOKENS, bucket.tokens + refill);

  if (refill > 0) {
    bucket.lastRefill = now;
  }

  if (bucket.tokens <= 0) {
    return false;
  }

  bucket.tokens -= 1;
  return true;
}

setInterval(
  () => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (now - bucket.lastRefill > WINDOW_MS * 2) {
        buckets.delete(key);
      }
    }
  },
  WINDOW_MS * 2
);
