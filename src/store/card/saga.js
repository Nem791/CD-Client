import { takeLatest } from "redux-saga/effects";
import handleGetCardList from "./handlers";
import { getCardList } from "./slice";

export default function* cardSaga() {
  yield takeLatest(getCardList.type, handleGetCardList);
}
