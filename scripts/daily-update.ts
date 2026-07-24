import { db } from "@/lib/db";
import { companies, dailyMetrics, newsItems } from "@/lib/db/schema";
import { fetchAllCompanyNews } from "@/lib/rss";
import { getMonthlyMetrics } from "@/data/metrics";
import { getCompanyBySlug } from "@/data/companies";
import { and, eq } from "drizzle-orm";

/**
 * Railway cron job: daily update for the AI User Pie War dashboard.
 *
 * Runs once per day. Updates:
 * 1. RSS news items
 * 2. Latest daily metrics
 * 3. (Future) pricing change detection
 *
 * Usage: npx tsx scripts/daily-update.ts
 */
async function dailyUpdate(): Promise<void> {
  console.log(`\n📡 [${new Date().toISOString()}] Starting daily update...\n`);

  // ── Step 1: Fetch RSS news ──────────────────────────────────
  console.log("  1/3 Fetching RSS feeds...");
  try {
    const news = await fetchAllCompanyNews();
    let inserted = 0;

    // Resolve company slugs to IDs
    const companyRows = await db
      .select({ id: companies.id, slug: companies.slug })
      .from(companies);

    const companyMap = new Map(
      companyRows.map((c) => [c.slug, c.id]),
    );

    for (const item of news) {
      const companyId = companyMap.get(item.companySlug);
      if (!companyId) continue;

      await db.insert(newsItems).values({
        company_id: companyId,
        title: item.title,
        url: item.url,
        source: item.source,
        snippet: item.snippet,
        category: item.category,
        published_at: item.publishedAt ?? new Date(),
      });
      inserted++;
    }

    console.log(`    ✓ Inserted ${inserted} new news items`);
  } catch (error) {
    console.error(
      "    ✗ News fetch failed:",
      (error as Error).message,
    );
  }

  // ── Step 2: Update daily metrics ────────────────────────────
  console.log("  2/3 Updating daily metrics...");
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed

    // For the current period, insert/update the latest mock metrics
    const metrics = getMonthlyMetrics();
    const latestMetrics = metrics.filter(
      (m) => m.year === currentYear && m.month === currentMonth + 1,
    );

    const companyRows = await db
      .select({ id: companies.id, slug: companies.slug })
      .from(companies);

    const companyMap = new Map(
      companyRows.map((c) => [c.slug, c.id]),
    );

    for (const m of latestMetrics) {
      const companyId = companyMap.get(m.company_slug);
      if (!companyId) continue;

      const adChannels =
        getCompanyBySlug(m.company_slug)?.ad_channels ?? [];

      // Upsert: delete existing for this date, then insert
      await db
        .delete(dailyMetrics)
        .where(
          and(
            eq(dailyMetrics.company_id, companyId),
            eq(dailyMetrics.date, new Date(currentYear, currentMonth, 1)),
          ),
        );

      await db.insert(dailyMetrics).values({
        company_id: companyId,
        date: new Date(currentYear, currentMonth, 1),
        estimated_ad_spend: String(m.estimated_ad_spend),
        estimated_users_mau: String(m.estimated_users_mau),
        paid_conversion_rate: String(m.paid_conversion_rate),
        avg_revenue_per_user: String(m.avg_revenue_per_user),
        cac_estimate: String(m.cac_estimate),
        market_share_pct: String(m.market_share_pct),
        ad_channels: adChannels,
      });
    }

    console.log(
      `    ✓ Updated ${latestMetrics.length} company metrics`,
    );
  } catch (error) {
    console.error(
      "    ✗ Metrics update failed:",
      (error as Error).message,
    );
  }

  // ── Step 3: Scan for pricing changes ────────────────────────
  console.log("  3/3 Scanning for pricing changes...");
  try {
    const recentNews = await fetchAllCompanyNews();
    const pricingItems = recentNews.filter(
      (item) => item.category === "pricing",
    );

    if (pricingItems.length > 0) {
      console.log(
        `    ℹ Found ${pricingItems.length} potential pricing updates`,
      );
      pricingItems.forEach((item) => {
        console.log(`      - [${item.companySlug}] ${item.title}`);
      });
    } else {
      console.log("    ✓ No new pricing changes detected");
    }
  } catch (error) {
    console.error(
      "    ✗ Pricing scan failed:",
      (error as Error).message,
    );
  }

  console.log(`\n✅ Daily update complete at ${new Date().toISOString()}\n`);
}

dailyUpdate()
  .then(() => process.exit(0))
  .catch((err: unknown) => {
    console.error("Daily update failed:", err);
    process.exit(1);
  });
