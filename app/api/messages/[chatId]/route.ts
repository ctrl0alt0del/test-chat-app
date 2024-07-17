import { NextResponse } from "next/server";
import { messages } from "../../data";

export async function GET(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  const { chatId } = params;
  const chatMessages = messages[Number.parseInt(chatId)] || [];
  return NextResponse.json(chatMessages);
}
