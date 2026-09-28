import { ZodError } from "zod";

type PostgresError = {
  code?: string;
  detail?: string;
  message?: string;
};

export function formatError(error: unknown): string {
  if (error instanceof ZodError) {
    return error.issues
      .map((issue) => {
        const field = issue.path.length ? `${issue.path.join(".")}: ` : "";
        return `${field}${issue.message}`;
      })
      .join(" | ");
  }

  if (error && typeof error === "object") {
    const dbError = error as PostgresError;

    if (dbError.code === "23505") {
      const field = dbError.detail?.match(/\((.*?)\)=/)?.[1] ?? "field";
      return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    }

    if (typeof dbError.message === "string") {
      return dbError.message;
    }
  }

  if (error instanceof Error) return error.message;

  try {
    return JSON.stringify(error);
  } catch {
    return "An unexpected error occurred.";
  }
}
