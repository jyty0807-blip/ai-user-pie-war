"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { KpiCards } from "./kpi-cards";
import { Trends } from "./trends";
import { Comparison } from "./comparison";
import { Timeline } from "./timeline";
import { Pricing } from "./pricing";

export default function DashboardPage() {
  const [tab, setTab] = useState("kpi");

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          2026 AI User Pie War
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Real-time competitive intelligence on AI industry user acquisition,
          ad spend, and market dynamics.
        </p>
      </div>

      {/* Tab navigation */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="kpi">KPI Overview</TabsTrigger>
          <TabsTrigger value="comparison">4사 비교</TabsTrigger>
          <TabsTrigger value="timeline">타임라인</TabsTrigger>
          <TabsTrigger value="pricing">API 가격</TabsTrigger>
        </TabsList>

        <TabsContent value="kpi">
          <div className="space-y-8">
            <KpiCards />
            <Trends />
          </div>
        </TabsContent>

        <TabsContent value="comparison">
          <Comparison />
        </TabsContent>

        <TabsContent value="timeline">
          <Timeline />
        </TabsContent>

        <TabsContent value="pricing">
          <Pricing />
        </TabsContent>
      </Tabs>
    </div>
  );
}
