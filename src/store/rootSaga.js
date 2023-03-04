import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/saga";
import cardSaga from "./card/saga";
import classSaga from "./class/saga";
import resultSaga from "./results/saga";
import schemaSaga from "./schedule/saga";
import setSaga from "./set/saga";
import testSaga from "./test/saga";

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(classSaga),
    fork(cardSaga),
    fork(setSaga),
    fork(testSaga),
    fork(resultSaga),
    fork(schemaSaga),
  ]);
}
