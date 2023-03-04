import { takeLatest } from "redux-saga/effects";
import handleGetResult from "./handlers";
import { getResultInfo } from "./slice";

export default function* resultSaga() {
  yield takeLatest(getResultInfo.type, handleGetResult);
}
