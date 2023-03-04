import { combineReducers } from "@reduxjs/toolkit";
import alertSlice from "./alert/alertSlice";
import authSlice from "./auth/slice";
import cardSlice from "./card/slice";
import cardDetailSlice from "./cardDetailShow/cardDetailSlice";

import classSlice from "./class/slice";
import memberSlice from "./member/memberSlice";
import setSlice from "./set/slice";
import showSlice from "./show/showSlice";
import chatSlice from "./chat/slice";
import friendSlice from "./friend/friendSlice";
import testSlice from "./test/testSlice";
import resultSlice from "./results/slice";
import videoSlice from "./video/slice";
import scheduleSlice from "./schedule/scheduleSlice";
import setOfUserSlice from "./setOfUser/slice";

export const reducer = combineReducers({
  auth: authSlice,
  class: classSlice,
  alert: alertSlice,
  member: memberSlice,
  card: cardSlice,
  set: setSlice,
  cardDetail: cardDetailSlice,
  show: showSlice,
  chat: chatSlice,
  friend: friendSlice,
  test: testSlice,
  results: resultSlice,
  video: videoSlice,
  schedule: scheduleSlice,
  setOfUser: setOfUserSlice,
});
