import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatRooms: [],
    chosenChatDetails: {},
    chatType: "",
    messages: [],
  },
  reducers: {
    setChatRooms: (state, action) => ({
      ...state,
      chatRooms: action.payload,
    }),
    setChosenChatDetails: (state, action) => ({
      ...state,
      chosenChatDetails: action.payload,
    }),
    setChatType: (state, action) => ({
      ...state,
      chatType: action.payload,
    }),
    setMessages: (state, action) => ({
      ...state,
      messages: action.payload,
    }),
  },
});

export const { setChosenChatDetails, setChatType, setMessages, setChatRooms } =
  chatSlice.actions;

export default chatSlice.reducer;
