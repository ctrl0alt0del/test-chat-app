import { NextResponse } from "next/server";
import { chats, users } from "../../data";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, newChatUser } = body;

  if (!users.find((user) => user.username === newChatUser)) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }
  // Check if a chat already exists with the new user
  const existingChat = chats.find(
    (chat) =>
      chat.participants.includes(username) &&
      chat.participants.includes(newChatUser)
  );

  if (existingChat) {
    return NextResponse.json(existingChat);
  }

  // Create a new chat
  const newChat = {
    id: chats.length + 1,
    name: newChatUser,
    participants: [username, newChatUser],
  };

  chats.push(newChat);

  return NextResponse.json(newChat);
}
