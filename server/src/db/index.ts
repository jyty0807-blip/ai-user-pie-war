import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || "";

export const db = drizzle({ connection: connectionString, schema });

export type Database = typeof db;
