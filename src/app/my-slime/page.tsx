"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Flame, Droplets, Star, Trophy, MessageCircle } from "lucide-react";
import { EVOLUTION_TABLE } from "@/lib/evolution";

interface SlimeState { slimeType: string; level: number; exp: number; feedLog: Record<string, number>; }
interface EvolutionEvent { from: string; to: string; name: string; emoji: string; level: number; }

function getSlimeInfo(type: string) {
  const entry = EVOLUTION_TABLE.find((e) => e.id === type);
  return { emoji: entry?.emoji || "🟢", face: entry?.face || "•ᴗ•", name: entry?.nameKr || type };
}

function calcThreshold(level: number) { return Math.floor(100 * Math.pow(1.5, level - 1)); }

const FEED_TYPES = [
  { key: "fire", label: "불젤리", icon: <Flame className="h-5 w-5 text-red-500" /> },
  { key: "water", label: "물방울", icon: <Droplets className="h-5 w-5 text-blue-500" /> },
  { key: "star", label: "별사탕", icon: <Star className="h-5 w-5 text-amber-400" /> },
] as const;

export default function MySlimePage() {
  const [slime, setSlime] = useState<SlimeState | null>(null);
  const [evolution, setEvolution] = useState<EvolutionEvent | null>(null);
  const [expThreshold, setExpThreshold] = useState(100);
  const [streakDays, setStreakDays] = useState(0);
  const [feeding, setFeeding] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<{ slime: SlimeState | null }>("/api/slime")
      .then((d) => { if (d.slime) { setSlime(d.slime); setExpThreshold(calcThreshold(d.slime.level)); }})
      .catch(() => {});
  }, []);

  async function handleFeed(feedType: string) {
    setFeeding(feedType); setError("");
    try {
      const data = await apiFetch<any>("/api/slime/feed", { method: "POST", body: JSON.stringify({ feedType }) });
      if (data.evolution) { setEvolution(data.evolution); setTimeout(() => setEvolution(null), 5000); }
      setSlime({ slimeType: data.slimeType, level: data.level, exp: data.exp, feedLog: data.feedLog });
      setExpThreshold(data.expThreshold); setStreakDays(data.streakDays || 0);
    } catch (err: any) { setError(err.message || "먹이 주기 중 오류"); }
    finally { setFeeding(null); }
  }

  const slimeInfo = getSlimeInfo(slime?.slimeType || "basic");
  const expPct = slime ? Math.round((slime.exp / expThreshold) * 100) : 0;

  return (
    <div className="flex min-h-screen flex-col bg-[#fdfcfc] dark:bg-[#1a1a1a]">
      <header className="border-b border-[rgba(15,0,0,0.12)] dark:border-[rgba(255,255,255,0.08)]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-2.5">
          <Link href="/" className="text-sm font-semibold text-[#201d1d] dark:text-[#fdfcfc]">← 길드로 돌아가기</Link>
          <nav className="flex items-center gap-2">
            <Link href="/ranking" className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-[#646262] hover:text-[#201d1d] dark:text-[#888] dark:hover:text-[#fdfcfc]"><Trophy className="h-3.5 w-3.5" /> 랭킹</Link>
            <Link href="/comments" className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-[#646262] hover:text-[#201d1d] dark:text-[#888] dark:hover:text-[#fdfcfc]"><MessageCircle className="h-3.5 w-3.5" /> 소감</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-md px-4 py-12 text-center">
          <div className="text-8xl mb-4 select-none">{slimeInfo.emoji}</div>
          <div className="text-3xl mb-2 text-[#201d1d] dark:text-[#fdfcfc]">{slimeInfo.face}</div>
          <h1 className="text-2xl font-bold text-[#201d1d] dark:text-[#fdfcfc]">{slime ? `Lv.${slime.level} ${slimeInfo.name}` : "로딩 중..."}</h1>
          {streakDays > 0 && <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">🔥 {streakDays}일 연속 출석 중!</p>}
          {evolution && <div className="mt-3 inline-block rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800 animate-pulse dark:bg-amber-900 dark:text-amber-200">✨ {evolution.from} → {evolution.emoji} {evolution.name} 진화! (Lv.{evolution.level})</div>}

          {slime && (
            <div className="mx-auto mt-4 max-w-xs">
              <div className="flex justify-between text-xs text-[#646262] dark:text-[#888] mb-1"><span>EXP</span><span>{slime.exp} / {expThreshold}</span></div>
              <div className="h-3 rounded-full bg-[#e8e8e8] dark:bg-[#333] overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500" style={{ width: `${Math.min(expPct, 100)}%` }} /></div>
            </div>
          )}

          <div className="mt-8 flex justify-center gap-4">
            {FEED_TYPES.map(({ key, label, icon }) => (
              <button key={key} onClick={() => handleFeed(key)} disabled={feeding !== null} className="flex flex-col items-center gap-1 rounded-xl border-2 px-5 py-3 transition-all active:scale-95 disabled:opacity-50 border-[rgba(15,0,0,0.12)] bg-white hover:bg-[#f8f7f7] dark:border-[rgba(255,255,255,0.12)] dark:bg-[#222] dark:hover:bg-[#333]">
                {icon}<span className="text-xs font-medium text-[#201d1d] dark:text-[#fdfcfc]">{label}</span>
              </button>
            ))}
          </div>
          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

          {slime && (
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-xl border border-[rgba(15,0,0,0.08)] p-3 dark:border-[rgba(255,255,255,0.08)]"><Flame className="mx-auto h-4 w-4 text-red-500" /><p className="mt-1 text-lg font-bold text-[#201d1d] dark:text-[#fdfcfc]">{slime.feedLog.fire || 0}</p><p className="text-[10px] text-[#9a9898]">불젤리</p></div>
              <div className="rounded-xl border border-[rgba(15,0,0,0.08)] p-3 dark:border-[rgba(255,255,255,0.08)]"><Droplets className="mx-auto h-4 w-4 text-blue-500" /><p className="mt-1 text-lg font-bold text-[#201d1d] dark:text-[#fdfcfc]">{slime.feedLog.water || 0}</p><p className="text-[10px] text-[#9a9898]">물방울</p></div>
              <div className="rounded-xl border border-[rgba(15,0,0,0.08)] p-3 dark:border-[rgba(255,255,255,0.08)]"><Star className="mx-auto h-4 w-4 text-amber-400" /><p className="mt-1 text-lg font-bold text-[#201d1d] dark:text-[#fdfcfc]">{slime.feedLog.star || 0}</p><p className="text-[10px] text-[#9a9898]">별사탕</p></div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-[rgba(15,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)]">
            <p className="text-xs text-[#9a9898] dark:text-[#666]">이브이처럼 다양한 조건으로 진화합니다!</p>
            <p className="mt-1 text-xs text-[#646262] dark:text-[#888]">불/물/별 비율 · 낮/밤 · 연속 출석 · 방치 · 랜덤</p>
          </div>
        </div>
      </main>
    </div>
  );
}
