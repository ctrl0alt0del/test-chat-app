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
import ChatList from "../../components/ChatList";
import ChatMessages from "../../components/ChatMessages";
import InputControls from "../../components/InputControls";

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

  const handleCreateChat = (newChatUser: string) => {
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
      <ChatList
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={handleChatSelect}
        onCreateChat={handleCreateChat}
        newChatUser={newChatUser}
        setNewChatUser={setNewChatUser}
      />

      <div className="flex-1 flex flex-col bg-gray-100">
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 w-60 text-white rounded self-end mx-2"
        >
          Logout
        </button>
        {selectedChat && (
          <>
            <ChatMessages
              messages={messages[selectedChat.id] || []}
              username={username}
            />
            <InputControls
              input={input}
              setInput={setInput}
              onSend={handleSend}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default withAuth(ChatPage);
