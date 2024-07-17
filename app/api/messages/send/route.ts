import { NextResponse } from "next/server";
import { messages } from "../../data";
import { Message } from "@/models/message";

export async function POST(request: Request) {
  const body = await request.json();
  const { chatId, sender, message } = body;

  // Ensure the chat messages array exists
  if (!messages[chatId]) {
    messages[chatId] = [];
  }

  // Add the new message to the chat
  const newMessage: Message = { sender, message };
  messages[chatId].push(newMessage);

  return NextResponse.json(newMessage);
}
