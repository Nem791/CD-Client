import { combineReducers } from "@reduxjs/toolkit";
import alertSlice from "./alert/alertSlice";
import authSlice from "./auth/slice";
import cardSlice from "./card/slice";
import cardDetailSlice from "./cardDetailShow/cardDetailSlice";

import setSlice from "./set/slice";
import showSlice from "./show/showSlice";

import testSlice from "./test/testSlice";
import resultSlice from "./results/slice";

import scheduleSlice from "./schedule/scheduleSlice";
import setOfUserSlice from "./setOfUser/slice";

export const reducer = combineReducers({
  auth: authSlice,
  alert: alertSlice,
  card: cardSlice,
  set: setSlice,
  cardDetail: cardDetailSlice,
  show: showSlice,
  test: testSlice,
  results: resultSlice,
  schedule: scheduleSlice,
  setOfUser: setOfUserSlice,
});
