import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    monthIndex: dayjs().month(),
    smallCalendarMonth: null,
    daySelected: dayjs(),
    showEventModal: false,
    savedEvent: [],
    selectedEvent: null,
    labels: [],
  },

  reducers: {
    setMonthIndex: (state, action) => ({
      ...state,
      monthIndex: action.payload,
    }),
    setSmallCalendarMonth: (state, action) => ({
      ...state,
      smallCalendarMonth: action.payload,
    }),
    setDaySelected: (state, action) => ({
      ...state,
      daySelected: action.payload,
    }),
    setShowEventModal: (state, action) => ({
      ...state,
      showEventModal: action.payload,
    }),
    setSavedEvent: (state, action) => ({
      ...state,
      savedEvent: action.payload,
    }),
    setSelectedEvent: (state, action) => ({
      ...state,
      selectedEvent: action.payload,
    }),
    setLabels: (state, action) => ({
      ...state,
      labels: action.payload,
    }),

    pushSavedEvent: (state, action) => {
      return [...state, action.payload];
    },

    updateSavedEvent: (state, action) => {
      return state.map((evt) =>
        evt.id === action.payload.id ? action.payload : evt
      );
    },

    deleteSavedEvent: (state, action) => {
      return state.filter((evt) => evt.id !== action.payload.id);
    },
    getSchedule() {},
  },
});

export const {
  setMonthIndex,
  setSmallCalendarMonth,
  setDaySelected,
  setShowEventModal,
  setSavedEvent,
  pushSavedEvent,
  updateSavedEvent,
  deleteSavedEvent,
  setSelectedEvent,
  setLabels,
  getSchedule,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
