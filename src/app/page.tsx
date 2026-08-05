"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Flame, Droplets, Star, Home, MessageCircle, LogOut, LogIn, UserPlus, Trophy } from "lucide-react";
import { EVOLUTION_TABLE } from "@/lib/evolution";

interface GuildState {
  slimeType: string; level: number; totalExp: number;
  expThreshold: number; feedTotals: Record<string, number>;
}

function getSlimeInfo(type: string) {
  const entry = EVOLUTION_TABLE.find((e) => e.id === type);
  return { emoji: entry?.emoji || "🟢", face: entry?.face || "•ᴗ•" };
}

const FEED_TYPES = [
  { key: "fire", label: "불젤리", icon: <Flame className="h-6 w-6 text-red-500" /> },
  { key: "water", label: "물방울", icon: <Droplets className="h-6 w-6 text-blue-500" /> },
  { key: "star", label: "별사탕", icon: <Star className="h-6 w-6 text-amber-400" /> },
];

const FEED_COLORS: Record<string, string> = {
  fire: "border-red-200 bg-red-50 hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:hover:bg-red-900",
  water: "border-blue-200 bg-blue-50 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:hover:bg-blue-900",
  star: "border-amber-200 bg-amber-50 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950 dark:hover:bg-amber-900",
};

export default function HomePage() {
  const { user, logout } = useAuth();
  const [guild, setGuild] = useState<GuildState | null>(null);
  const [contributorCount, setContributorCount] = useState(0);
  const [feeding, setFeeding] = useState<string | null>(null);
  const [evolutionMsg, setEvolutionMsg] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<{ guild: GuildState; totalContributions: number }>("/api/guild")
      .then((d) => { setGuild(d.guild); setContributorCount(d.totalContributions); })
      .catch(() => {});
  }, []);

  const handleFeed = useCallback(async (feedType: string) => {
    if (!user) return;
    setFeeding(feedType);
    try {
      const data = await apiFetch<any>("/api/guild", {
        method: "POST", body: JSON.stringify({ feedType }),
      });
      if (data.evolution) {
        setEvolutionMsg(`길드 슬라임이 ${data.evolution.name || data.evolution.to}(으)로 진화했습니다!`);
        setTimeout(() => setEvolutionMsg(null), 4000);
      }
      setGuild({ slimeType: data.slimeType, level: data.level, totalExp: data.totalExp, expThreshold: data.expThreshold, feedTotals: data.feedTotals });
      setContributorCount((c) => c + 1);
    } catch {} finally { setFeeding(null); }
  }, [user]);

  const slimeInfo = getSlimeInfo(guild?.slimeType || "basic");
  const expPct = guild ? Math.round((guild.totalExp / guild.expThreshold) * 100) : 0;

  return (
    <div className="flex min-h-screen flex-col bg-[#fdfcfc] dark:bg-[#1a1a1a]">
      <header className="border-b border-[rgba(15,0,0,0.12)] dark:border-[rgba(255,255,255,0.08)]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-2.5">
          <span className="text-sm font-semibold text-[#201d1d] dark:text-[#fdfcfc]">🟢 슬라임 에볼루션</span>
          <nav className="flex items-center gap-2">
            <Link href="/ranking" className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-[#646262] hover:text-[#201d1d] dark:text-[#888] dark:hover:text-[#fdfcfc]"><Trophy className="h-3.5 w-3.5" /> 랭킹</Link>
            <Link href="/comments" className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-[#646262] hover:text-[#201d1d] dark:text-[#888] dark:hover:text-[#fdfcfc]"><MessageCircle className="h-3.5 w-3.5" /> 소감</Link>
            {user ? (
              <>
                <Link href="/my-slime" className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-[#646262] hover:text-[#201d1d] dark:text-[#888] dark:hover:text-[#fdfcfc]"><Home className="h-3.5 w-3.5" /> 내 슬라임</Link>
                <span className="text-xs text-[#9a9898] dark:text-[#666]">{user.username}</span>
                <button onClick={logout} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-[#646262] hover:text-red-500 dark:text-[#888] dark:hover:text-red-400"><LogOut className="h-3.5 w-3.5" /> 로그아웃</button>
              </>
            ) : (
              <>
                <Link href="/login" className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-[#646262] hover:text-[#201d1d] dark:text-[#888] dark:hover:text-[#fdfcfc]"><LogIn className="h-3.5 w-3.5" /> 로그인</Link>
                <Link href="/register" className="inline-flex items-center gap-1 rounded-full bg-[#201d1d] px-3 py-1 text-xs font-medium text-[#fdfcfc] hover:bg-[#0f0000] dark:bg-[#fdfcfc] dark:text-[#201d1d] dark:hover:bg-[#e8e8e8]"><UserPlus className="h-3.5 w-3.5" /> 회원가입</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-12">
          {guild && (
            <div className="text-center">
              <div className="text-8xl mb-4 animate-bounce select-none">{slimeInfo.emoji}</div>
              <div className="text-3xl mb-2 text-[#201d1d] dark:text-[#fdfcfc]">{slimeInfo.face}</div>
              <h1 className="text-2xl font-bold text-[#201d1d] dark:text-[#fdfcfc]">Lv.{guild.level} {guild.slimeType}</h1>
              <div className="mx-auto mt-3 max-w-xs">
                <div className="flex justify-between text-xs text-[#646262] dark:text-[#888] mb-1"><span>EXP</span><span>{guild.totalExp} / {guild.expThreshold}</span></div>
                <div className="h-3 rounded-full bg-[#e8e8e8] dark:bg-[#333] overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500" style={{ width: `${Math.min(expPct, 100)}%` }} /></div>
              </div>
              <p className="mt-2 text-sm text-[#9a9898] dark:text-[#666]">지금까지 <strong>{contributorCount}</strong>번의 기여가 있었습니다</p>
              {evolutionMsg && <div className="mt-4 inline-block rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800 animate-pulse dark:bg-amber-900 dark:text-amber-200">✨ {evolutionMsg}</div>}
            </div>
          )}

          {user ? (
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              {FEED_TYPES.map(({ key, label, icon }) => (
                <button key={key} onClick={() => handleFeed(key)} disabled={feeding !== null} className={`flex flex-col items-center gap-1 rounded-xl border px-6 py-4 transition-all active:scale-95 disabled:opacity-50 ${FEED_COLORS[key]}`}>
                  {icon}<span className="text-xs font-medium text-[#201d1d] dark:text-[#fdfcfc]">{label}</span>
                  {feeding === key && <span className="text-[10px] text-[#9a9898]">먹이는 중...</span>}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-8 text-center">
              <p className="text-sm text-[#9a9898] dark:text-[#666] mb-4">로그인하고 길드 슬라임에게 먹이를 주세요!</p>
              <Link href="/login"><Button>로그인하고 참여하기</Button></Link>
            </div>
          )}

          {guild && (
            <div className="mt-8 flex justify-center gap-6 text-center">
              <div><Flame className="mx-auto h-4 w-4 text-red-500" /><p className="text-sm font-semibold text-[#201d1d] dark:text-[#fdfcfc]">{guild.feedTotals.fire || 0}</p><p className="text-[10px] text-[#9a9898]">불젤리</p></div>
              <div><Droplets className="mx-auto h-4 w-4 text-blue-500" /><p className="text-sm font-semibold text-[#201d1d] dark:text-[#fdfcfc]">{guild.feedTotals.water || 0}</p><p className="text-[10px] text-[#9a9898]">물방울</p></div>
              <div><Star className="mx-auto h-4 w-4 text-amber-400" /><p className="text-sm font-semibold text-[#201d1d] dark:text-[#fdfcfc]">{guild.feedTotals.star || 0}</p><p className="text-[10px] text-[#9a9898]">별사탕</p></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
