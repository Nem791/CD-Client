import { call, put } from "redux-saga/effects";
import requestGetResults from "./callApi";
import { setResults } from "./slice";

export default function* handleGetResult(actions) {
  try {
    const response = yield call(requestGetResults, actions.payload);

    const { testHistory } = response.data.data;
    yield put(setResults(testHistory));
  } catch (err) {
    console.log(err);
  }
}
