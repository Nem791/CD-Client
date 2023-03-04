import { takeLatest } from "redux-saga/effects";
import handleGetSet from "./handlers";

import { getSetInfo } from "./slice";

export default function* setSaga() {
  yield takeLatest(getSetInfo.type, handleGetSet);
}
