export function buildWebSocketURL(userId: string | null, username: string, channel?: string, topic?: string): string {
  const host = process.env.NEXT_PUBLIC_BACKEND_HOST || "localhost";
  const port = process.env.NEXT_PUBLIC_BACKEND_PORT || 1323;
  const protocol =
    process.env.NEXT_PUBLIC_BACKEND_ENVIRONMENT === "development"
      ? "ws"
      : "wss";
  const baseUrl = `${protocol}://${host}:${port}/chat`;
  const params = new URLSearchParams({
    channel: channel || "public",
    name: username,
    userID: userId || "0",
    topic: topic || '',
  });
  return `${baseUrl}?${params.toString()}`;
}

export function projectURLbuildr(): string {
  const host = process.env.NEXT_PUBLIC_BACKEND_HOST;
  const port = process.env.NEXT_PUBLIC_BACKEND_PORT;
  const protocol =
    process.env.NEXT_PUBLIC_BACKEND_ENVIRONMENT === "development"
      ? "http"
      : "https";
  const baseUrl = `${protocol}://${host}:${port}/projects`;
  return baseUrl;
}

export function leaveChatURLbuildr(userID: string): string {
  const host = process.env.NEXT_PUBLIC_BACKEND_HOST;
  const port = process.env.NEXT_PUBLIC_BACKEND_PORT;
  const protocol =
    process.env.NEXT_PUBLIC_BACKEND_ENVIRONMENT === "development"
      ? "http"
      : "https";
  const baseUrl = `${protocol}://${host}:${port}/chat/leave`;
  const params = new URLSearchParams({
    userID: userID,
  });

  return `${baseUrl}?${params.toString()}`;
}

export function subscribeURLbuildr(): string {
  const host = process.env.NEXT_PUBLIC_BACKEND_HOST;
  const port = process.env.NEXT_PUBLIC_BACKEND_PORT;
  const protocol =
    process.env.NEXT_PUBLIC_BACKEND_ENVIRONMENT === "development"
      ? "http"
      : "https";
  const baseUrl = `${protocol}://${host}:${port}/subscribe`;
  return baseUrl;
}
