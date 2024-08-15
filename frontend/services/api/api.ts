import { WebSocketHandlers } from "../../interface/interface";

export function initializeWebSocketConnection(
  url: string,
  handlers: WebSocketHandlers
): WebSocket {
  const socket = new WebSocket(url);
  socket.onopen = handlers.onOpen;
  socket.onmessage = handlers.onMessage;
  socket.onclose = handlers.onClose;
  socket.onerror = handlers.onError;
  return socket;
}
