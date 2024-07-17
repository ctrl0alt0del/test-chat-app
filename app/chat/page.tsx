"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setChats, addChat } from "../../store/chatSlice";
import { setMessages, addMessage } from "../../store/messageSlice";
import { setUsername } from "../../store/userSlice";
import withAuth from "../../components/withAuth";
import { RootState } from "../../store";
import { Chat } from "../../models/chat";
import { Message } from "../../models/message";

const ChatPage = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const chats: Chat[] = useSelector((state: RootState) => state.chat.chats);
  const messages: Record<string, Message[]> = useSelector(
    (state: RootState) => state.message.messages
  );
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [input, setInput] = useState("");
  const [newChatUser, setNewChatUser] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      router.push("/");
      return;
    }

    // Fetch chats with username
    fetch(`/api/chats?username=${username}`)
      .then((response) => response.json())
      .then((data) => dispatch(setChats(data)));
  }, [dispatch, username, router]);

  const fetchMessages = (chatId: number) => {
    // Fetch messages for the selected chat
    fetch(`/api/messages/${chatId}`)
      .then((response) => response.json())
      .then((data) => dispatch(setMessages({ chatId, messages: data })));
  };

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    fetchMessages(chat.id);
  };

  const handleSend = () => {
    if (input && selectedChat) {
      const newMessage: Message = { sender: username, message: input };
      dispatch(addMessage({ chatId: selectedChat.id, message: newMessage }));

      // Send message to the mock API
      fetch("/api/messages/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: selectedChat.id,
          sender: username,
          message: input,
        }),
      });

      setInput("");
    }
  };

  const handleCreateChat = () => {
    if (newChatUser) {
      fetch("/api/chats/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          newChatUser,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            dispatch(addChat(data));
            setSelectedChat(data);
            setNewChatUser("");
          }
        });
    }
  };

  const handleLogout = () => {
    document.cookie = "username=; Max-Age=0; path=/"; // Remove the cookie
    dispatch(setUsername(""));
    router.push("/");
  };

  const getOtherParticipant = (participants: string[]) => {
    return participants.find((participant) => participant !== username);
  };

  return (
    <div className="flex h-screen">
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
            onClick={handleCreateChat}
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
              onClick={() => handleChatSelect(chat)}
              className={`p-2 cursor-pointer ${
                selectedChat?.id === chat.id ? "bg-gray-200" : ""
              }`}
            >
              {getOtherParticipant(chat.participants)}
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded w-full"
        >
          Logout
        </button>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {selectedChat &&
            messages[selectedChat.id]?.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg max-w-xs ${
                  msg.sender === username
                    ? "bg-blue-500 text-white self-end"
                    : "bg-white text-black self-start"
                }`}
                style={{
                  alignSelf:
                    msg.sender === username ? "flex-end" : "flex-start",
                }}
              >
                {msg.message}
              </div>
            ))}
        </div>
        {selectedChat && (
          <div className="flex p-4 border-t border-gray-300 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded mr-2"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={!input}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(ChatPage);
