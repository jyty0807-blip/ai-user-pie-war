"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

const navItems = [
  { label: "🎯 추천", href: "/recommend" },
  { label: "대시보드", href: "/dashboard" },
  { label: "뉴스", href: "/dashboard/news" },
  { label: "플랫폼 비교", href: "/dashboard/platforms" },
  { label: "인사이트", href: "/dashboard/insights" },
  { label: "온보딩", href: "/dashboard/onboarding" },
  { label: "소개", href: "/dashboard/about" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <div className="flex min-h-full flex-col">
        {/* Top navigation bar */}
        <header className="sticky top-0 z-40 w-full border-b border-border bg-[#fdfcfc]">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="flex items-center gap-2">
                  <span className="text-lg font-bold tracking-tight text-foreground">
                  🤖 AI 유저 파이 전쟁
                </span>
              </Link>
              <span className="hidden text-sm text-muted-foreground sm:inline-block">
                2026 AI 업계 퍼포먼스 마케팅 인텔리전스
              </span>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "inline-flex h-8 items-center rounded-full px-3 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile hamburger */}
            <Sheet>
              <SheetTrigger
                render={<Button variant="ghost" size="icon" />}
                className="md:hidden"
              >
                <MenuIcon />
                <span className="sr-only">Open menu</span>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle>🤖 AI 유저 파이 전쟁</SheetTitle>
                </SheetHeader>
                <nav className="mt-4 flex flex-col gap-1">
                  {navItems.map((item) => {
                    const isActive =
                      item.href === "/dashboard"
                        ? pathname === "/dashboard"
                        : pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "inline-flex h-9 items-center rounded-full px-3 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          isActive
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Persistent data disclaimer */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-2">
          <div className="rounded-full border border-[rgba(15,0,0,0.08)] bg-[#f8f7f7] px-3 py-1.5">
            <p className="text-[0.6rem] text-[#646262] text-center">
              ⚠️ 이 데이터는 뉴스 리서치 · 공시 데이터 · 공개 API 정보를 기반으로 한 분석입니다. 실제 기업 내부 데이터가 아닙니다. 
              출처 및 방법론: <a href="/dashboard/onboarding" className="underline hover:text-[#201d1d]">온보딩 페이지</a>
            </p>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">{children}</main>

        {/* Footer: data freshness + sources */}
        <footer className="border-t border-border bg-background">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8 lg:px-12">
            <p className="text-[0.65rem] text-muted-foreground">
              📊 데이터 출처: SEC filings · Sensor Tower · SimilarWeb · 각사 공식 발표 · API 가격 페이지
            </p>
            <p className="text-[0.65rem] text-muted-foreground">
              🕐 마지막 업데이트: 2026년 7월 25일
            </p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
