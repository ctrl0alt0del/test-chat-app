import { Chat } from "@/models/chat";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [] as Chat[],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats(state, action) {
      state.chats = action.payload;
    },
    addChat(state, action) {
      state.chats.push(action.payload);
    },
  },
});

export const { setChats, addChat } = chatSlice.actions;
export default chatSlice.reducer;
