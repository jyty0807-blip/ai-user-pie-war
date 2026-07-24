import Parser from "rss-parser";

export interface ParsedFeedItem {
  title: string;
  url: string;
  source: string;
  snippet: string;
  publishedAt: Date | null;
  category: "news" | "pricing" | "update";
}

/** Internal custom fields shape for rss-parser item extension. */
interface CustomItemFields {
  description: string;
}

const parser = new Parser<Record<string, never>, CustomItemFields>({
  customFields: {
    item: ["description"],
  },
});

/** RSS feed URLs per company slug. Approximate — update as needed. */
const RSS_FEEDS: Record<string, string> = {
  openai: "https://openai.com/blog/rss",
  anthropic: "https://anthropic.com/blog/rss",
  deepseek: "https://deepseek.com/feed",
  "google-ai": "https://blog.google/technology/ai/rss",
};

/**
 * Truncate a string to a maximum length, appending ellipsis if needed.
 */
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

/**
 * Classify a news item based on its title/description content.
 */
function classifyItem(title: string, description: string): "news" | "pricing" | "update" {
  const combined = `${title} ${description}`.toLowerCase();

  if (
    combined.includes("price") ||
    combined.includes("pricing") ||
    combined.includes("$") ||
    combined.includes("mtok") ||
    combined.includes("per token") ||
    combined.includes("cost") ||
    combined.includes("free tier")
  ) {
    return "pricing";
  }

  if (
    combined.includes("update") ||
    combined.includes("upgrade") ||
    combined.includes("patch") ||
    combined.includes("changelog") ||
    combined.includes("release") ||
    combined.includes("version") ||
    combined.includes("now available")
  ) {
    return "update";
  }

  return "news";
}

/**
 * Fetch and parse RSS feed for a company.
 * Returns parsed items with standardized structure.
 */
export async function fetchCompanyNews(
  companySlug: string,
): Promise<ParsedFeedItem[]> {
  const feedUrl = RSS_FEEDS[companySlug];

  if (!feedUrl) {
    console.warn(`No RSS feed configured for company: ${companySlug}`);
    return [];
  }

  try {
    const feed = await parser.parseURL(feedUrl);
    const items: ParsedFeedItem[] = [];

    if (!feed.items) return items;

    for (const item of feed.items) {
      const title = item.title ?? "Untitled";
      const description = item.description ?? "";
      const link = item.link ?? "";
      const pubDate = item.pubDate ? new Date(item.pubDate) : null;

      items.push({
        title,
        url: link,
        source: feedUrl,
        snippet: truncate(
          description.replace(/<[^>]*>/g, "").trim(),
          280,
        ),
        publishedAt: pubDate,
        category: classifyItem(title, description),
      });
    }

    return items;
  } catch (error) {
    console.error(
      `Failed to fetch RSS for ${companySlug}:`,
      (error as Error).message,
    );
    return [];
  }
}

/**
 * Fetch news for all configured companies in parallel.
 * Returns a flat array of all parsed items, each tagged with company slug.
 */
export async function fetchAllCompanyNews(): Promise<
  Array<ParsedFeedItem & { companySlug: string }>
> {
  const slugs = Object.keys(RSS_FEEDS);

  const results = await Promise.all(
    slugs.map(async (slug) => {
      const items = await fetchCompanyNews(slug);
      return items.map((item) => ({
        ...item,
        companySlug: slug,
      }));
    }),
  );

  return results.flat();
}
