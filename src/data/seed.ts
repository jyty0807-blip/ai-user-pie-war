import { db } from "@/lib/db";
import {
  companies,
  dailyMetrics,
  newsItems,
  pricingHistory,
  timelineEvents,
  platforms,
  platformMetrics,
  sentimentPosts,
} from "@/lib/db/schema";
import { companies as companiesData, getCompanyBySlug } from "./companies";
import {
  platforms as platformsData,
  platformMetrics as platformMetricsData,
} from "./platforms";
import { getMonthlyMetrics } from "./metrics";
import { pricingHistory as pricingData } from "./pricing-history";
import { timelineEvents as timelineData } from "./timeline-events";

/**
 * Seed the database with all foundation data.
 * Safe to run multiple times — clears existing data first.
 */
export async function seed(): Promise<void> {
  console.log("🌱 Starting seed...");

  // ── Clear existing data (reverse FK order) ─────────────────
  await db.delete(platformMetrics);
  await db.delete(sentimentPosts);
  await db.delete(dailyMetrics);
  await db.delete(newsItems);
  await db.delete(pricingHistory);
  await db.delete(timelineEvents);
  await db.delete(platforms);
  await db.delete(companies);
  console.log("  ✓ Cleared existing data");

  // ── Insert companies ───────────────────────────────────────
  const insertedCompanies = await db
    .insert(companies)
    .values(
      companiesData.map((c) => ({
        name: c.name,
        slug: c.slug,
        logo_url: c.logo_url,
        color: c.color,
        category: c.category,
        positioning: c.positioning,
        description: c.description,
      })),
    )
    .returning({ id: companies.id, slug: companies.slug });

  console.log(
    `  ✓ Inserted ${insertedCompanies.length} companies`,
  );

  // Build slug → id map
  const companyMap = new Map(
    insertedCompanies.map((c) => [c.slug, c.id]),
  );

  // ── Insert platforms ───────────────────────────────────────
  const insertedPlatforms = await db
    .insert(platforms)
    .values(
      platformsData.map((p) => ({
        name: p.name,
        slug: p.slug,
        logo_url: p.logo_url,
        color: p.color,
        category: p.category,
        description: p.description,
      })),
    )
    .returning({ id: platforms.id, slug: platforms.slug });

  console.log(
    `  ✓ Inserted ${insertedPlatforms.length} platforms`,
  );

  const platformMap = new Map(
    insertedPlatforms.map((p) => [p.slug, p.id]),
  );

  // ── Insert platform metrics ─────────────────────────────────
  const pmValues = platformMetricsData
    .map((pm) => {
      const platformId = platformMap.get(pm.platform_slug);
      if (!platformId) return null;
      return {
        platform_id: platformId,
        metric_name: pm.metric_name,
        metric_value: String(pm.metric_value),
        metric_unit: pm.metric_unit,
        data_source: pm.data_source,
        recorded_date: new Date(),
      };
    })
    .filter(
      (v): v is NonNullable<typeof v> => v !== null,
    );

  if (pmValues.length > 0) {
    await db.insert(platformMetrics).values(pmValues);
    console.log(
      `  ✓ Inserted ${pmValues.length} platform metrics`,
    );
  }

  // ── Insert daily metrics ────────────────────────────────────
  const monthlyMetrics = getMonthlyMetrics();
  const dmValues = monthlyMetrics
    .map((m) => {
      const companyId = companyMap.get(m.company_slug);
      if (!companyId) return null;

      const companyAdChannels =
        getCompanyBySlug(m.company_slug)?.ad_channels ?? [];

      return {
        company_id: companyId,
        date: new Date(m.year, m.month - 1, 1),
        estimated_ad_spend: String(m.estimated_ad_spend),
        estimated_users_mau: String(m.estimated_users_mau),
        paid_conversion_rate: String(m.paid_conversion_rate),
        avg_revenue_per_user: String(m.avg_revenue_per_user),
        cac_estimate: String(m.cac_estimate),
        market_share_pct: String(m.market_share_pct),
        ad_channels: companyAdChannels,
      };
    })
    .filter(
      (v): v is NonNullable<typeof v> => v !== null,
    );

  if (dmValues.length > 0) {
    await db.insert(dailyMetrics).values(dmValues);
    console.log(
      `  ✓ Inserted ${dmValues.length} daily metrics records`,
    );
  }

  // ── Insert pricing history ──────────────────────────────────
  const phValues = pricingData
    .map((ph) => {
      const companyId = companyMap.get(ph.company_slug);
      if (!companyId) return null;
      return {
        company_id: companyId,
        model_name: ph.model_name,
        input_price_per_mtok: String(ph.input_price_per_mtok),
        output_price_per_mtok: String(ph.output_price_per_mtok),
        effective_date: new Date(ph.effective_date),
        notes: ph.notes,
      };
    })
    .filter(
      (v): v is NonNullable<typeof v> => v !== null,
    );

  if (phValues.length > 0) {
    await db.insert(pricingHistory).values(phValues);
    console.log(
      `  ✓ Inserted ${phValues.length} pricing records`,
    );
  }

  // ── Insert timeline events ──────────────────────────────────
  const teValues = timelineData
    .map((te) => {
      const companyId = companyMap.get(te.company_slug);
      if (!companyId) return null;
      return {
        company_id: companyId,
        title: te.title,
        description: te.description,
        event_date: new Date(te.event_date),
        event_type: te.event_type,
        impact_metric: te.impact_metric,
        impact_value: te.impact_value,
        url: te.url,
      };
    })
    .filter(
      (v): v is NonNullable<typeof v> => v !== null,
    );

  if (teValues.length > 0) {
    await db.insert(timelineEvents).values(teValues);
    console.log(
      `  ✓ Inserted ${teValues.length} timeline events`,
    );
  }

  console.log("✅ Seed complete!");
}

// Allow running directly: npx tsx src/data/seed.ts
// Detect if this file is the entry point
const isMainModule =
  typeof process !== "undefined" &&
  process.argv[1]?.endsWith("seed.ts");

if (isMainModule) {
  seed()
    .then(() => {
      console.log("Done.");
      process.exit(0);
    })
    .catch((err: unknown) => {
      console.error("Seed failed:", err);
      process.exit(1);
    });
}
