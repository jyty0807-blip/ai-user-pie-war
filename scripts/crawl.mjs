#!/usr/bin/env node
/**
 * Daily crawl script — GitHub Actions cron runner
 * Fetches RSS/API data and writes JSON cache files.
 * 
 * Usage: node scripts/crawl.mjs
 * Output: src/data/crawled/*.json
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "src", "data", "crawled");
const TZ = "Asia/Seoul";
const NOW = new Date().toLocaleString("ko-KR", { timeZone: TZ });

mkdirSync(DATA_DIR, { recursive: true });

function writeJSON(filename, data) {
  writeFileSync(join(DATA_DIR, filename), JSON.stringify(data, null, 2), "utf-8");
  console.log(`  ✔ ${filename}`);
}

// ── Helpers ───────────────────────────────────────────────────

async function fetchJSON(url, opts = {}) {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000), ...opts });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

// ── 1. Exchange Rate ──────────────────────────────────────────

async function crawlExchangeRate() {
  console.log("\n[1/4] 환율 수집...");
  try {
    const data = await fetchJSON("https://open.er-api.com/v6/latest/USD");
    const krw = data.rates?.KRW;
    if (!krw) throw new Error("KRW rate not found");
    writeJSON("exchange-rate.json", {
      rate: krw,
      updated: new Date().toISOString(),
      source: "https://open.er-api.com/v6/latest/USD",
    });
  } catch (e) {
    console.error("  ✗ 환율 실패:", e.message);
  }
}

// ── 2. RSS Feeds (RSS→JSON proxy) ─────────────────────────────

// Known-working RSS feeds. Update URLs if they change.
const RSS_FEEDS = [
  { id: "openai", name: "OpenAI Blog", url: "https://openai.com/blog/rss.xml" },
  // Anthropic has no public RSS — skip, rely on HN/Reddit for Anthropic news
  { id: "google-ai", name: "Google AI Blog", url: "https://blog.google/technology/ai/rss/" },
];

/** Minimal RSS+Atom→JSON parser (no deps) */
function parseFeed(xml) {
  const items = [];
  // Try RSS <item> tags first
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const c = match[1];
    items.push(extractEntry(c, "rss"));
  }
  // If no RSS items, try Atom <entry> tags
  if (items.length === 0) {
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/gi;
    while ((match = entryRegex.exec(xml)) !== null) {
      const c = match[1];
      items.push(extractEntry(c, "atom"));
    }
  }
  return items;
}

function extractEntry(content, format) {
  const title = (content.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || content.match(/<title[^>]*>(.*?)<\/title>/))?.[1] || "";
  let link = "";
  if (format === "atom") {
    const href = content.match(/<link[^>]*href="(.*?)"[^>]*\/?>/);
    if (href) link = href[1];
  } else {
    link = content.match(/<link>(.*?)<\/link>/)?.[1] || "";
  }
  const desc = (content.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || content.match(/<description[^>]*>(.*?)<\/description>/) || content.match(/<summary[^>]*>(.*?)<\/summary>/))?.[1] || "";
  const pubDate = content.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || content.match(/<published>(.*?)<\/published>/)?.[1] || content.match(/<updated>(.*?)<\/updated>/)?.[1] || "";
  return { title, link, description: desc.replace(/<[^>]*>/g, "").trim().slice(0, 300), pubDate };
}

async function crawlRSS() {
  console.log("\n[2/4] RSS 피드 수집...");
  const feeds = {};
  const results = await Promise.allSettled(
    RSS_FEEDS.map(async (feed) => {
      const xml = await fetchText(feed.url);
      const items = parseFeed(xml);
      return { id: feed.id, name: feed.name, url: feed.url, items: items.slice(0, 10), fetched: new Date().toISOString() };
    })
  );
  for (const r of results) {
    if (r.status === "fulfilled") {
      feeds[r.value.id] = r.value;
      console.log(`  ✔ ${r.value.id}: ${r.value.items.length}개`);
    } else {
      const id = RSS_FEEDS[results.indexOf(r)]?.id || "?";
      console.error(`  ✗ ${id}: ${r.reason?.message || "unknown"}`);
      feeds[id] = { name: RSS_FEEDS.find(f => f.id === id)?.name || id, url: "", items: [], fetched: new Date().toISOString(), error: r.reason?.message };
    }
  }
  writeJSON("rss-feeds.json", feeds);
}

// ── 3. Hacker News (AI 관련) ─────────────────────────────────

async function crawlHN() {
  console.log("\n[3/4] Hacker News AI 관련 수집...");
  try {
    // Fetch top stories, filter AI-related
    const topIds = await fetchJSON("https://hacker-news.firebaseio.com/v0/topstories.json");
    const batch = topIds.slice(0, 60);
    const stories = [];
    const aiKeywords = ["ai", "openai", "anthropic", "deepseek", "gemini", "gpt", "claude", "llm", "neural",
      "machine learning", "artificial intelligence", "chatgpt", "codex", "llama", "mistral"];

    for (const id of batch) {
      try {
        const story = await fetchJSON(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        if (story?.title && aiKeywords.some(k => story.title.toLowerCase().includes(k))) {
          stories.push({ id: story.id, title: story.title, url: story.url || "", score: story.score, time: story.time });
        }
      } catch { /* skip */ }
    }

    stories.sort((a, b) => b.score - a.score);
    writeJSON("hacker-news.json", { stories: stories.slice(0, 20), fetched: new Date().toISOString() });
    console.log(`  ✔ ${stories.length}개 AI 관련 스토리`);
  } catch (e) {
    console.error("  ✗ HN 실패:", e.message);
  }
}

// ── 4. Reddit (AI subreddits) ─────────────────────────────────

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function crawlReddit() {
  console.log("\n[4/4] Reddit AI 커뮤니티 수집 (RSS)...");
  // Reddit RSS rate limit is tight on shared IPs — limit to key subs with generous delay
  const subreddits = ["ClaudeAI", "OpenAI"];
  const all = {};

  for (const [i, sub] of subreddits.entries()) {
    if (i > 0) await delay(10000); // rate limit 방지
    try {
      const xml = await fetchText(`https://www.reddit.com/r/${sub}/hot/.rss`);
      const entries = parseFeed(xml);
      const posts = entries.map(e => ({
        title: e.title,
        url: e.link,
        description: e.description.slice(0, 200),
        pubDate: e.pubDate,
      }));
      all[sub] = { posts: posts.slice(0, 10), fetched: new Date().toISOString() };
      console.log(`  ✔ r/${sub}: ${posts.length}개`);
    } catch (e) {
      console.error(`  ✗ r/${sub}: ${e.message}`);
      all[sub] = { posts: [], fetched: new Date().toISOString(), error: e.message };
    }
  }

  writeJSON("reddit.json", all);
}

// ── Main ──────────────────────────────────────────────────────

console.log(`\n═══════════════════════════════════`);
console.log(`  AI User Pie War — Daily Crawl`);
console.log(`  ${NOW}`);
console.log(`═══════════════════════════════════`);

await crawlExchangeRate();
await crawlRSS();
await crawlHN();
await crawlReddit();

console.log(`\n✔ 크롤링 완료 — ${new Date().toLocaleString("ko-KR", { timeZone: TZ })}\n`);
