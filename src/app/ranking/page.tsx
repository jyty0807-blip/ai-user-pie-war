"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Trophy, Medal, Home } from "lucide-react";

interface RankEntry { rank: number; userId: number; username: string; displayName: string | null; totalExp: number; feedCount: number; }

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Trophy className="h-5 w-5 text-amber-400" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-700" />;
  return <span className="text-sm font-bold text-[#9a9898] w-5 text-center">{rank}</span>;
}

export default function RankingPage() {
  const [rankings, setRankings] = useState<RankEntry[]>([]);

  useEffect(() => {
    apiFetch<{ rankings: RankEntry[] }>("/api/ranking").then((d) => setRankings(d.rankings || [])).catch(() => {});
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#fdfcfc] dark:bg-[#1a1a1a]">
      <header className="border-b border-[rgba(15,0,0,0.12)] dark:border-[rgba(255,255,255,0.08)]">
        <div className="mx-auto flex max-w-4xl items-center px-4 py-2.5">
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-semibold text-[#201d1d] dark:text-[#fdfcfc]"><Home className="h-4 w-4" /> 길드로 돌아가기</Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-lg px-4 py-12">
          <div className="mb-6 flex items-center gap-2"><Trophy className="h-6 w-6 text-amber-400" /><h1 className="text-xl font-bold text-[#201d1d] dark:text-[#fdfcfc]">기여도 랭킹</h1></div>
          {rankings.length === 0 ? (
            <p className="text-sm text-[#9a9898] dark:text-[#666]">아직 기여 내역이 없습니다. 첫 기여자가 되어보세요!</p>
          ) : (
            <div className="flex flex-col gap-2">
              {rankings.map((entry) => (
                <div key={entry.userId} className="flex items-center gap-3 rounded-xl border border-[rgba(15,0,0,0.08)] p-3 dark:border-[rgba(255,255,255,0.08)]">
                  <div className="flex h-8 w-8 items-center justify-center"><RankIcon rank={entry.rank} /></div>
                  <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-[#201d1d] truncate dark:text-[#fdfcfc]">{entry.displayName || entry.username}</p><p className="text-xs text-[#9a9898] dark:text-[#666]">{entry.feedCount}회 기여</p></div>
                  <div className="text-right"><p className="text-lg font-bold text-[#201d1d] dark:text-[#fdfcfc]">{entry.totalExp}</p><p className="text-[10px] text-[#9a9898] dark:text-[#666]">EXP</p></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
