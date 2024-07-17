import React from "react";
import { Message } from "../models/message";

interface ChatMessagesProps {
  messages: Message[];
  username: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, username }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-2 p-2 rounded-lg max-w-xs ${
            msg.sender === username
              ? "bg-blue-500 text-white self-end"
              : "bg-white text-black self-start"
          }`}
          style={{
            alignSelf: msg.sender === username ? "flex-end" : "flex-start",
          }}
        >
          {msg.message}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
