import { createSlice } from "@reduxjs/toolkit";
const friendSlice = createSlice({
  name: "friend",
  initialState: {
    friends: [],
    // Danh sách lời mời vào phòng học của 1 ng dunbgf
    pendingFriendInvitation: [],
    onlineUsers: [],
  },
  reducers: {
    setFriends: (state, action) => ({
      ...state,
      friends: action.payload,
    }),
    setPendingFriendInvitation: (state, action) => ({
      ...state,
      pendingFriendInvitation: action.payload,
    }),
    setOnlineUsers: (state, action) => ({
      ...state,
      onlineUsers: action.payload,
    }),
  },
});

export const { setFriends, setPendingFriendInvitation, setOnlineUsers } =
  friendSlice.actions;

export default friendSlice.reducer;
