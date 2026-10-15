// Runs once when the server starts: validates the environment so a missing or malformed variable
// is reported as one readable list immediately, instead of failing later inside a request.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./lib/env");
  }
}
