import { call, put } from "redux-saga/effects";
import requestGetSet from "./callApi";
import { setSetInfo } from "./slice";

export default function* handleGetSet(actions) {
  try {
    const response = yield call(requestGetSet, actions.payload);

    const { sets } = response.data.data;

    yield put(setSetInfo(sets));
  } catch (err) {
    console.log(err);
  }
}
