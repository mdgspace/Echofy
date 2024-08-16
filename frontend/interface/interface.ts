import React, { Dispatch, MutableRefObject, ReactNode, SetStateAction, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import alertServerError from "../utils/alerts/alertServerError";

export interface SettingsPopupProps {
    onClose: () => void;           
    soundEnabled: boolean;           
    setSoundEnabled: (enabled: boolean) => void; 
    notificationsEnabled: boolean;  
    setNotificationsEnabled: (enabled: boolean) => void; 
  }
  
export interface RightPaneProps extends SettingsPopupProps {} 
  
  interface IconProps {
    src: string;
    alt: string;
    onClick?: () => void; 
  }
  
export interface LayoutProps {
    children: React.ReactNode;
    home: boolean;
}

export interface TopicDropdownProps {
    topic: string;
    setTopic: (topic: string) => void;
    login: boolean;
  }
  
export interface Project {
    Category: string;
    Name: string;
    ShortDesc: string;
    LongDesc: string;
    ImageLink: string;
    AppStoreLink: string;
    GithubLink: string;
    PlayStoreLink: string;
  }

  export interface TopicSelectionModalProps {
    onClose: () => void;
  }

  export interface UsernameInputProps {
    value: string;
    onChange: (value: string) => void;
  }

export interface NavbarProps{
    currentPage: string;
    currentTopic:string;
  }

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }

  export interface BoxProps {
    channel: "public" | "private" | "chatbot"; 
  }

export interface MailProps {
    isOpen?: boolean;
    onClose: () => void;
    channel: "public" | "private" | "chatbot";
  }
  export interface ProjectListProps {
    projects: Project[];
    category: string;
    heightDecrease?: boolean;
  }

  export interface ProjectCardProps {
    name: string;
    shortDesc: string;
    ImageLink: string;
    Github?: string;
    PlayStore?: string;
    AppStore?: string;
  }

  export interface ChatBotLoginModalProps {
    onClose: () => void; // Function to close the modal
  }
  export type Topic = "SELECT A TOPIC" | "Option 1" | "Option 2" | string ;
  
  export interface Message {
    isSent: boolean;
    avatar?: string; 
    username: string;
    text: string;
    timestamp: number;
  }
  export interface ChatContainerProps {
    messages: Message[]; // Assuming messages are serialized JSON strings
    messagesEndRef: React.RefObject<HTMLDivElement>; // Ref to scroll to the bottom
  }
  

  


  export interface UserContextType {
    userName: string | null;
    setUserName: React.Dispatch<React.SetStateAction<string | null>>;
  }

  export interface UserProviderProps {
    children: React.ReactNode;
  }

  export interface UseLoadSettingProps {
    setSoundEnabled: typeof useState;
    setNotificationsEnabled: typeof useState;
  }

  export interface UseSettingsProps {
    soundEnabled: boolean;
    notificationsEnabled: boolean;
  }

  export interface UseVisibilityChangeProps {
    setUnreadCount: Dispatch<SetStateAction<number>>
}

export interface UseWebsocketProps {
  soundEnabled: boolean;
  channel: string;
  socketRef: React.MutableRefObject<WebSocket | null>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  router: any;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

export interface useWebsocketForChatbotProps {
  socketRef: MutableRefObject<WebSocket | null>;
  setMessages: Dispatch<SetStateAction<any[]>>; 
  router: any;
}

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

export interface ProcessWebSocketMessageProps {
  event: MessageEvent;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  navigateToLogin: () => void;
  isChatbot: boolean;
}

export interface DataFromServer {
  userID?: string;
  Message?: string;
  Delete?: string;
}





export interface WebSocketHandlers {
  onOpen: (event: Event) => void;
  onMessage: (event: MessageEvent<any>) => void;
  onClose: (event: CloseEvent) => void;
  onError: (event: Event) => void;
}


export interface AlertSameUserProps {
  reason: string;
  navigateToLogin: () => void;
}

export interface AlertServerErrorProps {
  reason: string;
  navigateToLogin: () => void;
}