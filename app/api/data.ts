import { User } from "@/models/user";
import { Chat } from "@/models/chat";
import { Message } from "@/models/message";

export const chats: Chat[] = [
  { id: 1, participants: ["Alice", "Alex"] },
  { id: 2, participants: ["Bob", "Alex"] },
  { id: 3, participants: ["Charlie", "Alex"] },
  { id: 4, participants: ["David", "Alex"] },
  { id: 5, participants: ["Eve", "Alex"] },
];

export const messages: { [key: number]: Message[] } = {
  1: [
    { sender: "Alice", message: "Hello!" },
    { sender: "Alex", message: "Hi Alice!" },
    { sender: "Alice", message: "How are you?" },
  ],
  2: [
    { sender: "Bob", message: "Hey!" },
    { sender: "Alex", message: "Hello Bob!" },
    { sender: "Bob", message: "What’s up?" },
  ],
  3: [
    { sender: "Charlie", message: "Hi!" },
    { sender: "Alex", message: "Hi Charlie!" },
    { sender: "Charlie", message: "Long time no see!" },
  ],
  4: [
    { sender: "David", message: "Good morning!" },
    { sender: "Alex", message: "Good morning David!" },
    { sender: "David", message: "How have you been?" },
  ],
  5: [
    { sender: "Eve", message: "Hello!" },
    { sender: "Alex", message: "Hi Eve!" },
    { sender: "Eve", message: "Are you free this weekend?" },
  ],
};

export let users: User[] = [
  {
    username: "Alex",
  },
  {
    username: "Alice",
  },
  {
    username: "Bob",
  },
  {
    username: "Charlie",
  },
  {
    username: "David",
  },
  {
    username: "Eve",
  },
];
