import { useEffect, useRef, MutableRefObject, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import formatChatbotUserText from "../utils/chatbot_formatting/formatChatbotUserText";
import getIsSentForChatBot from "../utils/chatbot_formatting/getIsSentForChatBot";
import getSessionUser from "../utils/session/getSessionUser";
import getSessionUserId from "../utils/session/getSessionUserId";
import handleWebSocketClose from "../utils/websocket/handleWebSocketClose";
import { handleWebSocketError } from "../utils/websocket/handleWebSocketError";
import processWebSocketMessage from "../utils/websocket/processWebSocketMessage";
import { buildWebSocketURL } from "../services/url-builder/url-builder";
import { initializeWebSocketConnection } from "../services/api/api";

// Define the shape of your message object
interface Message {
  text: string;
  isSent: boolean;
  username?: string; // Make username optional as it might not always be present
}

interface UseWebsocketForChatbotProps {
  socketRef: MutableRefObject<WebSocket | null>;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  router: typeof useRouter;
}

const useWebsocketForChatbot = ({ socketRef, setMessages, router }: UseWebsocketForChatbotProps) => {
  useEffect(() => {
    const username = getSessionUser();
    if (!username || username === "null" || username === "undefined") {
      router.push("/");
      return; // Important to return here to prevent further execution if the user is not logged in
    }
    const userId = getSessionUserId();

    const channel = "chatbot";

    const topic = router.query;
    const url = buildWebSocketURL(
      userId,
      username,
      channel,
      // Type assertion here since `router.query` can potentially be `undefined`
      (topic as { topic?: string }).topic ?? "Appetizer" 
    );

    const handleOpen = () => {
      // todo-> toast connected to server
    };

    const handleMessage = (event: MessageEvent) =>
      processWebSocketMessage(event, setMessages, () => router.push("/"), true);

    const handleClose = (event: CloseEvent) =>
      handleWebSocketClose(event, () => router.push("/"));

    const handleError = handleWebSocketError;

    const socket = initializeWebSocketConnection(
      url,
      {handleOpen,
      handleMessage,
      handleClose,
      handleError}
    );
    socketRef.current = socket;

    socket.addEventListener("message", (event) => {
      try {
        const username = getSessionUser();
        let data = event.data;
        const isSent = getIsSentForChatBot(event.data);

        const newMessage: Message = {
          text: isSent ? formatChatbotUserText(data) : data,
          isSent: isSent,
          username: isSent ? username : "Echofy",
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (error) {
        // todo-> enable sentry logger here
        console.error("Error in WebSocket message handler:", error);
      }
    });

    return () => {
      if (socketRef.current) { // Check if socketRef.current is not null before closing
        socketRef.current.close();
      }
    };
  }, [initializeWebSocketConnection, router.query, setMessages]); // Include router.query in the dependency array
};

export default useWebsocketForChatbot;
