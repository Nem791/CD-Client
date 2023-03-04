import { createSlice } from "@reduxjs/toolkit";

const setOfUserSlice = createSlice({
  name: "setOfUser",
  initialState: {
    setOfUser: [],
  },
  reducers: {
    setSetOfUser: (state, action) => ({
      ...state,
      setOfUser: action.payload,
    }),

    getSetOfUser() {},
  },
});

export const { setSetOfUser, getSetOfUser } = setOfUserSlice.actions;

export default setOfUserSlice.reducer;
