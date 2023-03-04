import { takeLatest } from "redux-saga/effects";
import handleGetTest from "./handlers";
import { getTestInfo } from "./testSlice";

export default function* testSaga() {
  yield takeLatest(getTestInfo.type, handleGetTest);
}
