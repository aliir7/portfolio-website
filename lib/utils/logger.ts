import "server-only";

import pino from "pino";

const isDevelopment = process.env.NODE_ENV !== "production";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? (isDevelopment ? "debug" : "info"),
  base: undefined,
  redact: {
    paths: [
      "password",
      "token",
      "accessToken",
      "refreshToken",
      "idToken",
      "cookie",
      "authorization",
      "headers.authorization",
      "headers.cookie",
      "DATABASE_URL",
      "CLOUDINARY_API_SECRET",
    ],
    censor: "[REDACTED]",
  },
  transport: isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          singleLine: true,
          ignore: "pid,hostname",
        },
      }
    : undefined,
});
