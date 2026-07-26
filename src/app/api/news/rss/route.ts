import { NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";

const CRAWLED_DIR = join(process.cwd(), "src", "data", "crawled");

function readJSON(filename: string) {
  const path = join(CRAWLED_DIR, filename);
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get("source"); // rss | hn | reddit | exchange-rate | all

  switch (source) {
    case "rss":
      return NextResponse.json(readJSON("rss-feeds.json") ?? { error: "not yet crawled" });
    case "hn":
      return NextResponse.json(readJSON("hacker-news.json") ?? { error: "not yet crawled" });
    case "reddit":
      return NextResponse.json(readJSON("reddit.json") ?? { error: "not yet crawled" });
    case "exchange-rate":
      return NextResponse.json(readJSON("exchange-rate.json") ?? { error: "not yet crawled" });
    case "all":
    default: {
      return NextResponse.json({
        exchangeRate: readJSON("exchange-rate.json"),
        rssFeeds: readJSON("rss-feeds.json"),
        hackerNews: readJSON("hacker-news.json"),
        reddit: readJSON("reddit.json"),
      });
    }
  }
}
