"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  date: string;
  title: string;
  desc: string;
  type: "product_launch" | "marketing" | "business";
  icon: string;
}

const events: TimelineEvent[] = [
  {
    date: "Feb 9, 2026",
    title: "OpenAI Flips the Switch on Ads",
    desc: "OpenAI launches advertising inside ChatGPT. $60 CPM, $200K minimum buy-in. 600+ advertisers join in 6 weeks. Market share begins to erode.",
    type: "product_launch",
    icon: "📢",
  },
  {
    date: "Feb 9, 2026",
    title: "Anthropic Super Bowl Counter-Strike",
    desc: "Anthropic airs 4 darkly comic ad-funded AI spots. 'There's a time and a place for ads. Your conversations should not be one of them.' Wins Clio award. Claude hits #1 App Store.",
    type: "marketing",
    icon: "🎯",
  },
  {
    date: "Feb 10-16, 2026",
    title: "QuitGPT Movement Surges",
    desc: "2.5M participants. ChatGPT uninstalls spike 295% in a single day. 700K users leave for Claude. Market share drops from 60% to 45%.",
    type: "marketing",
    icon: "🔥",
  },
  {
    date: "Apr 2026",
    title: "Anthropic Overtakes OpenAI in Revenue",
    desc: "Anthropic reaches $30B ARR (30x growth in 16 months). Enterprise customers pay premium for ad-free AI. OpenAI revenue stalls despite ads.",
    type: "business",
    icon: "💎",
  },
  {
    date: "Jun 2026",
    title: "Anthropic Files IPO",
    desc: "Confidential IPO filing. $965B valuation. The most valuable AI company chooses trust over advertising revenue.",
    type: "business",
    icon: "📈",
  },
  {
    date: "Jul 2026",
    title: "GPT-5.6 Ships Tri-Tier Strategy",
    desc: "OpenAI launches Sol ($5/$30), Terra ($2.50/$15), Luna ($1/$6). Attempts to recapture market with flexible pricing. DeepSeek V4 Flash at $0.14/$0.28.",
    type: "product_launch",
    icon: "🚀",
  },
];

const typeStyles: Record<string, string> = {
  product_launch:
    "bg-blue-500/10 text-blue-400 border-blue-500/20",
  marketing:
    "bg-amber-500/10 text-amber-400 border-amber-500/20",
  business:
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const typeLabels: Record<string, string> = {
  product_launch: "Product Launch",
  marketing: "Marketing",
  business: "Business",
};

export function Timeline() {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-8 text-lg font-semibold text-foreground">
        2026 AI User Pie War — Timeline
      </h2>

      {/* Vertical timeline */}
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />

        <div className="space-y-0">
          {events.map((event, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={`${event.date}-${event.title}`}
                className={cn(
                  "relative flex items-start pb-10",
                  "md:flex-row",
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-border bg-card md:left-1/2">
                  <span className="text-sm" aria-hidden="true">
                    {event.icon}
                  </span>
                </div>

                {/* Card */}
                <div
                  className={cn(
                    "ml-12 w-full rounded-xl border border-border bg-card p-4 md:w-[calc(50%-2rem)]",
                    isLeft ? "md:mr-auto md:ml-0" : "md:ml-auto"
                  )}
                >
                  {/* Date badge */}
                  <div className="mb-2 inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {event.date}
                  </div>

                  {/* Event type badge */}
                  <Badge
                    variant="outline"
                    className={cn("mb-2 ml-2", typeStyles[event.type])}
                  >
                    {typeLabels[event.type]}
                  </Badge>

                  {/* Title */}
                  <h3 className="mt-1 text-base font-semibold text-foreground">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {event.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Separator className="my-8" />

      {/* Key insight callout */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
        <h3 className="text-sm font-semibold text-amber-400">
          🔑 Key Marketing Insight
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The 2026 AI User Pie War demonstrates that in the AI industry,
          <strong className="text-foreground"> trust and brand integrity </strong>
          can outperform massive ad budgets. Anthropic turned OpenAI&apos;s
          advertising play into a strategic branding counter-attack with just
          ~$45M in monthly spend — a fraction of OpenAI&apos;s $200M+ and
          Google&apos;s $500M+. The QuitGPT movement became the catalyst that
          reshaped market share from 60/40 to 45/18 in under six months.
          The lesson: when your competitor commoditizes user attention, you can
          differentiate on trust and premium experience.
        </p>
      </div>
    </div>
  );
}
