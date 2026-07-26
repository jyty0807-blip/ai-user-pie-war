import { NextResponse } from "next/server";

interface ErApiResponse {
  result: string;
  rates: Record<string, number>;
}

let cached: { rate: number; timestamp: number } | null = null;
const CACHE_TTL = 86_400_000; // 24 hours

export async function GET() {
  // Return cache if fresh
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json({ rate: cached.rate, cached: true, updated: new Date(cached.timestamp).toISOString() }, {
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=86400" },
    });
  }

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`er-api returned ${res.status}`);
    const data: ErApiResponse = await res.json();
    const krwRate = data.rates?.KRW;
    if (!krwRate) throw new Error("KRW rate not found in response");

    cached = { rate: krwRate, timestamp: Date.now() };
    return NextResponse.json({ rate: krwRate, cached: false, updated: new Date().toISOString() }, {
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=86400" },
    });
  } catch (err) {
    // Fallback to cached or hardcoded default
    const fallback = cached?.rate ?? 1474;
    console.error("Exchange rate fetch failed, using fallback:", (err as Error).message);
    return NextResponse.json({ rate: fallback, cached: false, fallback: true, updated: new Date().toISOString() }, {
      headers: { "Cache-Control": "public, max-age=3600" },
    });
  }
}
