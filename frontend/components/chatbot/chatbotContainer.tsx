import React, { useState } from "react";
import Echofy from "../../assets/logo.svg";
import Image from "next/image";
import Avatar1 from "../../assets/avatars/avatar_1.svg";
import Avatar2 from "../../assets/avatars/avatar_2.svg";
import Avatar3 from "../../assets/avatars/avatar_3.svg";
import Avatar4 from "../../assets/avatars/avatar_4.svg";
import Avatar5 from "../../assets/avatars/avatar_5.svg";
import Avatar6 from "../../assets/avatars/avatar_6.svg";
import Avatar7 from "../../assets/avatars/avatar_7.svg";
import Avatar8 from "../../assets/avatars/avatar_8.svg";
import Avatar9 from "../../assets/avatars/avatar_9.svg";
import Avatar10 from "../../assets/avatars/avatar_10.svg";
import Avatar11 from "../../assets/avatars/avatar_11.svg";
import Avatar12 from "../../assets/avatars/avatar_12.svg";
import Avatar13 from "../../assets/avatars/avatar_13.svg";
import Avatar14 from "../../assets/avatars/avatar_14.svg";
import Avatar15 from "../../assets/avatars/avatar_15.svg";
import parseMessageText from "../../utils/chatbot_formatting/parseMessageText";
import getAvatar from "../../utils/session/getAvatar";

// Define Interfaces
interface Message {
  isSent: boolean;
  username: string;
  text: string;
  // Add more properties as needed (e.g., timestamp, id, etc.)
}

interface MessageData {
  userID?: string; // Optional property for chatbot messages
}

export default function ChatContainer({ messages, messagesEndRef }) {
  const [filteredMessage, setFilteredMessage] = useState([]);

  const AvatarList = [
    Avatar1,
    Avatar2,
    Avatar3,
    Avatar4,
    Avatar5,
    Avatar6,
    Avatar7,
    Avatar8,
    Avatar9,
    Avatar10,
    Avatar11,
    Avatar12,
    Avatar13,
    Avatar14,
    Avatar15,
  ];
  const [Avatar, setAvatar] = useState(Avatar1);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    async function loadAvatar() {
      const AvatarId = await getAvatar();
      const Avatar = AvatarList[AvatarId];
      setAvatar(Avatar);
    }
    loadAvatar();
  }, [messages]);

  React.useEffect(() => {
    const filterMessages = () => {
      const newMessages = messages.filter((message) => {
        try {
          message = JSON.parse(message);
          const messageData = JSON.parse(message.text);
          return !(
            messageData.userID && messageData.userID.startsWith("chatbot")
          );
        } catch (error) {
          return true;
        }
      });

      return newMessages;
    };
    const newFilteredMessages = filterMessages();
    setFilteredMessage(newFilteredMessages);
  }, [messages]);

  return (
    <div className="h-[85vh]">
      <ul>
        {filteredMessage?.map((message, index) => {
          message = JSON.parse(message);
          return (
            <li
              key={index}
              className={`flex items-start ${message.isSent ? "justify-end" : "justify-start"} mb-4 mx-6 `}
            >
              <div
                className={`relative flex font-Lato text-base ${message.isSent ? "flex-row-reverse" : ""}`}
              >
                <div className="flex flex-col">
                  <div
                    className={`flex flex-row gap-2 items-center ${message.isSent ? "flex-row-reverse" : ""}`}
                  >
                    <div className="flex-shrink-0 w-12 h-12">
                      <Image
                        src={message.isSent ? Avatar : Echofy}
                        width="48"
                        height="48"
                        alt=""
                        className=""
                      />
                    </div>
                    <div className="text-txt-mdg-username">
                      {message.username}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div
                      className={`w-[max-content] min-w-[4vw] max-w-[50vw] px-4 py-2 mx-2   ${
                        message.isSent
                          ? "bg-customBlue text-white rounded-l-[32px] rounded-br-[32px] mr-6"
                          : " bg-white  text-semiblack rounded-r-[32px] rounded-bl-[32px] ml-12"
                      } break-words`}
                    >
                      <div className="py-2 whitespace-pre-wrap text-Lato">
                        {message.isSent
                          ? message.text
                          : parseMessageText(message.text)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div ref={messagesEndRef} />
    </div>
  );
}
