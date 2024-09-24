interface WebSocketHandlers {
  handleOpen: (event: Event) => void;
  handleMessage: (event: MessageEvent) => void;
  handleClose: (event: CloseEvent) => void;
  handleError: (event: Event) => void;
}

export function initializeWebSocketConnection(
  url: string,
  handlers: WebSocketHandlers
): WebSocket {
  console.log("WebSocket URL:", url);
  const socket = new WebSocket(url);
  
  socket.onopen = handlers.handleOpen;
  socket.onmessage = handlers.handleMessage;
  socket.onclose = handlers.handleClose;
  socket.onerror = handlers.handleError;
  
  return socket;
}
