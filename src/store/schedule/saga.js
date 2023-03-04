import { takeLatest } from "redux-saga/effects";
import handleGetSchedule from "./handlers";
import { getSchedule } from "./scheduleSlice";

export default function* schemaSaga() {
  yield takeLatest(getSchedule.type, handleGetSchedule);
}
