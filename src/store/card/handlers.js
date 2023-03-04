import { call, put } from "redux-saga/effects";
import requestGetAllCardInSet from "./callApi";

import { setCardList } from "./slice";

export default function* handleGetCardList(actions) {
  try {
    const response = yield call(requestGetAllCardInSet, actions.payload);
    const { cardList } = response.data.data;
    console.log(cardList);
    yield put(setCardList(cardList));
  } catch (err) {
    console.log(err);
  }
}
