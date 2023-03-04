import { createSlice } from "@reduxjs/toolkit";

const setSlice = createSlice({
  name: "set",

  initialState: {
    setInfo: {},
  },

  reducers: {
    setSetInfo: (state, action) => ({
      ...state,
      setInfo: action.payload,
    }),

    getSetInfo() {},
  },
});

// Export các hàm
export const { setSetInfo, getSetInfo } = setSlice.actions;

export default setSlice.reducer;
