"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { MessageCircle, Send, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommentEntry { id: number; content: string; createdAt: string; user: { id: number; username: string; displayName: string | null }; }

export default function CommentsPage() {
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentEntry[]>([]);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    apiFetch<{ comments: CommentEntry[] }>("/api/comments").then((d) => setComments(d.comments || [])).catch(() => {});
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || submitting) return;
    setSubmitting(true);
    try {
      const data = await apiFetch<any>("/api/comments", { method: "POST", body: JSON.stringify({ content: text.trim() }) });
      setComments((prev) => [{ id: data.id, content: data.content, createdAt: data.createdAt, user: data.user }, ...prev]);
      setText("");
    } catch {} finally { setSubmitting(false); }
  }, [text, submitting]);

  return (
    <div className="flex min-h-screen flex-col bg-[#fdfcfc] dark:bg-[#1a1a1a]">
      <header className="border-b border-[rgba(15,0,0,0.12)] dark:border-[rgba(255,255,255,0.08)]">
        <div className="mx-auto flex max-w-4xl items-center px-4 py-2.5">
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-semibold text-[#201d1d] dark:text-[#fdfcfc]"><Home className="h-4 w-4" /> 길드로 돌아가기</Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-lg px-4 py-12">
          <div className="mb-6 flex items-center gap-2"><MessageCircle className="h-6 w-6" /><h1 className="text-xl font-bold text-[#201d1d] dark:text-[#fdfcfc]">길드 소감</h1></div>
          {user ? (
            <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
              <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="길드 슬라임에게 한마디..." maxLength={300} className="flex-1 rounded-lg border border-[rgba(15,0,0,0.12)] bg-white px-3 py-2 text-sm text-[#201d1d] placeholder:text-[#9a9898] focus:border-[#201d1d] focus:outline-none dark:border-[rgba(255,255,255,0.12)] dark:bg-[#222] dark:text-[#fdfcfc] dark:placeholder:text-[#666] dark:focus:border-[#fdfcfc]" />
              <Button type="submit" disabled={!text.trim() || submitting} size="sm"><Send className="h-4 w-4" /></Button>
            </form>
          ) : (
            <p className="mb-6 text-sm text-[#9a9898] dark:text-[#666]"><Link href="/login" className="underline hover:text-[#201d1d] dark:hover:text-[#fdfcfc]">로그인</Link>하고 소감을 남겨보세요!</p>
          )}
          {comments.length === 0 ? (
            <p className="text-sm text-[#9a9898] dark:text-[#666]">아직 소감이 없습니다. 첫 소감을 남겨보세요!</p>
          ) : (
            <div className="flex flex-col gap-3">
              {comments.map((c) => (
                <div key={c.id} className="rounded-xl border border-[rgba(15,0,0,0.08)] p-3 dark:border-[rgba(255,255,255,0.08)]">
                  <div className="flex items-center justify-between mb-1"><span className="text-xs font-semibold text-[#201d1d] dark:text-[#fdfcfc]">{c.user.displayName || c.user.username}</span><span className="text-[10px] text-[#9a9898] dark:text-[#666]">{new Date(c.createdAt).toLocaleDateString("ko-KR")}</span></div>
                  <p className="text-sm text-[#424245] dark:text-[#a0a0a0]">{c.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
