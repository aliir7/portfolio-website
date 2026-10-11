// Server-agnostic DB client: shared by the app (via `db/index.ts`) and the seed
// script, which runs outside Next.js and therefore cannot import "server-only".
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env and fill it in.");
}

export const db = drizzle({ client: neon(databaseUrl), schema });
