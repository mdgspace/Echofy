+"use client";
import ChatInputBox from "../components/chat/chatInputBox";
import Box from "../components/mdgBox";
import { useState, useEffect, useRef } from "react";
import ChatbotContainer from "../components/chatbot/chatbotContainer";
import { useRouter } from "next/router";
import { Navbar } from "../components/navbar";
import useLoadSetting from "../hooks/useLoadSettings";
import useSettings from "../hooks/useSettings";
import useWebsocketForChatbot from "../hooks/useWebSocketForChatBot";
import useVisibilityChange from "../hooks/useVisibilityChange";
import useLeaveChat from "../hooks/useLeaveChat";
import { Message } from "../types";

interface UseLoadSettingHook {
  (setSoundEnabled: (enabled: boolean) => void, setNotificationsEnabled: (enabled: boolean) => void): void;
}

interface UseSettingsHook {
  (soundEnabled: boolean, notificationsEnabled: boolean): void;
}

interface UseWebsocketForChatbotHook {
  (
    socketRef: React.MutableRefObject<WebSocket | null>, 
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    router: typeof useRouter,
    messagesEndRef: React.MutableRefObject<HTMLDivElement | null>
  ): void;
}

interface UseVisibilityChangeHook {
  (setUnreadCount: React.Dispatch<React.SetStateAction<number>>): void;
}

interface UseLeaveChatHook {
  (router: typeof useRouter, socketRef: React.MutableRefObject<WebSocket | null>): void;
}

interface ChatbotContainerProps {
  messages: Message[];
  messagesEndRef: React.MutableRefObject<HTMLDivElement | null>;
}


export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [topic, setTopic] = useState<string>("Appetizer");
  const router = useRouter();
  const socketRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useLoadSetting(setSoundEnabled,setNotificationsEnabled);
  useSettings(soundEnabled,notificationsEnabled);
  useWebsocketForChatbot(socketRef,setMessages,router);
  useVisibilityChange({setUnreadCount});
  // useLeaveChat(router);

  useEffect(() => setTopic(router.query.topic as string ?? "Appetizer"), [router.query]); 


  useEffect(() => {}, [messages]);

  useEffect(() => {
    if (unreadCount > 0 && notificationsEnabled) {
      document.title = `(${unreadCount}) New Messages - MDGSpace Chat`;
    } else {
      document.title = "MDGSpace Chat";
    }
  }, [unreadCount]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <div className="main text-slate-950 bg-white w-full bg-contain ">
        <div className="grid grid-cols-24 w-full h-[98vh] mt-2">
          <div className="justify-between col-span-7 bg-white rounded-r-xl max-md:hidden">
            <div className="flex flex-col items-center p-2 bg-white-primary rounded-xl w-[95%]">
              <Box channel={"chatbot"} />
            </div>
          </div>
          <div className="col-span-17 flex flex-col justify-center bg-light-grey max-md:col-span-24 rounded-xl mr-[1vw]">
            <div className="flex flex-col h-[98vh] w-full gap-4 justify-between items-center">
              <div className="w-full flex flex-row items-center justify-around">
                <Navbar currentPage={"chatbot"} currentTopic={topic} />
              </div>
              <div className="pb-[1vh] max-sm:pb-[3vh] overflow-y-auto noir-pro w-[100%] max-sm:w-[105%] max-md:w-[106%]">
                <ChatbotContainer
                  messages={messages}
                  messagesEndRef={messagesEndRef}
                />
              </div>
              <div className="w-full">
                <ChatInputBox
                  socketRef={socketRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}