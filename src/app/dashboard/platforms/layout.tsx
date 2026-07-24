"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ReviewsPage from "./reviews";

export default function PlatformsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          AI 개발 플랫폼 비교
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Claude Code · OpenAI Codex · OpenCode — 개발자 도구 3종 비교
        </p>
      </div>

      <Separator />

      <Tabs defaultValue="comparison">
        <TabsList className="mb-8">
          <TabsTrigger value="comparison">📊 비교</TabsTrigger>
          <TabsTrigger value="reviews">💬 커뮤니티 의견</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="mt-0">{children}</TabsContent>

        <TabsContent value="reviews" className="mt-0">
          <ReviewsPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
