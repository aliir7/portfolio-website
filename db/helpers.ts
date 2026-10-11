import type { PgTable } from "drizzle-orm/pg-core";
import { db } from "./client";

type BatchStatements = Parameters<typeof db.batch>[0];

/**
 * The `neon-http` driver has no interactive transactions, but `db.batch()` sends
 * every statement in one request and runs them atomically. Statements are typed
 * loosely here because batch tuples cannot be typed for dynamic-length lists.
 */
export function runBatch(statements: unknown[]) {
  return db.batch(statements as unknown as BatchStatements);
}

/** Statements that replace every row of `table` with `rows` (use inside `runBatch`). */
export function replaceStatements<T extends PgTable>(table: T, rows: T["$inferInsert"][]) {
  const statements: unknown[] = [db.delete(table)];
  // `never`: Drizzle's insert type cannot be resolved for a generic table.
  if (rows.length) statements.push(db.insert(table).values(rows as never));
  return statements;
}

export function replaceRows<T extends PgTable>(table: T, rows: T["$inferInsert"][]) {
  return runBatch(replaceStatements(table, rows));
}

/** List position becomes `sortOrder`, so editors never manage order separately. */
export function withSortOrder<T extends object>(items: T[]) {
  return items.map((item, sortOrder) => ({ ...item, sortOrder }));
}
