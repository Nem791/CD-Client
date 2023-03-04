import { createSlice } from "@reduxjs/toolkit";
const cardDetailSlice = createSlice({
  name: "cardDetail",
  initialState: {
    cardShow: false,
    cardDetail: {},
  },
  reducers: {
    setCardShow: (state, action) => ({
      ...state,
      cardShow: action.payload,
    }),
    setCardDetail: (state, action) => ({
      ...state,
      cardDetail: action.payload,
    }),
  },
});

export const { setCardShow, setCardDetail } = cardDetailSlice.actions;

export default cardDetailSlice.reducer;
