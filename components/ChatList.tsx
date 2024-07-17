import React from "react";
import { Chat } from "../models/chat";

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onCreateChat: (newChatUser: string) => void;
  newChatUser: string;
  setNewChatUser: React.Dispatch<React.SetStateAction<string>>;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChat,
  onSelectChat,
  onCreateChat,
  newChatUser,
  setNewChatUser,
}) => {
  return (
    <div className="w-1/4 border-r border-gray-300 p-4">
      <div className="mb-4">
        <input
          type="text"
          value={newChatUser}
          onChange={(e) => setNewChatUser(e.target.value)}
          placeholder="Enter username"
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={() => onCreateChat(newChatUser)}
          className="px-4 py-2 bg-blue-500 text-white rounded w-full"
          disabled={!newChatUser}
        >
          Start New Chat
        </button>
      </div>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`p-2 cursor-pointer ${
              selectedChat?.id === chat.id ? "bg-gray-200" : ""
            }`}
          >
            {chat.participants.find(
              (participant) => participant !== newChatUser
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
