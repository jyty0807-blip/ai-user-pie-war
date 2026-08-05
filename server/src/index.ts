import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { authRoutes } from "./routes/auth";
import { slimeRoutes } from "./routes/slime";
import { guildRoutes } from "./routes/guild";
import { rankingRoutes, commentRoutes } from "./routes/social";
import { statsRoutes } from "./routes/stats";
import { treeRoutes } from "./routes/tree";
import { loadConfig } from "./lib/game-config";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/health", (c) => c.json({ status: "ok" }));

app.get("/", (c) => c.json({ name: "Slime Evolution API", version: "1.0.0" }));

app.route("/api/auth", authRoutes);
app.route("/api/slime", slimeRoutes);
app.route("/api/guild", guildRoutes);
app.route("/api/ranking", rankingRoutes);
app.route("/api/comments", commentRoutes);
app.route("/api/stats", statsRoutes);
app.route("/api/evolution-tree", treeRoutes);

const port = parseInt(process.env.PORT || "3001");

loadConfig().then(() => {
  serve({ fetch: app.fetch, port }, (info) => {
    console.log(`Slime Evolution API running on port ${info.port}`);
  });
});

export default app;
