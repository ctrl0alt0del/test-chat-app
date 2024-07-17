import { NextResponse } from "next/server";
import { users } from "../../data";

export async function POST(request: Request) {
  const body = await request.json();
  const { username } = body;

  // Check if the username exists
  const existingUser = users.find((user) => user.username === username);
  if (!existingUser) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  // Set a cookie with the username
  const response = NextResponse.json(existingUser);
  response.cookies.set("username", username, { path: "/" });

  return response;
}
