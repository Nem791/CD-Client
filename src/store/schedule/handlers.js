import { call, put } from "redux-saga/effects";
import requestGetSchedule from "./callApi";
import { setSavedEvent } from "./scheduleSlice";

export default function* handleGetSchedule(action) {
  try {
    const response = yield call(requestGetSchedule, action.payload);

    const { schedules } = response.data.data;
    yield put(setSavedEvent(schedules));
  } catch (err) {
    console.log(err);
  }
}
