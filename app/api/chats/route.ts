import { NextResponse } from "next/server";
import { chats } from "../data";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  if (username) {
    const userChats = chats.filter((chat) =>
      chat.participants.includes(username)
    );
    return NextResponse.json(userChats);
  }

  return NextResponse.json([]);
}
