import { createSlice } from "@reduxjs/toolkit";
const testSlice = createSlice({
  name: "test",
  initialState: {
    questions: [],
    test: {},
  },

  reducers: {
    setQuestions: (state, action) => ({
      ...state,
      questions: action.payload,
    }),
    setTest: (state, action) => ({
      ...state,
      test: action.payload,
    }),
    getTestInfo() {},
  },
});

export const { setQuestions, setTest, getTestInfo } = testSlice.actions;

export default testSlice.reducer;
