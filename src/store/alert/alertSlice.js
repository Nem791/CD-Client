import { createSlice } from "@reduxjs/toolkit";
const alertSlice = createSlice({
  name: "alert",
  initialState: {
    showAlert: false,
    message: "",
    type: "success",
  },
  reducers: {
    setShowAlert: (state, action) => ({
      ...state,
      showAlert: action.payload,
    }),
    setMessage: (state, action) => ({
      ...state,
      message: action.payload,
    }),
    setType: (state, action) => ({
      ...state,
      type: action.payload,
    }),
  },
});

export const { setShowAlert, setMessage, setType } = alertSlice.actions;

export default alertSlice.reducer;
