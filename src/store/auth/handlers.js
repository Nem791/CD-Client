import { call, put } from "redux-saga/effects";
import requestGetUser from "./callApi";
import { setIsLogin, setUser } from "./slice";

export default function* handleGetIsLoggin() {
  try {
    const response = yield call(requestGetUser);

    const { isLogin, user } = response.data;
    yield put(setIsLogin(isLogin));
    yield put(setUser(user));
  } catch (err) {
    console.log(err);
  }
}
