import { NextResponse } from "next/server";
import { users } from "../../data";
import { User } from "@/models/user";

export async function POST(request: Request) {
  const body = await request.json();
  const { username } = body;

  // Check if the username already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return NextResponse.json(
      { error: "Username already exists" },
      { status: 400 }
    );
  }

  // Create a new user
  const newUser: User = { username };
  users.push(newUser);

  // Set a cookie with the username
  const response = NextResponse.json(newUser);
  response.cookies.set("username", username, { path: "/" });

  return response;
}
