import {
  pgTable,
  serial,
  text,
  timestamp,
  date,
  numeric,
  integer,
} from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logo_url: text("logo_url"),
  color: text("color").notNull(),
  category: text("category", {
    enum: ["ai_company", "platform"],
  }).notNull(),
  positioning: text("positioning"),
  description: text("description"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const dailyMetrics = pgTable("daily_metrics", {
  id: serial("id").primaryKey(),
  company_id: integer("company_id")
    .notNull()
    .references(() => companies.id),
  date: date("date", { mode: "date" }).notNull(),
  estimated_ad_spend: numeric("estimated_ad_spend"),
  estimated_users_mau: numeric("estimated_users_mau"),
  paid_conversion_rate: numeric("paid_conversion_rate"),
  avg_revenue_per_user: numeric("avg_revenue_per_user"),
  cac_estimate: numeric("cac_estimate"),
  market_share_pct: numeric("market_share_pct"),
  ad_channels: text("ad_channels").array(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const newsItems = pgTable("news_items", {
  id: serial("id").primaryKey(),
  company_id: integer("company_id")
    .notNull()
    .references(() => companies.id),
  title: text("title").notNull(),
  url: text("url"),
  source: text("source"),
  snippet: text("snippet"),
  category: text("category", {
    enum: ["news", "pricing", "update"],
  }).notNull(),
  published_at: timestamp("published_at"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const pricingHistory = pgTable("pricing_history", {
  id: serial("id").primaryKey(),
  company_id: integer("company_id")
    .notNull()
    .references(() => companies.id),
  model_name: text("model_name").notNull(),
  input_price_per_mtok: numeric("input_price_per_mtok"),
  output_price_per_mtok: numeric("output_price_per_mtok"),
  effective_date: date("effective_date", { mode: "date" }),
  notes: text("notes"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const timelineEvents = pgTable("timeline_events", {
  id: serial("id").primaryKey(),
  company_id: integer("company_id")
    .notNull()
    .references(() => companies.id),
  title: text("title").notNull(),
  description: text("description"),
  event_date: date("event_date", { mode: "date" }).notNull(),
  event_type: text("event_type", {
    enum: ["product_launch", "marketing", "pricing", "business"],
  }).notNull(),
  impact_metric: text("impact_metric"),
  impact_value: text("impact_value"),
  url: text("url"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const platforms = pgTable("platforms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logo_url: text("logo_url"),
  color: text("color").notNull(),
  category: text("category", {
    enum: ["coding_platform"],
  }).notNull(),
  description: text("description"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const platformMetrics = pgTable("platform_metrics", {
  id: serial("id").primaryKey(),
  platform_id: integer("platform_id")
    .notNull()
    .references(() => platforms.id),
  metric_name: text("metric_name").notNull(),
  metric_value: numeric("metric_value"),
  metric_unit: text("metric_unit"),
  data_source: text("data_source"),
  recorded_date: date("recorded_date", { mode: "date" }),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const sentimentPosts = pgTable("sentiment_posts", {
  id: serial("id").primaryKey(),
  platform_id: integer("platform_id")
    .notNull()
    .references(() => platforms.id),
  source: text("source"),
  source_url: text("source_url"),
  title: text("title"),
  snippet: text("snippet"),
  sentiment: text("sentiment", {
    enum: ["positive", "negative", "neutral"],
  }).notNull(),
  score: integer("score"),
  published_at: timestamp("published_at"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
