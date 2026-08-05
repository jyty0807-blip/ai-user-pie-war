"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
    } catch (err: any) {
      setError(err.message || "로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdfcfc] px-4 dark:bg-[#1a1a1a]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="mb-1 block text-sm font-medium text-[#201d1d] dark:text-[#fdfcfc]">아이디</label>
              <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required autoComplete="username" className="w-full rounded-lg border border-[rgba(15,0,0,0.12)] bg-white px-3 py-2 text-sm text-[#201d1d] placeholder:text-[#9a9898] focus:border-[#201d1d] focus:outline-none dark:border-[rgba(255,255,255,0.12)] dark:bg-[#222] dark:text-[#fdfcfc] dark:placeholder:text-[#666] dark:focus:border-[#fdfcfc]" />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-[#201d1d] dark:text-[#fdfcfc]">비밀번호</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" className="w-full rounded-lg border border-[rgba(15,0,0,0.12)] bg-white px-3 py-2 text-sm text-[#201d1d] placeholder:text-[#9a9898] focus:border-[#201d1d] focus:outline-none dark:border-[rgba(255,255,255,0.12)] dark:bg-[#222] dark:text-[#fdfcfc] dark:placeholder:text-[#666] dark:focus:border-[#fdfcfc]" />
            </div>
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">{loading ? "로그인 중..." : "로그인"}</Button>
            <p className="text-center text-xs text-[#9a9898] dark:text-[#666]">
              계정이 없으신가요?{" "}
              <Link href="/register" className="text-[#201d1d] underline hover:text-[#0f0000] dark:text-[#fdfcfc] dark:hover:text-[#ccc]">회원가입</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
