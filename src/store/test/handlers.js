import { call, put } from "redux-saga/effects";
import requestGetTest from "./callApi";
import { setTest } from "./testSlice";

export default function* handleGetTest(actions) {
  // console.log(actions);
  try {
    const response = yield call(requestGetTest, actions.payload);

    const { test } = response.data.data;
    yield put(setTest(test));
  } catch (err) {
    console.log(err);
  }
}
