import { call, put } from "redux-saga/effects";
import requestGetClass from "./callApi";
import { setClass } from "./slice";

export default function* handleGetClass(actions) {
  // console.log(actions.payload)
  try {
    const response = yield call(requestGetClass, actions.payload);
    const { classroom } = response.data.data;
    // console.log(classroom)
    yield put(setClass(classroom));
  } catch (err) {
    console.log(err);
  }
}
