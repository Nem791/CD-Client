import { createSlice } from "@reduxjs/toolkit";
const resultSlice = createSlice({
  name: "results",
  initialState: {
    results: {},
  },

  reducers: {
    setResults: (state, action) => ({
      ...state,
      results: action.payload,
    }),
    getResultInfo() {},
  },
});

export const { getResultInfo, setResults } = resultSlice.actions;

export default resultSlice.reducer;
