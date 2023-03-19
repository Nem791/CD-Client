import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatRooms: [],
    chosenChatDetails: {},
    chatType: "",
    messages: [],
    vocabularyChat: [],
    roomId: "",
    isInvite: false,
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
    setVocabularyChat: (state, action) => ({
      ...state,
      vocabularyChat: action.payload,
    }),
    setRoomId: (state, action) => ({
      ...state,
      roomId: action.payload,
    }),
    setIsInvite: (state, action) => ({
      ...state,
      isInvite: action.payload,
    }),
  },
});

export const {
  setChosenChatDetails,
  setChatType,
  setMessages,
  setChatRooms,
  setVocabularyChat,
  setRoomId,
  setIsInvite,
} = chatSlice.actions;

export default chatSlice.reducer;
