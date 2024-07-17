import { Message } from "@/models/message";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: {} as Record<string, Message[]>,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages(state, action) {
      const { chatId, messages } = action.payload;
      state.messages[chatId] = messages;
    },
    addMessage(state, action) {
      const { chatId, message } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      state.messages[chatId].push(message);
    },
  },
});

export const { setMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
