import {
  pgTable,
  serial,
  text,
  timestamp,
  date,
  numeric,
  integer,
  jsonb,
  boolean,
  uniqueIndex,
  index,
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

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    username: text("username").notNull(),
    password_hash: text("password_hash").notNull(),
    display_name: text("display_name"),
    created_at: timestamp("created_at").defaultNow().notNull(),
    last_login_at: timestamp("last_login_at"),
  },
  (table) => ({
    usernameUnique: uniqueIndex("users_username_idx").on(table.username),
  })
);

export const slimeStates = pgTable(
  "slime_states",
  {
    id: serial("id").primaryKey(),
    user_id: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    slime_type: text("slime_type").notNull().default("basic"),
    level: integer("level").notNull().default(1),
    exp: integer("exp").notNull().default(0),
    feed_log: jsonb("feed_log").notNull().default("{}"),
    evolved_at: timestamp("evolved_at"),
    last_fed_at: timestamp("last_fed_at"),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    userUnique: uniqueIndex("slime_states_user_id_idx").on(table.user_id),
    slimeTypeIdx: index("slime_states_type_idx").on(table.slime_type),
  })
);

export const guildSlime = pgTable("guild_slime", {
  id: serial("id").primaryKey(),
  // Only one guild slime exists (id=1); guarded at app layer
  slime_type: text("slime_type").notNull().default("basic"),
  level: integer("level").notNull().default(1),
  total_exp: integer("total_exp").notNull().default(0),
  current_phase: integer("current_phase").notNull().default(1),
  // JSON: { fire: 1200, water: 890, star: 670 } — 전체 기여 합
  feed_totals: jsonb("feed_totals").notNull().default("{}"),
  evolved_at: timestamp("evolved_at"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const contributions = pgTable(
  "contributions",
  {
    id: serial("id").primaryKey(),
    user_id: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    action_type: text("action_type", {
      enum: ["click", "feed", "comment", "evolution"],
    }).notNull(),
    amount: integer("amount").notNull().default(1),
    metadata: jsonb("metadata").default("{}"),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdCreatedIdx: index("contributions_user_created_idx").on(table.user_id, table.created_at),
    actionTypeIdx: index("contributions_action_type_idx").on(table.action_type),
  })
);

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const configs = pgTable("configs", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
