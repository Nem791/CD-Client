import { createSlice } from "@reduxjs/toolkit";
const memberSlice = createSlice({
  name: "member",
  initialState: {
    member: [],
    // Danh sách lời mời vào phòng học của 1 ng dunbgf
    pendingMemberInvitations: [],
    onlineMembers: [],
  },
  reducers: {
    setMember: (state, action) => ({
      ...state,
      member: action.payload,
    }),
    setPendingMemberInvitations: (state, action) => ({
      ...state,
      pendingMemberInvitations: action.payload,
    }),
    setOnlineMembers: (state, action) => ({
      ...state,
      onlineMembers: action.payload,
    }),
  },
});

export const { setMember, setPendingMemberInvitations, setOnlineMembers } =
  memberSlice.actions;

export default memberSlice.reducer;
