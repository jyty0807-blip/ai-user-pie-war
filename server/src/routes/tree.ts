import { Hono } from "hono";
import { EVOLUTION_TABLE } from "../lib/evolution";

export const treeRoutes = new Hono();

treeRoutes.get("/", (c) => {
  const tiers = [
    { name: "1차 진화 (Lv.10)", level: 10 },
    { name: "2차 진화 (Lv.25)", level: 25 },
    { name: "3차 진화 (Lv.50)", level: 50 },
  ];

  const tree = tiers.map(({ name, level }) => ({
    name,
    level,
    evolutions: EVOLUTION_TABLE.filter((e) => {
      if (level === 10) return e.tier === 1;
      if (level === 25) return e.tier === 2;
      return e.tier === 3;
    }).map((e) => ({
      id: e.id, name: e.name, nameKr: e.nameKr,
      emoji: e.emoji, face: e.face, description: e.description,
      conditionType: e.condition.type,
    })),
  }));

  return c.json({ tree });
});
