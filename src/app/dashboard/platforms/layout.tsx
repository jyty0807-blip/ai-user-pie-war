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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          AI Development Platform Comparison
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Claude Code vs OpenAI Codex vs OpenCode (OMC) — Which one powers your
          workflow?
        </p>
      </div>

      <Separator />

      <Tabs defaultValue="comparison">
        <TabsList className="mb-6">
          <TabsTrigger value="comparison">비교</TabsTrigger>
          <TabsTrigger value="reviews">커뮤니티 의견</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison">{children}</TabsContent>

        <TabsContent value="reviews">
          <ReviewsPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
